//--------------------------------------------------------------------
// Libraries

#include <iostream>
#include <string>
#include <vector>
#include <sqlite3.h>
#include <filesystem>
#include <fstream>
#include <sstream>

#include "database.h"

//--------------------------------------------------------------------
// Variables

sqlite3* db;
int rc; // return code

//--------------------------------------------------------------------
// Functions

// Open the database connection
int db_open(const std::string& db_name) {
  rc = sqlite3_open(db_name.c_str(), &db);
  if (rc) {
      std::cerr << "Can't open database: " << sqlite3_errmsg(db) << std::endl;
      return 1;
  }
  std::cout << "DB opened, rc: " << rc << std::endl;
  return rc;
}


// Close the database connection
void db_close() {
  std::cout << "DB closed" << std::endl;
  sqlite3_close(db);
}


// Check if the SQLite DB is empty
bool is_db_table_empty(const std::string& db_table_name) {
    const std::string count_query = "SELECT COUNT(*) FROM " + db_table_name;
    sqlite3_stmt* statement;
    
    int rc = sqlite3_prepare_v2(db, count_query.c_str(), -1, &statement, nullptr);
    if (rc != SQLITE_OK) {
        // Handle the error
        std::cerr << "Failed to execute query: " << sqlite3_errmsg(db) << std::endl;
        return true; // @todo why am I returning true here?
    }
    
    bool is_empty = true;
    
    if (sqlite3_step(statement) == SQLITE_ROW) {
        int count = sqlite3_column_int(statement, 0);
        is_empty = count == 0;
    }
    
    sqlite3_finalize(statement);
    
    return is_empty;
}


// Create the database and tables if the DB doesn't exist
int db_init(const std::string& db_name, const std::string& db_table_name, const std::string& seeding_dataset = "") {
  
  rc = db_open(db_name);

  if (is_db_table_empty(db_table_name)) {

    // The SQL query raw literal
    std::string create_sql_table = R"(
        CREATE TABLE IF NOT EXISTS )" + db_table_name + R"(
        (
            id INT,
            country VARCHAR(255),
            description TEXT,
            designation VARCHAR(255),
            points INT,
            price DECIMAL(10, 2),
            province VARCHAR(255),
            region_1 VARCHAR(255),
            region_2 VARCHAR(255),
            taster_name VARCHAR(255),
            taster_twitter_handle VARCHAR(255),
            title VARCHAR(255),
            variety VARCHAR(255),
            winery VARCHAR(255)
        )
    )";

    rc = sqlite3_exec(db, create_sql_table.c_str(), nullptr, nullptr, nullptr);
    if (rc != SQLITE_OK) {
        std::cerr << "SQL error: " << sqlite3_errmsg(db) << std::endl;
        return 1;
    }

    std::cout << "*** Table "  << db_table_name << " created." << std::endl;

    db_seed(seeding_dataset, db_table_name);

    return 0;
  }

  std::cout << db_name << std::endl;

  return 0;
}


// Insert records into the table
int db_add(sqlite3* db,
           const std::string& id,
           const std::string& country,
           const std::string& description,
           const std::string& designation,
           const std::string& points,
           const std::string& province,
           const std::string& region_1,
           const std::string& taster_name,
           const std::string& taster_twitter_handle,
           const std::string& title,
           const std::string& variety,
           const std::string& winery) {

  // Prepare the SQL statement @todo: table name is hardcoded. Should be passed from the config file.
  const char* insert_SQL = "INSERT INTO wines (id, country, description, designation, points, province, region_1, taster_name, taster_twitter_handle, title, variety, winery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  sqlite3_stmt* stmt;
  int rc = sqlite3_prepare_v2(db, insert_SQL, -1, &stmt, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return 1;
  }

  // Bind the values to the statement parameters
  sqlite3_bind_text(stmt, 1, id.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 2, country.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 3, description.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 4, designation.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 5, points.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 6, province.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 7, region_1.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 8, taster_name.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 9, taster_twitter_handle.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 10, title.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 11, variety.c_str(), -1, SQLITE_STATIC);
  sqlite3_bind_text(stmt, 12, winery.c_str(), -1, SQLITE_STATIC);

  // Execute the statement
  rc = sqlite3_step(stmt);
  if (rc != SQLITE_DONE) {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
    sqlite3_finalize(stmt);
    return 1;
  }

  // Finalize the statement
  sqlite3_finalize(stmt);

  return 0;
}


// If the seeding_dataset (data.csv) exists, loop through the file and
// insert each line in the DB
int db_seed(const std::string& seeding_dataset, const std::string& db_table_name) {

  // Helper function to remove surrounding quotes from a string. I should
  // have probably just use an already treated data.csv...
  auto remove_quotes = [](const std::string& str) {
    std::string result = str;
    if (!result.empty() && result.front() == '"') {
      result = result.substr(1);  // Remove initial quote
    }
    if (!result.empty() && result.back() == '"') {
      result.pop_back();  // Remove trailing quote
    }
    return result;
  };

  // Check if seeding_dataset .csv exists
  if (std::filesystem::exists(seeding_dataset)) {
    std::cout << "*** " << seeding_dataset << " exists, seed db." << std::endl;

    std::ifstream file(seeding_dataset);
    if (file) {
      std::string line;

      // Read the rows
      while (std::getline(file, line)) {
        std::istringstream row_stream(line);
        std::string value;
        std::vector<std::string> values;

        // Handle values with quotes
        while (std::getline(row_stream, value, ',')) {
          if (!value.empty() && value.front() == '"') {
            std::string temp_value = value.substr(1);  // Remove initial quote
            while (!temp_value.empty() && temp_value.back() != '"') {
              // Read until closing quote
              std::string part;
              if (std::getline(row_stream, part, ',')) {
                temp_value += "," + part;
              }
            }
            values.push_back(remove_quotes(temp_value));
          } else {
            // Handle value without quotes
            values.push_back(value);
          }
        }

        // Check if the expected number of columns is present
        const int expected_columns = 14; // @todo: move this to the config file?
        if (values.size() != expected_columns) {
          std::cerr << "Error: Unable to parse line. Expected " << expected_columns
                    << " columns, found " << values.size() << " columns." << std::endl;
          continue;
        }

        std::string id = (values.size() > 0) ? values[0] : "";
        std::string country = (values.size() > 1) ? values[1] : "";
        std::string description = (values.size() > 2) ? values[2] : "";
        std::string designation = (values.size() > 3) ? values[3] : "";
        std::string points = (values.size() > 4) ? values[4] : "";
        std::string price = (values.size() > 5) ? values[5] : "";
        std::string province = (values.size() > 6) ? values[6] : "";
        std::string region_1 = (values.size() > 7) ? values[7] : "";
        std::string region_2 = (values.size() > 8) ? values[8] : "";
        std::string taster_name = (values.size() > 9) ? values[9] : "";
        std::string taster_twitter_handle = (values.size() > 10) ? values[10] : "";
        std::string title = (values.size() > 11) ? values[11] : "";
        std::string variety = (values.size() > 12) ? values[12] : "";
        std::string winery = (values.size() > 13) ? values[13] : "";        

        // Print the variables (debug)
        std::cout << "id - " << id << std::endl;
        std::cout << "country - " << country << std::endl;
        std::cout << "description - " << description << std::endl;
        std::cout << "designation - " << designation << std::endl;
        std::cout << "points - " << points << std::endl;
        std::cout << "price - " << price << std::endl;
        std::cout << "province - " << province << std::endl;
        std::cout << "region_1 - " << region_1 << std::endl;
        std::cout << "region_2 - " << region_2 << std::endl;
        std::cout << "taster_name - " << taster_name << std::endl;
        std::cout << "taster_twitter_handle - " << taster_twitter_handle << std::endl;
        std::cout << "title - " << title << std::endl;
        std::cout << "variety - " << variety << std::endl;
        std::cout << "winery - " << winery << std::endl;

        // Insert the values into the database
        int result = db_add(db, id, country, description, designation, points, province, region_1, taster_name, taster_twitter_handle, title, variety, winery);
        if (result != 0) {
          std::cerr << "Failed to add values to the database." << std::endl;
          return 1;
        }
      }

      file.close();
      return 0;
    } else {
      std::cerr << "Failed to open file: " << seeding_dataset << std::endl;
      return 1;
    }
  } else {
    std::cout << "*** " << seeding_dataset << " does not exist, abort." << std::endl;
    return 1;
  }
}


// Helper function to retrieve wine data from the statement
Wine retrieve_wine_data(sqlite3_stmt* statement) {

  Wine wine;
  
  wine.id = sqlite3_column_int(statement, 0);
  
  const unsigned char* country_text = sqlite3_column_text(statement, 1);
  if (country_text)
    wine.country = reinterpret_cast<const char*>(country_text);
  else
    wine.country = "";
  
  const unsigned char* description_text = sqlite3_column_text(statement, 2);
  if (description_text)
    wine.description = reinterpret_cast<const char*>(description_text);
  else
    wine.description = "";
  
  const unsigned char* designation_text = sqlite3_column_text(statement, 3);
  if (designation_text)
    wine.designation = reinterpret_cast<const char*>(designation_text);
  else
    wine.designation = "";
  
  wine.points = sqlite3_column_int(statement, 4);
  wine.price = sqlite3_column_double(statement, 5);
  
  const unsigned char* province_text = sqlite3_column_text(statement, 6);
  if (province_text)
    wine.province = reinterpret_cast<const char*>(province_text);
  else
    wine.province = "";
  
  const unsigned char* region_1_text = sqlite3_column_text(statement, 7);
  if (region_1_text)
    wine.region_1 = reinterpret_cast<const char*>(region_1_text);
  else
    wine.region_1 = "";
  
  const unsigned char* region_2_text = sqlite3_column_text(statement, 8);
  if (region_2_text)
    wine.region_2 = reinterpret_cast<const char*>(region_2_text);
  else
    wine.region_2 = "";
  
  const unsigned char* taster_name_text = sqlite3_column_text(statement, 9);
  if (taster_name_text)
    wine.taster_name = reinterpret_cast<const char*>(taster_name_text);
  else
    wine.taster_name = "";
  
  const unsigned char* taster_twitter_handle_text = sqlite3_column_text(statement, 10);
  if (taster_twitter_handle_text)
    wine.taster_twitter_handle = reinterpret_cast<const char*>(taster_twitter_handle_text);
  else
    wine.taster_twitter_handle = "";
  
  const unsigned char* title_text = sqlite3_column_text(statement, 11);
  if (title_text)
    wine.title = reinterpret_cast<const char*>(title_text);
  else
    wine.title = "";
  
  const unsigned char* variety_text = sqlite3_column_text(statement, 12);
  if (variety_text)
    wine.variety = reinterpret_cast<const char*>(variety_text);
  else
    wine.variety = "";
  
  const unsigned char* winery_text = sqlite3_column_text(statement, 13);
  if (winery_text)
    wine.winery = reinterpret_cast<const char*>(winery_text);
  else
    wine.winery = "";
  
  return wine;
}
  
// Return the 500 first wines in the DB
std::vector<Wine> db_list500() { // todo: choose a better name
  std::vector<Wine> wines;
  std::string select_sql = "SELECT * FROM wines LIMIT 500";
  sqlite3_stmt* statement;
  
  int rc = sqlite3_prepare_v2(db, select_sql.c_str(), -1, &statement, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return wines;  // Return an empty vector if preparation fails
  }
  
  while ((rc = sqlite3_step(statement)) == SQLITE_ROW) {
    Wine wine = retrieve_wine_data(statement);
    wines.push_back(wine);
  }
  
  if (rc != SQLITE_DONE) {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
  }
  
  sqlite3_finalize(statement);
  
  return wines;
}


// Return single wine by id
Wine db_list_by_id(int wine_id) { // @todo a much better name is: db_get_wine_by_id
  Wine wine;
  std::string select_sql = "SELECT * FROM wines WHERE id=?";
  sqlite3_stmt* statement;
  
  int rc = sqlite3_prepare_v2(db, select_sql.c_str(), -1, &statement, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return wine;  // Return an empty wine object if preparation fails
  }
  
  rc = sqlite3_bind_int(statement, 1, wine_id);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to bind wine_id parameter: " << sqlite3_errmsg(db) << std::endl;
    sqlite3_finalize(statement);
    return wine;  // Return an empty wine object if binding fails
  }
  
  rc = sqlite3_step(statement);
  if (rc == SQLITE_ROW) {
    wine = retrieve_wine_data(statement);
  } else if (rc == SQLITE_DONE) {
    std::cerr << "No wine found with the specified id: " << wine_id << std::endl;
  } else {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
  }
  
  sqlite3_finalize(statement);
  
  return wine;
}


// Helper function to manage request processing for array of strings
std::vector<std::string> db_handle_request_string(std::string select_sql) {
  std::vector<std::string> result;
  sqlite3_stmt* statement;

  int rc = sqlite3_prepare_v2(db, select_sql.c_str(), -1, &statement, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return result;  // Return an empty vector if preparation fails
  }

  while ((rc = sqlite3_step(statement)) == SQLITE_ROW) {
    const unsigned char* value = sqlite3_column_text(statement, 0);
    if (value != nullptr) {
      result.push_back(reinterpret_cast<const char*>(value));
    }
  }

  if (rc != SQLITE_DONE) {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
  }

  sqlite3_finalize(statement);

  return result;
}

// Helper function to manage request processing for array of structs
std::vector<Wine> db_handle_request_structs(std::string select_sql, const std::string& parameter) {
  std::vector<Wine> wines;
  sqlite3_stmt* statement;
  
  int rc = sqlite3_prepare_v2(db, select_sql.c_str(), -1, &statement, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return wines;  // Return an empty vector if preparation fails
  }
  
  rc = sqlite3_bind_text(statement, 1, parameter.c_str(), -1, SQLITE_STATIC);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to bind parameter: " << sqlite3_errmsg(db) << std::endl;
    sqlite3_finalize(statement);
    return wines;  // Return an empty vector if binding fails
  }
  
  while ((rc = sqlite3_step(statement)) == SQLITE_ROW) {
    Wine wine = retrieve_wine_data(statement);
    wines.push_back(wine);
  }
  
  if (rc != SQLITE_DONE) {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
  }
  
  sqlite3_finalize(statement);

  return wines;
}

// Retrieve a list of unique countries from the databse
std::vector<std::string> db_list_countries() {
  std::vector<std::string> result;
  std::string select_sql = "SELECT DISTINCT country FROM wines WHERE country IS NOT NULL AND country <> '' ORDER BY country ASC";

  result = db_handle_request_string(select_sql);

  return result;
}


// Retrieve wines for a given country 
std::vector<Wine> db_list_by_country(const std::string& parameter) {
  std::vector<Wine> wines;
  std::string select_sql = "SELECT * FROM wines WHERE country=? COLLATE NOCASE LIMIT 500";
  
  wines = db_handle_request_structs(select_sql, parameter);

  return wines;
}


// Retrieve list of wine varieties in the DB
std::vector<std::string> db_list_varieties() {
  std::vector<std::string> result;
  std::string select_sql = "SELECT DISTINCT variety FROM wines WHERE variety IS NOT NULL AND variety <> '' ORDER BY variety ASC";

  result = db_handle_request_string(select_sql);

  return result;
}


// Retrieve wines for a given variety
std::vector<Wine> db_list_by_variety(const std::string& parameter) {
  std::vector<Wine> wines;
  std::string select_sql = "SELECT * FROM wines WHERE variety=? COLLATE NOCASE LIMIT 500";
  
  wines = db_handle_request_structs(select_sql, parameter);
  
  return wines;
}


// Retrieve list of wineries in the DB
std::vector<std::string> db_list_wineries() {
  std::vector<std::string> result;
  std::string select_sql = "SELECT DISTINCT winery FROM wines WHERE winery IS NOT NULL AND winery <> '' ORDER BY winery ASC";

  result = db_handle_request_string(select_sql);

  return result;
}


// Retrieve wines for a given winery
std::vector<Wine> db_list_by_winery(const std::string& parameter) {
  std::vector<Wine> wines;
  std::string select_sql = "SELECT * FROM wines WHERE winery=? COLLATE NOCASE LIMIT 500";
  
  wines = db_handle_request_structs(select_sql, parameter);

  return wines;
}


std::vector<Wine> db_search(const std::string& parameter) {
  std::vector<Wine> wines;
  std::string select_sql = R"(
    SELECT DISTINCT *
    FROM wines
    WHERE 
        country LIKE '%' || ? || '%'
        OR description LIKE '%' || ? || '%'
        OR designation LIKE '%' || ? || '%'
        OR province LIKE '%' || ? || '%'
        OR region_1 LIKE '%' || ? || '%'
        OR region_2 LIKE '%' || ? || '%'
        OR taster_name LIKE '%' || ? || '%'
        OR taster_twitter_handle LIKE '%' || ? || '%'
        OR title LIKE '%' || ? || '%'
        OR variety LIKE '%' || ? || '%'
        OR winery LIKE '%' || ? || '%'
    COLLATE NOCASE
    LIMIT 500
  )";

  sqlite3_stmt* statement;
  int rc = sqlite3_prepare_v2(db, select_sql.c_str(), -1, &statement, nullptr);
  if (rc != SQLITE_OK) {
    std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
    return wines;  // Return an empty vector if preparation fails
  }

  for (int i = 1; i <= 11; ++i) {
    rc = sqlite3_bind_text(statement, i, parameter.c_str(), -1, SQLITE_STATIC);
    if (rc != SQLITE_OK) {
      std::cerr << "Failed to bind parameter: " << sqlite3_errmsg(db) << std::endl;
      sqlite3_finalize(statement);
      return wines;  // Return an empty vector if binding fails
    }
  }

  while ((rc = sqlite3_step(statement)) == SQLITE_ROW) {
    Wine wine = retrieve_wine_data(statement);
    wines.push_back(wine);
  }

  if (rc != SQLITE_DONE) {
    std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
  }

  sqlite3_finalize(statement);

  return wines;
}


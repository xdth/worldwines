#ifndef DATABASE_H
#define DATABASE_H

//--------------------------------------------------------------------
// Includes

#include <sqlite3.h>
#include <vector>

//--------------------------------------------------------------------
// Definitions

struct Wine {
    int id;
    std::string country;
    std::string description;
    std::string designation;
    int points;
    double price;
    std::string province;
    std::string region_1;
    std::string region_2;
    std::string taster_name;
    std::string taster_twitter_handle;
    std::string title;
    std::string variety;
    std::string winery;
};

//--------------------------------------------------------------------
// Function prototypes

int db_open(const std::string& db_name);
int select_callback(void* data, int argc, char** argv, char** column_names);
int db_init(const std::string& db_name, const std::string& db_table_name, const std::string& seeding_dataset);
bool is_db_table_empty(const std::string& db_table_name);
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
           const std::string& winery);
int db_seed(const std::string& seeding_dataset, const std::string& db_table_name);
Wine retrieve_wine_data(sqlite3_stmt* statement);
std::vector<Wine> db_list500();
Wine db_list_by_id(int wine_id);
std::vector<std::string> db_list_countries();
std::vector<Wine> db_list_by_country(const std::string& country);
void db_list_by_year(int year);
std::vector<std::string> db_list_varieties();
std::vector<Wine> db_list_by_variety(const std::string& parameter);
void db_list_by_winery(const std::string& winery);
void db_close();

#endif  // DATABASE_H

#include <iostream>
#include <memory>
#include <cpprest/http_listener.h>
#include <cpprest/http_client.h>
#include <cpprest/json.h>
#include <cpprest/uri.h>
#include <vector>
#include <regex>
#include <future>

#include "../database/database.h"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

// Check if the input stream is interactive
// (i.e. "using docker run -it ..." instead of "docker-compose up")
#ifdef __linux__
#include <unistd.h>
#define INTERACTIVE_MODE isatty(fileno(stdin))
#elif defined(_WIN32) || defined(WIN32)
#include <io.h>
#define INTERACTIVE_MODE _isatty(_fileno(stdin))
#endif


json::value api_return_json(Wine wine) {
  json::value wine_json;
  wine_json[U("id")] = json::value::number(wine.id);
  wine_json[U("country")] = json::value::string(utility::conversions::to_string_t(wine.country));
  wine_json[U("description")] = json::value::string(utility::conversions::to_string_t(wine.description));
  wine_json[U("designation")] = json::value::string(utility::conversions::to_string_t(wine.designation));
  wine_json[U("points")] = json::value::number(wine.points);
  wine_json[U("price")] = json::value::number(wine.price);
  wine_json[U("province")] = json::value::string(utility::conversions::to_string_t(wine.province));
  wine_json[U("region_1")] = json::value::string(utility::conversions::to_string_t(wine.region_1));
  wine_json[U("region_2")] = json::value::string(utility::conversions::to_string_t(wine.region_2));
  wine_json[U("taster_name")] = json::value::string(utility::conversions::to_string_t(wine.taster_name));
  wine_json[U("taster_twitter_handle")] = json::value::string(utility::conversions::to_string_t(wine.taster_twitter_handle));
  wine_json[U("title")] = json::value::string(utility::conversions::to_string_t(wine.title));
  wine_json[U("variety")] = json::value::string(utility::conversions::to_string_t(wine.variety));
  wine_json[U("winery")] = json::value::string(utility::conversions::to_string_t(wine.winery));

  return wine_json;
}

// Send the JSON response
void api_send_response_ok(json::value value, const http_request& request) {

  // Enabling CORS
  http_response response(status_codes::OK);
  response.headers().add(U("Access-Control-Allow-Origin"), U("*"));
  response.headers().add(U("Access-Control-Allow-Methods"), U("GET, POST, OPTIONS"));
  response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type"));
  response.headers().add(U("Content-Type"), U("application/json"));

  response.set_body(value);
  request.reply(response); 
}

// Invalid argument, send an error response
void api_send_response_not_ok(std::string message, const http_request& request) {
    http_response response(status_codes::BadRequest);
    response.set_body(U(message));
    request.reply(response);
}

void api_list_by_id(const http_request& request) {
  // Extract the wine id from the request URL
  auto path = request.relative_uri().path();
  std::string id_str = path.substr(path.find_last_of('/') + 1);

  // @todo: move sanitation and validation to a separate function?
  // Sanitize the wine ID input
  std::string::size_type chars_processed;
  int wine_id = 0;
  try {
    wine_id = std::stoi(id_str, &chars_processed);
  } catch (const std::exception& e) {
    api_send_response_not_ok("Invalid wine ID", request);
    return;
  }

  // Validate the wine ID
  if (chars_processed != id_str.length()) {
    api_send_response_not_ok("Invalid wine ID", request);
    return;
  }

  Wine wine = db_list_by_id(wine_id); // Call db_list_by_id with wine_id and populate the wine object

  json::value wine_json = api_return_json(wine);

  // Send the JSON response
  api_send_response_ok(wine_json, request);
}


void api_list500(const http_request& request) {
  // Call the function in database.cpp to fetch the first 500 wines
  std::vector<Wine> wines = db_list500();
  
  // Convert the vector of wines to a JSON array
  json::value wines_array = json::value::array();
  
  for (const auto& wine : wines) {
    json::value wine_json = api_return_json(wine);
    wines_array[size_t(wines_array.size())] = wine_json;
  }

  // Send the JSON response
  api_send_response_ok(wines_array, request);
}


void api_list_countries(const http_request& request) {
  std::vector<std::string> values = db_list_countries();
  
  // Convert the vector of values to a JSON array
  json::value values_array = json::value::array();
  
  for (const auto& value : values) {
    json::value value_json;
    value_json[U("value")] = json::value::string(value);
    values_array[size_t(values_array.size())] = value_json;
  }

  // Send the JSON response
  api_send_response_ok(values_array, request);
}


void api_list_by_country(const http_request& request) {
  // Retrieve the relative URI from the HTTP request and convert it to UTF-8
  std::string parameter = utility::conversions::to_utf8string(request.relative_uri().path());

  // Remove the leading "/xxxxx/" from the URI
  parameter = parameter.substr(std::string("/country/").length());

  // Trim leading and trailing whitespace from the parameter name
  parameter = std::regex_replace(parameter, std::regex("^\\s+"), "");
  parameter = std::regex_replace(parameter, std::regex("\\s+$"), "");

  // @todo: move validation stuff to a new function?
  // Convert the parameter to lowercase for case-insensitive comparison
  std::transform(parameter.begin(), parameter.end(), parameter.begin(), ::tolower);

  // Check if the parameter is empty or contains invalid characters
  const std::string valid_characters = "abcdefghijklmnopqrstuvwxyz ";
  if (parameter.empty() || parameter.find_first_not_of(valid_characters) != std::string::npos) {
    // Invalid parameter, send an error response
    api_send_response_not_ok("Invalid country", request);
    return;
  }

  // Fetch wines by parameter from the DB
  std::vector<Wine> wines = db_list_by_country(parameter);

  json::value wines_array = json::value::array();

  for (const auto& wine : wines) {
    json::value wine_json = api_return_json(wine);
    wines_array[size_t(wines_array.size())] = wine_json;
  }

  // Send the JSON response
  api_send_response_ok(wines_array, request);
}


void api_list_varieties(const http_request& request) {
  std::vector<std::string> values = db_list_varieties();
  
  // Convert the vector of values to a JSON array
  json::value values_array = json::value::array();
  
  for (const auto& value : values) {
    json::value value_json;
    value_json[U("value")] = json::value::string(value);
    values_array[size_t(values_array.size())] = value_json;
  }

  // Send the JSON response
  api_send_response_ok(values_array, request);
}


void api_list_by_variety(const http_request& request) {
  // Retrieve the relative URI from the HTTP request and convert it to UTF-8
  std::string parameter = utility::conversions::to_utf8string(request.relative_uri().path());

  // Remove the leading "/xxxxx/" from the URI
  parameter = parameter.substr(std::string("/variety/").length());

  // Trim leading and trailing whitespace from the parameter name
  parameter = std::regex_replace(parameter, std::regex("^\\s+"), "");
  parameter = std::regex_replace(parameter, std::regex("\\s+$"), "");

  // @todo: move validation stuff to a new function?
  // Convert the parameter to lowercase for case-insensitive comparison
  std::transform(parameter.begin(), parameter.end(), parameter.begin(), ::tolower);

  // Check if the parameter is empty or contains invalid characters
  const std::string valid_characters = "abcdefghijklmnopqrstuvwxyz ";
  if (parameter.empty() || parameter.find_first_not_of(valid_characters) != std::string::npos) {
    // Invalid parameter, send an error response
    api_send_response_not_ok("Invalid variety", request);
  }

  // Fetch wines by parameter from the DB
  std::vector<Wine> wines = db_list_by_variety(parameter);

  json::value wines_array = json::value::array();

  for (const auto& wine : wines) {
    json::value wine_json = api_return_json(wine);
    wines_array[size_t(wines_array.size())] = wine_json;
  }

  // Send the JSON response
  api_send_response_ok(wines_array, request);
}


void api_list_wineries(const http_request& request) {
  std::vector<std::string> values = db_list_wineries();
  
  // Convert the vector of values to a JSON array
  json::value values_array = json::value::array();
  
  for (const auto& value : values) {
    json::value value_json;
    value_json[U("value")] = json::value::string(value);
    values_array[size_t(values_array.size())] = value_json;
  }

  // Send the JSON response
  api_send_response_ok(values_array, request);
}


void api_list_by_winery(const http_request& request) {
  // Retrieve the relative URI from the HTTP request and convert it to UTF-8
  std::string parameter = utility::conversions::to_utf8string(request.relative_uri().path());

  // Remove the leading "/xxxxx/" from the URI
  parameter = parameter.substr(std::string("/winery/").length());

  // Trim leading and trailing whitespace from the parameter name
  parameter = std::regex_replace(parameter, std::regex("^\\s+"), "");
  parameter = std::regex_replace(parameter, std::regex("\\s+$"), "");

  // @todo: move validation stuff to a new function?
  // Convert the parameter to lowercase for case-insensitive comparison
  std::transform(parameter.begin(), parameter.end(), parameter.begin(), ::tolower);

  // Check if the parameter is empty or contains invalid characters
  const std::string valid_characters = "abcdefghijklmnopqrstuvwxyz ";
  if (parameter.empty() || parameter.find_first_not_of(valid_characters) != std::string::npos) {
    // Invalid parameter, send an error response
    api_send_response_not_ok("Invalid winery", request);
    return;
  }

  // Fetch wines by parameter from the DB
  std::vector<Wine> wines = db_list_by_winery(parameter);

  json::value wines_array = json::value::array();

  for (const auto& wine : wines) {
    json::value wine_json = api_return_json(wine);
    wines_array[size_t(wines_array.size())] = wine_json;
  }

  // Send the JSON response
  api_send_response_ok(wines_array, request);
}


int api_start() {
  std::shared_ptr<http_listener> listener_ptr = std::make_shared<http_listener>(U("http://0.0.0.0:8080"));

  listener_ptr->support(methods::GET, [=](http_request request) {
    auto path = request.relative_uri().path();

    // Route: /wine
    if (path.find(U("/wine/")) != std::string::npos) {
      try {
        api_list_by_id(request);
        return;
      } catch (const std::exception& e) {
        // Invalid argument, send an error response
        http_response response(status_codes::BadRequest);
        response.set_body(U("Invalid wine ID"));
        request.reply(response);
        return;
      }
    }
    
    // Route: /wines/:wine
    if (path == U("/wines")) {
      api_list500(request);
      return;
    }

    // Route: /countries
    if (path == U("/countries")) {
      api_list_countries(request);
      return;
    }

    // Route: /country/:country
    if (path.find(U("/country/")) != std::string::npos) {
      try {
        api_list_by_country(request);
        return;
      } catch (const std::exception& e) {
        // Invalid argument, send an error response
        http_response response(status_codes::BadRequest);
        response.set_body(U("Invalid country"));
        request.reply(response);
        return;
      }
    }

    // Route: /varieties
    if (path == U("/varieties")) {
      api_list_varieties(request);
      return;
    }

    // Route: /variety/:variety
    if (path.find(U("/variety/")) != std::string::npos) {
      try {
        api_list_by_variety(request);
        return;
      } catch (const std::exception& e) {
        // Invalid argument, send an error response
        http_response response(status_codes::BadRequest);
        response.set_body(U("Invalid variety"));
        request.reply(response);
        return;
      }
    }

    // Route: /wineries
    if (path == U("/wineries")) {
      api_list_wineries(request);
      return;
    }

    // Route: /winery/:winery
    if (path.find(U("/winery/")) != std::string::npos) {
      try {
        api_list_by_winery(request);
        return;
      } catch (const std::exception& e) {
        // Invalid argument, send an error response
        http_response response(status_codes::BadRequest);
        response.set_body(U("Invalid winery"));
        request.reply(response);
        return;
      }
    }

    // Invalid endpoint
    http_response response_not_found(status_codes::NotFound);
    response_not_found.set_body(U("Invalid endpoint"));
    request.reply(response_not_found);
  });

try {
  listener_ptr->open().then([&listener_ptr]() {
    if (INTERACTIVE_MODE || getenv("DOCKER_COMPOSE")) {
      // Interactive mode
      std::string input;
      bool should_exit = false;

      while (!should_exit) {
        std::cout << "Server started on port X. Press 'q' to quit: "; // @todo: port from the config file

        if (std::getline(std::cin, input)) {
          if (input == "q") {
            listener_ptr->close().wait();
            should_exit = true;
          } else {
            std::cout << "Wrong option " << input << std::endl;
          }
        } else {
          // Handle error or end-of-file condition
          std::cerr << "Error reading input. Exiting loop." << std::endl;
          should_exit = true;
        }
      }
    } else {
      // Non-interactive mode
      std::cout << "Non-interactive mode, listener will remain open." << std::endl;

      // Keep the listener open indefinitely
      std::promise<void> exit_signal;
      std::future<void> future_obj = exit_signal.get_future();
      future_obj.wait();
    }
  }).wait();
} catch (const std::exception& e) {
  std::cout << "Error: " << e.what() << std::endl;
  return 1;
}

  return 0;
}

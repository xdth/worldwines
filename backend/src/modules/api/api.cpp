#include <iostream>
#include <cpprest/http_listener.h>
#include <cpprest/http_client.h>
#include <cpprest/json.h>
#include <vector>
#include <regex>

#include "../database/database.h"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;


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
    // Invalid wine ID, send an error response
    http_response response(status_codes::BadRequest);
    response.set_body(U("Invalid wine ID"));
    request.reply(response);
    return;
  }

  // Validate the wine ID
  if (chars_processed != id_str.length()) {
    // Invalid wine ID, send an error response
    http_response response(status_codes::BadRequest);
    response.set_body(U("Invalid wine ID"));
    request.reply(response);
    return;
  }

  Wine wine = db_list_by_id(wine_id); // Call db_list_by_id with wine_id and populate the wine object

  json::value wine_json = api_return_json(wine);

  // Send the JSON response
  http_response response(status_codes::OK);
  response.headers().add(U("Content-Type"), U("application/json"));
  response.set_body(wine_json);
  request.reply(response);
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
  http_response response(status_codes::OK);
  response.headers().add(U("Content-Type"), U("application/json"));
  response.set_body(wines_array);
  request.reply(response);
}


void api_list_by_country(const http_request& request) {
  // Retrieve the relative URI from the HTTP request and convert it to UTF-8
  std::string country = utility::conversions::to_utf8string(request.relative_uri().path());

  // Remove the leading "/country/" from the URI
  country = country.substr(std::string("/country/").length());

  // Trim leading and trailing whitespace from the country name
  country = std::regex_replace(country, std::regex("^\\s+"), "");
  country = std::regex_replace(country, std::regex("\\s+$"), "");

  // Convert the country name to lowercase for case-insensitive comparison
  std::transform(country.begin(), country.end(), country.begin(), ::tolower);

  // Check if the contry name is empty or contains invalid characters
  const std::string valid_characters = "abcdefghijklmnopqrstuvwxyz ";
  if (country.empty() || country.find_first_not_of(valid_characters) != std::string::npos) {
    // Invalid country name, send an error response
    http_response response(status_codes::BadRequest);
    response.set_body(U("Invalid country name"));
    request.reply(response);
    return;
  }

  // Call db_list_by_country to fetch wines by country
  std::vector<Wine> wines = db_list_by_country(country);

  json::value wines_array = json::value::array();

  for (const auto& wine : wines) {
    json::value wine_json = api_return_json(wine);
    wines_array[size_t(wines_array.size())] = wine_json;
  }

  // Send the JSON response
  http_response response(status_codes::OK);
  response.headers().add(U("Content-Type"), U("application/json"));
  response.set_body(wines_array);
  request.reply(response);
}


int api_start() {
  http_listener listener(U("http://0.0.0.0:8080")); // @todo: this should be in the config file

  listener.support(methods::GET, [](const http_request& request) {
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
    
    // Route: /wines
    if (path == U("/wines")) {
      api_list500(request);
      return;
    }

    // Route: /country
    if (path.find(U("/country/")) != std::string::npos) {
      try {
        api_list_by_country(request);
        return;
      } catch (const std::exception& e) {
        // Invalid argument, send an error response
        http_response response(status_codes::BadRequest);
        response.set_body(U("Invalid country name"));
        request.reply(response);
        return;
      }
    }

    // Invalid endpoint
    http_response response(status_codes::NotFound);
    response.set_body(U("Invalid endpoint"));
    request.reply(response);
  });

  try {
    listener.open().wait();

    std::string input;

    // Check for "q" as input to exit the loop
    while (input != "q") {
      std::cout << "Server started. Press 'q' to quit: ";
      std::getline(std::cin, input);
      std::cout << "\nWrong option. You entered: " << input << std::endl;
    }

    listener.close().wait();
  } catch (const std::exception& e) {
    std::cout << "Error: " << e.what() << std::endl;
    return 1;
  }

  return 0;
}

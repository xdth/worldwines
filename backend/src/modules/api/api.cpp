#include <iostream>
#include <cpprest/http_listener.h>
#include <cpprest/http_client.h>
#include <cpprest/json.h>
#include <vector>

#include "../database/database.h"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;


void api_list_by_id(const http_request& request)
{
    // Extract the wine id from the request URL
    auto path = request.relative_uri().path();
    int wine_id = std::stoi(path.substr(path.find_last_of('/') + 1));

    Wine wine = db_list_by_id(wine_id); // Call db_list_by_id with wine_id and populate the wine object

    json::value wineJson;
    wineJson[U("id")] = json::value::number(wine.id);
    wineJson[U("country")] = json::value::string(utility::conversions::to_string_t(wine.country));
    wineJson[U("description")] = json::value::string(utility::conversions::to_string_t(wine.description));
    wineJson[U("designation")] = json::value::string(utility::conversions::to_string_t(wine.designation));
    wineJson[U("points")] = json::value::number(wine.points);
    wineJson[U("price")] = json::value::number(wine.price);
    wineJson[U("province")] = json::value::string(utility::conversions::to_string_t(wine.province));
    wineJson[U("region_1")] = json::value::string(utility::conversions::to_string_t(wine.region_1));
    wineJson[U("region_2")] = json::value::string(utility::conversions::to_string_t(wine.region_2));
    wineJson[U("taster_name")] = json::value::string(utility::conversions::to_string_t(wine.taster_name));
    wineJson[U("taster_twitter_handle")] = json::value::string(utility::conversions::to_string_t(wine.taster_twitter_handle));
    wineJson[U("title")] = json::value::string(utility::conversions::to_string_t(wine.title));
    wineJson[U("variety")] = json::value::string(utility::conversions::to_string_t(wine.variety));
    wineJson[U("winery")] = json::value::string(utility::conversions::to_string_t(wine.winery));

    // Send the JSON response
    http_response response(status_codes::OK);
    response.headers().add(U("Content-Type"), U("application/json"));
    response.set_body(wineJson);
    request.reply(response);
}


void api_list500(const http_request& request) {
    // Call the function in database.cpp to fetch the first 500 wines
    std::vector<Wine> wines = db_list500();

    // Convert the vector of wines to a JSON array
    json::value winesArray = json::value::array();

    for (const auto& wine : wines) {
        json::value wineJson;
        wineJson[U("id")] = json::value::number(wine.id);
        wineJson[U("country")] = json::value::string(utility::conversions::to_string_t(wine.country));
        wineJson[U("description")] = json::value::string(utility::conversions::to_string_t(wine.description));
        wineJson[U("designation")] = json::value::string(utility::conversions::to_string_t(wine.designation));
        wineJson[U("points")] = json::value::number(wine.points);
        wineJson[U("price")] = json::value::number(wine.price);
        wineJson[U("province")] = json::value::string(utility::conversions::to_string_t(wine.province));
        wineJson[U("region_1")] = json::value::string(utility::conversions::to_string_t(wine.region_1));
        wineJson[U("region_2")] = json::value::string(utility::conversions::to_string_t(wine.region_2));
        wineJson[U("taster_name")] = json::value::string(utility::conversions::to_string_t(wine.taster_name));
        wineJson[U("taster_twitter_handle")] = json::value::string(utility::conversions::to_string_t(wine.taster_twitter_handle));
        wineJson[U("title")] = json::value::string(utility::conversions::to_string_t(wine.title));
        wineJson[U("variety")] = json::value::string(utility::conversions::to_string_t(wine.variety));
        wineJson[U("winery")] = json::value::string(utility::conversions::to_string_t(wine.winery));

        winesArray[size_t(winesArray.size())] = wineJson;
    }

    // Send the JSON response
    http_response response(status_codes::OK);
    response.headers().add(U("Content-Type"), U("application/json"));
    response.set_body(winesArray);
    request.reply(response);
}

int api_start() {
    http_listener listener(U("http://localhost:8080"));

    listener.support(methods::GET, [](const http_request& request) {
        auto path = request.relative_uri().path();
        if (path.find(U("/wine/")) != std::string::npos) {
            // Extract the wine ID from the URL
            std::string wineId = utility::conversions::to_utf8string(path.substr(path.find_last_of('/') + 1));

            // Convert the wine ID string to an integer

            
            try {
                // Call the function to handle the specific wine ID
                api_list_by_id(request);
            } catch (const std::exception& e) {
                // Invalid wine ID, send an error response
                http_response response(status_codes::BadRequest);
                response.set_body(U("Invalid wine ID"));
                request.reply(response);
            }
        }
        else if (path == U("/wines"))
            api_list500(request);
        else {
            http_response response(status_codes::NotFound);
            response.set_body(U("Invalid endpoint"));
            request.reply(response);
        }
    });

    try {
        listener.open().wait();
        std::cout << "Server started on port 8080..." << std::endl;
        std::cin.get(); // Wait for user input before closing (optional)
        listener.close().wait();
    }
    catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}

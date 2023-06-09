//*******************************************************************
// Quebec, April 12, 2020                                          //
// Author: dth                                                     //
//                                                                 //
// https://dthlabs.com                                             //
// dth [at] dthlabs [dot] com                                      //
//*******************************************************************

//--------------------------------------------------------------------
// ToDo
//
// 1. Write help
// 2. Unit testing with catch2 or shell script
// 3. The config.env file should be declared on app.cpp and passed as
//    an argument to the function in the config library [DONE]
// 4. We should be able to specify the config file in a command line
//    argument, prioritary to the one in @todo 3
// 5. The @todo 3 and 4 also apply to the db filename
// 6. Program has to only exit on CTRL+C
// 10. Do some security checking (SQL injection, etc)
// 11. Choose better names for functions
//--------------------------------------------------------------------


//--------------------------------------------------------------------
// Including app libraries

#include <iostream>
#include <fstream>
#include <unistd.h>
#include <string>
#include <map>

#include "modules/config/config.h"
#include "modules/database/database.h"
#include "modules/api/api.h"

//--------------------------------------------------------------------
// Config variables

std::string config_file = "config/config.env"; // @todo 3
std::map<std::string, std::string> config_values;

//--------------------------------------------------------------------
// Function prototypes

// int help(); @todo


//--------------------------------------------------------------------
// Main

int main(int argc, char *argv[]) {

    // Read config file keys and values into the map
    config_values = read_config_file(config_file);

    // Exit if there's an issue with the config file (missing, etc.)
    if (config_values.find("error") != config_values.end()) {
      std::cerr << "Fatal error - " << config_values["error"] << std::endl;
      return 1;
    }

    // Create the database and tables if the DB doesn't exist, seeding the DB afterwards.
    db_init(config_values["db_name"], config_values["db_table_name"], config_values["seeding_dataset"]);

    // Start API
    api_start();




    ///////////////////////////////////////
    // List by id

    // Wine wine = db_list_by_id(517);

    // // Print the individual values of the Wine struct
    // std::cout << "ID: " << wine.id << std::endl;
    // std::cout << "Country: " << wine.country << std::endl;
    // std::cout << "Description: " << wine.description << std::endl;
    // std::cout << "Designation: " << wine.designation << std::endl;
    // std::cout << "Points: " << wine.points << std::endl;
    // std::cout << "Price: " << wine.price << std::endl;
    // std::cout << "Province: " << wine.province << std::endl;
    // std::cout << "Region 1: " << wine.region_1 << std::endl;
    // std::cout << "Region 2: " << wine.region_2 << std::endl;
    // std::cout << "Taster Name: " << wine.taster_name << std::endl;
    // std::cout << "Taster Twitter Handle: " << wine.taster_twitter_handle << std::endl;
    // std::cout << "Title: " << wine.title << std::endl;
    // std::cout << "Variety: " << wine.variety << std::endl;
    // std::cout << "Winery: " << wine.winery << std::endl;




    ///////////////////////////////////////
    // List by wines

    // std::vector<Wine> wines = db_list500();

    // for (const Wine& wine : wines) {
    //     std::cout << "ID: " << wine.id << std::endl;
    //     std::cout << "Country: " << wine.country << std::endl;
    //     std::cout << "Description: " << wine.description << std::endl;
    //     std::cout << "Designation: " << wine.designation << std::endl;
    //     std::cout << "Points: " << wine.points << std::endl;
    //     std::cout << "Price: " << wine.price << std::endl;
    //     std::cout << "Province: " << wine.province << std::endl;
    //     std::cout << "Region 1: " << wine.region_1 << std::endl;
    //     std::cout << "Region 2: " << wine.region_2 << std::endl;
    //     std::cout << "Taster Name: " << wine.taster_name << std::endl;
    //     std::cout << "Taster Twitter Handle: " << wine.taster_twitter_handle << std::endl;
    //     std::cout << "Title: " << wine.title << std::endl;
    //     std::cout << "Variety: " << wine.variety << std::endl;
    //     std::cout << "Winery: " << wine.winery << std::endl;
    //     std::cout << std::endl;
    // }




    // Close the database connection
    db_close();

    return 0;
}
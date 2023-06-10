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
// #include <csignal>

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

// Signal handler function
void signal_callback_handler(int signum) {
   std::cout << "Caught signal " << signum << std::endl;
   std::cout << "Bye." << std::endl;
   // Terminate program
   exit(signum);
}

int main(int argc, char *argv[]) {

  // Register signal handler
  std::signal(SIGINT, signal_callback_handler);

  // Read config file keys and values into the map
  config_values = read_config_file(config_file);

  // Exit if there's an issue with the config file (missing, etc.)
  if (config_values.find("error") != config_values.end()) {

    std::cerr << "Fatal error - " << config_values["error"] << std::endl;
    return 1;
  }

  // Create the database and tables if the DB doesn't exist, seeding the DB afterwards.
  db_init(config_values["db_name"], config_values["db_table_name"], config_values["seeding_dataset"]);

  // Start the server
  api_start();

  // Close DB connection
  db_close();

  return 0;
}
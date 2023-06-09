//--------------------------------------------------------------------
// Libraries

#include <iostream>
#include <fstream>
#include <string>
#include <map>

//--------------------------------------------------------------------
// Function int read_config_file(std::string config_file);
//
// Reads the config file and adds the key and values to map
//
// Returns:
// - std::map<std::string, std::string>

std::map<std::string, std::string> read_config_file(std::string config_file_name) {

  // Map for holding config values in key/value
  std::map<std::string, std::string> config_values;

  // Open the config file
  std::ifstream config_file(config_file_name);
  if (!config_file) {
    // std::cerr << "Failed to open config file: " << config_file_name << std::endl;
    std::string error = "failed to open config file: " + config_file_name;
    config_values.insert(std::make_pair("error", error));
    return config_values;
  }
  
  // Read each line from the config file
  std::string line;

  while (std::getline(config_file, line)) {

    // Skip empty lines and lines starting with '#'
    if (line.empty() || line[0] == '#')
      continue;

    // Find the position of the first '=' character
    size_t equal_pos = line.find('=');

    if (equal_pos == std::string::npos) {
      std::cerr << "Invalid line in config file: " << line << std::endl;
      continue;
    }

    // Extract the key and value from the line
    std::string key = line.substr(0, equal_pos);
    std::string value = line.substr(equal_pos + 1);

    // Trim leading and trailing whitespaces from key and value
    size_t first_non_space = key.find_first_not_of(' ');
    size_t last_non_space = key.find_last_not_of(' ');

    key = key.substr(first_non_space, last_non_space - first_non_space + 1);
    first_non_space = value.find_first_not_of(' ');
    last_non_space = value.find_last_not_of(' ');
    value = value.substr(first_non_space, last_non_space - first_non_space + 1);
    // Store the key-value pair in the map
    config_values[key] = value;
  }

  // Print the key-value pairs
  for (const auto& pair : config_values) {
    std::cout << "Key: " << pair.first << ", Value: " << pair.second << std::endl;
  }
  
  // Close the config file
  config_file.close();

  return config_values;
}
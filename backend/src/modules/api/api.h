#ifndef API_H
#define API_H

//--------------------------------------------------------------------
// Includes

#include <cpprest/http_listener.h>
#include "../database/database.h"


//--------------------------------------------------------------------
// Namespaces

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;


//--------------------------------------------------------------------
// Function prototypes

json::value api_return_json(Wine wine);
void api_list_by_id(const http_request& request);
void api_list500(const http_request& request);
int api_start();

#endif  // API_H

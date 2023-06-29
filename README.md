**[UNDER CONSTRUCTION - WORK IN PROGRESS]**


# worldwines

Search among the most important wines of the planet to obtain interesting information and reviews.

## Screenshots

 <table style="width:100%; border: none;">
  <tr style="border: none;">
    <td style="border: none;">
      <!-- <img src="https://raw.githubusercontent.com/xdth/worldwines/main/frontend/src/assets/wwapp.png" alt="screenshot"> -->
      <img src="https://i.imgur.com/t1FEF0O.png" alt="screenshot">
    </td>
    <td style="border: none;">
      <!-- <img src="https://raw.githubusercontent.com/xdth/worldwines/main/frontend/src/assets/wwapp_mobile.png" alt="screenshot"> -->
      <img src="https://i.imgur.com/wYsFC2Z.png" alt="screenshot">
    </td>
  </tr>
</table> 


## Tech

ChatGPT AI, C++ for the rest backend, React JS for the front-end and SQLite for the database.

### API

The backend must be configured by a config file in backend/config/config.env, but 
command line arguments may also be implemented eventually.

Test coverage

#### Dependencies
- If compiling with Archlinux: **`yay -S cpprestsdk`**
- If compiling with Debian based: **`apt install libcpprest-dev`**


#### Endpoints implemented

- [x] **`/wines`** Retrieve wines (max 500 entries)
- [x] **`/wine/:wine_id`** Retrieve a wine with a given id
- [x] **`/countries`** Retrieve list of countries in the DB
- [x] **`/country/:country`** Retrieve wines for a given country
- [x] **`/varieties`** Retrieve list of wine varieties in the DB
- [x] **`/variety/:variety`** Retrieve wines for a given variety
- [x] **`/wineries`** Retrieve list of wineries in the DB
- [x] **`/winery/:winery`** Retrieve wines for a given winery
- [x] **`/search/:search_string`** Searches the db for a given string


#### Database
sqlite3

#### Unit test
https://github.com/catchorg/Catch2

### Front-End
Autocomplete no input principal (next version?)

### Docker


## Dataset and License

id,country,description,designation,points,price,province,region_1,region_2,taster_name,taster_twitter_handle,title,variety,winery

**[UNDER CONSTRUCTION - WORK IN PROGRESS]**
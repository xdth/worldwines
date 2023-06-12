**[UNDER CONSTRUCTION - WORK IN PROGRESS]**


# worldwines

Search among the most important wines of the planet and obtain interesting information and reviews.


## Tech

C++ for the rest backend, React JS for the front-end and SQLite for the database.

### API

The backend must be configured by a config file in backend/config/config.env, but 
command line arguments may also be implemented eventually.

Test coverage

#### Dependencies
- If compiling with Archlinux: **`yay -S cpprestsdk`**
- If compiling with Debian based: **`apt install libcpprest-dev`**


#### Endpoints

- [x] **`/wines`** show wines (max 500 entries)
- [x] **`/wine/:wine_id`** show a wine with a given id
- [x] **`/countries`** show list of countries in the DB
- [x] **`/country/:country`** show wines for a given country (max 500 entries)
- [ ] **`/years`** show list of years in the DB
- [ ] **`/year/:year`** show wines for a given year (max 500 entries)
- [ ] **`/varieties`** show list of wine varieties in the DB
- [ ] **`/variety/:variety`** show wines for a given variety (max 500 entries)
- [ ] **`/wineries`** show list of wineries in the DB
- [ ] **`/winery/:winery`** show wines for a given winery (max 500 entries)


#### Database
sqlite3

#### Unit test
https://github.com/catchorg/Catch2

### Front-End
Autocomplete no input principal, pra q se eu comecar a digitar Brazil ou Vinho Seco ou whatever, ja aparecam as sugestoes.
 (next version?)

### Docker


## Dataset and License

id,country,description,designation,points,price,province,region_1,region_2,taster_name,taster_twitter_handle,title,variety,winery


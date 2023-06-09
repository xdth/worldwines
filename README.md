**[UNDER CONSTRUCTION - WORK IN PROGRESS]**


# worldwines

Search among the most important wines of the planet and obtain interesting information and reviews.


## Tech

C++ for the rest backend, React JS for the front-end and SQLite for the database.

### API

Warning: This was created by a JS dev (me), I am not a professional C++ dev. So this code is probably
a train-wreck (for now)... but hey, I wanted to create an API in C++ and here it is.

The backend must be configured by a config file, but command line arguments shall also be implemented.

Test coverage

#### Dependencies
- If compiling with Archlinux: **`yay -S cpprestsdk`**
- If compiling with Debian based: **`apt install libcpprest-dev`**


#### Endpoints

- [x] **`/wines`** show firs 500 wines (max 500 entries)
- [x] **`/wines/:wine_id`** show a wine with the given id
- [ ] **`/wines/countries`** show list of countries in the DB (max 500 entries)
- [ ] **`/wines/:country`** show wines for a given country (max 500 entries)
- [ ] **`/wines/:year`** show wines for a given year (max 500 entries)
- [ ] **`/wines/:variety`** show wines for a given variety (max 500 entries)
- [ ] **`/wines/:winery`** show wines for a given winery (max 500 entries)


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


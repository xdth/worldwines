[UNDER CONSTRUCTION - WORK IN PROGRESS]


# worldwines

Search among the most important wines of the planet and obtain interesting information and reviews.


## Tech

C++ for the rest backend, React JS for the front-end, SQLite for the database and shell script for DB seeding.

### API

Warning: This was created by a JS dev (me), I am not a professional C++ dev. So this code is probably
a train-wreck (for now)... but hey, I wanted to create an API in C++ and here it is.

The backend must be configured by a config file, but command line arguments shall also be implemented.

- Test coverage


#### Endpoints

/

/wines
- aparece 500 primeiros vinhos

/wines/canada
- list all wines from Canada

/wines/1980
- list all wines from this year (next version)

/wines/variety
- list all varieties

/wines/winery
- list all wineries

/wine/:id

/countries
- list all countries in the database (DISTINCT)

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


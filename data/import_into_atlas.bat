set /p Input=Enter database connection string:

mongoimport --uri "%Input%" --collection pokemon --file pokedex_data.json --jsonArray
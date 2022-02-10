# Storefront Backend Project

## Connecting to the database

this project depends on postgres DBMS, so it should be installed.

to connect to the database you must have in the .env file these variables:
`DB`: this holds the the database name
`DB_TEST` : this holds the test database name
`DB_HOST`: this holds the host ip address that the client would connect to it.
`DB_USER`: this holds the database user that has privelege to connect and manipulate the database
`DB_PASSWORD`: this should have the datbase user's passwrord

and rest of the work will be handles with the dotenv package.

* postgresql port is 5432

## Installing required dependencies
you should run `npm install` and the required packages will be installed automatically

## initiating development server
you should run `npm run watch` to run watch command
server is running on port 3000
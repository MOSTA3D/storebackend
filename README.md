# Storefront Backend Project

## Database creation
for creating the database you MUST **create the database as `storedb`**
and create the test database as **storedb_test**

*if something not as the previous format, it will not work*

## Connecting to the database

this project depends on postgres DBMS, so it should be installed.

to connect to the database you must have in the .env file these variables:
`DB`: this holds the the database name
`DB_TEST` : this holds the test database name
`DB_HOST`: this holds the host ip address that the client would connect to it.
`DB_USER`: this holds the database user that has privelege to connect and manipulate the database
`DB_PASSWORD`: this should have the datbase user's passwrord

for example:

`DB_USER=user`
`DB_PASSWORD=password`
`DB_HOST=127.0.0.1`
`DB=storedb`
`DB_TEST=storedb_test`
`ENV=dev`

and for this values, you should consider creating a database user of the name `user` and its password must be `password` and granting all priveleges for this user in the psql shell *that must be installed in advance* as follows:

*or you can skip this part by providing the postgres user and password in the `.env` file.*

for creating the user you must enter: `CREATE USER user WITH PASSWORD 'password';`
and with this user you must create the databases with: `CREATE DATABASE storedb;` and for the testing database `CREATE DATABASE storedb_test;`

you must grant all priveleges on this databases or change ownership to this user as follows:
`ALTER DATABASE storedb OWNER TO user;`

and also for the test database as follows:
`ALTER DATABASE storedb_test OWNER TO user;`

and rest of the work will be handled with the dotenv package.

* postgresql port is 5432

## Creating required tables
by typing  `db-migrate up` command in the terminal, tables users, orders, products and orderproducts will be created automatically

## Installing required dependencies
you should run `npm install` and the required packages will be installed automatically

## Requird environment variables with an example for their values

DB_USER=user
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB=storedb
DB_TEST=storedb_test
ENV=dev

SALT_ROUNDS=10
PEPPER=someSortOfPepper

PVTKEY=xdqvkB43QajcBzi2fW0b9k+gFVW3JBqfjkQcLbSHJy1lGXkC8qN6PmpgExmGyJ5aGoXPdVxhT4UQ/I2/eb8P5GLc8FdqrxAI/WqrKSO0D8LsLC/ZpZUIxp3hGTkOfrH/lvkN2PiPAeaCTi6qSrc5tDbET2ZlONjvdk1CbC6m9b8HsRDgpdoZp5NM4T+T7jBO+GOHc1HvWHOur1fqOY0EzwFdkhENa7oIEu6l3B5c5ebEoHXoOo/WdWjM8VXMKHdbAcDV8ltmYbq97BmKCtBEs5TX2881prmP+Fq249BIdFKCMzzUr1dNSIfcBBAmyB5fuQyupxSf7LrtQryp0VjEHA==

## initiating development server
you should run `npm run watch` to run watch command
server is running on port 3000
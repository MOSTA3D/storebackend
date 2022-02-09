# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index at route: by a GET request to `/products`
- Show at route: by a GET request to `products/:id` as id is the id of the product that is intended to be showed.
- Create [token required]: by a POST request to `/products` with an object of type Product in the body of the request 
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: by a GET request to `/users`
- Show [token required]: by a GET request to `/users/:id` _id is the user id_
- Create N[token required]: by a POST request to `/users` with an object of type User in the body of the request

#### Orders
- Current Order by user (args: user id)[token required]: by a GET request to `/orders/myorder`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database shema

                                    Table "public.users"
  Column   |         Type          | Collation | Nullable |              Default              
-----------+-----------------------+-----------+----------+-----------------------------------
 id        | integer               |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(40) |           | not null | 
 lastname  | character varying(40) |           |          | 
 password  | character varying     |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_uid_fkey" FOREIGN KEY (uid) REFERENCES users(id)


                              Table "public.orders"
 Column |     Type     | Collation | Nullable |              Default               
--------+--------------+-----------+----------+------------------------------------
 id     | integer      |           | not null | nextval('orders_id_seq'::regclass)
 status | character(8) |           |          | 
 uid    | integer      |           |          | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_uid_fkey" FOREIGN KEY (uid) REFERENCES users(id)
Referenced by:
    TABLE "orderproducts" CONSTRAINT "orderproducts_oid_fkey" FOREIGN KEY (oid) REFERENCES orders(id)


                             Table "public.orderproducts"
  Column  |  Type   | Collation | Nullable |                  Default                  
----------+---------+-----------+----------+-------------------------------------------
 id       | integer |           | not null | nextval('orderproducts_id_seq'::regclass)
 quantity | integer |           |          | 
 oid      | integer |           |          | 
 pid      | integer |           |          | 
Indexes:
    "orderproducts_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orderproducts_oid_fkey" FOREIGN KEY (oid) REFERENCES orders(id)
    "orderproducts_pid_fkey" FOREIGN KEY (pid) REFERENCES products(id)

## ENV variables

they should be in the following format with an example:

DB_USER=user
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB=storedb
DB_TEST=storedb_test
ENV=dev

SALT_ROUNDS=10
PEPPER=someSortOfPepper

PVTKEY=xdqvkB43QajcBzi2fW0b9k+gFVW3JBqfjkQcLbSHJy1lGXkC8qN6PmpgExmGyJ5aGoXPdVxhT4UQ/I2/eb8P5GLc8FdqrxAI/WqrKSO0D8LsLC/ZpZUIxp3hGTkOfrH/lvkN2PiPAeaCTi6qSrc5tDbET2ZlONjvdk1CbC6m9b8HsRDgpdoZp5NM4T+T7jBO+GOHc1HvWHOur1fqOY0EzwFdkhENa7oIEu6l3B5c5ebEoHXoOo/WdWjM8VXMKHdbAcDV8ltmYbq97BmKCtBEs5TX2881prmP+Fq249BIdFKCMzzUr1dNSIfcBBAmyB5fuQyupxSf7LrtQryp0VjEHA==
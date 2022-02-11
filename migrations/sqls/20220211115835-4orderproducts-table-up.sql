CREATE TABLE orderproducts (id SERIAL PRIMARY KEY, quantity INTEGER, oid INTEGER REFERENCES orders(id), pid INTEGER REFERENCES products(id));

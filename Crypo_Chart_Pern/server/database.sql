CREATE DATABASE crypto_chart;


CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    created_at date default current_date
);

CREATE TABLE bitcoin_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);

CREATE TABLE ethereum_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);
CREATE TABLE ethereum2_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);

CREATE TABLE tether_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);
CREATE TABLE bnb_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);

CREATE TABLE usd_coin_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);

CREATE TABLE xrp_chart_data (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    price NUMERIC(20,10) NOT NULL
);


INSERT INTO users(email, password) VALUES ('someEamil', 'somePass');
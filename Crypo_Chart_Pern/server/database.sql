CREATE DATABASE crypto_chart;


CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    created_at date default current_date
);

CREATE TABLE investments (
  id serial primary key,
  user_id INTEGER NOT NULL REFERENCES users(id),
  coin varchar(255) NOT NULL,
  coin_value FLOAT NOT NULL,
  amount FLOAT NOT NULL,
  crypto_total FLOAT NOT NULL,
  created_at timestamp default current_date
);

CREATE TABLE crypto_unix (
  id serial primary key,
  cryptoBlock varchar(255) unique,
  unix NUMERIC
);

INSERT INTO users(email, password) VALUES ('someEamil', 'somePass');




-- *** Crypto Databases ***

-- 0 
CREATE TABLE crypto_market (
  rank NUMERIC,
  crypto_id VARCHAR(50) PRIMARY KEY,
  symbol VARCHAR(50),
  name VARCHAR(50),
  image VARCHAR(350),
  current_price FLOAT,
  market_cap FLOAT,
  market_cap_rank INTEGER,
  fully_diluted_valuation FLOAT,
  total_volume FLOAT,
  volume_24hr FLOAT,
  high_24h FLOAT,
  low_24h FLOAT,
  price_change_24h FLOAT,
  price_change_percentage_24h FLOAT,
  market_cap_change_24h FLOAT,
  market_cap_change_percentage_24h FLOAT,
  circulating_supply FLOAT,
  total_supply FLOAT,
  max_supply FLOAT,
  unix FLOAT
);

CREATE TABLE crypto_chart (
  crypto_id VARCHAR(50),
  chartDays VARCHAR(50),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (crypto_id, timestamp, chartDays),
  unix NUMERIC
);

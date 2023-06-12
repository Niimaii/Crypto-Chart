CREATE DATABASE crypto_chart;

CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    currency varchar(255),
    created_at date default current_date
);

CREATE TABLE investments (
  id serial primary key,
  user_id INTEGER NOT NULL REFERENCES users(id),
  coin varchar(255) NOT NULL,
  coin_value FLOAT NOT NULL,
  amount FLOAT NOT NULL,
  crypto_total FLOAT NOT NULL,
  image VARCHAR(350),
  symbol VARCHAR(50),
  name VARCHAR(50),
  created_at timestamp default current_timestamp
);

CREATE TABLE crypto_unix (
  id serial primary key,
  cryptoBlock varchar(255) unique,
  unix NUMERIC
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  coin VARCHAR(50) NOT NULL,
  is_favorite BOOLEAN NOT NULL,
  CONSTRAINT user_coin UNIQUE (user_id, coin),
  created_at timestamp default current_date
);

-- *** Crypto Databases ***

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
  unix FLOAT,
  ath FLOAT NOT NULL,
  atl FLOAT NOT NULL
);

CREATE TABLE crypto_chart (
  crypto_id VARCHAR(50),
  chartDays VARCHAR(50),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (crypto_id, timestamp, chartDays),
  unix NUMERIC
);

CREATE TABLE past_prices (
  id serial primary key,
  coin VARCHAR(50),
  time_ago VARCHAR(50),
  coin_value FLOAT,
  CONSTRAINT coin_time UNIQUE (coin, time_ago)
);


CREATE TABLE test (
  id serial primary key,
  circulating_supply FLOAT,
  total_supply FLOAT,
  max_supply FLOAT,
  CONSTRAINT coin_time UNIQUE (coin, time_ago)
);


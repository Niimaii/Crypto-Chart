CREATE DATABASE crypto_chart;


CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    created_at date default current_date
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
  crypto_id VARCHAR(50) PRIMARY KEY,
  symbol VARCHAR(50),
  name VARCHAR(50),
  image VARCHAR(350),
  current_price NUMERIC,
  market_cap NUMERIC,
  market_cap_rank INTEGER,
  fully_diluted_valuation NUMERIC,
  total_volume NUMERIC,
  volume_24hr NUMERIC,
  high_24h NUMERIC,
  low_24h NUMERIC,
  price_change_24h NUMERIC,
  price_change_percentage_24h NUMERIC,
  market_cap_change_24h NUMERIC,
  market_cap_change_percentage_24h NUMERIC,
  circulating_supply NUMERIC,
  total_supply NUMERIC,
  max_supply NUMERIC,
  unix NUMERIC
);


CREATE TABLE crypto_chart (
  crypto_id VARCHAR(50),
  chartDays VARCHAR(50),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (crypto_id, timestamp, chartDays),
  unix NUMERIC
);

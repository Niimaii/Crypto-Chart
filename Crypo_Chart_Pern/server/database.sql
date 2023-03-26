CREATE DATABASE crypto_chart;


CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    created_at date default current_date
);

CREATE TABLE bitcoin (
  id TEXT PRIMARY KEY,
  symbol TEXT,
  name TEXT,
  image TEXT,
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
  max_supply NUMERIC
);

CREATE TABLE bitcoin_history (
  coin_id TEXT REFERENCES bitcoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp)
);
-- 
CREATE TABLE ethereum (
  id TEXT PRIMARY KEY,
  symbol TEXT,
  name TEXT,
  image TEXT,
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
  max_supply NUMERIC
);

CREATE TABLE ethereum_history (
  coin_id TEXT REFERENCES ethereum(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp)
);
-- 
CREATE TABLE tether (
  id TEXT PRIMARY KEY,
  symbol TEXT,
  name TEXT,
  image TEXT,
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
  max_supply NUMERIC
);

CREATE TABLE tether_history (
  coin_id TEXT REFERENCES tether(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp)
);
-- 
CREATE TABLE binancecoin (
  id TEXT PRIMARY KEY,
  symbol TEXT,
  name TEXT,
  image TEXT,
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
  max_supply NUMERIC
);

CREATE TABLE binancecoin_history (
  coin_id TEXT REFERENCES binancecoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp)
);
-- 
CREATE TABLE usdc (
  id TEXT PRIMARY KEY,
  symbol TEXT,
  name TEXT,
  image TEXT,
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
  max_supply NUMERIC
);

CREATE TABLE usdc_history (
  coin_id TEXT REFERENCES usdc(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp)
);
-- 

INSERT INTO users(email, password) VALUES ('someEamil', 'somePass');
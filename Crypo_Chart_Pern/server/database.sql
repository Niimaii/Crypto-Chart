CREATE DATABASE crypto_chart;


CREATE TABLE users (
    id serial primary key,
    email varchar(255) unique not null, 
    password varchar(255) unique not null,
    created_at date default current_date
);

INSERT INTO users(email, password) VALUES ('someEamil', 'somePass');

-- *** Crypto Databases ***

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
  chartDays TEXT,
  coin_id TEXT REFERENCES bitcoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
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
  chartDays TEXT,
  coin_id TEXT REFERENCES ethereum(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
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
  chartDays TEXT,
  coin_id TEXT REFERENCES tether(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
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
  chartDays TEXT,
  coin_id TEXT REFERENCES binancecoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);
-- 
CREATE TABLE usd_coin (
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
CREATE TABLE usd_coin_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES usd_coin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE ripple (
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
CREATE TABLE ripple_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES ripple(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE cardano (
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
CREATE TABLE cardano_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES cardano(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE staked_ether (
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
CREATE TABLE staked_ether_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES staked_ether(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE dogecoin (
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
CREATE TABLE dogecoin_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES dogecoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE matic_network (
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
CREATE TABLE matic_network_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES matic_network(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE solana (
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
CREATE TABLE solana_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES solana(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE binance_usd (
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
  total_supply polkadot
  max_supply NUMERIC
);

CREATE TABLE binance_usd_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES binance_usd(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE polkadot (
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
CREATE TABLE polkadot_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES polkadot(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE litecoin (
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
CREATE TABLE litecoin_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES litecoin(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);

CREATE TABLE shiba_inu (
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
CREATE TABLE shiba_inu_history (
  chartDays TEXT,
  coin_id TEXT REFERENCES shiba_inu(id),
  timestamp BIGINT,
  price NUMERIC,
  PRIMARY KEY (coin_id, timestamp, chartDays)
);
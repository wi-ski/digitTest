
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts(
  uid serial not null PRIMARY KEY,
  _id varchar(255),
  _item varchar(255),
  _user varchar(255),
  balance_avail money,
  balance_cur money,
  institution_type varchar(255),
  meta varchar(255),
  subtype varchar(255),
  type varchar(255),
  created_at timestamp default current_timestamp,
  updated_at timestamp
);

CREATE INDEX _id_idx on accounts(_id text_pattern_ops);
CREATE INDEX _item_idx on accounts(_item text_pattern_ops);
CREATE INDEX _user_idx on accounts(_user text_pattern_ops);
CREATE INDEX institution_type_idx on accounts(institution_type text_pattern_ops);
CREATE INDEX meta_idx on accounts(meta text_pattern_ops);
CREATE INDEX subtype_idx on accounts(subtype text_pattern_ops);
CREATE INDEX type_idx on accounts(type text_pattern_ops);

CREATE TABLE IF NOT EXISTS transactions (
  uid serial not null PRIMARY KEY,
  account_uid int,
  _account varchar(255),
  _id varchar(255),
  amount money,
  name varchar(255),
  date varchar(255),
  meta varchar(255),
  pending boolean,
  type varchar(255),
  category varchar(255),
  category_id varchar(255),
  score varchar(255),
  foreign key (account_uid) references accounts(uid),
  created_at timestamp default current_timestamp,
  updated_at timestamp
);

CREATE INDEX _account_idx on transactions(_account text_pattern_ops);
CREATE INDEX _id_idx on transactions(_id text_pattern_ops);
CREATE INDEX name_idx on transactions(name text_pattern_ops);
CREATE INDEX meta_idx on transactions(meta text_pattern_ops);
CREATE INDEX type_idx on transactions(type text_pattern_ops);
CREATE INDEX category_idx on transactions(category text_pattern_ops);
CREATE INDEX category_id_idx on transactions(category text_pattern_ops);
CREATE INDEX score_idx on transactions(score text_pattern_ops);





CREATE OR REPLACE FUNCTION set_updated_timestamp()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_timestamp --is there a better syntax for this
  BEFORE INSERT OR UPDATE ON accounts
  FOR EACH ROW EXECUTE PROCEDURE set_updated_timestamp();

CREATE TRIGGER update_timestamp
  BEFORE INSERT OR UPDATE ON transactions
  FOR EACH ROW EXECUTE PROCEDURE set_updated_timestamp();  --Not most efficient but ta

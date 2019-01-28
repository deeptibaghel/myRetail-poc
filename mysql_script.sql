
create database myretail_db;
use myretail_db;
create table price (
    id int(8) primary key,
    current_price double not null,
    currency_code varchar(3) not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT 'to store current price';



create database myretail_test_db;
use myretail_test_db;
create table price (
    id int(8) primary key,
    current_price double not null,
    currency_code varchar(3) not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT 'to store current price';
create database my_parking;
-- 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(36) NOT NULL,
    password TEXT NOT NULL,
    fullname VARCHAR(256) DEFAULT NULL,
    roles TEXT[] DEFAULT '{}'
);
create table cars(
    id serial primary key, 
    model varchar(64) not null,
    nomer varchar(36) unique not null,
    owner int not null,
    constraint fk_owner foreign key (owner) references users(id) on delete cascade
);
create table parks(
    id serial primary key,
    name varchar(256) unique not null,
    phone varchar(36) default null,
    owner int not null,
    constraint fk_owner foreign key (owner) references users(id) on delete cascade
);
create table places(
    id serial primary key,
    name varchar(256) not null,
    status varchar(36) not null default 'free',
    park_id int not null,
    constraint fk_park_id foreign key (park_id) references parks(id) on delete cascade
);
create table car_places(
    id serial primary key,
    start_time timestamp not null,
    end_time timestamp not null,
    started_time timestamp not null,
    ended_time timestamp not null,
    car_id int not null,
    constraint fk_car_id foreign key (car_id) references cars(id) on delete cascade,
    place_id int not null,
    constraint fk_place_id foreign key (place_id) references places(id) on delete cascade
);
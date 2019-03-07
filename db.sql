create table db.airport(
    id serial primary key,
    code char(5) not null,
    name varchar(1024)
);

create table db.carrier(
    id serial primary key,
    code char(5) not null,
    name varchar(1024)
);

create table db.flight_statistics(
    id serial primary key,
    cancelled integer not null check (cancelled >= 0),
    on_time integer not null check (on_time >= 0),
    total integer not null check (total >= 0),
    delayed integer not null check (delayed >= 0),
    diverted integer not null check (diverted >= 0)
);

create table db.delay_count_statistics(
    id serial primary key,
    late_aircraft integer not null check (late_aircraft >= 0),
    weather integer not null check (weather >= 0),
    security integer not null check (security >= 0),
    national_aviation_system integer not null check (national_aviation_system >= 0),
    carrier integer not null check (carrier >= 0)
);

create table db.delay_time_statistics(
    id serial primary key,
    late_aircraft integer not null check (late_aircraft >= 0),
    weather integer not null check (weather >= 0),
    security integer not null check (security >= 0),
    national_aviation_system integer not null check (national_aviation_system >= 0),
    carrier integer not null check (carrier >= 0)
);

create table db.statistics(
    airport_id serial references db.airport(id),
    carrier_id serial references db.carrier(id),
    month integer not null,
    year integer not null,
    flight_id serial references db.flight_statistics(id),
    delay_count_id serial references db.delay_count_statistics(id),
    delay_time serial references  db.delay_time_statistics(id),
    constraint valid_month check(month >= 1 AND month <= 12),
    constraint valid_year check(year >=0)
);
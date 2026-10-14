drop table people;

create table if not exists people (
	first_name varchar(255),
	last_name varchar(255),
	age int,
	job varchar(255)
);

alter table people add column employed bool;

alter table people add column id int primary key;

select * from people;


insert into people(id,first_name,last_name,age,job,employed) values(1,'Mike','Smith',30,'Programmer',true);
insert into people(id,first_name,last_name) values(2,'Mikey','Smiths');

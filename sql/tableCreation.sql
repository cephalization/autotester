set foreign_key_checks = 0;
drop table if exists Exam;
create table Exam (
name varchar(30) primary key,
created DATETIME,
points int);

drop table if exists Questions;
create table Questions (
number int not null,
Exam_name varchar(30),
points int,
correct_choice char,
text varchar(256),
primary key (number, Exam_name),
foreign key (Exam_name) references Exam(name));

drop table if exists Choices;
create table Choices (
identifier char,
text varchar(60) not null,
Questions_number int,
Exam_name varchar(30),
primary key (identifier, Questions_number, Exam_name),
foreign key (Questions_number) references Questions(number),
foreign key (Exam_name) references Exam(name));

drop table if exists Student;
create table Student (
student_id char(8) primary key,
name varchar(25) not null,
major varchar(15) not null,
email varchar(30) not null);

drop table if exists Takes;
create table Takes (
Exam_name varchar(30),
Student_student_id char(8),
points int,
primary key (Exam_name, Student_student_id),
foreign key (Exam_name) references Exam(name),
foreign key (Student_student_id) references Student(student_id));

drop table if exists Chooses;
create table Chooses (
Choices_identifier char,
Questions_number int,
Questions_Exam_name varchar(30),
Student_student_id char(8),
pointsRec int default 0,
primary key (Student_student_id, Questions_number, Questions_Exam_name),
foreign key(Student_student_id) references Student(student_id),
foreign key(Questions_number) references Questions(number),
foreign key (Choices_identifier) references Choices(identifier),
foreign key (Questions_Exam_name) references Questions(Exam_name));
set foreign_key_checks = 1;

grant select on Student to 'cs3425gr'@'%';
grant insert on Student to 'cs3425gr'@'localhost';

grant select on Exam to 'cs3425gr'@'%';
grant insert on Exam to 'cs3425gr'@'localhost';

grant select on Questions to 'cs3425gr'@'%';
grant insert on Questions to 'cs3425gr'@'localhost';

grant select on Choices to 'cs3425gr'@'%';
grant insert on Choices to 'cs3425gr'@'localhost';

grant select on Chooses to 'cs3425gr'@'%';
grant insert on Chooses to 'cs3425gr'@'localhost';
grant update on Chooses to 'cs3425gr'@'localhost';

grant select on Takes to 'cs3425gr'@'%';
grant insert on Takes to 'cs3425gr'@'localhost';
grant update on Takes to 'cs3425gr'@'localhost';
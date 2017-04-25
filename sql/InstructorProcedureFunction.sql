drop procedure if exists addExam;
delimiter //
create procedure addExam(
name varchar(30),
points int)
begin
insert into Exam value(name, NOW(), points);
end //
delimiter ;

# Example Usage : call addExam('Test 1', 100);

drop procedure if exists createStudent;
delimiter //
create procedure createStudent(
student_id char(8),
name varchar(25),
major varchar(15),
email varchar(30))
begin
insert into Student value(student_id, name, major, email);
end //
delimiter ;

# Example Usage : call createStudent('A0000001', 'Tony', 'CS', 'adpowell@mtu.edu');
# The name field can be populated using account information retrieved from Google OAuth

drop procedure if exists createQuestion;
delimiter //
create procedure createQuestion(
number int,
Ename varchar(30),
points int,
correct_choice char,
text varchar(256))
begin
insert into Questions value(number, Ename, points, correct_choice, text);
end //
delimiter ;

# Example Usage : call createQuestion('Test 1', 10, 'A');
# The problem number increments so there are no repeats

drop procedure if exists addChoice;
delimiter //
create procedure addChoice(
identifier char,
text varchar(60),
eName varchar(30),
qNumber int)
begin
insert into Choices value(identifier, text, qNumber, eName);
end //
delimiter ;

# Example Usage : call addChoice('A', 'Choice Text', 'Test 1', 1);
# The last parameter is the question number that this choice belongs to

drop procedure if exists setChoice;
delimiter //
create procedure setChoice(
qNumber int,
identifier char,
eName varchar(30))
begin
update Questions set correct_choice = identifier where number = qNumber and Exam_name = eName;
end //
delimiter ;

# Example Usage : call setChoice(1, 'B', 'Test 1')
# Use this procedure to change the correct answer for a given question

drop procedure if exists addPoints;
delimiter //
create procedure addPoints(
choice char,
qNumber int,
ID char(8),
eName varchar(30))
begin
declare correctPoints int;
if exists (select * from Questions where number = qNumber and Exam_name = eName and correct_choice = choice)
then
# add up the points to the take table for the student
	select points into correctPoints from Questions where number = qNumber and Exam_name = eName and correct_choice = choice;
    update Takes
		set points = points + correctPoints
		where eName = Exam_name and ID = Student_student_id;
end if;
end //
delimiter ;
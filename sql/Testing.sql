select * from Exam;
select * from Student;
select * from Questions;
select * from Choices;
select * from Takes;
select * from Chooses;

#Add a student to the authorized user's list
call createStudent('A0000001', 'Tony', 'CS', 'adpowell@mtu.edu');
select * from Student;

#Create Quiz77 exam and questions
call addExam('Quiz77', 10);
call createQuestion(1, 'Quiz77', 3, 'C', 'By default, SQL statements end in:'); #Question 1
call createQuestion(2, 'Quiz77', 4, 'D', 'What command allows one to add new data to a table?'); #Question 2
call createQuestion(3, 'Quiz77', 3, 'C', 'What feature of MYSQL lets one do processes when some data changes?'); #Question 3

#Question 1 Choices
call addChoice('A', '.', 'Quiz77', 1);
call addChoice('B', ':', 'Quiz77', 1);
call addChoice('C', ';', 'Quiz77', 1);
call addChoice('D', '//', 'Quiz77', 1);

#Question 2 Choices
call addChoice('A', 'add to table ___', 'Quiz77', 2);
call addChoice('B', 'put in table ___', 'Quiz77', 2);
call addChoice('C', 'table += ___', 'Quiz77', 2);
call addChoice('D', 'insert into table ___', 'Quiz77', 2);

#Question 3 Choices
call addChoice('A', 'OnEvent', 'Quiz77', 3);
call addChoice('B', 'Watch', 'Quiz77', 3);
call addChoice('C', 'Trigger', 'Quiz77', 3);
call addChoice('D', 'WaitFor', 'Quiz77', 3);

select * from Exam;
select * from Questions;
select * from Choices;

#Create test exam and questions
call addExam('Test Exam 1', 10);
call createQuestion(1, 'Test Exam 1', 2, 'A', 'This is Question 1'); #Question 1
call createQuestion(2, 'Test Exam 1', 2, 'B', 'This is Question 2'); #Question 2
call createQuestion(3, 'Test Exam 1', 2, 'C', 'This is Question 3'); #Question 3
call createQuestion(4, 'Test Exam 1', 2, 'D', 'This is Question 4'); #Question 4
call createQuestion(5, 'Test Exam 1', 2, 'E', 'This is Question 5'); #Question 5
#Question 1 Choices
call addChoice('A', 'This is the correct answer', 'Test Exam 1', 1);
call addChoice('B', 'This is not the correct answer', 'Test Exam 1', 1);
call addChoice('C', 'This is not the correct answer', 'Test Exam 1', 1);
call addChoice('D', 'This is not the correct answer', 'Test Exam 1', 1);
call addChoice('E', 'This is not the correct answer', 'Test Exam 1', 1);
#Question 2 Choices
call addChoice('A', 'This is not the correct answer', 'Test Exam 1', 2);
call addChoice('B', 'This is the correct answer', 'Test Exam 1', 2);
call addChoice('C', 'This is not the correct answer', 'Test Exam 1', 2);
call addChoice('D', 'This is not the correct answer', 'Test Exam 1', 2);
call addChoice('E', 'This is not the correct answer', 'Test Exam 1', 2);
#Question 3 Choices
call addChoice('A', 'This is not the correct answer', 'Test Exam 1', 3);
call addChoice('B', 'This is not the correct answer', 'Test Exam 1', 3);
call addChoice('C', 'This is the correct answer', 'Test Exam 1', 3);
call addChoice('D', 'This is not the correct answer', 'Test Exam 1', 3);
call addChoice('E', 'This is not the correct answer', 'Test Exam 1', 3);
#Question 4 Choices
call addChoice('A', 'This is not the correct answer', 'Test Exam 1', 4);
call addChoice('B', 'This is not the correct answer', 'Test Exam 1', 4);
call addChoice('C', 'This is not the correct answer', 'Test Exam 1', 4);
call addChoice('D', 'This is the correct answer', 'Test Exam 1', 4);
call addChoice('E', 'This is not the correct answer', 'Test Exam 1', 4);
#Question 5 Choices
call addChoice('A', 'This is not the correct answer', 'Test Exam 1', 5);
call addChoice('B', 'This is not the correct answer', 'Test Exam 1', 5);
call addChoice('C', 'This is not the correct answer', 'Test Exam 1', 5);
call addChoice('D', 'This is not the correct answer', 'Test Exam 1', 5);
call addChoice('E', 'This is the correct answer', 'Test Exam 1', 5);

# Simulate the student taking the test
#insert into Chooses value('A', 1, 'Test Exam 1', 'A0000001', 0);
#insert into Chooses value('B', 2, 'Test Exam 1', 'A0000001', 0);
#insert into Chooses value('D', 3, 'Test Exam 1', 'A0000001', 0);
#insert into Chooses value('C', 4, 'Test Exam 1', 'A0000001', 0);
#insert into Chooses value('E', 5, 'Test Exam 1', 'A0000001', 0);

select * from Exam;
select * from Student;
select * from Questions;
select * from Choices;
select * from Takes;
select * from Chooses;
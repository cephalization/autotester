# Update the grade with the question's points 
delimiter //
create trigger update_grade
	before insert on Chooses
		for each row
    begin
    declare correctPoints int;
    if not exists 
		(select * from Takes where Exam_name = NEW.Questions_Exam_name and Student_student_id = NEW.Student_student_id)
    then
		insert into Takes value(NEW.Questions_Exam_name, NEW.Student_student_id, 0);
	end if;
		call addPoints(NEW.Choices_identifier, NEW.Questions_number, NEW.Student_student_id, NEW.Questions_Exam_name);
		if exists (select * from Questions where number = NEW.Questions_number and Exam_name = NEW.Questions_Exam_name and correct_choice = NEW.Choices_identifier)
		then
			# add up the points to the take table for the student
			select points into correctPoints from Questions where number = NEW.Questions_number and Exam_name = NEW.Questions_Exam_name and correct_choice = NEW.Choices_identifier;
			set NEW.pointsRec = correctPoints;
		else
		# mark that the user got 0 points for their choice
			set NEW.pointsRec = 0;
		end if;
	end //
delimiter ;
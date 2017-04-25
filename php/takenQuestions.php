<?php
include './dbAccess.php';

$response = new StdClass;
$post = json_decode(file_get_contents('php://input'), true);
if (isset($post['name']) && isset($post['ID'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {

        // Retrieve all choices for each question chosen by the student
        $query = $connection->PrepareStatement('Select Choices_identifier, Questions_number, pointsRec from Chooses where Exam_name = ? and Student_student_id = ?');
        $query->bindParam(1, $post['name']);
        $query->bindParam(2, $post['ID']);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $results->choices = $query->fetchAll();

        if (count($results)) {
          $response->results = $results;
          $response->taken = true;
        } else {
          $response->taken = false;
        }

        $response->success = true;
    } else {
        $response->success = false;
        $response->message = 'Could not connect to the DB!';
    }
} else {
    $response->success = false;
    $response->message = 'No exam name and/or student_id provided in POST request!';
}
$package = json_encode($response);
header('Content-Type: application/json');
echo $package;
?>

<?php
include './dbAccess.php';

$response = new StdClass;
$post = json_decode(file_get_contents('php://input'), true);
if (isset($post['name'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {

        // Retrieve all questions for an exam
        $query = $connection->PrepareStatement('Select * from Questions where Exam_name = ?');
        $query->bindParam(1, $post['name']);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $results = new StdClass;
        $results->questions = $query->fetchAll();

        // Retrieve all choices for each question
        $query = $connection->PrepareStatement('Select Questions_number, identifier, text from Choices where Exam_name = ?');
        $query->bindParam(1, $post['name']);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $results->choices = $query->fetchAll();

        $response->results = $results;
        $response->success = true;
    } else {
        $response->success = false;
        $response->message = 'Could not connect to the DB!';
    }
} else {
    $response->success = false;
    $response->message = 'No exam name provided in POST request!';
}
$package = json_encode($response);
header('Content-Type: application/json');
echo $package;
?>

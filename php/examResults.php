<?php
include './dbAccess.php';

$response = new StdClass;
$post = json_decode(file_get_contents('php://input'), true);
if (isset($post['ID'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {
        $query = $connection->PrepareStatement('Select Exam_name, points from Takes where Student_student_id = ?');
        $query->bindParam(1, $post['ID']);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $results = $query->fetchAll();

        $response->results = $results;
        $response->success = true;
    } else {
        $response->success = false;
        $response->message = 'Could not connect to the DB!';
    }
} else {
    $response->success = false;
    $response->message = 'No student_id provided in POST request!';
}
$package = json_encode($response);
header('Content-Type: application/json');
echo $package;
?>

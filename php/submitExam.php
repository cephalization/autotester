<?php
include './dbAccess.php';

$response = new StdClass;
$post = json_decode(file_get_contents('php://input'), true);
if (isset($post['choices']) && isset($post['student']) && isset($post['exam'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {

        // Begin a transaction to run all chooses statements
        $connection->beginTransaction();

        // Iterate through all choices made by the user
        foreach ($post['choices'] as $key => $value) {
          $query = $connection->PrepareStatement('insert into Chooses value(?, ?, ?, ?, 0)');
          $query->bindParam(1, $value->identifier);
          $query->bindParam(2, $value->Questions_number);
          $query->bindParam(3, $post['exam']);
          $query->bindParam(4, $post['student']);
          $query->execute();
        }

        $connection->commit();
        $response->success = true;
    } else {
        $response->success = false;
        $response->message = 'Could not connect to the DB!';
    }
} else {
    $response->success = false;
    $response->message = 'No exam choices and/or exam name and/or student_id provided in POST request!';
}
$package = json_encode($response);
header('Content-Type: application/json');
echo $package;
?>

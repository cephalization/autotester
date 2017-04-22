<?php
include './dbAccess.php';

// Initilize the object to be sent to the frontend
$allExams = new StdClass;

// Retrieve a list of all exams from the database
$connection = new dbConnection();
$connected = $connection->connectDB();
if ($connected) {
    $allExams->Success = true;
    $query = $connection->PrepareStatement("Select * from Exam");
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $allExams->Exams = $query->FetchAll();
} else {
    $allExams->Success = false;
    $allExams->Message = "Could not establish a connection to the database!";
}

// Send the package to the front end
$package = json_encode($allExams);
header('Content-Type: application/json');
echo $package;
?>

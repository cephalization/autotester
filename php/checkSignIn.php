<?php
include './dbAccess.php';

$response = new StdClass;
if (isset($_POST['email'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {
        $query = $connection->PrepareStatement('Select * from Student where email = ?');
        $query->bindParam(1, $_POST['email']);
        $query->execute();
        $results = $query->fetchAll();

        if (count($results) !== 1) {
            $response->exists = false;
        } else {
            $response->exists = true;
        }
        $response->success = true;
    } else {
        $response->success = false;
        $response->message = 'Could not connect to the DB!';
    }
} else {
    $response->success = false;
    $response->message = 'You are not an authorized student!';
}
$package = json_encode($response);
echo $package;
?>

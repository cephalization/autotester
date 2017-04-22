<?php
include './dbAccess.php';

$response = new StdClass;
$post = json_decode(file_get_contents('php://input'), true);
if (isset($post['email'])) {
    $connection = new dbConnection();
    $connected = $connection->connectDB();
    if ($connected) {
        $query = $connection->PrepareStatement('Select * from Student where email = ?');
        $query->bindParam(1, $post['email']);
        $query->execute();
        $results = $query->fetchAll();

        if (count($results) !== 1) {
            $response->exists = false;
            $response->message = 'User is not authorized by the instructor to use this service!';
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
    $response->message = 'No email provided in POST request!';
}
$package = json_encode($response);
header('Content-Type: application/json');
echo $package;
?>

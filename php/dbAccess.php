<?php
class dbConnection {
  private $servername;
  private $username;
  private $password;
  private $dbname;
  private static $conn;

  public function __construct() {
    $this->servername = '';
    $this->username = '';
    $this->password = '';
    $this->dbname = 'adpowell';
    $this->conn = null;
  }

  public function connectDB() {
    $connResult = false;
    $servername = $this->servername;
    $dbname = $this->dbname;
    $username = $this->username;
    $password = $this->password;
    $conn = $this->conn;
    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $connResult = true;
      $this->conn = $conn;
      return $connResult;
    } catch(PDOException $e) {
      echo "Error connecting to server $servername: " . $e->getMessage();
      $connResult = false;
      return $connResult;
    }
  }

  public function destroyConnection() {
    $this->conn = null;
  }

  public function prepareStatement($query) {
    if ($this->conn === null) {
      if (!$this->connectDB()) {
        echo "Could not prepare statement...";
        return false;
      }
    }
    $stmt = $this->conn->prepare("$query");
    return $stmt;
  }

  public function beginTransaction() {
    $this->conn->beginTransaction();
  }

  public function commit() {
    $this->conn->commit();
  }
}
 ?>

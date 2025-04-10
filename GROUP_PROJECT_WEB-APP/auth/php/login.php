<?php

$servername = "localhost"; // Database server
$username = "root"; // Database username
$password = ""; // Database password
$dbname = "gproject_db"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// when submit button click 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // then get the name on the input set to value
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Checking the submit username if have equal to the users username 
    $result = $conn->query("SELECT * FROM users WHERE username = '$user' AND password='$pass'");

    
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success"]);
    }else{
        echo json_encode(["status" => "failed", "msg" => "Wrong username or password *"]);
    }
}
$conn->close();
?>
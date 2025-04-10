<?php
//TRUNCATE TABLE users; clear the data in db

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gproject_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// when submit button click
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Checking the submit username if it already exists on table users
    $result = $conn->query("SELECT * FROM users WHERE username = '$user'");

    // If user already exists the echo will send it to my script 
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "msg" => "Username already exists *"]);
    } else {
        // Insert the new username and password into my table users
        $sql = "INSERT INTO users (username, password) VALUES ('$user', '$pass')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "msg" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "msg" => "Error: " . $conn->error]);
        }
    }
}
$conn->close();
?>


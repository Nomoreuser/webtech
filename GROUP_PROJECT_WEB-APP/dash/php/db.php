<?php
session_start();

$server = "localhost";
$name = "root";
$password = "";
$db = "gproject_db";

$conn  = new mysqli($server, $name, $password, $db);

if($conn->connect_error){
    die("Connection failed" .$conn->connect_error);
}
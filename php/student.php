<?php
// students.php

require_once 'config.php';

// Add student
if (isset($_POST['add_student'])) {
    $id = $_POST['ID'];
    $name = $_POST['name'];
    $grade = $_POST['grade'];
    $gender = $_POST['gender'];
    $date = $_POST['date'];
    $subject = $_POST['subject'];
    $fees = $_POST['fees'];


    $sql = "INSERT INTO student (ID, name, grade, gender, date, subject, fees) 
    VALUES ('$id', '$name', '$grade', '$gender', '$date', '$subject', '$fees')";
    $conn->query($sql);
    header('Location: student_list.php');
    exit;
}

// Update student
if (isset($_POST['update_student'])) {
    $id = $_POST['ID'];
    $name = $_POST['name'];
    $grade = $_POST['grade'];
    $gender = $_POST['gender'];
    $date = $_POST['date'];
    $subject = $_POST['subject'];
    $fees = $_POST['fees'];

    $sql = "UPDATE student SET name = '$name', grade = '$grade', gender = '$gender', address = '$date', subject = '$subject', fees = '$fees' WHERE id = '$id'";
    $conn->query($sql);
    header('Location: student_list.php');
    exit;
}

// Delete student
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];

    $sql = "DELETE FROM student WHERE id = '$id'";
    $conn->query($sql);
    header('Location: student_list.php');
    exit;
}

// Get all students
$sql = "SELECT * FROM student";
$result = $conn->query($sql);

$students = array();
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
?>
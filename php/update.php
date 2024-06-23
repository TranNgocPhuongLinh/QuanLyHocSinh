<?php 
    require_once 'config.php';
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM student WHERE id = '$id'";
        $result = mysqli_query($con, $sql);
        $student = mysqli_fetch_assoc($result);
    }
    
    if (isset($_POST['update'])) {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
    
        $sql = "UPDATE students SET name = '$name', email = '$email', phone = '$phone', address = '$address' WHERE id = '$id'";
        mysqli_query($con, $sql);
        header('Location: index.php');
        exit;
    }
?>
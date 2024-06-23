<?php
require_once 'config.php';

// Add student
if (isset($_POST['add_student'])) {
    $id = $_POST['id'];
    $name = $_POST['ten'];
    $grade = $_POST['lop'];
    $gender = $_POST['gioi-tinh'];
    $date = $_POST['date'];
    $subject = $_POST['subject'];
    $fees = $_POST['fees'];

    $sql = "INSERT INTO student (ID, name, grade, gender, date, subject, fees) 
    VALUES ('$id', '$name', '$grade', '$gender', '$date', '$subject', '$fees')";
    $conn->query($sql);
}

// Get all students
$sql = "SELECT * FROM student";
$result = $conn->query($sql);

$students = array();
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
?>

<!DOCTYPE html>
<html>
    <head>
         <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quản lý học sinh</title>
        <script src="https://kit.fontawesome.com/1f06d62298.js" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/student.css">
        <script>
            $(function(){
                $("#header").load("/html/header.html");
            });
        </script>
    </head>

    <body>
        <div id="header"></div>
        <div>
            <h1 style="text-align: center; margin: 10px 0 20px 0;">DANH SÁCH HỌC SINH</h1>
        </div>


        <div id="input">
            <h2>Nhập danh sách học sinh</h2>
            <form action="" method="post">
                <label for="id">ID: </label>
                <input type="text" id="id" name="id" required>

                <label for="name">Tên: </label>
                <input type="text" id="name" name="ten" required>
        
                <label for="grade">Khối: </label>
                <input type="text" id="grade" name="lop" required>
        
                <label for="gender">Giới tính: </label>
                <select id="gender" name="gioi-tinh" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>

                <label for="date">Ngày học (Thứ): </label>
                <input type="text" id="date" name="date" required>

                <label for="subject">Môn học: </label>
                <input type="text" id="subject" name="subject" required>

                <label for="fees">Học phí: </label>
                <input type="text" id="fees" name="fees" required>
                <input type="submit" name="add_student" value="Lưu">
            </form>
        </div>

        <div id="student-table">
            <h2>DANH SÁCH HỌC SINH</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Khối</th>
                    <th>Giới tính</th>
                    <th>Ngày học (Thứ)</th>
                    <th>Môn học</th>
                    <th>Học phí</th>
                    <th>Công cụ</th>
                </tr>
                
                <?php foreach ($students as $student) { ?>
                    <tr>
                        <td><?php echo $student['ID']?></td>
                        <td><?php echo $student['TEN']?></td>
                        <td><?php echo $student['KHOI']?></td>
                        <td><?php echo $student['GIOITINH']?></td>
                        <td><?php echo $student['NGAYHOC']?></td>
                        <td><?php echo $student['MONHOC']?></td>
                        <td><?php echo $student['HOCPHI']?></td>
                        <td>
                        <a href="student_list.php?delete=<?php echo $student['id']; ?>">Delete</a>
                        </td>
                    </tr>
                <?php } ?>
            </table>
        </div>

        <?php if (isset($_GET['edit'])) {?>
            <div id="edit-section" style="display: none;">
            <h2>Edit Student</h2>
            <form>
              <label for="ID">ID: </label> 
              <input type="text" id="edit-ID"> 
              <br />
              <label>Name:</label>
              <input type="text" id="edit-name" />
              <br />
              <label>Grade:</label>
              <input type="text" id="edit-grade" />
              <br />
              <label>Giới Tính:</label>
              <input type="text" id="edit-gioi-tinh" />
              <br />
              <label>Ngày Học:</label>
              <input type="text" id="edit-date" />
              <br />
              <label>Môn Học:</label>
              <input type="text" id="edit-subject" />
              <br />
              <label>Học Phí:</label>
              <input type="text" id="edit-fee" />
              <br />
              <button id="save-btn" name="update_student">Save</button>
            </form>
          </div>
        <?php }?>
    </body>
</html>
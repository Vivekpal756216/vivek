<?php
session_start();
$PASSWORD = 'mypassword123'; // apna password yahan

$error = '';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if($_POST['pw'] === $PASSWORD){
        $_SESSION['unlocked'] = true;
        header('Location: notes.php');
        exit;
    } else {
        $error = "Wrong password!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
<h2>Enter password to view notes</h2>
<form method="post">
    <input type="password" name="pw" required />
    <button type="submit">Submit</button>
</form>
<p style="color:red;"><?php echo $error; ?></p>
</body>
</html>

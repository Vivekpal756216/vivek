<?php
session_start();
if(empty($_SESSION['unlocked'])){
    header('Location: login.php'); // agar password nahi diya, login page pe redirect
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Notes</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Welcome to Notes</h2>

<!-- Notes content start -->
<div class="code-container">
    <button class="copy-btn">Copy</button>
    <code>
name="vivek pal"
profession="student"
age=19
course="BSC cs"
print("------MY PROFILE------")
print(f"HEYY, MY NAME IS {name}\n I AM A {profession} \n I AM {age} YEARS OLD AND I AM PURSUING {course}")
    </code>
</div>
<!-- Notes content end -->

<script src="script.js"></script>
</body>
</html>

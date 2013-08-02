<?php
session_start();
if (!isset($_SESSION["state-variable"]))
{
  // Create 404 if called with wrong state of session variable
  header("HTTP/1.0 404 Not Found");
  exit();
}
?>
<html>
<head>
<title>Page 2</title>
</head>
<body>
<h1>Page 2</h1>

<?php
if (isset($_SESSION["state-variable"]))
{
  echo "<p>State variable is set.</p>";
  unset($_SESSION["state-variable"]);
}
else
{
  $_SESSION["state-variable"] = 1;
}
?>
<a href="page1.php">To page 1</a>
</body>
</html>

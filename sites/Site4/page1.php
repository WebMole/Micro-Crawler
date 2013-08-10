<?php
session_start();
include("record.php");
?>
<html>
<head>
<title>Page 1</title>
</head>
<body>
<h1>Page 1</h1>

<?php
if (isset($_SESSION["state-variable"]))
{
  echo "<p>State variable is set.</p>";
}
?>

<a href="page2.php">Go to page 2</a> <a href="page3.php">To page 3</a>
</body>
</html>

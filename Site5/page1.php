<?php
session_start();
?>
<html>
<head>
<title>Index page</title>
</head>
<body>
<h1>Index page</h1>

<p>Hello bambini!</p>

<?php
if (!isset($_SESSION["state-variable"]))
{
?>
<a href="page2.php">To page 2</a>
<a href="page3.php">To page 3</a>
<a href="page4.php">To page 4</a>
<?php
}
else
{
?>
<a href="page5.php">To page 5</a>
<a href="page6.php">To page 6</a>
<a href="page7.php">To page 7</a>
<?php
}
?>

<p>Another thing.</p>

</body>
</html>

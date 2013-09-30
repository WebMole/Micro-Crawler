<?php
session_start();
include("../lib/record.php");
?>
<html>
<head>
<title>Page 3</title>
</head>
<body>
<h1>Page 3</h1>

<?php
if (isset($_SESSION["state-variable"]))
{
  echo "<p>State variable is set.</p>";
}
?>
</body>
</html>

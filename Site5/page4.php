<?php
session_start();
if (isset($_SESSION["state-variable"]))
{
  // Create 404 if called with wrong state of session variable
  header("HTTP/1.0 404 Not Found");
  exit();
}
?>
<html>
<head>
<title>Page 4</title>
</head>
<body>
<h1>Page 4</h1>

<p>Dead end</p>

</body>
</html>

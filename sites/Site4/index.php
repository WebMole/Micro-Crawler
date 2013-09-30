<?php
session_start();
session_destroy();
session_start();
include("../lib/record.php");
?>
<html>
<head>
<title>Index page</title>
</head>
<body>
<h1>Index page</h1>

<p>Example page with state recording using $_SESSION["state-variable"]. See log.txt file.</p>

<a href="page2.php">To page 2</a> <a href="page1.php">To page 1</a>
</body>
</html>

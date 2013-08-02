<?php
include("config.php");
include("record.php");
$p = isset($_GET["p"]) ? $_GET["p"] : 0;
?>
<html>
<head>
<title>Page <?php echo $p;?></title>
</head>
<body>
<h1>Page <?php echo $p;?></h1>

<?php
$max_index = 0;
for ($i = 0; $i < $depth - 1; $i++)
  $max_index += pow(3, $i);
if ($p < $max_index)
{
  for ($i = $fanout * $p + 1; $i <= $fanout * $p + $fanout; $i++)
  {
    echo "<a href=\"index.php?p=$i\">To page $i</a>\n";
  }
}
?>
</body>
</html>

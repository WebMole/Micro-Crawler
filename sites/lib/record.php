<?php
/**
* Creates a log.txt file where on the same directory it is used and writes
* Date + Current url + $_SESSION["state-variable"]
*
* Example output:
* 2013-09-16 15:38:58 http://localhost/Micro-Crawler/sites/Site6/index.php?p=1 null
**/

function curPageURL() {
 $pageURL = 'http';
 if ( isset( $_SERVER["HTTPS"] ) && strtolower( $_SERVER["HTTPS"] ) == "on" ) {
     $pageURL .= "s";
 }
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 return $pageURL;
}

if (isset($_SESSION["state-variable"])) {
  $out = date("Y-m-d H:i:s", time())." ".curPageURL()." ".$_SESSION["state-variable"]."\n";
}
else {
  $out = date("Y-m-d H:i:s", time())." ".curPageURL()." null\n";
}

file_put_contents("log.txt", $out,  FILE_APPEND);
?>

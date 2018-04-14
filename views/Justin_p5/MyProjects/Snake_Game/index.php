<?php

define('DB_NAME', 'highscores');
define('DB_USER', 'root');
define('DB_PASSWORD', 'mysql');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link){
   die('Could not connect: ' .mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if(!$db_selected){
   die('Can\'t use ' .DB_NAME . ': ' .mysql_error());
}

$value = $_POST['output']; //store output value


//mysql commands
$sql="INSERT INTO Snake_Game_Scores (Snake_Length) VALUES ('$value')";

if(!mysql_query($sql)){
  echo "<p> You already achieved this score. <br>
        Press the back button to play again.</p>";
   die('Error: ' . mysql_error());
}

mysql_close();

echo "<p> Your score has been submited! <br>
          Press the back button to play again!</p>";

 ?>

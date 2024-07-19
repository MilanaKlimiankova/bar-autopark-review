<?php
  //$review = wordwrap($_POST['review'], 70, "\r\n");
  $review = 'test text';
  $to = 'klimenkovamilana@gmail.com';
  $subject = 'Review';

  mail($to, $subject, $review);
?>


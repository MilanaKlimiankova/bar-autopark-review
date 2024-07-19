<?php
  $review = wordwrap($_POST['review'], 70, "\r\n");
  $to = 'klimenkovamilana@gmail.com';
  $subject = 'Review';

  mail($to, $subject, $review);
?>


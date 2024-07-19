<?php
  header('Content-Type: text/html; charset=UTF-8');

  $review = wordwrap($_POST['review'], 70, "\r\n");
  $review = 'test text';
  $to = 'klimenkovamilana@gmail.com';
  $subject = 'Review';
  $headers = '';

  if (mail($to, $subject, $review, $headers)) {
    echo 'Отзыв отправлен успешно!';
} else {
    echo 'Ошибка отправки отзыва!';
}
?>


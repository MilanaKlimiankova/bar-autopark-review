const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  fetch(`https://docs.google.com/forms/d/1Hi1kEst031vF1WP9TWjHjBRtiSD5_NVp1TnSoYZWf18/formResponse`, {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    console.log('Форма отправлена!');
  })
  .catch((error) => {
    console.error('Ошибка отправки формы:', error);
  });
});

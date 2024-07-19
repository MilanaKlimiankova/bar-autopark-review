const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
document.getElementById('message').innerText = message;


const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');

// Загрузить XML файл
const xmlFile = 'buses.xml';
const xhr = new XMLHttpRequest();
xhr.open('GET', xmlFile, true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const xmlDoc = xhr.responseXML;
    const buses = xmlDoc.getElementsByTagName('bus');

   
      const garageNumber = "100239";
      const busInfo = findBusByGarageNumber(buses, garageNumber);
      if (busInfo) {
        displayBusInfo(busInfo);
      } else {
        alert('Автобус не найден');
      }

  } else {
    console.error('Ошибка загрузки XML файла');
  }
};
xhr.send();

// Найти автобус по гаражному номеру
function findBusByGarageNumber(buses, garageNumber) {
  for (let i = 0; i < buses.length; i++) {
    const bus = buses[i];
    const garageNumberElement = bus.getElementsByTagName('garage_number')[0];
    if (garageNumberElement.textContent === garageNumber) {
      return bus;
    }
  }
  return null;
}

// Отобразить информацию об автобусе
function displayBusInfo(bus) {
 /* const busInfoDiv = document.getElementById('bus-info');
  busInfoDiv.innerHTML = '';
  const busModel = bus.getElementsByTagName('bus_model')[0].textContent;
  const busPhoto = bus.getElementsByTagName('bus_photo')[0].textContent;
  const driverName = bus.getElementsByTagName('driver_name')[0].textContent;
  busInfoDiv.innerHTML = `
    <h2>Автобус ${busModel}</h2>
    <img src="${busPhoto}" alt="Фото автобуса">
    <p>Водитель: ${driverName}</p>
  `;*/

  const bus_modelDiv = document.getElementById('bus_model');
  bus_modelDiv.innerHTML = '';
  const busModel = bus.getElementsByTagName('bus_model')[0].textContent;
  bus_modelDiv.innerHTML = `Модель автобуса: ${busModel}`;

  const driver_nameDiv = document.getElementById('driver_name');
  driver_nameDiv.innerHTML = '';
  const driverName = bus.getElementsByTagName('driver_name')[0].textContent;
  driver_nameDiv.innerHTML = `Водитель: ${driverName}`;

  const photoDiv = document.getElementById('bus_photo');
  const photoURL = bus.getElementsByTagName('bus_photo')[0].textContent;
  photoDiv.style.background = photoURL;
}

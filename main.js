const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');

//document.getElementById('message').innerText = message;
/*
// Содержимое XML файла как строка
var xmlString = `
<?xml version="1.0" encoding="UTF-8"?>
<buses>
  <bus>
    <garage_number>100230</garage_number>
    <bus_model>LiAZ-5292</bus_model>
    <bus_photo>https://example.com/bus1.jpg</bus_photo>
    <driver_name>Иванов Иван Иванович</driver_name>
  </bus>
  <bus>
    <garage_number>100231</garage_number>
    <bus_model>MAZ-103</bus_model>
    <bus_photo>https://example.com/bus2.jpg</bus_photo>
    <driver_name>Петров Петр Петрович</driver_name>
  </bus>
</buses>
`;

// Парсинг XML строки
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(xmlString, "application/xml");

// Функция для поиска автобуса по гаражному номеру
function findBusByGarageNumber(garageNumber) {
  var buses = xmlDoc.getElementsByTagName("bus");
  for (var i = 0; i < buses.length; i++) {
    var garageNumberElement = buses[i].getElementsByTagName("garage_number")[0];
    if (garageNumberElement.textContent == garageNumber) {
      //return buses[i];
      var busInfo = "";
  busInfo += "Гаражный номер: " + buses[i].getElementsByTagName("garage_number")[0].textContent + "<br>";
  busInfo += "Модель автобуса: " + buses[i].getElementsByTagName("bus_model")[0].textContent + "<br>";
  //busInfo += "Фото автобуса: <img src='" + bus.getElementsByTagName("bus_photo")[0].textContent + "'><br>";
  busInfo += "Имя водителя: " + buses[i].getElementsByTagName("driver_name")[0].textContent;
  document.getElementById("bus-info").innerHTML = busInfo;
    }
  }
  //return null;
}
*/
// Функция для отображения информации об автобусе
/*function displayBusInfo(bus) {
  var busInfo = "";
  busInfo += "Гаражный номер: " + bus.getElementsByTagName("garage_number")[0].textContent + "<br>";
  busInfo += "Модель автобуса: " + bus.getElementsByTagName("bus_model")[0].textContent + "<br>";
  busInfo += "Фото автобуса: <img src='" + bus.getElementsByTagName("bus_photo")[0].textContent + "'><br>";
  busInfo += "Имя водителя: " + bus.getElementsByTagName("driver_name")[0].textContent;
  document.getElementById("bus-info").innerHTML = busInfo;
}*/
/*
// Поиск автобуса по гаражному номеру и отображение информации
var garageNumber = "100230"; // замените на нужный гаражный номер
var bus = findBusByGarageNumber(garageNumber);
/*if (bus) {
  displayBusInfo(bus);
} else {
  document.getElementById("bus-info").innerHTML = "Автобус не найден";
}*/

*/
/*
var text, parser, xmlDoc;

text = `<?xml version="1.0" encoding="UTF-8"?>
<buses>
  <bus>
    <garage_number>100230</garage_number>
    <bus_model>LiAZ-5292</bus_model>
    <bus_photo>https://example.com/bus1.jpg</bus_photo>
    <driver_name>Иванов Иван Иванович</driver_name>
  </bus>
  <bus>
    <garage_number>100231</garage_number>
    <bus_model>MAZ-103</bus_model>
    <bus_photo>https://example.com/bus2.jpg</bus_photo>
    <driver_name>Петров Петр Петрович</driver_name>
  </bus>
</buses>`;

parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");

document.getElementById("demo").innerHTML =
xmlDoc.getElementsByTagName("bus")[0].childNodes[0].childNodes[0].nodeValue;*/


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
  const busInfoDiv = document.getElementById('bus-info');
  busInfoDiv.innerHTML = '';
  const busModel = bus.getElementsByTagName('bus_model')[0].textContent;
  const busPhoto = bus.getElementsByTagName('bus_photo')[0].textContent;
  const driverName = bus.getElementsByTagName('driver_name')[0].textContent;
  busInfoDiv.innerHTML = `
    <h2>Автобус ${busModel}</h2>
    <img src="${busPhoto}" alt="Фото автобуса">
    <p>Водитель: ${driverName}</p>
  `;
}

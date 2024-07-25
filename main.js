const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');

//document.getElementById('message').innerText = message;

// Функция для загрузки XML файла
function loadXMLDoc(filename) {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else { // code for IE
    xhttp = new ActiveXObject("Microsoft.XMLDOM");
  }
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

// Загрузка XML файла
var xmlDoc = loadXMLDoc("buses.xml");

// Функция для поиска автобуса по гаражному номеру
function findBusByGarageNumber(garageNumber) {
  var buses = xmlDoc.getElementsByTagName("bus");
  for (var i = 0; i < buses.length; i++) {
    var garageNumberElement = buses[i].getElementsByTagName("garage_number")[0];
    if (garageNumberElement.textContent === garageNumber) {
      return buses[i];
    }
  }
  return null;
}

// Функция для отображения информации об автобусе
function displayBusInfo(bus) {
  var busInfo = "";
  busInfo += "Гаражный номер: " + bus.getElementsByTagName("garage_number")[0].textContent + "<br>";
  busInfo += "Модель автобуса: " + bus.getElementsByTagName("bus_model")[0].textContent + "<br>";
  busInfo += "Фото автобуса: <img src='" + bus.getElementsByTagName("bus_photo")[0].textContent + "'><br>";
  busInfo += "Имя водителя: " + bus.getElementsByTagName("driver_name")[0].textContent;
  document.getElementById("bus-info").innerHTML = busInfo;
}

// Поиск автобуса по гаражному номеру и отображение информации
var garageNumber = "100230"; // замените на нужный гаражный номер
var bus = findBusByGarageNumber(garageNumber);
if (bus) {
  displayBusInfo(bus);
} else {
  document.getElementById("bus-info").innerHTML = "Автобус не найден";
}


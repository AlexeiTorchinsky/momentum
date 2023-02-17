const time = document.querySelector('.time');
const date1 = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum = getRandomNum();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-Br", options);
  date1.textContent = currentDate;
}

function showGreeting() {
  greeting.textContent = `Good ${getTimeOfDay()}`;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return "night";
  }
  if (hours >= 6 && hours < 12) {
    return "morning";
  }
  if (hours >= 12 && hours < 18) {
    return "afternoon";
  }
  if (hours > 18 && hours <= 23) {
    return "evening";
  }
}

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

function getRandomNum() {
  return Math.floor(Math.random() * 20 + 1); 
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  let bgNum = randomNum;
  if(bgNum < 10) {
    bgNum = String(bgNum).padStart(2, "0");
  } 
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
  }; 
}
setBg();

function getSlideNext() {
  // randomNum = getRandomNum();
  if (randomNum <= 20) {
    randomNum += 1;
  }
  if (randomNum  > 20) {
    randomNum = 1;
  }
  setBg()
}
function getSlidePrev() {
  // randomNum = getRandomNum();
  if (randomNum >= 1) {
    randomNum -= 1;
  }
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg()
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=17fc8c283ea9a4b04e28125972a9f1b9&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`
}
getWeather();

city.addEventListener('change', getWeather);
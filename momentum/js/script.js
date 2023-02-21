import playList from './playList.js';
// console.log(playList);
const time = document.querySelector('.time');
const date1 = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error'); 
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let randomNum = getRandomNum(1, 20);
let isPlay = false;

const playListContainer = document.querySelector('.play-list');
console.log(playListContainer.children)

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
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);

// function getRandomNum() {
//   return Math.floor(Math.random() * 20 + 1); 
// }
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  if (randomNum <= 20) {
    randomNum += 1;
  }
  if (randomNum  > 20) {
    randomNum = 1;
  }
  setBg()
}
function getSlidePrev() {
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
  if (data.weather === undefined) {
    weatherError.textContent = 'Error! city not found, please choose another one';
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    weatherIcon.className = 'weather-icon owf';
    wind.textContent = undefined;
    humidity.textContent = undefined;
  } else {
  weatherError.textContent = undefined;
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
  // console.log(data.weather[0].id)
  // console.log(data);
  }
  
}
getWeather();

city.addEventListener('change', getWeather);


async function getQuotes() {  
  const quotes = './data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let quoteNum = getRandomNum(0, 1547);
  quote.textContent = data[quoteNum].text;
  author.textContent = data[quoteNum].author;
  // console.log(data);
}
getQuotes();

document.querySelector('.change-quote').addEventListener('click', getQuotes);

let playNum = 0;
const playBtn = document.querySelector('.play');
const audio = new Audio();


function toggleBtn() {
  playBtn.classList.toggle('pause');
}
function playAudio() {
  playListContainer.children[playNum].classList.add('item-active');
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  console.log(playNum)
  audio.addEventListener('ended', playNext);
  if(!isPlay) {
    audio.play();
    isPlay = true;
   
  } else {
    audio.pause();
    isPlay = false;
    
  }
  
}


function playAudioPrevNext() {
  audio.src = playList[playNum].src;
  // console.log(playList[playNum].src);
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause');
    // playListContainer.children[playNum].classList.toggle('item-active')
  } else {
    audio.play(); 
    // playListContainer.children[playNum].classList.remove('item-active');
  }
}
function playNext() {
  playListContainer.children[playNum].classList.remove('item-active');
  console.log(playNum)
  if (playNum <= 4) {
    playNum++;
    console.log(playNum);
  }
  if (playNum === 4) {
    playNum = 0;
  }
  
  playListContainer.children[playNum].classList.add('item-active');
  
  playAudioPrevNext();
}

function playPrev() {
  playListContainer.children[playNum].classList.remove('item-active');
  if(playNum < 1) {
    playNum = 4
  }
  if (playNum >= 1) {
    playNum--;
  }
  
  // console.log(playNum);
  playListContainer.children[playNum].classList.add('item-active');
  playAudioPrevNext();
}

playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', toggleBtn);

const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);



playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
});





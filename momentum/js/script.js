const time = document.querySelector(".time");
const date1 = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector("body");
let randomNum;

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
  let bgNum = getRandomNum();
  if(bgNum < 10) {
    bgNum = String(bgNum).padStart(2, "0");
  } 
  console.log(`url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`)
  body.style.backgroundImage =`url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`; 
}
setBg();

function getSlideNext() {
    randomNum = getRandomNum() + 1;
  console.log(randomNum);
}
getSlideNext()
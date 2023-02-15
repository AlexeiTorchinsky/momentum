const time = document.querySelector('.time');
const date1 = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');



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
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-Br', options);;
  date1.textContent = currentDate;
}


function showGreeting() {
  const timeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6 ) {
      return 'night';
    }
    if (hours >= 6 && hours < 12) {
      return 'morning';
    }
    if (hours >= 12 && hours < 18) {
      return 'afternoon';
    }
    if (hours > 18 && hours <= 23) {
      return 'evening';
    }
  }
  greeting.textContent = `Good ${timeOfDay()}`;
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)
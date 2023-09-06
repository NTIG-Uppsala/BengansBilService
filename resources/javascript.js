setInterval(setLiveOpeningHours(new Date()), 5000);

function setLiveOpeningHours(date) {
  const hour = date.getHours();
  const day = date.getDay();
  const minute = date.getMinutes();
  const element = document.getElementsByClassName("storeState")[0];

  const days = [
    "NaN",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];

  //If weekday
  if (day < 6) {
    if (hour === 9 && minute >= 30) {
      element.innerText = `Öppnar om ${60 - minute} minuter`;
    } else if (hour === 15 && minute >= 45) {
      element.innerText = `Stänger snart`;
    } else if (hour >= 10 && hour < 16) {
      element.innerText = "Vi har öppet";
      element.style.color = "green";
    } else if (hour < 10) {
      element.innerText = `Öppnar 10:00 idag`;
    } else {
      if (day === 5) {
        element.innerText = `Öppnar ${days[day + 1]} 12:00`;
      } else {
        element.innerText = `Öppnar ${days[day + 1]} 10:00`;
      }
    }
  } //Saturday
  else if (day == 6) {
    if (hour === 11 && minute >= 30) {
      element.innerText = `Öppnar om ${60 - minute} minuter`;
    } else if (hour === 14 && minute >= 45) {
      element.innerText = `Stänger snart`;
    } else if (hour >= 12 && hour < 15) {
      element.innerText = "Vi har öppet";
      element.style.color = "green";
    } else if (hour < 12) {
      element.innerText = `Öppnar 12:00 idag`;
    } else {
      element.innerText = `Öppnar måndag 10:00`;
    }
  } //Sunday
  else if (day == 7) {
    element.innerText = `Öppnar måndag 10:00`;
  }
}

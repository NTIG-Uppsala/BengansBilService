window.setInterval(function () {
  setLiveOpeningHours(new Date());
}, 10000);

function setLiveOpeningHours(date) {
  const hour = date.getHours();
  const day = date.getDay();
  const minute = date.getMinutes();
  const element = document.getElementById("storeState");
  var storeIsOpen = true;
  const storeOpenElements = document.getElementsByClassName("storeOpen");
  const storeClosedElements = document.getElementsByClassName("storeClosed");

  const openingHours = {
    weekdays: { open: 10, close: 16 },
    saturday: { open: 12, close: 15 },
  };

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
    if (hour === openingHours.weekdays.open - 1 && minute >= 30) {
      element.innerText = `Öppnar om ${60 - minute} minuter`;
      storeIsOpen = false;
    } else if (hour === openingHours.weekdays.close - 1 && minute >= 45) {
      element.innerText = `Stänger snart`;
      storeIsOpen = true;
    } else if (
      hour >= openingHours.weekdays.open &&
      hour < openingHours.weekdays.close
    ) {
      var justNuSpan = document.createElement("span");
      justNuSpan.innerText = "Just nu: ";
      justNuSpan.style.color = "black";

      var oppetSpan = document.createElement("span");
      oppetSpan.innerText = "Öppet";
      oppetSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(justNuSpan);
      element.appendChild(oppetSpan);
      storeIsOpen = true;
    } else if (hour < openingHours.weekdays.open) {
      element.innerText = `Öppnar 10:00 idag`;
    } else {
      if (day === 5) {
        element.innerText = `Öppnar ${days[day + 1]} kl ${
          openingHours.saturday.open
        }`;
        storeIsOpen = false;
      } else {
        element.innerText = `Öppnar ${days[day + 1]} kl ${
          openingHours.weekdays.open
        }`;
        storeIsOpen = false;
      }
    }
  } //Saturday
  else if (day == 6) {
    if (hour === openingHours.saturday.open - 1 && minute >= 30) {
      element.innerText = `Öppnar om ${60 - minute} minuter`;
      storeIsOpen = false;
    } else if (hour === openingHours.saturday.close - 1 && minute >= 45) {
      element.innerText = `Stänger snart`;
      storeIsOpen = true;
    } else if (
      hour >= openingHours.saturday.open &&
      hour < openingHours.saturday.close
    ) {
      var justNuSpan = document.createElement("span");
      justNuSpan.innerText = "Just nu: ";
      justNuSpan.style.color = "black";

      var oppetSpan = document.createElement("span");
      oppetSpan.innerText = "Öppet";
      oppetSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(justNuSpan);
      element.appendChild(oppetSpan);
      storeIsOpen = true;
    } else if (hour < openingHours.saturday.open) {
      element.innerText = `Öppnar ${openingHours.saturday.open} idag`;
      storeIsOpen = false;
    } else {
      element.innerText = `Öppnar måndag kl ${openingHours.weekdays.open}`;
      storeIsOpen = false;
    }
  } //Sunday
  else if (day == 7) {
    element.innerText = `Öppnar måndag kl ${openingHours.weekdays.open}`;
    storeIsOpen = false;
  }

  if (storeIsOpen === false) {
    for (const element of storeClosedElements) {
      element.setAttribute("id", "storeClosed");
    }

    for (const element of storeOpenElements) {
      element.removeAttribute("id");
    }
  } else {
    for (const element of storeOpenElements) {
      element.setAttribute("id", "storeOpen");
    }

    for (const element of storeClosedElements) {
      element.removeAttribute("id");
    }
  }
}

function scrollToInfo() {
  setTimeout(() => {
    document.getElementById("storeState").scrollIntoView();
  }, 500);
}

window.setInterval(function () {
  setLiveOpeningHours(new Date());
}, 30000); //Every 30 sec

function isDateClosed(month, day) {
  const closedDays = [
    { month: 1, day: 1 },
    { month: 1, day: 6 },
    { month: 6, day: 6 },
    { month: 5, day: 1 },
    { month: 12, day: 24 },
    { month: 12, day: 25 },
    { month: 12, day: 26 },
    { month: 12, day: 31 },
  ];

  for (const closedDay of closedDays) {
    if (closedDay.month === month && closedDay.day === day) {
      return true;
    }
  }
  return false;
}

function setLiveOpeningHours(date) {
  const hour = date.getHours();
  const day = date.getDay();
  const month = date.getMonth();
  const minute = date.getMinutes();
  const element = document.getElementById("storeState");
  let storeIsOpen = true;
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

  const isDateClose = isDateClosed(month, date.getDate());
  console.log(isDateClose);

  if (isDateClose === true) {
    element.innerText = "Stängt";
    element.style.color = "red";
    return;
  }

  //If weekday
  if (day < 6) {
    if (hour === openingHours.weekdays.open - 1 && minute >= 30) {
      //30 min before opening
      element.innerText = `Öppnar om ${60 - minute} minuter`;
      storeIsOpen = false;
    } else if (hour === openingHours.weekdays.close - 1 && minute >= 45) {
      //15 min before closing
      element.innerText = `Stänger snart`;
      storeIsOpen = true;
    } else if (
      hour >= openingHours.weekdays.open &&
      hour < openingHours.weekdays.close
    ) {
      var rightNowSpan = document.createElement("span");
      rightNowSpan.innerText = "Just nu: ";
      rightNowSpan.style.color = "black";

      var openSpan = document.createElement("span");
      openSpan.innerText = "Öppet";
      openSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(rightNowSpan);
      element.appendChild(openSpan);
      storeIsOpen = true;
    } else if (hour < openingHours.weekdays.open) {
      element.innerText = `Öppnar kl ${openingHours.weekdays.open} idag`;
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
      var rightNowSpan = document.createElement("span");
      rightNowSpan.innerText = "Just nu: ";
      rightNowSpan.style.color = "black";

      var openSpan = document.createElement("span");
      openSpan.innerText = "Öppet";
      openSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(rightNowSpan);
      element.appendChild(openSpan);
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
zipCodeList = [
  "98132",
  "98135",
  "98136",
  "98138",
  "98137",
  "98139",
  "98140",
  "98142",
  "98143",
  "98144",
  "98146",
  "98147",
];

document.addEventListener("DOMContentLoaded", (event) => {
  let ZipcodeCheck =
    '<p>Kolla om vi kör bil direkt hem till dig</p><form action=""><input type="text" style="height:2.2rem; font-size:1.2rem;" inputmode="numeric" id="zipNumber" placeholder="Post nummer"><input class="checkNumber" style="height:2.2rem;  font-size:1.2rem;" id="submit" type="submit" value="Kolla"></form><p id="output"></p>';
  document.querySelector("#jsCheck").innerHTML = ZipcodeCheck;

  document
    .querySelector("#zipCodeCheck form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // event.submitter.parentNode.querySelector("#number").value
      // is what is written in the input
      let zipInput =
        event.submitter.parentNode.querySelector("#zipNumber").value;
      zipInput = zipInput.split(" ").join(""); //removes spaces from string

      if (zipInput.match(/\D/) != null) {
        document.querySelector("#output").innerHTML =
          "Inte ett giltigt postnummer.";
      } else if (zipInput.length != 5) {
        document.querySelector("#output").innerHTML =
          "Inte ett giltigt postnummer.";
      } else if (zipCodeList.includes(zipInput)) {
        document.querySelector("#output").innerHTML =
          "Vi kör ut, ring telefonnumret ovan!";
      } else {
        document.querySelector("#output").innerHTML =
          "Vi kör tyvärr inte ut till dig.";
      }
    });
});

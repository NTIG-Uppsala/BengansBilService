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

  const w = document.getElementById("closedOrOpen");

  console.log(w);

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
    '<p>Skriv ditt postnummer för att se om vi kör ut till dig!</p><form action=""><input type="text" inputmode="numeric" id="number" placeholder="123 45"><input class="checkNumber" id="submit" type="submit" value="Kolla"></form><p id="output"></p>';
  document.querySelector("#jsCheck").innerHTML = ZipcodeCheck;

  document
    .querySelector("#zipCodeCheck form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // event.submitter.parentNode.querySelector("#number").value
      // is what is written in the input
      let zipInput = event.submitter.parentNode.querySelector("#number").value;
      zipInput = zipInput.split(" ").join(""); //removes spaces from string

      if (zipInput.match(/\D/) != null) {
        document.querySelector("#output").innerHTML = "Inte ett postnummer.";
      } else if (zipInput.length != 5) {
        document.querySelector("#output").innerHTML = "Inte ett postnummer.";
      } else if (zipCodeList.includes(zipInput)) {
        document.querySelector("#output").innerHTML =
          "Vi kör ut, ring telefonnumret ovan!";
      } else {
        document.querySelector("#output").innerHTML =
          "Vi kör tyvärr inte ut till dig.";
      }
    });
});

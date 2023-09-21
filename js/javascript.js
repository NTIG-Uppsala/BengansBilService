window.setInterval(function () {
  setLiveOpeningHours(new Date());
}, 30000); //Every 30 sec

document.addEventListener("DOMContentLoaded", function () {
  // Lists all cars
  let cars = [
    { name: "Audi A6", year: "2011", price: "800\u00A0kr" },
    { name: "Audi S3", year: "2015", price: "450\u00A0kr" },
    { name: "Cadillac Escalade", year: "1999", price: "500\u00A0kr" },
    { name: "Kia Carens", year: "2022", price: "400\u00A0kr" },
    { name: "Kia Soul", year: "2020", price: "400\u00A0kr" },
    { name: "Mitsubishi Outlander", year: "2018", price: "450\u00A0kr" },
    { name: "Renault Kadjar", year: "2020", price: "250\u00A0kr" },
    { name: "Subaru Outback", year: "2020", price: "300\u00A0kr" },
    { name: "Volvo XC40", year: "2018", price: "800\u00A0kr" },
    { name: "VW Polo", year: "2022", price: "300\u00A0kr" },
  ];

  const tableBody = document.getElementById("carList");

  // Adds the cars to the HTML
  cars.forEach(function (car) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const yearCell = document.createElement("td");
    const priceCell = document.createElement("td");

    nameCell.textContent = car.name;
    yearCell.textContent = car.year;
    priceCell.textContent = car.price;

    row.appendChild(nameCell);
    row.appendChild(yearCell);
    row.appendChild(priceCell);

    tableBody.appendChild(row);
  });
});

// Defines clicks and click counter for the buttons
let nameClicks = 0;
let priceClicks = 0;
let yearClicks = 0;
function clickCounter(clicks) {
  clicks += 1;
  console.log(priceClicks);
  return clicks;
}

function sortCars(buttonInput) {
  let cars = [
    { name: "Audi A6", year: "2011", price: "800\u00A0kr" },
    { name: "Audi S3", year: "2015", price: "450\u00A0kr" },
    { name: "Cadillac Escalade", year: "1999", price: "500\u00A0kr" },
    { name: "Kia Carens", year: "2022", price: "400\u00A0kr" },
    { name: "Kia Soul", year: "2020", price: "400\u00A0kr" },
    { name: "Mitsubishi Outlander", year: "2018", price: "450\u00A0kr" },
    { name: "Renault Kadjar", year: "2020", price: "250\u00A0kr" },
    { name: "Subaru Outback", year: "2020", price: "300\u00A0kr" },
    { name: "Volvo XC40", year: "2018", price: "800\u00A0kr" },
    { name: "VW Polo", year: "2022", price: "300\u00A0kr" },
  ];

  let productChart = document
    .getElementById("productChart")
    .getElementsByTagName("tr");
  let arrows = document.getElementsByClassName("sortArrow");
  let sortText = document.getElementById("currentSorting");

  // Switch statement for dropdown buttons
  switch (buttonInput) {
    case "price":
      priceClicks = clickCounter(priceClicks);

      sortedPrice = cars.sort(function (a, b) {
        // Sorts the list
        sortText.innerText = "Pris";
        if (priceClicks % 2 == 0) {
          arrows[0].src = "images/arrowdown.svg";
          return a["price"].match(/[0-9]+/) - b["price"].match(/[0-9]+/); // Orders list so that lowest value comes first
        } else {
          arrows[0].src = "images/arrowup.svg";
          return b["price"].match(/[0-9]+/) - a["price"].match(/[0-9]+/); // Orders list so that highest value comes first
        }
      });

      for (let i = 0; i < sortedPrice.length; i++) {
        // Reorders the list of cars
        let elements = Array.from(productChart[i + 1].children);
        elements[0].textContent = sortedPrice[i]["name"];
        elements[1].textContent = sortedPrice[i]["year"];
        elements[2].textContent = sortedPrice[i]["price"];
      }

      break;
    case "year":
      yearClicks = clickCounter(yearClicks);

      sortedYear = cars.sort(function (a, b) {
        sortText.innerText = "Årsgång";
        if (yearClicks % 2 == 0) {
          arrows[1].src = "images/arrowdown.svg";
          return a["year"].match(/[0-9]+/) - b["year"].match(/[0-9]+/); // Orders list so that lowest value comes first
        } else {
          arrows[1].src = "images/arrowup.svg";
          return b["year"].match(/[0-9]+/) - a["year"].match(/[0-9]+/); // Orders list so that highest value comes first
        }
      });

      for (let i = 0; i < sortedYear.length; i++) {
        // Reorders the list of cars
        let elements = Array.from(productChart[i + 1].children);
        elements[0].textContent = sortedYear[i]["name"];
        elements[1].textContent = sortedYear[i]["year"];
        elements[2].textContent = sortedYear[i]["price"];
      }

      break;
    case "name":
      nameClicks = clickCounter(nameClicks);

      sortedName = cars.sort(function (a, b) {
        sortText.innerText = "Modell";
        if (nameClicks % 2 == 0) {
          arrows[2].src = "images/arrowdown.svg";
          return a.name.localeCompare(b.name); // Orders list so that earlier letter comes first
        } else {
          arrows[2].src = "images/arrowup.svg";
          return b.name.localeCompare(a.name); // Orders list so that later letter comes first
        }
      });
      for (let i = 0; i < sortedName.length; i++) {
        //  Reorders the list of cars
        let elements = Array.from(productChart[i + 1].children);
        elements[0].textContent = sortedName[i]["name"];
        elements[1].textContent = sortedName[i]["year"];
        elements[2].textContent = sortedName[i]["price"];
      }

      break;
  }
}

// Checks if the store is closed on the given date
function isDateClosed(year, month, day) {
  // Uses the isValid function to see if the month changes and if it does sets the correct values
  if (!isValid(day, month, year)) {
    month = (month + 1) % 12;
    day -= daysInMonth(month - 1, day);
  }

  const closedDays = [
    { month: 0, day: 1 },
    { month: 0, day: 6 },
    { month: 4, day: 1 },
    { month: 5, day: 6 },
    { month: 11, day: 24 },
    { month: 11, day: 25 },
    { month: 11, day: 26 },
    { month: 11, day: 31 },
  ];

  for (const closedDay of closedDays) {
    if (closedDay.month === month && closedDay.day === day) {
      return true;
    }
  }
  return false;
}

// Check if there is a week change and if so returns the right day of the new week
function getDayWeekLoop(day, additionalDays) {
  if (day + additionalDays > 6) {
    return day + additionalDays - 7;
  } else if (day + additionalDays == NaN) {
    return 0;
  } else {
    return day + additionalDays;
  }
}

// Gets the amount of days in the given month with consideration for leap years
function daysInMonth(m, y) {
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
}
// Checks if the given date is valid in the given month with consideration for leap years
function isValid(d, m, y) {
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

// Look for next open day
function checkNextOpen(
  year,
  month,
  dayOfMonth,
  dayOfWeek,
  days,
  openingHours,
  element
) {
  let daysTillOpen = 0;

  if (dayOfWeek !== 6) {
    // If not saturday

    // Checks how many days untill next open day
    while (
      isDateClosed(year, month, dayOfMonth + daysTillOpen + 1) ||
      getDayWeekLoop(dayOfWeek + daysTillOpen) == 0 ||
      (month == 11 && dayOfMonth == 31)
    ) {
      daysTillOpen++;
      if (!isValid(dayOfMonth + daysTillOpen, month, year)) {
        month = (month + 1) % 12;
        dayOfMonth = 1;
      }
    }

    const nextOpenDay = getDayWeekLoop(dayOfWeek, daysTillOpen);

    if (nextOpenDay === 5) {
      //If friday
      element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${
        openingHours.saturday.open
      }`;
      return false;
    } else {
      element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${
        openingHours.weekdays.open
      }`;
      return false;
    }
  } else if (isDateClosed(year, month, dayOfMonth + 2)) {
    // If saturday and next monday is closed

    while (
      isDateClosed(year, month, dayOfMonth + daysTillOpen + 1) ||
      getDayWeekLoop(dayOfWeek + daysTillOpen) === 0
    ) {
      daysTillOpen++;
      if (!isValid(dayOfMonth + daysTillOpen, month, year)) {
        month = (month + 1) % 12;
        dayOfMonth = 1;
      }
    }

    const nextOpenDay = getDayWeekLoop(dayOfWeek, daysTillOpen);

    if (nextOpenDay === 5) {
      element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${
        openingHours.saturday.open
      }`;
      return false;
    } else {
      element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${
        openingHours.weekdays.open
      }`;
      return false;
    }
  } else {
    // If saturday and the next monday is open
    element.innerText = `Öppnar måndag kl ${openingHours.weekdays.open}`;
    return false;
  }
}

function setLiveOpeningHours(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const element = document.getElementById("storeState");
  const rightNowSpan = document.createElement("span");
  const openSpan = document.createElement("span");
  let storeIsOpen;

  const openingHours = {
    weekdays: { open: 10, close: 16 },
    saturday: { open: 12, close: 15 },
  };

  const days = [
    "Nan",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];

  if (isDateClosed(year, month, dayOfMonth)) {
    storeIsOpen = checkNextOpen(
      year,
      month,
      dayOfMonth,
      dayOfWeek,
      days,
      openingHours,
      element
    );
  } else if (dayOfWeek < 6 && dayOfWeek > 0) {
    // Weekday
    if (hour === openingHours.weekdays.open - 1 && minute >= 30) {
      // 30 min before opening
      element.innerText = `Öppnar om ${60 - minute} minuter`;
      storeIsOpen = false;
    } else if (hour === openingHours.weekdays.close - 1 && minute >= 45) {
      // 15 min before closing
      element.innerText = `Stänger snart`;
      storeIsOpen = true;
    } else if (
      hour >= openingHours.weekdays.open &&
      hour < openingHours.weekdays.close
    ) {
      // The store is open
      rightNowSpan.innerText = "Just nu: ";
      rightNowSpan.style.color = "black";

      openSpan.innerText = "Öppet";
      openSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(rightNowSpan);
      element.appendChild(openSpan);
      storeIsOpen = true;
    } else if (hour < openingHours.weekdays.open) {
      // Earlier than one hour before opening
      element.innerText = `Öppnar idag kl ${openingHours.weekdays.open}`;
      storeIsOpen = false;
    } else {
      // The store is closed
      storeIsOpen = checkNextOpen(
        year,
        month,
        dayOfMonth,
        dayOfWeek,
        days,
        openingHours,
        element
      );
    }
  } else if (dayOfWeek == 6) {
    // Saturday
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
      rightNowSpan.innerText = "Just nu: ";
      rightNowSpan.style.color = "black";

      openSpan.innerText = "Öppet";
      openSpan.style.color = "green";

      element.innerHTML = "";

      element.appendChild(rightNowSpan);
      element.appendChild(openSpan);
      storeIsOpen = true;
    } else if (hour < openingHours.saturday.open) {
      element.innerText = `Öppnar idag kl ${openingHours.saturday.open}`;
      storeIsOpen = false;
    } else {
      storeIsOpen = checkNextOpen(
        year,
        month,
        dayOfMonth,
        dayOfWeek,
        days,
        openingHours,
        element
      );
    }
  } else if (dayOfWeek == 0) {
    // Sunday
    storeIsOpen = checkNextOpen(
      year,
      month,
      dayOfMonth,
      dayOfWeek,
      days,
      openingHours,
      element
    );
  }

  liveStoreStateHeader(storeIsOpen);
}

// Updates the header status
function liveStoreStateHeader(storeIsOpen) {
  const storeOpenElement = document.getElementById("storeOpen");
  const storeClosedElement = document.getElementById("storeClosed");

  if (storeIsOpen === false) {
    storeClosedElement.style.color = "red";
    storeOpenElement.style.color = "white";
  } else if (storeIsOpen === true) {
    storeClosedElement.style.color = "white";
    storeOpenElement.style.color = "green";
  }
}

// Scrolls to the object of the pressed navbar button
function scrollToInfo(id) {
  setTimeout(() => {
    document.getElementById(id).scrollIntoView();
  }, 500);
}

// List of accepted zip codes
zipCodeList = [
  "98132",
  "98135",
  "98136",
  "98137",
  "98138",
  "98139",
  "98140",
  "98142",
  "98143",
  "98144",
  "98146",
  "98147",
];

//  Runs when the document is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector("#zipCodeCheck form")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the default action

      // event.submitter.parentNode.querySelector("#number").value
      // Is what is written in the input
      let zipInput =
        event.submitter.parentNode.querySelector("#zipNumber").value;
      zipInput = zipInput.split(" ").join(""); //removes spaces from string

      if (zipInput.match(/\D/) != null) {
        // If there are no numbers
        document.querySelector("#output").innerHTML =
          "Inte ett giltigt postnummer.";
      } else if (zipInput.length != 5) {
        // If there are more or less then 5 numbers
        document.querySelector("#output").innerHTML =
          "Inte ett giltigt postnummer.";
      } else if (zipCodeList.includes(zipInput)) {
        // If the zip code is valid
        document.querySelector("#output").innerHTML =
          "Vi kör ut, ring telefonnumret ovan!";
      } else {
        // If the zip code is invalid
        document.querySelector("#output").innerHTML =
          "Vi kör tyvärr inte ut till dig.";
      }
    });
});
// Checks what year it is, and adjusts accordingly
function checkYearChange(date, closedDate) {
  if (date.getMonth() < closedDate.split("-")[0] - 1) {
    // If the month of the current date is less than the month of the closed date
    // Return a new date for the current year with the month and day from the closed date
    return new Date(
      date.getFullYear(),
      closedDate.split("-")[0] - 1,
      closedDate.split("-")[1]
    );
  } else if (
    date.getMonth() == closedDate.split("-")[0] - 1 &&
    date.getDate() < closedDate.split("-")[1]
  ) {
    // If the month of the current date is the same as the month of the closed date,
    // but the day is less than the day of the closed date
    // Return a new date for the current year with the month and day from the closed date
    return new Date(
      date.getFullYear(),
      closedDate.split("-")[0] - 1,
      closedDate.split("-")[1]
    );
  } else {
    // If neither of the above conditions are met, it means the closed date is in the future year
    // Return a new date for the next year with the month and day from the closed date
    return new Date(
      parseInt(date.getFullYear()) + 1,
      closedDate.split("-")[0] - 1,
      closedDate.split("-")[1]
    );
  }
}

// Closed days automatic order
function sortClosedDays(date) {
  let sortedHolidays;
  let data = [
    {
      text: "Nyårsdagen",
      date: "1-1",
    },
    {
      text: "Trettondedag jul",
      date: "1-6",
    },
    {
      text: "Första maj",
      date: "5-1",
    },
    {
      text: "Sveriges<br>nationaldag&nbsp;",
      date: "6-6",
    },
    {
      text: "Julafton",
      date: "12-24",
    },
    {
      text: "Juldagen",
      date: "12-25",
    },
    {
      text: "Annandag jul",
      date: "12-26",
    },
    {
      text: "Nyårsafton",
      date: "12-31",
    },
  ];

  sortedHolidays = data.sort((a, b) => {
    let dateA = checkYearChange(date, a.date);
    let dateB = checkYearChange(date, b.date);

    const diffA = Math.abs(dateA - date);
    const diffB = Math.abs(dateB - date);

    return diffA - diffB;
  });
  // Gets the HTML list
  let closedDaysList = document
    .getElementById("closedDaysList")
    .getElementsByTagName("li");

  // Sets the value
  for (let i = 0; i < sortedHolidays.length; i++) {
    console.log("HOLIDAY" + (i + 1).toString());
    closedDaysList[i].innerHTML = sortedHolidays[i]["text"];
    elementDate = document.createElement("span");
    elementDate.className = "float-end";
    elementDate.innerHTML = sortedHolidays[i]["date"].replace("-", "/");
    closedDaysList[i].appendChild(elementDate);
  }
}

function priceTaxes(isCompany) {
  let carsList = [
    {
      name: "Audi A6",
      year: "2011",
      price: "800\u00A0kr",
      companyPrice: "650\u00A0kr",
    },

    {
      name: "Audi S3",
      year: "2015",
      price: "450\u00A0kr",
      companyPrice: "360\u00A0kr",
    },

    {
      name: "Cadillac Escalade",
      year: "1999",
      price: "500\u00A0kr",
      companyPrice: "400\u00A0kr",
    },

    {
      name: "Kia Carens",
      year: "2022",
      price: "400\u00A0kr",
      companyPrice: "320\u00A0kr",
    },

    {
      name: "Kia Soul",
      year: "2020",
      price: "400\u00A0kr",
      companyPrice: "320\u00A0kr",
    },

    {
      name: "Mitsubishi Outlander",
      year: "2018",
      price: "450\u00A0kr",
      companyPrice: "360\u00A0kr",
    },

    {
      name: "Renault Kadjar",
      year: "2020",
      price: "250\u00A0kr",
      companyPrice: "200\u00A0kr",
    },

    {
      name: "Subaru Outback",
      year: "2020",
      price: "300\u00A0kr",
      companyPrice: "240\u00A0kr",
    },

    {
      name: "Volvo XC40",
      year: "2018",
      price: "800\u00A0kr",
      companyPrice: "650\u00A0kr",
    },

    {
      name: "VW Polo",
      year: "2022",
      price: "300\u00A0kr",
      companyPrice: "240\u00A0kr",
    },
  ];

  let productChart = document
    .getElementById("productChart")
    .getElementsByTagName("tr");
  if (isCompany == true) {
    for (let i = 1; i < productChart.length; i++) {
      let elements = Array.from(productChart[i + 1].children);
      elements[3].match(/[0-9]+/);
    }
  } else if (isCompany == false) {
  }
}

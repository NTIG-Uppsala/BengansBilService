window.setInterval(function () {
    setLiveOpeningHours(new Date());
}, 30000); //Every 30 sec

// Globally defines the opening hours array
const openingHours = {
    weekdays: { open: 10, close: 16 },
    saturday: { open: 12, close: 15 },
};

// Globally defines array of weekday names
const days = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
];

// Checks if the store is closed on the given date
function isDateClosed(date) {
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();

    const closedDays = [ // Array of all closed days months are calculated from 0-11
        { month: 0, dayOfMonth: 1 },
        { month: 0, dayOfMonth: 6 },
        { month: 4, dayOfMonth: 1 },
        { month: 5, dayOfMonth: 6 },
        { month: 11, dayOfMonth: 24 },
        { month: 11, dayOfMonth: 25 },
        { month: 11, dayOfMonth: 26 },
        { month: 11, dayOfMonth: 31 },
    ];

    if (dayOfWeek == 0) { // If the date is a Sunday
        return true;
    }

    for (const closedDay of closedDays) {
        if (closedDay.month === month && closedDay.dayOfMonth === dayOfMonth) {
            return true;
        }
    }
    return false;
}

// Gets and changes the opening status
function setOpeningStatus(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Sets the opening hours and checking for the special case of Saturday
    let openingTime = date.getDay() === 6 ? openingHours.saturday.open : openingHours.weekdays.open;
    let closingTime = date.getDay() === 6 ? openingHours.saturday.close : openingHours.weekdays.close;

    if (hour === openingTime - 1 && minute >= 30) { // Closed but max 30 min before opening
        displayOpeningStatus(`Öppnar om ${60 - minute} minuter`, "orange");
    } else if (hour < openingTime) { // Closed and more than 30 min until open today
        displayOpeningStatus(`Öppnar idag kl. ${openingTime}`, "orange");
    } else if (hour === closingTime - 1 && minute >= 45) {  // Open and 15 min or less before closing
        displayOpeningStatus("Stänger snart", "orange")
    } else if (hour >= openingTime && hour < closingTime) {  // Open and more than 15 min before closing
        displayOpeningStatus("Öppet", "green")
    } else { // Has closed for the day
        checkNextOpen(date);
    };
};

// Displays the opening status on the page
function displayOpeningStatus(status, color) {
    const element = document.getElementById("storeState");
    if (color === 'orange') {
        element.innerText = status;
    } else { // If the store is opened and more than 15 minutes before closing
        const rightNowSpan = document.createElement("span");
        const statusSpan = document.createElement("span");

        rightNowSpan.innerText = "Just nu: ";
        rightNowSpan.style.color = "black";

        statusSpan.innerText = status;
        statusSpan.style.color = color;

        element.innerHTML = "";

        element.append(rightNowSpan);
        element.append(statusSpan);
    }
}

// Gets the next open day and calls the display function accordingly
function checkNextOpen(date) {
    // Moves the date object forward in time a day at a time until we find a day when the store is open
    do {
        date.setDate(date.getDate() + 1);
    } while (isDateClosed(date));

    const weekdayOfNextOpenDay = date.getDay();
    const openTimeForThatDay = weekdayOfNextOpenDay === 6 ? openingHours.saturday.open : openingHours.weekdays.open; // Special opening hours on Saturdays

    displayOpeningStatus(`Öppnar ${days[weekdayOfNextOpenDay]} kl. ${openTimeForThatDay}`, 'orange')
};

function setLiveOpeningHours(date) {
    if (isDateClosed(date)) { // If the date is closed or if the date is a Sunday
        checkNextOpen(date);
    } else {
        setOpeningStatus(date);
    }
};
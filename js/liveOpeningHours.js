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
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

// Checks if the store is closed on the given date
function isDateClosed(date) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek == 0) { // If the date is a Sunday
        return true;
    }

    const month = date.getMonth();
    const dayOfMonth = date.getDate();

    const closedDays = []; // Array of all closed days months are calculated from 0-11

    // Takes the global list of closed days (defined in sortClosedDays.js) and turns it into a list with dates seperated into day and month
    closedDaysList.forEach(element => {
        const [month, day] = element["date"].split('-').map(Number);
        closedDays.push({ month: month - 1, dayOfMonth: day })
    });

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
    let openingTime =
        date.getDay() === 6
            ? openingHours.saturday.open
            : openingHours.weekdays.open;
    let closingTime =
        date.getDay() === 6
            ? openingHours.saturday.close
            : openingHours.weekdays.close;

    if (hour === openingTime - 1 && minute >= 30) { // Closed but max 30 min before opening
        displayOpeningStatus(`Öppnar om ${60 - minute} minuter`, false);
    } else if (hour < openingTime) { // Closed and more than 30 min until open today
        displayOpeningStatus(`Öppnar idag kl. ${openingTime}`, false);
    } else if (hour === closingTime - 1 && minute >= 45) {  // Open and 15 min or less before closing
        displayOpeningStatus("Stänger snart", false);
    } else if (hour >= openingTime && hour < closingTime) {  // Open and more than 15 min before closing
        displayOpeningStatus("Öppet", true);
    } else { // Has closed for the day
        checkNextOpenDay(date);
    };
};

// Displays the opening status on the page
function displayOpeningStatus(status, specialCase) {
    const element = document.getElementById("storeState");
    if (specialCase === false) {
        element.innerText = status;
    } else if (specialCase === true) { // If the store is opened and more than 15 minutes before closing
        // Creates the span containing the green text
        const openSpan = document.createElement("span");
        openSpan.innerText = status;
        openSpan.style.color = 'green';

        element.innerHTML = "Just nu: ";

        element.append(openSpan);
    }
}

// Gets the next open day and calls the display function accordingly
function checkNextOpenDay(date) {
    // Moves the date object forward in time a day at a time until we find a day when the store is open
    do {
        date.setDate(date.getDate() + 1);
    } while (isDateClosed(date));

    const weekdayOfNextOpenDay = date.getDay();
    const openTimeForThatDay =
        weekdayOfNextOpenDay === 6
            ? openingHours.saturday.open
            : openingHours.weekdays.open; // Special opening hours on Saturdays

    displayOpeningStatus(`Öppnar ${days[weekdayOfNextOpenDay]} kl. ${openTimeForThatDay}`, false)
};

function setLiveOpeningHours(date) {
    if (isDateClosed(date)) {
        // If the date is closed or if the date is a Sunday
        checkNextOpenDay(date);
    } else {
        setOpeningStatus(date);
    }
}

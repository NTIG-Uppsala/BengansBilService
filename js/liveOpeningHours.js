window.setInterval(function () {
    setLiveOpeningHours(new Date());
}, 30000); //Every 30 sec

// Globally defines the opening hours array
const openingHours = {
    weekdays: { open: 10, close: 16 },
    saturday: { open: 12, close: 15 },
};

// Checks if the store is closed on the given date
function isDateClosed(year, month, day) {
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

    // Uses the isValid function to see if the month changes and if it does sets the correct values
    if (!isValid(day, month, year)) {
        month = (month + 1) % 12;
        day -= daysInMonth(month - 1, day);
    }

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

// Gets and changes the opening status
function getOpeningStatus(year, month, dayOfMonth, dayOfWeek, days, hour, minute, currentOpeningHours, element) {
    const rightNowSpan = document.createElement("span");
    const openSpan = document.createElement("span");

    if (hour === currentOpeningHours.open - 1 && minute >= 30) {
        // 30 min before opening
        element.innerText = `Öppnar om ${60 - minute} minuter`;
    } else if (hour === currentOpeningHours.close - 1 && minute >= 45) {
        // 15 min before closing
        element.innerText = `Stänger snart`;
    } else if (
        hour >= currentOpeningHours.open &&
        hour < currentOpeningHours.close
    ) {
        // The store is open
        rightNowSpan.innerText = "Just nu: ";
        rightNowSpan.style.color = "black";

        openSpan.innerText = "Öppet";
        openSpan.style.color = "green";

        element.innerHTML = "";

        element.appendChild(rightNowSpan);
        element.appendChild(openSpan);
    } else if (hour < currentOpeningHours.open) {
        // Earlier than one hour before opening
        element.innerText = `Öppnar idag kl. ${currentOpeningHours.open}`;
    } else {
        // The store is closed
        checkNextOpen(
            year,
            month,
            dayOfMonth,
            dayOfWeek,
            days,
            element
        );
    };
};

function checkNextOpen(
    year,
    month,
    dayOfMonth,
    dayOfWeek,
    days,
    element
) {
    let daysTillOpen = 0;

    if (dayOfWeek !== 6 || (dayOfWeek == 6 && isDateClosed(year, month, dayOfMonth + 2))) {
        // If not Saturday

        // Checks how many days until next open day
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
        };

        const nextOpenDay = getDayWeekLoop(dayOfWeek, daysTillOpen);

        if (nextOpenDay === 5) {
            // If Friday
            element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl. ${openingHours.saturday.open}`;
        } else {
            element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl. ${openingHours.weekdays.open}`;
        }
    } else {
        // If Saturday and the next Monday is open
        element.innerText = `Öppnar måndag kl. ${openingHours.weekdays.open}`;
    };
};

function setLiveOpeningHours(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const element = document.getElementById("storeState");

    const days = [
        "Nan",
        "måndag",
        "tisdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lördag",
    ];

    if (isDateClosed(year, month, dayOfMonth) || dayOfWeek == 0) {
        // If the date is closed or a Sunday
        checkNextOpen(
            year,
            month,
            dayOfMonth,
            dayOfWeek,
            days,
            element
        );
    } else if (dayOfWeek < 6 && dayOfWeek > 0) {
        // Weekday
        getOpeningStatus(year,
            month,
            dayOfMonth,
            dayOfWeek,
            days,
            hour,
            minute,
            openingHours.weekdays,
            element
        );
    } else if (dayOfWeek == 6) {
        // Saturday
        getOpeningStatus(year,
            month,
            dayOfMonth,
            dayOfWeek,
            days,
            hour,
            minute,
            openingHours.saturday,
            element
        );
    }
};
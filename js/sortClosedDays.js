// Creates a global list for closed days
let closedDays = [
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

// Creates a list for closed days
function sortHolidays(date) {
    let sortedHolidays = closedDays.sort((a, b) => {
        let dateA = checkYearChange(date, a.date);
        let dateB = checkYearChange(date, b.date);

        const diffA = Math.abs(dateA - date);
        const diffB = Math.abs(dateB - date);

        return diffA - diffB;
    });

    return sortedHolidays
}

// Sorts the closed days
function sortClosedDays(date) {
    // Gets a sorted list of holidays through the sortHolidays function
    let sortedHolidays = sortHolidays(date)

    // Gets the HTML list
    let closedDaysList = document
        .getElementById("closedDaysList")
        .getElementsByTagName("li");

    // Sets the value
    for (let i = 0; i < sortedHolidays.length; i++) {
        closedDaysList[i].innerHTML = sortedHolidays[i]["text"];
        elementDate = document.createElement("span");
        elementDate.className = "float-end";
        elementDate.innerHTML = sortedHolidays[i]["date"].replace("-", "/");
        closedDaysList[i].appendChild(elementDate);
    }
}
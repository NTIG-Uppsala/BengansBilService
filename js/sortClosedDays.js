// Creates a global list for closed days
let closedDaysList = [
    { text: "Nyårsdagen", date: "1-1", },
    { text: "Trettondedag jul", date: "1-6", },
    { text: "Första maj", date: "5-1", },
    { text: "Sveriges<br>nationaldag&nbsp;", date: "6-6", },
    { text: "Julafton", date: "12-24", },
    { text: "Juldagen", date: "12-25", },
    { text: "Annandag jul", date: "12-26", },
    { text: "Nyårsafton", date: "12-31", },
];

// Function to parse a date string in "MM-DD" format and return a Date object
function parseDate(currentDate, closedDate) {
    // Gets month and day from the closed day as numbers
    const [month, day] = closedDate.split('-').map(Number);
    const currentYear = currentDate.getFullYear();
    const nextYear = currentDate.getFullYear() + 1;

    if (month > currentDate.getMonth() + 1 || (month === currentDate.getMonth() + 1 && day > currentDate.getDate())) {
        // If the date is in the future (including this year), use the current year
        return new Date(currentYear, month - 1, day);
    } else {
        // If the date is in the past, use the next year
        return new Date(nextYear, month - 1, day);
    }
}

// Creates a list for closed days
function sortHolidays(date) {
    let sortedHolidays = closedDaysList.sort((a, b) => {
        let dateA = parseDate(date, a.date);
        let dateB = parseDate(date, b.date);

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
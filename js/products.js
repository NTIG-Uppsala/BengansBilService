let isCompanyPriceGlobal = false;

// Lists all cars that the company offers
let carsList = [
    { name: "Audi A6", year: "2011", price: 800 },
    { name: "Audi S3", year: "2015", price: 450 },
    { name: "Cadillac Escalade", year: "1999", price: 500 },
    { name: "Kia Carens", year: "2022", price: 400 },
    { name: "Kia Soul", year: "2020", price: 400 },
    { name: "Mitsubishi Outlander", year: "2018", price: 450 },
    { name: "Renault Kadjar", year: "2020", price: 250 },
    { name: "Subaru Outback", year: "2020", price: 300 },
    { name: "Volvo XC40", year: "2018", price: 800 },
    { name: "VW Polo", year: "2022", price: 300 },
];

// Runs when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("carList");

    // Adds the cars to the HTML
    carsList.forEach(function (car) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const yearCell = document.createElement("td");
        const priceCell = document.createElement("td");

        nameCell.textContent = car.name;
        yearCell.textContent = car.year;
        if (isCompanyPriceGlobal == true) {
            priceCell.textContent = car.price * 0.8 + "\u00A0kr (exkl. moms)";
        } else {
            priceCell.textContent = car.price + "\u00A0kr";
        }

        row.appendChild(nameCell);
        row.appendChild(yearCell);
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    });
});

// Defines clicks and click counter for the buttons
// The clicks are later used to check how the cars should be sorted
let nameClicks = 0;
let priceClicks = 0;
let yearClicks = 0;
function clickCounter(clicks) {
    clicks += 1;
    return clicks;
}

// Sorts the list of cars
function sortCars(buttonInput) {
    // Gets the arrows in the dropdown
    let arrows = document.getElementsByClassName("sortArrow");
    // Gets the text that specifies what the list is sorted by
    let sortText = document.getElementById("currentSorting");

    // Defines the variable used to sort the list
    let sortedCars;

    // Checks the sorting type and creates the sorted list
    switch (buttonInput) {
        // Sorts the list by price
        case "price":
            priceClicks = clickCounter(priceClicks); // Updates the clicks
            sortedCars = carsList.sort(function (a, b) {
                // Sorts the list
                sortText.innerText = "Dagspris";
                if (priceClicks % 2 == 0) {
                    arrows[0].src = "images/arrowdown.svg";
                    return a["price"] - b["price"]; // Orders list so that lowest value comes first
                } else {
                    arrows[0].src = "images/arrowup.svg";
                    return b["price"] - a["price"]; // Orders list so that highest value comes first
                }
            });
            break;
        // Sorts the list by year
        case "year":
            yearClicks = clickCounter(yearClicks); // Updates the clicks
            sortedCars = carsList.sort(function (a, b) {
                sortText.innerText = "Årsmodell";
                if (yearClicks % 2 == 0) {
                    arrows[1].src = "images/arrowdown.svg";
                    return a["year"] - b["year"]; // Orders list so that lowest value comes first
                } else {
                    arrows[1].src = "images/arrowup.svg";
                    return b["year"] - a["year"]; // Orders list so that highest value comes first
                }
            });
            break;
        // Sorts the list by name alphabetically
        case "name":
            nameClicks = clickCounter(nameClicks); // Updates the clicks
            sortedCars = carsList.sort(function (a, b) {
                sortText.innerText = "Bilar";
                if (nameClicks % 2 == 0) {
                    arrows[2].src = "images/arrowdown.svg";
                    return a.name.localeCompare(b.name); // Orders list so that earlier letter comes first
                } else {
                    arrows[2].src = "images/arrowup.svg";
                    return b.name.localeCompare(a.name); // Orders list so that later letter comes first
                }
            });
            break;
    }

    // Returns the new and sorted list
    return sortedCars;
}

// Sorts the pages product chart
function sortProductChart(buttonInput) {
    // Gets the product chart HTML elements rows
    let productChart = document
        .getElementById("productChart")
        .getElementsByTagName("tr");

    // Gets the sorted list using the sortCars function
    let sortedCars = sortCars(buttonInput);

    // Reorders the product chart using the sorted list
    for (let i = 0; i < sortedCars.length; i++) {
        // Gets the items from the product chart row
        let productChartItems = Array.from(productChart[i + 1].children);
        productChartItems[0].textContent = sortedCars[i]["name"];
        productChartItems[1].textContent = sortedCars[i]["year"];
        // Checks if the shown prices should be for company or private consumer
        if (isCompanyPriceGlobal == true) {
            productChartItems[2].textContent =
                (sortedCars[i]["price"] * 0.8) + "\u00A0kr (exkl. moms)";
        } else {
            productChartItems[2].textContent = sortedCars[i]["price"] + "\u00A0kr";
        }
    }
}

// Changes prices between company and private depending on the button press
function priceChangeVAT(isCompany) {
    // Gets the product chart HTML elements rows
    let productChart = document
        .getElementById("productChart")
        .getElementsByTagName("tr");

    if (isCompany == true) { // Sets the prices to company prices
        isCompanyPriceGlobal = true; // Modifies the global variable for company price

        // Loops through the list and changes the prices correctly
        for (let i = 0; i < carsList.length; i++) {
            for (let n = 0; n < carsList.length; n++) {
                let elements = Array.from(productChart[i + 1].children);
                if (elements[0].innerText == carsList[n]["name"]) {
                    elements[2].innerText = (carsList[n]["price"] * 0.8) + "\u00A0kr (exkl. moms)";
                }
            }
        }
    } else if (isCompany == false) { // Sets the prices to private prices
        isCompanyPriceGlobal = false; // Modifies the global variable for company price

        // Loops through the list and changes the prices correctly
        for (let i = 0; i < carsList.length; i++) {
            for (let n = 0; n < carsList.length; n++) {
                let elements = Array.from(productChart[i + 1].children);
                if (elements[0].innerText == carsList[n]["name"]) {
                    elements[2].innerText = carsList[n]["price"] + "\u00A0kr";
                }
            }
        }
    }
}

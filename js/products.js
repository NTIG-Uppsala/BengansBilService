let isCompanyPriceGlobal = false; // Sets isCompanyPriceGlobal to false, so that price is with VAT
let sortOptionObject = { "sortOptionGlobal": "name", "isRisingGlobal": true }; // Global variable for sorting 

let dropdownTitles = { name: "CARS", price: "DAYPRICE", year: "YEAR", }

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

// Adjusts the price accordinly to to VAT
function VATRedcution(carPrice) {
    // percentual modifyer of VAT, 0.8 = 80%
    const changeFactor = 0.8;
    let withoutVAT;
    withoutVAT = carPrice * changeFactor;
    return withoutVAT;
}

function fillProductChart() {
    const tableBody = document.getElementById("carList");

    // Creates table for products
    carsList.forEach(function (car) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const yearCell = document.createElement("td");
        const priceCell = document.createElement("td");

        row.appendChild(nameCell);
        row.appendChild(yearCell);
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    });
    sortProductChart(sortOptionObject["sortOptionGlobal"], sortOptionObject["isRisingGlobal"])
}


// Sorts the list of cars
function sortCars(sortChoice, isRising) {
    // Defines the array
    let sortedCars;
    // Checks the sorting type and creates the sorted list
    switch (sortChoice) {
        // Sorts the list by price
        case "price":
            if (isRising === true) {
                sortedCars = carsList.sort(function (a, b) { // Sorts the list
                    return a["price"] - b["price"]; // Orders list so that lowest value comes first
                });
            } else if (isRising === false) {
                sortedCars = carsList.sort(function (a, b) {
                    return b["price"] - a["price"]; // Orders list so that highest value comes first
                });
            }
            break;

        // Sorts the list by year
        case "year":
            if (isRising === true) {
                sortedCars = carsList.sort(function (a, b) {
                    return a["year"] - b["year"]; // Orders list so that lowest value comes first
                });
            } else if (isRising === false) {
                sortedCars = carsList.sort(function (a, b) {
                    return b["year"] - a["year"]; // Orders list so that highest value comes first
                });
            }
            break;

        // Sorts the list by name alphabetically
        case "name":
            if (isRising === true) {
                sortedCars = carsList.sort(function (a, b) {
                    return a.name.localeCompare(b.name); // Orders list so that earlier letter comes first
                });
            } else if (isRising === false) {
                sortedCars = carsList.sort(function (a, b) {
                    return b.name.localeCompare(a.name); // Orders list so that later letter comes first
                });
            }
            break;
    }

    // Returns the new and sorted list
    return sortedCars;
}

// Sets the dropdowns sorting text
function displaySortDropdown(sortChoice) {
    // Gets the text that specifies what the list is sorted by
    let sortText = document.getElementById("currentSorting");

    switch (sortChoice) {
        case "price":
            sortText.innerText = dropdownTitles["price"];
            break;

        case "year":
            sortText.innerText = dropdownTitles["year"];
            break;

        case "name":
            sortText.innerText = dropdownTitles["name"];
            break;
    }
}

// Sorts the pages product chart
function sortProductChart(sortChoice, isRising) {

    sortOptionObject["sortOptionGlobal"] = sortChoice
    sortOptionObject["isRisingGlobal"] = isRising

    // Gets the product chart HTML elements rows
    let productChart = document
        .getElementById("productChart")
        .getElementsByTagName("tr");

    displaySortDropdown(sortChoice);

    // Gets the sorted list using the sortCars function
    let sortedCars = sortCars(sortChoice, isRising);

    // Reorders the product chart using the sorted list
    for (let i = 0; i < sortedCars.length; i++) {
        // Gets the items from the product chart row
        let productChartItems = Array.from(productChart[i + 1].children);
        productChartItems[0].textContent = sortedCars[i]["name"];
        productChartItems[1].textContent = sortedCars[i]["year"];
        // Checks if the shown prices should be for company or private consumer
        if (isCompanyPriceGlobal == true) {
            productChartItems[2].textContent =
                Math.ceil(VATRedcution(sortedCars[i]["price"])) + "\u00A0kr (exkl. moms)";
        } else {
            productChartItems[2].textContent =
                Math.ceil((sortedCars[i]["price"])) + "\u00A0kr (inkl. moms)";
        }
    }
}

// Changes the active button between company and private
function changeActiveButton(isCompany) {
    // Add the 'btn-toggle-active' class to the clicked button
    if (isCompany) {
        document.getElementById('companyPriceButton').classList.add('btn-toggle-active');
        document.getElementById('privatePriceButton').classList.remove('btn-toggle-active');
    } else {
        document.getElementById('privatePriceButton').classList.add('btn-toggle-active');
        document.getElementById('companyPriceButton').classList.remove('btn-toggle-active');
    }
}

// Changes prices between company and private depending on the button press
function priceChangeVAT(isCompany) {
    // Gets the product chart HTML elements rows
    let productChart = document
        .getElementById("productChart")
        .getElementsByTagName("tr");

    changeActiveButton(isCompany);
    if (isCompany == true) {
        // Sets the prices to company prices
        isCompanyPriceGlobal = true; // Modifies the global variable for company price
        sortProductChart(sortOptionObject["sortOptionGlobal"], sortOptionObject["isRisingGlobal"])
    } else if (isCompany == false) {
        // Sets the prices to private prices
        isCompanyPriceGlobal = false; // Modifies the global variable for company price
        sortProductChart(sortOptionObject["sortOptionGlobal"], sortOptionObject["isRisingGlobal"])
    }
}
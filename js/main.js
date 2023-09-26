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

function priceChangeVAT(isFöretag) {
    // Add the 'btn-toggle-active' class to the clicked button
    if (isFöretag) {
        document.getElementById('companyPriceButton').classList.add('btn-toggle-active');
        document.getElementById('privatePriceButton').classList.remove('btn-toggle-active');
    } else {
        document.getElementById('privatePriceButton').classList.add('btn-toggle-active');
        document.getElementById('companyPriceButton').classList.remove('btn-toggle-active');
    }
}
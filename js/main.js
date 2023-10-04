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
            event.preventDefault(); // Prevents anything to be in input variable from the start
            // Gets info from the input form 
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

function changeActiveLang(lang) {
    active = document.getElementById("activeLang");
    replace = document.getElementById(lang).src;

    if (active != replace) {
        active.src = replace;
        replace = active.src;
    }
};
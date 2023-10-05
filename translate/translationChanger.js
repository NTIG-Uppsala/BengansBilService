// Changes the inner text of a HTML element found through looping the JSON
function changeInnerText(searchWord, newText) {
    let spans = document.getElementsByTagName("span"); // Gets all span tags from the HTML document
    for (const span of spans) {
        if (span.textContent === searchWord) { // Finds the span that matches the given variable (searchWord)
            span.innerHTML = (newText) // Replaces the search word with the corresponding text
        }
    }

    let inputs = document.getElementsByTagName("input"); // Gets all input tags
    for (const input of inputs) {
        if (input.placeholder === searchWord) {
            input.placeholder = (newText) // Replaces the base text of an input field
        }
        if (input.value === searchWord) {
            input.value = (newText) // Replaces the text of buttons
        }
    }
}

// Changes variables in the JavaScript files
function changeJavaScript(searchWord, newText) {
    for (let i = 0; i < days.length; i++) { // Loops through the global days array
        if (days[i]["variable"] === searchWord) {
            days[i]["name"] = newText; // Replaces the text of the array item if it matches the search word
        }
    }

    let liveOpeningTextByIndex = Object.keys(liveOpeningHoursTextContent); // Gets the dropdown titles object as an array
    for (let i = 0; i < liveOpeningTextByIndex.length; i++) { // Loops through the array made from dropdown titles
        // Uses the dropdownTitlesByIndex to get the name of the position in the object to be replaced
        if (liveOpeningTextByIndex[i] === searchWord) {
            liveOpeningHoursTextContent[liveOpeningTextByIndex[i]] = newText;
        }
    }

    for (let i = 0; i < closedDaysList.length; i++) { // Loops through the global list of closed days
        if (closedDaysList[i]["content"]["variable"] === searchWord) {
            closedDaysList[i]["content"]["text"] = newText; // Replaces the text of the array item if it matches the search word
        }
    }

    let dropdownTitlesByIndex = Object.keys(dropdownTitles); // Gets the dropdown titles object as an array
    for (let i = 0; i < dropdownTitlesByIndex.length; i++) { // Loops through the array made from dropdown titles
        // Uses the dropdownTitlesByIndex to get the name of the position in the object to be replaced
        if (dropdownTitlesByIndex[i] === searchWord) {
            dropdownTitles[dropdownTitlesByIndex[i]] = newText;
        }
    }

    let zipcodeOutputByIndex = Object.keys(zipcodeOutput); // Gets the zipcode output object as an array
    for (let i = 0; i < zipcodeOutputByIndex.length; i++) { // Loops through the array made from zipcode outputs
        // Uses the zipcodeOutputByIndex to get the name of the position in the object to be replaced
        if (zipcodeOutputByIndex[i] === searchWord) {
            zipcodeOutput[zipcodeOutputByIndex[i]] = newText;
        }
    }

}

function translateCategory(object) {
    let itemByIndex = Object.keys(object);
    for (let i = 0; i < itemByIndex.length; i++) {
        // Changes the JavaScript
        changeJavaScript(itemByIndex[i], object[itemByIndex[i]]);
    }
}

// Translates the template
function translateTemplate(language) {
    // Uses the fetch function to access the translation json
    fetch('translate/translation.json')
        .then(response => {
            return response.json();
        }).then(json => {
            let languageObject = json[language]; // Gets the correct language object
            let languageItemByIndex = Object.keys(languageObject); // Gets the object as an array
            for (let i = 0; i < languageItemByIndex.length; i++) { // Loops through the object using the array
                // Uses the changeInnerText function together with the position name from the languageItemByIndex array
                changeInnerText(languageItemByIndex[i], languageObject[languageItemByIndex[i]]);
            }

            let daysObject = languageObject["days"]; // Gets the object of days
            translateCategory(daysObject);

            let liveOpeningHoursTextObject = languageObject["liveOpeningHoursText"]; // Gets the object of liveOpeningHoursText
            translateCategory(liveOpeningHoursTextObject);

            let holidayObject = languageObject["holidays"]; // Gets the closed days
            translateCategory(holidayObject);

            let sortDropdownObject = languageObject["sortDropdown"]; // Gets the text for sort dropdown
            translateCategory(sortDropdownObject);

            let zipcodeOutputObject = languageObject["zipcodeOutputs"];
            translateCategory(zipcodeOutputObject);

            // Calls the functions that needs to be called after the translation is done
            pageSetup();
            changeActiveLangImage(language);
        })
}

function pageSetup() {
    fillProductChart();
    activateDeliveryCheck();
    sortClosedDays(new Date());
    setLiveOpeningHours(new Date());
}

// Generates the document with the correct language
function generateDocument(language) {
    document.documentElement.lang = language;
    // Uses fetch to get the template page
    fetch("translate/template.html")
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser(); // Defines a parser to turn string into a document element
            var doc = parser.parseFromString(html, 'text/html'); // Parses the template into a document element

            document.body.innerHTML = doc.body.innerHTML // Replaces the current documents content with the template content
            // Runs the function that needs to load with the website
            document.body.onload = translateTemplate(language);
        })
}
function getInnerText(x, newText) {
    let spans = document.getElementsByTagName("span");
    for (const span of spans) {
        if (span.textContent.includes(x)) {
            span.innerHTML = (newText)
        }
    }

    let inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
        if (input.placeholder.includes(x)) {
            input.placeholder = (newText)
        }
        if (input.value.includes(x)) {
            input.value = (newText)
        }
    }
}

function changeList(json, newText) {
    for (let i = 0; i < days.length; i++) {
        if (days[i].includes(json)) {
            days[i] = newText;
        }
    }

    for (let i = 0; i < closedDaysList.length; i++) {
        if (closedDaysList[i]["text"].includes(json)) {
            closedDaysList[i]["text"] = newText;
        }
    }

    let dropdownTitlesByIndex = Object.keys(dropdownTitles);
    for (let i = 0; i < dropdownTitlesByIndex.length; i++) {
        if (dropdownTitles[dropdownTitlesByIndex[i]].includes(json)) {
            dropdownTitles[dropdownTitlesByIndex[i]] = newText;
        }
    }
    let zipcodeOutputByIndex = Object.keys(zipcodeOutput);
    for (let i = 0; i < zipcodeOutputByIndex.length; i++) {
        if (zipcodeOutput[zipcodeOutputByIndex[i]].includes(json)) {
            zipcodeOutput[zipcodeOutputByIndex[i]] = newText;
        }
    }

}

function translateTemplate(language) {
    fetch('../translate/translation.json')
        .then(response => {
            return response.json();
        }).then(json => {
            let languageObject = json[language];
            let languageItemByIndex = Object.keys(languageObject);
            for (let i = 0; i < languageItemByIndex.length; i++) {
                getInnerText(languageItemByIndex[i], languageObject[languageItemByIndex[i]]);
            }

            let daysObject = languageObject["days"];
            let daysItemByIndex = Object.keys(daysObject);
            for (let i = 0; i < daysItemByIndex.length; i++) {
                changeList(daysItemByIndex[i], daysObject[daysItemByIndex[i]]);
            }

            let holidayObject = languageObject["holidays"];
            let holidayItemsByIndex = Object.keys(holidayObject);
            for (let i = 0; i < holidayItemsByIndex.length; i++) {
                changeList(holidayItemsByIndex[i], holidayObject[holidayItemsByIndex[i]]);
            }

            let sortDropdownObject = languageObject["sortDropdown"];
            let sortItemsByIndex = Object.keys(sortDropdownObject);
            for (let i = 0; i < sortItemsByIndex.length; i++) {
                changeList(sortItemsByIndex[i], sortDropdownObject[sortItemsByIndex[i]]);
            }

            let zipcodeOutputObject = languageObject["zipcodeOutputs"];
            let zipcodeOutputByIndex = Object.keys(zipcodeOutputObject);
            for (let i = 0; i < zipcodeOutputByIndex.length; i++) {
                changeList(zipcodeOutputByIndex[i], zipcodeOutputObject[zipcodeOutputByIndex[i]]);
            }

            sortClosedDays(new Date());
            fillProductChart()
        })
}

function generateDocument(language) {
    fetch("../translate/template.html")
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            document.body = doc.body
            document.body.onload = translateTemplate(language);
            document.body.onload = setLiveOpeningHours(new Date());
            document.body.onload = activateDeliveryCheck();
            document.body.onload = changeActiveLangImage(document.documentElement.lang)
        })
}
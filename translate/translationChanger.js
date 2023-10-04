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
    for (let i = 0; i < days.length;i++){
        if (days[i].includes(json)){
            days[i] = newText
        }
    }
}

function translateTemplate(language) {
    fetch('../translate/translation.json')
        .then(response => {
            return response.json();
        }).then(json => {
            let languageObject = json[language];
            let objectByIndex = Object.keys(languageObject)
            for (let i = 0; i < Object.keys(languageObject).length; i++) {
                getInnerText(objectByIndex[i], languageObject[objectByIndex[i]])
            }
        })
}

function changeLanguage(language) {
    fetch("../translate/template.html")
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            document.body = doc.body
            document.body.onload = fillProductChart();
            document.body.onload = setLiveOpeningHours(new Date());
            document.body.onload = sortClosedDays(new Date());
            document.body.onload = translateTemplate(language)
        })
}
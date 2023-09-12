window.setInterval(function () {
	setLiveOpeningHours(new Date());
}, 30000); //Every 30 sec

document.addEventListener("DOMContentLoaded", function () {
	const cars = [
		{ name: "Audi A6", year: "2011", price: "800\u00A0kr" },
		{ name: "Audi S3", year: "2015", price: "450\u00A0kr" },
		{ name: "Cadillac Escalade", year: "1999", price: "500\u00A0kr" },
		{ name: "Kia Carens", year: "2022", price: "400\u00A0kr" },
		{ name: "Kia Soul", year: "2020", price: "400\u00A0kr" },
		{ name: "Mitsubishi Outlander", year: "2018", price: "450\u00A0kr" },
		{ name: "Renault Kadjar", year: "2020", price: "250\u00A0kr" },
		{ name: "Subaru Outback", year: "2020", price: "300\u00A0kr" },
		{ name: "Volvo XC40", year: "2018", price: "800\u00A0kr" },
		{ name: "VW Polo", year: "2022", price: "300\u00A0kr" },
	];
	const tableBody = document.getElementById("carList");

	cars.forEach(function (car) {
		const row = document.createElement("tr");
		const nameCell = document.createElement("td");
		const yearCell = document.createElement("td");
		const priceCell = document.createElement("td");

		nameCell.textContent = car.name;
		yearCell.textContent = car.year;
		priceCell.textContent = car.price;

		row.appendChild(nameCell);
		row.appendChild(yearCell);
		row.appendChild(priceCell);

		tableBody.appendChild(row);
	});
});

function isDateClosed(month, day) {

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
		return day + additionalDays - 7
	} else {
		return day + additionalDays
	}
}


// look for next open day
function checkNextOpen(month, dayOfMonth, dayOfWeek, element, days, openingHours) {
	let daysTillOpen = 0


	if (dayOfWeek !== 6) { // If not saturday

		// Checks how many days untill next open day
		while (isDateClosed(month, dayOfMonth + daysTillOpen + 1) || getDayWeekLoop(dayOfWeek + daysTillOpen) === 0) {
			daysTillOpen++

		}

		const nextOpenDay = getDayWeekLoop(dayOfWeek, daysTillOpen)

		if (nextOpenDay === 5) { //if friday
			element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${openingHours.saturday.open
				}`;
			storeIsOpen = false;
		} else {
			element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${openingHours.weekdays.open
				}`;
			storeIsOpen = false;
		}

	} else if (isDateClosed(month, dayOfMonth + 2)) { // if next monday is closed
		while (isDateClosed(month, dayOfMonth + daysTillOpen + 1) || getDayWeekLoop(dayOfWeek + daysTillOpen) === 0) {
			daysTillOpen++

		}

		const nextOpenDay = getDayWeekLoop(dayOfWeek, daysTillOpen)

		if (nextOpenDay === 5) {
			element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${openingHours.saturday.open
				}`;
			storeIsOpen = false;
		} else {
			element.innerText = `Öppnar ${days[nextOpenDay + 1]} kl ${openingHours.weekdays.open
				}`;
			storeIsOpen = false;
		}
	}

	else {
		element.innerText = `Öppnar måndag kl ${openingHours.weekdays.open}`;
		storeIsOpen = false;
	}
}

function setLiveOpeningHours(date) {
	const hour = date.getHours();
	const dayOfWeek = date.getDay(); // Gets day of week
	const dayOfMonth = date.getDate()
	const month = date.getMonth();
	const minute = date.getMinutes();
	const element = document.getElementById("storeState");
	let storeIsOpen = true;
	const rightNowSpan = document.createElement("span");
	const openSpan = document.createElement("span");


	const openingHours = {
		weekdays: { open: 10, close: 16 },
		saturday: { open: 12, close: 15 },
	};

	const days = [
		"Nan",
		"måndag",
		"tisdag",
		"onsdag",
		"torsdag",
		"fredag",
		"lördag",
	];

	if (isDateClosed(month, dayOfMonth)) {
		checkNextOpen(month, dayOfMonth, dayOfWeek, element, days, openingHours)
	}

	//If weekday
	else if (dayOfWeek < 6 && dayOfWeek > 0) {
		if (hour === openingHours.weekdays.open - 1 && minute >= 30) {
			//30 min before opening
			element.innerText = `Öppnar om ${60 - minute} minuter`;
			storeIsOpen = false;
		} else if (hour === openingHours.weekdays.close - 1 && minute >= 45) {
			//15 min before closing
			element.innerText = `Stänger snart`;
			storeIsOpen = true;
		} else if (
			hour >= openingHours.weekdays.open &&
			hour < openingHours.weekdays.close
		) {
			rightNowSpan.innerText = "Just nu: ";
			rightNowSpan.style.color = "black";

			openSpan.innerText = "Öppet";
			openSpan.style.color = "green";

			element.innerHTML = "";

			element.appendChild(rightNowSpan);
			element.appendChild(openSpan);
			storeIsOpen = true;
		} else if (hour < openingHours.weekdays.open) {
			element.innerText = `Öppnar idag kl ${openingHours.weekdays.open}`;
		} else {
			checkNextOpen(month, dayOfMonth, dayOfWeek, element, days, openingHours)
		}
	} //Saturday
	else if (dayOfWeek == 6) {
		if (hour === openingHours.saturday.open - 1 && minute >= 30) {
			element.innerText = `Öppnar om ${60 - minute} minuter`;
			storeIsOpen = false;
		} else if (hour === openingHours.saturday.close - 1 && minute >= 45) {
			element.innerText = `Stänger snart`;
			storeIsOpen = true;
		} else if (
			hour >= openingHours.saturday.open &&
			hour < openingHours.saturday.close
		) {
			rightNowSpan.innerText = "Just nu: ";
			rightNowSpan.style.color = "black";

			openSpan.innerText = "Öppet";
			openSpan.style.color = "green";

			element.innerHTML = "";

			element.appendChild(rightNowSpan);
			element.appendChild(openSpan);
			storeIsOpen = true;
		} else if (hour < openingHours.saturday.open) {
			element.innerText = `Öppnar idag kl ${openingHours.saturday.open}`;
			storeIsOpen = false;
		} else {
			checkNextOpen(month, dayOfMonth, dayOfWeek, element, days, openingHours)
		}
	} //Sunday
	else if (dayOfWeek == 0) {
		checkNextOpen(month, dayOfMonth, dayOfWeek, element, days, openingHours)
	}

	liveStoreStateHeader(storeIsOpen);
}

function liveStoreStateHeader(storeIsOpen) {
	const storeOpenElements = document.getElementsByClassName("storeOpen");
	const storeClosedElements = document.getElementsByClassName("storeClosed");

	if (storeIsOpen === false) {
		for (const element of storeClosedElements) {
			element.setAttribute("id", "storeClosed");
		}

		for (const element of storeOpenElements) {
			element.removeAttribute("id");
		}
	} else {
		for (const element of storeOpenElements) {
			element.setAttribute("id", "storeOpen");
		}

		for (const element of storeClosedElements) {
			element.removeAttribute("id");
		}
	}
}

function scrollToInfo() {
	setTimeout(() => {
		document.getElementById("openingHours").scrollIntoView();
	}, 500);
}

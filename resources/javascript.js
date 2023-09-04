const date = new Date();
function setLiveOpeningHours(date) {
  const hour = date.getHours();
  const day = date.getDay();

  //If weekday
  if (day < 6) {
    if (hour >= 10 && hour < 16) {
      storeOpen();
    } else {
      storeClosed();
    }
  } //Saturday
  else if (day == 6) {
    if (hour >= 12 && hour < 15) {
      storeOpen();
    } else {
      storeClosed();
    }
  } //Sunday
  else if (day == 7) {
    storeClosed();
  }

  function storeOpen() {
    document.getElementsByClassName("storeState")[0].innerHTML = "Öppet";
    document.getElementsByClassName("storeState")[0].style.color = "green";
  }

  function storeClosed() {
    document.getElementsByClassName("storeState")[0].innerHTML = "Stängt";
    document.getElementsByClassName("storeState")[0].style.color = "red";
  }
}

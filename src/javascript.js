const date = new Date();
const hour = date.getHours()
const day = date.getDay()


if (day < 6){
  if (hour >= 10 && hour < 16){
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByClassName("storeState")[0].innerHTML = "Just nu har vi Öppet";
    });
  }
  else{
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByClassName("storeState")[0].innerHTML = "Just nu har vi Stängt";
    });
  }
}
else if (day == 6){
  if (hour >= 10 && hour < 15){
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByClassName("storeState")[0].innerHTML = "Just nu har vi Öppet";
    });
  }
  else{
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByClassName("storeState")[0].innerHTML = "Just nu har vi Stängt";
    });
  }
}
else if (day == 7){
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName("storeState")[0].innerHTML = "Just nu har vi Stängt";
  });
}
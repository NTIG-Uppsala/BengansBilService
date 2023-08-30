var slideIndex = 1;

const images = ["images/bild1.jpg","images/bild3.jpg", "images/bild2.jpg"];

function changebackGround(test) {

  slideIndex += test

  const backgroundElements = document.getElementsByClassName("backgroundPictures");


  if (slideIndex >= 0 && slideIndex - test < images.length && slideIndex < 3) {
    backgroundElements[0].style.backgroundImage = `url(${images[slideIndex]})`;
    timer = 5000;
  }
  else if(slideIndex < 0){
    slideIndex = 2
    backgroundElements[0].style.backgroundImage = `url(${images[slideIndex]})`;
    timer = 5000;

  }
  else if(slideIndex > 2){
    slideIndex = 0
    backgroundElements[0].style.backgroundImage = `url(${images[slideIndex]})`;
    timer = 5000;


  }
}

setTimeout(()=>{
  console.log("test")
},3000)

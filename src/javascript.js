var slideIndex = 1;


const images = ["../images/bild1.jpg","../images/bild2.jpg","../images/bild3 (1).jpg"]

function changebackGround(test){
  const element = document.getElementsByClassName("backgroundPictures");
  element.document.body.style.backgroundImage = url(images[slideIndex - test])
}
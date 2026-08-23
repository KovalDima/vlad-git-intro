console.log("Hello world!");

function createSlider() {
  const container = document.getElementById("container");
  const slides = container.getElementsByClassName("slide");
  let currentIndex = 0;

  function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

document.addEventListener("DOMContentLoaded", createSlider);

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

document.getElementById("menuButton").addEventListener("click", toggleMenu);
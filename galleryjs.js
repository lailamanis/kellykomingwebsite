const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentIndex = 0;

// Dynamically create dots based on slides
const dotsContainer = document.createElement('div');
dotsContainer.classList.add('dots-container');
document.querySelector('.carousel-container').appendChild(dotsContainer);

// Generate dots dynamically
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
}

// Select the dots now that they exist
const dots = document.querySelectorAll('.dot');
dots[currentIndex].classList.add('active'); // Set first dot as active

// Function to move to the next slide
function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

// Function to move to the previous slide
function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Function to update the carousel position and dots
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
}

// Update dot indicator
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Add click event to dots
dots.forEach((dot) => {
    dot.addEventListener('click', function () {
        currentIndex = parseInt(this.dataset.index);
        updateCarousel();
    });
});

// AutoPlay Feature
let autoPlay = setInterval(moveToNextSlide, 3000);

// Pause autoplay on hover
document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(autoPlay));
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoPlay = setInterval(moveToNextSlide, 3000);
});

// Button Controls
document.querySelector('.next').addEventListener('click', moveToNextSlide);
document.querySelector('.prev').addEventListener('click', moveToPrevSlide);

// Remove dots if only one slide
if (totalSlides <= 1) {
    dotsContainer.style.display = 'none';
}

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

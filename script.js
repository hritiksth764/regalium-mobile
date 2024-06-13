var desktopSite = "https://regalium.vercel.app";
var mobileSite = "https://regalium-mobile.vercel.app";

// Detect device and redirect accordingly
function detectDevice() {
  if (window.innerWidth <= 768) {
    if (window.location.href.includes(desktopSite)) {
      window.location.href = mobileSite;
    }
  } else {
    if (window.location.href.includes(mobileSite)) {
      window.location.href = desktopSite;
    }
  }
}

// Call the function when the script loads
detectDevice();

// Handle resize or device rotation
window.addEventListener("resize", detectDevice);

// Document Ready: Handle immediate DOM-dependent setups
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  document.body.classList.add("fade-in");

  // Restore the scroll position
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
    sessionStorage.removeItem("scrollPosition");
  }

  // Add click event listeners for slides
  document.querySelectorAll(".slide").forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
      // Check if the click was on the "learn more" link and prevent bubbling
      if (!event.target.closest(".learn-more")) {
        openSliderCard(index);
      }
    });
  });

  // Close the popup when clicking outside the content
  overlay.addEventListener("click", (event) => {
    if (!event.target.closest(".slider-content")) {
      closeSliderCard();
    }
  });
});

let currentIndex = 0;
const sliderPopup = document.getElementById("slider-popup");
const sliderItems = document.querySelectorAll(".slider-item");
const overlay = document.getElementById("overlaypopup");

function openSliderCard(index) {
  currentIndex = index;
  sliderPopup.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("slider-active");
  updateSlider();
}

function closeSliderCard() {
  sliderPopup.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("slider-active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % sliderItems.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
  updateSlider();
}

function updateSlider() {
  const offset = -currentIndex * 100;
  sliderItems.forEach((item) => {
    item.style.transform = `translateX(${offset}%)`;
  });
}

// Assuming smoothTransition is used for navigating away
function smoothTransition(url) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "100%";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "white";
  overlay.style.zIndex = "9999";
  overlay.style.transition = "left 1s";
  overlay.style.left = "0";

  setTimeout(() => {
    window.location.href = url;
  }, 1000); // Duration should match the transition duration
}

function smoothtransition(url) {
  sessionStorage.setItem("scrollPosition", window.scrollY);
  window.location.href = url;
}

function toggleMenu() {
  document.querySelector(".overlay").classList.toggle("active");
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = event.target.nextElementSibling;
  dropdown.classList.toggle("show");
}

function toggleProvenance() {
  var provenanceMenu = document.getElementById("provenance-menu");
  provenanceMenu.style.display =
    provenanceMenu.style.display === "block" ? "none" : "block";
}

function scrollToSectionAndCloseOverlay(sectionId, overlayId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  document.getElementById(overlayId).classList.remove("active");
}

let scrollDetected = false;

window.addEventListener("scroll", function () {
  if (!scrollDetected) {
    document.querySelector(".unlock-box").style.opacity = "1";
    document.querySelector(".unlock-box").style.visibility = "visible";
    scrollDetected = true; // Ensure this runs only once
  }
});

function toggleText(event, element) {
  // Prevent the event from bubbling up to parent elements
  event.stopPropagation();

  const imageText = element.closest(".image-text");
  const shortText = imageText.querySelector(".short-text");
  const longText = imageText.querySelector(".long-text");

  if (shortText.style.display === "none") {
    shortText.style.display = "block";
    longText.style.display = "none";
  } else {
    shortText.style.display = "none";
    longText.style.display = "block";
  }
}

var currentImageIndex;
var images = [
  "blueprints/OverviewMain.png",
  "blueprints/image.png",
  "blueprints/image copy.png",
  "blueprints/image.png",
  // Add more image sources as needed
];

function openModal(src, index) {
  currentImageIndex = index;
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

function changeImage(n) {
  currentImageIndex = (currentImageIndex + n + images.length) % images.length;
  document.getElementById("modalImage").src = images[currentImageIndex];
}

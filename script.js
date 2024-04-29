function toggleMenu() {
  var menuIcon = document.querySelector(".menu-icon");
  var overlay = document.getElementById("overlay");

  // Toggle the appearance of the overlay and the menu icon
  if (overlay.style.display === "block") {
    overlay.style.display = "none";
    menuIcon.classList.remove("toggle");
  } else {
    overlay.style.display = "block";
    menuIcon.classList.add("toggle");
  }
}

function toggleProvenance() {
  var provenanceMenu = document.getElementById("provenance-menu");
  provenanceMenu.style.display =
    provenanceMenu.style.display === "block" ? "none" : "block";
}
// Track the last scroll position
let scrollDetected = false;

window.addEventListener("scroll", function () {
  if (!scrollDetected) {
    document.querySelector(".unlock-box").style.opacity = "1";
    document.querySelector(".unlock-box").style.visibility = "visible";
    scrollDetected = true; // Ensure this runs only once
  }
});

var desktopSite = "https://regalium.vercel.app";
var mobileSite = "https://regalium-mobile.vercel.app";

// Function to detect the device and redirect accordingly
function detectDevice() {
  // Check if the screen width is less than or equal to 768 pixels
  if (window.innerWidth <= 768) {
    // If on a desktop site and the screen is that of a mobile device, redirect to the mobile site
    if (window.location.href.includes(desktopSite)) {
      window.location.href = mobileSite;
    }
  } else {
    // If on a mobile site and the screen is that of a desktop, redirect to the desktop site
    if (window.location.href.includes(mobileSite)) {
      window.location.href = desktopSite;
    }
  }
}

// Call the function when the script loads
detectDevice();

// Optionally, to handle cases where the user resizes the window or rotates their mobile device:
window.addEventListener("resize", detectDevice);

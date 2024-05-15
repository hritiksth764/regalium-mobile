// Document Ready: Handle immediate DOM-dependent setups
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  document.body.classList.add("fade-in");
});

// Full Page Load: Adjust actions that depend on all resources being loaded
window.addEventListener("load", function () {
  console.log("All resources finished loading");

  // Set navigating flag when navigating to experience.html
  var linksToExperience = document.querySelectorAll(".experience-link");
  linksToExperience.forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("navigatingToExperience", "true");
    });
  });

  // Only reset to top if not coming back from an experience navigation
  if (!localStorage.getItem("navigatingToExperience")) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
});

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

// Page Show: Used for restoring scroll position correctly when coming back from another page
window.addEventListener("pageshow", function (event) {
  console.log("Page show event triggered:", event.persisted);
  document.body.style.opacity = "1";

  // Add a mobile-specific condition to check event.persisted to handle caching issues
  if (localStorage.getItem("navigatingToExperience") && event.persisted) {
    const savedPosition = parseInt(
      localStorage.getItem("scrollPosition") || 0,
      10
    );
    console.log("Restoring scroll position to:", savedPosition);

    setTimeout(() => {
      window.scrollTo(0, savedPosition);
      console.log("Scroll restoration complete on mobile.");
      localStorage.removeItem("scrollPosition");
      localStorage.removeItem("navigatingToExperience");
    }, 300); // Increased timeout for mobile
  }
});

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

var desktopSite = "https://regalium.vercel.app";
var mobileSite = "https://regalium-mobile.vercel.app";

// Document Ready: Handle immediate DOM-dependent setups

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  document.body.classList.add("fade-in");
});

// Full Page Load: Adjust actions that depend on all resources being loaded
// window.addEventListener("load", function () {
//   console.log("All resources finished loading");

//   // Set navigating flag when navigating to experience.html
//   var linksToExperience = document.querySelectorAll(".experience-link");
//   linksToExperience.forEach((link) => {
//     link.addEventListener("click", () => {
//       localStorage.setItem("navigatingToExperience", "true");
//     });
//   });

//   // Only reset to top if not coming back from an experience navigation
//   if (!localStorage.getItem("navigatingToExperience")) {
//     setTimeout(() => {
//       window.scrollTo(0, 0);
//     }, 100);
//   }
// });

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
// window.addEventListener("pageshow", function (event) {
//   console.log("Page show event triggered:", event.persisted);
//   document.body.style.opacity = "1";

//   // Add a mobile-specific condition to check event.persisted to handle caching issues
//   if (localStorage.getItem("navigatingToExperience") && event.persisted) {
//     const savedPosition = parseInt(
//       localStorage.getItem("scrollPosition") || 0,
//       10
//     );
//     console.log("Restoring scroll position to:", savedPosition);

//     setTimeout(() => {
//       window.scrollTo(0, savedPosition);
//       console.log("Scroll restoration complete on mobile.");
//       localStorage.removeItem("scrollPosition");
//       localStorage.removeItem("navigatingToExperience");
//     }, 300); // Increased timeout for mobile
//   }
// });

function smoothtransition(url) {
  // Save the scroll position
  sessionStorage.setItem("scrollPosition", window.scrollY);

  // Navigate to the new page
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  // Restore the scroll position
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
    sessionStorage.removeItem("scrollPosition");
  }
});

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
  // Scroll to the section
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });

  // Close the overlay
  document.getElementById(overlayId).classList.remove("active");
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

function toggleText(element) {
  const imageText = element.closest(".image-text");
  const shortText = imageText.querySelector(".short-text");
  const longText = imageText.querySelector(".long-text");
  const isExpanded = longText.classList.contains("expanded");

  if (isExpanded) {
    longText.classList.remove("expanded");
    setTimeout(() => {
      longText.style.display = "none";
      shortText.style.display = "block";
    }, 500); // Match the duration of the transition
  } else {
    shortText.style.display = "none";
    longText.style.display = "block";
    setTimeout(() => {
      longText.classList.add("expanded");
    }, 10); // Slight delay to trigger transition
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

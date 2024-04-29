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

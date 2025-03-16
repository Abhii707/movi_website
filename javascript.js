// Function to move the image card to the right
function moveImage(card) {
  card.style.transform = "translateX(100px)"; // Moves the card to the right
  card.style.transition = "transform 0.5s ease-in-out"; // Smooth transition effect
}

// Add hover, click, and double-click effects
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".image-card img");

  // Scale up the image on hover
  cards.forEach((image) => {
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.2)"; // Zoom in
      image.style.transition = "transform 0.3s ease"; // Smooth zoom effect
      image.style.filter = "brightness(1.2)"; // Brighten the image
    });

    // Reset scale and brightness on mouse leave
    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)"; // Reset zoom
      image.style.filter = "brightness(1)"; // Reset brightness
    });

    // Rotate the image on click
    image.addEventListener("click", () => {
      image.style.transform = "rotate(360deg) scale(1.2)"; // Full rotation with zoom
      image.style.transition = "transform 0.8s ease-in-out"; // Smooth rotation effect

      // Reset rotation and scale after 1 second
      setTimeout(() => {
        image.style.transform = "scale(1)";
      }, 1000);
    });

    // Add a bounce effect on double-click
    image.addEventListener("dblclick", () => {
      image.style.transform = "translateY(-20px)"; // Move up slightly
      image.style.transition = "transform 0.2s ease"; // Smooth transition

      // Bounce back down
      setTimeout(() => {
        image.style.transform = "translateY(0)";
      }, 200);
    });

    // Add a blur effect on right-click (context menu)
    image.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Prevent default context menu
      image.style.filter = "blur(5px)"; // Apply blur
      image.style.transition = "filter 0.5s ease"; // Smooth blur effect

      // Reset blur after 1 second
      setTimeout(() => {
        image.style.filter = "none";
      }, 1000);
    });
  });
});


// Filter movies based on search input
function filterMovies() {
  const searchBar = document.getElementById("searchBar").value.toLowerCase();
  const movies = document.querySelectorAll(".image-card");

  movies.forEach((movie) => {
    const title = movie.querySelector("img").alt.toLowerCase();
    movie.style.display = title.includes(searchBar) ? "block" : "none";
  });
}

// Toggle dark and light mode
function toggleTheme() {
  const body = document.body;
  const toggleButton = document.getElementById("themeToggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Toggle Light Mode";
    localStorage.setItem("theme", "dark"); // Persist dark mode preference
  } else {
    toggleButton.textContent = "Toggle Dark Mode";
    localStorage.setItem("theme", "light"); // Persist light mode preference
  }
}

// Apply saved theme preference on load
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = "Toggle Light Mode";
  }
}

// Submit profile form
function submitProfile() {
  alert("Profile submitted successfully!");
  document.getElementById("overlay").style.display = "none";
  document.getElementById("profileForm").style.display = "none";
}

// Initialize slideshow
function startSlideshow() {
  const slideshowImages = ["Animal.jpg", "pushpa 2.jpg", "Bawaal.jpeg"];
  let currentImageIndex = 0;
  const slideshowImage = document.getElementById("slideshowImage");

  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
    slideshowImage.src = slideshowImages[currentImageIndex];
  }, 3000);
}

// Display current date in the footer
function displayDate() {
  const footerText = document.getElementById("footerText");
  const today = new Date();
  footerText.textContent = `Thank you for visiting - ${today.toDateString()}`;
}

// Toggle profile form visibility
function toggleProfileForm() {
  const overlay = document.getElementById("overlay");
  const profileForm = document.getElementById("profileForm");

  const isVisible = overlay.style.display === "block";
  overlay.style.display = isVisible ? "none" : "block";
  profileForm.style.display = isVisible ? "none" : "block";
}

// Close profile form when clicking on the overlay
function closeProfileForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("profileForm").style.display = "none";
}

// Initialize voice search functionality
function initializeVoiceSearch() {
  const voiceSearchButton = document.getElementById("voiceSearchButton");
  const searchBar = document.getElementById("searchBar");
  const micClickSound = document.getElementById("micClickSound");

  // Check for browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice search is not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  voiceSearchButton.addEventListener("click", () => {
    // Add visual and audio feedback
    micClickSound.currentTime = 0;
    micClickSound.play();

    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    searchBar.value = transcript;
    filterMovies(); // Trigger filtering based on voice input
  });

  recognition.addEventListener("error", (event) => {
    console.error("Voice recognition error:", event.error);
  });
}

// Add event listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("profileButton").addEventListener("click", toggleProfileForm);
  document.getElementById("overlay").addEventListener("click", closeProfileForm);
  
  applySavedTheme(); // Apply saved theme preference
  displayDate(); // Show current date
  startSlideshow(); // Start the slideshow
  initializeVoiceSearch(); // Set up voice search
});




// Filter movies based on search input
function filterMovies() {
  const searchBar = document.getElementById("searchBar").value.toLowerCase();
  const movies = document.querySelectorAll(".image-card");

  movies.forEach((movie) => {
    const title = movie.querySelector("img").alt.toLowerCase();
    movie.style.display = title.includes(searchBar) ? "block" : "none";
  });
}

// Initialize voice search functionality
function initializeVoiceSearch() {
  const voiceSearchButton = document.getElementById("voiceSearchButton");
  const searchBar = document.getElementById("searchBar");
  const micClickSound = document.getElementById("micClickSound");

  // Check for browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice search is not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  // Event listener for clicking the microphone button
  voiceSearchButton.addEventListener("click", () => {
    // Play sound effect
    micClickSound.currentTime = 0; // Reset the sound
    micClickSound.play();

    // Create a glowing effect at the center
    const colorEffect = document.createElement("div");
    colorEffect.classList.add("center-color-effect");
    document.body.appendChild(colorEffect);

    // Remove the color effect after 1 second
    setTimeout(() => {
      colorEffect.remove();
    }, 1000);

    // Start voice recognition
    recognition.start();
  });

  // When voice recognition captures results
  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript; // Get recognized speech
    searchBar.value = transcript; // Set speech as search query
    filterMovies(); // Filter movies based on recognized input
  });

  // Log when voice recognition starts
  recognition.addEventListener("start", () => {
    console.log("Voice recognition started. Speak into the microphone.");
  });

  // Log when voice recognition ends
  recognition.addEventListener("end", () => {
    console.log("Voice recognition ended.");
  });

  // Handle errors during voice recognition
  recognition.addEventListener("error", (event) => {
    console.error("Voice recognition error:", event.error);
  });
}

// Add event listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initializeVoiceSearch();
});























// Move image to the right (if needed)
function moveImage(card) {
  card.style.transform = "translateX(100px)";
  card.style.transition = "transform 0.5s ease-in-out";
}

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
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "Toggle Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// Apply saved theme preference
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = "Toggle Light Mode";
  }
}

// Toggle profile form visibility
function toggleProfileForm() {
  const overlay = document.getElementById("overlay");
  const profileForm = document.getElementById("userForm");

  const isVisible = overlay.style.display === "block";
  overlay.style.display = isVisible ? "none" : "block";
  profileForm.style.display = isVisible ? "none" : "block";
}

// Close form when clicking overlay
function closeProfileForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("userForm").style.display = "none";
}

// Handle form submission
function setupFormSubmission() {
  const form = document.getElementById("userForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        alert(result.message || "Form submitted successfully!");
        form.reset();
        closeProfileForm();
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("Submission failed");
      }
    });
  }
}

// Voice Search
function initializeVoiceSearch() {
  const voiceSearchButton = document.getElementById("voiceSearchButton");
  const searchBar = document.getElementById("searchBar");
  const micClickSound = document.getElementById("micClickSound");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice search is not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  voiceSearchButton.addEventListener("click", () => {
    micClickSound.currentTime = 0;
    micClickSound.play();

    // Optional glowing effect
    const colorEffect = document.createElement("div");
    colorEffect.classList.add("center-color-effect");
    document.body.appendChild(colorEffect);

    setTimeout(() => {
      colorEffect.remove();
    }, 1000);

    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    searchBar.value = transcript;
    filterMovies();
  });

  recognition.addEventListener("error", (event) => {
    console.error("Voice recognition error:", event.error);
  });
}

// Image interactions
function setupImageEffects() {
  const cards = document.querySelectorAll(".image-card img");

  cards.forEach((image) => {
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.2)";
      image.style.transition = "transform 0.3s ease";
      image.style.filter = "brightness(1.2)";
    });

    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
      image.style.filter = "brightness(1)";
    });

    image.addEventListener("click", () => {
      image.style.transform = "rotate(360deg) scale(1.2)";
      image.style.transition = "transform 0.8s ease-in-out";
      setTimeout(() => {
        image.style.transform = "scale(1)";
      }, 1000);
    });

    image.addEventListener("dblclick", () => {
      image.style.transform = "translateY(-20px)";
      image.style.transition = "transform 0.2s ease";
      setTimeout(() => {
        image.style.transform = "translateY(0)";
      }, 200);
    });

    image.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      image.style.filter = "blur(5px)";
      image.style.transition = "filter 0.5s ease";
      setTimeout(() => {
        image.style.filter = "none";
      }, 1000);
    });
  });
}

// Slideshow
function startSlideshow() {
  const slideshowImages = ["Animal.jpg", "pushpa 2.jpg", "Bawaal.jpeg"];
  let currentImageIndex = 0;
  const slideshowImage = document.getElementById("slideshowImage");

  if (!slideshowImage) return;

  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
    slideshowImage.src = slideshowImages[currentImageIndex];
  }, 3000);
}

// Display today's date
function displayDate() {
  const footerText = document.getElementById("footerText");
  const today = new Date();
  if (footerText) {
    footerText.textContent = `Thank you for visiting - ${today.toDateString()}`;
  }
}

// DOMContentLoaded - main initializer
document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  displayDate();
  startSlideshow();
  setupFormSubmission();
  initializeVoiceSearch();
  setupImageEffects();

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document
    .getElementById("profileButton")
    .addEventListener("click", toggleProfileForm);
  document
    .getElementById("overlay")
    .addEventListener("click", closeProfileForm);
});

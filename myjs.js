document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prevImage");
    const nextBtn = document.getElementById("nextImage");

    let currentIndex = 0;
    const images = Array.from(document.querySelectorAll(".thumbnail"));

    // Open modal with a specific image
    function openModal(index) {
        currentIndex = index;
        const thumbnail = images[currentIndex];
        modal.style.display = "block";
        modalImg.src = thumbnail.getAttribute("data-full");
        captionText.textContent = thumbnail.alt;
    }

    // Show the next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Wrap to the beginning
        openModal(currentIndex);
    }

    // Show the previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap to the end
        openModal(currentIndex);
    }

    // Attach click events to thumbnails
    images.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
            openModal(index);
        });
    });

    // Close the modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Navigate images
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
        if (modal.style.display === "block") {
            if (e.key === "ArrowRight") {
                showNextImage();
            } else if (e.key === "ArrowLeft") {
                showPrevImage();
            } else if (e.key === "Escape") {
                modal.style.display = "none";
            }
        }
    });
});

//FAQ

document.addEventListener("DOMContentLoaded", function () {
    const faqToggles = document.querySelectorAll(".faq-toggle");

    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const faqContent = this.nextElementSibling;

            // Toggle visibility
            if (faqContent.style.display === "block") {
                faqContent.style.display = "none";
            } else {
                faqContent.style.display = "block";
            }

            // Optional: Change button appearance
            this.classList.toggle("active");
        });
    });
});

//Theme switch 
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", savedTheme);

    // Update toggle state based on saved theme
    themeToggle.checked = savedTheme === "dark";

    // Event listener for toggling themes
    themeToggle.addEventListener("change", function () {
        const newTheme = this.checked ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
});



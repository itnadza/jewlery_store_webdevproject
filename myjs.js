
//Interactive Gallery

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prevImage");
    const nextBtn = document.getElementById("nextImage");

    let currentIndex = 0;
    const images = Array.from(document.querySelectorAll(".thumbnail"));


    function openModal(index) {
        currentIndex = index;
        const thumbnail = images[currentIndex];
        modal.style.display = "block";
        modalImg.src = thumbnail.getAttribute("data-full");
        captionText.textContent = thumbnail.alt;
    }

   
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openModal(currentIndex);
    }

   
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; 
        openModal(currentIndex);
    }

  
    images.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
            openModal(index);
        });
    });

  
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

   
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);

   
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

   
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

document.addEventListener("DOMContentLoaded", () => {
    const faqToggles = document.querySelectorAll(".faq-toggle");

    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;

            // Toggle the "active" class for the button
            toggle.classList.toggle("active");

            // Expand or collapse the content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// accordion products 
document.addEventListener("DOMContentLoaded", () => {
    const accordionToggles = document.querySelectorAll(".accordion-toggle");

    accordionToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            // Toggle the "active" class for the button
            toggle.classList.toggle("active");

            // Toggle the corresponding content
            const content = toggle.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse content
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Expand content
            }
        });
    });
});



//Theme switch

const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;


const savedMode = localStorage.getItem('dark-mode');
if (savedMode === 'enabled') {
  body.classList.add('dark-mode');
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    localStorage.setItem('dark-mode', 'disabled');
  }
});


  // NEWSLETTER SIGNUP
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");

    // Password Strength Indicator
    const passwordInput = document.getElementById("password");
    const passwordStrength = document.getElementById("password-strength").querySelector("span");

    passwordInput.addEventListener("input", () => {
        const password = passwordInput.value;
        let strength = "Weak";

        if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
            strength = "Strong";
            passwordStrength.style.color = "green";
        } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
            strength = "Medium";
            passwordStrength.style.color = "orange";
        } else {
            passwordStrength.style.color = "red";
        }

        passwordStrength.textContent = strength;
    });

    // Form Validation
    form.addEventListener("submit", (event) => {
        let isValid = true;

        // Name Validation
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("name-error");
        if (!nameInput.value.trim()) {
            nameError.textContent = "Name is required.";
            nameError.style.display = "block";
            isValid = false;
        } else {
            nameError.style.display = "none";
        }

        // Email Validation
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Enter a valid email address.";
            emailError.style.display = "block";
            isValid = false;
        } else {
            emailError.style.display = "none";
        }

        // Date Validation
        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dob-error");
        if (!dobInput.value) {
            dobError.textContent = "Date of birth is required.";
            dobError.style.display = "block";
            isValid = false;
        } else {
            dobError.style.display = "none";
        }

        // Password Validation
        const passwordError = document.getElementById("password-error");
        if (passwordInput.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long.";
            passwordError.style.display = "block";
            isValid = false;
        } else {
            passwordError.style.display = "none";
        }

        // Prevent form submission if invalid
        if (!isValid) {
            event.preventDefault();
        }
    });
});

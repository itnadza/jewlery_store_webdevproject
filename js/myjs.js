
//INTERACTIVE GALLERY

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

            
            toggle.classList.toggle("active");

           
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// ACCORDION PRODUCTS
document.addEventListener("DOMContentLoaded", () => {
    const accordionToggles = document.querySelectorAll(".accordion-toggle");

    accordionToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            
            toggle.classList.toggle("active");

        
            const content = toggle.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null; 
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; 
            }
        });
    });
});



//DARK MODE

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

    
    form.addEventListener("submit", (event) => {
        let isValid = true;

      
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("name-error");
        if (!nameInput.value.trim()) {
            nameError.textContent = "Name is required.";
            nameError.style.display = "block";
            isValid = false;
        } else {
            nameError.style.display = "none";
        }

      
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

        
        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dob-error");
        if (!dobInput.value) {
            dobError.textContent = "Date of birth is required.";
            dobError.style.display = "block";
            isValid = false;
        } else {
            dobError.style.display = "none";
        }

        
        const passwordError = document.getElementById("password-error");
        if (passwordInput.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long.";
            passwordError.style.display = "block";
            isValid = false;
        } else {
            passwordError.style.display = "none";
        }

        
        if (!isValid) {
            event.preventDefault();
        }
    });
});



//WEATHER API 
document.addEventListener("DOMContentLoaded", () => {
    
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right", 
        "timeOut": "3000", 
        "extendedTimeOut": "1000", 
    };

    const form = document.getElementById("weather-form");
    const weatherResult = document.getElementById("weather-result");
    const API_KEY = "e49afa1be78ac63ff71c62ef26057c70"; 

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const city = document.getElementById("city").value.trim();

        if (!city) {
            toastr.error("City name cannot be empty.");
            return;
        }

        weatherResult.innerHTML = ""; 

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error(`City not found or other error (${response.status})`);
            }

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error(error);
            toastr.error(error.message || "Failed to fetch weather data.");
        }
    });

    function displayWeather(data) {
        const { name, main, weather } = data;
        const { temp, humidity } = main;
        const description = weather[0].description;

        weatherResult.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        `;
        toastr.success("Weather data fetched successfully!");
    }
});


//FORM WITH AJAX

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");

    
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const password = document.getElementById("password").value.trim();

        
        const formData = {
            name,
            email,
            dob,
            password
        };

    
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)  
            })

            if (response.ok) {
                
                successMessage.style.display = "block";

                
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000); 

            
                form.reset();
            } else {
                
                throw new Error('Failed to submit data.');
            }
        } catch (error) {
            console.error(error);
            alert('There was an error with your submission. Please try again.');
        }
    });
});


//VIEW MORE

document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const moreText = document.getElementById("moreText");

    
    moreText.style.display = "none";

    
    viewMoreBtn.addEventListener("click", function () {
        if (moreText.style.display === "none") {
            moreText.style.display = "block"; 
            viewMoreBtn.textContent = "- Read Less"; 
        } else {
            moreText.style.display = "none"; 
            viewMoreBtn.textContent = "+ Read More";
        }
    });
});


// JSON RANDOM DATA EDIT DELETE

document.addEventListener("DOMContentLoaded", function () {
    const entitiesTable = document.getElementById("entities-table").getElementsByTagName('tbody')[0];
    const messageDiv = document.getElementById("message");

    
    let entities = [
        { "id": 1, "name": "Nadža Hasanovć", "email": "nadza@gmail.com" },
        { "id": 2, "name": "Angelina Jolie", "email": "angelina@gmail.com" },
        { "id": 3, "name": "Vin Diesel", "email": "vin@gmail.com" }
    ];

    
    loadEntities(entities);

    
    function loadEntities(entities) {
        entitiesTable.innerHTML = ""; 
        entities.forEach(entity => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entity.id}</td>
                <td>${entity.name}</td>
                <td>${entity.email}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEntity(${entity.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteEntity(${entity.id})">Delete</button>
                </td>
            `;
            entitiesTable.appendChild(row);
        });
    }

    
    window.editEntity = function (id) {
        const entity = entities.find(e => e.id === id);
        if (!entity) return;

        const newName = prompt("Edit Name:", entity.name);
        const newEmail = prompt("Edit Email:", entity.email);

        if (newName && newEmail) {
            entity.name = newName;
            entity.email = newEmail;

            
            loadEntities(entities);
            showMessage("Entity updated successfully.", "success");
        } else {
            showMessage("Failed to update entity. Both fields are required.", "error");
        }
    };

    
    window.deleteEntity = function (id) {
        const entityIndex = entities.findIndex(e => e.id === id);

        if (entityIndex !== -1) {
            
            entities.splice(entityIndex, 1);

            
            loadEntities(entities);
            showMessage("Entity deleted successfully.", "success");
        } else {
            showMessage("Entity not found.", "error");
        }
    };

    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = "block";

        
        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
    }
});

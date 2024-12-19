
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

document.addEventListener("DOMContentLoaded", function () {
    const faqToggles = document.querySelectorAll(".faq-toggle");

    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const faqContent = this.nextElementSibling;

            
            if (faqContent.style.display === "block") {
                faqContent.style.display = "none";
            } else {
                faqContent.style.display = "block";
            }

           
            this.classList.toggle("active");
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






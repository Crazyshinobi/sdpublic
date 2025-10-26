window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-wrapper');
    const sticky = navbar.offsetTop;

    if (window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // Start the counter animation
    function startCounterAnimation(counterElement, targetNumber, duration) {
        let currentNumber = 1;
        const incrementTime = Math.floor(duration / targetNumber);

        const incrementCounter = setInterval(() => {
            if (currentNumber < targetNumber) {
                counterElement.textContent = ++currentNumber;
            } else {
                counterElement.textContent = `${targetNumber}+`;
                clearInterval(incrementCounter);
            }
        }, incrementTime);
    }

    // Observe when the counter comes into view
    function observeCounter(counterId, targetNumber, duration) {
        const counterElement = document.getElementById(counterId);

        if (!counterElement) return;
        const statsCard = counterElement.parentElement;

        if (!statsCard) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounterAnimation(counterElement, targetNumber, duration);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(statsCard);
    }

    // Initialize counters
    observeCounter('counter45', 45, 1000);
    observeCounter('counter1000', 1000, 10);

    // Carousel functionality
    const carousel = document.querySelector('#carouselExampleControls');
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', function () {
            const activeItem = document.querySelector('.carousel-item.active');
            const overlayTexts = document.querySelectorAll('.overlay-text');

            overlayTexts.forEach(text => text.classList.remove('active'));
            activeItem.querySelector('.overlay-text').classList.add('active');
        });
    }

    // Load event images dynamically
    const imageContainer = document.getElementById("imageContainer");
    const carouselInner = document.querySelector("#carouselImages .carousel-inner");

    if (imageContainer) {
        const newRow = document.createElement("div");
        newRow.classList.add("row", "my-5");

        for (let i = 1; i <= 28; i++) { // Adjusted loop to include all images
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("img-wrapper", "col-xl-4", "col-lg-4", "col-sm-6");

            const img = document.createElement("img");
            img.src = `../images/event/${i}.jpg`;
            img.alt = `Image ${i}`;
            img.classList.add("img-fluid", "thumbnail");

            // Add click event listener to open modal with the correct image
            img.addEventListener("click", function () {
                // Clear previous carousel items
                carouselInner.innerHTML = '';

                // Create carousel items
                for (let j = 1; j <= 28; j++) {
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add("carousel-item");
                    if (j === i) itemDiv.classList.add("active"); // Set clicked image as active

                    const carouselImg = document.createElement("img");
                    carouselImg.src = `../images/event/${j}.jpg`;
                    carouselImg.alt = `Image ${j}`;
                    carouselImg.classList.add("d-block", "w-100");

                    itemDiv.appendChild(carouselImg);
                    carouselInner.appendChild(itemDiv);
                }

                $('#imageCarousel').modal('show'); // Show the modal
            });

            imageWrapper.appendChild(img);
            newRow.appendChild(imageWrapper);
        }

        // Clear previous content and append new images
        imageContainer.innerHTML = "";
        imageContainer.appendChild(newRow);
    }

});

// Initialize Owl Carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: { items: 1, nav: false },
        721: { items: 2, nav: false },
        1000: { items: 3, nav: false }
    }
});

// assets/js/script.js

console.log("Gagarjal Website custom scripts loaded!");

document.addEventListener('DOMContentLoaded', function() {

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formStatus.innerHTML = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.innerHTML = '<div class="alert alert-danger" role="alert">Please fill in all fields.</div>';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formStatus.innerHTML = '<div class="alert alert-danger" role="alert">Please enter a valid email address.</div>';
                return;
            }

            formStatus.innerHTML = '<div class="alert alert-info" role="alert">Sending your message...</div>';
            setTimeout(() => {
                const success = true;
                if (success) {
                    formStatus.innerHTML = '<div class="alert alert-success" role="alert">Thank you for your message! We will get back to you soon.</div>';
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = '<div class="alert alert-danger" role="alert">There was an error sending your message. Please try again.</div>';
                }
            }, 2000);
        });
    }

    // --- Explicit Carousel Initialization ---
    // This ensures the Bootstrap Carousel component is explicitly initialized via JavaScript
    // with desired options (like interval for auto-cycling).
    const productCarouselElement = document.getElementById('productCarousel');
    if (productCarouselElement) {
        // Initialize new Carousel instance with options
        const productCarousel = new bootstrap.Carousel(productCarouselElement, {
            interval: 3000, // Auto-cycle every 3 seconds (3000 ms)
            ride: false,    // Set to false here because we explicitly call .cycle() below.
                            // If set to 'carousel', it relies on data-bs-ride="carousel" in HTML.
            pause: 'hover', // Pause cycling on mouse hover
            wrap: true      // Continue cycling indefinitely
        });
        console.log("Product Carousel initialized:", productCarousel); // For debugging

        // Explicitly start the carousel cycling after initialization
        // This is a common pattern to ensure auto-cycling if data-bs-ride isn't always reliable.
        productCarousel.cycle();

        // Optional: Add listeners for debugging carousel events (useful for confirming it's trying to slide)
        productCarouselElement.addEventListener('slide.bs.carousel', function () {
            console.log('Carousel is sliding to next item!');
        });
        productCarouselElement.addEventListener('slid.bs.carousel', function () {
            console.log('Carousel has finished sliding to next item!');
        });
    }


    // --- Generic Animation On Scroll ---
    // Selects all elements that should animate into view.
    // This includes the animated water section and any elements with 'animated-fade-in-on-scroll' class
    // (like cards in 'Why Choose Us', founder cards, and the carousel itself).
    const animateOnScrollElements = document.querySelectorAll('.animated-fade-in-on-scroll, .animated-water-section');

    if (animateOnScrollElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                    // Stop observing once the animation has been triggered for this element.
                    // This is good for one-time entrance animations.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Options for the Intersection Observer
            // threshold: 0.2 means the callback will fire when 20% of the target element is visible.
            // Adjust this value to make animations trigger earlier (e.g., 0.1) or later (e.g., 0.5).
            threshold: 0.2
        });

        // Loop through all selected elements and tell the observer to watch each one
        animateOnScrollElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Back to Top Button Logic ---
    // Creates a button dynamically, appends it to the body, and controls its visibility and functionality.
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('btn', 'btn-primary', 'back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Uses Font Awesome icon
    document.body.appendChild(backToTopButton); // Add button to the end of the body

    // Add event listener to window for scroll events
    window.addEventListener('scroll', () => {
        // If the user has scrolled down more than 300 pixels, show the button
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            // Otherwise, hide the button
            backToTopButton.classList.remove('show');
        }
    });

    // Add event listener for when the button is clicked
    backToTopButton.addEventListener('click', () => {
        // Smoothly scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
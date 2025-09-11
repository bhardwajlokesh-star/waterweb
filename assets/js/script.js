

console.log("Gagarjal Website custom scripts loaded!");

document.addEventListener('DOMContentLoaded', function() {

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

    const productCarouselElement = document.getElementById('productCarousel');
    if (productCarouselElement) {
        const productCarousel = new bootstrap.Carousel(productCarouselElement, {
            interval: 3000,
            ride: false,
            pause: 'hover',
            wrap: true
        });
        console.log("Product Carousel initialized:", productCarousel);

        productCarousel.cycle();

        productCarouselElement.addEventListener('slide.bs.carousel', function() {
            console.log('Carousel is sliding to next item!');
        });
        productCarouselElement.addEventListener('slid.bs.carousel', function() {
            console.log('Carousel has finished sliding to next item!');
        });
    }


    const animateOnScrollElements = document.querySelectorAll('.animated-fade-in-on-scroll, .animated-water-section');

    if (animateOnScrollElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        animateOnScrollElements.forEach(element => {
            observer.observe(element);
        });
    }

    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('btn', 'btn-primary', 'back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
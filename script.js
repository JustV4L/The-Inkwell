// Smooth scrolling with adjustable speed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        const scrollDuration = 1000; // Adjust the duration as needed
        const scrollStep = Math.PI / (scrollDuration / 15);
        let count = 0, currPos = window.pageYOffset;

        const scrollInterval = setInterval(() => {
            if (window.pageYOffset !== offsetTop) {
                count = count + 1;
                const newPos = currPos + ((offsetTop - currPos) * Math.cos(count * scrollStep));
                if (newPos >= 0) window.scrollTo(0, newPos);
                currPos = newPos;
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    });
});

// Highlight navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Lazy loading of images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    const options = {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy');
                observer.unobserve(lazyImage);
            }
        });
    }, options);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
});

// Show image when hovering over section description
document.querySelectorAll('.text').forEach(description => {
    const sectionId = description.closest('.section').id;
    const imageId = `img-${sectionId}`;
    const image = document.getElementById(imageId);

    description.addEventListener('mouseenter', () => {
        if (image) {
            image.style.display = 'block';
        }
    });

    description.addEventListener('mouseleave', () => {
        if (image) {
            image.style.display = 'none';
        }
    });
});

// Responsive navigation menu for small screens
function toggleNav() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleNav);

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Mobile Navigation
const menuIcon = document.querySelector('.menu-icon');
const navlist = document.querySelector('.navlist');
const overlay = document.querySelector('.overlay');

if (menuIcon && navlist && overlay) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navlist.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navlist.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navlist a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            navlist.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// About Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.content');

if (tabBtns.length && tabContents.length) {
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            if (tabContents[index]) {
                tabContents[index].classList.add('active');
            }
        });
    });
}

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider && typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.querySelector('.form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (formMessage) {
                    formMessage.textContent = data.message || 'Message sent successfully!';
                    formMessage.className = 'form-message ' + (data.success ? 'success' : 'error');
                    formMessage.style.display = 'block';
                    contactForm.reset();

                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                if (formMessage) {
                    formMessage.textContent = 'Error sending message. Please try again.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';

                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
                console.error('Error:', error);
            });
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        if (emailInput) {
            // Basic email validation
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Please enter a valid email address');
                return;
            }

            // Here you would typically send the email to your server
            // For demonstration, we'll just show a success message
            emailInput.value = '';
            alert('Thank you for subscribing to our newsletter!');
        }
    });
}

// Back to Top Button
const progress = document.getElementById('progress');
const progressValue = document.getElementById('progress-value');

if (progress && progressValue) {
    window.addEventListener('scroll', () => {
        const pos = document.documentElement.scrollTop;
        const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollValue = Math.round((pos * 100) / calcHeight);

        if (pos > 100) {
            progress.style.display = 'grid';
        } else {
            progress.style.display = 'none';
        }

        progress.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        progress.style.background = `conic-gradient(#fff ${scrollValue}%, ${primaryColor} ${scrollValue}%)`;
    });
}

// Active Menu Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navlist a');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animate Skills Progress on Scroll
const skillCards = document.querySelectorAll('.skill-card');

if (skillCards.length && 'IntersectionObserver' in window) {
    function animateSkills() {
        skillCards.forEach(card => {
            const progressCircle = card.querySelector('.progress');
            const percentageElement = card.querySelector('.percentage');

            if (progressCircle && percentageElement) {
                const percentage = parseInt(percentageElement.textContent);
                const circumference = 565;
                const offset = circumference - (percentage / 100) * circumference;

                progressCircle.style.strokeDashoffset = offset;
            }
        });
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => {
        skillsObserver.observe(card);
    });
}

// Initialize AOS Animation
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Rotating Text Animation
const text = document.querySelector(".text p");
if (text) {
    text.innerHTML = text.textContent.split("").map((char, i) =>
        `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
    ).join("");
}
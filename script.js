// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Show success message using SweetAlert2
            Swal.fire({
                title: 'Thank you!',
                text: 'Your message has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
            this.reset();
        });
    }

    // Career cards hover effect
    const careerCards = document.querySelectorAll('.card');
    careerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Navigation menu for mobile
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('nav').appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Assessment quiz functionality
    const startAssessment = document.querySelector('.assessment-container .cta-button');
    if (startAssessment) {
        startAssessment.addEventListener('click', (e) => {
            e.preventDefault();
            showQuiz();
        });
    }
});

// Quiz functionality
function showQuiz() {
    const questions = [
        {
            question: "Which subjects do you enjoy the most?",
            options: ["Science & Math", "Business & Economics", "Arts & Literature", "Technology & Computers"]
        },
        {
            question: "What type of activities do you prefer?",
            options: ["Problem Solving", "Creative Work", "Analysis & Research", "Working with People"]
        },
        {
            question: "What's your preferred work environment?",
            options: ["Laboratory/Technical", "Office Setting", "Creative Studio", "Outdoors"]
        }
    ];

    let currentQuestion = 0;
    const results = [];

    function displayQuestion() {
        Swal.fire({
            title: questions[currentQuestion].question,
            input: 'radio',
            inputOptions: questions[currentQuestion].options.reduce((acc, opt, idx) => {
                acc[idx] = opt;
                return acc;
            }, {}),
            confirmButtonText: currentQuestion < questions.length - 1 ? 'Next' : 'Finish',
            showCancelButton: true,
            cancelButtonText: 'Exit Quiz',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                results.push(result.value);
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    displayQuestion();
                } else {
                    showResults();
                }
            }
        });
    }

    function showResults() {
        // Simple logic to determine career path based on answers
        const paths = {
            science: "Consider pursuing a career in Science & Technology",
            business: "Business & Management might be your calling",
            arts: "Creative & Liberal Arts could be your path",
            tech: "Information Technology & Computer Science seems suitable"
        };

        // Simple analysis based on answers
        const recommendation = paths[Object.keys(paths)[Math.floor(Math.random() * Object.keys(paths).length)]];

        Swal.fire({
            title: 'Assessment Results',
            html: `
                <div class="results-container">
                    <h3>Based on your responses:</h3>
                    <p>${recommendation}</p>
                    <p>Schedule a consultation with our career counselors for detailed guidance!</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Got it!'
        });
    }

    displayQuestion();
}

// Add scroll-to-top button functionality
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-to-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to cards on scroll
const cards = document.querySelectorAll('.card, .resource-item');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});

// Add loading animation to assessment button
const assessmentButton = document.querySelector('.assessment-section .cta-button');
if (assessmentButton) {
    assessmentButton.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.add('loading');
        
        // Simulate loading
        setTimeout(() => {
            this.classList.remove('loading');
            alert('Assessment feature coming soon!');
        }, 1500);
    });
}

// Add hover effect to social media links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}); 
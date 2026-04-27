// NUSC Summer School Website JavaScript

// Update the countdown timer to the event date (May 18, 2026)
document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to - May 18, 2026
    const countdownDate = new Date("May 18, 2026 10:00:00").getTime();
    
    // Update the countdown every 1 second
    const timer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // Calculate days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").innerHTML = formatTime(days);
        document.getElementById("hours").innerHTML = formatTime(hours);
        document.getElementById("minutes").innerHTML = formatTime(minutes);
        document.getElementById("seconds").innerHTML = formatTime(seconds);
        
        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }
    }, 1000);
    
    // Adds a leading zero to numbers less than 10
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // Early bird notice: show days-remaining until 30 April 2026, then hide
    const ebDeadline = new Date("April 30, 2026 23:59:59").getTime();
    const ebNotice = document.getElementById("early-bird-notice");
    if (ebNotice) {
        const msLeft = ebDeadline - Date.now();
        if (msLeft > 0) {
            const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
            const dayWord = daysLeft === 1 ? "day" : "days";
            ebNotice.textContent = `Early bird offer ends 30 April 2026 — ${daysLeft} ${dayWord} left`;
        } else {
            ebNotice.style.display = "none";
        }
    }
    
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeInObserver.observe(element);
    });
});

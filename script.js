/**
 * TARUN N PORTFOLIO - MINIMAL PROFESSIONAL
 * Clean Interactions & Smooth Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollReveal();
    initSkillBars();
    initBackToTop();
    initSmoothScroll();
    initContactForm();
    initTypingEffect();
    initProjectsScroll();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Animate skill progress bars
 */
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 200);
                
                const percentEl = bar.closest('.skill-progress-item').querySelector('.skill-percent');
                if (percentEl) {
                    animateCounter(percentEl, 0, parseInt(width), 1000);
                }
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

/**
 * Counter animation
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            form.reset();
        });
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
    const color = type === 'success' ? '#2563eb' : '#ef4444';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(239, 68, 68, 0.2)'}
        border-radius: 12px;
        padding: 16px 22px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 380px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        color: #0f172a;
        font-weight: 500;
        font-size: 0.95rem;
    `;
    
    const iconEl = notification.querySelector('i');
    iconEl.style.cssText = `color: ${color}; font-size: 1.3rem;`;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

/**
 * Typing effect for hero role
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Python Full Stack Developer',
        'Django & React Developer',
        'Problem Solver',
        'Clean Code Enthusiast'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

/**
 * Projects horizontal scroll with navigation
 */
function initProjectsScroll() {
    const wrapper = document.getElementById('projectsWrapper');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const dots = document.querySelectorAll('.scroll-dot');
    
    if (!wrapper) return;
    
    const cardWidth = 404; // card width + gap
    
    // Button click handlers
    scrollLeftBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            wrapper.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
        });
    });
    
    // Update active dot on scroll
    wrapper.addEventListener('scroll', () => {
        const scrollPos = wrapper.scrollLeft;
        const activeIndex = Math.round(scrollPos / cardWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });
    
    // Mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    
    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });
    
    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });
    
    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });
    
    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
    });
    
    wrapper.style.cursor = 'grab';
}

/**
 * Download resume function
 */
function downloadResume(e) {
    // Check if resume.pdf exists, if not show notification
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    // Show notification that resume is being downloaded
    showNotification('Resume download started!', 'success');

    // If resume.pdf doesn't exist, prevent default and show info
    fetch(href, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                e.preventDefault();
                showNotification('Resume file not found. Please contact me directly!', 'error');
            }
        })
        .catch(() => {
            // File might not exist, but we'll let the browser handle it
            // The notification already showed success, user will see 404 if file doesn't exist
        });
}

// Console greeting
console.log('%c👋 Welcome to Tarun N\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cAspiring Python Full Stack Developer | Open to Opportunities', 'font-size: 14px; color: #64748b;');

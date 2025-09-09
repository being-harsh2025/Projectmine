// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            initializeAnimations();
        }
    });
});

// Initialize Animated Sneaker
function initAnimatedSneaker() {
    const sneakerContainer = document.querySelector('.sneaker-container');
    if (!sneakerContainer) return;

    // Add mouse interaction to the sneaker
    sneakerContainer.addEventListener('mousemove', (e) => {
        const rect = sneakerContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const sneakerShoe = sneakerContainer.querySelector('.sneaker-shoe');
        if (sneakerShoe) {
            sneakerShoe.style.transform = `translateY(-10px) rotateY(${x * 10}deg) rotateX(${y * 5}deg)`;
        }
    });

    sneakerContainer.addEventListener('mouseleave', () => {
        const sneakerShoe = sneakerContainer.querySelector('.sneaker-shoe');
        if (sneakerShoe) {
            sneakerShoe.style.transform = 'translateY(0px) rotateY(0deg) rotateX(0deg)';
        }
    });

    // Add click animation
    sneakerContainer.addEventListener('click', () => {
        const sneakerShoe = sneakerContainer.querySelector('.sneaker-shoe');
        if (sneakerShoe) {
            gsap.to(sneakerShoe, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }
    });

    // Add floating elements animation
    const elements = sneakerContainer.querySelectorAll('.element');
    elements.forEach((element, index) => {
        gsap.to(element, {
            y: -20,
            x: 10,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: targetSection, offsetY: 70 },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Navigation Toggle
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Product Card Animations
function initProductAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Initial state
        gsap.set(card, { 
            opacity: 0, 
            y: 50 
        });

        // Scroll trigger animation
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            }
        });

        // Hover animations
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Stats Counter Animation
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('★');
        const isPlus = finalValue.includes('+');
        
        let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(stat, 
                    { textContent: 0 },
                    {
                        textContent: numericValue,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: function() {
                            const currentValue = Math.floor(this.targets()[0].textContent);
                            if (isPercentage) {
                                stat.textContent = currentValue + '★';
                            } else if (isPlus) {
                                stat.textContent = currentValue + '+';
                            } else {
                                stat.textContent = currentValue;
                            }
                        }
                    }
                );
            }
        });
    });
}

// Parallax Effects
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    gsap.to(heroContent, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// CTA Button Animation
function initCTAAnimation() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            gsap.to(ctaButton, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Scroll to collection
            setTimeout(() => {
                const collectionSection = document.querySelector('#collection');
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: collectionSection, offsetY: 70 },
                    ease: "power2.inOut"
                });
            }, 200);
        });
    }
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate button
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Simulate form submission
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    ScrollTrigger.create({
        start: "top -100",
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === 1) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
    });
}

// Initialize all animations
function initializeAnimations() {
    // Initialize animated sneaker
    initAnimatedSneaker();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize product animations
    initProductAnimations();
    
    // Initialize stats animation
    initStatsAnimation();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize CTA animation
    initCTAAnimation();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize scroll animations for sections
    initSectionAnimations();
}

// Section Animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title, .about-title, .contact-title');
        const sectionContent = section.querySelector('.section-subtitle, .about-description');
        
        if (sectionTitle) {
            gsap.fromTo(sectionTitle, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%"
                    }
                }
            );
        }
        
        if (sectionContent) {
            gsap.fromTo(sectionContent, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%"
                    }
                }
            );
        }
    });
}

// View Details Button Animation
function initViewDetailsButtons() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show product details (you can implement a modal here)
            alert('Product details would open here in a modal!');
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize view details buttons
document.addEventListener('DOMContentLoaded', () => {
    initViewDetailsButtons();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Reinitialize animations if needed
    const sneakerContainer = document.querySelector('.sneaker-container');
    if (sneakerContainer) {
        // Reset any transform styles on resize
        const sneakerShoe = sneakerContainer.querySelector('.sneaker-shoe');
        if (sneakerShoe) {
            sneakerShoe.style.transform = '';
        }
    }
});

// Add some interactive particles in the background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(floatingStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Add smooth reveal animations for elements
function addRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', () => {
    addRevealAnimations();
});

// Add some cool cursor effects
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effects
document.addEventListener('DOMContentLoaded', () => {
    initCursorEffects();
}); 
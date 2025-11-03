// 🌙 Subtle & Refined Interactive JavaScript

// ============================================
// 1. SMOOTH CURSOR TRAIL (Subtle)
// ============================================
const cursorCircles = [];

for (let i = 0; i < 8; i++) {
    const circle = document.createElement('div');
    circle.className = 'cursor-circle';
    circle.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.4}px;
        height: ${8 - i * 0.4}px;
        border-radius: 50%;
        background: ${i % 2 === 0 ? '#7c6fd6' : '#c989b5'};
        pointer-events: none;
        z-index: 9999;
        opacity: ${0.4 - i * 0.04};
        transition: opacity 0.3s;
        will-change: transform;
        mix-blend-mode: screen;
    `;
    circle.x = 0;
    circle.y = 0;
    document.body.appendChild(circle);
    cursorCircles.push(circle);
}

let mouseX = 0, mouseY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let x = mouseX;
    let y = mouseY;

    cursorCircles.forEach((circle, index) => {
        circle.style.left = x - 4 + "px";
        circle.style.top = y - 4 + "px";

        const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;

        circle.x = x;
        circle.y = y;
    });

    requestAnimationFrame(animateCursor);
}

animateCursor();

// ============================================
// 2. SMOOTH PARALLAX
// ============================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        const heroContent = hero.querySelector('.hero-container');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = `${Math.max(0.4, 1 - (scrolled / hero.offsetHeight) * 0.4)}`;
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// 3. SUBTLE PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg,rgb(111, 140, 214),rgb(143, 193, 216), #c989b5);
    background-size: 200% 100%;
    z-index: 10001;
    transition: width 0.15s ease-out;
    box-shadow: 0 0 15px rgba(124, 111, 214, 0.3);
    will-change: width;
    animation: gradient-shift 4s ease-in-out infinite;
`;
document.body.appendChild(progressBar);

if (!document.getElementById('gradient-shift')) {
    const style = document.createElement('style');
    style.id = 'gradient-shift';
    style.textContent = `
        @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);
}

let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// 4. FADE IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fact-card, .project-card, .interest-card, .education-item, .experience-item, .activity-item, .quality-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(el);
});

// ============================================
// 5. ENHANCED NAVBAR
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(13, 13, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(124, 111, 214, 0.15)';
        navbar.style.borderBottom = '1px solid rgba(124, 111, 214, 0.2)';
    } else {
        navbar.style.background = 'rgba(13, 13, 26, 0.90)';
        navbar.style.boxShadow = '0 2px 20px rgba(124, 111, 214, 0.08)';
        navbar.style.borderBottom = '1px solid rgba(100, 80, 200, 0.15)';
    }
});

// ============================================
// 6. SUBTLE MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
    
    btn.style.transition = 'transform 0.3s ease-out';
});

// ============================================
// 7. SUBTLE GLOW ORBS
// ============================================
function createGlowOrbs() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const colors = ['#7c6fd6', '#c989b5', '#9d8fd8'];
    
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        const size = Math.random() * 300 + 200;
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${colors[i % colors.length]}25 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-orb ${Math.random() * 30 + 25}s infinite ease-in-out;
            pointer-events: none;
            filter: blur(70px);
            opacity: 0.5;
            will-change: transform;
        `;
        hero.appendChild(orb);
    }
    
    if (!document.getElementById('float-orb-animation')) {
        const style = document.createElement('style');
        style.id = 'float-orb-animation';
        style.textContent = `
            @keyframes float-orb {
                0%, 100% { 
                    transform: translate(0, 0) scale(1);
                }
                50% { 
                    transform: translate(50px, -80px) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

createGlowOrbs();

// ============================================
// 8. REFINED CARD EFFECTS
// ============================================
document.querySelectorAll('.project-card, .fact-card, .interest-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    card.style.transition = 'transform 0.2s ease-out';
    card.style.willChange = 'transform';
});

// ============================================
// 9. SUBTLE RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(124, 111, 214, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-anim 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

if (!document.getElementById('ripple-anim-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-anim-style';
    style.textContent = `
        @keyframes ripple-anim {
            to { transform: scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 10. ANIMATED COUNTER
// ============================================
function animateCounter(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const value = Math.floor(easeOutQuad * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.textContent);
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');
            statNumber.dataset.suffix = suffix;
            statNumber.dataset.animated = 'true';
            animateCounter(statNumber, 0, targetValue, 2000);
        }
    });
});

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// 11. SECTION REVEAL
// ============================================
document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.8s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    });
    
    titleObserver.observe(title);
});

// ============================================
// 12. SUBTLE BACKGROUND GRID
// ============================================
function createBackgroundGrid() {
    const sections = document.querySelectorAll('.quick-facts, .education-section, .experience-section, .projects-section, .interests-content');
    
    sections.forEach(section => {
        const grid = document.createElement('div');
        grid.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(124, 111, 214, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 111, 214, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            pointer-events: none;
            z-index: 0;
            opacity: 0.5;
            animation: grid-pulse 5s ease-in-out infinite;
        `;
        section.style.position = 'relative';
        section.insertBefore(grid, section.firstChild);
    });
    
    if (!document.getElementById('grid-pulse')) {
        const style = document.createElement('style');
        style.id = 'grid-pulse';
        style.textContent = `
            @keyframes grid-pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
}

createBackgroundGrid();

// ============================================
// 13. HERO STATS ANIMATION
// ============================================
const heroStats = document.querySelectorAll('.stat');
heroStats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        stat.style.transition = 'all 0.6s ease-out';
        stat.style.opacity = '1';
        stat.style.transform = 'translateY(0)';
    }, 800 + (index * 100));
});

// ============================================
// 14. SCROLL DOWN INDICATOR
// ============================================
function createScrollIndicator() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const indicator = document.createElement('div');
    indicator.innerHTML = '↓';
    indicator.style.cssText = `
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 36px;
        color: rgba(255, 255, 255, 0.6);
        animation: bounce 2s infinite;
        cursor: pointer;
        z-index: 100;
        transition: opacity 0.3s ease;
    `;
    
    indicator.addEventListener('click', () => {
        window.scrollTo({
            top: hero.offsetHeight,
            behavior: 'smooth'
        });
    });
    
    hero.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '1';
        }
    });
    
    if (!document.getElementById('bounce-animation')) {
        const style = document.createElement('style');
        style.id = 'bounce-animation';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateX(-50%) translateY(0);
                }
                40% {
                    transform: translateX(-50%) translateY(-15px);
                }
                60% {
                    transform: translateX(-50%) translateY(-8px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

createScrollIndicator();

// ============================================
// 15. SUBTLE CURSOR GLOW
// ============================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124, 111, 214, 0.08), transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.2s ease-out;
    mix-blend-mode: screen;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 75) + 'px';
    cursorGlow.style.top = (e.clientY - 75) + 'px';
});
// ============================================
// 23. RAINBOW BORDER ON ACTIVE ELEMENTS
// ============================================
document.querySelectorAll('.fact-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderImage = 'linear-gradient(45deg, #6366f1, #ec4899, #fbbf24, #10b981) 1';
        this.style.borderWidth = '2px';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderImage = 'none';
        this.style.borderWidth = '1px';
    });
});

// ============================================
// 16. DARK MODE TOGGLE
// ============================================
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌑';
darkModeToggle.setAttribute('aria-label', 'Toggle lighter mode');
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(124, 111, 214, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(124, 111, 214, 0.3);
    font-size: 28px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 4px 20px rgba(124, 111, 214, 0.2);
    transition: all 0.3s ease;
`;
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 25px rgba(124, 111, 214, 0.3)';
});

darkModeToggle.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 20px rgba(124, 111, 214, 0.2)';
});

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('lighter-mode');
    this.innerHTML = document.body.classList.contains('lighter-mode') ? '🌙' : '🌑';
    
    if (!document.getElementById('lighter-mode-styles')) {
        const style = document.createElement('style');
        style.id = 'lighter-mode-styles';
        style.textContent = `
            body.lighter-mode {
                background: #1a1a2e;
                transition: all 0.5s ease;
            }
            body.lighter-mode .navbar {
                background: rgba(26, 26, 46, 0.90) !important;
            }
            body.lighter-mode .fact-card,
            body.lighter-mode .project-card,
            body.lighter-mode .interest-card,
            body.lighter-mode .education-item,
            body.lighter-mode .experience-item,
            body.lighter-mode .activity-item,
            body.lighter-mode .quality-item {
                background: rgba(30, 30, 50, 0.8);
            }
        `;
        document.head.appendChild(style);
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c✨ Refined interactions loaded', 'font-size: 14px; color: #9d8fd8; font-weight: 500;');
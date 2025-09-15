document.addEventListener('DOMContentLoaded', function() {

    let isAnimating = false; 

   
    function pageEntranceAnimation() {
        if (isAnimating) return;
        isAnimating = true;

        const elements = document.querySelectorAll('header, main, footer, .intro-section, .page-content');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.4s cubic-bezier(0.4,0,0.2,1) ${index*0.05}s, transform 0.4s cubic-bezier(0.4,0,0.2,1) ${index*0.05}s`;
        });

        requestAnimationFrame(() => {
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });

        setTimeout(() => { isAnimating = false; }, 500); 
    }

   
    function addNavigationHandlers() {
        const navLinks = document.querySelectorAll('nav a, .btn[href]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (isAnimating) return; 
                    pageEntranceAnimation();
                    setTimeout(() => { window.location.href = href; }, 400);
                });
            }
        });
    }

  
    function addScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.skill-item, .tool-item, .project-item, .project-section');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.3s cubic-bezier(0.4,0,0.2,1) ${index*0.05}s, transform 0.3s cubic-bezier(0.4,0,0.2,1) ${index*0.05}s`;
            observer.observe(el);
        });
    }

   
    function addHoverEffects() {
        const hoverItems = document.querySelectorAll('nav a, .btn, .circle-btn, .project-item, .skill-item, .tool-item');
        hoverItems.forEach(item => {
            item.addEventListener('mouseenter', () => item.style.transform += ' translateY(-2px)');
            item.addEventListener('mouseleave', () => item.style.transform = item.style.transform.replace(' translateY(-2px)',''));
        });
    }

  
    function addTypingAnimation() {
        const homeIntro = document.querySelector('.intro h2');
        if (homeIntro && homeIntro.textContent.includes('Hello')) {
            const text = homeIntro.textContent;
            homeIntro.textContent = '';
            homeIntro.style.opacity = '1';
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    homeIntro.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            setTimeout(typeWriter, 800);
        }
    }

   
    function addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

  
    function addParallaxEffect() {
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.photo img:not(.profile-picture), .intro-section');
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            ticking = false;
        }
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        window.addEventListener('scroll', requestTick);
    }

  
    function initializeAnimations() {
        addNavigationHandlers();
        addHoverEffects();
        addScrollAnimations();
        addSmoothScroll();

        if (document.querySelector('.home')) {
            addTypingAnimation();
            addParallaxEffect();
        }

        pageEntranceAnimation();
    }

    initializeAnimations();

   
    window.addEventListener('popstate', pageEntranceAnimation);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) pageEntranceAnimation(); });

  
    const styles = `
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        nav a, .btn, .circle-btn, .project-item { cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
});
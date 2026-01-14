document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initVideoMute();
    initShowreel();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initParallax();
    init3DScrollEffects();
});

function initHeader() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.header__toggle');
    const navMenu = document.querySelector('.header__nav');
    const navOverlay = document.querySelector('.header__overlay');
    const navLinks = document.querySelectorAll('.header__link');

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }, 50));

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    window.addEventListener('scroll', throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100));
}

function initVideoMute() {
    const heroVideo = document.getElementById('heroVideo');
    const heroMute = document.getElementById('heroMute');

    if (heroVideo && heroMute) {
        setupMuteButton(heroVideo, heroMute);
    }

    const showreelVideo = document.getElementById('showreelVideo');
    const showreelMute = document.getElementById('showreelMute');

    if (showreelVideo && showreelMute) {
        setupMuteButton(showreelVideo, showreelMute);
    }
}

function setupMuteButton(video, button) {
    button.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            button.classList.add('unmuted');
        } else {
            video.muted = true;
            button.classList.remove('unmuted');
        }
    });
}

function initShowreel() {
    const showreelVideo = document.getElementById('showreelVideo');
    const playButton = document.getElementById('showreelPlay');

    if (showreelVideo && playButton) {
        let isPlaying = true;

        playButton.addEventListener('click', () => {
            if (isPlaying) {
                showreelVideo.pause();
                playButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
            } else {
                showreelVideo.play();
                playButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>`;
            }
            isPlaying = !isPlaying;
        });

        showreelVideo.addEventListener('play', () => {
            isPlaying = true;
            playButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>`;
        });

        showreelVideo.addEventListener('pause', () => {
            isPlaying = false;
            playButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        });
    }
}

function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
        return;
    }

    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.aosDelay || 0;

                setTimeout(() => {
                    el.classList.add('aos-animate');
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0, 0)';
                }, delay);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        const animation = el.dataset.aos;
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        switch (animation) {
            case 'fade-up':
                el.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                el.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                el.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                el.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.9)';
                break;
            default:
                el.style.transform = 'translateY(20px)';
        }

        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact__form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.message) {
                const isArabic = document.documentElement.lang === 'ar';
                alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const isArabic = document.documentElement.lang === 'ar';
                alert(isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
                return;
            }

            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = document.documentElement.lang === 'ar' ? 'جاري الإرسال...' : 'Sending...';

            setTimeout(() => {
                const isArabic = document.documentElement.lang === 'ar';
                alert(isArabic ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}

function initParallax() {
    const dividerImage = document.querySelector('.divider__image');

    if (dividerImage && window.innerWidth > 768) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const dividerTop = dividerImage.parentElement.offsetTop;
            const rate = (scrolled - dividerTop) * 0.3;

            if (scrolled > dividerTop - window.innerHeight && scrolled < dividerTop + dividerImage.parentElement.offsetHeight) {
                dividerImage.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }

    function init3DScrollEffects() {
        const targetSelectors = [
            '.about__content',
            '.about__visual',
            '.service-card',
            '.contact__wrapper'
        ];

        const targetElements = document.querySelectorAll(targetSelectors.join(','));

        if (targetElements.length === 0 || window.innerWidth < 768) return;

        targetElements.forEach(el => {
            const wrapper = document.createElement('div');
            wrapper.className = 'js-3d-tilt-wrapper';
            wrapper.style.transition = 'transform 0.1s linear';
            wrapper.style.transformStyle = 'preserve-3d';
            wrapper.style.willChange = 'transform';

            while (el.firstChild) {
                wrapper.appendChild(el.firstChild);
            }

            el.appendChild(wrapper);
            el.style.perspective = '1000px';
            el.style.transformStyle = 'preserve-3d';
        });

        const tiltWrappers = document.querySelectorAll('.js-3d-tilt-wrapper');

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    update3DTransforms(tiltWrappers);
                    ticking = false;
                });
                ticking = true;
            }
        });

        function update3DTransforms(elements) {
            const windowHeight = window.innerHeight;
            const windowCenter = windowHeight / 2;

            elements.forEach(el => {
                const parent = el.parentElement;
                const rect = parent.getBoundingClientRect();
                const elementCenter = rect.top + (rect.height / 2);

                if (rect.top < windowHeight + 50 && rect.bottom > -50) {
                    const distFromCenter = elementCenter - windowCenter;
                    const normalizedDist = distFromCenter / (windowHeight / 2);

                    const rotateX = normalizedDist * 15;

                    el.style.transform = `rotateX(${-rotateX}deg) scale(${1 - Math.abs(normalizedDist) * 0.02})`;
                }
            });
        }
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

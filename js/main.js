

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initMobileMenu();
    initHeaderScroll();
    initHeroVideo();
    initShowreelVideo();
    initContactForm();
    initSmoothScroll();
    initScrollSpy();
});

const initAOS = () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 50
        });
    }
};

const initMobileMenu = () => {
    const toggleBtn = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.header__link');

    if (!toggleBtn || !navMenu || !navOverlay) return;

    const toggleMenu = () => {
        const isActive = toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active', isActive);
        navOverlay.classList.toggle('active', isActive);
        document.body.classList.toggle('no-scroll', isActive);
        toggleBtn.setAttribute('aria-expanded', isActive);
    };

    toggleBtn.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });
};

const initHeaderScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;

    const handleScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
};

const initHeroVideo = () => {
    const video = document.getElementById('heroVideo');
    const muteBtn = document.getElementById('heroMute');

    if (!video || !muteBtn) return;

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.classList.toggle('unmuted', !video.muted);
    });
};

const initShowreelVideo = () => {
    const video = document.getElementById('showreelVideo');
    const playBtn = document.getElementById('showreelPlay');
    const muteBtn = document.getElementById('showreelMute');

    if (!video || !playBtn || !muteBtn) return;

    const ICONS = {
        PLAY: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
        PAUSE: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
    };

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = ICONS.PAUSE;
            playBtn.setAttribute('aria-label', 'Pause Showreel');
        } else {
            video.pause();
            playBtn.innerHTML = ICONS.PLAY;
            playBtn.setAttribute('aria-label', 'Play Showreel');
        }
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.classList.toggle('unmuted', !video.muted);
    });
};

const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');
    const modalBtn = document.getElementById('modalBtn');

    if (!form || !modal) return;

    const toggleModal = (show) => {
        modal.classList.toggle('active', show);
        modal.setAttribute('aria-hidden', !show);
        document.body.classList.toggle('no-scroll', show);
        if (!show) form.reset();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        toggleModal(true);
    });

    [closeBtn, modalBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', () => toggleModal(false));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) toggleModal(false);
    });
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    if (!sections.length || !navLinks.length) return;

    const handleScrollSpy = () => {
        let current = '';
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    handleScrollSpy();
};

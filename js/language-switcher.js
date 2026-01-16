class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('crewmoon-lang') || 'ar';
        this.init();
    }
    init() {
        this.setLanguage(this.currentLang, false);
        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.langSwitch;
                if (lang && lang !== this.currentLang) {
                    localStorage.setItem('crewmoon-lang', lang);
                    window.location.reload();
                }
            });
        });
    }
    setLanguage(lang, animate = true) {
        this.currentLang = lang;
        localStorage.setItem('crewmoon-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langSwitch === lang);
        });
        if (window.AOS) {
            setTimeout(() => {
                window.AOS.refresh();
            }, 100);
        }
        this.updateContent(animate);
    }
    updateContent(animate) {
        const t = translations[this.currentLang];
        if (animate) {
            const heroTitle = document.querySelector('.hero__title');
            if (heroTitle) {
                heroTitle.style.opacity = '0';
                heroTitle.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                }, 150);
            }
        }
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const value = this.getNestedValue(t, key);
            if (value) {
                if (animate) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        this.setElementContent(element, value);
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 150);
                } else {
                    this.setElementContent(element, value);
                }
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const value = this.getNestedValue(t, key);
            if (value) {
                element.placeholder = value;
            }
        });
    }
    setElementContent(element, value) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = value;
        } else {
            element.textContent = value;
        }
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }
    getCurrentLanguage() {
        return this.currentLang;
    }
    toggle() {
        const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLang, true);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.langSwitcher = new LanguageSwitcher();
});


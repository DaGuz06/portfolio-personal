document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'es';
    let currentLang = localStorage.getItem('language') || defaultLang;

    function updateContent(lang) {
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it's an input placeholder or standard text
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update active state of language buttons if they exist
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            if (btn.dataset.lang === lang) {
                btn.classList.add('fw-bold', 'text-primary');
                btn.classList.remove('text-secondary');
            } else {
                btn.classList.remove('fw-bold', 'text-primary');
                btn.classList.add('text-secondary');
            }
        });
    }

    // Initialize
    updateContent(currentLang);

    // Expose function globally if needed, or just attach listeners here
    window.setLanguage = function (lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        updateContent(lang);
    };
});

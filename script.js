console.log("Portfólio - script.js carregado.");

// --- LÓGICA PARA O MENU MOBILE ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- LÓGICA PARA TEMA CLARO/ESCURO COM DEPURACÃO ---
const themeToggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
const sunIcons = document.querySelectorAll('#theme-icon-sun, #theme-icon-sun-mobile');
const moonIcons = document.querySelectorAll('#theme-icon-moon, #theme-icon-moon-mobile');
const htmlElement = document.documentElement;

const applyTheme = (theme) => {
    // Adiciona um log para vermos qual tema está sendo aplicado
    console.log(`Aplicando tema: ${theme}`);
    
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        sunIcons.forEach(icon => icon.classList.remove('hidden'));
        moonIcons.forEach(icon => icon.classList.add('hidden'));
    } else {
        htmlElement.classList.remove('dark');
        sunIcons.forEach(icon => icon.classList.add('hidden'));
        moonIcons.forEach(icon => icon.classList.remove('hidden'));
    }
    // Mostra como as classes da tag <html> ficaram após a mudança
    console.log("Classes atuais na tag <html>:", htmlElement.className);
};

try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    console.log(`Tema inicial definido como: ${initialTheme}. (Salvo: ${savedTheme}, Pref. Sistema: ${prefersDark})`);
    applyTheme(initialTheme);

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Botão de tema clicado!");
            const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            console.log(`Novo tema a ser salvo e aplicado: ${newTheme}`);
            applyTheme(newTheme);
        });
    });
} catch (error) {
    console.error("Ocorreu um erro na lógica do tema:", error);
}


// --- LÓGICA PARA O FORMULÁRIO DE CONTATO ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.classList.remove('hidden');
            isValid = false;
        } else {
            nameError.classList.add('hidden');
        }

        if (!validateEmail(emailInput.value)) {
            emailError.classList.remove('hidden');
            isValid = false;
        } else {
            emailError.classList.add('hidden');
        }

        if (messageInput.value.trim() === '') {
            messageError.classList.remove('hidden');
            isValid = false;
        } else {
            messageError.classList.add('hidden');
        }

        if (isValid) {
            contactForm.reset();
            successModal.classList.remove('hidden');
            setTimeout(() => successModal.classList.remove('opacity-0'), 10);
        }
    });

    if (closeModalButton && successModal) {
        closeModalButton.addEventListener('click', () => {
            successModal.classList.add('opacity-0');
            setTimeout(() => successModal.classList.add('hidden'), 300);
        });
    }
}
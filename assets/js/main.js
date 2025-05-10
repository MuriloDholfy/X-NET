// Menu Mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

mobileMenu.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    
    if (isOpen) {
        navLinks.style.display = 'none';
        navActions.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navActions.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'var(--lighter)';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = 'var(--shadow-md)';
        navLinks.style.gap = '1.5rem';
        
        navActions.style.position = 'absolute';
        navActions.style.top = 'calc(100% + ' + (navLinks.offsetHeight + 32) + 'px)';
        navActions.style.left = '0';
        navActions.style.width = '100%';
        navActions.style.padding = '0 2rem 2rem';
        navActions.style.backgroundColor = 'var(--lighter)';
        navActions.style.flexDirection = 'column';
    }
});

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Fecha o menu mobile se estiver aberto
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Atualiza a classe ativa no menu
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            if (targetId !== '#home') {
                this.classList.add('active');
            }
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Ativar links do menu conforme scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Toggle de planos mensais/anuais
const toggleOptions = document.querySelectorAll('.toggle-option');
const monthlyPrices = document.querySelectorAll('.monthly');
const annualPrices = document.querySelectorAll('.annual');
const planPrices = document.querySelectorAll('.plan-price');
const planDecimals = document.querySelectorAll('.decimal');

toggleOptions.forEach(option => {
    option.addEventListener('click', () => {
        toggleOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const period = option.dataset.period;
        
        if (period === 'monthly') {
            monthlyPrices.forEach(price => price.style.display = 'block');
            annualPrices.forEach(price => price.style.display = 'none');
            
            // Restaura preços mensais
            planPrices[0].innerHTML = '<span class="currency">R$</span>79<span class="decimal">,90</span>';
            planPrices[1].innerHTML = '<span class="currency">R$</span>99<span class="decimal">,90</span>';
            planPrices[2].innerHTML = '<span class="currency">R$</span>129<span class="decimal">,90</span>';
        } else {
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'block');
            
            // Atualiza preços anuais
            planPrices[0].innerHTML = '<span class="currency">R$</span>67<span class="decimal">,90</span>';
            planPrices[1].innerHTML = '<span class="currency">R$</span>84<span class="decimal">,90</span>';
            planPrices[2].innerHTML = '<span class="currency">R$</span>110<span class="decimal">,40</span>';
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Fecha todos os itens primeiro
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
        });
        
        // Abre o item clicado se não estiver ativo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio (substituir por AJAX real)
        setTimeout(() => {
            formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formMessage.classList.add('active', 'success');
            contactForm.reset();
            
            // Limpa a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.classList.remove('active', 'success');
            }, 5000);
        }, 1000);
    });
}

// Verificação de Cobertura
const coverageInput = document.querySelector('.coverage-input');
const coverageButton = document.querySelector('.coverage-button');
const coverageResult = document.querySelector('.coverage-result');

if (coverageButton) {
    coverageButton.addEventListener('click', () => {
        if (coverageInput.value.trim() === '') {
            coverageResult.innerHTML = `
                <div class="result-title">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>Por favor, insira um CEP ou endereço válido</span>
                </div>
            `;
            coverageResult.classList.add('active', 'error');
        } else {
            // Simulação de verificação
            const isAvailable = Math.random() > 0.3;
            
            if (isAvailable) {
                coverageResult.innerHTML = `
                    <div class="result-title">
                        <i class="fas fa-check-circle"></i>
                        <span>Sua região está coberta!</span>
                    </div>
                    <p>Estamos disponíveis no seu endereço com nossa rede de fibra óptica de alta velocidade. Entre em contato para agendar a instalação.</p>
                    <a href="#contato" class="btn btn-primary" style="margin-top: 1rem;">Contratar Agora</a>
                `;
                coverageResult.classList.add('active', 'success');
                coverageResult.classList.remove('error');
            } else {
                coverageResult.innerHTML = `
                    <div class="result-title">
                        <i class="fas fa-times-circle"></i>
                        <span>Cobertura indisponível no momento</span>
                    </div>
                    <p>Infelizmente ainda não atendemos sua região, mas estamos expandindo nossa rede constantemente. Cadastre-se para ser avisado quando chegarmos na sua área.</p>
                    <button class="btn btn-outline" style="margin-top: 1rem;">Avise-me quando chegar</button>
                `;
                coverageResult.classList.add('active', 'error');
                coverageResult.classList.remove('success');
            }
            
            // Rola para o resultado
            coverageResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Animações ao rolar a página
const fadeElements = document.querySelectorAll('.fade-in');

const animateOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Verifica na carga inicial
window.addEventListener('load', animateOnScroll);

// Verifica durante a rolagem
window.addEventListener('scroll', animateOnScroll);

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('.newsletter-input');
        
        // Simulação de cadastro
        setTimeout(() => {
            input.value = '';
            alert('Obrigado por assinar nossa newsletter! Você receberá nossas novidades em breve.');
        }, 500);
    });
}

// Inicializa animações na carga
animateOnScroll();

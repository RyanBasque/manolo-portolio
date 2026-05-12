/**
 * Manolo Buso Prieto — Portfolio
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Notas Musicais Flutuantes
    // ========================================
    const musicNotesContainer = document.getElementById('musicNotes');
    const musicalSymbols = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
    const pastelColors = [
        '#c4b5fd', // lavender
        '#a7f3d0', // mint
        '#fed7aa', // peach
        '#bfdbfe', // blue
        '#fecdd3', // rose
        '#fef08a', // yellow
        '#a5f3fc'  // cyan
    ];

    function createMusicNote() {
        const note = document.createElement('div');
        note.classList.add('music-note');
        
        // Propriedades aleatórias
        const symbol = musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)];
        const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        const left = Math.random() * 100;
        const fontSize = Math.random() * 20 + 16; // 16-36px
        const duration = Math.random() * 6 + 6; // 6-12s
        const delay = Math.random() * 5;
        
        note.textContent = symbol;
        note.style.color = color;
        note.style.left = `${left}%`;
        note.style.fontSize = `${fontSize}px`;
        note.style.animationDuration = `${duration}s`;
        note.style.animationDelay = `${delay}s`;
        
        musicNotesContainer.appendChild(note);
        
        // Remover após a animação
        setTimeout(() => {
            if (note.parentNode) {
                note.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Criar notas iniciais
    for (let i = 0; i < 15; i++) {
        createMusicNote();
    }

    // Continuar criando notas periodicamente
    setInterval(createMusicNote, 800);

    // ========================================
    // Menu Mobile
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animar ícone do hambúrguer
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Contadores Animados
    // ========================================
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.innerText = target;
        }
    }

    // Observador para iniciar contadores quando visíveis
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================================
    // Carrosséis
    // ========================================
    const carousels = {
        spotify: document.getElementById('spotifyCarousel'),
        youtube: document.getElementById('youtubeCarousel')
    };

    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carouselType = this.getAttribute('data-carousel');
            const carousel = carousels[carouselType];
            const cardWidth = carousel.querySelector('.spotify-card, .youtube-card').offsetWidth + 25; // width + gap
            
            if (this.classList.contains('prev')) {
                carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // Fade In Animation on Scroll
    // ========================================
    const fadeElements = document.querySelectorAll('.sobre-content, .numero-card, .artista-card, .servico-card');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // ========================================
    // Formulário de Contato
    // ========================================
    const contatoForm = document.getElementById('contatoForm');

    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contatoForm);
        const data = Object.fromEntries(formData);
        
        // Simular envio
        const submitBtn = contatoForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = 'linear-gradient(135deg, var(--pastel-mint), var(--pastel-blue))';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contatoForm.reset();
            }, 3000);
        }, 1500);
        
        console.log('Dados do formulário:', data);
    });

    // ========================================
    // Smooth Scroll para links internos
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Ajuste para navbar fixa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Parallax sutil no Hero
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });

    // ========================================
    // Efeito de digitação no tagline (opcional)
    // ========================================
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar após um pequeno delay
        setTimeout(typeWriter, 500);
    }
});

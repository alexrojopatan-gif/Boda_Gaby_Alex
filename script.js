// =============================================================
// BODA DE ALEXANDER & ASTRID - SCRIPT PRINCIPAL
// =============================================================

const CONFIG = {
    fechaBoda: new Date('2027-01-23T15:00:00'),
    novios: 'Alexander & Astrid',
    idVideoYouTube: '98Akpf1ph2o',
    archivoAudio: 'assets/audio/musica.mp3',
    numeroWhatsAppNovio: '50232665826',
    numeroWhatsAppNovia: '50247810905',
    urlGoogleSheets: 'https://script.google.com/macros/s/AKfycbw5MfQHE5iVo-hzCxuEvRNZc3zXPF_Pqn6cpzkmq1d523vbC2muUdv18mVT5Ebfbqa3vA/exec',
    fotos: [
        { src: 'assets/img/foto3.jpg', title: 'Bajo el Cielo Colonial' },
        { src: 'assets/img/IMG_5490.png', title: 'El Sí, Para Siempre' },
        { src: 'assets/img/dvdvd.jpeg', title: 'Amor Incondicional' },
        { src: 'assets/img/foto1.jpg', title: 'Miradas Cómplices' },
        { src: 'assets/img/foto4.jpg', title: 'Nuestros Pasos' },
        { src: 'assets/img/foto2.jpg', title: 'Sonrisas y Amor' }
    ]
};

// =============================================================
// 1. CUENTA REGRESIVA
// =============================================================
function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const distancia = CONFIG.fechaBoda.getTime() - ahora;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distancia <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    animarNumero(daysEl, dias);
    animarNumero(hoursEl, horas);
    animarNumero(minutesEl, minutos);
    animarNumero(secondsEl, segundos);
}

function animarNumero(elemento, valor) {
    const formateado = String(valor).padStart(2, '0');
    if (elemento.textContent !== formateado) {
        elemento.textContent = formateado;
        elemento.style.transform = 'scale(1.15)';
        elemento.style.color = 'var(--oro-principal)';
        setTimeout(() => {
            elemento.style.transform = 'scale(1)';
            elemento.style.color = 'var(--verde-bosque)';
        }, 250);
    }
}

setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

// =============================================================
// 2. PÉTALOS Y HOJAS FLOTANTES (Jardín con Vida y Brisa)
// =============================================================
function crearPetalosYHojas() {
    const container = document.getElementById('petals-container');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    container.replaceChildren();
    const cantidad = 16;

    // Colores suaves de flores y hojas de eucalipto / salvia
    const estilos = [
        // Pétalo blanco crema
        { bg: 'rgba(255, 252, 248, 0.75)', radius: '65% 35% 70% 30%', border: 'rgba(221, 194, 127, 0.3)' },
        // Pétalo rubor floral suave
        { bg: 'rgba(244, 218, 214, 0.65)', radius: '70% 30% 65% 35%', border: 'rgba(238, 207, 202, 0.4)' },
        // Hoja verde salvia / eucalipto
        { bg: 'rgba(175, 201, 185, 0.68)', radius: '80% 20% 80% 20%', border: 'rgba(107, 143, 123, 0.3)' },
        // Hoja verde oliva claro
        { bg: 'rgba(195, 212, 192, 0.62)', radius: '20% 80% 20% 80%', border: 'rgba(107, 143, 123, 0.25)' }
    ];

    for (let i = 0; i < cantidad; i++) {
        const elemento = document.createElement('div');
        elemento.className = 'petal';
        elemento.setAttribute('aria-hidden', 'true');

        const estilo = estilos[Math.floor(Math.random() * estilos.length)];
        const ancho = 10 + Math.random() * 12;
        const alto = ancho * (1.3 + Math.random() * 0.5);

        const swayA = `${Math.round((Math.random() - 0.5) * 120)}px`;
        const swayB = `${Math.round((Math.random() - 0.5) * 160)}px`;

        elemento.style.left = `${Math.random() * 100}vw`;
        elemento.style.width = `${ancho}px`;
        elemento.style.height = `${alto}px`;
        elemento.style.background = estilo.bg;
        elemento.style.borderRadius = estilo.radius;
        elemento.style.border = `1px solid ${estilo.border}`;
        elemento.style.setProperty('--sway-a', swayA);
        elemento.style.setProperty('--sway-b', swayB);
        elemento.style.animationDuration = `${16 + Math.random() * 14}s`;
        elemento.style.animationDelay = `${Math.random() * 12}s`;

        container.appendChild(elemento);
    }
}

// =============================================================
// 3. GALERÍA INTERACTIVA Y LIGHTBOX
// =============================================================
let fotoActual = 0;

function configurarGaleria() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    const galleryItems = document.querySelectorAll('.galeria-item');

    if (!lightbox || !lightboxImg || galleryItems.length === 0) return;

    galleryItems.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            fotoActual = index;
            abrirLightbox(fotoActual);
        });
    });

    function abrirLightbox(index) {
        const foto = CONFIG.fotos[index];
        if (!foto) return;

        lightboxImg.src = foto.src;
        lightboxImg.alt = foto.title;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        lightboxImg.style.transform = 'scale(0.85)';
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.transform = 'scale(1)';
            lightboxImg.style.opacity = '1';
        }, 50);

        if (closeBtn) closeBtn.focus();
    }

    function cerrarLightbox() {
        lightboxImg.style.transform = 'scale(0.85)';
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (galleryItems[fotoActual]) galleryItems[fotoActual].focus();
        }, 250);
    }

    function cambiarFoto(delta) {
        fotoActual = (fotoActual + delta + CONFIG.fotos.length) % CONFIG.fotos.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.92)';

        setTimeout(() => {
            const foto = CONFIG.fotos[fotoActual];
            lightboxImg.src = foto.src;
            lightboxImg.alt = foto.title;
            setTimeout(() => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 60);
        }, 150);
    }

    if (closeBtn) closeBtn.addEventListener('click', cerrarLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => cambiarFoto(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => cambiarFoto(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') cambiarFoto(-1);
        if (e.key === 'ArrowRight') cambiarFoto(1);
    });
}

// =============================================================
// 4. CONTROL DE MÚSICA (HTML5 Audio nativo + respaldo YouTube)
// =============================================================
let musicaActiva = false;
let audioHtml5 = null;
let reproductorYouTube = null;
let youtubeListo = false;
let youtubeCargando = false;
let reproducirAlEstarListo = false;
let usarYouTube = false;

function iniciarControlMusica() {
    audioHtml5 = document.getElementById('weddingAudio');

    if (audioHtml5) {
        audioHtml5.addEventListener('play', () => actualizarEstadoMusica(true));
        audioHtml5.addEventListener('pause', () => actualizarEstadoMusica(false));
        audioHtml5.addEventListener('ended', () => actualizarEstadoMusica(false));
        audioHtml5.addEventListener('error', () => {
            console.warn('Audio local no disponible o bloqueado por el navegador. Activando respaldo YouTube.');
            usarYouTube = true;
            cargarYouTubeAPI();
        });
    }

    configurarBotonMusica();

    // Precargar YouTube en segundo plano solo si se está sirviendo por HTTP/HTTPS
    if (window.location.protocol.startsWith('http')) {
        setTimeout(() => cargarYouTubeAPI(false), 2000);
    }
}

function alternarMusica() {
    // 1. Intentar con elemento nativo HTML5 Audio
    if (audioHtml5 && !usarYouTube) {
        if (musicaActiva) {
            audioHtml5.pause();
        } else {
            actualizarBotonMusicaTooltip('Iniciando música...');
            const promesaPlay = audioHtml5.play();
            if (promesaPlay !== undefined) {
                promesaPlay
                    .then(() => {
                        actualizarEstadoMusica(true);
                    })
                    .catch((err) => {
                        console.warn('No se pudo reproducir el archivo local, intentando YouTube...', err);
                        usarYouTube = true;
                        reproducirConYouTube();
                    });
            }
        }
        return;
    }

    // 2. Respaldo con YouTube
    reproducirConYouTube();
}

function reproducirConYouTube() {
    if (!reproductorYouTube || !youtubeListo) {
        actualizarBotonMusicaTooltip('Cargando melodía...');
        cargarYouTubeAPI(true);
        return;
    }

    if (musicaActiva) {
        reproductorYouTube.pauseVideo();
    } else {
        reproductorYouTube.playVideo();
    }
}

function cargarYouTubeAPI(autoPlay = false) {
    if (autoPlay) reproducirAlEstarListo = true;
    if (youtubeCargando) return;
    youtubeCargando = true;

    if (typeof YT !== 'undefined' && YT.Player) {
        iniciarReproductorYouTube();
        return;
    }

    window.onYouTubeIframeAPIReady = function() {
        iniciarReproductorYouTube();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
    }
}

function iniciarReproductorYouTube() {
    const contenedor = document.getElementById('youtube-player');
    if (!contenedor || typeof YT === 'undefined' || !YT.Player) return;

    const playerVars = {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        playsinline: 1,
        loop: 1,
        playlist: CONFIG.idVideoYouTube
    };

    if (window.location.protocol.startsWith('http')) {
        playerVars.origin = window.location.origin;
    }

    try {
        reproductorYouTube = new YT.Player('youtube-player', {
            height: '1',
            width: '1',
            videoId: CONFIG.idVideoYouTube,
            playerVars: playerVars,
            events: {
                onReady: function() {
                    youtubeListo = true;
                    if (reproducirAlEstarListo) {
                        reproducirAlEstarListo = false;
                        reproductorYouTube.playVideo();
                    } else if (!musicaActiva) {
                        actualizarBotonMusicaTooltip('Reproducir música');
                    }
                },
                onStateChange: function(e) {
                    if (e.data === YT.PlayerState.PLAYING) {
                        actualizarEstadoMusica(true);
                    } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
                        actualizarEstadoMusica(false);
                    }
                },
                onError: function(e) {
                    console.warn('Aviso de YouTube API:', e.data);
                    // Si YouTube falla pero el audio local está disponible, intentar audio local
                    if (audioHtml5) {
                        usarYouTube = false;
                        audioHtml5.play().catch(() => {
                            actualizarBotonMusicaTooltip('Música en pausa');
                        });
                    } else {
                        actualizarBotonMusicaTooltip('Música en pausa');
                    }
                }
            }
        });
    } catch (e) {
        console.error('Error inicializando YT.Player:', e);
    }
}

function actualizarEstadoMusica(reproduciendo) {
    musicaActiva = reproduciendo;
    const boton = document.getElementById('musicControl');
    if (!boton) return;

    boton.classList.toggle('playing', reproduciendo);
    const icono = boton.querySelector('i');
    if (icono) {
        icono.className = reproduciendo ? 'fas fa-pause' : 'fas fa-music';
    }
    actualizarBotonMusicaTooltip(reproduciendo ? 'Pausar música' : 'Reproducir música');
}

function actualizarBotonMusicaTooltip(texto) {
    const tooltip = document.querySelector('#musicControl .music-tooltip');
    const boton = document.getElementById('musicControl');
    if (tooltip) tooltip.textContent = texto;
    if (boton) {
        boton.setAttribute('aria-label', texto);
        boton.title = texto;
    }
}

function configurarBotonMusica() {
    const boton = document.getElementById('musicControl');
    if (!boton) return;

    // Remover listeners anteriores reemplazando el nodo o agregando el evento limpio
    boton.onclick = alternarMusica;
}

// =============================================================
// 5. CONTROL DE FORMULARIO RSVP (WhatsApp + Google Sheets)
// =============================================================
function configurarRSVP() {
    const btnNovio = document.getElementById('btnConfirmarNovio');
    const btnNovia = document.getElementById('btnConfirmarNovia');
    const buttonsGroup = document.querySelector('.rsvp-buttons-group');
    const formContainer = document.getElementById('rsvpForm');
    const formTitulo = document.getElementById('rsvpFormTitulo');
    const radiosDestinatario = document.querySelectorAll('input[name="destinatario"]');
    const btnEnviar = document.getElementById('btnEnviar');
    const btnCancelar = document.getElementById('btnCancelar');
    const rsvpStatus = document.getElementById('rsvpStatus');

    if (!formContainer || !btnEnviar || !btnCancelar) return;

    function abrirFormulario(destinatario) {
        if (buttonsGroup) buttonsGroup.style.display = 'none';
        formContainer.style.display = 'block';
        if (rsvpStatus) rsvpStatus.textContent = '';

        const radio = document.querySelector(`input[name="destinatario"][value="${destinatario}"]`);
        if (radio) radio.checked = true;

        if (formTitulo) {
            formTitulo.textContent = destinatario === 'novia'
                ? 'Confirmar Asistencia con la Novia (Astrid)'
                : 'Confirmar Asistencia con el Novio (Alexander)';
        }

        const inputNombre = document.getElementById('nombre');
        if (inputNombre) inputNombre.focus();
    }

    if (btnNovio) btnNovio.addEventListener('click', () => abrirFormulario('novio'));
    if (btnNovia) btnNovia.addEventListener('click', () => abrirFormulario('novia'));

    radiosDestinatario.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (formTitulo) {
                formTitulo.textContent = e.target.value === 'novia'
                    ? 'Confirmar Asistencia con la Novia (Astrid)'
                    : 'Confirmar Asistencia con el Novio (Alexander)';
            }
        });
    });

    // Cancelar
    btnCancelar.addEventListener('click', () => {
        formContainer.style.display = 'none';
        if (buttonsGroup) buttonsGroup.style.display = 'flex';
        if (rsvpStatus) rsvpStatus.textContent = '';
    });

    // Enviar
    btnEnviar.addEventListener('click', procesarRSVP);

    // Enter en campos de texto
    document.querySelectorAll('#rsvpForm input:not([type="radio"])').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') procesarRSVP();
        });
    });
}

function procesarRSVP() {
    const nombre = document.getElementById('nombre')?.value.trim();
    const telefono = document.getElementById('telefono')?.value.trim();
    const invitados = document.getElementById('invitados')?.value.trim() || '1';
    const destinatarioRadio = document.querySelector('input[name="destinatario"]:checked');
    const destinatario = destinatarioRadio ? destinatarioRadio.value : 'novio';

    const rsvpStatus = document.getElementById('rsvpStatus');
    const btnEnviar = document.getElementById('btnEnviar');
    const buttonsGroup = document.querySelector('.rsvp-buttons-group');
    const formContainer = document.getElementById('rsvpForm');

    if (!nombre) {
        alert('Por favor ingresa tu nombre completo para confirmar tu asistencia.');
        document.getElementById('nombre')?.focus();
        return;
    }

    const cantidad = Number(invitados);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
        alert('Por favor indica entre 1 y 10 invitados.');
        document.getElementById('invitados')?.focus();
        return;
    }

    const textoOriginal = btnEnviar.innerHTML;
    btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    btnEnviar.disabled = true;

    const esNovia = destinatario === 'novia';
    const nombreDestinatario = esNovia ? 'Astrid' : 'Alexander';
    const numeroWhatsApp = esNovia ? CONFIG.numeroWhatsAppNovia : CONFIG.numeroWhatsAppNovio;

    const mensajeWhatsApp = `¡Hola ${nombreDestinatario}! Confirmo con mucho gusto mi asistencia a su boda 🤍💍\n\nNombre: ${nombre}\nTeléfono: ${telefono || 'No especificado'}\nTotal de Invitados: ${invitados}\n\n¡Felicidades y muchas bendiciones!`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    const ventanaWhatsApp = window.open(urlWhatsApp, '_blank');
    if (ventanaWhatsApp) ventanaWhatsApp.opener = null;

    // Enviar a Google Sheets
    fetch(CONFIG.urlGoogleSheets, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: nombre,
            telefono: telefono || 'No especificado',
            invitados: invitados,
            destinatario: esNovia ? 'Novia (Astrid)' : 'Novio (Alexander)',
            mensaje: `Confirmación enviada a ${esNovia ? 'la Novia (Astrid)' : 'el Novio (Alexander)'}`
        })
    })
    .finally(() => {
        btnEnviar.innerHTML = textoOriginal;
        btnEnviar.disabled = false;
        formContainer.style.display = 'none';
        if (buttonsGroup) buttonsGroup.style.display = 'flex';

        // Limpiar campos
        if (document.getElementById('nombre')) document.getElementById('nombre').value = '';
        if (document.getElementById('telefono')) document.getElementById('telefono').value = '';
        if (document.getElementById('invitados')) document.getElementById('invitados').value = '1';

        if (rsvpStatus) {
            rsvpStatus.textContent = `¡Gracias! Tu confirmación ha sido enviada con éxito a ${nombreDestinatario}. Te esperamos con alegría.`;
        }
    });
}

// =============================================================
// 6. INICIALIZAR AL CARGAR
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    crearPetalosYHojas();
    configurarGaleria();
    iniciarControlMusica();
    configurarRSVP();

    console.log(`🌸 Boda ${CONFIG.novios} - ${CONFIG.fechaBoda.toLocaleDateString('es-ES')}`);
});
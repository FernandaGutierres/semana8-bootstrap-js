// JavaScript para interactividad del proyecto Bootstrap
// Función para mostrar alerta personalizada
function mostrarAlerta() {
    const alertaHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 1050; min-width: 300px;" 
             role="alert">
            <strong><i class="fas fa-check-circle"></i> ¡Genial!</strong> 
            Has hecho clic en el botón. ¡Gracias por interactuar con nuestra página!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertaHTML);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        const alerta = document.querySelector('.alert-success');
        if (alerta) {
            alerta.remove();
        }
    }, 5000);
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar validación del formulario
    configurarValidacionFormulario();
    
    // Configurar validación en tiempo real
    configurarValidacionTiempoReal();
    
    // Configurar tabla interactiva
    configurarTablaInteractiva();
    
    // Configurar carrusel con teclado
    configurarCarruselTeclado();
    
    // Configurar navegación suave
    configurarNavegacionSuave();
    
    // Configurar efectos de scroll
    configurarEfectosScroll();
    
    // Inicializar animaciones
    inicializarAnimaciones();
    
    // Mostrar mensaje de bienvenida en consola
    mostrarMensajeBienvenida();
});

// Configurar validación del formulario
function configurarValidacionFormulario() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar validaciones previas
            limpiarValidacion();
            
            let isValid = true;
            
            // Validar cada campo
            if (!validarNombre()) isValid = false;
            if (!validarEmail()) isValid = false;
            if (!validarMensaje()) isValid = false;
            
            // Si todo es válido, enviar formulario
            if (isValid) {
                enviarFormulario();
            }
        });
    }
}

// Función para limpiar validaciones previas
function limpiarValidacion() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    const validFields = document.querySelectorAll('.is-valid');
    const feedback = document.querySelectorAll('.invalid-feedback');
    
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
    validFields.forEach(field => field.classList.remove('is-valid'));
    feedback.forEach(fb => fb.remove());
}

// Validar nombre
function validarNombre() {
    const nombre = document.getElementById('nombre');
    const valor = nombre.value.trim();
    
    if (valor.length < 2) {
        mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        mostrarError(nombre, 'El nombre solo puede contener letras y espacios');
        return false;
    }
    
    mostrarExito(nombre);
    return true;
}

// Validar email
function validarEmail() {
    const email = document.getElementById('email');
    const valor = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(valor)) {
        mostrarError(email, 'Por favor ingresa un email válido');
        return false;
    }
    
    mostrarExito(email);
    return true;
}

// Validar mensaje
function validarMensaje() {
    const mensaje = document.getElementById('mensaje');
    const valor = mensaje.value.trim();
    
    if (valor.length < 10) {
        mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    if (valor.length > 500) {
        mostrarError(mensaje, 'El mensaje no puede tener más de 500 caracteres');
        return false;
    }
    
    mostrarExito(mensaje);
    return true;
}

// Mostrar error en campo
function mostrarError(campo, mensaje) {
    campo.classList.add('is-invalid');
    campo.classList.remove('is-valid');
    
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = mensaje;
    campo.parentNode.appendChild(feedback);
}

// Mostrar éxito en campo
function mostrarExito(campo) {
    campo.classList.add('is-valid');
    campo.classList.remove('is-invalid');
}

// Enviar formulario
function enviarFormulario() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Mostrar loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
        
        // Mostrar alerta de éxito
        mostrarAlertaExito();
        
        // Resetear formulario
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            limpiarValidacion();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
}

// Mostrar alerta de éxito
function mostrarAlertaExito() {
    const alertaHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 1050; min-width: 300px;" 
             role="alert">
            <strong><i class="fas fa-check-circle"></i> ¡Mensaje enviado!</strong> 
            Gracias por contactarnos. Te responderemos pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertaHTML);
    
    setTimeout(() => {
        const alerta = document.querySelector('.alert-success');
        if (alerta) {
            alerta.remove();
        }
    }, 5000);
}

// Configurar validación en tiempo real
function configurarValidacionTiempoReal() {
    const campos = ['nombre', 'email', 'mensaje'];
    
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('blur', function() {
                switch(id) {
                    case 'nombre':
                        validarNombre();
                        break;
                    case 'email':
                        validarEmail();
                        break;
                    case 'mensaje':
                        validarMensaje();
                        break;
                }
            });
        }
    });
}

// Configurar tabla interactiva
function configurarTablaInteractiva() {
    const tabla = document.querySelector('.table');
    
    if (tabla) {
        const filas = tabla.querySelectorAll('tbody tr');
        
        filas.forEach(fila => {
            // Hover effect
            fila.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
                this.style.transform = 'scale(1.01)';
                this.style.transition = 'all 0.3s ease';
            });
            
            fila.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = 'scale(1)';
            });
            
            // Click effect
            fila.addEventListener('click', function() {
                // Remover selección previa
                filas.forEach(f => f.classList.remove('table-active'));
                
                // Agregar selección actual
                this.classList.add('table-active');
                
                // Mostrar información
                const nombre = this.cells[0].textContent;
                mostrarInfoFila(nombre);
            });
        });
    }
}

// Mostrar información de fila seleccionada
function mostrarInfoFila(nombre) {
    const alertaHTML = `
        <div class="alert alert-info alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 1050; min-width: 300px;" 
             role="alert">
            <strong><i class="fas fa-info-circle"></i> Fila seleccionada:</strong> 
            ${nombre}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertaHTML);
    
    setTimeout(() => {
        const alerta = document.querySelector('.alert-info');
        if (alerta) {
            alerta.remove();
        }
    }, 3000);
}

// Configurar carrusel con teclado
function configurarCarruselTeclado() {
    const carousel = document.querySelector('#carouselExample');
    
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        // Controles de teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                carouselInstance.prev();
            } else if (e.key === 'ArrowRight') {
                carouselInstance.next();
            }
        });
        
        // Pausar en hover
        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }
}

// Configurar navegación suave
function configurarNavegacionSuave() {
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configurar efectos de scroll
function configurarEfectosScroll() {
    const elementos = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'all 0.6s ease';
        observer.observe(elemento);
    });
}

// Inicializar animaciones
function inicializarAnimaciones() {
    // Agregar clases de animación a elementos específicos
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Efecto de typing para títulos
    const titulos = document.querySelectorAll('h1, h2');
    titulos.forEach(titulo => {
        titulo.addEventListener('mouseenter', function() {
            this.style.color = '#007bff';
            this.style.transition = 'color 0.3s ease';
        });
        
        titulo.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// Mostrar mensaje de bienvenida en consola
function mostrarMensajeBienvenida() {
    console.log(`
    %c¡Bienvenido a nuestro sitio web!
    %cEste sitio está construido con Bootstrap 5 y JavaScript vanilla.
    %c¿Eres desarrollador? ¡Échale un vistazo al código!
    `, 
    'color: #007bff; font-size: 16px; font-weight: bold;',
    'color: #6c757d; font-size: 14px;',
    'color: #28a745; font-size: 14px;'
    );
}

// Función para toggle del modo oscuro (opcional)
function toggleModoOscuro() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    // Guardar preferencia
    localStorage.setItem('modo-oscuro', isDark);
    
    // Cambiar ícono del botón
    const botonModo = document.querySelector('.btn-modo-oscuro');
    if (botonModo) {
        botonModo.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }
}

// Cargar preferencia de modo oscuro
function cargarModoOscuro() {
    const modoOscuro = localStorage.getItem('modo-oscuro');
    if (modoOscuro === 'true') {
        document.body.classList.add('dark-mode');
        const botonModo = document.querySelector('.btn-modo-oscuro');
        if (botonModo) {
            botonModo.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Función para contador de caracteres
function configurarContadorCaracteres() {
    const mensaje = document.getElementById('mensaje');
    if (mensaje) {
        const contador = document.createElement('small');
        contador.className = 'text-muted';
        contador.style.float = 'right';
        mensaje.parentNode.appendChild(contador);
        
        mensaje.addEventListener('input', function() {
            const longitud = this.value.length;
            contador.textContent = `${longitud}/500 caracteres`;
            
            if (longitud > 450) {
                contador.classList.add('text-warning');
            } else {
                contador.classList.remove('text-warning');
            }
        });
    }
}

// Configurar búsqueda en tabla
function configurarBusquedaTabla() {
    const inputBusqueda = document.getElementById('busquedaTabla');
    const tabla = document.querySelector('.table tbody');
    
    if (inputBusqueda && tabla) {
        const filas = tabla.querySelectorAll('tr');
        
        inputBusqueda.addEventListener('input', function() {
            const termino = this.value.toLowerCase();
            
            filas.forEach(fila => {
                const texto = fila.textContent.toLowerCase();
                if (texto.includes(termino)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        });
    }
}

// Función para tooltip personalizado
function inicializarTooltips() {
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach(element => {
        new bootstrap.Tooltip(element);
    });
}

// Función para modal personalizado
function configurarModales() {
    const modales = document.querySelectorAll('.modal');
    
    modales.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const input = this.querySelector('input[type="text"], textarea');
            if (input) {
                input.focus();
            }
        });
    });
}

// Configurar efectos de botones
function configurarEfectosBotones() {
    const botones = document.querySelectorAll('.btn');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // Efecto ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Agregar estilos CSS para animaciones
const estilosAnimaciones = `
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .dark-mode {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    
    .dark-mode .card {
        background-color: #2d2d2d;
        border-color: #444;
    }
    
    .dark-mode .table {
        background-color: #2d2d2d;
        color: #ffffff;
    }
`;

// Inyectar estilos
const style = document.createElement('style');
style.textContent = estilosAnimaciones;
document.head.appendChild(style);

// Ejecutar configuraciones adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    configurarContadorCaracteres();
    configurarBusquedaTabla();
    inicializarTooltips();
    configurarModales();
    configurarEfectosBotones();
    cargarModoOscuro();
});
// ========================================
// NAVEGACIÓN STICKY Y MENÚ HAMBURGUESA
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Menú hamburguesa (móvil)
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
      ? 'rotate(45deg) translateY(10px)' 
      : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
      ? 'rotate(-45deg) translateY(-10px)' 
      : 'none';
  });
}

// Cerrar menú al hacer clic en un enlace (móvil)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      
      // Restaurar botón hamburguesa
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
  }
});

// Resaltar enlace activo en la navegación según la sección visible
const sections = document.querySelectorAll('.section');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      
      // Remover clase activa de todos los enlaces
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ========================================
// SMOOTH SCROLL
// ========================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Altura del navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// GRÁFICO 1: DISTRIBUCIÓN DISCAPACIDAD VISUAL
// ========================================

const ctx1 = document.getElementById('chartDiscapacidad');

if (ctx1) {
  new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: ['Ceguera Total', 'Baja Visión'],
      datasets: [{
        label: 'Personas con Discapacidad Visual en Bogotá',
        data: [17609, 266405], // Datos del documento
        backgroundColor: [
          '#E74C3C',
          '#3498DB'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              family: "'Segoe UI', sans-serif"
            },
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// ========================================
// GRÁFICO 2: INFRAESTRUCTURA TRANSMILENIO
// ========================================

const ctx2 = document.getElementById('chartInfraestructura');

if (ctx2) {
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [
        'Paraderos con\nBraille',
        'Paraderos sin\nBraille',
        'Estaciones con\nProblemas'
      ],
      datasets: [{
        label: 'Cantidad',
        data: [5587, 1324, 450], // 5587 con braille (80.8%), estimado sin braille, problemas reportados
        backgroundColor: [
          '#27AE60',
          '#E74C3C',
          '#F39C12'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 12
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y.toLocaleString()} unidades`;
            }
          }
        }
      }
    }
  });
}

// ========================================
// ANIMACIONES DE ENTRADA (FADE IN)
// ========================================

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.content-card, .location-card, .stat-box, .conclusion-card, .risk-card');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => {
    animationObserver.observe(el);
  });
};

// Ejecutar animaciones al cargar la página
window.addEventListener('load', animateOnScroll);

// ========================================
// TOOLTIPS INTERACTIVOS EN TABLA
// ========================================

const tableRows = document.querySelectorAll('.table-row');

tableRows.forEach(row => {
  row.addEventListener('mouseenter', function() {
    const tooltip = this.getAttribute('data-tooltip');
    if (tooltip) {
      // Crear elemento tooltip temporal
      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'custom-tooltip';
      tooltipEl.textContent = tooltip;
      tooltipEl.style.cssText = `
        position: absolute;
        background-color: rgba(44, 62, 80, 0.95);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.85rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      `;
      
      document.body.appendChild(tooltipEl);
      this._tooltip = tooltipEl;
      
      // Posicionar tooltip
      const rect = this.getBoundingClientRect();
      tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
      tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
    }
  });
  
  row.addEventListener('mouseleave', function() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  });
});

// ========================================
// INTERACTIVIDAD EN TARJETAS DE UBICACIÓN
// ========================================

const locationCards = document.querySelectorAll('.location-card');

locationCards.forEach(card => {
  card.addEventListener('click', function() {
    const locationNumber = this.getAttribute('data-location');
    
    // Remover clase activa de todas las tarjetas
    locationCards.forEach(c => c.classList.remove('location-active'));
    
    // Agregar clase activa a la tarjeta seleccionada
    this.classList.add('location-active');
    
    // Efecto visual (opcional)
    this.style.transform = 'scale(1.02)';
    setTimeout(() => {
      this.style.transform = '';
    }, 300);
    
    console.log(`Ubicación seleccionada: ${locationNumber}`);
    // Aquí podrías agregar funcionalidad adicional como mostrar mapa, información detallada, etc.
  });
});

// Estilo CSS para la clase location-active (agregar dinámicamente)
const style = document.createElement('style');
style.textContent = `
  .location-active {
    border-color: #3498DB !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 8px 16px rgba(52, 152, 219, 0.4) !important;
  }
`;
document.head.appendChild(style);

// ========================================
// CONTADOR ANIMADO PARA ESTADÍSTICAS
// ========================================

const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString('es-CO');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString('es-CO');
    }
  }, 16);
};

// Observar las cajas de estadísticas para animarlas cuando sean visibles
const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const targetValue = parseInt(entry.target.textContent.replace(/\D/g, ''));
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target, targetValue);
    }
  });
}, {
  threshold: 0.5
});

statNumbers.forEach(stat => {
  statObserver.observe(stat);
});

// ========================================
// CONSOLA DE INFORMACIÓN
// ========================================

console.log('%c🔊 Balizas Sonoras Interactivas', 'color: #3498DB; font-size: 20px; font-weight: bold;');
console.log('%cUniversidad Nacional de Colombia', 'color: #2C3E50; font-size: 14px;');
console.log('%cFacultad de Artes - Diseño Industrial', 'color: #7F8C8D; font-size: 12px;');
console.log('%cPresentación académica optimizada para evaluación', 'color: #27AE60; font-size: 12px;');

// ========================================
// ACCESIBILIDAD: NAVEGACIÓN POR TECLADO
// ========================================

// Mejorar accesibilidad de navegación por teclado
document.addEventListener('keydown', (e) => {
  // Navegación con flechas en las tarjetas de ubicación
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const activeCard = document.querySelector('.location-active');
    if (activeCard) {
      const allCards = Array.from(locationCards);
      const currentIndex = allCards.indexOf(activeCard);
      
      let nextIndex;
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % allCards.length;
      } else {
        nextIndex = (currentIndex - 1 + allCards.length) % allCards.length;
      }
      
      allCards[nextIndex].click();
      allCards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});

// ========================================
// MODO OSCURO/CLARO (OPCIONAL - BONUS)
// ========================================

// Esta funcionalidad es opcional y puede ser eliminada si no se requiere
const createThemeToggle = () => {
  const toggleButton = document.createElement('button');
  toggleButton.className = 'theme-toggle';
  toggleButton.setAttribute('aria-label', 'Cambiar tema');
  toggleButton.innerHTML = '🌙';
  toggleButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-secondary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 999;
    transition: all 0.3s ease;
    display: none; /* Oculto por defecto, activar si se desea */
  `;
  
  document.body.appendChild(toggleButton);
  
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
};

// Descomentar la siguiente línea para activar el botón de tema
// createThemeToggle();

// ========================================
// VALIDACIÓN DE CARGA COMPLETA
// ========================================

window.addEventListener('load', () => {
  console.log('%c✅ Todos los componentes cargados correctamente', 'color: #27AE60; font-size: 12px; font-weight: bold;');
  console.log(`📊 Gráficos: ${document.querySelectorAll('canvas').length} detectados`);
  console.log(`📍 Ubicaciones: ${locationCards.length} tarjetas`);
  console.log(`⚠️ Riesgos éticos: ${document.querySelectorAll('.risk-card').length} identificados`);
});

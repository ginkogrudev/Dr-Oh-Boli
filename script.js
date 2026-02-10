/**
 * Dental Practice Logic
 */

// 1. Dynamic Title Change
window.addEventListener('blur', () => {
    document.title = "Вашата усмивка Ви чака! 🦷";
});
window.addEventListener('focus', () => {
    document.title = "Д-р Ох Боли | Стоматолог Ямбол";
});

const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// 2. Schema.org Injection (UPDATED FOR YAMBOL)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Kabinet Dr. Oh Boli",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Yambol",
    "postalCode": "8600",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.4838, 
    "longitude": 26.5010 
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "telephone": "+35900000000"
};

const script = document.createElement('script');
script.type = "application/ld+json";
script.innerHTML = JSON.stringify(schemaData);
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    // Cookie logic removed or kept simple if needed
});

function toggleAccordion(el) {
    const isExpanded = el.classList.contains('accordion-expanded');
    document.querySelectorAll('.hero-column').forEach(h => h.classList.remove('accordion-expanded'));
    if (!isExpanded) {
        el.classList.add('accordion-expanded');
    } else {
        el.classList.remove('accordion-expanded');
    }
}

const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2', 'shadow-md');
        }
    });
}

// Funnel Action - GENERIC (No Superdoc)
function openBooking() {
    // Just scroll to footer or show alert for now
    alert("Моля, свържете се с нас на посочения телефон.");
    // Or: window.location.href = "#footer";
}
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

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

if(menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Reveal Animation
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ----------------------------
//  CALENDAR LOGIC (MOCKUP)
// ----------------------------

const monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни",
  "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
];

let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Renders the Calendar Grid
function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthTitle = document.getElementById('currentMonth');
    
    if(!calendarGrid) return;

    // Reset grid
    calendarGrid.innerHTML = "";
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    monthTitle.innerText = `${monthNames[month]} ${year}`;
    
    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // In Bulgaria, week starts Monday. Adjust: 0(Sun) -> 6, 1(Mon) -> 0
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty cells for days before the 1st
    for(let i = 0; i < adjustedFirstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Actual days
    const today = new Date();
    
    for(let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.innerText = i;
        dayEl.className = "calendar-day h-10 flex items-center justify-center rounded-lg text-sm font-bold text-slate-700 cursor-pointer";
        
        // Disable past dates
        const checkDate = new Date(year, month, i);
        if (checkDate < new Date(today.setHours(0,0,0,0))) {
             dayEl.classList.add('disabled');
        } else {
             dayEl.addEventListener('click', () => selectDate(i));
        }
        
        // Highlight selected
        if (selectedDate && 
            selectedDate.getDate() === i && 
            selectedDate.getMonth() === month) {
            dayEl.classList.add('selected');
        }
        
        calendarGrid.appendChild(dayEl);
    }
}

function selectDate(day) {
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    renderCalendar(); // Re-render to show selection highlight
    
    // Update Slots UI
    const dateString = selectedDate.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long'});
    document.getElementById('selectedDateText').innerText = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    renderSlots(selectedDate);
}

function renderSlots(date) {
    const container = document.getElementById('slotsContainer');
    container.innerHTML = "";
    
    const isWeekend = (date.getDay() === 0 || date.getDay() === 6);
    
    if (isWeekend) {
        container.innerHTML = `<div class="col-span-3 text-center py-6 text-slate-400 text-sm">Почивни дни. Моля изберете делничен ден.</div>`;
        return;
    }
    
    // Mock Times
    const times = ['09:00', '09:30', '10:00', '11:30', '13:00', '14:30', '15:00', '16:15'];
    
    times.forEach(time => {
        const btn = document.createElement('button');
        btn.innerText = time;
        btn.className = "time-slot py-2 rounded-lg text-sm font-bold text-slate-600 bg-white";
        btn.addEventListener('click', () => selectTime(time, btn));
        container.appendChild(btn);
    });
}

function selectTime(time, btnEl) {
    selectedTime = time;
    
    // Visual Select
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    btnEl.classList.add('selected');
    
    // Switch to Form
    setTimeout(() => {
        document.getElementById('slotsView').classList.add('hidden');
        document.getElementById('bookingInputs').classList.remove('hidden');
        
        const dateString = selectedDate.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long'});
        document.getElementById('confirmDateString').innerText = `${dateString} в ${selectedTime}`;
    }, 300);
}

// Navigation for Month
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Back Button in form
document.getElementById('backToSlots').addEventListener('click', () => {
    document.getElementById('slotsView').classList.remove('hidden');
    document.getElementById('bookingInputs').classList.add('hidden');
});

// FINAL BOOKING ACTION
document.getElementById('finalBookBtn').addEventListener('click', () => {
    const name = document.getElementById('c_name').value;
    const phone = document.getElementById('c_phone').value;
    
    if(!name || !phone) {
        alert("Моля попълнете име и телефон.");
        return;
    }
    
    // Construct WhatsApp Message
    const dateString = selectedDate.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long'});
    const message = `Здравейте, казвам се ${name}. Искам да запазя час за ${dateString} в ${selectedTime}. Телефон: ${phone}.`;
    
    const clinicPhone = "359000000000"; // Replace with Dr. Oh Boli's real number
    const waLink = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(waLink, '_blank');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});
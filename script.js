// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar && (window.scrollY > 40 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'));
});

// MOBILE MENU - SLIDE FROM LEFT
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMenu() {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
}

// Add event listener directly to toggle button if it exists
if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

// Close menu when overlay clicked
navOverlay && navOverlay.addEventListener('click', closeMenu);

// Close menu when any link clicked (WITH MOBILE DELAY FIX)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    // Let the browser start processing the page change link first,
    // then close the menu drawer safely right behind it.
    setTimeout(() => {
      closeMenu();
    }, 200); 
  });
});

// SCROLL REVEAL
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// CONTACT FORM (Formspree AJAX)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} });
      if (res.ok) {
        form.reset();
        const s = document.getElementById('formSuccess');
        if (s) s.style.display = 'block';
        btn.textContent = '✓ Sent!';
      } else { btn.textContent = 'Error — Try Again'; btn.disabled = false; }
    } catch { btn.textContent = 'Error — Try Again'; btn.disabled = false; }
  });
}

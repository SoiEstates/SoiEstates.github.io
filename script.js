// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar && (window.scrollY > 40 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'));
});

// MOBILE MENU
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
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

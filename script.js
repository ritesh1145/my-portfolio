/* script.js
   Handles typing effect, scroll reveal, nav highlighting, and interactivity.
*/

document.addEventListener('DOMContentLoaded', function () {
  // Remove loading overlay
  const loading = document.getElementById('loading');
  if (loading) { loading.classList.add('loaded'); setTimeout(() => loading.remove(), 600) }

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle && navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

  // Auto-set active nav link based on current filename
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector('.nav-link[href="' + currentFile + '"]');
  if (activeLink) activeLink.classList.add('active');

  // Smooth scroll for links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks?.classList.remove('show');
      }
    })
  })

  // Typing effect
  const skills = ['Java', 'Advanced Java', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'DSA', 'Git & GitHub'];
  const typingEl = document.getElementById('typing');
  let tIndex = 0, charI = 0, forward = true;
  function type() {
    if (!typingEl) return;
    const word = skills[tIndex];
    if (forward) {
      typingEl.textContent = word.slice(0, charI + 1);
      charI++;
      if (charI === word.length) { forward = false; setTimeout(type, 1000); return }
    } else {
      typingEl.textContent = word.slice(0, charI - 1);
      charI--;
      if (charI === 0) { forward = true; tIndex = (tIndex + 1) % skills.length }
    }
    setTimeout(type, 120);
  }
  type();

  // Skills animation
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    const pct = card.dataset.skill || 80;
    const span = card.querySelector('.bar span');
    // animate when in view
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { span.style.width = pct + '%'; obs.disconnect() } })
    }, { threshold: 0.3 });
    obs.observe(card);
  });

  // Reveal on scroll for sections
  const reveals = document.querySelectorAll('.reveal');
  const rObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible') }// else entry.target.classList.remove('visible')
    })
  }, { threshold: 0.12 });
  reveals.forEach(r => rObs.observe(r));

  // Active nav highlighting
  const sections = document.querySelectorAll('main section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (entry.isIntersecting) { navLinksAll.forEach(n => n.classList.remove('active')); link?.classList.add('active') }
    })
  }, { threshold: 0.45 });
  sections.forEach(s => navObs.observe(s));

  // Back to top
  const back = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) back.style.display = 'inline-flex'; else back.style.display = 'none';
  });
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Contact form simple handler
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) { alert('Please complete all fields'); return }
    // Fallback: open mailto
    const subject = encodeURIComponent('Contact from Portfolio — ' + name);
    const body = encodeURIComponent(message + '\n\n' + name + ' — ' + email);
    window.location.href = `mailto:example@domain.com?subject=${subject}&body=${body}`;
  });
});

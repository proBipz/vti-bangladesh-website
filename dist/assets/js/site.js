const body = document.body;
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  const closeNav = () => {
    body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = !body.classList.contains('nav-open');
    body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeNav(); });
}

const current = body.dataset.page;
if (current) {
  const active = document.querySelector(`[data-nav="${current}"]`);
  if (active) active.setAttribute('aria-current', 'page');
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `[${data.get('category')}] Website enquiry from ${data.get('name')}`;
    const message = [
      `Name: ${data.get('name')}`,
      `Organisation: ${data.get('organisation') || 'Not provided'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Enquiry type: ${data.get('category')}`,
      '',
      data.get('message')
    ].join('\n');
    window.location.href = `mailto:info@vtibd.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });


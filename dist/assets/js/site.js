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

const hero = document.querySelector('[data-hero]');
if (hero) {
  const slides = [...hero.querySelectorAll('[data-hero-slide]')];
  const heroContent = hero.querySelector('.hero-content');
  const eyebrow = hero.querySelector('[data-hero-eyebrow]');
  const title = hero.querySelector('[data-hero-title]');
  const accent = hero.querySelector('[data-hero-accent]');
  const copy = hero.querySelector('[data-hero-copy]');
  const desktopHero = window.matchMedia('(min-width: 861px)');
  const stories = [
    {
      eyebrow: 'Bangladesh · Established 1994',
      title: 'Global technology.',
      accent: 'Local expertise.',
      copy: 'VTI connects international manufacturers with Bangladesh’s institutional, professional and sports-shooting sectors—supported by local project coordination, experienced technicians and dependable after-sales service.'
    },
    {
      eyebrow: 'Range systems · Local support',
      title: 'Precision systems.',
      accent: 'Supported locally.',
      copy: 'From electronic scoring and range technology to installation and lifecycle service, VTI keeps international expertise connected to local operation.'
    },
    {
      eyebrow: 'International principals · Bangladesh',
      title: 'Trusted partnerships.',
      accent: 'Practical delivery.',
      copy: 'VTI coordinates specialist manufacturers, institutional requirements and experienced local technicians—from first discussion through after-sales support.'
    }
  ];
  let heroIndex = 0;
  let heroTimer;

  const showHero = index => {
    heroIndex = index;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    heroContent.classList.add('is-changing');
    window.setTimeout(() => {
      const story = stories[index];
      eyebrow.textContent = story.eyebrow;
      title.textContent = story.title;
      accent.textContent = story.accent;
      copy.textContent = story.copy;
      heroContent.classList.remove('is-changing');
    }, 280);
  };

  const stopHero = () => {
    if (heroTimer) window.clearInterval(heroTimer);
    heroTimer = undefined;
  };

  const startHero = () => {
    stopHero();
    if (!reduceMotion && desktopHero.matches) {
      heroTimer = window.setInterval(() => showHero((heroIndex + 1) % stories.length), 5000);
    }
  };

  desktopHero.addEventListener('change', event => {
    if (!event.matches) showHero(0);
    startHero();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopHero() : startHero());
  startHero();
}

document.querySelectorAll('[data-background-rotator]').forEach(rotator => {
  const slides = [...rotator.querySelectorAll('[data-background-slide]')];
  if (reduceMotion || slides.length < 2) return;
  const interval = Number(rotator.dataset.interval) || 5000;
  let activeIndex = 0;
  let rotationTimer;

  const startRotation = () => {
    window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === activeIndex));
    }, interval);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearInterval(rotationTimer);
    else startRotation();
  });
  startRotation();
});

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

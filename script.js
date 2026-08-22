document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  const toTop = document.getElementById('toTopBtn');

  // mobile menu toggle
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      toTop.classList.add('visible');
    } else {
      toTop.classList.remove('visible');
    }
  });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // hero parallax + zoom on scroll
  const heroBg = document.getElementById('heroBg');
  const heroSection = document.querySelector('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroBg && heroSection && !reduceMotion) {
    let ticking = false;
    const updateHero = () => {
      const rect = heroSection.getBoundingClientRect();
      const heroHeight = heroSection.offsetHeight || 1;
      // progress: 0 when hero top is at viewport top, 1 when hero fully scrolled past
      const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
      const scale = 1.08 + progress * 0.18;   // slow zoom-in as you scroll down
      const shiftY = progress * 60;           // subtle parallax drift
      heroBg.style.transform = `scale(${scale}) translateY(${shiftY}px)`;
      ticking = false;
    };
    updateHero();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHero);
        ticking = true;
      }
    });
    window.addEventListener('resize', updateHero);
  }

  // reveal-on-scroll for sections
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(el => io.observe(el));
    }
  }
});

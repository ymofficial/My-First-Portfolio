// Skill bar animation on scroll into view
function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-bar');
  skillBars.forEach(bar => {
    if (bar.getAttribute('data-animated')) return;
    const fill = bar.querySelector('.bar-fill');
    const percent = bar.querySelector('.skill-percent');
    const target = parseInt(bar.getAttribute('data-level'), 10);
    let current = 0;
    fill.style.width = '0%';
    percent.innerText = '0%';
    percent.style.left = '10px';
    const animate = () => {
      if (current < target) {
        current++;
        fill.style.width = current + '%';
        percent.innerText = current + '%';
        percent.style.left = `calc(${current}% - 18px)`;
        requestAnimationFrame(animate);
      } else {
        fill.style.width = target + '%';
        percent.innerText = target + '%';
        percent.style.left = `calc(${target}% - 18px)`;
      }
    };
    setTimeout(animate, 400 + Math.random() * 400);
    bar.setAttribute('data-animated', 'true');
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.2
  );
}

function checkAndAnimateSkills() {
  const aboutSection = document.querySelector('.about');
  if (aboutSection && isElementInViewport(aboutSection)) {
    animateSkills();
    window.removeEventListener('scroll', checkAndAnimateSkills);
  }
}

window.addEventListener('scroll', checkAndAnimateSkills);
window.addEventListener('DOMContentLoaded', checkAndAnimateSkills);
const fadeInElements = document.querySelectorAll(".landing__trial-fade-in");

function obCallback(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}

const observer = new IntersectionObserver(obCallback, { threshold: 0.7 });
fadeInElements.forEach(fadeInElement => observer.observe(fadeInElement));

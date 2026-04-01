// ===============================
// GLOBAL INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSmoothScroll();
  initScrollReveal();
  initCounter();
  initTyping();
  initTilt();
  initCanvas();
  initResumeDownload();
});

// ===============================
// NAVBAR SCROLL + TOGGLE
// ===============================
function initNav() {
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });

  // Active link highlight
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (pageYOffset >= top) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// ===============================
// SMOOTH SCROLL
// ===============================
function initSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ===============================
// SCROLL REVEAL
// ===============================
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // reveal children stagger
        const children = entry.target.querySelectorAll(".reveal-child");
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add("visible");
          }, i * 120);
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal-section").forEach(sec => {
    observer.observe(sec);
  });
}

// ===============================
// COUNTER ANIMATION
// ===============================
function initCounter() {
  const counters = document.querySelectorAll(".stat-num");

  const run = (counter) => {
    const target = +counter.getAttribute("data-count");
    let count = 0;
    const step = target / 80;

    const update = () => {
      count += step;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}

// ===============================
// TYPING EFFECT
// ===============================
function initTyping() {
  const text = "IT Student / Developer / AI Enthusiast";
  const el = document.getElementById("roleTyper");

  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}

// ===============================
// 3D TILT EFFECT
// ===============================
function initTilt() {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateX = ((y - midY) / midY) * 6;
      const rotateY = ((x - midX) / midX) * -6;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });
}

// ===============================
// NEURAL CANVAS BACKGROUND
// ===============================
function initCanvas() {
  const canvas = document.getElementById("neuralCanvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const count = 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function initResumeDownload() {
  const buttons = document.querySelectorAll("#resumeDownloadBtn, #resumeContactBtn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const originalText = btn.innerHTML;

      if (btn.id === "resumeDownloadBtn") {
        btn.innerHTML = "Downloading...";
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 1800);
      }
    });
  });
}

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#00f5ff";
      ctx.fill();
    });

    // connect lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = "rgba(0,245,255,0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}
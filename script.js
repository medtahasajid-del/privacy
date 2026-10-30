/* ═══════════════════════════════════════════════
   SAJID PORTFOLIO — script.js
   Three.js 3D Particles + Terminal Typing + Animations
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Lucide Icons ──
  if (window.lucide) lucide.createIcons();

  // ── 2. Curtain Reveal ──
  setTimeout(() => document.body.classList.add('loaded'), 120);

  // ── 3. VanillaTilt on skill cards ──
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 6, speed: 400, glare: true, 'max-glare': 0.08, scale: 1.02
    });
  }

  // ── 4. Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const isLight = document.documentElement.classList.contains('light');
    if (window.scrollY > 50) {
      navbar.style.background = isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,10,0.92)';
    } else {
      navbar.style.background = isLight ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,10,0.8)';
    }
  }, { passive: true });

  // ── 5. Mobile Menu ──
  const hamBtn = document.getElementById('hamburger');
  if (hamBtn) hamBtn.addEventListener('click', toggleMobileMenu);

  // ── 5b. Theme Toggle ──
  initThemeToggle();

  // ── 6. Terminal Typing Animation ──
  startTerminalTyping();

  // ── 7. Three.js 3D Particle Cloud behind laptop ──
  initParticles();

  // ── 8. Laptop hover interaction with mouse ──
  initLaptopParallax();

  // ── 9. Scroll Reveal ──
  initScrollReveal();
});

// ═══════════════════════════════════
// THEME TOGGLE (EXPANDING RIPPLE FROM BUTTON)
// ═══════════════════════════════════
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
  
  // Check localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      const isLight = document.documentElement.classList.contains('light');
      const targetTheme = isLight ? 'dark' : 'light';
      triggerCircularRippleTransition(e, targetTheme);
    });
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      const isLight = document.documentElement.classList.contains('light');
      const targetTheme = isLight ? 'dark' : 'light';
      triggerCircularRippleTransition(e, targetTheme);
    });
  }
}

// ── Transition circulaire qui commence depuis le bouton et envahit l'écran ──
function triggerCircularRippleTransition(event, targetTheme) {
  const x = event.clientX || window.innerWidth - 80;
  const y = event.clientY || 40;

  // Calcul du rayon maximal pour couvrir tout l'écran depuis le clic
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 1. Si l'API moderne document.startViewTransition est supportée (Chrome/Edge/Opera)
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      setTheme(targetTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
    return;
  }

  // 2. Fallback universel (Firefox, Safari, etc.) avec cercle animé injecté
  const circle = document.createElement('div');
  circle.className = 'theme-ripple-circle';
  const size = maxRadius * 2.2;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.background = targetTheme === 'dark' ? '#0a0a0a' : '#fcfcfd';

  document.body.appendChild(circle);

  // Forcer le reflow
  circle.getBoundingClientRect();
  circle.classList.add('expanding');

  setTimeout(() => {
    setTheme(targetTheme);
    circle.classList.add('fade-out');
    setTimeout(() => circle.remove(), 350);
  }, 450);
}

function setTheme(theme) {
  const root = document.documentElement;
  const navbar = document.getElementById('navbar');
  const toggleLabel = document.querySelector('.theme-toggle-label');
  
  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
    if (toggleLabel) toggleLabel.textContent = 'Noir';
    if (navbar) {
      navbar.style.background = window.scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)';
    }
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    if (toggleLabel) toggleLabel.textContent = 'Blanc';
    if (navbar) {
      navbar.style.background = window.scrollY > 50 ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.8)';
    }
  }
}

// ═══════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}
function closeMobile() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

// ═══════════════════════════════════
// TERMINAL TYPING ANIMATION
// ═══════════════════════════════════
function startTerminalTyping() {
  const el = document.getElementById('typing-cmd');
  if (!el) return;

  const commands = [
    'ftk-imager --acquire /dev/sda1 --format raw',
    'wazuh-logcollector --analyze /var/log/auth.log',
    'python3 exploit_scanner.py --target 10.0.0.0/24',
    'suricata-update && suricata -T -c /etc/suricata/suricata.yaml',
    'nmap -sS -sV -O --script vuln 192.168.1.0/24',
    'cowrie stop && cowrie start --config /opt/cowrie/cowrie.cfg',
    'grep "ALERT" /var/log/suricata/fast.log | tail -20',
    'ssh-audit --policy hardened.policy server.local',
  ];

  let cmdIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = commands[cmdIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 45 + Math.random() * 35);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        cmdIdx = (cmdIdx + 1) % commands.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 25);
    }
  }

  setTimeout(type, 1800);
}

// ═══════════════════════════════════
// THREE.JS — Floating Particle Network
// ═══════════════════════════════════
function initParticles() {
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('pc-3d-container');
  if (!container) return;

  const w = container.clientWidth || 500;
  const h = container.clientHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Particles on sphere surface ──
  const COUNT = 200;
  const RADIUS = 2.8;
  const positions = [];
  const colors = [];

  const cCyan  = new THREE.Color(0x22d3ee);
  const cPurp  = new THREE.Color(0xa78bfa);
  const cGreen = new THREE.Color(0x10b981);
  const cRed   = new THREE.Color(0xf87171);
  const palette = [cCyan, cPurp, cGreen, cRed];

  // Fibonacci sphere
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / COUNT);
    const p = 2 * Math.PI * i / phi;
    const x = RADIUS * Math.sin(theta) * Math.cos(p);
    const y = RADIUS * Math.sin(theta) * Math.sin(p);
    const z = RADIUS * Math.cos(theta);
    positions.push(x, y, z);

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // ── Connection Lines ──
  const MAX_DIST = 0.85;
  const linePos = [];
  for (let a = 0; a < COUNT; a++) {
    for (let b = a + 1; b < COUNT; b++) {
      const dx = positions[a*3]   - positions[b*3];
      const dy = positions[a*3+1] - positions[b*3+1];
      const dz = positions[a*3+2] - positions[b*3+2];
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < MAX_DIST) {
        linePos.push(
          positions[a*3], positions[a*3+1], positions[a*3+2],
          positions[b*3], positions[b*3+1], positions[b*3+2]
        );
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.08,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // ── Outer ring ──
  const ringGeo = new THREE.TorusGeometry(RADIUS + 0.5, 0.008, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.1 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  // Mouse
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
    my = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  // Resize
  const onResize = () => {
    const nw = container.clientWidth || 500;
    const nh = container.clientHeight || 500;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Animate
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    points.rotation.y += 0.0015;
    points.rotation.x += 0.0005;
    lines.rotation.y = points.rotation.y;
    lines.rotation.x = points.rotation.x;

    ring.rotation.z += 0.003;

    // Mouse influence
    points.rotation.y += (mx * 0.4 - points.rotation.y) * 0.008;
    points.rotation.x += (-my * 0.3 - points.rotation.x) * 0.008;

    // Breathing opacity
    mat.opacity = 0.55 + 0.2 * Math.sin(frame * 0.012);
    lineMat.opacity = 0.06 + 0.04 * Math.sin(frame * 0.015);

    renderer.render(scene, camera);
  }
  animate();
}

// ═══════════════════════════════════
// LAPTOP PARALLAX ON MOUSE MOVE
// ═══════════════════════════════════
function initLaptopParallax() {
  const laptop = document.getElementById('laptop3d');
  if (!laptop) return;

  const heroSection = document.getElementById('hero');

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;

    const ry = -12 + cx * 18;
    const rx = 5 - cy * 10;

    laptop.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    laptop.style.transform = 'rotateY(-12deg) rotateX(5deg)';
  });
}

// ═══════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.skill-card, .bento-card, .tl-item, .section-top, .contact-heading, .contact-box'
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => observer.observe(el));
}

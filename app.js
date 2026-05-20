/* ======================================================
   CONFIGURATION — paste your YouTube links here
   Replace each VIDEO_URL_X with your YouTube embed URL.
   
   How to get the embed URL from a YouTube video:
   Regular link:  https://www.youtube.com/watch?v=XXXXXXXXXXX
   Embed link:    https://www.youtube.com/embed/XXXXXXXXXXX
   (just swap "watch?v=" for "embed/")
   ====================================================== */
const VIDEOS = [
  {
    from: "A message from Anshika from B-7??",
    url:  "https://www.youtube.com/embed/om9sNzUwO8Q"
  },
  {
    from: "A message from SAMVRUTHTTHTH from dmart miyapur",
    url:  "https://www.youtube.com/embed/FrBujkTMzSE"
  },
  {
    from: "A message from Laasya from priya meka",
    url:  "https://www.youtube.com/embed/wiA2DU4J8U8"
  },
  {
    from: "A message from Mridini 96 chemistry",
    url:  "https://www.youtube.com/embed/VJK3cnmc9D4"
  },
  {
    from: "A message from Yashaswin from banglore",
    url:  "https://www.youtube.com/embed/emRCXSlxBO0"
  },
  {
    from: "A message from random person",
    url:  "https://www.youtube.com/embed/VIDEO_URL_6"
  }
];

/* ===== STAR FIELD ===== */
(function initStars() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let W, H, stars;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    const count = Math.floor((W * H) / 3200);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,190,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ===== FLOATING PARTICLES ===== */
(function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#7c6ffa','#a97df5','#c084fc','#5cb8ff','#4b2fcf'];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 14 + 8;
    const delay = Math.random() * 12;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    container.appendChild(p);
  }
})();

/* ===== KEYBOARD SUPPORT FOR ATOMS ===== */
document.querySelectorAll('.atom').forEach((atom, i) => {
  atom.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openVideo(i);
    }
  });
});

/* ===== VIDEO MODAL ===== */
const modal     = document.getElementById('modal');
const frame     = document.getElementById('video-frame');
const fromLabel = document.getElementById('modal-from');

function openVideo(index) {
  const v = VIDEOS[index];
  if (!v) return;

  fromLabel.textContent = v.from;
  frame.src = v.url + '?autoplay=1&rel=0';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Ripple effect on the clicked atom
  const atom = document.querySelector(`.atom[data-index="${index}"]`);
  if (atom) {
    atom.classList.add('clicked');
    setTimeout(() => atom.classList.remove('clicked'), 600);
  }
}

function closeVideo() {
  modal.classList.remove('open');
  frame.src = '';
  document.body.style.overflow = '';
}

function closeOnOverlay(e) {
  if (e.target === modal) closeVideo();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideo();
});

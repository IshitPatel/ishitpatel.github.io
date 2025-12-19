// main.js
// Main site JS as an ES module. Move interactive logic here.

// Placeholder for more advanced JS (smooth scroll, section highlights, etc.)
console.log('Portfolio main module loaded.');

// Example: add a simple scrollspy that highlights nav links
function activateScrollSpy() {
  const nav = document.getElementById('navbar') || document.querySelector('#nav-placeholder nav');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  function onScroll() {
    const pos = window.scrollY + 120;
    let idx = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop > pos) { idx = i - 1; break; }
    }
    links.forEach(l => l.classList.remove('active'));
    if (idx >= 0 && links[idx]) links[idx].classList.add('active');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Run after small delay to allow injected nav to exist
setTimeout(activateScrollSpy, 150);

// --- Project modal logic ---
const PROJECT_META = {
  summarizer: {
    title: 'LLM-Powered Summarization Tool',
    desc: 'Fine-tuned T5 on 10,000+ documents producing a 23% ROUGE-L improvement. Production deployment used async batching and a Flask API for low-latency summarization.',
    tech: ['Python','Hugging Face','PyTorch','Flask'],
    links: [{label:'Repository', href:'https://github.com/IshitPatel/'}]
  },
  minicity: {
    title: "ECCV'20 MiniCity Segmentation",
    desc: 'Hourglass autoencoders for city-scene segmentation. Improved accuracy and inference throughput; used extensive augmentation and synthetic data.',
    tech: ['PyTorch','OpenCV','CUDA'],
    links: [{label:'Github', href:'https://github.com/IshitPatel/Minicity-Segmentation'}]
  },
  teachmefinance: {
    title: 'TeachMeFinance',
    desc: 'LLM-based financial education chatbot that runs locally via Ollama, optimized for prompt pipelines and retrieval-augmented responses.',
    tech: ['LLM','Ollama','Node'],
    links: [{label:'Github', href:'https://github.com/IshitPatel/TeachMeFinance'}]
  }
};

function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const titleEl = modal.querySelector('#modal-title');
  const descEl = modal.querySelector('#modal-desc');
  const techEl = modal.querySelector('#modal-tech');
  const linksEl = modal.querySelector('#modal-links');
  const closeBtn = modal.querySelector('.modal-close');

  function open(id) {
    const meta = PROJECT_META[id];
    if (!meta) return;
    titleEl.textContent = meta.title;
    descEl.textContent = meta.desc;
    techEl.innerHTML = '';
    meta.tech.forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      techEl.appendChild(s);
    });
    linksEl.innerHTML = '';
    meta.links.forEach(l => {
      const a = document.createElement('a');
      a.className = 'btn';
      a.href = l.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = l.label;
      linksEl.appendChild(a);
    });

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus trap simple
    closeBtn.focus();
  }

  function close() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const openId = e.target.closest('[data-open]')?.getAttribute('data-open');
    if (openId) return open(openId);
    if (e.target.closest('.modal-close')) return close();
    if (e.target === modal) return close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close();
  });
}

// init after DOM ready
setTimeout(setupProjectModal, 200);

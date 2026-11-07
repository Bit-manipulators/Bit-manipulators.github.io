/**
 * Bit Manipulators — Official Website Interactive Engine
 * Core Logic: Canvas Particles, Terminal CLI Simulator, GitHub API Sync, Modals, Filter
 */

// ==========================================
// 1. DATA REPOSITORY & SPECIFICATIONS
// ==========================================
const ORG_DATA = {
  name: "Bit Manipulators",
  tagline: "Bending bits, unleashing mobile hardware, and engineering zero-trust systems.",
  location: "India",
  github: "https://github.com/Bit-manipulators",
  repos: [
    {
      id: "open-android-dex",
      name: "Open Android DeX",
      category: "systems",
      license: "GPL-3.0",
      stars: 25,
      description: "True multi-window desktop workstation for Linux (Wayland & X11) powered by personal Android devices with 60 FPS in-process FFmpeg video decoding.",
      tech: ["Flutter Desktop", "Python GTK4", "C++", "FFmpeg", "Wayland / X11", "ADB Protocol"],
      url: "https://github.com/Bit-manipulators/open-android-dex",
      image: "assets/images/dex-desktop.jpg",
      screenshot: "assets/images/dex-screenshot.png",
      badge: "Desktop Compositor",
      status: "Active Production",
      highlights: [
        "8-way dynamic window resizing with geometry persistence",
        "Z-index elevation, focus switching & drop shadow layering",
        "Hardware-accelerated in-process 60 FPS FFmpeg decoding directly from scrcpy",
        "DeX taskbar with 9-dot launcher, volume stepping & app drawer",
        "Dual compositor architecture: Flutter Compositor + GTK4 fallback"
      ],
      quickStart: "git clone https://github.com/Bit-manipulators/open-android-dex.git\ncd open-android-dex\n./scripts/dev_bootstrap.sh --check-deps"
    },
    {
      id: "DevLense",
      name: "DevLens",
      category: "ai-devtools",
      license: "MIT",
      stars: 5,
      description: "Intelligent on-the-go code debugger, camera OCR code ingestor, and zero-trust Docker execution sandbox with deterministic heuristic fallbacks.",
      tech: ["FastAPI 0.115+", "React Native / Expo", "Docker Micro-Sandboxes", "Python 3.12+", "TypeScript", "Ollama LLM"],
      url: "https://github.com/Bit-manipulators/DevLense",
      image: "assets/images/org-logo.png",
      screenshot: "assets/images/org-logo.png",
      badge: "Zero-Trust Sandbox",
      status: "Active Production",
      highlights: [
        "Ephemeral container sandbox with --net=none, read-only rootfs & 256MB cap",
        "In-memory camera OCR for instant screen code capture without disk retention",
        "Multi-language heuristic static analysis across Python, JS, C++, and Java",
        "Interactive AI copilot with automated test suites & one-tap diff repairs",
        "Asynchronous FastAPI backend with token-bucket rate limiting"
      ],
      quickStart: "git clone https://github.com/Bit-manipulators/DevLense.git\ncd DevLense/backend\ndocker compose up --build"
    },
    {
      id: "App_pulse",
      name: "AppPulse",
      category: "mobile",
      license: "MIT",
      stars: 4,
      description: "Privacy-first Android 15 health & impact manager delivering reproducible mathematical scores for battery, storage, and permissions with 0% data egress.",
      tech: ["Kotlin 2.0", "Jetpack Compose", "Material 3", "Android 15 (API 35)", "Room / SQLite", "Coroutines"],
      url: "https://github.com/Bit-manipulators/App_pulse",
      image: "assets/images/apppulse-dashboard.png",
      screenshot: "assets/images/apppulse-diagnostics.png",
      badge: "Android Vitality",
      status: "Active Production",
      highlights: [
        "100% on-device telemetry — zero network egress or ad server beacons",
        "Deterministic mathematical health formulas replacing deceptive cleaner tricks",
        "Granular permission auditing: Camera, Mic, Background Location & Contacts",
        "Stealth and potential stalkerware heuristic detection engine",
        "Non-destructive actions guiding directly to native Android system sheets"
      ],
      quickStart: "git clone https://github.com/Bit-manipulators/App_pulse.git\ncd App_pulse\n./gradlew assembleDebug"
    },
    {
      id: "open-android-dex-website",
      name: "Open Android DeX Web Portal",
      category: "systems",
      license: "GPL-3.0",
      stars: 1,
      description: "Official companion portal and documentation hub for Open Android DeX, featuring installation guides, hardware compatibility lists, and release downloads.",
      tech: ["HTML5", "Modern CSS", "JavaScript", "Markdown Docs"],
      url: "https://github.com/Bit-manipulators/open-android-dex-website",
      image: "assets/images/dex-screenshot.png",
      screenshot: "assets/images/dex-screenshot.png",
      badge: "Portal & Docs",
      status: "Companion Hub",
      highlights: [
        "Comprehensive documentation for Flutter and GTK4 compositor configurations",
        "Hardware compatibility database for Android 10-16 devices",
        "Interactive display setup guides for Wayland and X11"
      ],
      quickStart: "git clone https://github.com/Bit-manipulators/open-android-dex-website.git"
    },
    {
      id: "github-community",
      name: ".github Community Hub",
      category: "community",
      license: "MIT / GPL-3.0",
      stars: 2,
      description: "Organization-wide engineering policies, zero-trust security disclosure standards, code of conduct, and contributor governance workflows.",
      tech: ["Community Health", "Security Disclosure", "CI/CD Workflows"],
      url: "https://github.com/Bit-manipulators/.github",
      image: "assets/images/org-logo.png",
      screenshot: "assets/images/org-logo.png",
      badge: "Governance",
      status: "Standards Hub",
      highlights: [
        "Clean-room engineering provenance guidelines",
        "Responsible security disclosure framework (SECURITY.md)",
        "Inclusive, respectful community code of conduct"
      ],
      quickStart: "git clone https://github.com/Bit-manipulators/.github.git"
    }
  ],
  maintainers: [
    {
      name: "Aditya R. Satapathy",
      handle: "@Myparadox-creator",
      role: "Core Maintainer & Systems Architect",
      bio: "Focusing on Linux desktop compositing, Wayland/X11 protocols, reverse engineering, and low-latency display streaming pipelines.",
      avatar: "assets/images/avatar-aditya.png",
      github: "https://github.com/Myparadox-creator",
      portfolio: "https://portfolio-murex-psi-74.vercel.app/"
    },
    {
      name: "Anurag Patel",
      handle: "@anurag200513",
      role: "Founder & Lead Developer",
      bio: "Architecting zero-trust mobile sandboxes, on-device AI copilot diagnostics, deterministic metrics, and organizational technical direction.",
      avatar: "assets/images/avatar-anurag.png",
      github: "https://github.com/anurag200513",
      email: "mailto:2005anuragpatel@gmail.com"
    },
    {
      name: "Amit Padhan",
      handle: "@amitpadhan525",
      role: "Core Maintainer & Systems / Full-Stack Engineer",
      bio: "Arch Linux specialist, Bash/Python automation architect, Linux internals researcher, and cybersecurity lab engineer.",
      avatar: "assets/images/avatar-amit.png",
      github: "https://github.com/amitpadhan525",
      portfolio: "https://amitpadhan525.github.io/"
    }
  ]
};

// ==========================================
// 2. INTERACTIVE PARTICLES & BIT STREAM CANVAS
// ==========================================
class CyberCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.bits = [];
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.width = 0;
    this.height = 0;
    this.animationId = null;

    this.init();
    this.setupEvents();
    this.loop();
  }

  init() {
    this.resize();
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 75);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(139, 92, 246, '
      });
    }

    // Floating digital bits (0 and 1)
    this.bits = [];
    for (let i = 0; i < 24; i++) {
      this.bits.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vy: - (Math.random() * 0.35 + 0.15),
        val: Math.random() > 0.5 ? '1' : '0',
        alpha: Math.random() * 0.35 + 0.1,
        size: Math.floor(Math.random() * 4) + 10
      });
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  setupEvents() {
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render floating binary bits
    this.ctx.font = '12px "JetBrains Mono", monospace';
    for (let bit of this.bits) {
      this.ctx.fillStyle = `rgba(0, 240, 255, ${bit.alpha})`;
      this.ctx.fillText(bit.val, bit.x, bit.y);
      bit.y += bit.vy;
      if (bit.y < 0) {
        bit.y = this.height + 10;
        bit.x = Math.random() * this.width;
      }
    }

    // Update and draw nodes
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interactivity
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        p.x -= (dx / dist) * 0.7;
        p.y -= (dy / dist) * 0.7;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + '0.7)';
      this.ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 120) {
          const alpha = (1 - dist2 / 120) * 0.22;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.loop());
  }
}

// ==========================================
// 3. INTERACTIVE TERMINAL CLI SIMULATOR
// ==========================================
class TerminalSimulator {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    if (!this.container || !this.input) return;

    this.history = [];
    this.historyIndex = -1;
    this.initWelcome();
    this.bindEvents();
  }

  initWelcome() {
    this.print([
      `<span style="color:#00f0ff; font-weight:bold;">===================================================================</span>`,
      `<span style="color:#00f0ff; font-weight:bold;">   ⚡ BIT MANIPULATORS — SYSTEMS & KERNEL EXPLORER v1.0.4</span>`,
      `<span style="color:#94a3b8;">   "Bending bits, unleashing mobile hardware, engineering zero-trust."</span>`,
      `<span style="color:#00f0ff; font-weight:bold;">===================================================================</span>`,
      `Type <span style="color:#38bdf8; font-weight:bold;">'help'</span> to view available system commands or click chips below.`
    ].join('\n'));
  }

  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
        e.preventDefault();
      }
    });

    // Delegate chip clicks
    document.querySelectorAll('.cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          this.execute(cmd);
          this.input.focus();
        }
      });
    });
  }

  print(html, isCommand = false, commandStr = '') {
    const entry = document.createElement('div');
    if (isCommand) {
      entry.innerHTML = `<span class="terminal-prompt">guest@bit-manipulators:~$</span> <span class="terminal-command">${this.escape(commandStr)}</span>`;
    }
    const output = document.createElement('div');
    output.className = 'terminal-output';
    output.innerHTML = html;
    this.container.appendChild(entry);
    this.container.appendChild(output);
    this.container.scrollTop = this.container.scrollHeight;
  }

  escape(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  execute(rawCmd) {
    const cleanCmd = rawCmd.trim();
    const parts = cleanCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = [
          `<span style="color:#00f0ff;">AVAILABLE COMMANDS:</span>`,
          `  <span style="color:#38bdf8;">about</span>               Display collective manifesto & engineering vision`,
          `  <span style="color:#38bdf8;">projects</span>            List all 6 repositories with stars and status`,
          `  <span style="color:#38bdf8;">dex --status</span>        Diagnose Open Android DeX compositor & ADB link`,
          `  <span style="color:#38bdf8;">devlens --audit</span>     Simulate zero-trust Docker sandbox execution`,
          `  <span style="color:#38bdf8;">apppulse --telemetry</span> Run deterministic on-device vitality audit`,
          `  <span style="color:#38bdf8;">team</span>                List core maintainers and architectural leads`,
          `  <span style="color:#38bdf8;">stack</span>               Inspect organization technology matrix`,
          `  <span style="color:#38bdf8;">matrix</span>              Trigger cybernetic bit stream cascade`,
          `  <span style="color:#38bdf8;">clear</span>               Clear terminal screen buffer`
        ].join('\n');
        break;

      case 'about':
        output = [
          `<span style="color:#38bdf8; font-weight:bold;">⚡ BIT MANIPULATORS OPEN-SOURCE COLLECTIVE</span>`,
          `Location: India | Founded: Sept 2026 | Licenses: GPL-3.0 & MIT`,
          `We are an engineering collective dedicated to pushing modern hardware to its limits.`,
          `We bridge mobile computing with desktop workstations, craft zero-trust developer`,
          `sandboxes with on-the-go AI diagnostics, and build deterministic Android systems`,
          `where <span style="color:#10b981; font-weight:bold;">100% of telemetry stays on-device</span>.`
        ].join('\n');
        break;

      case 'projects':
        output = [
          `<span style="color:#00f0ff;">ORGANIZATION PRODUCTION REPOSITORIES:</span>`,
          `  [1] <span style="color:#38bdf8; font-weight:bold;">open-android-dex</span>      ⭐ 25+ | GPL-3.0 | Linux Multi-Window Desktop Shell`,
          `  [2] <span style="color:#38bdf8; font-weight:bold;">DevLense</span>              ⭐ 5   | MIT     | Zero-Trust Mobile AI Code Debugger`,
          `  [3] <span style="color:#38bdf8; font-weight:bold;">App_pulse</span>             ⭐ 4   | MIT     | Privacy-First Android Health Manager`,
          `  [4] <span style="color:#94a3b8;">open-android-dex-website</span> | GPL-3.0 | Documentation & Compatibility Portal`,
          `  [5] <span style="color:#94a3b8;">.github</span>                 | Health  | Community Standards & Security Policy`,
          `  [6] <span style="color:#94a3b8;">Bit-manipulators.github.io</span> | Live   | Official Organization Web Gateway`
        ].join('\n');
        break;

      case 'dex':
        output = [
          `<span style="color:#00f0ff;">[OPEN ANDROID DEX DIAGNOSTIC PROBE]</span>`,
          `[✓] Android Subsystem: Connected via ADB Server (Target API 29-36)`,
          `[✓] Virtual Display Pipeline: Initialized (1920x1080 @ 60 Hz)`,
          `[✓] Compositor Engine: Flutter Desktop (Primary) / GTK4 (Fallback)`,
          `[✓] Video Ingestion: Headless Scrcpy Pipe -> FFmpeg In-Process GPU Texture`,
          `[✓] Input Mapping: X11 / Wayland Pointer & Keyboard Passthrough Active`,
          `Latency: <span style="color:#10b981; font-weight:bold;">12.4ms (Glass-to-Glass)</span> | Memory Footprint: ~68MB`
        ].join('\n');
        break;

      case 'devlens':
        output = [
          `<span style="color:#00f0ff;">[DEVLENS ZERO-TRUST SANDBOX RUNTIME]</span>`,
          `[1] Ingestion: Screen / Camera OCR In-Memory Text Extraction (No Disk Write)`,
          `[2] Static Heuristics: Checking AST for syntax and logical bounds... Passed.`,
          `[3] Container Provisioning: Spawning micro-sandbox...`,
          `    - Network Isolation: <span style="color:#10b981;">--net=none</span> (Severed)`,
          `    - Root Filesystem:   <span style="color:#10b981;">--read-only</span>`,
          `    - Memory Ceiling:    <span style="color:#10b981;">256MB Cap</span>`,
          `    - Capabilities:      <span style="color:#10b981;">DROPPED (CAP_SYS_ADMIN, RAW_IO)</span>`,
          `[✓] Safe execution verified in 0.42s without host exposure.`
        ].join('\n');
        break;

      case 'apppulse':
        output = [
          `<span style="color:#00f0ff;">[APPPULSE DETERMINISTIC HEALTH SCAN]</span>`,
          `Auditing Device Telemetry (Encrypted Local SQLite / Room):`,
          `  • RAM Vitality:      Used 3.8GB / 8.0GB (Headroom: 52% [OPTIMAL])`,
          `  • Storage Wear:      112GB / 256GB (Healthy SSD block distribution)`,
          `  • Sensitive Permissions: Camera (3 apps), Mic (2 apps), BG Location (1 app)`,
          `  • Stalkerware Score: <span style="color:#10b981;">0 Flags (No stealth packages found)</span>`,
          `  • Overall Vitality:  <span style="color:#10b981; font-weight:bold;">94 / 100 [OPTIMAL]</span>`,
          `  • Telemetry Egress:  <span style="color:#10b981; font-weight:bold;">0 BYTES (100% On-Device)</span>`
        ].join('\n');
        break;

      case 'team':
        output = [
          `<span style="color:#00f0ff;">CORE MAINTAINERS & LEADERSHIP:</span>`,
          `  👤 <span style="color:#f8fafc; font-weight:bold;">Aditya R. Satapathy</span> (@Myparadox-creator)`,
          `     Role: Systems Architect | Focus: Linux Compositors & Display Streams`,
          `  👤 <span style="color:#f8fafc; font-weight:bold;">Anurag Patel</span> (@anurag200513)`,
          `     Role: Founder & Lead Developer | Focus: Zero-Trust Mobile Systems & AI`,
          `  👤 <span style="color:#f8fafc; font-weight:bold;">Amit Padhan</span> (@amitpadhan525)`,
          `     Role: Core Maintainer | Focus: Arch Linux, Automation, Cybersecurity`
        ].join('\n');
        break;

      case 'stack':
        output = [
          `<span style="color:#00f0ff;">TECHNOLOGY MATRIX:</span>`,
          `  • Systems:   Linux (Wayland & X11), ADB Protocols, Scrcpy, FFmpeg, C++`,
          `  • Mobile:    Flutter Desktop, Jetpack Compose (Material 3), React Native, Expo`,
          `  • Languages: Dart, Kotlin, Python 3.12+, TypeScript, Modern C++, Bash`,
          `  • Backend:   FastAPI 0.115+, Ephemeral Docker Containers, SQLite / Room`,
          `  • Quality:   GitHub Actions, Pytest, Detekt, Vitest, Dev Containers`
        ].join('\n');
        break;

      case 'matrix':
        output = `<span style="color:#10b981;">01000010 01101001 01110100 00100000 01001101 01100001 01101110 01101001 01110000 01110101 01101100 01100001 01110100 01101111 01110010 01110011</span>\n` +
                 `<span style="color:#00f0ff;">[CYBER BIT STREAM UNLEASHED] System running in hyper-deterministic mode.</span>`;
        break;

      case 'clear':
        this.container.innerHTML = '';
        return;

      default:
        output = `<span style="color:#ef4444;">Command not recognized: '${this.escape(cleanCmd)}'. Type 'help' for documentation.</span>`;
        break;
    }

    this.print(output, true, rawCmd);
  }
}

// ==========================================
// 4. LIVE GITHUB METRICS SYNCHRONIZATION
// ==========================================
async function syncGitHubMetrics() {
  const cacheKey = 'bm_gh_metrics_cache';
  const cacheTimeKey = 'bm_gh_metrics_time';
  const now = Date.now();
  const cachedTime = localStorage.getItem(cacheTimeKey);
  const cachedData = localStorage.getItem(cacheKey);

  // If cache is fresh (< 15 min), apply cached values
  if (cachedTime && cachedData && (now - parseInt(cachedTime)) < 15 * 60 * 1000) {
    try {
      applyMetrics(JSON.parse(cachedData));
      return;
    } catch (e) {
      console.warn("Metrics cache parse failure", e);
    }
  }

  try {
    const reposRes = await fetch('https://api.github.com/orgs/Bit-manipulators/repos?per_page=100');
    if (!reposRes.ok) throw new Error(`HTTP ${reposRes.status}`);
    const repos = await reposRes.json();

    let totalStars = 0;
    let totalForks = 0;
    const repoStars = {};

    repos.forEach(repo => {
      totalStars += (repo.stargazers_count || 0);
      totalForks += (repo.forks_count || 0);
      repoStars[repo.name] = repo.stargazers_count || 0;
    });

    const metrics = { totalStars, totalForks, repoCount: repos.length, repoStars };
    localStorage.setItem(cacheKey, JSON.stringify(metrics));
    localStorage.setItem(cacheTimeKey, now.toString());
    applyMetrics(metrics);
  } catch (err) {
    console.info("Using baseline organization metrics (offline or rate-limited):", err.message);
    applyMetrics({
      totalStars: 29,
      totalForks: 4,
      repoCount: 6,
      repoStars: { "open-android-dex": 25, "DevLense": 2, "App_pulse": 2 }
    });
  }
}

function applyMetrics(data) {
  const starEls = document.querySelectorAll('.gh-stars-count');
  starEls.forEach(el => {
    el.textContent = `${data.totalStars}+`;
  });

  const repoCountEls = document.querySelectorAll('.gh-repos-count');
  repoCountEls.forEach(el => {
    el.textContent = `${data.repoCount || 6}`;
  });

  // Apply to individual project cards if present
  if (data.repoStars) {
    Object.keys(data.repoStars).forEach(repoName => {
      const el = document.getElementById(`stars-${repoName}`);
      if (el) {
        el.textContent = `★ ${data.repoStars[repoName]}`;
      }
    });
  }
}

// ==========================================
// 5. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:#00f0ff;">⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// 6. PROJECT MODAL DEEP DIVE
// ==========================================
function openProjectModal(projectId) {
  const project = ORG_DATA.repos.find(r => r.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const content = document.getElementById('modalBody');

  if (!modal || !title || !content) return;

  title.textContent = project.name;
  subtitle.textContent = `${project.badge} • ${project.license} License`;

  content.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(56, 189, 248, 0.2); max-height: 380px;">
        <img src="${project.screenshot}" alt="${project.name}" style="width: 100%; height: auto; object-fit: contain; background: #000;" />
      </div>

      <div>
        <h4 style="color: #00f0ff; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">System Overview</h4>
        <p style="color: #cbd5e1; line-height: 1.6;">${project.description}</p>
      </div>

      <div>
        <h4 style="color: #00f0ff; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">Architectural Highlights</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
          ${project.highlights.map(h => `<li style="display:flex; align-items:flex-start; gap:0.5rem; color:#94a3b8;"><span style="color:#10b981;">✓</span> <span>${h}</span></li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="color: #00f0ff; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${project.tech.map(t => `<span class="status-pill info">${t}</span>`).join('')}
        </div>
      </div>

      <div>
        <h4 style="color: #00f0ff; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">Quick Bootstrap Command</h4>
        <div class="code-box">
          <code>${project.quickStart.replace(/\n/g, '<br/>')}</code>
          <button class="copy-btn" onclick="navigator.clipboard.writeText('${project.quickStart.replace(/'/g, "\\'")}'); showToast('Command copied to clipboard!');">
            📋
          </button>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary" style="flex: 1; text-align: center;">
          View Repository on GitHub ↗
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================
// 7. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas
  new CyberCanvas('cyberCanvas');

  // 2. Initialize Terminal
  new TerminalSimulator('terminalOutput', 'terminalInput');

  // 3. Sync GitHub Data
  syncGitHubMetrics();

  // 4. Modal listeners
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // 5. Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'border-cyan-400', 'text-cyan-400'));
      btn.classList.add('active', 'border-cyan-400', 'text-cyan-400');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Search Bar Realtime Filter
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      projectCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 7. Mobile Navbar Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 8. Clipboard Copy Handlers for code elements
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent.trim()).then(() => {
          showToast('Code copied to clipboard!');
        });
      }
    });
  });
});

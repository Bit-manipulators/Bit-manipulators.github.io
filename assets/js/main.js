/**
 * Bit Manipulators — Official Website Interactive Engine
 * Core Modules:
 * 1. CyberAudio (Web Audio API Synthesizer)
 * 2. CyberCanvas (Reactive Matrix & Particle Stream)
 * 3. DeXSimulator (Interactive Draggable Multi-Window Android Desktop)
 * 4. DevLensPlayground (Interactive Static Analyzer & 1-Tap Diff Repair)
 * 5. AppPulseCalculator (Deterministic Vitality Scoring Simulator)
 * 6. PipelineFlow (Interactive Architecture Diagram Explorer)
 * 7. TerminalSimulator (In-Browser CLI with Command History & Sound)
 * 8. ThemeController (Dynamic Cyber Accent Engine)
 * 9. GitHub API Sync & Modal Lightbox
 */

// ==========================================
// 1. WEB AUDIO API SYNTHESIZER
// ==========================================
class CyberAudio {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('bm_audio_enabled') === 'true';
  }

  init() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    localStorage.setItem('bm_audio_enabled', this.enabled);
    if (this.enabled) {
      this.chime();
    }
    return this.enabled;
  }

  blip(freq = 600, duration = 0.04) {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  clack() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  chime() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.08, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.35);
      });
    } catch (e) {}
  }
}

const audio = new CyberAudio();

// ==========================================
// 2. INTERACTIVE CYBER CANVAS (BITS & NODES)
// ==========================================
class CyberCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.bits = [];
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.accentRgb = '0, 240, 255';

    this.init();
    this.setupEvents();
    this.loop();
  }

  setAccent(rgbStr) {
    this.accentRgb = rgbStr;
  }

  init() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 75);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1
      });
    }

    this.bits = [];
    for (let i = 0; i < 24; i++) {
      this.bits.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vy: -(Math.random() * 0.35 + 0.15),
        val: Math.random() > 0.5 ? '1' : '0',
        alpha: Math.random() * 0.35 + 0.1
      });
    }
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

    // Floating binary bits
    this.ctx.font = '12px "JetBrains Mono", monospace';
    for (let bit of this.bits) {
      this.ctx.fillStyle = `rgba(${this.accentRgb}, ${bit.alpha})`;
      this.ctx.fillText(bit.val, bit.x, bit.y);
      bit.y += bit.vy;
      if (bit.y < 0) {
        bit.y = this.height + 10;
        bit.x = Math.random() * this.width;
      }
    }

    // Nodes and connections
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.mouse.radius) {
        p.x -= (dx / dist) * 0.7;
        p.y -= (dy / dist) * 0.7;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.accentRgb}, 0.65)`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 120) {
          const alpha = (1 - dist2 / 120) * 0.22;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${this.accentRgb}, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}

// ==========================================
// 3. INTERACTIVE DEX MINI WORKSTATION SIMULATOR
// ==========================================
class DeXSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.windowEl = document.getElementById('dexSimWindow');
    this.titlebarEl = document.getElementById('dexSimTitlebar');
    this.drawerEl = document.getElementById('dexSimDrawer');
    this.launcherBtn = document.getElementById('dexSimLauncherBtn');
    this.clockEl = document.getElementById('dexSimClock');
    this.appContentEl = document.getElementById('dexSimAppContent');

    this.isDragging = false;
    this.pos = { x: 40, y: 30 };
    this.dragStart = { x: 0, y: 0 };
    this.isMaximized = false;
    this.isMinimized = false;

    this.init();
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Draggable window logic
    if (this.titlebarEl) {
      this.titlebarEl.addEventListener('mousedown', (e) => {
        if (this.isMaximized) return;
        this.isDragging = true;
        this.dragStart.x = e.clientX - this.pos.x;
        this.dragStart.y = e.clientY - this.pos.y;
        this.windowEl.classList.add('active');
        audio.blip(500, 0.03);
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const rect = this.container.getBoundingClientRect();
        let newX = e.clientX - this.dragStart.x;
        let newY = e.clientY - this.dragStart.y;

        // Keep within simulator bounds
        newX = Math.max(10, Math.min(newX, rect.width - 320));
        newY = Math.max(10, Math.min(newY, rect.height - 180));

        this.pos.x = newX;
        this.pos.y = newY;
        this.windowEl.style.left = `${this.pos.x}px`;
        this.windowEl.style.top = `${this.pos.y}px`;
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
    }

    // Toggle 9-dot App Drawer
    if (this.launcherBtn && this.drawerEl) {
      this.launcherBtn.addEventListener('click', () => {
        this.drawerEl.classList.toggle('show');
        audio.blip(700, 0.04);
      });
    }

    // Window controls
    const minBtn = document.getElementById('dexSimMinBtn');
    const maxBtn = document.getElementById('dexSimMaxBtn');
    const closeBtn = document.getElementById('dexSimCloseBtn');

    if (minBtn) {
      minBtn.addEventListener('click', () => {
        this.windowEl.style.display = 'none';
        this.isMinimized = true;
        audio.blip(400, 0.04);
      });
    }

    if (maxBtn) {
      maxBtn.addEventListener('click', () => {
        this.isMaximized = !this.isMaximized;
        if (this.isMaximized) {
          this.windowEl.style.left = '10px';
          this.windowEl.style.top = '10px';
          this.windowEl.style.width = 'calc(100% - 20px)';
          this.windowEl.style.height = 'calc(100% - 70px)';
        } else {
          this.windowEl.style.left = `${this.pos.x}px`;
          this.windowEl.style.top = `${this.pos.y}px`;
          this.windowEl.style.width = '340px';
          this.windowEl.style.height = '240px';
        }
        audio.blip(600, 0.04);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.windowEl.style.display = 'none';
        audio.blip(300, 0.05);
      });
    }

    // Drawer Apps Clickable
    document.querySelectorAll('.dex-app-item').forEach(item => {
      item.addEventListener('click', () => {
        const appName = item.getAttribute('data-app');
        this.launchApp(appName);
        this.drawerEl.classList.remove('show');
        audio.chime();
      });
    });

    // Taskbar Navigation Icons (Back, Home, Recents)
    const homeBtn = document.getElementById('dexSimHomeBtn');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        this.windowEl.style.display = 'flex';
        this.launchApp('Terminal');
        audio.blip(520, 0.04);
      });
    }
  }

  launchApp(appName) {
    this.windowEl.style.display = 'flex';
    const title = document.getElementById('dexSimWindowTitle');
    if (title) title.textContent = `${appName} — Android Subsystem`;

    let html = '';
    if (appName === 'Terminal') {
      html = `
        <div style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#38bdf8; line-height:1.5;">
          <span style="color:#10b981;">u0_a248@android:~$</span> uname -a<br/>
          Linux localhost 6.1.75-android15-9-g48 #1 SMP PREEMPT aarch64 Android<br/>
          <span style="color:#10b981;">u0_a248@android:~$</span> scrcpy --display-id=2 --fps=60<br/>
          <span style="color:#00f0ff;">[✓] GPU In-Process FFmpeg Texture Active (60 FPS, 12.4ms)</span>
        </div>
      `;
    } else if (appName === 'AppPulse') {
      html = `
        <div style="font-family:'Inter', sans-serif; font-size:11px; color:#f8fafc;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>Phone Vitality</strong> <span style="color:#10b981; font-weight:bold;">94 / 100</span>
          </div>
          <div style="background:#1e293b; height:6px; border-radius:3px; margin-bottom:8px;">
            <div style="background:#10b981; width:94%; height:100%; border-radius:3px;"></div>
          </div>
          <div style="color:#94a3b8; font-size:10px;">RAM Headroom: 52% • Telemetry: 100% On-Device</div>
        </div>
      `;
    } else if (appName === 'DevLens') {
      html = `
        <div style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#c084fc;">
          <strong>[DevLens Micro-Sandbox]</strong><br/>
          Container Status: <span style="color:#10b981;">ISOLATED</span><br/>
          Network: <span style="color:#10b981;">--net=none (Severed)</span><br/>
          Filesystem: <span style="color:#10b981;">Read-Only</span>
        </div>
      `;
    } else {
      html = `
        <div style="font-family:'Inter', sans-serif; font-size:12px; color:#cbd5e1; text-align:center; padding-top:20px;">
          <div style="font-size:24px; margin-bottom:8px;">📱</div>
          <strong>${appName} Launched</strong><br/>
          <span style="font-size:10px; color:#64748b;">Multi-Window Android 15 Session</span>
        </div>
      `;
    }

    if (this.appContentEl) this.appContentEl.innerHTML = html;
  }

  updateClock() {
    if (!this.clockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    this.clockEl.textContent = `${hours}:${mins}`;
  }
}

// ==========================================
// 4. INTERACTIVE DEVLENS CODE DEBUGGER PLAYGROUND
// ==========================================
const DEVLENS_SNIPPETS = {
  python: {
    lang: "Python",
    code: `def verify_buffer_bounds(data, length):\n    # Bug: Off-by-one indexing dereference\n    for idx in range(0, length + 1):\n        packet = data[idx]\n        if packet == 0x00:\n            return False\n    return True`,
    rule: "BOUNDS_01 • Off-by-one array index hazard",
    severity: "CRITICAL",
    explanation: "The loop iterates up to `length + 1`, which dereferences past the allocated buffer bounds. Causes IndexError or memory corruption.",
    fixedCode: `def verify_buffer_bounds(data, length):\n    # Verified Fix: Clamped strict length range\n    for idx in range(0, length):\n        packet = data[idx]\n        if packet == 0x00:\n            return False\n    return True`
  },
  javascript: {
    lang: "JavaScript",
    code: `async function fetchUserData(session) {\n    // Bug: Unchecked null property dereference\n    const token = session.auth.jwt;\n    return await db.query(token);\n}`,
    rule: "NULL_DEREF • Unhandled optional chain",
    severity: "HIGH",
    explanation: "`session.auth` is not guarded against null/undefined, causing an uncaught TypeError crash in asynchronous event loop.",
    fixedCode: `async function fetchUserData(session) {\n    // Verified Fix: Optional chaining & fallback guard\n    const token = session?.auth?.jwt;\n    if (!token) return null;\n    return await db.query(token);\n}`
  },
  cpp: {
    lang: "C++",
    code: `int process_stream(char* input) {\n    char dest[32];\n    // Bug: Unbounded string copy vulnerability\n    strcpy(dest, input);\n    return strlen(dest);\n}`,
    rule: "BUFFER_OVERFLOW • Unbounded string copy",
    severity: "HIGH",
    explanation: "`strcpy` lacks destination bounds checks, enabling arbitrary stack buffer overflows if input exceeds 32 bytes.",
    fixedCode: `int process_stream(char* input) {\n    char dest[32];\n    // Verified Fix: Safe bounded copy with null terminator\n    strncpy(dest, input, sizeof(dest) - 1);\n    dest[sizeof(dest) - 1] = '\\0';\n    return strlen(dest);\n}`
  }
};

class DevLensPlayground {
  constructor() {
    this.select = document.getElementById('devlensSnippetSelect');
    this.editor = document.getElementById('devlensEditor');
    this.analyzeBtn = document.getElementById('devlensAnalyzeBtn');
    this.repairBtn = document.getElementById('devlensRepairBtn');
    this.output = document.getElementById('devlensResult');
    if (!this.editor || !this.analyzeBtn) return;

    this.currentKey = 'python';
    this.init();
  }

  init() {
    this.loadSnippet('python');

    if (this.select) {
      this.select.addEventListener('change', (e) => {
        this.currentKey = e.target.value;
        this.loadSnippet(this.currentKey);
        audio.blip(550, 0.04);
      });
    }

    this.analyzeBtn.addEventListener('click', () => {
      this.runAnalysis();
    });

    if (this.repairBtn) {
      this.repairBtn.addEventListener('click', () => {
        this.applyRepair();
      });
    }
  }

  loadSnippet(key) {
    const s = DEVLENS_SNIPPETS[key];
    if (!s) return;
    this.editor.value = s.code;
    if (this.output) {
      this.output.innerHTML = `<span style="color:#64748b;">Click "Analyze with DevLens" to trigger static heuristic parser & sandbox...</span>`;
    }
    if (this.repairBtn) this.repairBtn.style.display = 'none';
  }

  runAnalysis() {
    audio.blip(800, 0.05);
    const s = DEVLENS_SNIPPETS[this.currentKey];
    if (!this.output || !s) return;

    this.output.innerHTML = `
      <div style="font-family:'JetBrains Mono', monospace; font-size:11.5px; line-height:1.6;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="color:#f87171;">⚠️ DIAGNOSTIC DETECTED: [${s.severity}]</strong>
          <span class="status-pill warning text-[10px]">${s.rule}</span>
        </div>
        <p style="color:#cbd5e1; margin-bottom:8px;">${s.explanation}</p>
        <div style="color:#34d399; font-size:11px;">
          ✓ Micro-Sandbox Verification: Confirmed via isolated AST check in 0.38s.
        </div>
      </div>
    `;

    if (this.repairBtn) {
      this.repairBtn.style.display = 'inline-flex';
    }
  }

  applyRepair() {
    const s = DEVLENS_SNIPPETS[this.currentKey];
    if (!s) return;
    this.editor.value = s.fixedCode;
    audio.chime();
    showToast('Bug repaired via DevLens 1-Tap Diff!');
    if (this.output) {
      this.output.innerHTML = `
        <div style="font-family:'JetBrains Mono', monospace; font-size:11.5px; color:#34d399; line-height:1.6;">
          <strong>⚡ DIFF REPAIR APPLIED & VERIFIED</strong><br/>
          Bounds violation successfully mitigated. Container execution test passed with 0 errors!
        </div>
      `;
    }
    if (this.repairBtn) this.repairBtn.style.display = 'none';
  }
}

// ==========================================
// 5. APPPULSE DETERMINISTIC VITALITY CALCULATOR
// ==========================================
class AppPulseCalculator {
  constructor() {
    this.ramSlider = document.getElementById('calcRam');
    this.storageSlider = document.getElementById('calcStorage');
    this.locationSlider = document.getElementById('calcLocation');
    this.drainSlider = document.getElementById('calcDrain');

    this.scoreValEl = document.getElementById('calcScoreValue');
    this.scoreCatEl = document.getElementById('calcScoreCategory');
    this.deductionsEl = document.getElementById('calcDeductions');

    if (!this.ramSlider || !this.scoreValEl) return;
    this.init();
  }

  init() {
    const sliders = [this.ramSlider, this.storageSlider, this.locationSlider, this.drainSlider];
    sliders.forEach(s => {
      s.addEventListener('input', () => {
        this.compute();
        audio.clack();
      });
    });

    this.compute();
  }

  compute() {
    const ram = parseInt(this.ramSlider.value); // percentage headroom (10 to 90)
    const storage = parseInt(this.storageSlider.value); // available GB (2 to 256)
    const locationApps = parseInt(this.locationSlider.value); // 0 to 10
    const drainApps = parseInt(this.drainSlider.value); // 0 to 10

    let score = 100;
    const deductions = [];

    // RAM calculation: Low headroom deducts points
    if (ram < 20) {
      const p = 18;
      score -= p;
      deductions.push(`Critical RAM headroom (${ram}%): -${p} pts`);
    } else if (ram < 35) {
      const p = 8;
      score -= p;
      deductions.push(`Constrained RAM headroom (${ram}%): -${p} pts`);
    }

    // Storage calculation
    if (storage < 10) {
      const p = 15;
      score -= p;
      deductions.push(`Critical storage headroom (&lt;10 GB): -${p} pts`);
    } else if (storage < 25) {
      const p = 6;
      score -= p;
      deductions.push(`Limited storage headroom (${storage} GB): -${p} pts`);
    }

    // Location permission auditing
    if (locationApps > 3) {
      const p = (locationApps - 3) * 4;
      score -= p;
      deductions.push(`Sensitive background location access (${locationApps} apps): -${p} pts`);
    }

    // Stale high-drain background apps
    if (drainApps > 0) {
      const p = drainApps * 5;
      score -= p;
      deductions.push(`Unused high-drain background apps (${drainApps} apps): -${p} pts`);
    }

    score = Math.max(10, Math.min(score, 100));

    // Update labels
    document.getElementById('calcRamVal').textContent = `${ram}%`;
    document.getElementById('calcStorageVal').textContent = `${storage} GB`;
    document.getElementById('calcLocationVal').textContent = `${locationApps}`;
    document.getElementById('calcDrainVal').textContent = `${drainApps}`;

    this.scoreValEl.textContent = score;

    let cat = 'OPTIMAL';
    let color = '#10b981';

    if (score < 50) {
      cat = 'HEAVY LOAD / RISKS';
      color = '#ef4444';
    } else if (score < 75) {
      cat = 'MODERATE LOAD';
      color = '#f59e0b';
    } else if (score < 90) {
      cat = 'GOOD VITALITY';
      color = '#38bdf8';
    }

    this.scoreCatEl.textContent = cat;
    this.scoreCatEl.style.color = color;
    this.scoreValEl.style.color = color;

    if (this.deductionsEl) {
      if (deductions.length === 0) {
        this.deductionsEl.innerHTML = `<span style="color:#10b981;">✓ 0 Deductions. All deterministic metrics within ideal thresholds.</span>`;
      } else {
        this.deductionsEl.innerHTML = deductions.map(d => `<div style="color:#f87171;">• ${d}</div>`).join('');
      }
    }
  }
}

// ==========================================
// 6. INTERACTIVE PIPELINE ARCHITECTURE EXPLORER
// ==========================================
class PipelineExplorer {
  constructor() {
    this.tabs = document.querySelectorAll('.pipeline-tab');
    this.panels = document.querySelectorAll('.pipeline-panel');
    if (this.tabs.length === 0) return;

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.tabs.forEach(t => t.classList.remove('active', 'border-cyan-400', 'text-cyan-400'));
        tab.classList.add('active', 'border-cyan-400', 'text-cyan-400');
        const target = tab.getAttribute('data-target');

        this.panels.forEach(p => {
          if (p.id === target) {
            p.style.display = 'block';
          } else {
            p.style.display = 'none';
          }
        });
        audio.blip(650, 0.04);
      });
    });
  }
}

// ==========================================
// 7. DYNAMIC THEME ACCENT CONTROLLER
// ==========================================
class ThemeController {
  constructor(canvasInstance) {
    this.canvas = canvasInstance;
    this.buttons = document.querySelectorAll('.theme-btn');
    this.init();
  }

  init() {
    const saved = localStorage.getItem('bm_theme_accent') || 'cyan';
    this.applyTheme(saved);

    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        this.applyTheme(theme);
        audio.chime();
      });
    });
  }

  applyTheme(theme) {
    let accent = '#00f0ff';
    let glow = 'rgba(0, 240, 255, 0.35)';
    let rgb = '0, 240, 255';

    if (theme === 'emerald') {
      accent = '#10b981';
      glow = 'rgba(16, 185, 129, 0.35)';
      rgb = '16, 185, 129';
    } else if (theme === 'purple') {
      accent = '#8b5cf6';
      glow = 'rgba(139, 92, 246, 0.35)';
      rgb = '139, 92, 246';
    } else if (theme === 'amber') {
      accent = '#f59e0b';
      glow = 'rgba(245, 158, 11, 0.35)';
      rgb = '245, 158, 11';
    }

    document.documentElement.style.setProperty('--theme-accent', accent);
    document.documentElement.style.setProperty('--theme-glow', glow);
    localStorage.setItem('bm_theme_accent', theme);

    if (this.canvas) {
      this.canvas.setAccent(rgb);
    }

    this.buttons.forEach(b => {
      b.classList.toggle('ring-2', b.getAttribute('data-theme') === theme);
      b.classList.toggle('ring-white', b.getAttribute('data-theme') === theme);
    });
  }
}

// ==========================================
// 8. DATA REPOSITORY & SPECIFICATIONS
// ==========================================
const ORG_DATA = {
  name: "Bit Manipulators",
  tagline: "Bending bits, unleashing mobile hardware, and engineering zero-trust systems.",
  repos: [
    {
      id: "open-android-dex",
      name: "Open Android DeX",
      category: "systems",
      license: "GPL-3.0",
      description: "True multi-window desktop workstation for Linux (Wayland & X11) powered by personal Android devices with 60 FPS in-process FFmpeg video decoding.",
      tech: ["Flutter Desktop", "Python GTK4", "C++", "FFmpeg", "Wayland / X11", "ADB Protocol"],
      url: "https://github.com/Bit-manipulators/open-android-dex",
      screenshot: "assets/images/dex-desktop.jpg",
      gallery: [
        "assets/images/dex-desktop.jpg",
        "assets/images/dex-screenshot.png"
      ],
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
      description: "Intelligent on-the-go code debugger, camera OCR code ingestor, and zero-trust Docker execution sandbox with deterministic heuristic fallbacks.",
      tech: ["FastAPI 0.115+", "React Native / Expo", "Docker Micro-Sandboxes", "Python 3.12+", "TypeScript", "Ollama LLM"],
      url: "https://github.com/Bit-manipulators/DevLense",
      screenshot: "assets/images/devlens-preview.svg",
      gallery: [
        "assets/images/devlens-preview.svg",
        "assets/images/org-logo.png"
      ],
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
      description: "Privacy-first Android 15 health & impact manager delivering reproducible mathematical scores for battery, storage, and permissions with 0% data egress.",
      tech: ["Kotlin 2.0", "Jetpack Compose", "Material 3", "Android 15 (API 35)", "Room / SQLite", "Coroutines"],
      url: "https://github.com/Bit-manipulators/App_pulse",
      screenshot: "assets/images/apppulse-dashboard.png",
      gallery: [
        "assets/images/apppulse-dashboard.png",
        "assets/images/apppulse-review.png",
        "assets/images/apppulse-diagnostics.png",
        "assets/images/apppulse-apps.png",
        "assets/images/apppulse-ai.png",
        "assets/images/apppulse-privacy.png",
        "assets/images/apppulse-scanner.png"
      ],
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
    }
  ]
};

// ==========================================
// 9. TERMINAL SIMULATOR ENGINE
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
      `<span style="color:var(--theme-accent); font-weight:bold;">===================================================================</span>`,
      `<span style="color:var(--theme-accent); font-weight:bold;">   ⚡ BIT MANIPULATORS — SYSTEMS & KERNEL EXPLORER v2.0.0</span>`,
      `<span style="color:#94a3b8;">   "Bending bits, unleashing mobile hardware, engineering zero-trust."</span>`,
      `<span style="color:var(--theme-accent); font-weight:bold;">===================================================================</span>`,
      `Type <span style="color:#38bdf8; font-weight:bold;">'help'</span> to view available system commands or click chips below.`
    ].join('\n'));
  }

  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      audio.clack();
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

    document.querySelectorAll('.cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          this.execute(cmd);
          this.input.focus();
          audio.blip(600, 0.04);
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

    let output = '';

    switch (command) {
      case 'help':
        output = [
          `<span style="color:var(--theme-accent);">AVAILABLE SYSTEM COMMANDS:</span>`,
          `  <span style="color:#38bdf8;">about</span>               Display collective manifesto & engineering vision`,
          `  <span style="color:#38bdf8;">projects</span>            List all 6 repositories with stars and status`,
          `  <span style="color:#38bdf8;">dex --status</span>        Diagnose Open Android DeX compositor & ADB link`,
          `  <span style="color:#38bdf8;">devlens --audit</span>     Simulate zero-trust Docker sandbox execution`,
          `  <span style="color:#38bdf8;">apppulse --telemetry</span> Run deterministic on-device vitality audit`,
          `  <span style="color:#38bdf8;">team</span>                List core maintainers and architectural leads`,
          `  <span style="color:#38bdf8;">stack</span>               Inspect organization technology matrix`,
          `  <span style="color:#38bdf8;">matrix</span>              Trigger cybernetic bit stream cascade`,
          `  <span style="color:#38bdf8;">audio</span>               Toggle synthesizer audio effects (on/off)`,
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
          `<span style="color:var(--theme-accent);">ORGANIZATION PRODUCTION REPOSITORIES:</span>`,
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
          `<span style="color:var(--theme-accent);">[OPEN ANDROID DEX DIAGNOSTIC PROBE]</span>`,
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
          `<span style="color:var(--theme-accent);">[DEVLENS ZERO-TRUST SANDBOX RUNTIME]</span>`,
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
          `<span style="color:var(--theme-accent);">[APPPULSE DETERMINISTIC HEALTH SCAN]</span>`,
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
          `<span style="color:var(--theme-accent);">CORE MAINTAINERS & LEADERSHIP:</span>`,
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
          `<span style="color:var(--theme-accent);">TECHNOLOGY MATRIX:</span>`,
          `  • Systems:   Linux (Wayland & X11), ADB Protocols, Scrcpy, FFmpeg, C++`,
          `  • Mobile:    Flutter Desktop, Jetpack Compose (Material 3), React Native, Expo`,
          `  • Languages: Dart, Kotlin, Python 3.12+, TypeScript, Modern C++, Bash`,
          `  • Backend:   FastAPI 0.115+, Ephemeral Docker Containers, SQLite / Room`,
          `  • Quality:   GitHub Actions, Pytest, Detekt, Vitest, Dev Containers`
        ].join('\n');
        break;

      case 'audio':
        const state = audio.toggle();
        output = `<span style="color:#00f0ff;">Web Audio Synthesizer: <strong>${state ? 'ENABLED [SOUND ON]' : 'MUTED [SOUND OFF]'}</strong></span>`;
        break;

      case 'matrix':
        output = `<span style="color:#10b981;">01000010 01101001 01110100 00100000 01001101 01100001 01101110 01101001 01110000 01110101 01101100 01100001 01110100 01101111 01110010 01110011</span>\n` +
                 `<span style="color:var(--theme-accent);">[CYBER BIT STREAM UNLEASHED] System running in hyper-deterministic mode.</span>`;
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
// 10. MODAL & SCREENSHOT LIGHTBOX
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
    <div style="display:flex; flex-direction:column; gap:1.5rem;">
      <!-- Active Image Preview -->
      <div style="position:relative; border-radius:12px; overflow:hidden; border:1px solid rgba(56, 189, 248, 0.25); background:#060a12; text-align:center;">
        <img id="modalActiveImg" src="${project.screenshot}" alt="${project.name}" style="max-height:360px; width:auto; max-width:100%; margin:0 auto; object-fit:contain;" />
      </div>

      <!-- Thumbnail Strip if multiple images -->
      ${project.gallery && project.gallery.length > 1 ? `
        <div>
          <div style="font-size:11px; font-family:'JetBrains Mono', monospace; color:#94a3b8; margin-bottom:6px;">SCREENSHOT GALLERY (${project.gallery.length} IMAGES)</div>
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            ${project.gallery.map((img, idx) => `
              <img src="${img}" class="gallery-thumb" onclick="document.getElementById('modalActiveImg').src='${img}'; audio.blip(600, 0.03);" 
                   style="height:60px; width:90px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,0.15); transition:all 0.2s;" />
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div>
        <h4 style="color:var(--theme-accent); margin-bottom:0.5rem; font-size:1.1rem; font-weight:600;">System Overview</h4>
        <p style="color:#cbd5e1; line-height:1.6; font-size:0.95rem;">${project.description}</p>
      </div>

      <div>
        <h4 style="color:var(--theme-accent); margin-bottom:0.5rem; font-size:1.1rem; font-weight:600;">Architectural Highlights</h4>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem;">
          ${project.highlights.map(h => `<li style="display:flex; align-items:flex-start; gap:0.5rem; color:#94a3b8; font-size:0.875rem;"><span style="color:#10b981;">✓</span> <span>${h}</span></li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="color:var(--theme-accent); margin-bottom:0.5rem; font-size:1.1rem; font-weight:600;">Technology Stack</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${project.tech.map(t => `<span class="status-pill info">${t}</span>`).join('')}
        </div>
      </div>

      <div>
        <h4 style="color:var(--theme-accent); margin-bottom:0.5rem; font-size:1.1rem; font-weight:600;">Quick Bootstrap Script</h4>
        <div class="code-box">
          <code>${project.quickStart.replace(/\n/g, '<br/>')}</code>
          <button class="copy-btn" onclick="navigator.clipboard.writeText('${project.quickStart.replace(/'/g, "\\'")}'); showToast('Command copied to clipboard!'); audio.chime();">
            📋
          </button>
        </div>
      </div>

      <div style="display:flex; gap:1rem; margin-top:0.5rem;">
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary" style="flex:1; text-align:center;">
          View Source Repository on GitHub ↗
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  audio.blip(750, 0.05);
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    audio.blip(450, 0.03);
  }
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:var(--theme-accent);">⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// 11. GITHUB METRICS SYNC
// ==========================================
async function syncGitHubMetrics() {
  const cacheKey = 'bm_gh_metrics_cache';
  const cacheTimeKey = 'bm_gh_metrics_time';
  const now = Date.now();
  const cachedTime = localStorage.getItem(cacheTimeKey);
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedTime && cachedData && (now - parseInt(cachedTime)) < 15 * 60 * 1000) {
    try {
      applyMetrics(JSON.parse(cachedData));
      return;
    } catch (e) {}
  }

  try {
    const reposRes = await fetch('https://api.github.com/orgs/Bit-manipulators/repos?per_page=100');
    if (!reposRes.ok) throw new Error(`HTTP ${reposRes.status}`);
    const repos = await reposRes.json();

    let totalStars = 0;
    const repoStars = {};

    repos.forEach(repo => {
      totalStars += (repo.stargazers_count || 0);
      repoStars[repo.name] = repo.stargazers_count || 0;
    });

    const metrics = { totalStars, repoCount: repos.length, repoStars };
    localStorage.setItem(cacheKey, JSON.stringify(metrics));
    localStorage.setItem(cacheTimeKey, now.toString());
    applyMetrics(metrics);
  } catch (err) {
    applyMetrics({
      totalStars: 29,
      repoCount: 6,
      repoStars: { "open-android-dex": 25, "DevLense": 2, "App_pulse": 2 }
    });
  }
}

function applyMetrics(data) {
  document.querySelectorAll('.gh-stars-count').forEach(el => {
    el.textContent = `${data.totalStars}+`;
  });
  document.querySelectorAll('.gh-repos-count').forEach(el => {
    el.textContent = `${data.repoCount || 6}`;
  });

  if (data.repoStars) {
    Object.keys(data.repoStars).forEach(repoName => {
      const el = document.getElementById(`stars-${repoName}`);
      if (el) el.textContent = `★ ${data.repoStars[repoName]}`;
    });
  }
}

// ==========================================
// 12. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas
  const canvas = new CyberCanvas('cyberCanvas');

  // 2. Initialize Theme Controller
  new ThemeController(canvas);

  // 3. Initialize Terminal
  new TerminalSimulator('terminalOutput', 'terminalInput');

  // 4. Initialize Interactive DeX Simulator
  new DeXSimulator('dexSimulator');

  // 5. Initialize DevLens Playground
  new DevLensPlayground();

  // 6. Initialize AppPulse Vitality Calculator
  new AppPulseCalculator();

  // 7. Initialize Pipeline Explorer
  new PipelineExplorer();

  // 8. GitHub Metrics
  syncGitHubMetrics();

  // 9. Sound Toggle Button in Header
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    const updateSoundLabel = () => {
      soundBtn.innerHTML = audio.enabled ? '<span>🔊</span> Sound: ON' : '<span>🔈</span> Sound: OFF';
      soundBtn.classList.toggle('active', audio.enabled);
    };
    updateSoundLabel();
    soundBtn.addEventListener('click', () => {
      audio.toggle();
      updateSoundLabel();
    });
  }

  // 10. Modal Event Listeners
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // 11. Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      audio.blip(600, 0.03);
      filterBtns.forEach(b => b.classList.remove('active', 'border-cyan-400', 'text-cyan-400'));
      btn.classList.add('active', 'border-cyan-400', 'text-cyan-400');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.style.display = (filter === 'all' || category === filter) ? 'flex' : 'none';
      });
    });
  });

  // 12. Search Bar
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      projectCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        card.style.display = (title.includes(term) || desc.includes(term)) ? 'flex' : 'none';
      });
    });
  }

  // 13. Mobile Menu
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      audio.blip(500, 0.03);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
});

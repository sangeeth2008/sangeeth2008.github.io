/**
 * SANGEETH SASIKUMAR K S — PORTFOLIO ENGINE
 * Ultra-smooth scroll choreographies, 240-frame WebGL/Canvas scrub,
 * real-time oscilloscope, interactive terminal, case study drawer & micro-interactions.
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. PROJECT CASE STUDY DATABASE
     ========================================================================== */
  const PROJECTS = {
    'patrol-robot': {
      idx: '01 / 07',
      num: '01',
      domain: 'robotics',
      badge: 'Flagship · Autonomous Robotics',
      title: 'Smart Security Patrol Robot V1',
      desc: 'Autonomous differential-drive rover engineered with a non-blocking Finite State Machine (FSM). Features continuous multi-zone ultrasonic obstacle clearance, PIR thermal intrusion triggers, MPU6050 tilt protection, and an ESP32-CAM onboard MJPEG wireless video server.',
      image: 'assets/img/work/patrol-robot.jpg',
      specs: [
        { label: 'MCU Architecture', val: 'ESP32 Dual-Core @ 240 MHz (FreeRTOS)' },
        { label: 'Motor Driver', val: 'TB6612FNG Dual MOSFET H-Bridge' },
        { label: 'Vision Stream', val: 'ESP32-CAM OV2640 MJPEG @ 800×600' },
        { label: 'Power Supply', val: '12V 3S LiPo → Dual Buck 5V 5A Rail' },
        { label: 'Safety Cutoff', val: 'MPU6050 > 45° Incline Auto-E-Stop' },
        { label: 'Obstacle Matrix', val: 'HC-SR04 Continuous 3-Zone Echo' }
      ],
      details: 'The robot eliminates all blocking delay() calls to guarantee a deterministic 10ms control cycle. The motor driver uses custom PWM channels on ESP32 LEDC timers to enable precise acceleration ramping and low-speed torque control, preventing slippage on polished surfaces while maintaining high torque over thresholds.',
      stack: ['C / C++', 'ESP32', 'FreeRTOS', 'ESP32-CAM', 'TB6612FNG', 'HC-SR04', 'MPU6050', 'PIR Sensor', 'PlatformIO'],
      nextId: 'fire-robot'
    },
    'fire-robot': {
      idx: '02 / 07',
      num: '02',
      domain: 'robotics safety',
      badge: 'Autonomous Safety Robotics',
      title: 'Fire Fighting Robot',
      desc: 'An emergency response robotics vehicle engineered to detect localized flame anomalies, navigate hazardous environments autonomously, and suppress blazes using an aimed water delivery nozzle.',
      image: 'assets/img/work/fire-robot.jpg',
      specs: [
        { label: 'Flame Transducers', val: 'Multi-Point Optical Flame Array' },
        { label: 'Nozzle Targeting', val: 'Dual-Axis SG90 Micro-Servo Aiming' },
        { label: 'Extinguishing Pump', val: 'High-Torque 12V Submersible DC Pump' },
        { label: 'Chassis Drive', val: '4WD Differential Kinematics' },
        { label: 'Failsafe Logic', val: 'Thermal Distance Auto-Braking' },
        { label: 'Response Latency', val: '< 300ms from flame signature trigger' }
      ],
      details: 'Executes threshold triangulation across the multi-sensor flame array to calculate fire vector coordinates, automatically centering the servo nozzle before initiating high-pressure pump discharge. Includes reverse-thrust rollback if ambient temperature gradients rise past safety limits.',
      stack: ['Arduino C++', 'Flame Transducers', 'Submersible Pump', 'Dual Servos', 'DC Drivers', 'Hardware Failsafes'],
      nextId: 'waste-machine'
    },
    'waste-machine': {
      idx: '03 / 07',
      num: '03',
      domain: 'ai robotics',
      badge: 'TinyML & Computer Vision',
      title: 'AI Waste Segregation Machine',
      desc: 'Automated mechatronic sorting apparatus utilizing an embedded vision camera and TinyML quantized neural network to identify and sort recyclable plastics, biodegradable items, and metallic objects.',
      image: 'assets/img/work/waste-machine.jpg',
      specs: [
        { label: 'Vision Model', val: 'Edge Impulse Quantized INT8 MobileNet' },
        { label: 'Metal Transducer', val: 'LJ12A3-4-Z/BX Inductive Proximity' },
        { label: 'Sorting Actuation', val: 'High-Torque MG996R Metal Servos' },
        { label: 'Compute Core', val: 'ESP32 Dual-Core @ 240 MHz' },
        { label: 'Inference Latency', val: '~190ms per item classification' },
        { label: 'Feed System', val: 'Automated Continuous Conveyor Belt' }
      ],
      details: 'Combines optical computer vision with inductive sensing: inductive probes identify metallic cans immediately with zero classification overhead, while quantized TinyML vision models classify plastics and organics into dedicated chutes with over 93% on-device accuracy.',
      stack: ['Edge Impulse', 'TinyML', 'ESP32-CAM', 'TensorFlow Lite Micro', 'Inductive Sensors', 'MG996R Servos', 'C++'],
      nextId: 'smart-agri'
    },
    'smart-agri': {
      idx: '04 / 07',
      num: '04',
      domain: 'ai iot',
      badge: 'Edge AI & IoT',
      title: 'Smart Agriculture & AI Crop Monitoring',
      desc: 'Autonomous solar-compatible field sensor node. Pairs capacitive soil moisture and DHT22 microclimate probes with an onboard ESP32-CAM running an Edge Impulse quantized INT8 neural vision model for localized crop disease diagnosis.',
      image: 'assets/img/work/smart-agri.jpg',
      specs: [
        { label: 'Inference Engine', val: 'Edge Impulse INT8 Quantized Model' },
        { label: 'Optics Subsystem', val: 'OV2640 2MP Camera Sensor' },
        { label: 'Inference Time', val: '~180ms per leaf classification' },
        { label: 'Cloud Broker', val: 'Blynk IoT & Secure MQTT Dashboard' },
        { label: 'Soil Sensors', val: 'Corrosion-Resistant Capacitive Soil Probe' },
        { label: 'Power Scheme', val: 'Deep-Sleep Cycle (15µA quiescent current)' }
      ],
      details: 'A quantized MobileNet backbone classifies leaf spot, powdery mildew, and blight patterns directly in microcontroller RAM before waking the Wi-Fi modem to transmit classification metrics. Drastically preserves battery life for off-grid agrarian deployments.',
      stack: ['Edge Impulse', 'ESP32-CAM', 'Blynk IoT', 'MQTT', 'Capacitive Sensors', 'DHT22', 'Deep Sleep Optimization'],
      nextId: 'smart-classroom'
    },
    'smart-classroom': {
      idx: '05 / 07',
      num: '05',
      domain: 'iot',
      badge: 'Automation & RFID',
      title: 'Smart Classroom Management System',
      desc: 'Micro-facility energy and attendance management controller. Automates high-current relay banks using thermal comfort heuristics while processing RFID RC522 student identification and real-time telemetry.',
      image: 'assets/img/work/smart-classroom.jpg',
      specs: [
        { label: 'Auth Subsystem', val: 'RFID RC522 13.56 MHz Reader' },
        { label: 'Relay Channels', val: '4-Channel Optocoupled 10A Relays' },
        { label: 'Local Display', val: 'I²C 1602 LCD with Backlight Sleep' },
        { label: 'Climate Node', val: 'DHT22 High-Precision Sensor' },
        { label: 'Protocol Matrix', val: 'I²C Bus & Hardware SPI' },
        { label: 'Fail-Safe', val: 'Normally-Open Relay Isolation' }
      ],
      details: 'Protects against relay coil inductive kickback using flyback diodes and optoisolators, preventing ESP32 reset glitches during heavy load contact switching. Integrates attendance logging with automated HVAC throttling.',
      stack: ['ESP32', 'RFID RC522', 'Relay Control', 'I2C LCD', 'DHT22', 'FreeRTOS', 'C++'],
      nextId: 'lpg-safety'
    },
    'lpg-safety': {
      idx: '06 / 07',
      num: '06',
      domain: 'safety iot',
      badge: 'Safety & Emergency Cutoff',
      title: 'Smart LPG Safety System',
      desc: 'Sub-second gas hazard mitigation system. Continuously samples MQ-2 analog outputs, immediately swinging a high-torque mechanical valve servo to seal the cylinder regulator upon threshold breach, accompanied by cloud push notifications.',
      image: 'assets/img/work/lpg-safety.jpg',
      specs: [
        { label: 'Gas Transducer', val: 'MQ-2 Calibrated LPG/Smoke Sensor' },
        { label: 'Actuation', val: 'High-Torque Metal Gear Cutoff Servo' },
        { label: 'Response Time', val: '< 400ms from threshold breach' },
        { label: 'Acoustic Siren', val: '85dB Piezo Pulse Generator' },
        { label: 'Remote Alert', val: 'Emergency MQTT Cloud Push Notification' },
        { label: 'Valve Action', val: 'Physical 90-degree Ball Valve Cutoff' }
      ],
      details: 'Firmware executes averaging filters to suppress analog electrical noise spikes while triggering latching alarm states that require manual physical operator reset after leak dissipation, ensuring strict safety compliance.',
      stack: ['ESP32', 'MQ-2 Sensor', 'High-Torque Servo', 'Piezo Siren', 'MQTT Alerts', 'Failsafe Logic'],
      nextId: 'mark-ai'
    },
    'mark-ai': {
      idx: '07 / 07',
      num: '07',
      domain: 'ai',
      badge: 'Edge AI Lab Companion',
      title: 'Personal AI — MARK',
      desc: 'Custom intelligent assistant and edge companion designed for laboratory automation, voice-activated hardware diagnostics, telemetry stream parsing, and rapid bench testing workflows.',
      image: 'assets/img/work/mark-ai.jpg',
      specs: [
        { label: 'Core Language', val: 'Python System Architecture' },
        { label: 'Interaction Mode', val: 'Voice Synthesis & Serial CLI' },
        { label: 'Telemetry Link', val: 'Direct UART & WebSockets' },
        { label: 'Lab Diagnostics', val: 'Automated Pinout & Sensor Testing' },
        { label: 'Response Speed', val: 'Sub-50ms Local Execution' },
        { label: 'Current State', val: 'Active Development & Lab Integration' }
      ],
      details: 'Acts as the central command node for testing robotics prototypes on the hardware workbench, querying sensor packets, issuing motor calibrations over serial buses, and tracking component inventories in real time.',
      stack: ['Python', 'WebSockets', 'Serial UART', 'Audio Synthesis', 'Signal Processing', 'Bench Automation'],
      nextId: 'patrol-robot'
    }
  };

  /* ==========================================================================
     2. GLOBAL STATE & HELPERS (AUDIO SYNTH, DUAL THEME, COMMAND PALETTE, SONAR)
     ========================================================================== */
  let lenis = null;
  let openCvModalGlobal = null;
  const isMobile = () => window.innerWidth < 768;
  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Live Clock (IST) */
  function updateClock() {
    try {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const istString = new Intl.DateTimeFormat('en-GB', options).format(now);
      document.querySelectorAll('[data-clock]').forEach(el => {
        el.textContent = istString;
      });
      const yearEl = document.querySelector('[data-year]');
      if (yearEl) yearEl.textContent = now.getFullYear();
    } catch (e) {}
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* --------------------------------------------------------------------------
     WEB AUDIO PARAMETRIC SYNTHESIZER SFX SYSTEM
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem('sangeeth_sfx') === '1';

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSfx(type = 'click') {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'tone') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'key') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {}
  }

  function toggleSfx() {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem('sangeeth_sfx', sfxEnabled ? '1' : '0');
    updateSfxUI();
    if (sfxEnabled) playSfx('boot');
    showToast(sfxEnabled ? 'Audio SFX Synthesizer: ACTIVE' : 'Audio SFX Synthesizer: MUTED');
  }

  function updateSfxUI() {
    const btn = document.getElementById('sfxToggleBtn');
    if (btn) btn.classList.toggle('is-active', sfxEnabled);
  }

  /* --------------------------------------------------------------------------
     WIRE CODE DUAL-THEME ENGINE (DARK GRAPHITE <-> LIGHT BONE)
     -------------------------------------------------------------------------- */
  function initTheme() {
    const saved = localStorage.getItem('sangeeth_theme');
    const theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sangeeth_theme', next);
    updateThemeUI(next);
    playSfx('click');
    showToast(`Theme Switched: ${next.toUpperCase()}`);
  }

  function updateThemeUI(theme) {
    const btn = document.getElementById('themeToggleBtn');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0E1013' : '#F2EFE8');
    if (btn) btn.classList.toggle('is-active', theme === 'light');
  }

  /* --------------------------------------------------------------------------
     COMMAND PALETTE (CTRL+K / CMD+K) CONTROLLER
     -------------------------------------------------------------------------- */
  function initCommandPalette() {
    const dlg = document.getElementById('cmdPaletteDialog');
    const btn = document.getElementById('cmdPaletteBtn');
    const inp = document.getElementById('cmdPaletteInput');
    const list = document.getElementById('cmdPaletteList');
    if (!dlg) return;

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dlg.open) dlg.close();
        else { dlg.showModal(); inp?.focus(); playSfx('click'); }
      }
    });

    btn?.addEventListener('click', () => {
      dlg.showModal();
      inp?.focus();
      playSfx('click');
    });

    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });

    inp?.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      const items = list?.querySelectorAll('.cmd-item');
      items?.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
      playSfx('key');
    });

    list?.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (!item) return;
      const action = item.dataset.action;
      const target = item.dataset.target;
      dlg.close();

      if (action === 'nav' && target) {
        const el = document.querySelector(target);
        if (el && lenis) lenis.scrollTo(el);
        else if (el) el.scrollIntoView({ behavior: 'smooth' });
        playSfx('click');
      } else if (action === 'theme') {
        toggleTheme();
      } else if (action === 'sfx') {
        toggleSfx();
      } else if (action === 'resume') {
        window.open('assets/Sangeeth_Sasikumar_CV.pdf', '_blank');
        playSfx('click');
      } else if (action === 'view-cv') {
        if (typeof openCvModalGlobal === 'function') openCvModalGlobal();
        playSfx('click');
      } else if (action === 'cursor-tour') {
        if (typeof window.startCursorTour === 'function') {
          window.startCursorTour();
        }
        playSfx('click');
      }
    });
  }

  /* --------------------------------------------------------------------------
     TOUCH SONAR & YELLOW LIGHT PARTICLES (FOR PHONES & TOUCHSCREENS)
     -------------------------------------------------------------------------- */
  function initTouchSonar() {
    const container = document.getElementById('sonarContainer');
    if (!container) return;

    let lastDotTime = 0;

    const triggerSonar = (x, y) => {
      if (x == null || y == null) return;

      // 1. Expanding yellow sonar wave
      const ripple = document.createElement('div');
      ripple.className = 'sonar-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      container.appendChild(ripple);
      playSfx('click');
      setTimeout(() => ripple.remove(), 750);

      // 2. Yellow glowing center dot light
      const dot = document.createElement('div');
      dot.className = 'sonar-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 650);
    };

    const triggerTouchDot = (x, y) => {
      if (x == null || y == null) return;
      const now = performance.now();
      if (now - lastDotTime < 22) return; // ~45fps particle generation
      lastDotTime = now;

      const dot = document.createElement('div');
      dot.className = 'sonar-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    };

    // Tap/touch down creates sonar ping & yellow core light
    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, select, textarea, canvas, .case, .reel, .cmd-dialog, .cv-dialog')) return;
      triggerSonar(e.clientX, e.clientY);
    }, { passive: true });

    // Note: 'touchmove' particle generation was removed to prevent severe scroll lag on Android.
  }

  /* Toast Notification Helper */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  /* ==========================================================================
     3. PRELOADER & AMBER BURN HERO LIGHT CONTROLLER
     ========================================================================== */
  class Preloader {
    constructor() {
      this.preloader = document.getElementById('preloader');
      this.preCount = document.getElementById('preCount');
      this.preBar = document.getElementById('preBar');
      this.figure = document.getElementById('heroFigure');
      this.dismissed = false;
      this.start();
    }

    start() {
      if (prefersReduced()) {
        if (this.preCount) this.preCount.textContent = '100';
        if (this.preBar) this.preBar.style.transform = 'scaleX(1)';
        this.dismiss(true);
        return;
      }

      const startTime = performance.now();
      const minDuration = 60;
      let imgReady = !this.figure || this.figure.complete;

      if (this.figure && !imgReady) {
        if ('decode' in this.figure) {
          this.figure.decode().then(() => { imgReady = true; }).catch(() => { imgReady = true; });
        } else {
          this.figure.addEventListener('load', () => { imgReady = true; }, { once: true });
          this.figure.addEventListener('error', () => { imgReady = true; }, { once: true });
        }
      }

      const tick = (now) => {
        if (this.dismissed) return;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / minDuration);
        const pct = Math.round(t * (imgReady ? 100 : 95));
        if (this.preCount) this.preCount.textContent = String(pct).padStart(3, '0');
        if (this.preBar) this.preBar.style.transform = `scaleX(${pct / 100})`;

        if ((t >= 1 && imgReady) || elapsed > 180) {
          if (this.preCount) this.preCount.textContent = '100';
          if (this.preBar) this.preBar.style.transform = 'scaleX(1)';
          this.dismiss(false);
        } else {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }

    dismiss(instant) {
      if (this.dismissed) return;
      this.dismissed = true;

      if (!this.preloader) {
        document.body.classList.remove('is-loading');
        animateHeroEntrance();
        return;
      }

      if (instant || typeof gsap === 'undefined') {
        this.preloader.style.display = 'none';
        document.body.classList.remove('is-loading');
        animateHeroEntrance();
        return;
      }

      this.preloader.style.display = 'none';
      document.body.classList.remove('is-loading');
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      animateHeroEntrance();
    }
  }

  class HeroLight {
    constructor() {
      this.hero = document.querySelector('.hero');
      this.subject = document.getElementById('heroSubject');
      this.actor = document.getElementById('heroActor');
      this.rim = document.getElementById('heroRim');
      this.burn = document.getElementById('heroTitle');
      this.copy = document.getElementById('heroIntro');
      if (!this.hero) return;

      this.curX = 30;
      this.curY = 30;
      this.targetX = 30;
      this.targetY = 30;

      this.rimX = 26;
      this.rimY = 24;
      this.targetRimX = 26;
      this.targetRimY = 24;

      // Normalized pointer (-0.5 .. +0.5) for 3D figure parallax & tilt
      this.nx = -0.15;
      this.ny = -0.15;
      this.curNx = -0.15;
      this.curNy = -0.15;

      this.hasPointer = false;
      this.hasGyro = false;
      this.isVisible = true;
      this.startTime = performance.now();

      this.bind();
    }

    bind() {
      if (prefersReduced()) return;

      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const was = this.isVisible;
            this.isVisible = entry.isIntersecting;
            if (!was && this.isVisible) {
              requestAnimationFrame((t) => this.tick(t));
            }
          });
        }, { threshold: 0.01 });
        obs.observe(this.hero);
      }

      window.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const rect = this.hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        this.hasPointer = true;
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        const xPct = ((e.clientX - rect.left) / w) * 100;
        const yPct = ((e.clientY - rect.top) / h) * 100;
        this.targetX = Math.max(4, Math.min(96, xPct));
        this.targetY = Math.max(6, Math.min(92, yPct));

        this.nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / w - 0.5));
        this.ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / h - 0.5));

        if (this.subject) {
          const sRect = this.subject.getBoundingClientRect();
          const rx = ((e.clientX - sRect.left) / Math.max(1, sRect.width)) * 100;
          const ry = ((e.clientY - sRect.top) / Math.max(1, sRect.height)) * 100;
          this.targetRimX = Math.max(-15, Math.min(115, rx));
          this.targetRimY = Math.max(-10, Math.min(105, ry));
        }
      }, { passive: true });

      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma == null || e.beta == null) return;
          this.hasGyro = true;
          const gx = Math.max(-30, Math.min(30, e.gamma)) / 30;
          const gy = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
          this.targetX = 50 + gx * 34;
          this.targetY = 32 + gy * 22;
          this.targetRimX = 45 + gx * 42;
          this.targetRimY = 26 + gy * 24;
          this.nx = gx * 0.45;
          this.ny = gy * 0.45;
        }, { passive: true });
      }

      requestAnimationFrame((t) => this.tick(t));
    }

    tick(now) {
      if (!this.isVisible || document.hidden || prefersReduced()) return;

      const elapsed = (now - this.startTime) * 0.001;

      if (!this.hasPointer && !this.hasGyro) {
        const phase = (elapsed * Math.PI * 2) / 14;
        this.targetX = 36 + Math.sin(phase) * 22;
        this.targetY = 28 + Math.cos(phase * 0.7) * 10;
        this.targetRimX = 32 + Math.sin(phase) * 28;
        this.targetRimY = 24 + Math.cos(phase * 0.7) * 12;
        this.nx = Math.sin(phase) * 0.28;
        this.ny = Math.cos(phase * 0.7) * 0.2;
      }

      // Smoothly interpolate light & 3D figure coordinates
      const prevRimX = this.rimX;
      const prevRimY = this.rimY;
      this.curX += (this.targetX - this.curX) * 0.085;
      this.curY += (this.targetY - this.curY) * 0.085;
      this.rimX += (this.targetRimX - this.rimX) * 0.095;
      this.rimY += (this.targetRimY - this.rimY) * 0.095;
      this.curNx += (this.nx - this.curNx) * 0.065;
      this.curNy += (this.ny - this.curNy) * 0.065;

      this.hero.style.setProperty('--lx', `${this.curX.toFixed(2)}%`);
      this.hero.style.setProperty('--ly', `${this.curY.toFixed(2)}%`);
      this.hero.style.setProperty('--rx', `${this.rimX.toFixed(2)}%`);
      this.hero.style.setProperty('--ry', `${this.rimY.toFixed(2)}%`);

      // Continuous organic breathing wave + counter-parallax + 3D micro-tilt on the hero portrait
      const breathY = Math.sin(elapsed * 1.15) * 6.5;
      const breathX = Math.cos(elapsed * 0.75) * 3.5;
      const breathScale = 1 + (Math.sin(elapsed * 0.9) + 1) * 0.012;
      const breathRotZ = Math.sin(elapsed * 0.65) * 0.45;

      // Scroll-linked receding hero driven by the unified scroll choreographer (--p)
      const scrollP = typeof this.hero._scrollP === 'number'
        ? this.hero._scrollP
        : Math.max(0, Math.min(1, window.scrollY / Math.max(1, window.innerHeight)));
      const scrollSinkY = scrollP * 44;
      const scrollScale = scrollP * 0.04;

      if (this.actor) {
        const figX = -this.curNx * 26 + breathX;
        const figY = -this.curNy * 14 + breathY + scrollSinkY;
        const rotX = -this.curNy * 6.0;
        const rotY = this.curNx * 8.5;
        const totalScale = breathScale + scrollScale;
        this.actor.style.transform =
          `translate3d(${figX.toFixed(2)}px, ${figY.toFixed(2)}px, 0) ` +
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${breathRotZ.toFixed(2)}deg) ` +
          `scale(${totalScale.toFixed(4)})`;
      }

      // Dynamic rim pulse: rim intensifies subtly with light velocity and breathing
      if (this.rim) {
        const vel = Math.hypot(this.rimX - prevRimX, this.rimY - prevRimY);
        const rimAlpha = Math.min(1, 0.82 + Math.sin(elapsed * 1.6) * 0.08 + vel * 0.06);
        this.rim.style.opacity = rimAlpha.toFixed(3);
      }

      // Deeper parallax plane for the burning SANGEETH display type behind the figure
      if (this.burn) {
        const burnX = this.curNx * 18;
        const burnY = this.curNy * 9 - scrollP * 32;
        this.burn.style.transform = `translate3d(${burnX.toFixed(2)}px, ${burnY.toFixed(2)}px, 0)`;
      }

      requestAnimationFrame((t) => this.tick(t));
    }
  }

  /* ==========================================================================
     3B. SCROLL CHOREOGRAPHER (4 PINNED STAGES, 3 CANVASES, PER-ATOM MOTION)
     One rAF-throttled scroll handler writes CSS custom properties (--p, --wipe)
     and drives the molten ember field, piecewise latency curve, and gather form.
     ========================================================================== */
  class ScrollChoreographer {
    constructor() {
      this.stages = Array.from(document.querySelectorAll('[data-pin-stage]'));
      if (!this.stages.length) return;

      this.progress = { hero: 0, wipe: 0, curve: 0, gather: 0 };
      this.visible = { hero: true, curve: false, gather: false };
      this.scrollTicking = false;
      this.startTime = performance.now();

      // Canvas references
      this.heroCanvas = document.getElementById('heroEmberCanvas');
      this.heroCtx = this.heroCanvas ? this.heroCanvas.getContext('2d') : null;

      this.curveCanvas = document.getElementById('curveCanvas');
      this.curveCtx = this.curveCanvas ? this.curveCanvas.getContext('2d') : null;
      this.curveReadout = document.getElementById('curveReadout');
      this.curveStageLabel = document.getElementById('curveStageLabel');
      this.curveRows = Array.from(document.querySelectorAll('#curveRows .curve__row'));

      // Real piecewise latency series (ms) matching the 5 architectural stages
      this.curveSeries = [180.0, 96.0, 42.0, 24.0, 14.5, 8.0, 4.2, 1.9, 0.8];

      this.gatherCanvas = document.getElementById('gatherCanvas');
      this.gatherCtx = this.gatherCanvas ? this.gatherCanvas.getContext('2d') : null;

      // Five drifting radial ember orbs for Stage 1
      this.emberOrbs = [
        { x: 0.22, y: 0.28, r: 0.42, a: 0.24, sx: 0.31, sy: 0.23, ax: 0.14, ay: 0.12, ph: 0.0, c: [228, 75, 60] },
        { x: 0.72, y: 0.34, r: 0.46, a: 0.22, sx: 0.24, sy: 0.35, ax: 0.16, ay: 0.10, ph: 1.4, c: [245, 158, 11] },
        { x: 0.48, y: 0.62, r: 0.38, a: 0.18, sx: 0.29, sy: 0.19, ax: 0.18, ay: 0.14, ph: 2.8, c: [228, 75, 60] },
        { x: 0.82, y: 0.74, r: 0.35, a: 0.16, sx: 0.21, sy: 0.27, ax: 0.12, ay: 0.15, ph: 4.1, c: [251, 146, 60] },
        { x: 0.30, y: 0.78, r: 0.40, a: 0.26, sx: 0.33, sy: 0.22, ax: 0.15, ay: 0.11, ph: 5.2, c: [228, 75, 60] }
      ];

      this.resizeCanvases();
      this.bindScroll();
      this.bindVisibility();
      this.initAtomMotion();
      this.updateStages();

      if (prefersReduced()) {
        this.progress.wipe = 1;
        this.progress.curve = 1;
        this.progress.gather = 0.5;
        this.updateCurveUI(1);
        this.drawHeroEmbers(0);
        this.drawCurve(1, 0);
        this.drawGatherForms(0);
      } else {
        this.startCanvasLoop();
      }
    }

    resizeCanvases() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const fit = (canvas) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      };
      fit(this.heroCanvas);
      fit(this.curveCanvas);
      fit(this.gatherCanvas);
    }

    bindScroll() {
      const onScroll = () => {
        if (this.scrollTicking) return;
        this.scrollTicking = true;
        requestAnimationFrame(() => {
          this.updateStages();
          this.scrollTicking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => {
        this.resizeCanvases();
        this.updateStages();
      }, { passive: true });
    }

    bindVisibility() {
      if (!('IntersectionObserver' in window)) {
        this.visible.hero = this.visible.curve = this.visible.gather = true;
        return;
      }
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const key = entry.target.dataset.pinStage;
          if (key && key in this.visible) {
            this.visible[key] = entry.isIntersecting;
            if (entry.isIntersecting) this.resizeCanvases();
          }
        });
      }, { threshold: 0.01 });

      this.stages.forEach((stage) => obs.observe(stage));
    }

    updateStages() {
      const vh = Math.max(1, window.innerHeight);

      this.stages.forEach((stage) => {
        const key = stage.dataset.pinStage;
        const rect = stage.getBoundingClientRect();
        const travel = Math.max(1, stage.offsetHeight - vh);
        const p = prefersReduced() ? (key === 'hero' ? 0 : 1) : Math.max(0, Math.min(1, -rect.top / travel));

        stage._scrollP = p;
        this.progress[key] = p;
        stage.style.setProperty('--p', p.toFixed(4));

        if (key === 'wipe') {
          const wipe = Math.max(0, Math.min(1, p * 1.2));
          stage.style.setProperty('--wipe', wipe.toFixed(4));
        }

        if (key === 'curve') {
          this.updateCurveUI(p);
        }
      });
    }

    sampleSeries(t) {
      const s = this.curveSeries;
      const clamped = Math.max(0, Math.min(1, t));
      const scaled = clamped * (s.length - 1);
      const i0 = Math.floor(scaled);
      const i1 = Math.min(s.length - 1, i0 + 1);
      const frac = scaled - i0;
      return s[i0] + (s[i1] - s[i0]) * frac;
    }

    updateCurveUI(p) {
      const activeIdx = Math.min(4, Math.floor(p * 5));
      this.curveRows.forEach((row, idx) => {
        row.classList.toggle('is-lit', idx <= activeIdx);
      });

      if (this.curveReadout) {
        const val = this.sampleSeries(p);
        this.curveReadout.textContent = val >= 10 ? val.toFixed(1) : val.toFixed(2);
      }

      if (this.curveStageLabel) {
        this.curveStageLabel.textContent = `STAGE 0${activeIdx + 1} / 05`;
      }
    }

    startCanvasLoop() {
      const tick = (now) => {
        if (!document.hidden) {
          const t = (now - this.startTime) * 0.001;
          if (this.visible.hero) this.drawHeroEmbers(t);
          if (this.visible.curve) this.drawCurve(this.progress.curve, t);
          if (this.visible.gather) this.drawGatherForms(t);
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    drawHeroEmbers(t) {
      const ctx = this.heroCtx;
      const canvas = this.heroCanvas;
      if (!ctx || !canvas || canvas.width === 0) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';

      const baseDim = Math.max(w, h);
      for (let i = 0; i < this.emberOrbs.length; i++) {
        const orb = this.emberOrbs[i];
        const cx = (orb.x + Math.sin(t * orb.sx + orb.ph) * orb.ax) * w;
        const cy = (orb.y + Math.cos(t * orb.sy + orb.ph * 1.3) * orb.ay) * h;
        const rad = orb.r * baseDim;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${orb.c[0]}, ${orb.c[1]}, ${orb.c[2]}, ${orb.a})`);
        g.addColorStop(0.5, `rgba(${orb.c[0]}, ${orb.c[1]}, ${orb.c[2]}, ${(orb.a * 0.35).toFixed(3)})`);
        g.addColorStop(1, `rgba(${orb.c[0]}, ${orb.c[1]}, ${orb.c[2]}, 0)`);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    drawCurve(p, t) {
      const ctx = this.curveCtx;
      const canvas = this.curveCanvas;
      if (!ctx || !canvas || canvas.width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const padX = 28 * dpr;
      const padTop = 26 * dpr;
      const padBottom = 64 * dpr;
      const plotW = Math.max(10, w - padX * 2);
      const plotH = Math.max(10, h - padTop - padBottom);
      const maxVal = 190;

      // Subtle hairline grid
      ctx.strokeStyle = 'rgba(233, 237, 230, 0.08)';
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      for (let i = 0; i <= 4; i++) {
        const gy = padTop + (plotH * i) / 4;
        ctx.moveTo(padX, gy);
        ctx.lineTo(padX + plotW, gy);
      }
      ctx.stroke();

      const samples = 120;
      const toXY = (u) => {
        const val = this.sampleSeries(u);
        const x = padX + u * plotW;
        const y = padTop + (1 - val / maxVal) * plotH;
        return [x, y];
      };

      // 1. Full curve in 22% bone
      ctx.strokeStyle = 'rgba(233, 237, 230, 0.22)';
      ctx.lineWidth = 1.4 * dpr;
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const [x, y] = toXY(i / samples);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Ember trace from 0 to current progress p
      const clampedP = Math.max(0.005, Math.min(1, p));
      const traceSteps = Math.max(2, Math.round(samples * clampedP));

      ctx.strokeStyle = '#e44b3c';
      ctx.lineWidth = 2.4 * dpr;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i <= traceSteps; i++) {
        const u = (i / traceSteps) * clampedP;
        const [x, y] = toXY(u);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Pulsing dot + soft halo at exact head of trace
      const [hx, hy] = toXY(clampedP);
      const pulse = 1 + Math.sin(t * 4.2) * 0.25;
      const haloR = 18 * dpr * pulse;

      const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, haloR);
      halo.addColorStop(0, 'rgba(228, 75, 60, 0.55)');
      halo.addColorStop(0.45, 'rgba(245, 158, 11, 0.18)');
      halo.addColorStop(1, 'rgba(228, 75, 60, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(hx, hy, haloR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e9ede6';
      ctx.beginPath();
      ctx.arc(hx, hy, 3.8 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#e44b3c';
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();
    }

    drawGatherForms(t) {
      const ctx = this.gatherCtx;
      const canvas = this.gatherCanvas;
      if (!ctx || !canvas || canvas.width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.44;
      const baseUnit = Math.min(w, h) * 0.34;

      const layers = [
        { scale: 1.0, k1: 3, k2: 5, s1: 0.75, s2: 1.1, a1: 0.085, a2: 0.045, ph: 0.0 },
        { scale: 0.74, k1: 4, k2: 7, s1: -0.9, s2: 1.35, a1: 0.095, a2: 0.04, ph: 1.7 },
        { scale: 0.48, k1: 2, k2: 5, s1: 1.15, s2: -0.85, a1: 0.11, a2: 0.055, ph: 3.1 }
      ];

      ctx.globalCompositeOperation = 'screen';
      const steps = 128;

      layers.forEach((layer) => {
        const R = baseUnit * layer.scale;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const ang = (i / steps) * Math.PI * 2;
          const mod = 1
            + Math.sin(ang * layer.k1 + t * layer.s1 + layer.ph) * layer.a1
            + Math.sin(ang * layer.k2 - t * layer.s2 + layer.ph * 1.4) * layer.a2;
          const r = R * mod;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(cx, cy, R * 0.05, cx, cy, R * 1.15);
        grad.addColorStop(0, 'rgba(228, 75, 60, 0.16)');
        grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.08)');
        grad.addColorStop(1, 'rgba(228, 75, 60, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = 'rgba(228, 75, 60, 0.34)';
        ctx.lineWidth = 1.25 * dpr;
        ctx.stroke();
      });

      ctx.globalCompositeOperation = 'source-over';
    }

    initAtomMotion() {
      // 1. Split every [data-atom-words] into per-word inline-block spans on 36ms stagger
      document.querySelectorAll('[data-atom-words]').forEach((el) => {
        let wordIdx = 0;
        const wrapTextNode = (node) => {
          const text = node.textContent;
          if (!text || !text.trim()) return;
          const parts = text.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else if (part.length) {
              const outer = document.createElement('span');
              outer.className = 'atom-w';
              const inner = document.createElement('span');
              inner.className = 'atom-wi';
              inner.style.setProperty('--d', `${wordIdx * 36}ms`);
              inner.textContent = part;
              outer.appendChild(inner);
              frag.appendChild(outer);
              wordIdx++;
            }
          });
          node.parentNode.replaceChild(frag, node);
        };

        const walk = (root) => {
          Array.from(root.childNodes).forEach((child) => {
            if (child.nodeType === 3) wrapTextNode(child);
            else if (child.nodeType === 1) walk(child);
          });
        };
        walk(el);
      });

      // 2. Tag key furniture elements with staggered [data-rev] delays (40-90ms)
      const groups = [
        { sel: '.nav__links a', step: 50 },
        { sel: '.caps__grid .cap__title', step: 65 },
        { sel: '.work-list .work-row', step: 55 },
        { sel: '.footer__cols li', step: 40 },
        { sel: '.facts > div', step: 60 },
        { sel: '.stack__list li', step: 35 }
      ];

      groups.forEach(({ sel, step }) => {
        document.querySelectorAll(sel).forEach((el, idx) => {
          if (!el.hasAttribute('data-rev')) {
            el.setAttribute('data-rev', '');
            el.style.setProperty('--d', `${Math.min(idx, 12) * step}ms`);
          }
        });
      });

      const targets = document.querySelectorAll('[data-rev], [data-atom-words]');
      if (!('IntersectionObserver' in window) || prefersReduced()) {
        targets.forEach((el) => el.classList.add('is-in'));
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      targets.forEach((el) => io.observe(el));
    }
  }

  /* ==========================================================================
     3C. MAGNIFICATION DOCK (macOS-style Spring Physics Floating Bar)
     Exact spring oscillator (mass: 0.1, stiffness: 150, damping: 12) driving
     smooth distance-based magnification + section active indicator.
     ========================================================================== */
  class MagnificationDock {
    constructor() {
      this.dock = document.getElementById('magDock');
      if (!this.dock) return;

      this.items = Array.from(this.dock.querySelectorAll('.mag-dock__item'));
      if (!this.items.length) return;

      // Bouncy bubbly spring parameters
      this.mass = 0.1;
      this.stiffness = 175;
      this.damping = 10.5;
      this.distance = 200;

      this.isTouch = window.matchMedia('(pointer: coarse)').matches;
      this.mouseX = Infinity;
      this.rafId = null;
      this.lastTime = 0;

      this.getBaseSize = () => (window.innerWidth <= 640 ? 40 : 48);
      this.getMaxSize = () => (window.innerWidth <= 640 ? 48 : 78);

      const base = this.getBaseSize();
      this.states = this.items.map((el) => ({
        el,
        size: base,
        target: base,
        vel: 0
      }));

      this.bindEvents();
      this.bindActiveSection();
    }

    bindEvents() {
      // Hover spring magnification + liquid glass caustic sheen (desktop / fine pointer)
      if (!this.isTouch && !prefersReduced()) {
        this.dock.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX;
          const rect = this.dock.getBoundingClientRect();
          const relX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
          this.dock.style.setProperty('--dock-mx', `${relX.toFixed(1)}px`);
          this.dock.style.setProperty('--dock-sheen', '1');
          this.startLoop();
        }, { passive: true });

        this.dock.addEventListener('mouseleave', () => {
          this.mouseX = Infinity;
          this.dock.style.setProperty('--dock-sheen', '0');
          this.startLoop();
        }, { passive: true });
      }

      window.addEventListener('resize', () => {
        const base = this.getBaseSize();
        this.states.forEach((s) => {
          s.size = base;
          s.target = base;
          s.vel = 0;
          s.el.style.width = `${base}px`;
          s.el.style.height = `${base}px`;
        });
      }, { passive: true });

      // Click / action routing
      this.items.forEach((btn) => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.dockAction;
          const target = btn.dataset.dockTarget;
          playSfx('click');

          if (action === 'nav' && target) {
            const el = document.querySelector(target);
            if (el && lenis) lenis.scrollTo(el);
            else if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (action === 'cmd') {
            const dlg = document.getElementById('cmdPaletteDialog');
            const inp = document.getElementById('cmdPaletteInput');
            if (dlg && !dlg.open) {
              dlg.showModal();
              inp?.focus();
            }
          } else if (action === 'cv') {
            if (typeof openCvModalGlobal === 'function') openCvModalGlobal();
          }
        });
      });
    }

    bindActiveSection() {
      const navButtons = this.items.filter((b) => b.dataset.dockAction === 'nav');
      const sectionIds = ['#top', '#about', '#skills', '#work', '#journey', '#contact'];
      const sections = sectionIds
        .map((sel) => ({ sel, el: document.querySelector(sel) }))
        .filter((s) => s.el);

      if (!sections.length) return;

      const updateActive = () => {
        const scrollMid = window.innerHeight * 0.4;
        let current = '#top';
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].el.getBoundingClientRect();
          if (rect.top <= scrollMid) {
            current = sections[i].sel;
          }
        }
        navButtons.forEach((b) => {
          b.classList.toggle('is-active', b.dataset.dockTarget === current);
        });
      };

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
      }, { passive: true });
      updateActive();
    }

    startLoop() {
      if (this.rafId) return;
      this.lastTime = performance.now();
      const tick = (now) => {
        const dt = Math.min(0.032, Math.max(0.004, (now - this.lastTime) / 1000));
        this.lastTime = now;

        const base = this.getBaseSize();
        const max = this.getMaxSize();
        let anyMoving = false;

        for (let i = 0; i < this.states.length; i++) {
          const s = this.states[i];
          if (this.mouseX === Infinity) {
            s.target = base;
          } else {
            const rect = s.el.getBoundingClientRect();
            const centerX = rect.left + rect.width * 0.5;
            const dist = Math.abs(this.mouseX - centerX);
            if (dist < this.distance) {
              const norm = 1 - dist / this.distance;
              // Smooth cosine bell curve for fluid macOS magnification
              const eased = 0.5 - 0.5 * Math.cos(norm * Math.PI);
              s.target = base + (max - base) * eased;
            } else {
              s.target = base;
            }
          }

          // Damped harmonic spring integration: a = (-k * x - c * v) / m
          const force = -this.stiffness * (s.size - s.target) - this.damping * s.vel;
          const acc = force / this.mass;
          s.vel += acc * dt;
          s.size += s.vel * dt;

          if (Math.abs(s.size - s.target) > 0.08 || Math.abs(s.vel) > 0.08) {
            anyMoving = true;
          } else {
            s.size = s.target;
            s.vel = 0;
          }

          s.el.style.width = `${s.size.toFixed(2)}px`;
          s.el.style.height = `${s.size.toFixed(2)}px`;
        }

        if (anyMoving || this.mouseX !== Infinity) {
          this.rafId = requestAnimationFrame(tick);
        } else {
          this.rafId = null;
        }
      };
      this.rafId = requestAnimationFrame(tick);
    }
  }

  /* Hero Burn-In & Portrait Shutter-Settle Entrance Animation */
  function animateHeroEntrance() {
    if (typeof gsap === 'undefined' || prefersReduced()) return;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo('.hero',
      { '--burn': '14vmax' },
      { '--burn': '44vmax', duration: 1.25 },
      0
    )
    .fromTo('#heroFigure',
      { y: 28, scale: 1.07 },
      { y: 0, scale: 1, duration: 1.15, clearProps: 'transform' },
      0
    )
    .fromTo('#heroRim',
      { opacity: 0.15 },
      { opacity: 0.9, duration: 1.15 },
      0.08
    )
    .from('[data-intro]', {
      y: 16,
      stagger: 0.07,
      duration: 0.85
    }, 0.12);
  }

  /* ==========================================================================
     4. GSAP & SCROLLTRIGGER SETUP
     ========================================================================== */
  function initScrollExperience() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll ONLY for Desktop
    // Native momentum scrolling on Android/iOS is much smoother and prevents touch-hijacking lag
    const mobileUser = isMobile();
    if (typeof Lenis !== 'undefined' && !mobileUser) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(500, 33);
    }

    // 2. Nav Header Scroll states
    const nav = document.getElementById('nav');
    let lastY = 0;
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        const currentY = self.scroll();
        if (nav) {
          if (currentY > 80) nav.classList.add('is-scrolled');
          else nav.classList.remove('is-scrolled');

          if (currentY > lastY && currentY > 300) {
            nav.classList.add('is-hidden');
          } else {
            nav.classList.remove('is-hidden');
          }
        }
        lastY = currentY;
      }
    });

    // 3. Section Titles Character / Word Split Reveals
    document.querySelectorAll('[data-split]').forEach(title => {
      const words = title.innerText.split(' ');
      title.innerHTML = words.map(w => `<span class="w"><span class="wi">${w}</span></span> `).join('');

      gsap.from(title.querySelectorAll('.wi'), {
        yPercent: 105,
        duration: 0.9,
        stagger: 0.035,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%'
        }
      });
    });

    // 4. Statement Kinetic Typography Reveal
    const statement = document.querySelector('[data-words]');
    if (statement) {
      const words = statement.innerText.split(' ');
      statement.innerHTML = words.map(w => `<span class="w"><span class="wi">${w}</span></span> `).join('');
      const wordEls = statement.querySelectorAll('.wi');

      gsap.fromTo(wordEls,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: statement,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 0.8
          }
        }
      );
    }

    // 5. General Element Reveals ([data-reveal])
    document.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%'
        }
      });
    });

    // 6. Image Parallax & Scale Reveals ([data-reveal-img])
    document.querySelectorAll('[data-reveal-img]').forEach(box => {
      const img = box.querySelector('img');
      if (!img) return;

      gsap.fromTo(img,
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: box,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

    // 6B. Continuous Horizontal Ticker-Tape Flow (GSAP ScrollTrigger)
    const tapeSection = document.getElementById('tickerTape');
    const tapeTrack = document.getElementById('tapeTrack');
    const tapeBar = document.getElementById('tapeBar');
    const tapePct = document.getElementById('tapePct');

    if (tapeSection && tapeTrack && !prefersReduced()) {
      const drawPaths = Array.from(tapeTrack.querySelectorAll('.tape__draw'));
      const spinIcons = Array.from(tapeTrack.querySelectorAll('.tape__spin'));

      const pathLengths = drawPaths.map((p) => {
        const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 320;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        return len;
      });

      const getTapeTravel = () => Math.max(0, tapeTrack.scrollWidth - window.innerWidth);

      const tapeTween = gsap.to(tapeTrack, {
        x: () => -getTapeTravel(),
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: tapeSection,
        start: 'top top',
        end: () => `+=${Math.max(400, getTapeTravel())}`,
        pin: true,
        anticipatePin: 1,
        animation: tapeTween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (tapeBar) tapeBar.style.transform = `scaleX(${p.toFixed(4)})`;
          if (tapePct) tapePct.textContent = `${String(Math.round(p * 100)).padStart(2, '0')}%`;

          // Draw inline SVG curves progressively along the horizontal tape
          drawPaths.forEach((path, idx) => {
            const start = idx === 0 ? 0.02 : 0.42;
            const span = 0.42;
            const localP = Math.max(0, Math.min(1, (p - start) / span));
            path.style.strokeDashoffset = `${(pathLengths[idx] * (1 - localP)).toFixed(2)}`;
          });

          // Gently rotate inline mechanical/telemetry icons as the tape glides
          spinIcons.forEach((icon, idx) => {
            const dir = idx % 2 === 0 ? 1 : -1;
            icon.style.transform = `rotate(${(p * 180 * dir).toFixed(2)}deg)`;
          });
        }
      });
    }

    // 7. Journey Horizontal Track Pinned Scrub (Desktop only)
    const journeySection = document.getElementById('journey');
    const journeyTrack = document.getElementById('journeyTrack');
    const journeyBar = document.getElementById('journeyBar');

    if (journeySection && journeyTrack && !isMobile()) {
      const getScrollAmount = () => {
        return -(journeyTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.08));
      };

      const tween = gsap.to(journeyTrack, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: journeySection,
        start: 'top top',
        end: () => `+=${journeyTrack.scrollWidth - window.innerWidth + 400}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (journeyBar) journeyBar.style.transform = `scaleX(${self.progress})`;
        }
      });
    }

    // 8. Active Nav Link Highlighter
    const sections = ['about', 'skills', 'work', 'journey', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            document.querySelectorAll('.nav__links a').forEach(a => {
              const href = a.getAttribute('href');
              if (href === `#${id}`) a.setAttribute('aria-current', 'true');
              else a.removeAttribute('aria-current');
            });
          }
        }
      });
    });
  }

  /* ==========================================================================
     5. OSCILLOSCOPE REAL-TIME SIGNAL SYNTHESIZER
     ========================================================================== */
  class SignalOscilloscope {
    constructor() {
      this.canvas = document.getElementById('scopeCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.mode = 'I2C';
      this.phase = 0;
      this.rafId = null;

      this.lblA = document.getElementById('scopeA');
      this.lblB = document.getElementById('scopeB');
      this.lblC = document.getElementById('scopeC');

      this.modes = {
        'I2C': { a: 'SCL / SDA', b: '400 kHz', c: '3.3 V CMOS' },
        'SPI': { a: 'MOSI / SCK', b: '10 MHz', c: '3.3 V PUSH-PULL' },
        'PWM': { a: 'LEDC CH0', b: '20 kHz', c: '12 V CHOPPED' },
        'MQTT': { a: 'TCP 1883', b: 'BURST', c: 'QoS-1 TELEM' }
      };

      this.resize();
      this.bindButtons();
      
      this.isVisible = true;
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            this.isVisible = e.isIntersecting;
            if (this.isVisible) {
              if (!this.rafId) this.start();
            } else {
              if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
              }
            }
          });
        }, { threshold: 0.01 });
        obs.observe(this.canvas.parentElement || this.canvas);
      } else {
        this.start();
      }

      window.addEventListener('resize', () => this.resize(), { passive: true });
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width * (window.devicePixelRatio || 1);
      this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    }

    bindButtons() {
      document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.mode;
          if (!this.modes[mode]) return;
          this.mode = mode;

          document.querySelectorAll('[data-mode]').forEach(b => {
            b.classList.remove('is-active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');

          const cfg = this.modes[mode];
          if (this.lblA) this.lblA.textContent = cfg.a;
          if (this.lblB) this.lblB.textContent = cfg.b;
          if (this.lblC) this.lblC.textContent = cfg.c;
          playSfx('tone');
        });
      });

      // Mobile Touchscreen Frequency Modulation
      this.canvas.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches[0]) return;
        const rect = this.canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const norm = Math.max(0, Math.min(1, touchX / rect.width));
        this.phase += (norm - 0.5) * 0.45;
        if (this.lblB) {
          const baseFreq = parseInt(this.modes[this.mode].b, 10) || 400;
          const modFreq = Math.round(baseFreq * (0.4 + norm * 1.2));
          this.lblB.textContent = `${modFreq} kHz (MOD)`;
        }
      }, { passive: true });

      this.canvas.addEventListener('touchend', () => {
        if (this.lblB && this.modes[this.mode]) {
          this.lblB.textContent = this.modes[this.mode].b;
        }
      }, { passive: true });
    }

    start() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      const render = () => {
        if (!this.isVisible && 'IntersectionObserver' in window) return;
        this.draw();
        this.rafId = requestAnimationFrame(render);
      };
      this.rafId = requestAnimationFrame(render);
    }

    draw() {
      const { ctx, canvas } = this;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Oscilloscope Reticle Grid
      ctx.strokeStyle = 'rgba(76, 141, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridX = 40 * (window.devicePixelRatio || 1);
      const gridY = 30 * (window.devicePixelRatio || 1);

      ctx.beginPath();
      for (let x = 0; x < w; x += gridX) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridY) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Center crosshairs
      ctx.strokeStyle = 'rgba(76, 141, 255, 0.18)';
      ctx.beginPath();
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
      ctx.stroke();

      // 2. Waveform Synthesis based on Mode
      this.phase += 0.04;
      const cy = h / 2;
      const amp = h * 0.28;

      ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
      ctx.strokeStyle = '#4c8dff';
      ctx.shadowColor = 'rgba(76, 141, 255, 0.65)';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const step = 2;
      for (let x = 0; x < w; x += step) {
        let y = cy;
        const norm = (x / w) * Math.PI * 8;

        if (this.mode === 'I2C') {
          // Packet packetized square wave with start/stop pulses
          const sq = Math.sin(norm * 1.5 + this.phase) > 0 ? 1 : -1;
          const noise = (Math.sin(norm * 12) + Math.cos(norm * 7)) * 0.05;
          y = cy + (sq * amp * 0.8) + (noise * amp);
        } else if (this.mode === 'SPI') {
          // High frequency clock bursts with chip select toggle
          const burst = Math.sin(norm * 4 - this.phase * 2) > 0 ? 1 : -1;
          y = cy + (burst * amp * 0.85);
        } else if (this.mode === 'PWM') {
          // Pulse Width Modulation duty cycle ramp
          const duty = (Math.sin(this.phase * 0.5) + 1) * 0.5;
          const saw = (x % (w / 8)) / (w / 8);
          const state = saw < (0.2 + duty * 0.6) ? 1 : -1;
          y = cy + (state * amp * 0.9);
        } else if (this.mode === 'MQTT') {
          // Packet spikes & bursts
          const envelope = Math.max(0, Math.sin((x / w) * Math.PI * 4 - this.phase));
          const noise = (Math.random() - 0.5) * 0.4;
          y = cy - (envelope * amp * 1.4) + (noise * amp * 0.3);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }
  }

  /* ==========================================================================
     6. PROJECT FILTERING & CURSOR PREVIEW TRACKER
     ========================================================================== */
  function initProjectShowcase() {
    const filters = document.querySelectorAll('[data-filter]');
    const rows = document.querySelectorAll('.work-row');
    const countEl = document.getElementById('workCount');
    const emptyEl = document.getElementById('workEmpty');

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filters.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        let visibleCount = 0;
        rows.forEach(row => {
          const domains = (row.dataset.domain || '').split(' ');
          const matches = filter === 'all' || domains.includes(filter);

          if (matches) {
            row.removeAttribute('hidden');
            visibleCount++;
          } else {
            row.setAttribute('hidden', '');
          }
        });

        if (countEl) {
          countEl.textContent = String(visibleCount).padStart(2, '0');
        }
        if (emptyEl) {
          emptyEl.hidden = visibleCount > 0;
        }

        ScrollTrigger.refresh();
      });
    });

    // Desktop Cursor Image Follower
    const preview = document.getElementById('workPreview');
    if (preview && !isMobile()) {
      let previewX = 0, previewY = 0;
      let targetX = 0, targetY = 0;

      window.addEventListener('mousemove', (e) => {
        targetX = e.clientX + 32;
        targetY = e.clientY - 120;
      }, { passive: true });

      const tick = () => {
        previewX += (targetX - previewX) * 0.12;
        previewY += (targetY - previewY) * 0.12;
        preview.style.transform = `translate(${previewX}px, ${previewY}px)`;
        requestAnimationFrame(tick);
      };
      tick();

      rows.forEach(row => {
        const btn = row.querySelector('[data-open]');
        if (!btn) return;
        const id = btn.dataset.open;

        btn.addEventListener('mouseenter', () => {
          preview.classList.add('is-visible');
          preview.querySelectorAll('img').forEach(img => {
            if (img.dataset.id === id) img.classList.add('is-active');
            else img.classList.remove('is-active');
          });
        });

        btn.addEventListener('mouseleave', () => {
          preview.classList.remove('is-visible');
        });
      });
    }
  }

  /* ==========================================================================
     7. CASE STUDY MODAL DRAWER
     ========================================================================== */
  function initCaseStudyModal() {
    const dialog = document.getElementById('caseDialog');
    const closeBtn = document.getElementById('caseClose');
    const content = document.getElementById('caseContent');
    const idxEl = document.getElementById('caseIdx');
    if (!dialog || !content) return;

    const openProject = (id) => {
      const data = PROJECTS[id];
      if (!data) return;

      if (idxEl) idxEl.textContent = data.idx;

      let specsHtml = '';
      data.specs.forEach(s => {
        specsHtml += `
          <div>
            <dt class="mono">${s.label}</dt>
            <dd>${s.val}</dd>
          </div>
        `;
      });

      let stackHtml = '';
      data.stack.forEach(t => {
        stackHtml += `<li>${t}</li>`;
      });

      const nextData = PROJECTS[data.nextId];

      content.innerHTML = `
        <div class="case__media">
          <img src="${data.image}" alt="${data.title}" width="1200" height="800">
        </div>
        <div class="case__body">
          <p class="case__badge mono">${data.badge}</p>
          <h2 class="case__title" id="caseTitle">${data.title}</h2>
          <p class="case__desc">${data.desc}</p>

          <p class="case__h mono">System specifications</p>
          <dl class="case__specs">
            ${specsHtml}
          </dl>

          <p class="case__h mono">Architecture &amp; Firmware Logic</p>
          <p class="case__details">${data.details}</p>

          <p class="case__h mono">Technologies &amp; Components</p>
          <ul class="case__stack">
            ${stackHtml}
          </ul>
        </div>
        ${nextData ? `
          <button type="button" class="case__next" data-open="${data.nextId}">
            <span class="mono">Next case study — ${nextData.num}</span>
            <strong>${nextData.title} <span aria-hidden="true">→</span></strong>
          </button>
        ` : ''}
      `;

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.documentElement.classList.add('is-locked');
      if (lenis) lenis.stop();

      // Bind dynamic next project click
      const nextBtn = content.querySelector('.case__next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          openProject(nextBtn.dataset.open);
          dialog.scrollTop = 0;
        });
      }
    };

    const closeDialog = () => {
      dialog.classList.add('is-closing');
      setTimeout(() => {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
        dialog.classList.remove('is-closing');
        document.documentElement.classList.remove('is-locked');
        if (lenis) lenis.start();
      }, 420);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) closeDialog();
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeDialog();
    });

    document.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        openProject(btn.dataset.open);
      });
    });

    document.querySelectorAll('[data-project]').forEach(box => {
      box.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        openProject(box.dataset.project);
      });
    });
  }

  /* ==========================================================================
     8. SHOWREEL CINEMATIC VIDEO DIALOG
     ========================================================================== */
  function initShowreel() {
    const reelBtn = document.getElementById('reelBtn');
    const reelDialog = document.getElementById('reelDialog');
    const reelClose = document.getElementById('reelClose');
    const reelVideo = document.getElementById('reelVideo');
    if (!reelDialog || !reelVideo) return;

    const openReel = () => {
      if (!reelVideo.src && reelVideo.dataset.src) {
        reelVideo.src = reelVideo.dataset.src;
      }
      if (typeof reelDialog.showModal === 'function') reelDialog.showModal();
      else reelDialog.setAttribute('open', '');

      document.documentElement.classList.add('is-locked');
      if (lenis) lenis.stop();
      reelVideo.currentTime = 0;
      reelVideo.play().catch(() => {});
    };

    const closeReel = () => {
      reelVideo.pause();
      if (typeof reelDialog.close === 'function') reelDialog.close();
      else reelDialog.removeAttribute('open');

      document.documentElement.classList.add('is-locked');
      document.documentElement.classList.remove('is-locked');
      if (lenis) lenis.start();
    };

    if (reelBtn) reelBtn.addEventListener('click', openReel);
    if (reelClose) reelClose.addEventListener('click', closeReel);

    reelDialog.addEventListener('click', (e) => {
      if (e.target === reelDialog) closeReel();
    });
    reelDialog.addEventListener('cancel', closeReel);
  }

  /* ==========================================================================
     9. INTERACTIVE HARDWARE TERMINAL CLI
     ========================================================================== */
  function initTerminal() {
    const form = document.getElementById('termForm');
    const input = document.getElementById('termInput');
    const body = document.getElementById('termBody');
    if (!form || !input || !body) return;

    const print = (html) => {
      const p = document.createElement('p');
      p.innerHTML = html;
      body.appendChild(p);
      body.scrollTop = body.scrollHeight;
    };

    const commands = {
      'help': () => {
        print(`<b>Available laboratory commands:</b>
  <span class="t-accent">projects</span>        — List all engineering hardware builds
  <span class="t-accent">open &lt;id&gt;</span>         — Launch schematic case study (e.g. 'open patrol-robot')
  <span class="t-accent">about</span>           — Sangeeth's discipline, university &amp; engineering creed
  <span class="t-accent">skills</span>          — Core technical firmware &amp; hardware capabilities
  <span class="t-accent">resume</span>          — Download official Curriculum Vitae (PDF)
  <span class="t-accent">view cv</span>         — View Curriculum Vitae online without download
  <span class="t-accent">transmit</span>        — Jump to direct Google Form / Spreadsheet dispatch
  <span class="t-accent">contact</span>         — Direct email dispatch &amp; social profiles
  <span class="t-accent">theme</span>           — Toggle theme (Dark Graphite / Light Bone)
  <span class="t-accent">sfx</span>             — Toggle Web Audio parametric synthesizer
  <span class="t-accent">tour</span>            — Play automated kinetic cursor showcase sequence
  <span class="t-accent">matrix</span>          — Telemetry hardware matrix readout
  <span class="t-accent">bench</span>           — Live ESP32 Rover V2 hardware status
  <span class="t-accent">estop</span>           — Emergency hardware stop trigger
  <span class="t-accent">clear</span>           — Clear terminal buffer
  <span class="t-accent">sudo hire-me</span>    — Accelerated contact pipeline`);
      },
      'projects': () => {
        print(`<b>Featured Engineering Deployments:</b>
  [1] <span class="t-accent">patrol-robot</span>     — Smart Security Patrol Robot V1 (Flagship)
  [2] <span class="t-accent">fire-robot</span>       — Fire Fighting Robot (Safety Actuation)
  [3] <span class="t-accent">waste-machine</span>    — AI Waste Segregation Machine (TinyML)
  [4] <span class="t-accent">smart-agri</span>       — Smart Agriculture &amp; Crop AI (ESP32-CAM)
  [5] <span class="t-accent">smart-classroom</span>  — Facility RFID Attendance &amp; Relays
  [6] <span class="t-accent">lpg-safety</span>       — Sub-second Gas Valve Cutoff
  [7] <span class="t-accent">mark-ai</span>          — Personal AI Lab Assistant Node

Type <span class="t-accent">'open &lt;id&gt;'</span> to view full blueprints.`);
      },
      'about': () => {
        print(`<b>Sangeeth Sasikumar K S</b>
B.Tech Mechatronics Engineering @ Jyothi Engineering College, Kerala.
Passionate about Robotics, IoT, Embedded AI and building real world solutions.
Creed: <span class="serif">"Good code. Cool robots. Better me."</span>`);
      },
      'skills': () => {
        print(`<b>Capabilities Stack:</b>
• <b>Embedded:</b> C/C++, ESP32 (FreeRTOS), ESP-IDF, Arduino, PlatformIO
• <b>Robotics:</b> Differential Drive Kinematics, PID Speed, TB6612FNG H-Bridge
• <b>IoT:</b> MQTT (QoS), Blynk Cloud, HTTP REST, WebSockets, MJPEG streaming
• <b>Edge AI:</b> Edge Impulse, TensorFlow Lite Micro, OpenCV, INT8 Quantization`);
      },
      'contact': () => {
        print(`<b>Direct Dispatch Link:</b>
Email:    <a href="mailto:sangeethcherur@gmail.com">sangeethcherur@gmail.com</a>
GitHub:   <a href="https://github.com/sangeeth2008" target="_blank">github.com/sangeeth2008</a>
LinkedIn: <a href="https://www.linkedin.com/in/sangeeth-sasikumar-k-s-1b4703422/" target="_blank">linkedin.com/in/sangeeth-sasikumar-k-s-1b4703422</a>`);
      },
      'bench': () => {
        print(`<span class="t-ok">✓ BENCH LIVE:</span> Lenovo LOQ + ESP32 Dual-Core Dev Kit
<span class="t-ok">✓ ACTIVE SENSORS:</span> HC-SR04 Dual Ultrasonic + MPU6050 IMU
<span class="t-ok">✓ FIRMWARE:</span> Non-blocking FSM Loop (10ms tick, 0% delay calls)
<span class="t-accent">ROVER V2 IN CHASSIS VALIDATION.</span>`);
      },
      'theme': () => {
        toggleTheme();
        print(`<span class="t-ok">Theme switched successfully.</span>`);
      },
      'sfx': () => {
        toggleSfx();
        print(`<span class="t-ok">Audio SFX state updated.</span>`);
      },
      'tour': () => {
        print(`<span class="t-ok">▶ Initiating automated kinetic cursor showcase sequence...</span>`);
        if (typeof window.startCursorTour === 'function') window.startCursorTour();
      },
      'cursor': () => {
        commands.tour();
      },
      'resume': () => {
        print(`<span class="t-ok">Dispatching Curriculum Vitae PDF (Sangeeth_Sasikumar_CV.pdf)...</span>`);
        window.open('assets/Sangeeth_Sasikumar_CV.pdf', '_blank');
      },
      'cv': () => {
        commands.resume();
      },
      'view cv': () => {
        print(`<span class="t-ok">Launching in-browser Curriculum Vitae viewer...</span>`);
        if (typeof openCvModalGlobal === 'function') openCvModalGlobal();
      },
      'view-cv': () => {
        commands['view cv']();
      },
      'download cv': () => {
        commands.resume();
      },
      'transmit': () => {
        print(`<span class="t-ok">Redirecting to transmission dispatch console...</span>`);
        const el = document.getElementById('transmissionConsole');
        if (el && lenis) lenis.scrollTo(el);
        else if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      'matrix': () => {
        print(`<span class="t-accent">=== CORE TELEMETRY MATRIX ===</span>
CORE FREQ:   240 MHz (XTAL locked)
HEAP FREE:   284 KB internal SRAM
BUS I2C:     400 kHz ACK (MPU6050, LCD)
BUS SPI:     10 MHz (OV2640 DVP)
PWM LEDC:    20 kHz 14-bit resolution
SAFETY CONE: &gt; 25cm all zones clear`);
      },
      'estop': () => {
        print(`<span class="t-warn">⚠ EMERGENCY STOP TRIGGERED.</span> TB6612FNG disabled. PWM duty set to 0. MPU6050 angle latch active.`);
        playSfx('tone');
      },
      'clear': () => {
        body.innerHTML = '';
      },
      'sudo hire-me': () => {
        print(`<span class="t-ok">PERMISSION GRANTED.</span> Forwarding to direct communication link...`);
        setTimeout(() => {
          window.location.href = 'mailto:sangeethcherur@gmail.com?subject=Opportunity%20/%20Mechatronics%20Collaboration';
        }, 600);
      }
    };

    input.addEventListener('input', () => playSfx('key'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      print(`<span class="t-cmd">❯ ${val}</span>`);
      input.value = '';

      const lower = val.toLowerCase();
      if (lower.startsWith('open ')) {
        const id = lower.replace('open ', '').trim();
        if (PROJECTS[id]) {
          print(`<span class="t-ok">Launching blueprints for [${id}]...</span>`);
          const targetBtn = document.querySelector(`[data-open="${id}"]`);
          if (targetBtn) targetBtn.click();
        } else {
          print(`<span class="t-warn">Error: Project '${id}' not recognized. Type 'projects' for directory.</span>`);
        }
        return;
      }

      if (commands[lower]) {
        commands[lower]();
      } else {
        print(`<span class="t-dim">Command not found: '${val}'. Type 'help' for available commands.</span>`);
      }
    });
  }

  /* ==========================================================================
     10. COPY EMAIL TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  function initEmailCopy() {
    const copyBtn = document.getElementById('copyEmail');
    const toast = document.getElementById('toast');
    if (!copyBtn) return;

    let toastTimeout = null;
    const showToast = (msg) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-on');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('is-on');
      }, 2600);
    };

    copyBtn.addEventListener('click', async () => {
      const email = 'sangeethcherur@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Copied email to clipboard: ' + email);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  /* ==========================================================================
     11. FLAGSHIP MECHATRONICS KINETIC CURSOR (VELOCITY DEFORMATION & TRAIL)
     ========================================================================== */
  function initMagneticAndCursor() {
    if (isMobile()) return; // Touch devices use touch sonar

    const cursor = document.getElementById('customCursor') || document.querySelector('.cursor');
    const dot = cursor ? cursor.querySelector('.cursor__dot') : null;
    const ring = cursor ? cursor.querySelector('.cursor__ring') : null;
    const label = cursor ? cursor.querySelector('.cursor__label') : null;
    const ripple = cursor ? cursor.querySelector('.cursor__ripple') : null;
    const spotlight = document.getElementById('cursorSpotlight');
    const trailCanvas = document.getElementById('cursorTrail');

    if (!cursor || !dot || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let prevTargetX = targetX;
    let prevTargetY = targetY;
    let spotlightX = targetX;
    let spotlightY = targetY;
    let currentVelocity = 0;
    let currentAngle = 0;
    let isPressed = false;
    let hasMoved = false;
    let isHidden = false;
    let activeMagnetic = null;
    let tourActive = false;
    let tourTimeline = null;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle spark trail setup
    let ctx = null;
    const particles = [];
    const maxParticles = 32;

    if (trailCanvas && !prefersReducedMotion) {
      ctx = trailCanvas.getContext('2d');
      const resizeCanvas = () => {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });
    }

    class Particle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 2.2 + 1.2;
        this.life = 1.0;
        this.decay = Math.random() * 0.04 + 0.025;
        this.isCyan = Math.random() > 0.82;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.life -= this.decay;
      }
      draw(c) {
        if (this.life <= 0) return;
        c.save();
        c.globalAlpha = Math.max(0, this.life);
        c.fillStyle = this.isCyan ? '#06b6d4' : '#f59e0b';
        c.shadowColor = this.isCyan ? 'rgba(6,182,212,0.8)' : 'rgba(245,158,11,0.8)';
        c.shadowBlur = 6;
        c.beginPath();
        c.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const spawnSparks = (x, y, dx, dy, speed) => {
      if (!ctx || prefersReducedMotion || speed < 2.5) return;
      const count = Math.min(Math.floor(speed / 9) + 1, 3);
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) particles.shift();
        const spread = (Math.random() - 0.5) * 1.6;
        const pVx = -dx * 0.14 + spread;
        const pVy = -dy * 0.14 + spread;
        particles.push(new Particle(x, y, pVx, pVy));
      }
    };

    const activateCursor = () => {
      if (!hasMoved) {
        hasMoved = true;
        document.documentElement.classList.add('has-animated-cursor');
        cursor.classList.remove('is-hidden');
        cursor.style.display = 'block';
        if (spotlight) spotlight.style.opacity = '1';
        if (trailCanvas) trailCanvas.style.opacity = '1';
      }
    };

    const onPointerMove = (e) => {
      if (tourActive) {
        stopTour();
      }
      activateCursor();
      targetX = e.clientX;
      targetY = e.clientY;
      if (isHidden) {
        isHidden = false;
        cursor.classList.remove('is-hidden');
        if (spotlight) spotlight.classList.remove('is-hidden');
        if (trailCanvas) trailCanvas.classList.remove('is-hidden');
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Click Shockwave Burst
    const triggerClickPulse = (x, y) => {
      if (!ripple) return;
      ripple.style.setProperty('--rip-x', `${x}px`);
      ripple.style.setProperty('--rip-y', `${y}px`);
      ripple.classList.remove('is-firing');
      void ripple.offsetWidth; // Force reflow
      ripple.classList.add('is-firing');
    };

    window.addEventListener('mousedown', (e) => {
      if (tourActive) stopTour();
      activateCursor();
      isPressed = true;
      cursor.classList.add('is-pressed');
      triggerClickPulse(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      isPressed = false;
      cursor.classList.remove('is-pressed');
    });

    document.addEventListener('mouseleave', () => {
      isHidden = true;
      cursor.classList.add('is-hidden');
      if (spotlight) spotlight.classList.add('is-hidden');
      if (trailCanvas) trailCanvas.classList.add('is-hidden');
    });

    document.addEventListener('mouseenter', () => {
      isHidden = false;
      cursor.classList.remove('is-hidden');
      if (spotlight) spotlight.classList.remove('is-hidden');
      if (trailCanvas) trailCanvas.classList.remove('is-hidden');
    });

    // Event delegation for interactive hover states (works for static & dynamic items)
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, input, textarea, .chip, .feature, .glass-orb, .topic-pill, .cmd-item, [data-cursor]');
      if (!target) return;
      const text = target.dataset.cursor;
      if (text) {
        cursor.classList.add('is-label');
        if (label) label.textContent = text;
      } else {
        cursor.classList.add('is-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, input, textarea, .chip, .feature, .glass-orb, .topic-pill, .cmd-item, [data-cursor]');
      if (!target) return;
      const related = e.relatedTarget ? e.relatedTarget.closest('a, button, input, textarea, .chip, .feature, .glass-orb, .topic-pill, .cmd-item, [data-cursor]') : null;
      if (related === target) return;
      cursor.classList.remove('is-hover', 'is-label');
      if (label) label.textContent = '';
    });

    // Magnetic physics on buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        btn.style.transform = `translate(${deltaX * 0.32}px, ${deltaY * 0.32}px)`;
        activeMagnetic = { x: centerX, y: centerY };
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        activeMagnetic = null;
      });
    });

    // Main 60fps / 120fps Animation Loop
    const render = () => {
      if (hasMoved && !isHidden) {
        // Dot tracks target with zero latency (instant hardware sync)
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

        // Ring follows with smooth spring inertia
        let targetRingX = targetX;
        let targetRingY = targetY;

        // If magnetizing towards an element, apply magnetic pull
        if (activeMagnetic) {
          targetRingX = activeMagnetic.x + (targetX - activeMagnetic.x) * 0.45;
          targetRingY = activeMagnetic.y + (targetY - activeMagnetic.y) * 0.45;
        }

        const lerpFactor = 0.18;
        ringX += (targetRingX - ringX) * lerpFactor;
        ringY += (targetRingY - ringY) * lerpFactor;

        // Calculate velocity & movement delta
        const dx = targetX - prevTargetX;
        const dy = targetY - prevTargetY;
        prevTargetX = targetX;
        prevTargetY = targetY;
        const instantSpeed = Math.hypot(dx, dy);

        currentVelocity += (instantSpeed - currentVelocity) * 0.22;

        // Dynamic directional stretch angle & rotation
        if (instantSpeed > 1.2 && !prefersReducedMotion) {
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          let diff = targetAngle - currentAngle;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          currentAngle += diff * 0.32;
        }

        const stretch = prefersReducedMotion ? 0 : Math.min(currentVelocity * 0.0035, 0.42);
        const pressScale = isPressed ? 0.78 : 1;
        const scaleX = (1 + stretch) * pressScale;
        const scaleY = (1 - stretch * 0.52) * pressScale;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${currentAngle}deg) scale(${scaleX}, ${scaleY})`;

        // Keep label horizontal and upright
        if (label) {
          label.style.transform = `rotate(${-currentAngle}deg)`;
        }

        // Spotlight follows smoothly
        if (spotlight) {
          spotlightX += (targetX - spotlightX) * 0.09;
          spotlightY += (targetY - spotlightY) * 0.09;
          spotlight.style.transform = `translate3d(${spotlightX}px, ${spotlightY}px, 0)`;
        }

        // Generate spark trail
        spawnSparks(targetX, targetY, dx, dy, instantSpeed);
      }

      // Render particle trail on canvas
      if (ctx && trailCanvas) {
        ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // ========================================================================
    // OPTIONAL AUTOMATED CURSOR SHOWCASE TOUR (Triggerable via Ctrl+K or Terminal)
    // ========================================================================
    const stopTour = () => {
      if (!tourActive) return;
      tourActive = false;
      if (tourTimeline) {
        tourTimeline.kill();
        tourTimeline = null;
      }
      cursor.classList.remove('is-hover', 'is-label');
      if (label) label.textContent = '';
      showToast('Cursor control returned to manual');
    };

    window.stopCursorTour = stopTour;

    window.startCursorTour = () => {
      activateCursor();
      tourActive = true;
      showToast('Automated Cursor Tour initiated. Move mouse to resume manual.');

      const targets = [
        { sel: 'a[href="#work"]', label: 'Explore Builds' },
        { sel: '#reelBtn', label: 'Watch Reel' },
        { sel: 'a.btn--resume', label: 'Curriculum Vitae' },
        { sel: 'a[href="#skills"]', label: 'Telemetry' },
        { sel: 'a[href="#about"]', label: 'Workbench' }
      ];

      if (typeof gsap === 'undefined') {
        setTimeout(stopTour, 3000);
        return;
      }

      tourTimeline = gsap.timeline({
        onComplete: () => {
          stopTour();
        }
      });

      const virtualPos = { x: targetX, y: targetY };

      targets.forEach((item) => {
        const el = document.querySelector(item.sel);
        if (!el) return;

        tourTimeline.add(() => {
          if (!tourActive) return;
          const rect = el.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });

        tourTimeline.to(virtualPos, {
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (!tourActive) return;
            targetX = virtualPos.x;
            targetY = virtualPos.y;
          },
          x: () => {
            const r = el.getBoundingClientRect();
            return r.left + r.width / 2;
          },
          y: () => {
            const r = el.getBoundingClientRect();
            return r.top + r.height / 2;
          }
        });

        // Hover & pulse
        tourTimeline.add(() => {
          if (!tourActive) return;
          cursor.classList.add('is-label');
          if (label) label.textContent = item.label;
          triggerClickPulse(targetX, targetY);
          playSfx('key');
        });

        tourTimeline.to({}, { duration: 0.8 });

        tourTimeline.add(() => {
          if (!tourActive) return;
          cursor.classList.remove('is-label');
          if (label) label.textContent = '';
        });
      });
    };
  }

  /* ==========================================================================
     12. BUBBLE NAVIGATION MENU (GSAP Staggered Floating Pill Bubbles)
     ========================================================================== */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const overlay = document.getElementById('menu');
    const backdrop = document.getElementById('bubbleBackdrop');
    if (!menuBtn || !overlay) return;

    const bubbles = Array.from(overlay.querySelectorAll('.pill-link'));
    const labels = Array.from(overlay.querySelectorAll('.pill-label'));
    const foot = overlay.querySelector('.bubble-menu__foot');

    const animationDuration = 0.5;
    const staggerDelay = 0.12;
    const animationEase = 'back.out(1.5)';
    let isOpen = false;

    const getRot = (el) => {
      if (window.innerWidth < 900) return 0;
      const raw = el.style.getPropertyValue('--item-rot') || '0deg';
      return parseFloat(raw) || 0;
    };

    const openMenu = () => {
      if (isOpen) return;
      isOpen = true;
      playSfx('click');
      overlay.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      overlay.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('is-locked');
      if (lenis) lenis.stop();

      if (typeof gsap === 'undefined' || prefersReduced()) {
        overlay.style.display = 'flex';
        bubbles.forEach((b) => { b.style.transform = `rotate(${getRot(b)}deg) scale(1)`; });
        labels.forEach((l) => { l.style.opacity = '1'; l.style.transform = 'none'; });
        return;
      }

      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels, foot]);
      bubbles.forEach((b) => {
        gsap.set(b, { scale: 0, rotation: getRot(b), transformOrigin: '50% 50%' });
      });
      gsap.set(labels, { y: 24, autoAlpha: 0 });
      if (foot) gsap.set(foot, { y: 16, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });

      if (foot) {
        gsap.to(foot, {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          delay: 0.35,
          ease: 'power3.out'
        });
      }
    };

    const closeMenu = () => {
      if (!isOpen) return;
      isOpen = false;
      playSfx('click');
      overlay.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('is-locked');
      if (lenis) lenis.start();

      if (typeof gsap === 'undefined' || prefersReduced()) {
        overlay.style.display = 'none';
        return;
      }

      gsap.killTweensOf([...bubbles, ...labels, foot]);
      if (foot) gsap.to(foot, { y: 12, autoAlpha: 0, duration: 0.18, ease: 'power3.in' });
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          if (!isOpen) gsap.set(overlay, { display: 'none' });
        }
      });
    };

    menuBtn.addEventListener('click', () => {
      if (isOpen) closeMenu();
      else openMenu();
    });

    backdrop?.addEventListener('click', closeMenu);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    // Hover scale preserving GSAP rotation cleanly
    bubbles.forEach((b) => {
      b.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined' && isOpen && !prefersReduced()) {
          gsap.to(b, { scale: 1.06, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        }
      });
      b.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined' && isOpen && !prefersReduced()) {
          gsap.to(b, { scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        }
      });
      b.addEventListener('click', (e) => {
        const href = b.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          closeMenu();
          if (target) {
            setTimeout(() => {
              if (lenis) lenis.scrollTo(target);
              else target.scrollIntoView({ behavior: 'smooth' });
            }, 220);
          }
        } else {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (isOpen && typeof gsap !== 'undefined') {
        bubbles.forEach((b) => gsap.set(b, { rotation: getRot(b) }));
      }
    }, { passive: true });
  }

  /* ==========================================================================
     13. ENDLESS MARQUEE TICKER
     ========================================================================== */
  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    let x = 0;
    const speed = 0.85;

    const tick = () => {
      x -= speed;
      const firstGroup = track.children[0];
      if (firstGroup && -x >= firstGroup.offsetWidth) {
        x = 0;
      }
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ==========================================================================
     14. 3D CARD PERSPECTIVE TILT WITH DYNAMIC SPECULAR GLARE
     ========================================================================== */
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.cap, .feature__media, .about__photo-frame');
    if (!cards.length) return;

    cards.forEach(card => {
      let bounds = null;

      const onEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const onMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const clientX = e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
        const clientY = e.clientY != null ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);
        if (clientX == null || clientY == null) return;

        const x = clientX - bounds.left;
        const y = clientY - bounds.top;
        const nx = (x / bounds.width) - 0.5;
        const ny = (y / bounds.height) - 0.5;

        // Update CSS variable for radial sheen
        card.style.setProperty('--mx', `${(x / bounds.width * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y / bounds.height * 100).toFixed(1)}%`);

        // Compute 3D rotation angles
        const rotX = (-ny * 12).toFixed(2);
        const rotY = (nx * 14).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
      };

      const onLeave = () => {
        bounds = null;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove, { passive: true });
      card.addEventListener('mouseleave', onLeave);

      // Smooth touch interaction on mobile
      card.addEventListener('touchstart', onEnter, { passive: true });
      card.addEventListener('touchmove', onMove, { passive: true });
      card.addEventListener('touchend', onLeave, { passive: true });
    });
  }

  /* ==========================================================================
     16. MOBILE-SPECIFIC SCROLL & INTERACTIVE ANIMATIONS
     ========================================================================== */
  function initMobileInteractions() {
    if (window.innerWidth >= 900) return;

    // 1. Mobile Capabilities Card In-View Border Tracer
    const caps = document.querySelectorAll('.cap');
    if ('IntersectionObserver' in window && caps.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
          } else {
            entry.target.classList.remove('is-in-view');
          }
        });
      }, { threshold: 0.4 });

      caps.forEach(c => observer.observe(c));
    }

    // 2. Mobile Project Rows Active Glow
    const rows = document.querySelectorAll('.work-row');
    if ('IntersectionObserver' in window && rows.length) {
      const rowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-focused');
          } else {
            entry.target.classList.remove('is-focused');
          }
        });
      }, { threshold: 0.55 });

      rows.forEach(r => rowObserver.observe(r));
    }
  }

  /* ==========================================================================
     17. CURRICULUM VITAE MODAL VIEWER & DIRECT DOWNLOAD CONTROLLER
     ========================================================================== */
  function initCvModal() {
    const dialog = document.getElementById('cvDialog');
    const frame = document.getElementById('cvFrame');
    const closeBtn = document.getElementById('cvClose');
    const fallback = document.getElementById('cvFallback');

    if (!dialog) return;

    // Guarantee dialog is closed and not rendered on initial page load
    dialog.removeAttribute('open');
    if (typeof dialog.close === 'function') {
      try { dialog.close(); } catch(e) {}
    }

    const openModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (frame && (!frame.src || frame.src === 'about:blank' || !frame.src.includes('Sangeeth_Sasikumar_CV.pdf'))) {
        frame.src = 'assets/Sangeeth_Sasikumar_CV.pdf#toolbar=1&navpanes=0';
      }
      if (typeof dialog.showModal === 'function') {
        try {
          dialog.showModal();
        } catch(err) {
          dialog.setAttribute('open', '');
        }
      } else {
        dialog.setAttribute('open', '');
      }
      document.documentElement.classList.add('is-locked');
      if (lenis) lenis.stop();
      playSfx('click');
    };

    const closeModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      dialog.classList.add('is-closing');
      setTimeout(() => {
        try { dialog.close(); } catch(err) {}
        dialog.removeAttribute('open');
        dialog.classList.remove('is-closing');
        document.documentElement.classList.remove('is-locked');
        if (lenis) lenis.start();
        playSfx('click');
      }, 180);
    };

    openCvModalGlobal = openModal;

    // Trigger on "View CV Online" button, link, and CV glass orb ball
    const viewBtns = document.querySelectorAll('#openCvModalBtn, #openCvModalLink, .cv-btn-view, #cvGlassBall, .glass-orb--cv, #mobileCvViewBtn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(e);
      });
    });

    // Dedicated Direct Download Handler - saves file directly to computer folder without modal
    const triggerDirectDownload = (e) => {
      playSfx('click');
      showToast('Downloading Sangeeth_Sasikumar_CV.pdf to your file explorer...');

      const tempLink = document.createElement('a');
      tempLink.href = 'assets/Sangeeth_Sasikumar_CV.pdf';
      tempLink.download = 'Sangeeth_Sasikumar_CV.pdf';
      document.body.appendChild(tempLink);
      tempLink.click();
      setTimeout(() => tempLink.remove(), 100);

      e.preventDefault();
      e.stopPropagation();
    };

    const downloadCvBtns = document.querySelectorAll('#downloadCvBtn, a.cv-btn-download, a[download="Sangeeth_Sasikumar_CV.pdf"]');
    downloadCvBtns.forEach(btn => {
      btn.addEventListener('click', triggerDirectDownload);
    });

    // Direct Close Button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
      closeBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
    }

    // Click outside on the backdrop closes the modal
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        closeModal(e);
      }
    });

    // Escape key closes modal
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeModal(e);
    });

    if (frame) {
      frame.onerror = () => {
        if (fallback) fallback.hidden = false;
      };
    }
  }

  /* ==========================================================================
     18. ANIMATED TRANSMISSION CONSOLE (GOOGLE FORM → GOOGLE SHEETS)
     ========================================================================== */
  function initTransmissionForm() {
    const form = document.getElementById('transmissionForm');
    const submitBtn = document.getElementById('transmissionSubmitBtn');
    const successHud = document.getElementById('transmissionSuccess');
    const resetBtn = document.getElementById('transmissionResetBtn');
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    const messageCounter = document.getElementById('messageCounter');
    const topicInput = document.getElementById('formTopic');
    const topicPills = document.querySelectorAll('.topic-pill');

    const confirmedSender = document.getElementById('confirmedSender');
    const confirmedEmail = document.getElementById('confirmedEmail');
    const confirmedScope = document.getElementById('confirmedScope');
    const confirmedTime = document.getElementById('confirmedTime');
    const confirmedTxId = document.getElementById('confirmedTxId');

    if (!form) return;

    // Handle topic pill selection
    topicPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        topicPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const selectedTopic = pill.dataset.topic || pill.textContent.trim();
        if (topicInput) topicInput.value = selectedTopic;
        playSfx('click');
        showToast(`Scope Selected: ${selectedTopic}`);
      });
    });

    // Message character counter
    if (messageInput && messageCounter) {
      messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        messageCounter.textContent = `${len} / 1000`;
      });
    }

    // Submission handler
    form.addEventListener('submit', () => {
      submitBtn?.classList.add('is-submitting');
      playSfx('tone');

      // Capture inputs for confirmation receipt
      const senderName = nameInput?.value?.trim() || 'Colleague';
      const senderEmail = emailInput?.value?.trim() || 'your email';
      const selectedTopic = topicInput?.value || 'Autonomous Robotics';

      const now = new Date();
      const timeStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                      now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' IST';
      const txHash = 'TX-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // Prepend selected project scope into the comments/messages field for clean Google Sheets logging
      if (messageInput && !messageInput.value.startsWith('[Scope:')) {
        messageInput.value = `[Scope: ${selectedTopic}]\n\n${messageInput.value}`;
      }

      // Allow natural HTML form POST into target="googleFormIframe" (prevents CORS & page refresh)
      setTimeout(() => {
        submitBtn?.classList.remove('is-submitting');

        // Populate personalized confirmation message
        if (confirmedSender) confirmedSender.textContent = senderName;
        if (confirmedEmail) confirmedEmail.textContent = senderEmail;
        if (confirmedScope) confirmedScope.textContent = selectedTopic;
        if (confirmedTime) confirmedTime.textContent = timeStr;
        if (confirmedTxId) confirmedTxId.textContent = txHash;

        form.hidden = true;
        if (successHud) {
          successHud.hidden = false;
          setTimeout(() => {
            successHud.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 80);
        }

        playSfx('boot');
        showToast(`✓ Transmission Confirmed! Message from ${senderName} logged to Google Sheets.`);
      }, 900);
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        if (messageCounter) messageCounter.textContent = '0 / 1000';
        topicPills.forEach((p, idx) => p.classList.toggle('is-active', idx === 0));
        if (topicInput) topicInput.value = 'Autonomous Robotics';
        if (successHud) successHud.hidden = true;
        form.hidden = false;
        playSfx('click');
        setTimeout(() => {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      });
    }
  }

  /* ==========================================================================
     INITIALIZATION ORCHESTRATION
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCommandPalette();
    initTouchSonar();

    // Hook navbar tools
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);
    document.getElementById('sfxToggleBtn')?.addEventListener('click', toggleSfx);

    // Audio unlocking on first gesture
    window.addEventListener('click', () => initAudio(), { once: true });
    window.addEventListener('touchstart', () => initAudio(), { once: true });

    new Preloader();
    new ScrollChoreographer();
    new MagnificationDock();
    new HeroLight();
    initScrollExperience();
    new SignalOscilloscope();
    init3DCardTilt();
    initProjectShowcase();
    initCaseStudyModal();
    initShowreel();
    initCvModal();
    initTerminal();
    initTransmissionForm();
    initEmailCopy();
    initMagneticAndCursor();
    initMobileMenu();
    initMobileInteractions();
    initMarquee();
  });

})();

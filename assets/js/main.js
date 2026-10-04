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
     3. PRELOADER & HERO CANVAS FRAME SCRUBBER (240 FRAMES)
     ========================================================================== */
  class HeroScrubber {
    constructor() {
      this.canvas = document.getElementById('heroCanvas');
      this.track = document.getElementById('heroTrack');
      if (!this.canvas || !this.track) return;

      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.totalFrames = 240;
      this.prefix = 'assets/frames/frame_';
      this.ext = '.jpg';
      this.images = new Array(this.totalFrames);
      this.loaded = new Uint8Array(this.totalFrames);
      this.isMobile = isMobile();

      this.currentFrame = 0;
      this.targetFrame = 0;
      this.lastDrawn = -1;
      this.progress = 0;
      this.isScrubbing = false;
      this.isHeroVisible = true;

      this.preCount = document.getElementById('preCount');
      this.preBar = document.getElementById('preBar');
      this.preStatus = document.getElementById('preStatus');
      this.preloader = document.getElementById('preloader');

      this.hudFrame = document.getElementById('hudFrame');
      this.hudBar = document.getElementById('hudBar');
      this.hudStage = document.getElementById('hudStage');
      this.hudWrap = document.querySelector('.hero__hud');
      this.cue = document.getElementById('heroCue');
      this.gyroReadout = document.getElementById('gyroReadout');

      // 3D Stage & CAD Reticle Elements
      this.stage = document.getElementById('hero3DStage');
      this.scanner = document.getElementById('heroScanner');
      this.targetCam = document.getElementById('cadCam');
      this.targetSonar = document.getElementById('cadSonar');
      this.targetMcu = document.getElementById('cadMcu');
      this.targetDrive = document.getElementById('cadDrive');

      this.tiltX = 0;
      this.tiltY = 0;
      this.targetTiltX = 0;
      this.targetTiltY = 0;
      this.idleClock = 0;
      this.isTouchActive = false;
      this.frameGeometry = null;

      // Observe visibility to suspend renderLoop when hero is offscreen
      if ('IntersectionObserver' in window && this.track) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const was = this.isHeroVisible;
            this.isHeroVisible = entry.isIntersecting;
            if (!was && this.isHeroVisible) {
              requestAnimationFrame(() => this.renderLoop());
            }
          });
        }, { threshold: 0.01 });
        observer.observe(this.track);
      }

      this.initCanvasSize();
      this.bindEvents();
      this.startInitialLoad();
    }

    initCanvasSize() {
      this.isMobile = isMobile();
      // On mobile screens, cap DPR to 1 (or max 1.25) so the GPU isn't forced to upscale 720p to 3K
      this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(window.innerWidth * this.dpr);
      this.canvas.height = Math.round(window.innerHeight * this.dpr);
      if (this.ctx) {
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = this.isMobile ? 'medium' : 'high';
      }
      this.computeFrameGeometry();
    }

    computeFrameGeometry() {
      const cw = this.canvas.width;
      const ch = this.canvas.height;
      const dpr = this.dpr || 1;
      const screenAspect = cw / ch;
      const frameAspect = 1280 / 720; // 1.7778

      let dw, dh, dx, dy;

      if (screenAspect >= frameAspect) {
        // Ultra-wide or wide desktop screens (21:9, 16:9 desktop):
        // Match height, position slightly to the right to preserve left editorial text space
        dh = ch;
        dw = dh * frameAspect;
        dx = (cw - dw) * 0.58;
        dy = 0;
      } else if (screenAspect >= 1.05) {
        // Laptops, tablets in landscape, foldables (1.05 to 1.77):
        // Scale to fill width nicely, centered with subtle upper bias
        dw = cw * 1.02;
        dh = dw / frameAspect;
        dx = (cw - dw) * 0.5;
        dy = Math.max(0, (ch - dh) * 0.42);
      } else {
        // Mobile phones & tall portrait screens (< 1.05):
        // Scale to 140% of width to ensure the robot is prominent and fills nicely
        // Anchor it slightly offset from the top to prevent clipping into the navbar
        dw = cw * 1.45;
        dh = dw / frameAspect;
        dx = (cw - dw) * 0.5;
        dy = ch * 0.12; // nicely spaced 12% from the top
      }

      this.frameGeometry = {
        dx, dy, dw, dh,
        cssDx: dx / dpr,
        cssDy: dy / dpr,
        cssDw: dw / dpr,
        cssDh: dh / dpr
      };

      this.updateReticlePositions();
      return this.frameGeometry;
    }

    updateReticlePositions() {
      if (!this.frameGeometry) return;
      const { cssDx, cssDy, cssDw, cssDh } = this.frameGeometry;

      // Exact normalized physical hardware coordinates on the 1280x720 robot frame:
      // Camera OV2640 Optics:     (52.5% X, 30.0% Y)
      // Sonar HC-SR04 Transducer: (38.5% X, 44.0% Y)
      // MCU ESP32 Dual-Core Chip: (57.5% X, 41.5% Y)
      // Drive Motor TB6612FNG:   (36.0% X, 67.0% Y)

      if (this.targetCam) {
        this.targetCam.style.left = `${(cssDx + cssDw * 0.525).toFixed(1)}px`;
        this.targetCam.style.top  = `${(cssDy + cssDh * 0.300).toFixed(1)}px`;
      }
      if (this.targetSonar) {
        this.targetSonar.style.left = `${(cssDx + cssDw * 0.385).toFixed(1)}px`;
        this.targetSonar.style.top  = `${(cssDy + cssDh * 0.440).toFixed(1)}px`;
      }
      if (this.targetMcu) {
        this.targetMcu.style.left = `${(cssDx + cssDw * 0.575).toFixed(1)}px`;
        this.targetMcu.style.top  = `${(cssDy + cssDh * 0.415).toFixed(1)}px`;
      }
      if (this.targetDrive) {
        this.targetDrive.style.left = `${(cssDx + cssDw * 0.360).toFixed(1)}px`;
        this.targetDrive.style.top  = `${(cssDy + cssDh * 0.670).toFixed(1)}px`;
      }

      // Constrain scanner beam to the actual robot bounds
      if (this.scanner) {
        this.scanner.style.left = `${Math.max(0, cssDx).toFixed(1)}px`;
        this.scanner.style.top = `${Math.max(0, cssDy).toFixed(1)}px`;
        this.scanner.style.width = `${cssDw.toFixed(1)}px`;
        this.scanner.style.height = `${cssDh.toFixed(1)}px`;
      }
    }

    getFrameSrc(i) {
      const pad = String(i + 1).padStart(5, '0');
      return `${this.prefix}${pad}${this.ext}`;
    }

    loadFrame(i, callback) {
      if (i < 0 || i >= this.totalFrames) {
        if (callback) callback();
        return;
      }
      if (this.images[i]) {
        if (callback) callback();
        return;
      }
      const img = new Image();
      this.images[i] = img;
      img.src = this.getFrameSrc(i);

      const markLoaded = () => {
        this.loaded[i] = 1;
        if (callback) callback();
      };

      if ('decode' in img) {
        img.decode().then(markLoaded).catch(markLoaded);
      } else {
        img.onload = markLoaded;
        img.onerror = markLoaded;
      }
    }

    draw(frameIndex) {
      let idx = Math.min(this.totalFrames - 1, Math.max(0, Math.round(frameIndex)));
      if (this.isMobile) {
        // Snap to even frames on mobile for 2x faster decode and 50% memory footprint
        idx = Math.min(this.totalFrames - 1, Math.max(0, Math.round(idx / 2) * 2));
      }

      if (!this.images[idx]) {
        this.loadFrame(idx);
      }

      // Fallback to nearest loaded frame to eliminate flicker
      let drawIdx = idx;
      if (!this.loaded[drawIdx]) {
        const step = this.isMobile ? 2 : 1;
        for (let offset = 1; offset < 30; offset++) {
          const o = offset * step;
          if (idx - o >= 0 && this.loaded[idx - o]) {
            drawIdx = idx - o;
            break;
          }
          if (idx + o < this.totalFrames && this.loaded[idx + o]) {
            drawIdx = idx + o;
            break;
          }
        }
      }

      if (drawIdx === this.lastDrawn) return;

      const img = this.images[drawIdx];
      if (img && (this.loaded[drawIdx] || img.complete)) {
        const geo = this.frameGeometry || this.computeFrameGeometry();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, geo.dx, geo.dy, geo.dw, geo.dh);
        this.lastDrawn = drawIdx;

        if (this.hudFrame) {
          this.hudFrame.textContent = String(drawIdx + 1).padStart(3, '0');
        }
      }
    }

    startInitialLoad() {
      // First pass: load key milestone frames to get instant responsiveness
      let loadedCount = 0;
      const step = this.isMobile ? 2 : 1;
      const keysToLoad = new Set([0, 2, 4, 6, 238]);
      const stride = this.isMobile ? 16 : 10;
      for (let i = 0; i < this.totalFrames; i += stride) {
        keysToLoad.add(this.isMobile ? Math.round(i / 2) * 2 : i);
      }
      const queue = Array.from(keysToLoad).filter(i => i < this.totalFrames);

      const updatePreloader = () => {
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / queue.length) * 100));
        if (this.preCount) this.preCount.textContent = String(pct).padStart(3, '0');
        if (this.preBar) this.preBar.style.transform = `scaleX(${pct / 100})`;

        if (loadedCount >= queue.length) {
          this.draw(0);
          this.dismissPreloader();
          this.streamRemainingFrames();
        }
      };

      // Safety timeout: ensure site becomes interactive within 2.2s even on slow connections
      setTimeout(() => {
        if (!this.dismissed) {
          this.draw(0);
          this.dismissPreloader();
        }
      }, 2200);

      queue.forEach(idx => {
        this.loadFrame(idx, updatePreloader);
      });
    }

    dismissPreloader() {
      if (this.dismissed) return;
      this.dismissed = true;

      setTimeout(() => {
        if (this.preloader) {
          if (typeof gsap !== 'undefined') {
            gsap.to(this.preloader, {
              clipPath: 'inset(0 0 100% 0)',
              duration: 0.9,
              ease: 'power4.inOut',
              onComplete: () => {
                this.preloader.style.display = 'none';
                document.body.classList.remove('is-loading');
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                animateHeroEntrance();
              }
            });
          } else {
            this.preloader.style.display = 'none';
            document.body.classList.remove('is-loading');
          }
        } else {
          document.body.classList.remove('is-loading');
        }
      }, 200);
    }

    streamRemainingFrames() {
      // Background idle stream of remaining frames with proximity priority
      const step = this.isMobile ? 2 : 1;
      let idx = 0;
      const streamNext = () => {
        if (idx >= this.totalFrames) return;
        if (!this.loaded[idx]) {
          this.loadFrame(idx, () => {
            idx += step;
            if ('requestIdleCallback' in window) {
              requestIdleCallback(streamNext, { timeout: this.isMobile ? 240 : 120 });
            } else {
              setTimeout(streamNext, this.isMobile ? 80 : 20);
            }
          });
        } else {
          idx += step;
          streamNext();
        }
      };
      streamNext();
    }

    updateScroll(progress) {
      const prevProgress = this.progress || 0;
      const dir = progress >= prevProgress ? 1 : -1;
      this.progress = progress;
      this.targetFrame = progress * (this.totalFrames - 1);

      // Predictive preloading: prioritize direction of scroll
      const current = Math.round(this.targetFrame);
      const step = this.isMobile ? 2 : 1;
      const ahead = dir > 0 ? (this.isMobile ? 6 : 8) : 4;
      const behind = dir > 0 ? 2 : (this.isMobile ? 6 : 7);
      for (let offset = -behind; offset <= ahead; offset++) {
        let target = current + offset * step;
        if (this.isMobile) {
          target = Math.round(target / 2) * 2;
        }
        if (target >= 0 && target < this.totalFrames) {
          this.loadFrame(target);
        }
      }

      // HUD updates
      if (this.hudBar) {
        this.hudBar.style.transform = `scaleX(${progress})`;
      }
      if (this.hudWrap) {
        if (progress > 0.02 && progress < 0.98) {
          this.hudWrap.classList.add('is-on');
        } else {
          this.hudWrap.classList.remove('is-on');
        }
      }
      if (this.cue) {
        this.cue.style.opacity = progress > 0.04 ? '0' : '1';
      }

      // Scanner beam activation during mechanical state transitions
      if (this.scanner) {
        if (progress > 0.08 && progress < 0.94) {
          this.scanner.classList.add('is-active');
        } else {
          this.scanner.classList.remove('is-active');
        }
      }

      // 3D CAD Reticle Targets illumination
      if (this.targetCam) this.targetCam.classList.toggle('is-visible', progress >= 0.16 && progress <= 0.38);
      if (this.targetSonar) this.targetSonar.classList.toggle('is-visible', progress >= 0.20 && progress <= 0.38);
      if (this.targetMcu) this.targetMcu.classList.toggle('is-visible', progress >= 0.39 && progress <= 0.60);
      if (this.targetDrive) this.targetDrive.classList.toggle('is-visible', progress >= 0.61 && progress <= 0.82);

      // HUD stage label
      if (this.hudStage) {
        if (progress < 0.25) this.hudStage.textContent = 'Exploded components';
        else if (progress < 0.52) this.hudStage.textContent = 'Sense / Ultrasonic & Vision';
        else if (progress < 0.78) this.hudStage.textContent = 'Compute / Dual-Core ESP32';
        else if (progress < 0.95) this.hudStage.textContent = 'Actuate / Kinematic Chassis';
        else this.hudStage.textContent = 'Fully Assembled Rover V2';
      }
    }

    renderLoop() {
      if (!this.isHeroVisible || document.hidden) return;

      this.idleClock++;

      if (prefersReduced()) {
        this.currentFrame = this.targetFrame;
      } else {
        const diff = this.targetFrame - this.currentFrame;
        if (Math.abs(diff) > 0.005) {
          // On mobile, use snappy, tactile responsiveness so frames track the thumb instantly with zero lag
          const factor = this.isMobile
            ? Math.min(0.75, 0.40 + Math.abs(diff) * 0.015)
            : Math.min(0.24, 0.12 + Math.abs(diff) * 0.006);
          this.currentFrame += diff * factor;
        } else {
          this.currentFrame = this.targetFrame;
        }

        // 3D tilt interpolation
        if (this.stage) {
          if (this.isMobile) {
            // On mobile: bypass continuous 3D stage rotation during active scroll to allow hardware-accelerated 2D canvas blitting
            const isActivelyScrolling = Math.abs(diff) > 0.08 || this.isTouchActive;
            if (isActivelyScrolling) {
              this.tiltX += (0 - this.tiltX) * 0.25;
              this.tiltY += (0 - this.tiltY) * 0.25;
            } else {
              this.tiltX += (this.targetTiltX - this.tiltX) * 0.1;
              this.tiltY += (this.targetTiltY - this.tiltY) * 0.1;
            }

            if (Math.abs(this.tiltX) > 0.05 || Math.abs(this.tiltY) > 0.05) {
              this.stage.style.transform = `rotateX(${this.tiltX.toFixed(2)}deg) rotateY(${this.tiltY.toFixed(2)}deg)`;
            } else if (this.stage.style.transform !== '') {
              this.stage.style.transform = '';
            }
          } else {
            const isMoving = Math.abs(diff) > 0.04 || this.isTouchActive;
            const idleBreathX = isMoving ? 0 : Math.sin(this.idleClock * 0.024) * 0.65;
            const idleBreathY = isMoving ? 0 : Math.cos(this.idleClock * 0.018) * 0.85;

            this.tiltX += (this.targetTiltX + idleBreathX - this.tiltX) * 0.085;
            this.tiltY += (this.targetTiltY + idleBreathY - this.tiltY) * 0.085;
            this.stage.style.transform = `rotateX(${this.tiltX.toFixed(2)}deg) rotateY(${this.tiltY.toFixed(2)}deg)`;

            if (this.gyroReadout && (this.idleClock % 3 === 0)) {
              const signX = this.tiltX >= 0 ? '+' : '';
              const signY = this.tiltY >= 0 ? '+' : '';
              this.gyroReadout.textContent = `P: ${signX}${this.tiltX.toFixed(1)}° Y: ${signY}${this.tiltY.toFixed(1)}°`;
            }
          }
        }
      }

      this.draw(this.currentFrame);
      requestAnimationFrame(() => this.renderLoop());
    }

    bindEvents() {
      requestAnimationFrame(() => this.renderLoop());

      window.addEventListener('resize', () => {
        this.initCanvasSize();
        this.draw(this.currentFrame);
      }, { passive: true });

      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          this.initCanvasSize();
          this.draw(this.currentFrame);
        }, 120);
      }, { passive: true });

      // Dynamic Scroll Inertia Momentum (Desktop only)
      let lastScrollY = window.scrollY;
      window.addEventListener('scroll', () => {
        if (this.isMobile) return;
        const curScrollY = window.scrollY;
        const delta = curScrollY - lastScrollY;
        const vel = Math.max(-8, Math.min(8, delta * 0.22));
        this.targetTiltX = Math.max(-12, Math.min(12, this.targetTiltX + vel * 0.3));
        lastScrollY = curScrollY;
      }, { passive: true });

      // Desktop Mouse 3D Perspective Tilt with extended depth range
      window.addEventListener('mousemove', (e) => {
        if (this.isMobile || window.innerWidth < 900) return;
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        this.targetTiltX = -ny * 7.5; // pitch
        this.targetTiltY = nx * 9.5;  // yaw
      }, { passive: true });

      // Mobile Touchscreen Pan/Swipe Tracking
      window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          this.isTouchActive = true;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        // Touch gestures are for scrolling on mobile — don't tilt the 3D stage on touchmove to avoid scroll hitching
        if (this.isMobile) return;
        if (!e.touches || !e.touches[0]) return;
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) - 0.5;
        const ny = (touch.clientY / window.innerHeight) - 0.5;
        this.targetTiltY = nx * 10.0;
        this.targetTiltX = -ny * 7.5;
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.isTouchActive = false;
        this.targetTiltX = 0;
        this.targetTiltY = 0;
      }, { passive: true });

      // Mobile Device Orientation Gyroscope with Low-Pass Filtering
      const handleOrientation = (e) => {
        if (this.isTouchActive || e.gamma == null || e.beta == null) return;
        const rawGamma = Math.max(-28, Math.min(28, e.gamma));
        const rawBeta = Math.max(-28, Math.min(28, e.beta - 45));
        const targetY = (rawGamma / 28) * 8.5;
        const targetX = (rawBeta / 28) * -6.5;
        this.targetTiltY += (targetY - this.targetTiltY) * 0.25;
        this.targetTiltX += (targetX - this.targetTiltX) * 0.25;
      };

      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const reqGyro = () => {
          DeviceOrientationEvent.requestPermission()
            .then(res => {
              if (res === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
              }
            }).catch(() => {});
          window.removeEventListener('touchstart', reqGyro);
        };
        window.addEventListener('touchstart', reqGyro, { passive: true });
      } else if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }

      // Interactive CAD Reticles Clicks & Taps
      [this.targetCam, this.targetSonar, this.targetMcu, this.targetDrive].forEach(target => {
        if (!target) return;
        target.addEventListener('click', (e) => {
          e.stopPropagation();
          target.classList.add('is-active');
          setTimeout(() => target.classList.remove('is-active'), 1800);
        });
      });
    }
  }

  /* Hero Intro Text Animation */
  function animateHeroEntrance() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.1 } });

    tl.from('.hero__title .line > span', {
      yPercent: 110,
      stagger: 0.12,
      duration: 1.2
    })
    .from('[data-intro]', {
      opacity: 0,
      y: 24,
      stagger: 0.1,
      duration: 0.9
    }, '-=0.7');
  }

  /* ==========================================================================
     4. GSAP & SCROLLTRIGGER SETUP
     ========================================================================== */
  function initScrollExperience(scrubber) {
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

    // 1. Hero Scrubber Timeline
    const heroTrack = document.getElementById('heroTrack');
    const heroIntro = document.getElementById('heroIntro');
    const chapters = gsap.utils.toArray('[data-chapter]');

    if (heroTrack) {
      ScrollTrigger.create({
        trigger: heroTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: mobileUser ? 0.2 : true,
        onUpdate: (self) => {
          if (scrubber) scrubber.updateScroll(self.progress);
        }
      });

      // Hero Intro fade out
      if (heroIntro) {
        gsap.to(heroIntro, {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroTrack,
            start: 'top top',
            end: '18% top',
            scrub: true
          }
        });
      }

      // Chapters choreography across the 240 frames
      const isMob = window.innerWidth < 900;
      const ch1From = isMob ? { autoAlpha: 0, y: 24, x: 0 } : { autoAlpha: 0, x: -32, y: 0 };
      const ch1To   = isMob ? { autoAlpha: 1, y: 0, x: 0, duration: 1 } : { autoAlpha: 1, x: 0, y: 0, duration: 1 };
      const ch1Out  = isMob ? { autoAlpha: 0, y: -16, x: 0, duration: 1 } : { autoAlpha: 0, x: -32, y: 0, duration: 1 };

      const ch2From = isMob ? { autoAlpha: 0, y: 24, x: 0 } : { autoAlpha: 0, x: 32, y: 0 };
      const ch2To   = isMob ? { autoAlpha: 1, y: 0, x: 0, duration: 1 } : { autoAlpha: 1, x: 0, y: 0, duration: 1 };
      const ch2Out  = isMob ? { autoAlpha: 0, y: -16, x: 0, duration: 1 } : { autoAlpha: 0, x: 32, y: 0, duration: 1 };

      const ch3From = isMob ? { autoAlpha: 0, y: 24, x: 0 } : { autoAlpha: 0, x: -32, y: 0 };
      const ch3To   = isMob ? { autoAlpha: 1, y: 0, x: 0, duration: 1 } : { autoAlpha: 1, x: 0, y: 0, duration: 1 };
      const ch3Out  = isMob ? { autoAlpha: 0, y: -16, x: 0, duration: 1 } : { autoAlpha: 0, x: -32, y: 0, duration: 1 };

      // Chapter 1: Sense (frames ~40-80 => progress 0.18 - 0.38)
      if (chapters[0]) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroTrack,
            start: '16% top',
            end: '38% top',
            scrub: true
          }
        })
        .fromTo(chapters[0], ch1From, ch1To)
        .to(chapters[0], ch1Out, '+=1');
      }

      // Chapter 2: Compute (frames ~90-130 => progress 0.38 - 0.58)
      if (chapters[1]) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroTrack,
            start: '38% top',
            end: '60% top',
            scrub: true
          }
        })
        .fromTo(chapters[1], ch2From, ch2To)
        .to(chapters[1], ch2Out, '+=1');
      }

      // Chapter 3: Actuate (frames ~140-180 => progress 0.60 - 0.80)
      if (chapters[2]) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroTrack,
            start: '60% top',
            end: '82% top',
            scrub: true
          }
        })
        .fromTo(chapters[2], ch3From, ch3To)
        .to(chapters[2], ch3Out, '+=1');
      }

      // Chapter 4: Fully Assembled (frames ~190-240 => progress 0.82 - 1.0)
      if (chapters[3]) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroTrack,
            start: '83% top',
            end: '99% top',
            scrub: true
          }
        })
        .fromTo(chapters[3], { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1 });
      }
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
     12. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (!menuBtn || !menu) return;

    const toggleMenu = () => {
      const isOpen = menu.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.documentElement.classList.toggle('is-locked', isOpen);
      if (lenis) {
        if (isOpen) lenis.stop();
        else lenis.start();
      }

      if (isOpen && typeof gsap !== 'undefined') {
        gsap.fromTo(menu.querySelectorAll('.menu__links a'),
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
        );
        gsap.fromTo(menu.querySelector('.menu__foot'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.28, ease: 'power2.out' }
        );
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) toggleMenu();
      });
    });
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
     14. 3D HERO CYBERNETIC PARTICLE CONSTELLATION
     ========================================================================== */
  class HeroParticleConstellation {
    constructor(scrubber) {
      this.scrubber = scrubber;
      this.canvas = document.getElementById('heroParticles');
      if (!this.canvas) return;
      // On mobile devices, disable the secondary particle canvas entirely to save 100% of second-canvas fill rate and CPU distance loops
      if (isMobile()) {
        this.canvas.style.display = 'none';
        return;
      }
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.track = document.getElementById('heroTrack');
      this.particles = [];
      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.isHeroVisible = true;

      this.init();
      this.bind();
      this.animate();
    }

    init() {
      this.resize();
      const count = window.innerWidth < 900 ? 22 : 46;
      this.particles = [];

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          z: 0.3 + Math.random() * 1.5, // 3D depth layer
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          baseRadius: 1.2 + Math.random() * 1.8,
          alpha: 0.25 + Math.random() * 0.55,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          pulseVal: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? 'rgba(76, 141, 255,' : (Math.random() > 0.5 ? 'rgba(156, 192, 255,' : 'rgba(255, 255, 255,')
        });
      }
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    bind() {
      window.addEventListener('resize', () => {
        this.resize();
      }, { passive: true });

      // Observe visibility to throttle rendering when offscreen
      if ('IntersectionObserver' in window && this.track) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isHeroVisible = entry.isIntersecting;
          });
        }, { threshold: 0.01 });
        observer.observe(this.track);
      }
    }

    animate() {
      if (this.isHeroVisible && !document.hidden && !prefersReduced()) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 3D Parallax offset linked to scrubber tilt
        const tiltX = this.scrubber ? this.scrubber.tiltX : 0;
        const tiltY = this.scrubber ? this.scrubber.tiltY : 0;
        const offsetX = tiltY * 3.5;
        const offsetY = -tiltX * 3.5;

        const pts = this.particles;
        const len = pts.length;

        // Draw connective constellation lines
        const maxDist = window.innerWidth < 900 ? 70 : 95;
        for (let i = 0; i < len; i++) {
          const p1 = pts[i];
          const px1 = p1.x + offsetX * p1.z;
          const py1 = p1.y + offsetY * p1.z;

          for (let j = i + 1; j < len; j++) {
            const p2 = pts[j];
            const px2 = p2.x + offsetX * p2.z;
            const py2 = p2.y + offsetY * p2.z;

            const dx = px1 - px2;
            const dy = py1 - py2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.18 * Math.min(p1.alpha, p2.alpha);
              this.ctx.beginPath();
              this.ctx.moveTo(px1, py1);
              this.ctx.lineTo(px2, py2);
              this.ctx.strokeStyle = `rgba(76, 141, 255, ${lineAlpha})`;
              this.ctx.lineWidth = 0.75;
              this.ctx.stroke();
            }
          }
        }

        // Draw glowing particles
        for (let i = 0; i < len; i++) {
          const p = pts[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = this.width + 20;
          else if (p.x > this.width + 20) p.x = -20;
          if (p.y < -20) p.y = this.height + 20;
          else if (p.y > this.height + 20) p.y = -20;

          p.pulseVal += p.pulseSpeed;
          const dynamicAlpha = Math.max(0.1, p.alpha * (0.7 + Math.sin(p.pulseVal) * 0.3));
          const dynamicRadius = p.baseRadius * (0.85 + Math.sin(p.pulseVal * 0.8) * 0.2) * p.z;

          const px = p.x + offsetX * p.z;
          const py = p.y + offsetY * p.z;

          // Glowing halo
          const grad = this.ctx.createRadialGradient(px, py, 0, px, py, dynamicRadius * 2.8);
          grad.addColorStop(0, `${p.color} ${dynamicAlpha})`);
          grad.addColorStop(0.5, `${p.color} ${dynamicAlpha * 0.4})`);
          grad.addColorStop(1, `${p.color} 0)`);

          this.ctx.beginPath();
          this.ctx.arc(px, py, dynamicRadius * 2.8, 0, Math.PI * 2);
          this.ctx.fillStyle = grad;
          this.ctx.fill();

          // Particle core
          this.ctx.beginPath();
          this.ctx.arc(px, py, Math.max(0.8, dynamicRadius * 0.7), 0, Math.PI * 2);
          this.ctx.fillStyle = `${p.color} ${Math.min(1, dynamicAlpha * 1.5)})`;
          this.ctx.fill();
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  /* ==========================================================================
     15. 3D CARD PERSPECTIVE TILT WITH DYNAMIC SPECULAR GLARE
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

    const scrubber = new HeroScrubber();
    initScrollExperience(scrubber);
    new HeroParticleConstellation(scrubber);
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

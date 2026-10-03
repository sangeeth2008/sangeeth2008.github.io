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
     2. GLOBAL STATE & HELPERS
     ========================================================================== */
  let lenis = null;
  const isMobile = () => window.innerWidth < 900 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
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

      this.currentFrame = 0;
      this.targetFrame = 0;
      this.lastDrawn = -1;
      this.progress = 0;
      this.isScrubbing = false;

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

      this.initCanvasSize();
      this.bindEvents();
      this.startInitialLoad();
    }

    initCanvasSize() {
      this.canvas.width = 1280;
      this.canvas.height = 720;
      if (this.ctx) {
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
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
      const idx = Math.min(this.totalFrames - 1, Math.max(0, Math.round(frameIndex)));
      if (!this.images[idx]) {
        this.loadFrame(idx);
      }

      // Fallback to nearest loaded frame to eliminate flicker
      let drawIdx = idx;
      if (!this.loaded[drawIdx]) {
        for (let offset = 1; offset < 30; offset++) {
          if (idx - offset >= 0 && this.loaded[idx - offset]) {
            drawIdx = idx - offset;
            break;
          }
          if (idx + offset < this.totalFrames && this.loaded[idx + offset]) {
            drawIdx = idx + offset;
            break;
          }
        }
      }

      if (drawIdx === this.lastDrawn) return;

      const img = this.images[drawIdx];
      if (img && (this.loaded[drawIdx] || img.complete)) {
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.lastDrawn = drawIdx;

        if (this.hudFrame) {
          this.hudFrame.textContent = String(drawIdx + 1).padStart(3, '0');
        }
      }
    }

    startInitialLoad() {
      // First pass: load key milestone frames to get instant responsiveness
      let loadedCount = 0;
      const initialBatch = 24; // Every 10th frame + first 10 frames
      const keysToLoad = new Set([0, 1, 2, 3, 4, 5, 239]);
      for (let i = 0; i < this.totalFrames; i += 10) keysToLoad.add(i);
      const queue = Array.from(keysToLoad);

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
      let idx = 0;
      const streamNext = () => {
        if (idx >= this.totalFrames) return;
        if (!this.loaded[idx]) {
          this.loadFrame(idx, () => {
            idx++;
            if ('requestIdleCallback' in window) {
              requestIdleCallback(streamNext, { timeout: 120 });
            } else {
              setTimeout(streamNext, 20);
            }
          });
        } else {
          idx++;
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
      const ahead = dir > 0 ? 8 : 4;
      const behind = dir > 0 ? 3 : 7;
      for (let offset = -behind; offset <= ahead; offset++) {
        const target = current + offset;
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
      this.idleClock++;

      if (prefersReduced()) {
        this.currentFrame = this.targetFrame;
      } else {
        const diff = this.targetFrame - this.currentFrame;
        if (Math.abs(diff) > 0.005) {
          // Ultra-smooth critically damped spring damping
          const factor = Math.min(0.24, 0.12 + Math.abs(diff) * 0.006);
          this.currentFrame += diff * factor;
        } else {
          this.currentFrame = this.targetFrame;
        }

        // Smooth 3D tilt interpolation with subtle idle breathing
        if (this.stage) {
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

      this.draw(this.currentFrame);
      requestAnimationFrame(() => this.renderLoop());
    }

    bindEvents() {
      requestAnimationFrame(() => this.renderLoop());

      window.addEventListener('resize', () => {
        this.draw(this.currentFrame);
      }, { passive: true });

      // Desktop Mouse 3D Perspective Tilt with extended depth range
      window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 900) return;
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        this.targetTiltX = -ny * 7.5; // pitch
        this.targetTiltY = nx * 9.5;  // yaw
      }, { passive: true });

      // Mobile Touchscreen Pan/Swipe 3D Tilt
      window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          this.isTouchActive = true;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
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

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
        infinite: false
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
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
        scrub: true,
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
      this.start();

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
        });
      });
    }

    start() {
      const render = () => {
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
  <span class="t-accent">contact</span>         — Direct email dispatch &amp; social profiles
  <span class="t-accent">bench</span>           — Live ESP32 Rover V2 hardware status
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
     11. MAGNETIC BUTTONS & CUSTOM CURSOR
     ========================================================================== */
  function initMagneticAndCursor() {
    const cursor = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor__dot');
    const ring = document.querySelector('.cursor__ring');
    const label = document.querySelector('.cursor__label');

    if (!cursor || !dot || !ring || isMobile()) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(tick);
    };
    tick();

    // Hover & Label triggers
    document.querySelectorAll('a, button, input, .chip, .feature, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const text = el.dataset.cursor;
        if (text) {
          cursor.classList.add('is-label');
          if (label) label.textContent = text;
        } else {
          cursor.classList.add('is-hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hover', 'is-label');
        if (label) label.textContent = '';
      });
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));

    // Magnetic physics on buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
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
     INITIALIZATION ORCHESTRATION
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    const scrubber = new HeroScrubber();
    initScrollExperience(scrubber);
    new HeroParticleConstellation(scrubber);
    new SignalOscilloscope();
    init3DCardTilt();
    initProjectShowcase();
    initCaseStudyModal();
    initShowreel();
    initTerminal();
    initEmailCopy();
    initMagneticAndCursor();
    initMobileMenu();
    initMarquee();
  });

})();

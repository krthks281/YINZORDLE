// Hockey Wordle Game Logic

// =====================================================
// SOUND EFFECTS SYSTEM - Web Audio API Based
// =====================================================

class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.5;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Immediately resume for mobile browsers (must happen in user gesture)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            this.initialized = true;
            console.log('Sound effects initialized');
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Ensure audio context is running (needed for user gesture requirement)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Generate a pleasant tone
    playTone(frequency, duration, type = 'sine', volumeMultiplier = 1) {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Envelope for pleasant sound
        const vol = this.volume * volumeMultiplier;
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(vol, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Win sound - triumphant ascending arpeggio
    playWinSound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const delays = [0, 0.1, 0.2, 0.35];
        const durations = [0.3, 0.3, 0.3, 0.6];

        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, durations[i], 'sine', 0.6);
                // Add harmonics for richness
                this.playTone(freq * 2, durations[i] * 0.5, 'sine', 0.2);
            }, delays[i] * 1000);
        });

        // Final chord shimmer
        setTimeout(() => {
            this.playShimmer();
        }, 500);
    }

    // Shimmer effect for celebrations
    playShimmer() {
        if (!this.enabled || !this.audioContext) return;

        const freqs = [1318.51, 1567.98, 2093.00]; // E6, G6, C7
        freqs.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.4, 'sine', 0.15);
            }, i * 50);
        });
    }

    // Lose sound - gentle descending, encouraging
    playLoseSound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const notes = [392.00, 349.23, 329.63, 293.66]; // G4, F4, E4, D4
        const delays = [0, 0.15, 0.3, 0.5];
        const durations = [0.25, 0.25, 0.25, 0.5];

        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, durations[i], 'triangle', 0.4);
            }, delays[i] * 1000);
        });
    }

    // Tile flip sound
    playFlipSound(index = 0) {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const baseFreq = 300 + (index * 50);
        this.playTone(baseFreq, 0.1, 'sine', 0.2);
    }

    // Correct letter sound
    playCorrectSound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();
        this.playTone(880, 0.15, 'sine', 0.3);
    }

    // Pop sound for confetti
    playPopSound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // White noise burst for pop
        const bufferSize = this.audioContext.sampleRate * 0.05;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();

        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);

        source.start();
    }

    // Error/invalid word sound
    playErrorSound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        this.playTone(200, 0.15, 'sawtooth', 0.2);
        setTimeout(() => {
            this.playTone(180, 0.15, 'sawtooth', 0.15);
        }, 100);
    }

    // Key press sound
    playKeySound() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();
        this.playTone(600 + Math.random() * 100, 0.05, 'sine', 0.1);
    }

    // Firework launch sound (whoosh)
    playFireworkLaunch() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Rising whistle effect
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.15, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.35);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.35);
    }

    // Firework burst sound (sparkle explosion)
    playFireworkBurst() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Create a burst of noise with high frequency shimmer
        const bufferSize = this.audioContext.sampleRate * 0.15;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // Mix of noise and shimmer
            const envelope = Math.pow(1 - i / bufferSize, 1.5);
            data[i] = (Math.random() * 2 - 1) * envelope * 0.5 +
                      Math.sin(i * 0.1) * envelope * 0.3 +
                      Math.sin(i * 0.05) * envelope * 0.2;
        }

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

        source.buffer = buffer;
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);

        source.start();

        // Add sparkle tones
        const sparkleFreqs = [1500, 2000, 2500, 3000];
        sparkleFreqs.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.1, 'sine', 0.08);
            }, i * 20);
        });
    }
}

// Global sound effects instance
const soundEffects = new SoundEffects();

// =====================================================
// CONFETTI & CELEBRATION EFFECTS SYSTEM
// Using canvas-confetti library for professional effects
// =====================================================

class CelebrationEffects {
    constructor() {
        // Sport-specific color palettes
        this.confettiColors = {
            HOCKEY: ['#007AFF', '#5856d6', '#87ceeb', '#ffffff', '#34c759'],
            NFL: ['#ffd700', '#ff6b35', '#ff4444', '#ffffff', '#013369'],
            NBA: ['#17408B', '#C9082A', '#ff6b35', '#ffffff', '#ffd700'],
            FA: ['#37003c', '#00ff85', '#ffd700', '#ffffff', '#e90052']
        };

        // Create custom canvas for confetti with high z-index (above modal)
        this.confettiCanvas = null;
        this.myConfetti = null;
    }

    // Initialize or get the confetti canvas
    getConfetti() {
        if (typeof confetti === 'undefined') {
            console.warn('canvas-confetti not loaded');
            return null;
        }

        // Create custom canvas if it doesn't exist
        if (!this.confettiCanvas) {
            this.confettiCanvas = document.createElement('canvas');
            this.confettiCanvas.id = 'confetti-canvas';
            this.confettiCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(this.confettiCanvas);

            // Create confetti instance bound to this canvas
            this.myConfetti = confetti.create(this.confettiCanvas, {
                resize: true,
                useWorker: true
            });
        }

        return this.myConfetti;
    }

    // Create screen flash effect
    createScreenFlash(type = 'win') {
        const flash = document.createElement('div');
        flash.className = `screen-flash ${type}`;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 800);
    }

    // Create shockwave effect
    createShockwave(type = 'win') {
        const shockwave = document.createElement('div');
        shockwave.className = `shockwave ${type}`;
        document.body.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 1000);
    }

    // Create multiple shockwave rings
    createShockwaveRings(count = 3) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const ring = document.createElement('div');
                ring.className = 'shockwave-ring';
                document.body.appendChild(ring);
                setTimeout(() => ring.remove(), 1200);
            }, i * 150);
        }
    }

    // =====================================================
    // CANVAS-CONFETTI BASED CELEBRATIONS
    // =====================================================

    // Basic confetti burst from center
    createConfettiExplosion(sport = 'HOCKEY') {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        const colors = this.confettiColors[sport] || this.confettiColors.HOCKEY;

        // Play sound
        soundEffects.playPopSound();

        // Initial big burst
        myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors,
            disableForReducedMotion: true
        });

        // Follow-up bursts from sides
        setTimeout(() => {
            myConfetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            myConfetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });
        }, 250);

        // Continuous rain for 3 seconds
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            myConfetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.5 },
                colors: colors
            });
            myConfetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.5 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        setTimeout(frame, 500);
    }

    // NFL Fireworks show - realistic stadium celebration
    createFireworksShow() {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const colors = ['#ffd700', '#ff4444', '#00ff88', '#00bfff', '#ff69b4', '#ffffff'];

        // Play firework sound
        soundEffects.playFireworkBurst();

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                // Grand finale
                this.createFireworksFinale(colors);
                return;
            }

            // Random firework bursts across the screen
            myConfetti({
                particleCount: Math.floor(randomInRange(20, 40)),
                startVelocity: randomInRange(25, 45),
                spread: randomInRange(50, 80),
                origin: {
                    x: randomInRange(0.1, 0.9),
                    y: randomInRange(0.2, 0.5)
                },
                colors: [colors[Math.floor(Math.random() * colors.length)]],
                ticks: 300,
                gravity: 0.8,
                decay: 0.92,
                scalar: randomInRange(0.8, 1.2)
            });

            // Play burst sound occasionally
            if (Math.random() > 0.7) {
                soundEffects.playFireworkBurst();
            }
        }, 300);
    }

    // Grand finale for fireworks
    createFireworksFinale(colors) {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        soundEffects.playFireworkBurst();

        // Multiple simultaneous bursts
        const positions = [0.2, 0.35, 0.5, 0.65, 0.8];

        positions.forEach((x, i) => {
            setTimeout(() => {
                myConfetti({
                    particleCount: 80,
                    startVelocity: 45,
                    spread: 100,
                    origin: { x: x, y: 0.4 },
                    colors: colors,
                    ticks: 400,
                    gravity: 0.6
                });
                soundEffects.playPopSound();
            }, i * 100);
        });

        // Final big burst from center
        setTimeout(() => {
            myConfetti({
                particleCount: 150,
                startVelocity: 55,
                spread: 180,
                origin: { x: 0.5, y: 0.5 },
                colors: colors,
                ticks: 500,
                gravity: 0.5
            });
            soundEffects.playWinSound();
        }, 600);
    }

    // Hockey - Snow/ice effect with confetti
    createHockeyCelebration() {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        const colors = this.confettiColors.HOCKEY;

        // Initial burst
        myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });

        soundEffects.playPopSound();

        // Snow-like falling effect
        const duration = 4000;
        const end = Date.now() + duration;

        const snowFrame = () => {
            myConfetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 300,
                origin: {
                    x: Math.random(),
                    y: 0
                },
                colors: ['#ffffff', '#87ceeb'],
                shapes: ['circle'],
                gravity: 0.3,
                scalar: 0.6,
                drift: Math.random() - 0.5
            });

            if (Date.now() < end) {
                requestAnimationFrame(snowFrame);
            }
        };

        setTimeout(snowFrame, 300);

        // Side cannons
        setTimeout(() => {
            myConfetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 }, colors });
            myConfetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 }, colors });
        }, 200);
    }

    // NBA - Basketball themed with bounce effect
    createNBACelebration() {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        const colors = this.confettiColors.NBA;

        soundEffects.playPopSound();

        // Slam dunk burst from top
        myConfetti({
            particleCount: 80,
            startVelocity: 60,
            spread: 80,
            origin: { x: 0.5, y: 0 },
            colors: colors,
            gravity: 1.2
        });

        // Side bursts
        setTimeout(() => {
            myConfetti({
                particleCount: 50,
                angle: 45,
                spread: 60,
                origin: { x: 0, y: 0.7 },
                colors: colors,
                startVelocity: 45
            });
            myConfetti({
                particleCount: 50,
                angle: 135,
                spread: 60,
                origin: { x: 1, y: 0.7 },
                colors: colors,
                startVelocity: 45
            });
        }, 200);

        // Continuous celebration
        const end = Date.now() + 3000;
        const frame = () => {
            myConfetti({
                particleCount: 3,
                spread: 50,
                origin: { x: Math.random(), y: 0.3 },
                colors: colors
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        setTimeout(frame, 400);
    }

    // FA/Soccer - Goal celebration with streamers
    createFACelebration() {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        const colors = this.confettiColors.FA;

        soundEffects.playPopSound();

        // Goal explosion
        myConfetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            shapes: ['square', 'circle'],
            scalar: 1.2
        });

        // Streamer-like effect from sides
        const streamers = () => {
            myConfetti({
                particleCount: 5,
                angle: 60,
                spread: 30,
                origin: { x: 0 },
                colors: colors,
                shapes: ['square'],
                scalar: 2,
                drift: 1
            });
            myConfetti({
                particleCount: 5,
                angle: 120,
                spread: 30,
                origin: { x: 1 },
                colors: colors,
                shapes: ['square'],
                scalar: 2,
                drift: -1
            });
        };

        // Multiple streamer waves
        for (let i = 0; i < 5; i++) {
            setTimeout(streamers, i * 300);
        }
    }

    // Lose state - subtle, encouraging effect
    createLoseEffect() {
        const myConfetti = this.getConfetti();
        if (!myConfetti) return;

        // Gentle falling particles - encouraging not sad
        myConfetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff9f0a', '#ffd60a', '#ffffff'],
            gravity: 0.5,
            scalar: 0.8,
            ticks: 200
        });
    }

    // Clean up - canvas-confetti handles its own cleanup
    cleanup() {
        // Remove any lingering DOM effects
        document.querySelectorAll('.screen-flash, .shockwave, .shockwave-ring').forEach(el => el.remove());

        // Reset our custom confetti instance
        if (this.myConfetti && this.myConfetti.reset) {
            this.myConfetti.reset();
        }

        // Remove the canvas if it exists
        if (this.confettiCanvas) {
            this.confettiCanvas.remove();
            this.confettiCanvas = null;
            this.myConfetti = null;
        }
    }
}


// Global celebration effects instance
const celebrationEffects = new CelebrationEffects();

// Sport-specific coach character configurations
const COACH_CHARACTERS = {
    HOCKEY: {
        name: 'Coach',
        sport: 'hockey',
        headgear: 'helmet',      // Hockey helmet with visor
        accessory: 'stick',      // Hockey stick
        outfit: 'jersey',        // Team jersey
        colors: {
            primary: '#2c5aa0',   // Team blue
            secondary: '#1e3d6f', // Darker blue
            accent: '#87ceeb'     // Ice blue visor
        },
        idleAnimation: 'stick-tap',
        celebrateAnimation: 'stick-raise'
    },
    NFL: {
        name: 'Coach',
        sport: 'nfl',
        headgear: 'headset',     // Coach headset with cap
        accessory: 'clipboard',   // Play clipboard
        outfit: 'polo',          // Team polo shirt
        colors: {
            primary: '#013369',   // NFL blue
            secondary: '#D50A0A', // NFL red
            accent: '#ffffff'     // White
        },
        idleAnimation: 'clipboard-check',
        celebrateAnimation: 'fist-pump'
    },
    NBA: {
        name: 'Coach',
        sport: 'nba',
        headgear: 'none',        // No headgear (bald/styled hair)
        accessory: 'clipboard',   // Tactics clipboard
        outfit: 'suit',          // Formal suit jacket
        colors: {
            primary: '#17408B',   // NBA blue
            secondary: '#C9082A', // NBA red
            accent: '#ffffff'     // White shirt
        },
        idleAnimation: 'thinking-pose',
        celebrateAnimation: 'arms-up'
    },
    FA: {
        name: 'Manager',
        sport: 'football',
        headgear: 'none',        // No headgear
        accessory: 'tactics-board', // Small tactics board
        outfit: 'tracksuit',     // Manager tracksuit
        colors: {
            primary: '#37003c',   // Premier League purple
            secondary: '#00ff85', // Premier League green
            accent: '#ffffff'     // White
        },
        idleAnimation: 'arms-crossed',
        celebrateAnimation: 'fist-pump'
    }
};

// Sport-specific messages for Guessmate
const SPORT_MESSAGES = {
    HOCKEY: {
        icon: '🏒',
        greetings: [
            "Hey teammate! Let's find that word! 🏒",
            "Ready to score some letters? Let's go!",
            "Time to hit the ice! Good luck! ⭐",
            "I believe in you, champ! 💪"
        ],
        invalidWord: [
            "Hmm, that's not in my playbook! 📖",
            "Try another word, teammate!",
            "That word's offside! Try again!",
            "Not a valid play! Think again!"
        ],
        goodProgress: [
            "Good progress! Keep going! 👍",
            "You're onto something!",
            "Nice! Use those clues!",
            "Getting warmer! 🌡️"
        ],
        closeToWin: [
            "So close! 🔥",
            "You're heating up! 🏒",
            "Almost there, keep pushing!",
            "Hat trick of greens! One more push!"
        ],
        yellowHints: [
            "Yellow means it's there somewhere!",
            "Right letters, wrong spots!",
            "Shuffle those letters around!",
            "Close! Rearrange them!"
        ],
        noMatch: [
            "Tough one! Don't give up!",
            "Fresh start! Try new letters!",
            "That's hockey - shake it off!",
            "No worries, next attempt! 💪"
        ],
        lateGame: [
            "Focus! We got this!",
            "Crunch time! Concentrate!",
            "Final minutes! Give it all!"
        ],
        win: {
            1: "INCREDIBLE! First try?! You're a legend! 🏆",
            2: "AMAZING! Two tries! Pro player! 🥇",
            3: "FANTASTIC! Great skills! 🌟",
            4: "NICE ONE! Solid performance! 🏒",
            5: "GOOD JOB! You figured it out! 👏",
            6: "PHEW! Clutch play! Never gave up! 💪"
        },
        lose: [
            "We'll get 'em next time!",
            "Tough one. You'll nail it next round!",
            "Hockey's about bouncing back!"
        ],
        newGame: [
            "Fresh ice! Let's do this! 🏒",
            "New game, new chances!",
            "Back on the ice! Ready!",
            "Let's go, teammate! ⭐"
        ]
    },
    NFL: {
        icon: '🏈',
        greetings: [
            "Huddle up! Let's find that word! 🏈",
            "Ready for the snap? Let's go!",
            "Game time! Good luck, QB! ⭐",
            "Let's drive down the field! 💪"
        ],
        invalidWord: [
            "That's an incomplete pass! 📖",
            "Try another play, coach!",
            "Flag on the play! Try again!",
            "Not in the playbook! Think again!"
        ],
        goodProgress: [
            "First down! Keep moving! 👍",
            "You're gaining yards!",
            "Nice audible! Use those clues!",
            "In the red zone! 🌡️"
        ],
        closeToWin: [
            "Goal line stand! 🔥",
            "You're in the end zone! 🏈",
            "Almost a touchdown!",
            "One more play to score!"
        ],
        yellowHints: [
            "Right players, wrong formation!",
            "Correct letters, wrong positions!",
            "Time to call an audible!",
            "Rearrange the lineup!"
        ],
        noMatch: [
            "Incomplete! Try again!",
            "New drive! Fresh letters!",
            "Shake off that sack!",
            "Reset and try again! 💪"
        ],
        lateGame: [
            "Two-minute drill!",
            "Fourth quarter focus!",
            "No timeouts left! Go!"
        ],
        win: {
            1: "HAIL MARY MIRACLE! First try! 🏆",
            2: "AMAZING! Two-play TD! 🥇",
            3: "FANTASTIC! Great drive! 🌟",
            4: "TOUCHDOWN! Solid game! 🏈",
            5: "FIELD GOAL! You scored! 👏",
            6: "PHEW! Overtime victory! 💪"
        },
        lose: [
            "We'll get 'em next game!",
            "Tough loss. Next drive!",
            "Champions bounce back!"
        ],
        newGame: [
            "New game! Kickoff time! 🏈",
            "Fresh quarter, new chances!",
            "Back in the huddle! Ready!",
            "Let's move the chains! ⭐"
        ]
    },
    NBA: {
        icon: '🏀',
        greetings: [
            "Let's ball! Find that word! 🏀",
            "Ready to shoot some letters? Let's go!",
            "Tip-off! Good luck! ⭐",
            "Time to get buckets! 💪"
        ],
        invalidWord: [
            "That's a travel! Try again! 📖",
            "Air ball! Try another word!",
            "Shot clock violation! Try again!",
            "Out of bounds! Think again!"
        ],
        goodProgress: [
            "Nice dribble! Keep going! 👍",
            "You're in rhythm!",
            "Great pass! Use those clues!",
            "Heating up! 🌡️"
        ],
        closeToWin: [
            "Buzzer beater time! 🔥",
            "You're on fire! 🏀",
            "Almost a triple-double!",
            "One more shot to win!"
        ],
        yellowHints: [
            "Right players, wrong positions!",
            "Good picks, wrong spots!",
            "Run a different play!",
            "Switch up the rotation!"
        ],
        noMatch: [
            "Blocked! Try again!",
            "New possession! Fresh letters!",
            "Shake off that miss!",
            "Reset the offense! 💪"
        ],
        lateGame: [
            "Clutch time!",
            "Fourth quarter mode!",
            "Final minutes! Go hard!"
        ],
        win: {
            1: "SLAM DUNK! First try! 🏆",
            2: "AMAZING! And-one baby! 🥇",
            3: "FANTASTIC! Three-pointer! 🌟",
            4: "SWISH! Nice shot! 🏀",
            5: "BUCKET! You scored! 👏",
            6: "PHEW! Buzzer beater win! 💪"
        },
        lose: [
            "We'll get 'em next game!",
            "Tough loss. Next quarter!",
            "Champions come back stronger!"
        ],
        newGame: [
            "New game! Jump ball! 🏀",
            "Fresh quarter, new chances!",
            "Back on the court! Ready!",
            "Let's run it back! ⭐"
        ]
    },
    FA: {
        icon: '⚽',
        greetings: [
            "Let's go! Find that word! ⚽",
            "Ready to score? Let's go!",
            "Kickoff! Good luck! ⭐",
            "Time to find the net! 💪"
        ],
        invalidWord: [
            "That's offside! Try again! 📖",
            "No goal! Try another word!",
            "Yellow card! Try again!",
            "Out of play! Think again!"
        ],
        goodProgress: [
            "Great pass! Keep going! 👍",
            "You're through on goal!",
            "Nice dribble! Use those clues!",
            "In the box! 🌡️"
        ],
        closeToWin: [
            "Penalty kick time! 🔥",
            "You're on fire! ⚽",
            "Almost a hat trick!",
            "One more strike to win!"
        ],
        yellowHints: [
            "Right players, wrong positions!",
            "Good formation, wrong spots!",
            "Change the tactics!",
            "Switch up the lineup!"
        ],
        noMatch: [
            "Saved! Try again!",
            "New attack! Fresh letters!",
            "Shake off that miss!",
            "Reset the formation! 💪"
        ],
        lateGame: [
            "Injury time!",
            "Extra time mode!",
            "Final whistle coming! Go!"
        ],
        win: {
            1: "GOLAZO! First try! 🏆",
            2: "AMAZING! Brace! 🥇",
            3: "FANTASTIC! Hat trick! 🌟",
            4: "GOAL! Nice finish! ⚽",
            5: "SCORED! You did it! 👏",
            6: "PHEW! Last minute winner! 💪"
        },
        lose: [
            "We'll get 'em next match!",
            "Tough loss. Next half!",
            "Champions bounce back!"
        ],
        newGame: [
            "New match! Kickoff! ⚽",
            "Fresh half, new chances!",
            "Back on the pitch! Ready!",
            "Let's go again! ⭐"
        ]
    }
};

// Settings Manager - Customization options
class SettingsManager {
    constructor() {
        this.defaults = {
            // Guessmate settings
            guessmate: {
                jerseyColor: '#2c5aa0',
                jerseyNumber: '7',
                helmetColor: '#2c5aa0',
                enabled: true
            },
            // Modal settings
            modal: {
                winColor: '#6aaa64',
                loseColor: '#c9b458',
                snowEnabled: true,
                characterEnabled: true
            },
            // Sound settings
            sound: {
                enabled: true,
                volume: 0.5
            },
            // Font settings
            font: {
                family: 'Segoe UI',
                titleSize: '2rem',
                tileSize: '1.8rem'
            }
        };

        this.settings = this.load();
        this.panel = null;
    }

    load() {
        const saved = localStorage.getItem('hockeyWordleSettings');
        if (saved) {
            return { ...this.defaults, ...JSON.parse(saved) };
        }
        return { ...this.defaults };
    }

    save() {
        localStorage.setItem('hockeyWordleSettings', JSON.stringify(this.settings));
        this.apply();
    }

    apply() {
        const root = document.documentElement;

        // Apply Guessmate colors
        root.style.setProperty('--guessmate-jersey', this.settings.guessmate.jerseyColor);
        root.style.setProperty('--guessmate-helmet', this.settings.guessmate.helmetColor);

        // Apply modal colors
        root.style.setProperty('--modal-win-color', this.settings.modal.winColor);
        root.style.setProperty('--modal-lose-color', this.settings.modal.loseColor);

        // Apply font settings
        root.style.setProperty('--font-family', this.settings.font.family);
        root.style.setProperty('--title-size', this.settings.font.titleSize);
        root.style.setProperty('--tile-font-size', this.settings.font.tileSize);

        // Update Guessmate jersey number and color if it exists
        const torso = document.querySelector('.guessmate-torso');
        if (torso) {
            torso.setAttribute('data-number', this.settings.guessmate.jerseyNumber);
            torso.style.background = `linear-gradient(145deg, ${this.settings.guessmate.jerseyColor}, #1e3d6f)`;
        }

        // Update helmet color
        const helmet = document.querySelector('.guessmate-helmet');
        if (helmet) {
            helmet.style.background = `linear-gradient(145deg, ${this.settings.guessmate.helmetColor}, #1e3d6f)`;
        }

        // Toggle Guessmate visibility
        const guessmate = document.getElementById('guessmate');
        if (guessmate) {
            guessmate.style.display = this.settings.guessmate.enabled ? 'block' : 'none';
        }

        // Apply sound settings
        if (this.settings.sound) {
            soundEffects.enabled = this.settings.sound.enabled;
            soundEffects.volume = this.settings.sound.volume;
        }
    }

    createPanel() {
        if (this.panel) {
            this.panel.remove();
            this.panel = null;
            return;
        }

        this.panel = document.createElement('div');
        this.panel.className = 'settings-panel';
        this.panel.id = 'settings-panel';

        this.panel.innerHTML = `
            <div class="settings-header">
                <h3>⚙️ Settings</h3>
                <button class="settings-close">&times;</button>
            </div>

            <div class="settings-content">
                <!-- Guessmate Section -->
                <div class="settings-section">
                    <h4>🏒 Guessmate</h4>
                    <div class="setting-row">
                        <label>Enable Guessmate</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="setting-guessmate-enabled" ${this.settings.guessmate.enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-row">
                        <label>Jersey Color</label>
                        <input type="color" id="setting-jersey-color" value="${this.settings.guessmate.jerseyColor}">
                    </div>
                    <div class="setting-row">
                        <label>Jersey Number</label>
                        <select id="setting-jersey-number">
                            ${[...Array(99)].map((_, i) => `<option value="${i + 1}" ${this.settings.guessmate.jerseyNumber == i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </div>
                    <div class="setting-row">
                        <label>Helmet Color</label>
                        <input type="color" id="setting-helmet-color" value="${this.settings.guessmate.helmetColor}">
                    </div>
                </div>

                <!-- Modal Section -->
                <div class="settings-section">
                    <h4>🎉 Win/Lose Modals</h4>
                    <div class="setting-row">
                        <label>Win Color</label>
                        <input type="color" id="setting-win-color" value="${this.settings.modal.winColor}">
                    </div>
                    <div class="setting-row">
                        <label>Lose Color</label>
                        <input type="color" id="setting-lose-color" value="${this.settings.modal.loseColor}">
                    </div>
                    <div class="setting-row">
                        <label>Snow Effect</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="setting-snow-enabled" ${this.settings.modal.snowEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <!-- Font Section -->
                <div class="settings-section">
                    <h4>🔤 Font Style</h4>
                    <div class="setting-row">
                        <label>Font Family</label>
                        <select id="setting-font-family">
                            <option value="Segoe UI" ${this.settings.font.family === 'Segoe UI' ? 'selected' : ''}>Segoe UI</option>
                            <option value="Arial" ${this.settings.font.family === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Georgia" ${this.settings.font.family === 'Georgia' ? 'selected' : ''}>Georgia</option>
                            <option value="Courier New" ${this.settings.font.family === 'Courier New' ? 'selected' : ''}>Courier New</option>
                            <option value="Comic Sans MS" ${this.settings.font.family === 'Comic Sans MS' ? 'selected' : ''}>Comic Sans MS</option>
                            <option value="Impact" ${this.settings.font.family === 'Impact' ? 'selected' : ''}>Impact</option>
                            <option value="Trebuchet MS" ${this.settings.font.family === 'Trebuchet MS' ? 'selected' : ''}>Trebuchet MS</option>
                        </select>
                    </div>
                    <div class="setting-row">
                        <label>Title Size</label>
                        <select id="setting-title-size">
                            <option value="1.5rem" ${this.settings.font.titleSize === '1.5rem' ? 'selected' : ''}>Small</option>
                            <option value="2rem" ${this.settings.font.titleSize === '2rem' ? 'selected' : ''}>Medium</option>
                            <option value="2.5rem" ${this.settings.font.titleSize === '2.5rem' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                    <div class="setting-row">
                        <label>Tile Font Size</label>
                        <select id="setting-tile-size">
                            <option value="1.5rem" ${this.settings.font.tileSize === '1.5rem' ? 'selected' : ''}>Small</option>
                            <option value="1.8rem" ${this.settings.font.tileSize === '1.8rem' ? 'selected' : ''}>Medium</option>
                            <option value="2.2rem" ${this.settings.font.tileSize === '2.2rem' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                </div>

                <!-- Theme Section -->
                <div class="settings-section">
                    <h4>🎨 Theme</h4>
                    <div class="setting-row">
                        <label>Dark Mode</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="setting-dark-mode" ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-footer">
                <button id="settings-reset" class="reset-settings-btn">Reset to Default</button>
                <button id="settings-save" class="save-settings-btn">Save Settings</button>
            </div>
        `;

        document.body.appendChild(this.panel);

        // Event listeners
        this.panel.querySelector('.settings-close').addEventListener('click', () => this.closePanel());
        this.panel.querySelector('#settings-save').addEventListener('click', () => this.saveFromPanel());
        this.panel.querySelector('#settings-reset').addEventListener('click', () => this.resetSettings());

        // Live preview on change
        this.panel.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', () => this.previewChanges());
        });

        // Dark mode toggle - handled separately since it uses ThemeController
        const darkModeToggle = this.panel.querySelector('#setting-dark-mode');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'dark' : 'light';
                if (window.themeController) {
                    window.themeController.setTheme(theme, true);
                }
            });
        }

        // Animate in
        setTimeout(() => this.panel.classList.add('show'), 10);
    }

    closePanel() {
        if (this.panel) {
            this.panel.classList.remove('show');
            setTimeout(() => {
                this.panel.remove();
                this.panel = null;
            }, 300);
        }
    }

    previewChanges() {
        this.gatherSettings();
        this.apply();
    }

    gatherSettings() {
        if (!this.panel) return;

        this.settings.guessmate.enabled = this.panel.querySelector('#setting-guessmate-enabled').checked;
        this.settings.guessmate.jerseyColor = this.panel.querySelector('#setting-jersey-color').value;
        this.settings.guessmate.jerseyNumber = this.panel.querySelector('#setting-jersey-number').value;
        this.settings.guessmate.helmetColor = this.panel.querySelector('#setting-helmet-color').value;

        this.settings.modal.winColor = this.panel.querySelector('#setting-win-color').value;
        this.settings.modal.loseColor = this.panel.querySelector('#setting-lose-color').value;
        this.settings.modal.snowEnabled = this.panel.querySelector('#setting-snow-enabled').checked;

        this.settings.font.family = this.panel.querySelector('#setting-font-family').value;
        this.settings.font.titleSize = this.panel.querySelector('#setting-title-size').value;
        this.settings.font.tileSize = this.panel.querySelector('#setting-tile-size').value;
    }

    saveFromPanel() {
        this.gatherSettings();
        this.save();
        this.closePanel();
    }

    resetSettings() {
        this.settings = { ...this.defaults };
        this.save();
        this.closePanel();
        this.createPanel(); // Reopen with default values
    }
}

// Global settings instance
const settingsManager = new SettingsManager();

// GuessmatAnimator - Anime.js powered 3D animations
class GuessmatAnimator {
    constructor(guessmate) {
        this.guessmate = guessmate;
        this.currentAnimation = null;
        this.floatAnimation = null;
        this.talkingAnimation = null;
        this.pulseAnimation = null;
    }

    // 3D Speech bubble pop animation with emotion support
    showSpeechBubble(speechBubble, emotion = 'neutral') {
        // Kill any existing animations
        if (this.currentAnimation) {
            this.currentAnimation.pause();
        }

        const cloudShape = speechBubble.querySelector('.cloud-shape');
        const bubbles = speechBubble.querySelectorAll('.bubble');
        const textContainer = speechBubble.querySelector('.speech-text-container');

        // Emotion-based animation parameters
        const emotionParams = this.getEmotionAnimationParams(emotion);

        // Reset initial state
        anime.set(speechBubble, { opacity: 0 });
        anime.set(cloudShape, {
            scale: 0,
            rotateX: emotionParams.startRotateX,
            rotateZ: 0,
            translateZ: -30
        });
        anime.set(bubbles, { scale: 0, opacity: 0 });
        anime.set(textContainer, { opacity: 0, translateY: 10 });

        // Show the bubble
        speechBubble.classList.add('show');

        // Create timeline with emotion-based easing
        this.currentAnimation = anime.timeline({
            easing: emotionParams.easing
        })
        .add({
            targets: speechBubble,
            opacity: 1,
            duration: 100,
            easing: 'linear'
        })
        .add({
            targets: cloudShape,
            scale: [0, emotionParams.bounceScale, 1],
            rotateX: [emotionParams.startRotateX, emotionParams.midRotateX, 0],
            rotateZ: [emotionParams.startRotateZ, emotionParams.midRotateZ, 0],
            translateZ: [-30, 10, 0],
            duration: emotionParams.duration,
            easing: emotionParams.springEasing
        }, '-=50')
        .add({
            targets: bubbles,
            scale: [0, 1.3, 1],
            opacity: [0, 1],
            delay: anime.stagger(emotionParams.bubbleStagger, { start: 0 }),
            duration: 400,
            easing: 'spring(1, 90, 12, 0)'
        }, '-=400')
        .add({
            targets: textContainer,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: 'easeOutCubic'
        }, '-=300');

        // Start emotion-specific floating animation after pop
        this.currentAnimation.finished.then(() => {
            this.startFloating(cloudShape, emotion);
        });

        return this.currentAnimation;
    }

    // Get animation parameters based on emotion
    getEmotionAnimationParams(emotion) {
        const params = {
            neutral: {
                startRotateX: 45,
                midRotateX: -5,
                startRotateZ: 0,
                midRotateZ: 0,
                bounceScale: 1.15,
                duration: 600,
                easing: 'easeOutElastic(1, 0.6)',
                springEasing: 'spring(1, 80, 10, 0)',
                bubbleStagger: 80
            },
            excited: {
                startRotateX: 60,
                midRotateX: -10,
                startRotateZ: -10,
                midRotateZ: 5,
                bounceScale: 1.25,
                duration: 500,
                easing: 'easeOutElastic(1, 0.4)',
                springEasing: 'spring(1, 60, 8, 0)',
                bubbleStagger: 50
            },
            encouraging: {
                startRotateX: 30,
                midRotateX: -3,
                startRotateZ: 5,
                midRotateZ: -2,
                bounceScale: 1.12,
                duration: 650,
                easing: 'easeOutElastic(1, 0.7)',
                springEasing: 'spring(1, 85, 12, 0)',
                bubbleStagger: 90
            },
            thinking: {
                startRotateX: 20,
                midRotateX: -2,
                startRotateZ: 8,
                midRotateZ: 3,
                bounceScale: 1.08,
                duration: 800,
                easing: 'easeOutCubic',
                springEasing: 'spring(1, 100, 15, 0)',
                bubbleStagger: 120
            },
            worried: {
                startRotateX: 35,
                midRotateX: -8,
                startRotateZ: -5,
                midRotateZ: 3,
                bounceScale: 1.1,
                duration: 550,
                easing: 'easeOutBack',
                springEasing: 'spring(1, 70, 10, 0)',
                bubbleStagger: 70
            },
            sad: {
                startRotateX: 15,
                midRotateX: 0,
                startRotateZ: 0,
                midRotateZ: -3,
                bounceScale: 1.05,
                duration: 900,
                easing: 'easeOutQuad',
                springEasing: 'spring(1, 120, 20, 0)',
                bubbleStagger: 150
            }
        };

        return params[emotion] || params.neutral;
    }

    // Hide speech bubble with 3D animation
    hideSpeechBubble(speechBubble) {
        if (this.floatAnimation) {
            this.floatAnimation.pause();
        }

        const cloudShape = speechBubble.querySelector('.cloud-shape');
        const bubbles = speechBubble.querySelectorAll('.bubble');

        return anime.timeline({
            easing: 'easeInCubic'
        })
        .add({
            targets: [...bubbles].reverse(),
            scale: 0,
            opacity: 0,
            delay: anime.stagger(50),
            duration: 150
        })
        .add({
            targets: cloudShape,
            scale: [1, 1.05, 0],
            rotateX: [0, -15],
            translateZ: [0, -20],
            duration: 300
        }, '-=100')
        .add({
            targets: speechBubble,
            opacity: 0,
            duration: 100,
            complete: () => {
                speechBubble.classList.remove('show');
            }
        }, '-=150');
    }

    // Gentle floating animation for the cloud with emotion-based intensity
    startFloating(cloudShape, emotion = 'neutral') {
        // Emotion-based floating parameters
        const floatParams = {
            neutral: { y: 2, rotation: 0.5, duration: 2000 },
            excited: { y: 4, rotation: 2, duration: 1200 },
            encouraging: { y: 2.5, rotation: 1, duration: 1800 },
            thinking: { y: 1.5, rotation: 1.5, duration: 2500 },
            worried: { y: 3, rotation: 1.5, duration: 1500 },
            sad: { y: 1, rotation: 0.3, duration: 3000 }
        };

        const params = floatParams[emotion] || floatParams.neutral;

        this.floatAnimation = anime({
            targets: cloudShape,
            translateY: [-params.y, params.y],
            rotateZ: [-params.rotation, params.rotation],
            duration: params.duration,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    // Subtle pulse animation for bubble while typing
    bubblePulse(cloudShape) {
        // Don't interrupt existing pulse
        if (this.pulseAnimation) return;

        this.pulseAnimation = anime({
            targets: cloudShape,
            scale: [1, 1.02, 1],
            duration: 150,
            easing: 'easeOutQuad',
            complete: () => {
                this.pulseAnimation = null;
            }
        });
    }

    // Mouth talking animation
    startTalking(mouth) {
        if (this.talkingAnimation) {
            this.talkingAnimation.pause();
        }

        this.talkingAnimation = anime({
            targets: mouth,
            scaleY: [1, 1.5, 0.8, 1.3, 1],
            scaleX: [1, 0.9, 1.1, 0.95, 1],
            borderRadius: ['0 0 5px 5px', '0 0 8px 8px', '50%', '0 0 6px 6px', '0 0 5px 5px'],
            duration: 300,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    // Stop mouth animation
    stopTalking(mouth) {
        if (this.talkingAnimation) {
            this.talkingAnimation.pause();
            this.talkingAnimation = null;
        }

        // Reset mouth to default state
        anime({
            targets: mouth,
            scaleY: 1,
            scaleX: 1,
            borderRadius: '0 0 5px 5px',
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    // Character mood animations
    animateMood(character, mood) {
        // Remove any existing mood animations
        anime.remove(character);
        anime.remove(character.querySelector('.guessmate-body'));
        anime.remove(character.querySelector('.guessmate-head'));

        const body = character.querySelector('.guessmate-body');
        const head = character.querySelector('.guessmate-head');

        switch (mood) {
            case 'excited':
                this.animateExcited(body, head);
                break;
            case 'celebrating':
                this.animateCelebrating(body, head);
                break;
            case 'thinking':
                this.animateThinking(body, head);
                break;
            case 'worried':
                this.animateWorried(body, head);
                break;
            case 'sad':
                this.animateSad(body, head);
                break;
            case 'happy':
                this.animateHappy(body, head);
                break;
            case 'determined':
                this.animateDetermined(body, head);
                break;
            default:
                this.animateIdle(body, head);
        }
    }

    animateExcited(body, head) {
        anime({
            targets: body,
            translateY: [-3, 0],
            duration: 300,
            direction: 'alternate',
            loop: 3,
            easing: 'easeOutQuad'
        });
        anime({
            targets: head,
            rotateZ: [-5, 5],
            duration: 200,
            direction: 'alternate',
            loop: 4,
            easing: 'easeInOutSine'
        });
    }

    animateCelebrating(body, head) {
        // Jump animation
        anime({
            targets: body,
            translateY: [-15, 0],
            scaleY: [0.9, 1.1, 1],
            duration: 500,
            direction: 'alternate',
            loop: true,
            easing: 'easeOutBounce'
        });
        // Head wobble
        anime({
            targets: head,
            rotateZ: [-10, 10],
            duration: 300,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    animateThinking(body, head) {
        anime({
            targets: head,
            rotateZ: [0, 8],
            translateX: [0, 2],
            duration: 1500,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: body,
            rotateZ: [0, 2],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    animateWorried(body, head) {
        // Shake animation
        anime({
            targets: body,
            translateX: [-2, 2],
            duration: 100,
            direction: 'alternate',
            loop: 5,
            easing: 'linear'
        });
        anime({
            targets: head,
            rotateZ: [-3, 3],
            duration: 150,
            direction: 'alternate',
            loop: 4,
            easing: 'linear'
        });
    }

    animateSad(body, head) {
        anime({
            targets: body,
            translateY: [0, 3],
            scaleY: [1, 0.95],
            duration: 1000,
            easing: 'easeOutQuad'
        });
        anime({
            targets: head,
            rotateZ: [0, -5],
            translateY: [0, 3],
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }

    animateHappy(body, head) {
        anime({
            targets: body,
            translateY: [-2, 0],
            duration: 400,
            direction: 'alternate',
            loop: 2,
            easing: 'easeOutQuad'
        });
        anime({
            targets: head,
            rotateZ: [-3, 3],
            duration: 300,
            direction: 'alternate',
            loop: 3,
            easing: 'easeInOutSine'
        });
    }

    animateDetermined(body, head) {
        // Lean forward
        anime({
            targets: body,
            rotateZ: [0, -3],
            translateY: [0, -2],
            duration: 500,
            easing: 'easeOutQuad'
        });
        anime({
            targets: head,
            rotateZ: [0, 5],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    animateIdle(body) {
        anime({
            targets: body,
            translateY: [-1, 1],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    // Walking bounce animation
    animateWalking(element) {
        return anime({
            targets: element.querySelector('.guessmate-body'),
            translateY: [-2, 0],
            duration: 200,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    // Reaction burst - quick attention getter
    reactionBurst(character) {
        const body = character.querySelector('.guessmate-body');

        return anime({
            targets: body,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeOutElastic(1, 0.5)'
        });
    }
}

// Guessmate - Your friendly sports companion
class Guessmate {
    constructor() {
        this.element = null;
        this.speechBubble = null;
        this.mood = 'idle';
        this.position = 50;
        this.direction = 1;
        this.walkInterval = null;
        this.isWalking = false;
        this.animator = null;
        this.mascotAnimator = null; // New SVG mascot animator
        this.useSVGMascot = true; // Toggle between old CSS and new SVG mascot
        this.currentSport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
        this.playerName = this.getPlayerName();
        this.create();
        // Initialize animator after elements are created
        this.animator = new GuessmatAnimator(this);

        // Initialize SVG mascot animator
        if (this.useSVGMascot && window.MascotAnimator) {
            this.mascotAnimator = new MascotAnimator('#guessmate-mascot-container');
            this.mascotAnimator.loadMascot(this.currentSport);
        }

        this.startIdleWalk();

        // Show personalized greeting after a short delay
        setTimeout(() => this.greetPlayer(), 500);
    }

    // Get player name from localStorage
    getPlayerName() {
        return localStorage.getItem('yinzordle_playerName') || '';
    }

    // Personalized greeting for the player
    greetPlayer() {
        const messages = this.getMessages();
        const name = this.playerName;

        if (name) {
            // Personalized greetings with player name
            const personalGreetings = {
                HOCKEY: [
                    `Hey ${name}! Ready to hit the ice? 🏒`,
                    `Welcome back, ${name}! Let's score! ⭐`,
                    `${name}! Let's find that word! 💪`,
                    `Good to see you, ${name}! Game on! 🏒`
                ],
                NFL: [
                    `${name}! Huddle up, let's play! 🏈`,
                    `Welcome to the field, ${name}! 🏈`,
                    `${name}! Ready for kickoff? Let's go!`,
                    `Hey ${name}! Time to make plays! 💪`
                ],
                NBA: [
                    `${name}! Let's hit the court! 🏀`,
                    `Welcome back, ${name}! Ball is life! 🏀`,
                    `${name}! Ready for tip-off? ⭐`,
                    `Hey ${name}! Let's score big! 💪`
                ],
                FA: [
                    `${name}! Let's hit the pitch! ⚽`,
                    `Welcome, ${name}! Beautiful game awaits! ⚽`,
                    `${name}! Ready to score? Let's go!`,
                    `Hey ${name}! Time to play! 💪`
                ]
            };

            const sportGreetings = personalGreetings[this.currentSport] || personalGreetings.HOCKEY;
            this.say(this.randomMessage(sportGreetings), 4000);
        } else {
            // Default greeting if no name
            this.say(this.randomMessage(messages.greetings), 3000);
        }
    }

    // Get current sport config
    getCoachConfig() {
        return COACH_CHARACTERS[this.currentSport] || COACH_CHARACTERS.HOCKEY;
    }

    // Get messages for the current sport
    getMessages() {
        const sport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
        return SPORT_MESSAGES[sport] || SPORT_MESSAGES.HOCKEY;
    }

    // Helper to pick a random message from an array
    randomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Helper to personalize a message with player name
    personalize(message) {
        const name = this.playerName;
        if (!name) return message;

        // 70% chance to add name to message
        if (Math.random() > 0.7) return message;

        // Different ways to incorporate the name
        const patterns = [
            `${name}, ${message.charAt(0).toLowerCase()}${message.slice(1)}`,
            `${message.replace('!', `, ${name}!`)}`,
            `Hey ${name}! ${message}`,
            `${name}! ${message}`
        ];

        // Pick a random pattern
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    // Generate character HTML based on sport
    generateCharacterHTML(config) {
        const { sport, headgear, accessory, outfit, colors } = config;

        // Build headgear HTML
        let headgearHTML = '';
        switch (headgear) {
            case 'helmet':
                headgearHTML = `<div class="guessmate-helmet coach-helmet-hockey"></div>`;
                break;
            case 'headset':
                headgearHTML = `
                    <div class="guessmate-cap"></div>
                    <div class="guessmate-headset">
                        <div class="headset-band"></div>
                        <div class="headset-mic"></div>
                    </div>`;
                break;
            case 'none':
            default:
                headgearHTML = `<div class="guessmate-hair coach-hair-${sport}"></div>`;
                break;
        }

        // Build accessory HTML
        let accessoryHTML = '';
        switch (accessory) {
            case 'stick':
                accessoryHTML = `<div class="guessmate-stick coach-stick-hockey"></div>`;
                break;
            case 'clipboard':
                accessoryHTML = `<div class="guessmate-clipboard coach-clipboard-${sport}"></div>`;
                break;
            case 'tactics-board':
                accessoryHTML = `<div class="guessmate-tactics-board"></div>`;
                break;
        }

        // Build outfit class
        const outfitClass = `coach-outfit-${outfit}`;

        return `
            <div class="guessmate-body coach-${sport}">
                <div class="guessmate-head">
                    ${headgearHTML}
                    <div class="guessmate-face">
                        <div class="guessmate-eye left"></div>
                        <div class="guessmate-eye right"></div>
                        <div class="guessmate-mouth"></div>
                    </div>
                </div>
                <div class="guessmate-torso ${outfitClass}" data-number="${settingsManager.settings.guessmate.jerseyNumber}"></div>
                <div class="guessmate-arms">
                    <div class="guessmate-arm left"></div>
                    <div class="guessmate-arm right"></div>
                </div>
                <div class="guessmate-legs">
                    <div class="guessmate-leg left"></div>
                    <div class="guessmate-leg right"></div>
                </div>
                ${accessoryHTML}
            </div>
        `;
    }

    // Switch character when sport changes
    switchCharacter(newSport) {
        this.currentSport = newSport;
        const config = this.getCoachConfig();

        // Update character HTML with animation
        if (this.character) {
            // Add switching animation class
            this.character.classList.add('switching');

            // Wait for half animation then swap content
            setTimeout(() => {
                this.character.innerHTML = this.generateCharacterHTML(config);

                // Update character class for sport-specific styling
                this.character.className = 'guessmate-character switching';
                this.character.classList.add(`sport-${config.sport}`);

                // Apply CSS variables for colors
                this.applyCoachColors(config.colors);

                // Remove switching class after animation completes
                setTimeout(() => {
                    this.character.classList.remove('switching');
                }, 200);
            }, 200);
        }

        // Re-initialize animator with new character elements after switch
        setTimeout(() => {
            if (this.animator) {
                this.animator = new GuessmatAnimator(this);
            }
        }, 400);

        // Say a greeting in the new sport's style
        const messages = this.getMessages();
        setTimeout(() => {
            this.say(this.randomMessage(messages.newGame));
        }, 500);
    }

    // Apply coach colors via CSS variables
    applyCoachColors(colors) {
        if (this.element) {
            this.element.style.setProperty('--coach-primary', colors.primary);
            this.element.style.setProperty('--coach-secondary', colors.secondary);
            this.element.style.setProperty('--coach-accent', colors.accent);
        }
    }

    create() {
        // Create guessmate container
        const container = document.createElement('div');
        container.id = 'guessmate';
        container.className = 'guessmate';

        // Get coach config for current sport
        const config = this.getCoachConfig();
        const messages = this.getMessages();
        const initialMessage = `Let's play! ${messages.icon}`;

        // Determine which character system to use
        const characterHTML = this.useSVGMascot
            ? `<div class="guessmate-mascot-wrapper" id="guessmate-char">
                   <div class="guessmate-mascot-container" id="guessmate-mascot-container">
                       <!-- SVG mascot will be loaded here -->
                   </div>
               </div>`
            : `<div class="guessmate-character sport-${config.sport}" id="guessmate-char">
                   ${this.generateCharacterHTML(config)}
               </div>`;

        container.innerHTML = `
            <div class="guessmate-speech" id="guessmate-speech">
                <div class="cloud-shape">
                    <div class="cloud-bump-1"></div>
                    <div class="cloud-bump-2"></div>
                    <div class="cloud-bump-3"></div>
                    <div class="cloud-bump-4"></div>
                    <div class="speech-text-container">
                        <span class="speech-text">${initialMessage}</span>
                    </div>
                </div>
                <div class="cloud-bubble-tail">
                    <div class="bubble bubble-1"></div>
                    <div class="bubble bubble-2"></div>
                    <div class="bubble bubble-3"></div>
                </div>
            </div>
            ${characterHTML}
        `;

        document.body.appendChild(container);
        this.element = container;
        this.speechBubble = document.getElementById('guessmate-speech');
        this.character = document.getElementById('guessmate-char');

        // Apply initial coach colors (for fallback CSS character)
        if (!this.useSVGMascot) {
            this.applyCoachColors(config.colors);
        }
    }

    say(message, duration = 3000, emotion = null) {
        const speechText = this.speechBubble.querySelector('.speech-text');

        // Clear any existing timeouts and typing animation
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
        }
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }

        // Detect emotion from message if not provided
        const detectedEmotion = emotion || this.detectEmotion(message);

        // Apply emotion-based styling to bubble
        this.applyBubbleEmotion(detectedEmotion);

        // Trigger SVG mascot emotion animation
        if (this.mascotAnimator && this.mascotAnimator.isLoaded) {
            // Map detected emotion to mascot state
            const mascotState = this.mapEmotionToMascotState(detectedEmotion);
            this.mascotAnimator.setState(mascotState);
        }

        // Use Anime.js for 3D speech bubble animation
        if (this.animator && typeof anime !== 'undefined') {
            // Hide first if already showing
            if (this.speechBubble.classList.contains('show')) {
                this.speechBubble.classList.remove('show');
            }

            // Clear text initially for typing effect
            speechText.textContent = '';
            speechText.classList.add('typing');

            // Show with 3D animation
            this.animator.showSpeechBubble(this.speechBubble, detectedEmotion);

            // Start typing animation after bubble appears
            this.typingTimeout = setTimeout(() => {
                this.typeText(speechText, message, () => {
                    speechText.classList.remove('typing');
                    // Start mouth idle after typing completes
                    this.stopMouthAnimation();
                });
            }, 400);

            // Start mouth animation while "speaking"
            this.startMouthAnimation();

            // Calculate duration based on message length + base duration
            const typingDuration = message.length * 30 + 500;
            const totalDuration = Math.max(duration, typingDuration + 1500);

            // Hide after duration
            this.speechTimeout = setTimeout(() => {
                this.animator.hideSpeechBubble(this.speechBubble);
                this.removeBubbleEmotion();
                // Return mascot to idle
                if (this.mascotAnimator && this.mascotAnimator.isLoaded) {
                    this.mascotAnimator.setState('idle');
                }
            }, totalDuration);
        } else {
            // Fallback to CSS animation (no typing effect)
            speechText.textContent = message;
            this.speechBubble.classList.remove('show', 'css-animate');
            void this.speechBubble.offsetWidth;
            this.speechBubble.classList.add('show', 'css-animate');

            this.speechTimeout = setTimeout(() => {
                this.speechBubble.classList.remove('show', 'css-animate');
                this.removeBubbleEmotion();
                // Return mascot to idle
                if (this.mascotAnimator && this.mascotAnimator.isLoaded) {
                    this.mascotAnimator.setState('idle');
                }
            }, duration);
        }
    }

    // Map speech bubble emotion to mascot animation state
    mapEmotionToMascotState(emotion) {
        const mapping = {
            'excited': 'excited',
            'encouraging': 'encouraging',
            'thinking': 'thinking',
            'worried': 'worried',
            'sad': 'sad',
            'neutral': 'idle'
        };
        return mapping[emotion] || 'idle';
    }

    // Typing animation for speech text
    typeText(element, text, onComplete) {
        let index = 0;
        const chars = text.split('');

        this.typingInterval = setInterval(() => {
            if (index < chars.length) {
                element.textContent += chars[index];
                index++;

                // Add subtle bounce to bubble on each character
                if (this.animator && index % 3 === 0) {
                    this.animator.bubblePulse(this.speechBubble.querySelector('.cloud-shape'));
                }
            } else {
                clearInterval(this.typingInterval);
                this.typingInterval = null;
                if (onComplete) onComplete();
            }
        }, 30); // 30ms per character
    }

    // Detect emotion from message content
    detectEmotion(message) {
        const lowerMsg = message.toLowerCase();

        // Excited/Happy indicators
        if (lowerMsg.includes('!') && (lowerMsg.includes('great') || lowerMsg.includes('amazing') ||
            lowerMsg.includes('perfect') || lowerMsg.includes('genius') || lowerMsg.includes('wow') ||
            lowerMsg.includes('touchdown') || lowerMsg.includes('goal') || lowerMsg.includes('slam'))) {
            return 'excited';
        }

        // Encouraging
        if (lowerMsg.includes('nice') || lowerMsg.includes('good') || lowerMsg.includes('keep') ||
            lowerMsg.includes('close') || lowerMsg.includes('almost')) {
            return 'encouraging';
        }

        // Thinking
        if (lowerMsg.includes('hmm') || lowerMsg.includes('🤔') || lowerMsg.includes('interesting') ||
            lowerMsg.includes('think')) {
            return 'thinking';
        }

        // Worried/Concern
        if (lowerMsg.includes('oops') || lowerMsg.includes('try again') || lowerMsg.includes('not quite') ||
            lowerMsg.includes('invalid') || lowerMsg.includes('not in')) {
            return 'worried';
        }

        // Sad/Lose
        if (lowerMsg.includes('game over') || lowerMsg.includes('the word was')) {
            return 'sad';
        }

        return 'neutral';
    }

    // Apply emotion-based styling to speech bubble
    applyBubbleEmotion(emotion) {
        // Remove any existing emotion classes
        this.speechBubble.classList.remove('emotion-excited', 'emotion-encouraging',
            'emotion-thinking', 'emotion-worried', 'emotion-sad', 'emotion-neutral');

        // Add new emotion class
        this.speechBubble.classList.add(`emotion-${emotion}`);
    }

    removeBubbleEmotion() {
        this.speechBubble.classList.remove('emotion-excited', 'emotion-encouraging',
            'emotion-thinking', 'emotion-worried', 'emotion-sad', 'emotion-neutral');
    }

    // Mouth animation while speaking
    startMouthAnimation() {
        const mouth = this.character.querySelector('.guessmate-mouth');
        if (mouth && this.animator) {
            this.animator.startTalking(mouth);
        }
    }

    stopMouthAnimation() {
        const mouth = this.character.querySelector('.guessmate-mouth');
        if (mouth && this.animator) {
            this.animator.stopTalking(mouth);
        }
    }

    setMood(mood) {
        this.mood = mood;
        const character = this.character;
        character.className = 'guessmate-character';
        character.classList.add(`mood-${mood}`);

        // Use Anime.js for mood animations
        if (this.animator && typeof anime !== 'undefined') {
            this.animator.animateMood(character, mood);
        }
    }

    startIdleWalk() {
        if (this.walkInterval) return;

        this.isWalking = true;
        this.element.classList.add('walking');

        this.walkInterval = setInterval(() => {
            this.position += this.direction * 0.5;

            if (this.position >= 85) {
                this.direction = -1;
                this.element.classList.add('flip');
            } else if (this.position <= 15) {
                this.direction = 1;
                this.element.classList.remove('flip');
            }

            this.element.style.left = this.position + '%';
        }, 50);
    }

    stopWalking() {
        if (this.walkInterval) {
            clearInterval(this.walkInterval);
            this.walkInterval = null;
        }
        this.isWalking = false;
        this.element.classList.remove('walking');
    }

    // Reactions for different game events
    onGameStart() {
        this.setMood('excited');
        const messages = this.getMessages();
        this.say(this.personalize(this.randomMessage(messages.greetings)));
    }

    onLetterTyped(letter, position) {
        const messages = this.getMessages();
        const name = this.playerName;
        if (position === 0) {
            this.setMood('thinking');
            const reactions = name ? [
                `${letter}... interesting start, ${name}!`,
                `Ooh ${name}, starting with ${letter}!`,
                `${letter}? Nice choice, ${name}!`,
                `${name} goes with ${letter}... 🤔`
            ] : [
                `${letter}... interesting start!`,
                `Ooh, starting with ${letter}!`,
                `${letter}, nice choice!`
            ];
            this.say(this.randomMessage(reactions), 1500);
        } else if (position === 4) {
            this.setMood('excited');
            const fullWordMsg = name
                ? `Full word, ${name}! Hit Enter! ${messages.icon}`
                : `Full word! Hit Enter! ${messages.icon}`;
            this.say(fullWordMsg, 2000);
        }
    }

    onLetterDeleted() {
        const name = this.playerName;
        const reactions = name ? [
            `Changed your mind, ${name}? No worries!`,
            `Rethinking, ${name}? Smart move!`,
            `${name}'s reconsidering... I like it!`
        ] : [
            "Changed your mind? No worries!",
            "Backspace is your friend!",
            "Rethinking... smart move!"
        ];
        if (Math.random() < 0.3) {
            this.say(this.randomMessage(reactions), 1500);
        }
    }

    onInvalidWord() {
        this.setMood('worried');
        const messages = this.getMessages();
        this.say(this.personalize(this.randomMessage(messages.invalidWord)));
    }

    onNotEnoughLetters() {
        this.setMood('thinking');
        const name = this.playerName;
        const reactions = name ? [
            `Need 5 letters, ${name}!`,
            `Keep typing, ${name}! Almost there!`,
            `${name}, few more letters needed! ✍️`
        ] : [
            "Need 5 letters, buddy!",
            "Keep typing! Almost there!",
            "Few more letters needed! ✍️"
        ];
        this.say(this.randomMessage(reactions));
    }

    onGuessResult(correctCount, presentCount, absentCount, attempt) {
        if (correctCount === 5) {
            // Will be handled by onWin
            return;
        }

        const messages = this.getMessages();
        const name = this.playerName;

        if (correctCount >= 3) {
            this.setMood('excited');
            const baseMsg = this.randomMessage(messages.closeToWin);
            const personalMsg = name
                ? `${correctCount} green, ${name}! ${baseMsg}`
                : `${correctCount} green! ${baseMsg}`;
            this.say(personalMsg);
        } else if (correctCount >= 1 || presentCount >= 2) {
            this.setMood('happy');
            this.say(this.personalize(this.randomMessage(messages.goodProgress)));
        } else if (presentCount >= 1) {
            this.setMood('thinking');
            this.say(this.personalize(this.randomMessage(messages.yellowHints)));
        } else {
            this.setMood('worried');
            this.say(this.personalize(this.randomMessage(messages.noMatch)));
        }

        // Extra encouragement on later attempts
        if (attempt >= 4 && correctCount < 3) {
            setTimeout(() => {
                this.setMood('determined');
                const lateMsg = this.randomMessage(messages.lateGame);
                this.say(name ? `${name}, ${lateMsg.toLowerCase()}` : lateMsg);
            }, 3500);
        }
    }

    onWin(attempts) {
        this.stopWalking();
        this.setMood('celebrating');
        const messages = this.getMessages();
        const name = this.playerName;
        const sport = this.currentSport;
        let winMessage = messages.win[attempts] || `YOU WON! ${messages.icon}`;

        // Sport-specific personalized win messages
        if (name) {
            const sportWinMessages = {
                HOCKEY: {
                    1: `INCREDIBLE ${name.toUpperCase()}! First try?! Hat trick legend! 🏆🏒`,
                    2: `AMAZING ${name.toUpperCase()}! Two tries! All-star player! 🥇`,
                    3: `FANTASTIC, ${name}! You're skating circles around this! 🌟`,
                    4: `NICE ONE, ${name}! Solid performance on the ice! 🏒`,
                    5: `GOOD JOB, ${name}! You figured it out, champ! 👏`,
                    6: `PHEW ${name}! Overtime winner! Never gave up! 💪`
                },
                NFL: {
                    1: `TOUCHDOWN ${name.toUpperCase()}! First try?! MVP status! 🏆🏈`,
                    2: `AMAZING ${name.toUpperCase()}! Two tries! Pro Bowl material! 🥇`,
                    3: `FANTASTIC, ${name}! That's a game-winning drive! 🌟`,
                    4: `NICE ONE, ${name}! Solid play calling! 🏈`,
                    5: `GOOD JOB, ${name}! You ran it into the end zone! 👏`,
                    6: `PHEW ${name}! Hail Mary completed! Never gave up! 💪`
                },
                NBA: {
                    1: `SLAM DUNK ${name.toUpperCase()}! First try?! Hall of Famer! 🏆🏀`,
                    2: `AMAZING ${name.toUpperCase()}! Two tries! All-NBA team! 🥇`,
                    3: `FANTASTIC, ${name}! Nothing but net! 🌟`,
                    4: `NICE ONE, ${name}! Clutch shooting! 🏀`,
                    5: `GOOD JOB, ${name}! You hit the buzzer beater! 👏`,
                    6: `PHEW ${name}! Game 7 winner! Never gave up! 💪`
                },
                FA: {
                    1: `GOOOAL ${name.toUpperCase()}! First try?! World class! 🏆⚽`,
                    2: `AMAZING ${name.toUpperCase()}! Two tries! Ballon d'Or worthy! 🥇`,
                    3: `FANTASTIC, ${name}! Top corner finish! 🌟`,
                    4: `NICE ONE, ${name}! Clinical finish! ⚽`,
                    5: `GOOD JOB, ${name}! You found the back of the net! 👏`,
                    6: `PHEW ${name}! Last minute winner! Never gave up! 💪`
                }
            };

            const sportMessages = sportWinMessages[sport] || sportWinMessages.HOCKEY;
            winMessage = sportMessages[attempts] || `${name.toUpperCase()} WINS! ${messages.icon}`;
        }

        this.say(winMessage, 5000);
    }

    onLose(word) {
        this.stopWalking();
        this.setMood('sad');
        const messages = this.getMessages();
        const name = this.playerName;
        const sport = this.currentSport;

        // Sport-specific personalized lose messages
        let loseMessage;
        if (name) {
            const sportLoseMessages = {
                HOCKEY: [
                    `The word was ${word}. ${name}, we'll get 'em next period!`,
                    `${word} was the answer. Shake it off, ${name}! Next shift!`,
                    `It was ${word}. ${name}, even Gretzky had bad games! 🏒`
                ],
                NFL: [
                    `The word was ${word}. ${name}, we'll come back stronger next drive!`,
                    `${word} was the play. ${name}, time to regroup in the huddle!`,
                    `It was ${word}. ${name}, even Brady threw interceptions! 🏈`
                ],
                NBA: [
                    `The word was ${word}. ${name}, we'll bounce back next quarter!`,
                    `${word} was the shot. ${name}, even MJ missed sometimes!`,
                    `It was ${word}. ${name}, trust the process! 🏀`
                ],
                FA: [
                    `The word was ${word}. ${name}, we go again next match!`,
                    `${word} was it. ${name}, even Messi misses penalties!`,
                    `It was ${word}. ${name}, keep your head up! ⚽`
                ]
            };

            const sportMessages = sportLoseMessages[sport] || sportLoseMessages.HOCKEY;
            loseMessage = this.randomMessage(sportMessages);
        } else {
            loseMessage = `The word was ${word}. ${this.randomMessage(messages.lose)}`;
        }

        this.say(loseMessage, 5000);
    }

    onNewGame() {
        this.setMood('excited');
        this.startIdleWalk();
        const messages = this.getMessages();
        const name = this.playerName;
        const newGameMsg = this.randomMessage(messages.newGame);
        this.say(name ? `${name}! ${newGameMsg}` : newGameMsg);
    }

    reset() {
        this.setMood('idle');
        this.startIdleWalk();
    }
}

class HockeyWordle {
    constructor() {
        this.wordLength = 5;
        this.maxAttempts = 6;
        this.currentRow = 0;
        this.currentCol = 0;
        this.currentGuess = "";
        this.targetWord = "";
        this.gameOver = false;
        this.guesses = [];
        this.guessmate = null;
        this.isMobile = false;
        this.mobileInput = null;

        this.init();
    }

    init() {
        this.checkMobile();
        this.createBoard();
        this.createKeyboard();
        this.selectNewWord();
        this.bindEvents();
        this.bindSportSelector();
        this.guessmate = new Guessmate();

        // Apply saved settings
        settingsManager.apply();

        // Initialize sport selector from saved preference
        this.initSportSelector();

        // Setup mobile if needed
        if (this.isMobile) {
            this.setupMobile();
        }

        // Listen for resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.checkMobile();
            if (this.isMobile !== wasMobile) {
                if (this.isMobile) {
                    this.setupMobile();
                } else {
                    this.cleanupMobile();
                }
            }
        });

        // Check if user needs onboarding (first-time players)
        this.checkOnboarding();
    }

    /**
     * Check if onboarding should be shown to first-time users
     */
    checkOnboarding() {
        if (!OnboardingManager.isComplete()) {
            // First-time user - show onboarding
            this.onboarding = new OnboardingManager({
                mascotPath: './mascots/',
                onComplete: () => {
                    // Start game after onboarding
                    this.guessmate.onGameStart();
                },
                onSkip: () => {
                    // Also start game if skipped
                },
                onStepChange: (step, stepData) => {
                    // Optional: sync mascot emotions
                }
            });
            this.onboarding.show();
        } else {
            // Returning user - start game immediately
            setTimeout(() => this.guessmate.onGameStart(), 500);
        }
    }

    /**
     * Show onboarding again (can be triggered from help)
     */
    showOnboarding() {
        if (!this.onboarding) {
            this.onboarding = new OnboardingManager({
                mascotPath: './mascots/',
                onComplete: () => {},
                onSkip: () => {}
            });
        }
        // Reset completion status temporarily to show all steps
        OnboardingManager.reset();
        this.onboarding.show();
    }

    checkMobile() {
        this.isMobile = window.innerWidth <= 500;
    }

    setupMobile() {
        // Make current row tiles tappable for visual feedback
        this.updateTappableTiles();

        // Note: We use the on-screen keyboard instead of native keyboard
        // The mobile input element is hidden via CSS to prevent native keyboard
        // Mobile control buttons are also hidden since on-screen keyboard has Enter/Backspace
    }

    cleanupMobile() {
        // Remove tappable classes from tiles
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('tappable', 'active-cell');
        });
    }

    updateTappableTiles() {
        if (!this.isMobile) return;

        // Remove all tappable/active classes first
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('tappable', 'active-cell');
        });

        if (this.gameOver) return;

        // Make current row tiles tappable
        for (let j = 0; j < this.wordLength; j++) {
            const tile = document.getElementById(`tile-${this.currentRow}-${j}`);
            if (tile) {
                tile.classList.add('tappable');

                // Remove existing click listeners to avoid duplicates
                const newTile = tile.cloneNode(true);
                tile.parentNode.replaceChild(newTile, tile);

                newTile.addEventListener('click', () => {
                    this.onTileTap(j);
                });
            }
        }

        // Highlight current cell
        this.highlightCurrentCell();
    }

    highlightCurrentCell() {
        if (!this.isMobile) return;

        // Remove active from all
        document.querySelectorAll('.tile.active-cell').forEach(t => {
            t.classList.remove('active-cell');
        });

        // Add active to current cell
        const currentTile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
        if (currentTile && this.currentCol < this.wordLength) {
            currentTile.classList.add('active-cell');
        }
    }

    onTileTap(col) {
        if (this.gameOver) return;

        // Set current column to tapped position (if it's valid)
        // Allow tapping on filled cells to replace, or next empty cell
        if (col <= this.currentCol || col === this.currentCol) {
            this.currentCol = col;
            // Trim the guess to match
            this.currentGuess = this.currentGuess.substring(0, col);

            // Clear tiles from this position
            for (let j = col; j < this.wordLength; j++) {
                const tile = document.getElementById(`tile-${this.currentRow}-${j}`);
                if (tile) {
                    tile.textContent = '';
                    tile.classList.remove('filled');
                }
            }
        }

        this.highlightCurrentCell();
        // On-screen keyboard is used instead of native keyboard
    }

    // handleMobileInput removed - using on-screen keyboard instead

    selectNewWord() {
        const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length);
        this.targetWord = ANSWER_WORDS[randomIndex].toUpperCase();
        console.log("Hint (for testing):", this.targetWord); // Remove in production
    }

    createBoard() {
        const board = document.getElementById("game-board");
        board.innerHTML = "";

        for (let i = 0; i < this.maxAttempts; i++) {
            const row = document.createElement("div");
            row.className = "row";
            row.id = `row-${i}`;

            for (let j = 0; j < this.wordLength; j++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.id = `tile-${i}-${j}`;
                row.appendChild(tile);
            }

            board.appendChild(row);
        }
    }

    createKeyboard() {
        const keyboard = document.getElementById("keyboard");
        keyboard.innerHTML = "";

        const rows = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "⌫"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M", "ENTER"]
        ];

        rows.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";

            row.forEach(key => {
                const button = document.createElement("button");
                button.className = "key";
                button.textContent = key;
                button.id = `key-${key}`;

                if (key === "ENTER" || key === "⌫") {
                    button.classList.add("wide");
                }

                button.addEventListener("click", () => {
                    // Ensure sound works on mobile
                    soundEffects.resume();
                    soundEffects.playKeySound();
                    this.handleKeyPress(key);
                });
                rowDiv.appendChild(button);
            });

            keyboard.appendChild(rowDiv);
        });
    }

    bindEvents() {
        // Initialize sound effects on first user interaction (including mobile touch)
        const initSoundOnInteraction = () => {
            soundEffects.init();
            soundEffects.resume(); // Important for mobile browsers
            document.removeEventListener('click', initSoundOnInteraction);
            document.removeEventListener('keydown', initSoundOnInteraction);
            document.removeEventListener('touchstart', initSoundOnInteraction);
            document.removeEventListener('touchend', initSoundOnInteraction);
        };
        document.addEventListener('click', initSoundOnInteraction);
        document.addEventListener('keydown', initSoundOnInteraction);
        document.addEventListener('touchstart', initSoundOnInteraction, { passive: true });
        document.addEventListener('touchend', initSoundOnInteraction, { passive: true });

        // Physical keyboard
        document.addEventListener("keydown", (e) => {
            // Ignore if typing in an input field (prevents duplicate input)
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Admin shortcut: Ctrl+Shift+A (word list)
            if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "A") {
                e.preventDefault();
                this.toggleAdminPanel();
                return;
            }

            // Admin shortcut: Ctrl+Shift+S (settings)
            if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "S") {
                e.preventDefault();
                settingsManager.createPanel();
                return;
            }

            if (this.gameOver) return;

            if (e.key === "Enter") {
                soundEffects.playKeySound();
                this.handleKeyPress("ENTER");
            } else if (e.key === "Backspace") {
                soundEffects.playKeySound();
                this.handleKeyPress("⌫");
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                soundEffects.playKeySound();
                this.handleKeyPress(e.key.toUpperCase());
            }
        });

        // New game button
        document.getElementById("new-game").addEventListener("click", () => {
            soundEffects.init();
            this.resetGame();
        });

        // Quit button - go back to landing page
        const quitBtn = document.getElementById("quit-btn");
        if (quitBtn) {
            quitBtn.addEventListener("click", () => {
                window.location.href = 'landing.html';
            });
        }

        // Secret mobile gesture: Multi-tap on title for admin access
        this.setupSecretGesture();
    }

    setupSecretGesture() {
        // Triple-tap on title for Settings
        const title = document.querySelector('header h1');
        if (title) {
            let tapCount = 0;
            let tapTimer = null;
            const TAP_TIMEOUT = 500;

            title.addEventListener('click', (e) => {
                e.preventDefault();
                tapCount++;

                if (tapTimer) clearTimeout(tapTimer);

                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, TAP_TIMEOUT);

                // 3 taps = Settings panel
                if (tapCount === 3) {
                    settingsManager.createPanel();
                    tapCount = 0;
                    clearTimeout(tapTimer);
                }
            });

            title.style.cursor = 'pointer';
            title.style.userSelect = 'none';
            title.style.webkitUserSelect = 'none';
        }

        // Long press on help button for Admin panel
        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            let pressTimer = null;
            const LONG_PRESS_DURATION = 800; // 0.8 seconds

            const startPress = (e) => {
                pressTimer = setTimeout(() => {
                    this.toggleAdminPanel();
                    // Vibrate if available (mobile feedback)
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }, LONG_PRESS_DURATION);
            };

            const cancelPress = () => {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
            };

            // Mouse events (desktop)
            helpBtn.addEventListener('mousedown', startPress);
            helpBtn.addEventListener('mouseup', cancelPress);
            helpBtn.addEventListener('mouseleave', cancelPress);

            // Touch events (mobile)
            helpBtn.addEventListener('touchstart', (e) => {
                startPress(e);
            });
            helpBtn.addEventListener('touchend', cancelPress);
            helpBtn.addEventListener('touchcancel', cancelPress);
        }
    }

    initSportSelector() {
        // Set the active sport button based on saved preference
        const savedSport = localStorage.getItem('yinzordle-sport') || 'HOCKEY';
        const buttons = document.querySelectorAll('.sport-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.sport === savedSport) {
                btn.classList.add('active');
            }
        });

        // Update subtitle for saved sport
        if (typeof SPORT_CONFIG !== 'undefined' && SPORT_CONFIG[savedSport]) {
            const subtitle = document.querySelector('.subtitle');
            if (subtitle) {
                subtitle.textContent = SPORT_CONFIG[savedSport].subtitle;
            }
        }
    }

    bindSportSelector() {
        const sportButtons = document.querySelectorAll('.sport-btn');
        sportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sport = btn.dataset.sport;
                this.changeSport(sport);

                // Update active state
                sportButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    changeSport(sport) {
        // Switch the sport (updates word lists)
        if (typeof switchSport === 'function') {
            switchSport(sport);
        }

        // Switch the Guessmate character to match the sport
        if (this.guessmate) {
            this.guessmate.switchCharacter(sport);
        }

        // Reset the game with new sport words
        this.resetGame();

        // Show message about sport change
        const sportConfig = typeof SPORT_CONFIG !== 'undefined' ? SPORT_CONFIG[sport] : null;
        if (sportConfig) {
            this.showMessage(`Switched to ${sportConfig.name} ${sportConfig.icon}`, "info");

            // Update subtitle to reflect current sport
            const subtitle = document.querySelector('.subtitle');
            if (subtitle) {
                subtitle.textContent = `Guess the 5-letter ${sportConfig.name} word!`;
            }
        }

        // Save sport preference
        localStorage.setItem('yinzordle_sport', sport);
    }

    toggleAdminPanel() {
        let panel = document.getElementById("admin-panel");

        if (panel) {
            panel.remove();
            return;
        }

        panel = document.createElement("div");
        panel.id = "admin-panel";
        panel.className = "admin-panel";

        const header = document.createElement("div");
        header.className = "admin-header";
        header.innerHTML = `
            <h3>Admin: All 5-Letter Words (${ANSWER_WORDS.length})</h3>
            <button class="admin-close">&times;</button>
        `;
        panel.appendChild(header);

        const wordList = document.createElement("div");
        wordList.className = "admin-word-list";

        const sortedWords = [...ANSWER_WORDS].sort();
        sortedWords.forEach(word => {
            const wordItem = document.createElement("span");
            wordItem.className = "admin-word";
            if (word === this.targetWord) {
                wordItem.classList.add("current-word");
            }
            wordItem.textContent = word;
            wordList.appendChild(wordItem);
        });

        panel.appendChild(wordList);

        const footer = document.createElement("div");
        footer.className = "admin-footer";
        footer.textContent = "Current answer is highlighted in green";
        panel.appendChild(footer);

        document.body.appendChild(panel);

        // Close button event
        panel.querySelector(".admin-close").addEventListener("click", () => {
            panel.remove();
        });
    }

    handleKeyPress(key) {
        if (this.gameOver) return;

        if (key === "ENTER") {
            this.submitGuess();
        } else if (key === "⌫") {
            this.deleteLetter();
        } else if (this.currentCol < this.wordLength) {
            this.addLetter(key);
        }
    }

    addLetter(letter) {
        if (this.currentCol >= this.wordLength) return;

        const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
        tile.textContent = letter;
        tile.classList.add("filled");
        this.currentGuess += letter;
        this.guessmate.onLetterTyped(letter, this.currentCol);
        this.currentCol++;

        // Update mobile UI
        if (this.isMobile) {
            this.highlightCurrentCell();
        }
    }

    deleteLetter() {
        if (this.currentCol <= 0) return;

        this.currentCol--;
        const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
        tile.textContent = "";
        tile.classList.remove("filled");
        this.currentGuess = this.currentGuess.slice(0, -1);
        this.guessmate.onLetterDeleted();

        // Update mobile UI
        if (this.isMobile) {
            this.highlightCurrentCell();
        }
    }

    submitGuess() {
        if (this.currentGuess.length !== this.wordLength) {
            this.showMessage("Not enough letters!", "error");
            this.shakeRow();
            soundEffects.playErrorSound();
            this.guessmate.onNotEnoughLetters();
            return;
        }

        if (!this.isValidWord(this.currentGuess)) {
            this.showMessage("Not a valid word!", "error");
            this.shakeRow();
            soundEffects.playErrorSound();
            this.guessmate.onInvalidWord();
            return;
        }

        this.guesses.push(this.currentGuess);
        this.revealGuess();
    }

    isValidWord(word) {
        // Use dynamic word list that includes sport-specific and common words
        const validWords = typeof getAllValidWords === 'function' ? getAllValidWords() : ALL_VALID_WORDS;
        return validWords.includes(word.toUpperCase());
    }

    revealGuess() {
        const guess = this.currentGuess;
        const targetArray = this.targetWord.split("");
        const guessArray = guess.split("");
        const result = new Array(this.wordLength).fill("absent");

        // Track which target letters have been matched
        const targetUsed = new Array(this.wordLength).fill(false);

        // First pass: find correct letters (green)
        for (let i = 0; i < this.wordLength; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = "correct";
                targetUsed[i] = true;
            }
        }

        // Second pass: find present letters (yellow)
        for (let i = 0; i < this.wordLength; i++) {
            if (result[i] === "correct") continue;

            for (let j = 0; j < this.wordLength; j++) {
                if (!targetUsed[j] && guessArray[i] === targetArray[j]) {
                    result[i] = "present";
                    targetUsed[j] = true;
                    break;
                }
            }
        }

        // Count results for Guessmate
        const correctCount = result.filter(r => r === "correct").length;
        const presentCount = result.filter(r => r === "present").length;
        const absentCount = result.filter(r => r === "absent").length;

        // Animate the reveal with sound effects
        for (let i = 0; i < this.wordLength; i++) {
            setTimeout(() => {
                const tile = document.getElementById(`tile-${this.currentRow}-${i}`);
                tile.classList.add("reveal");

                // Play tile flip sound
                soundEffects.playFlipSound(i);

                setTimeout(() => {
                    tile.classList.add(result[i]);
                    this.updateKeyboard(guessArray[i], result[i]);

                    // Play correct sound for green tiles
                    if (result[i] === 'correct') {
                        soundEffects.playCorrectSound();
                    }
                }, 250);

                // Check for win/lose after last tile
                if (i === this.wordLength - 1) {
                    setTimeout(() => {
                        // Notify Guessmate of the result
                        this.guessmate.onGuessResult(correctCount, presentCount, absentCount, this.currentRow + 1);
                        this.checkGameEnd();
                    }, 300);
                }
            }, i * 300);
        }
    }

    updateKeyboard(letter, status) {
        const key = document.getElementById(`key-${letter}`);
        if (!key) return;

        // Priority: correct > present > absent
        if (key.classList.contains("correct")) return;
        if (status === "present" && key.classList.contains("absent")) {
            key.classList.remove("absent");
        }
        if (status === "correct") {
            key.classList.remove("present", "absent");
        }

        key.classList.add(status);
    }

    checkGameEnd() {
        if (this.currentGuess === this.targetWord) {
            this.gameOver = true;
            const sport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
            const messages = this.getSportWinMessages(sport);
            this.showMessage(messages[this.currentRow], "win");
            this.guessmate.onWin(this.currentRow + 1);
            this.showResultModal("win", messages[this.currentRow]);
            // Clean up mobile on game over
            if (this.isMobile) {
                this.cleanupMobile();
            }
        } else if (this.currentRow >= this.maxAttempts - 1) {
            this.gameOver = true;
            this.showMessage(`GAME OVER! The word was ${this.targetWord}`, "lose");
            this.guessmate.onLose(this.targetWord);
            this.showResultModal("lose", this.targetWord);
            // Clean up mobile on game over
            if (this.isMobile) {
                this.cleanupMobile();
            }
        } else {
            // Move to next row
            this.currentRow++;
            this.currentCol = 0;
            this.currentGuess = "";

            // Update mobile tiles for new row
            if (this.isMobile) {
                this.updateTappableTiles();
            }
        }
    }

    // Sport-specific particle configurations
    getSportParticles(sport) {
        const particles = {
            HOCKEY: {
                icons: ['❄', '❄', '❄', '🏒', '🥅'],
                colors: ['#87ceeb', '#ffffff', '#b0e0e6'],
                name: 'snowflakes'
            },
            NFL: {
                icons: ['🏈', '🏈', '🏈', '🎉', '⭐'],
                colors: ['#8b4513', '#ffd700', '#ffffff'],
                name: 'footballs'
            },
            NBA: {
                icons: ['🏀', '🏀', '🏀', '🎉', '⭐'],
                colors: ['#ff6b35', '#ffd700', '#ffffff'],
                name: 'basketballs'
            },
            FA: {
                icons: ['⚽', '⚽', '⚽', '🎉', '🌿'],
                colors: ['#228b22', '#ffffff', '#ffd700'],
                name: 'soccer balls'
            }
        };
        return particles[sport] || particles.HOCKEY;
    }

    createSportParticles() {
        const sport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
        const particleConfig = this.getSportParticles(sport);

        const container = document.createElement("div");
        container.className = "particle-container";
        container.id = "particle-container";

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "sport-particle";

            // Pick a random icon from the sport's set
            const iconIndex = Math.floor(Math.random() * particleConfig.icons.length);
            particle.innerHTML = particleConfig.icons[iconIndex];

            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDuration = (Math.random() * 3 + 2) + "s";
            particle.style.animationDelay = Math.random() * 2 + "s";
            particle.style.fontSize = (Math.random() * 15 + 10) + "px";
            particle.style.opacity = Math.random() * 0.7 + 0.3;

            // Add some rotation for non-snowflake sports
            if (sport !== 'HOCKEY') {
                particle.style.setProperty('--rotation', (Math.random() * 360) + 'deg');
            }

            container.appendChild(particle);
        }

        document.body.appendChild(container);
    }

    removeParticles() {
        const container = document.getElementById("particle-container");
        if (container) {
            container.remove();
        }
    }

    // Get sport-specific win messages (based on number of guesses)
    getSportWinMessages(sport) {
        const messages = {
            HOCKEY: [
                "🏆 HAT TRICK! Genius!",
                "🥅 TOP SHELF! Amazing!",
                "🏒 GREAT SNIPE!",
                "💪 SOLID PLAY!",
                "😅 CLOSE CALL!",
                "🎯 JUST MADE IT!"
            ],
            NFL: [
                "🏆 HAIL MARY! Genius!",
                "🏈 TOUCHDOWN! Amazing!",
                "🎯 PERFECT SPIRAL!",
                "💪 STRONG DRIVE!",
                "😅 CLOSE CALL!",
                "🏟️ JUST MADE IT!"
            ],
            NBA: [
                "🏆 BUZZER BEATER! Genius!",
                "🏀 SLAM DUNK! Amazing!",
                "🎯 NOTHING BUT NET!",
                "💪 GREAT SHOT!",
                "😅 CLOSE CALL!",
                "🏟️ JUST MADE IT!"
            ],
            FA: [
                "🏆 WORLD CLASS! Genius!",
                "⚽ TOP BINS! Amazing!",
                "🎯 SCREAMER!",
                "💪 CLINICAL FINISH!",
                "😅 CLOSE CALL!",
                "🏟️ JUST MADE IT!"
            ]
        };
        return messages[sport] || messages.HOCKEY;
    }

    // Get sport-specific modal configuration
    getSportModalConfig(sport) {
        const configs = {
            HOCKEY: {
                winTitle: 'GOAL!',
                loseTitle: 'Keep Skating!',
                winSubMessage: "You're a hockey word champion!",
                loseSubMessage: 'Every pro started as a rookie. Try again!',
                icon: '🏒',
                accessory: 'hockey-stick',
                buttonIcon: '🏒'
            },
            NFL: {
                winTitle: 'TOUCHDOWN!',
                loseTitle: 'Keep Fighting!',
                winSubMessage: "You're a football word MVP!",
                loseSubMessage: 'Champions bounce back stronger. Try again!',
                icon: '🏈',
                accessory: 'football',
                buttonIcon: '🏈'
            },
            NBA: {
                winTitle: 'SLAM DUNK!',
                loseTitle: 'Keep Balling!',
                winSubMessage: "You're a basketball word all-star!",
                loseSubMessage: 'Even legends miss sometimes. Try again!',
                icon: '🏀',
                accessory: 'basketball',
                buttonIcon: '🏀'
            },
            FA: {
                winTitle: 'GOOOAL!',
                loseTitle: 'Keep Playing!',
                winSubMessage: "You're a football word legend!",
                loseSubMessage: 'The beautiful game rewards persistence!',
                icon: '⚽',
                accessory: 'soccer-ball',
                buttonIcon: '⚽'
            }
        };
        return configs[sport] || configs.HOCKEY;
    }

    // Generate sport-specific character HTML for modal
    generateModalCharacter(sport, type) {
        const accessoryMap = {
            HOCKEY: '<div class="sport-accessory hockey-stick"></div>',
            NFL: '<div class="sport-accessory football"></div>',
            NBA: '<div class="sport-accessory basketball"></div>',
            FA: '<div class="sport-accessory soccer-ball"></div>'
        };

        const accessoryHTML = accessoryMap[sport] || accessoryMap.HOCKEY;

        if (type === "win") {
            return `
                <div class="character-body win sport-${sport.toLowerCase()}">
                    <div class="character-head">
                        <div class="eye left"></div>
                        <div class="eye right"></div>
                        <div class="mouth happy"></div>
                    </div>
                    <div class="character-arms">
                        <div class="arm left raised"></div>
                        <div class="arm right raised"></div>
                    </div>
                    ${accessoryHTML}
                </div>
            `;
        } else {
            return `
                <div class="character-body lose sport-${sport.toLowerCase()}">
                    <div class="character-head">
                        <div class="eye left"></div>
                        <div class="eye right"></div>
                        <div class="mouth determined"></div>
                    </div>
                    <div class="character-arms">
                        <div class="arm left"></div>
                        <div class="arm right fist"></div>
                    </div>
                    ${accessoryHTML}
                </div>
            `;
        }
    }

    showResultModal(type, message) {
        const sport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
        const modalConfig = this.getSportModalConfig(sport);

        // Initialize and play sound effects
        soundEffects.init();

        // Create dramatic entrance effects based on result type
        if (type === "win") {
            // WIN CELEBRATION SEQUENCE
            // 1. Screen flash
            celebrationEffects.createScreenFlash('win');

            // 2. Play triumphant win sound
            setTimeout(() => {
                soundEffects.playWinSound();
            }, 100);

            // 3. Shockwave rings
            setTimeout(() => {
                celebrationEffects.createShockwaveRings(3);
            }, 200);

            // 4. Sport-specific celebration effects
            setTimeout(() => {
                if (sport === 'NFL') {
                    // NFL gets fireworks show!
                    celebrationEffects.createFireworksShow(8);
                } else if (sport === 'HOCKEY') {
                    // Hockey gets ice/snow celebration
                    celebrationEffects.createHockeyCelebration();
                } else if (sport === 'NBA') {
                    // NBA gets slam dunk celebration
                    celebrationEffects.createNBACelebration();
                } else if (sport === 'FA') {
                    // Football/Soccer gets streamer celebration
                    celebrationEffects.createFACelebration();
                } else {
                    // Default confetti
                    celebrationEffects.createConfettiExplosion(sport);
                }
            }, 300);

        } else {
            // LOSE - More subdued but still encouraging
            celebrationEffects.createScreenFlash('lose');

            setTimeout(() => {
                soundEffects.playLoseSound();
            }, 100);

            setTimeout(() => {
                celebrationEffects.createShockwave('lose');
            }, 150);

            // Gentle falling particles for lose state using canvas-confetti
            setTimeout(() => {
                celebrationEffects.createLoseEffect(sport);
            }, 300);
        }

        const modal = document.createElement("div");
        modal.className = "result-modal";
        modal.id = "result-modal";

        const content = document.createElement("div");
        content.className = `result-content ${type} sport-${sport.toLowerCase()}`;

        // Get player name for personalized message
        const playerName = this.playerName || 'Champion';

        // Message with congratulations
        const messageDiv = document.createElement("div");
        messageDiv.className = "result-message";

        if (type === "win") {
            const guessText = this.currentRow === 1 ? '1 guess' : `${this.currentRow} guesses`;
            messageDiv.innerHTML = `
                <div class="result-icon">${modalConfig.icon}</div>
                <h2>${modalConfig.winTitle}</h2>
                <p class="congrats-name">Congratulations, ${playerName}! 🎉</p>
                <p class="result-detail">${message}</p>
                <p class="guess-count">You got it in <strong>${guessText}</strong>!</p>
                <p class="sub-message">${modalConfig.winSubMessage}</p>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="result-icon">💪</div>
                <h2>${modalConfig.loseTitle}</h2>
                <p class="congrats-name">Don't give up, ${playerName}!</p>
                <p class="result-detail">The word was: <strong>${message}</strong></p>
                <p class="sub-message">${modalConfig.loseSubMessage}</p>
            `;
        }
        content.appendChild(messageDiv);

        // Play Again Button
        const playAgainBtn = document.createElement("button");
        playAgainBtn.className = "play-again-btn";
        playAgainBtn.textContent = type === "win" ? `Play Again! ${modalConfig.buttonIcon}` : `Try Again! ${modalConfig.buttonIcon}`;
        playAgainBtn.addEventListener("click", () => {
            soundEffects.playKeySound(); // Click feedback
            this.closeResultModal();
            this.resetGame();
        });
        content.appendChild(playAgainBtn);

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Animate in with slight delay for effects to start
        setTimeout(() => {
            modal.classList.add("show");
        }, 150);
    }

    closeResultModal() {
        const modal = document.getElementById("result-modal");
        if (modal) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.remove();
            }, 400); // Slightly longer for smoother exit
        }
        this.removeParticles();
        celebrationEffects.cleanup();
    }

    showMessage(text, type = "") {
        const message = document.getElementById("message");
        message.textContent = text;
        message.className = "message";
        if (type) {
            message.classList.add(type);
        }

        if (type === "error" || type === "info") {
            setTimeout(() => {
                message.textContent = "";
                message.className = "message";
            }, 2000);
        }
    }

    shakeRow() {
        const row = document.getElementById(`row-${this.currentRow}`);
        row.classList.add("shake");
        setTimeout(() => {
            row.classList.remove("shake");
        }, 500);
    }

    resetGame() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.currentGuess = "";
        this.gameOver = false;
        this.guesses = [];

        // Clear message
        this.showMessage("");

        // Reset board
        for (let i = 0; i < this.maxAttempts; i++) {
            for (let j = 0; j < this.wordLength; j++) {
                const tile = document.getElementById(`tile-${i}-${j}`);
                tile.textContent = "";
                tile.className = "tile";
            }
        }

        // Reset keyboard
        document.querySelectorAll(".key").forEach(key => {
            key.classList.remove("correct", "present", "absent");
        });

        // Select new word
        this.selectNewWord();

        // Notify Guessmate
        this.guessmate.onNewGame();

        // Re-setup mobile tiles
        if (this.isMobile) {
            this.updateTappableTiles();
        }
    }
}

// Theme Controller
class ThemeController {
    constructor() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.init();
        this.bindEvents();
    }

    init() {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('yinzordle-theme');
        if (savedTheme) {
            this.setTheme(savedTheme, false);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark', false);
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('yinzordle-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light', true);
            }
        });
    }

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    setTheme(theme, animate = true) {
        if (animate) {
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        }

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('yinzordle-theme', theme);
    }
}

// Help Modal Controller
class HelpModal {
    constructor() {
        this.modal = document.getElementById('help-modal');
        this.openBtn = document.getElementById('help-btn');
        this.closeBtn = document.getElementById('help-close');
        this.tutorialBtn = document.getElementById('view-tutorial-btn');
        this.bindEvents();
    }

    bindEvents() {
        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });
        }
        // View Tutorial button - opens full onboarding
        if (this.tutorialBtn) {
            this.tutorialBtn.addEventListener('click', () => {
                this.close();
                // Trigger onboarding from game instance
                if (window.gameInstance && window.gameInstance.showOnboarding) {
                    window.gameInstance.showOnboarding();
                }
            });
        }
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
                this.close();
            }
        });
    }

    open() {
        if (this.modal) {
            this.modal.classList.add('show');
        }
    }

    close() {
        if (this.modal) {
            this.modal.classList.remove('show');
        }
    }
}

// Start the game when page loads
document.addEventListener("DOMContentLoaded", () => {
    // Load saved sport from landing page
    const savedSport = localStorage.getItem('yinzordle_sport');
    if (savedSport && typeof switchSport === 'function') {
        switchSport(savedSport);
        // Update sport selector button to show active state
        const sportButtons = document.querySelectorAll('.sport-btn');
        sportButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.sport === savedSport) {
                btn.classList.add('active');
            }
        });
        // Update subtitle
        const sportConfig = typeof SPORT_CONFIG !== 'undefined' ? SPORT_CONFIG[savedSport] : null;
        if (sportConfig) {
            const subtitle = document.querySelector('.subtitle');
            if (subtitle) {
                subtitle.textContent = `Guess the 5-letter ${sportConfig.name} word!`;
            }
        }
    }

    window.themeController = new ThemeController();
    window.gameInstance = new HockeyWordle();
    new HelpModal();
});

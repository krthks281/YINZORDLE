/**
 * Mascot Animation System
 * Supports both Lottie animations and SVG fallback mascots
 */

class MascotAnimator {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentMascot = null;
        this.currentSport = null;
        this.animationState = 'idle';
        this.animations = {};
        this.isLoaded = false;
        this.useLottie = false; // Use SVG mascots instead of Lottie
        this.lottiePlayer = null;

        // Lottie animation URLs - curated free animations from LottieFiles
        this.lottieAnimations = {
            // Main character animations (with multiple emotion states)
            character: {
                idle: 'https://assets-v2.lottiefiles.com/a/7f1f4d06-1180-11ee-a95d-f72567547c7a/9vXnIhsa46.lottie',
                talking: 'https://assets-v2.lottiefiles.com/a/7f1f4d06-1180-11ee-a95d-f72567547c7a/9vXnIhsa46.lottie'
            },
            // Sport-specific ball/prop animations for visual flair
            props: {
                HOCKEY: null, // Will use SVG
                NFL: null,
                NBA: 'https://assets-v2.lottiefiles.com/a/a8ea2006-1172-11ee-93ce-5ff720483551/kx1v76eSCb.lottie',
                FA: 'https://assets-v2.lottiefiles.com/a/593e81d0-1183-11ee-b207-7fa51c7db46f/zc77zAqA5S.lottie'
            }
        };

        // SVG mascot fallback paths
        this.svgMascotPaths = {
            HOCKEY: 'mascots/hockey-mascot.svg',
            NFL: 'mascots/football-mascot.svg',
            NBA: 'mascots/basketball-mascot.svg',
            FA: 'mascots/soccer-mascot.svg'
        };

        // Animation timing configs per state
        this.stateConfigs = {
            idle: {
                bodyBounce: { duration: 2000, intensity: 2 },
                blink: { interval: 3000, duration: 150 },
                breathe: { duration: 3000, intensity: 1 }
            },
            thinking: {
                headTilt: { angle: 8, duration: 800 },
                eyesLookUp: { duration: 500 },
                handToChin: { duration: 600 }
            },
            excited: {
                jump: { height: 15, duration: 400 },
                armsUp: { duration: 300 },
                bounce: { duration: 200, count: 3 }
            },
            encouraging: {
                nod: { angle: 10, duration: 400, count: 2 },
                thumbsUp: { duration: 500 },
                smile: { duration: 300 }
            },
            worried: {
                shake: { intensity: 3, duration: 100, count: 4 },
                eyebrowsFurrow: { duration: 300 },
                mouthFrown: { duration: 300 }
            },
            sad: {
                slump: { intensity: 5, duration: 800 },
                headDrop: { angle: 15, duration: 600 },
                mouthSad: { duration: 400 }
            },
            celebrating: {
                jump: { height: 20, duration: 300 },
                spin: { angle: 360, duration: 800 },
                armsWave: { duration: 400, count: 3 }
            }
        };
    }

    /**
     * Load mascot for a specific sport
     */
    async loadMascot(sport) {
        if (!this.container) return;

        this.currentSport = sport;

        // Always use SVG mascots
        await this.loadSVGMascot(sport);
    }

    /**
     * Load Lottie-based mascot
     */
    async loadLottieMascot(sport) {
        // Clear existing content
        this.container.innerHTML = '';

        // Create Lottie player element
        const player = document.createElement('lottie-player');
        player.setAttribute('src', this.lottieAnimations.character.idle);
        player.setAttribute('background', 'transparent');
        player.setAttribute('speed', '1');
        player.setAttribute('loop', '');
        player.setAttribute('autoplay', '');
        player.style.width = '100%';
        player.style.height = '100%';
        player.classList.add('mascot-lottie-player');

        // Add sport-specific styling
        player.classList.add(`mascot-${sport.toLowerCase()}`);

        this.container.appendChild(player);
        this.lottiePlayer = player;
        this.isLoaded = true;

        // Add a sport indicator badge
        this.addSportBadge(sport);
    }

    /**
     * Add sport indicator badge overlay
     */
    addSportBadge(sport) {
        const badge = document.createElement('div');
        badge.className = 'mascot-sport-badge';

        const icons = {
            HOCKEY: '🏒',
            NFL: '🏈',
            NBA: '🏀',
            FA: '⚽'
        };

        badge.innerHTML = icons[sport] || '🎮';
        badge.title = sport;
        this.container.appendChild(badge);
    }

    /**
     * Load SVG mascot (fallback)
     */
    async loadSVGMascot(sport) {
        const path = this.svgMascotPaths[sport] || this.svgMascotPaths.HOCKEY;

        try {
            const response = await fetch(path);
            const svgText = await response.text();

            this.container.innerHTML = svgText;
            this.currentMascot = this.container.querySelector('svg');
            this.isLoaded = true;

            // Cache SVG element references
            this.cacheElements();

            // Start idle animation
            this.setState('idle');
        } catch (error) {
            console.error('Failed to load SVG mascot:', error);
            this.isLoaded = false;
        }
    }

    /**
     * Cache references to animatable SVG elements
     */
    cacheElements() {
        if (!this.currentMascot) return;

        this.elements = {
            mascot: this.currentMascot.querySelector('#mascot'),
            head: this.currentMascot.querySelector('#head'),
            body: this.currentMascot.querySelector('#body'),
            face: this.currentMascot.querySelector('#face'),
            eyes: this.currentMascot.querySelector('#eyes'),
            eyeLeft: this.currentMascot.querySelector('#eye-left'),
            eyeRight: this.currentMascot.querySelector('#eye-right'),
            pupilLeft: this.currentMascot.querySelector('#pupil-left'),
            pupilRight: this.currentMascot.querySelector('#pupil-right'),
            eyebrows: this.currentMascot.querySelector('#eyebrows'),
            eyebrowLeft: this.currentMascot.querySelector('#eyebrow-left'),
            eyebrowRight: this.currentMascot.querySelector('#eyebrow-right'),
            mouth: this.currentMascot.querySelector('#mouth'),
            mouthShape: this.currentMascot.querySelector('#mouth-shape'),
            cheeks: this.currentMascot.querySelector('#cheeks'),
            armLeft: this.currentMascot.querySelector('#arm-left'),
            armRight: this.currentMascot.querySelector('#arm-right'),
            legs: this.currentMascot.querySelector('#legs'),
            ball: this.currentMascot.querySelector('#ball'),
            stick: this.currentMascot.querySelector('#stick')
        };
    }

    /**
     * Set the animation state
     */
    setState(state) {
        if (this.animationState === state) return;

        // For Lottie player, adjust speed/direction based on emotion
        if (this.lottiePlayer) {
            this.setLottieState(state);
            this.animationState = state;
            return;
        }

        // For SVG mascot
        this.stopAllAnimations();
        this.animationState = state;

        switch (state) {
            case 'idle':
                this.playIdleAnimation();
                break;
            case 'thinking':
                this.playThinkingAnimation();
                break;
            case 'excited':
                this.playExcitedAnimation();
                break;
            case 'encouraging':
                this.playEncouragingAnimation();
                break;
            case 'worried':
                this.playWorriedAnimation();
                break;
            case 'sad':
                this.playSadAnimation();
                break;
            case 'celebrating':
                this.playCelebratingAnimation();
                break;
            case 'talking':
                this.playTalkingAnimation();
                break;
        }
    }

    /**
     * Set Lottie animation state via CSS and speed adjustments
     */
    setLottieState(state) {
        if (!this.lottiePlayer) return;

        const wrapper = this.container;

        // Remove all state classes
        wrapper.classList.remove(
            'mascot-idle', 'mascot-thinking', 'mascot-excited',
            'mascot-encouraging', 'mascot-worried', 'mascot-sad',
            'mascot-celebrating', 'mascot-talking'
        );

        // Add new state class
        wrapper.classList.add(`mascot-${state}`);

        // Adjust animation speed based on emotion
        const speeds = {
            idle: 1,
            thinking: 0.5,
            excited: 2,
            encouraging: 1.2,
            worried: 1.5,
            sad: 0.6,
            celebrating: 2.5,
            talking: 1.5
        };

        this.lottiePlayer.setSpeed(speeds[state] || 1);

        // Apply CSS transform effects
        if (typeof anime !== 'undefined') {
            this.applyLottieEmotionEffect(state);
        }
    }

    /**
     * Apply CSS/Anime.js effects to Lottie player based on emotion
     */
    applyLottieEmotionEffect(state) {
        if (!this.lottiePlayer || typeof anime === 'undefined') return;

        // Reset any existing animations
        anime.remove(this.lottiePlayer);

        switch (state) {
            case 'excited':
            case 'celebrating':
                anime({
                    targets: this.lottiePlayer,
                    translateY: [0, -10, 0],
                    scale: [1, 1.1, 1],
                    duration: 400,
                    loop: 3,
                    easing: 'easeOutQuad'
                });
                break;

            case 'sad':
                anime({
                    targets: this.lottiePlayer,
                    translateY: 5,
                    scale: 0.95,
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                break;

            case 'worried':
                anime({
                    targets: this.lottiePlayer,
                    translateX: [-3, 3, -3, 3, 0],
                    duration: 400,
                    easing: 'easeInOutQuad'
                });
                break;

            case 'thinking':
                anime({
                    targets: this.lottiePlayer,
                    rotate: 5,
                    duration: 500,
                    easing: 'easeOutQuad'
                });
                break;

            case 'encouraging':
                anime({
                    targets: this.lottiePlayer,
                    rotate: [0, 5, -5, 0],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
                break;

            case 'idle':
            default:
                anime({
                    targets: this.lottiePlayer,
                    translateY: [0, -2, 0],
                    scale: 1,
                    rotate: 0,
                    duration: 2000,
                    loop: true,
                    easing: 'easeInOutSine'
                });
                break;
        }
    }

    /**
     * Stop all running animations
     */
    stopAllAnimations() {
        Object.values(this.animations).forEach(anim => {
            if (anim && typeof anim.pause === 'function') {
                anim.pause();
            }
        });
        this.animations = {};

        if (this.elements) {
            Object.values(this.elements).forEach(el => {
                if (el) {
                    el.style.transform = '';
                }
            });
        }
    }

    /**
     * Idle animation - subtle breathing and occasional blinks
     */
    playIdleAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.idle;

        if (this.elements.body) {
            this.animations.breathe = anime({
                targets: this.elements.body,
                translateY: [-config.breathe.intensity, config.breathe.intensity],
                duration: config.breathe.duration,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        }

        if (this.elements.head) {
            this.animations.headFloat = anime({
                targets: this.elements.head,
                translateY: [-1, 1],
                rotate: [-1, 1],
                duration: 2500,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        }

        this.startBlinking();
    }

    /**
     * Blinking animation
     */
    startBlinking() {
        if (!this.elements.eyeLeft || !this.elements.eyeRight) return;

        const blink = () => {
            if (this.animationState !== 'idle' && this.animationState !== 'thinking') return;

            anime({
                targets: [this.elements.eyeLeft, this.elements.eyeRight],
                scaleY: [1, 0.1, 1],
                duration: 150,
                easing: 'easeInOutQuad',
                complete: () => {
                    const nextBlink = 2000 + Math.random() * 3000;
                    setTimeout(blink, nextBlink);
                }
            });
        };

        setTimeout(blink, 1000 + Math.random() * 2000);
    }

    /**
     * Thinking animation
     */
    playThinkingAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.thinking;

        if (this.elements.head) {
            this.animations.headTilt = anime({
                targets: this.elements.head,
                rotate: config.headTilt.angle,
                duration: config.headTilt.duration,
                easing: 'easeOutBack'
            });
        }

        if (this.elements.pupilLeft && this.elements.pupilRight) {
            this.animations.eyesLook = anime({
                targets: [this.elements.pupilLeft, this.elements.pupilRight],
                translateY: -2,
                duration: config.eyesLookUp.duration,
                easing: 'easeOutQuad'
            });
        }

        if (this.elements.eyebrowLeft && this.elements.eyebrowRight) {
            this.animations.eyebrowsRaise = anime({
                targets: [this.elements.eyebrowLeft, this.elements.eyebrowRight],
                translateY: -2,
                duration: 400,
                easing: 'easeOutQuad'
            });
        }

        this.startBlinking();
    }

    /**
     * Excited animation
     */
    playExcitedAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.excited;

        if (this.elements.mascot) {
            this.animations.jump = anime({
                targets: this.elements.mascot,
                translateY: [
                    { value: -config.jump.height, duration: config.jump.duration / 2, easing: 'easeOutQuad' },
                    { value: 0, duration: config.jump.duration / 2, easing: 'easeInQuad' }
                ],
                loop: 3
            });
        }

        if (this.elements.armLeft) {
            this.animations.armLeftUp = anime({
                targets: this.elements.armLeft,
                rotate: -30,
                translateY: -10,
                duration: config.armsUp.duration,
                easing: 'easeOutBack'
            });
        }

        if (this.elements.armRight) {
            this.animations.armRightUp = anime({
                targets: this.elements.armRight,
                rotate: 30,
                translateY: -10,
                duration: config.armsUp.duration,
                easing: 'easeOutBack'
            });
        }

        this.setMouthExpression('bigSmile');

        if (this.elements.cheeks) {
            anime({
                targets: this.elements.cheeks,
                opacity: 0.6,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }

    /**
     * Encouraging animation
     */
    playEncouragingAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.encouraging;

        if (this.elements.head) {
            this.animations.nod = anime({
                targets: this.elements.head,
                rotate: [
                    { value: config.nod.angle, duration: config.nod.duration / 2 },
                    { value: -config.nod.angle / 2, duration: config.nod.duration / 2 },
                    { value: 0, duration: config.nod.duration / 2 }
                ],
                easing: 'easeInOutQuad',
                loop: config.nod.count
            });
        }

        if (this.elements.armRight) {
            this.animations.thumbsUp = anime({
                targets: this.elements.armRight,
                rotate: -20,
                translateY: -8,
                duration: config.thumbsUp.duration,
                easing: 'easeOutBack'
            });
        }

        this.setMouthExpression('smile');
    }

    /**
     * Worried animation
     */
    playWorriedAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.worried;

        if (this.elements.head) {
            this.animations.shake = anime({
                targets: this.elements.head,
                translateX: [
                    { value: -config.shake.intensity, duration: config.shake.duration },
                    { value: config.shake.intensity, duration: config.shake.duration },
                    { value: 0, duration: config.shake.duration }
                ],
                easing: 'easeInOutQuad',
                loop: config.shake.count
            });
        }

        if (this.elements.eyebrowLeft) {
            anime({
                targets: this.elements.eyebrowLeft,
                rotate: 10,
                translateY: 2,
                duration: config.eyebrowsFurrow.duration,
                easing: 'easeOutQuad'
            });
        }

        if (this.elements.eyebrowRight) {
            anime({
                targets: this.elements.eyebrowRight,
                rotate: -10,
                translateY: 2,
                duration: config.eyebrowsFurrow.duration,
                easing: 'easeOutQuad'
            });
        }

        this.setMouthExpression('worried');
    }

    /**
     * Sad animation
     */
    playSadAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.sad;

        if (this.elements.body) {
            this.animations.slump = anime({
                targets: this.elements.body,
                translateY: config.slump.intensity,
                duration: config.slump.duration,
                easing: 'easeOutQuad'
            });
        }

        if (this.elements.head) {
            this.animations.headDrop = anime({
                targets: this.elements.head,
                rotate: config.headDrop.angle,
                translateY: 5,
                duration: config.headDrop.duration,
                easing: 'easeOutQuad'
            });
        }

        if (this.elements.eyebrowLeft) {
            anime({
                targets: this.elements.eyebrowLeft,
                rotate: -15,
                duration: 400,
                easing: 'easeOutQuad'
            });
        }

        if (this.elements.eyebrowRight) {
            anime({
                targets: this.elements.eyebrowRight,
                rotate: 15,
                duration: 400,
                easing: 'easeOutQuad'
            });
        }

        this.setMouthExpression('sad');
    }

    /**
     * Celebrating animation
     */
    playCelebratingAnimation() {
        if (!this.elements || !window.anime) return;

        const config = this.stateConfigs.celebrating;

        if (this.elements.mascot) {
            this.animations.celebrateJump = anime({
                targets: this.elements.mascot,
                translateY: [
                    { value: -config.jump.height, duration: config.jump.duration, easing: 'easeOutQuad' },
                    { value: 0, duration: config.jump.duration, easing: 'easeInQuad' }
                ],
                loop: true
            });
        }

        if (this.elements.armLeft) {
            this.animations.armLeftWave = anime({
                targets: this.elements.armLeft,
                rotate: [-40, -20],
                duration: config.armsWave.duration,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutQuad'
            });
        }

        if (this.elements.armRight) {
            this.animations.armRightWave = anime({
                targets: this.elements.armRight,
                rotate: [40, 20],
                duration: config.armsWave.duration,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutQuad'
            });
        }

        this.setMouthExpression('bigSmile');

        if (this.elements.cheeks) {
            anime({
                targets: this.elements.cheeks,
                opacity: 0.8,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }

    /**
     * Talking animation
     */
    playTalkingAnimation() {
        if (!this.elements || !window.anime) return;

        if (this.elements.mouthShape) {
            this.animations.talking = anime({
                targets: this.elements.mouthShape,
                scaleY: [1, 1.3, 0.8, 1],
                duration: 200,
                loop: true,
                easing: 'easeInOutQuad'
            });
        }

        if (this.elements.head) {
            this.animations.talkingHead = anime({
                targets: this.elements.head,
                rotate: [-2, 2],
                translateY: [-1, 1],
                duration: 400,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutQuad'
            });
        }
    }

    /**
     * Set mouth expression
     */
    setMouthExpression(expression) {
        if (!this.elements.mouthShape) return;

        const mouthPaths = {
            neutral: 'M45 48 Q50 50 55 48',
            smile: 'M45 46 Q50 52 55 46',
            bigSmile: 'M43 44 Q50 54 57 44',
            sad: 'M45 50 Q50 46 55 50',
            worried: 'M45 49 Q50 47 55 49',
            open: 'M45 46 Q50 54 55 46'
        };

        if (mouthPaths[expression]) {
            anime({
                targets: this.elements.mouthShape,
                d: mouthPaths[expression],
                duration: 200,
                easing: 'easeOutQuad'
            });
        }
    }

    /**
     * Look at a specific direction
     */
    lookAt(direction) {
        if (!this.elements.pupilLeft || !this.elements.pupilRight) return;

        const offsets = {
            left: { x: -2, y: 0 },
            right: { x: 2, y: 0 },
            up: { x: 0, y: -2 },
            down: { x: 0, y: 2 },
            center: { x: 0, y: 0 }
        };

        const offset = offsets[direction] || offsets.center;

        anime({
            targets: [this.elements.pupilLeft, this.elements.pupilRight],
            translateX: offset.x,
            translateY: offset.y,
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    /**
     * Trigger a quick emotion reaction
     */
    react(emotion, duration = 2000) {
        this.setState(emotion);

        setTimeout(() => {
            if (this.animationState === emotion) {
                this.setState('idle');
            }
        }, duration);
    }

    /**
     * Start talking animation
     */
    startTalking() {
        this.setState('talking');
    }

    /**
     * Stop talking animation
     */
    stopTalking() {
        this.setState('idle');
    }
}

// Export for use in game.js
window.MascotAnimator = MascotAnimator;

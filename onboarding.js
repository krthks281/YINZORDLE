/**
 * OnboardingManager - Customizable user onboarding for YINZORDLE
 * Features Guessmate mascot integration with speech bubbles and emotions
 */

class OnboardingManager {
    constructor(options = {}) {
        // Configuration
        this.config = {
            steps: options.steps || this.getDefaultSteps(),
            mascotPath: options.mascotPath || './mascots/',
            allowSkip: options.allowSkip !== false,
            showProgress: options.showProgress !== false,
            typingSpeed: options.typingSpeed || 30,
            onComplete: options.onComplete || (() => {}),
            onSkip: options.onSkip || (() => {}),
            onStepChange: options.onStepChange || (() => {})
        };

        // State
        this.currentStep = 0;
        this.isVisible = false;
        this.isAnimating = false;
        this.typingTimeout = null;

        // User data
        this.playerName = localStorage.getItem('yinzordle_playerName') || 'Player';
        this.sport = localStorage.getItem('yinzordle_sport') || 'HOCKEY';

        // DOM Elements
        this.overlay = null;
        this.container = null;
        this.mascotSvg = null;
        this.speechBubble = null;
        this.titleEl = null;
        this.bodyEl = null;
        this.dotsContainer = null;
        this.actionsContainer = null;
        this.backBtn = null;

        // Mascot animator reference (will be set externally if available)
        this.mascotAnimator = options.mascotAnimator || null;

        // Bind methods
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    /**
     * Get sport-specific icon
     */
    getSportIcon() {
        const icons = {
            'HOCKEY': '🏒',
            'NFL': '🏈',
            'NBA': '🏀',
            'FA': '⚽'
        };
        return icons[this.sport] || '🎮';
    }

    /**
     * Get sport display name
     */
    getSportName() {
        const names = {
            'HOCKEY': 'NHL',
            'NFL': 'NFL',
            'NBA': 'NBA',
            'FA': 'Soccer'
        };
        return names[this.sport] || 'Sports';
    }

    /**
     * Get mascot type based on sport
     */
    getMascotType() {
        const mascots = {
            'HOCKEY': 'hockey',
            'NFL': 'football',
            'NBA': 'basketball',
            'FA': 'soccer'
        };
        return mascots[this.sport] || 'default';
    }

    /**
     * Replace template variables in text
     */
    parseTemplate(text) {
        if (!text) return '';
        return text
            .replace(/{playerName}/g, this.playerName)
            .replace(/{sport}/g, this.getSportName())
            .replace(/{sportIcon}/g, this.getSportIcon());
    }

    /**
     * Default onboarding steps
     */
    getDefaultSteps() {
        return [
            {
                id: 'welcome',
                title: 'Welcome to YINZORDLE!',
                content: `Hey <strong>{playerName}</strong>! Ready to test your {sport} knowledge?`,
                mascotEmotion: 'excited',
                mascotMessage: `Let me show you how to play! ${this.getSportIcon()}`,
                visual: 'sport-icon'
            },
            {
                id: 'how-to-guess',
                title: 'Guess the Word',
                content: 'You have <strong>6 tries</strong> to guess a 5-letter {sport} word. Type your guess using the keyboard.',
                mascotEmotion: 'encouraging',
                mascotMessage: 'Type your guess and press Enter!',
                visual: 'game-board'
            },
            {
                id: 'color-hints',
                title: 'Color Clues',
                content: 'After each guess, the tiles change color to show how close you are:',
                mascotEmotion: 'thinking',
                mascotMessage: 'Watch the colors for hints!',
                visual: 'color-demo'
            },
            {
                id: 'ready',
                title: "You're Ready!",
                content: `Good luck, <strong>{playerName}</strong>! Show me your {sport} expertise!`,
                mascotEmotion: 'celebrating',
                mascotMessage: "Let's do this! 🎉",
                visual: 'ready'
            }
        ];
    }

    /**
     * Create the onboarding DOM structure
     */
    createDOM() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'onboarding-overlay';
        this.overlay.className = 'onboarding-overlay';

        // Create container
        this.container = document.createElement('div');
        this.container.className = 'onboarding-container';

        // Back button
        this.backBtn = document.createElement('button');
        this.backBtn.className = 'back-btn';
        this.backBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        `;
        this.backBtn.addEventListener('click', () => this.prevStep());

        // Mascot section
        const mascotSection = document.createElement('div');
        mascotSection.className = 'onboarding-mascot';

        this.mascotSvg = document.createElement('div');
        this.mascotSvg.className = 'onboarding-mascot-svg';

        this.speechBubble = document.createElement('div');
        this.speechBubble.className = 'onboarding-speech';

        mascotSection.appendChild(this.mascotSvg);
        mascotSection.appendChild(this.speechBubble);

        // Content section
        const contentSection = document.createElement('div');
        contentSection.className = 'onboarding-content';

        this.titleEl = document.createElement('h2');
        this.titleEl.className = 'onboarding-title';

        this.bodyEl = document.createElement('div');
        this.bodyEl.className = 'onboarding-body';

        contentSection.appendChild(this.titleEl);
        contentSection.appendChild(this.bodyEl);

        // Footer section
        const footer = document.createElement('div');
        footer.className = 'onboarding-footer';

        // Progress dots
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.className = 'step-dots';

        // Actions
        this.actionsContainer = document.createElement('div');
        this.actionsContainer.className = 'onboarding-actions';

        footer.appendChild(this.dotsContainer);
        footer.appendChild(this.actionsContainer);

        // Keyboard hint
        const keyboardHint = document.createElement('div');
        keyboardHint.className = 'keyboard-hint';
        keyboardHint.textContent = 'Press → or Enter to continue';
        footer.appendChild(keyboardHint);

        // Assemble
        this.container.appendChild(this.backBtn);
        this.container.appendChild(mascotSection);
        this.container.appendChild(contentSection);
        this.container.appendChild(footer);
        this.overlay.appendChild(this.container);

        // Add to document
        document.body.appendChild(this.overlay);

        // Click outside to skip (optional)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay && this.config.allowSkip) {
                // Don't skip on overlay click - could be accidental
            }
        });
    }

    /**
     * Load mascot SVG
     */
    async loadMascot() {
        const mascotType = this.getMascotType();
        const svgPath = `${this.config.mascotPath}${mascotType}.svg`;

        try {
            const response = await fetch(svgPath);
            if (response.ok) {
                const svgContent = await response.text();
                this.mascotSvg.innerHTML = svgContent;
            } else {
                // Fallback to default
                const defaultResponse = await fetch(`${this.config.mascotPath}default.svg`);
                if (defaultResponse.ok) {
                    this.mascotSvg.innerHTML = await defaultResponse.text();
                }
            }
        } catch (error) {
            console.warn('Could not load mascot SVG:', error);
            // Show sport emoji as fallback
            this.mascotSvg.innerHTML = `<div style="font-size: 80px; text-align: center;">${this.getSportIcon()}</div>`;
        }
    }

    /**
     * Render progress dots
     */
    renderDots() {
        if (!this.config.showProgress) {
            this.dotsContainer.style.display = 'none';
            return;
        }

        this.dotsContainer.innerHTML = '';
        this.config.steps.forEach((step, index) => {
            const dot = document.createElement('div');
            dot.className = 'step-dot';
            if (index === this.currentStep) {
                dot.classList.add('active');
            } else if (index < this.currentStep) {
                dot.classList.add('completed');
            }
            this.dotsContainer.appendChild(dot);
        });
    }

    /**
     * Render action buttons
     */
    renderActions() {
        this.actionsContainer.innerHTML = '';
        const isLastStep = this.currentStep === this.config.steps.length - 1;

        // Skip button (not on last step)
        if (this.config.allowSkip && !isLastStep) {
            const skipBtn = document.createElement('button');
            skipBtn.className = 'onboarding-btn skip-btn';
            skipBtn.textContent = 'Skip';
            skipBtn.addEventListener('click', () => this.skip());
            this.actionsContainer.appendChild(skipBtn);
        }

        // Next/Start button
        const nextBtn = document.createElement('button');
        nextBtn.className = `onboarding-btn ${isLastStep ? 'next-btn start-btn' : 'next-btn'}`;
        nextBtn.textContent = isLastStep ? "Let's Play!" : 'Next';
        nextBtn.addEventListener('click', () => {
            if (isLastStep) {
                this.complete();
            } else {
                this.nextStep();
            }
        });
        this.actionsContainer.appendChild(nextBtn);
    }

    /**
     * Render visual content for step
     */
    renderVisual(step) {
        let visualHTML = '';

        switch (step.visual) {
            case 'sport-icon':
                visualHTML = `<div class="sport-icon-large">${this.getSportIcon()}</div>`;
                break;

            case 'game-board':
                visualHTML = `
                    <div class="game-board-demo">
                        <div class="demo-row">
                            <div class="demo-tile">S</div>
                            <div class="demo-tile">C</div>
                            <div class="demo-tile">O</div>
                            <div class="demo-tile">R</div>
                            <div class="demo-tile">E</div>
                        </div>
                        <div class="demo-row">
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                        </div>
                        <div class="demo-row">
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                            <div class="demo-tile"></div>
                        </div>
                    </div>
                `;
                break;

            case 'color-demo':
                visualHTML = `
                    <div class="demo-tiles" id="color-demo-tiles">
                        <div class="demo-tile" data-reveal="correct">P</div>
                        <div class="demo-tile" data-reveal="present">U</div>
                        <div class="demo-tile" data-reveal="absent">C</div>
                        <div class="demo-tile" data-reveal="correct">K</div>
                        <div class="demo-tile" data-reveal="absent">S</div>
                    </div>
                    <div class="color-legend">
                        <div class="legend-item">
                            <div class="legend-color correct"></div>
                            <span>Green = Correct letter, correct spot</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color present"></div>
                            <span>Yellow = Correct letter, wrong spot</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color absent"></div>
                            <span>Gray = Letter not in word</span>
                        </div>
                    </div>
                `;
                break;

            case 'ready':
                visualHTML = `
                    <div class="ready-celebration">
                        <div class="sport-icon-large">${this.getSportIcon()}</div>
                    </div>
                `;
                break;

            default:
                if (step.customVisual) {
                    visualHTML = step.customVisual;
                }
        }

        return visualHTML;
    }

    /**
     * Animate color demo tiles
     */
    animateColorDemo() {
        const tiles = document.querySelectorAll('#color-demo-tiles .demo-tile');
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip');
                setTimeout(() => {
                    const revealClass = tile.dataset.reveal;
                    if (revealClass) {
                        tile.classList.add(revealClass);
                    }
                }, 250);
            }, index * 200);
        });
    }

    /**
     * Type out speech bubble message with animation
     */
    typeSpeech(message) {
        // Clear any existing typing
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.speechBubble.textContent = '';
        this.speechBubble.classList.add('show');

        let charIndex = 0;
        const parsed = this.parseTemplate(message);

        const typeChar = () => {
            if (charIndex < parsed.length) {
                this.speechBubble.textContent = parsed.substring(0, charIndex + 1);
                charIndex++;
                this.typingTimeout = setTimeout(typeChar, this.config.typingSpeed);
            }
        };

        typeChar();
    }

    /**
     * Render current step
     */
    renderStep() {
        const step = this.config.steps[this.currentStep];
        if (!step) return;

        // Update back button visibility
        if (this.currentStep > 0) {
            this.backBtn.classList.add('show');
        } else {
            this.backBtn.classList.remove('show');
        }

        // Update title
        this.titleEl.textContent = this.parseTemplate(step.title);

        // Update body content
        const visual = this.renderVisual(step);
        const contentHTML = step.content ? `<p>${this.parseTemplate(step.content)}</p>` : '';
        this.bodyEl.innerHTML = contentHTML + visual;

        // Render dots and actions
        this.renderDots();
        this.renderActions();

        // Speech bubble
        if (step.mascotMessage) {
            setTimeout(() => {
                this.typeSpeech(step.mascotMessage);
            }, 300);
        } else {
            this.speechBubble.classList.remove('show');
        }

        // Trigger mascot emotion if animator available
        if (this.mascotAnimator && step.mascotEmotion) {
            this.mascotAnimator.setState(step.mascotEmotion);
        }

        // Special animations
        if (step.visual === 'color-demo') {
            setTimeout(() => this.animateColorDemo(), 500);
        }

        // Callback
        this.config.onStepChange(this.currentStep, step);
    }

    /**
     * Navigate to next step
     */
    nextStep() {
        if (this.isAnimating) return;
        if (this.currentStep >= this.config.steps.length - 1) {
            this.complete();
            return;
        }

        this.isAnimating = true;
        this.currentStep++;
        this.renderStep();

        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }

    /**
     * Navigate to previous step
     */
    prevStep() {
        if (this.isAnimating) return;
        if (this.currentStep <= 0) return;

        this.isAnimating = true;
        this.currentStep--;
        this.renderStep();

        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }

    /**
     * Go to specific step
     */
    goToStep(index) {
        if (this.isAnimating) return;
        if (index < 0 || index >= this.config.steps.length) return;

        this.isAnimating = true;
        this.currentStep = index;
        this.renderStep();

        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }

    /**
     * Skip onboarding
     */
    skip() {
        this.markComplete();
        this.hide();
        this.config.onSkip();
        this.config.onComplete();
    }

    /**
     * Complete onboarding
     */
    complete() {
        this.markComplete();
        this.hide();
        this.config.onComplete();
    }

    /**
     * Mark onboarding as completed in storage
     */
    markComplete() {
        localStorage.setItem('yinzordle_onboarding_complete', 'true');
    }

    /**
     * Check if onboarding has been completed
     */
    static isComplete() {
        return localStorage.getItem('yinzordle_onboarding_complete') === 'true';
    }

    /**
     * Reset onboarding (for testing)
     */
    static reset() {
        localStorage.removeItem('yinzordle_onboarding_complete');
    }

    /**
     * Keyboard navigation
     */
    handleKeydown(e) {
        if (!this.isVisible) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (this.currentStep === this.config.steps.length - 1) {
                    this.complete();
                } else {
                    this.nextStep();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.prevStep();
                break;
            case 'Escape':
                if (this.config.allowSkip) {
                    this.skip();
                }
                break;
        }
    }

    /**
     * Show onboarding
     */
    async show() {
        if (this.isVisible) return;

        // Create DOM if not exists
        if (!this.overlay) {
            this.createDOM();
        }

        // Load mascot
        await this.loadMascot();

        // Reset to first step
        this.currentStep = 0;
        this.renderStep();

        // Show overlay
        requestAnimationFrame(() => {
            this.overlay.classList.add('show');
        });

        this.isVisible = true;

        // Add keyboard listener
        document.addEventListener('keydown', this.handleKeydown);
    }

    /**
     * Hide onboarding
     */
    hide() {
        if (!this.isVisible) return;

        this.overlay.classList.remove('show');
        this.isVisible = false;

        // Remove keyboard listener
        document.removeEventListener('keydown', this.handleKeydown);

        // Clean up typing
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
    }

    /**
     * Destroy onboarding
     */
    destroy() {
        this.hide();
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        this.overlay = null;
    }
}

// Export for use
window.OnboardingManager = OnboardingManager;

// Hockey Wordle Game Logic

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
                    <div class="setting-row">
                        <label>Show Character</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="setting-character-enabled" ${this.settings.modal.characterEnabled ? 'checked' : ''}>
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
        this.settings.modal.characterEnabled = this.panel.querySelector('#setting-character-enabled').checked;

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
    }

    // 3D Speech bubble pop animation
    showSpeechBubble(speechBubble) {
        // Kill any existing animations
        if (this.currentAnimation) {
            this.currentAnimation.pause();
        }

        const cloudShape = speechBubble.querySelector('.cloud-shape');
        const bubbles = speechBubble.querySelectorAll('.bubble');
        const textContainer = speechBubble.querySelector('.speech-text-container');

        // Reset initial state
        anime.set(speechBubble, { opacity: 0 });
        anime.set(cloudShape, {
            scale: 0,
            rotateX: 45,
            translateZ: -30
        });
        anime.set(bubbles, { scale: 0, opacity: 0 });
        anime.set(textContainer, { opacity: 0, translateY: 10 });

        // Show the bubble
        speechBubble.classList.add('show');

        // Create timeline
        this.currentAnimation = anime.timeline({
            easing: 'easeOutElastic(1, 0.6)'
        })
        .add({
            targets: speechBubble,
            opacity: 1,
            duration: 100,
            easing: 'linear'
        })
        .add({
            targets: cloudShape,
            scale: [0, 1.15, 1],
            rotateX: [45, -5, 0],
            translateZ: [-30, 10, 0],
            duration: 600,
            easing: 'spring(1, 80, 10, 0)'
        }, '-=50')
        .add({
            targets: bubbles,
            scale: [0, 1.3, 1],
            opacity: [0, 1],
            delay: anime.stagger(80, { start: 0 }),
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

        // Start floating animation after pop
        this.currentAnimation.finished.then(() => {
            this.startFloating(cloudShape);
        });

        return this.currentAnimation;
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

    // Gentle floating animation for the cloud
    startFloating(cloudShape) {
        this.floatAnimation = anime({
            targets: cloudShape,
            translateY: [-2, 2],
            rotateZ: [-0.5, 0.5],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
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
        this.currentSport = typeof currentSport !== 'undefined' ? currentSport : 'HOCKEY';
        this.create();
        // Initialize animator after elements are created
        this.animator = new GuessmatAnimator(this);
        this.startIdleWalk();
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
            <div class="guessmate-character sport-${config.sport}" id="guessmate-char">
                ${this.generateCharacterHTML(config)}
            </div>
        `;

        document.body.appendChild(container);
        this.element = container;
        this.speechBubble = document.getElementById('guessmate-speech');
        this.character = document.getElementById('guessmate-char');

        // Apply initial coach colors
        this.applyCoachColors(config.colors);
    }

    say(message, duration = 3000) {
        const speechText = this.speechBubble.querySelector('.speech-text');
        speechText.textContent = message;

        // Clear any existing timeout
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
        }

        // Use Anime.js for 3D speech bubble animation
        if (this.animator && typeof anime !== 'undefined') {
            // Hide first if already showing
            if (this.speechBubble.classList.contains('show')) {
                this.speechBubble.classList.remove('show');
            }

            // Show with 3D animation
            this.animator.showSpeechBubble(this.speechBubble);

            // Hide after duration
            this.speechTimeout = setTimeout(() => {
                this.animator.hideSpeechBubble(this.speechBubble);
            }, duration);
        } else {
            // Fallback to CSS animation
            this.speechBubble.classList.remove('show', 'css-animate');
            void this.speechBubble.offsetWidth;
            this.speechBubble.classList.add('show', 'css-animate');

            this.speechTimeout = setTimeout(() => {
                this.speechBubble.classList.remove('show', 'css-animate');
            }, duration);
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
        this.say(this.randomMessage(messages.greetings));
    }

    onLetterTyped(letter, position) {
        const messages = this.getMessages();
        if (position === 0) {
            this.setMood('thinking');
            const reactions = [
                `${letter}... interesting start!`,
                `Ooh, starting with ${letter}!`,
                `${letter}, nice choice!`
            ];
            this.say(this.randomMessage(reactions), 1500);
        } else if (position === 4) {
            this.setMood('excited');
            this.say(`Full word! Hit Enter! ${messages.icon}`, 2000);
        }
    }

    onLetterDeleted() {
        const reactions = [
            "Changed your mind? No worries!",
            "Backspace is your friend!",
            "Rethinking... smart move!"
        ];
        if (Math.random() < 0.3) {
            this.say(reactions[Math.floor(Math.random() * reactions.length)], 1500);
        }
    }

    onInvalidWord() {
        this.setMood('worried');
        const messages = this.getMessages();
        this.say(this.randomMessage(messages.invalidWord));
    }

    onNotEnoughLetters() {
        this.setMood('thinking');
        const reactions = [
            "Need 5 letters, buddy!",
            "Keep typing! Almost there!",
            "Few more letters needed! ✍️"
        ];
        this.say(reactions[Math.floor(Math.random() * reactions.length)]);
    }

    onGuessResult(correctCount, presentCount, absentCount, attempt) {
        if (correctCount === 5) {
            // Will be handled by onWin
            return;
        }

        const messages = this.getMessages();

        if (correctCount >= 3) {
            this.setMood('excited');
            const closeMessages = [`${correctCount} green! ${this.randomMessage(messages.closeToWin)}`];
            this.say(this.randomMessage(closeMessages.concat(messages.closeToWin)));
        } else if (correctCount >= 1 || presentCount >= 2) {
            this.setMood('happy');
            this.say(this.randomMessage(messages.goodProgress));
        } else if (presentCount >= 1) {
            this.setMood('thinking');
            this.say(this.randomMessage(messages.yellowHints));
        } else {
            this.setMood('worried');
            this.say(this.randomMessage(messages.noMatch));
        }

        // Extra encouragement on later attempts
        if (attempt >= 4 && correctCount < 3) {
            setTimeout(() => {
                this.setMood('determined');
                this.say(this.randomMessage(messages.lateGame));
            }, 3500);
        }
    }

    onWin(attempts) {
        this.stopWalking();
        this.setMood('celebrating');
        const messages = this.getMessages();
        const winMessage = messages.win[attempts] || `YOU WON! ${messages.icon}`;
        this.say(winMessage, 5000);
    }

    onLose(word) {
        this.stopWalking();
        this.setMood('sad');
        const messages = this.getMessages();
        const loseMessage = `The word was ${word}. ${this.randomMessage(messages.lose)}`;
        this.say(loseMessage, 5000);
    }

    onNewGame() {
        this.setMood('excited');
        this.startIdleWalk();
        const messages = this.getMessages();
        this.say(this.randomMessage(messages.newGame));
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
        setTimeout(() => this.guessmate.onGameStart(), 500);

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
    }

    checkMobile() {
        this.isMobile = window.innerWidth <= 500;
    }

    setupMobile() {
        this.mobileInput = document.getElementById('mobile-input');

        // Make current row tiles tappable
        this.updateTappableTiles();

        // Bind mobile input events
        if (this.mobileInput) {
            this.mobileInput.addEventListener('input', (e) => this.handleMobileInput(e));
            this.mobileInput.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    e.preventDefault();
                    this.handleKeyPress('⌫');
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleKeyPress('ENTER');
                }
            });
        }

        // Bind mobile control buttons
        const undoBtn = document.getElementById('mobile-undo');
        const submitBtn = document.getElementById('mobile-submit');

        if (undoBtn) {
            undoBtn.addEventListener('click', () => {
                this.handleKeyPress('⌫');
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.handleKeyPress('ENTER');
            });
        }
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

        // Focus the hidden input to trigger keyboard
        if (this.mobileInput) {
            this.mobileInput.value = '';
            this.mobileInput.focus();
        }
    }

    handleMobileInput(e) {
        const value = e.target.value;
        if (value && /^[a-zA-Z]$/.test(value)) {
            this.handleKeyPress(value.toUpperCase());
            this.highlightCurrentCell();
        }
        // Clear input for next character
        this.mobileInput.value = '';
    }

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
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
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

                button.addEventListener("click", () => this.handleKeyPress(key));
                rowDiv.appendChild(button);
            });

            keyboard.appendChild(rowDiv);
        });
    }

    bindEvents() {
        // Physical keyboard
        document.addEventListener("keydown", (e) => {
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
                this.handleKeyPress("ENTER");
            } else if (e.key === "Backspace") {
                this.handleKeyPress("⌫");
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                this.handleKeyPress(e.key.toUpperCase());
            }
        });

        // New game button
        document.getElementById("new-game").addEventListener("click", () => {
            this.resetGame();
        });
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
        }
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
            this.guessmate.onNotEnoughLetters();
            return;
        }

        if (!this.isValidWord(this.currentGuess)) {
            this.showMessage("Not a valid word!", "error");
            this.shakeRow();
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

        // Animate the reveal
        for (let i = 0; i < this.wordLength; i++) {
            setTimeout(() => {
                const tile = document.getElementById(`tile-${this.currentRow}-${i}`);
                tile.classList.add("reveal");

                setTimeout(() => {
                    tile.classList.add(result[i]);
                    this.updateKeyboard(guessArray[i], result[i]);
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
            const messages = [
                "🏆 HAT TRICK! Genius!",
                "🥅 TOP SHELF! Amazing!",
                "🏒 GREAT SNIPE!",
                "💪 SOLID PLAY!",
                "😅 CLOSE CALL!",
                "🎯 JUST MADE IT!"
            ];
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

    createSnowfall() {
        const snowContainer = document.createElement("div");
        snowContainer.className = "snow-container";
        snowContainer.id = "snow-container";

        // Create snowflakes
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement("div");
            snowflake.className = "snowflake";
            snowflake.innerHTML = "❄";
            snowflake.style.left = Math.random() * 100 + "%";
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + "s";
            snowflake.style.animationDelay = Math.random() * 2 + "s";
            snowflake.style.fontSize = (Math.random() * 15 + 10) + "px";
            snowflake.style.opacity = Math.random() * 0.7 + 0.3;
            snowContainer.appendChild(snowflake);
        }

        document.body.appendChild(snowContainer);
    }

    removeSnowfall() {
        const snowContainer = document.getElementById("snow-container");
        if (snowContainer) {
            snowContainer.remove();
        }
    }

    showResultModal(type, message) {
        // Start snowfall if enabled
        if (settingsManager.settings.modal.snowEnabled) {
            this.createSnowfall();
        }

        const modal = document.createElement("div");
        modal.className = "result-modal";
        modal.id = "result-modal";

        const content = document.createElement("div");
        content.className = `result-content ${type}`;

        // 3D Character (if enabled)
        if (settingsManager.settings.modal.characterEnabled) {
            const character = document.createElement("div");
            character.className = `result-character ${type}`;

            if (type === "win") {
                character.innerHTML = `
                    <div class="character-body win">
                        <div class="character-head">
                            <div class="eye left"></div>
                            <div class="eye right"></div>
                            <div class="mouth happy"></div>
                        </div>
                        <div class="character-arms">
                            <div class="arm left raised"></div>
                            <div class="arm right raised"></div>
                        </div>
                        <div class="hockey-stick"></div>
                    </div>
                `;
            } else {
                character.innerHTML = `
                    <div class="character-body lose">
                        <div class="character-head">
                            <div class="eye left"></div>
                            <div class="eye right"></div>
                            <div class="mouth determined"></div>
                        </div>
                        <div class="character-arms">
                            <div class="arm left"></div>
                            <div class="arm right fist"></div>
                        </div>
                        <div class="hockey-stick"></div>
                    </div>
                `;
            }
            content.appendChild(character);
        }

        // Message
        const messageDiv = document.createElement("div");
        messageDiv.className = "result-message";

        if (type === "win") {
            messageDiv.innerHTML = `
                <h2>GOAL! 🎉</h2>
                <p>${message}</p>
                <p class="sub-message">You're a hockey word champion!</p>
            `;
        } else {
            messageDiv.innerHTML = `
                <h2>Keep Skating! 💪</h2>
                <p>The word was: <strong>${message}</strong></p>
                <p class="sub-message">Every pro started as a rookie. Try again!</p>
            `;
        }
        content.appendChild(messageDiv);

        // Play Again Button
        const playAgainBtn = document.createElement("button");
        playAgainBtn.className = "play-again-btn";
        playAgainBtn.textContent = type === "win" ? "Play Again! 🏒" : "Try Again! 🏒";
        playAgainBtn.addEventListener("click", () => {
            this.closeResultModal();
            this.resetGame();
        });
        content.appendChild(playAgainBtn);

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.classList.add("show");
        }, 100);
    }

    closeResultModal() {
        const modal = document.getElementById("result-modal");
        if (modal) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        this.removeSnowfall();
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
    window.themeController = new ThemeController();
    new HockeyWordle();
    new HelpModal();
});

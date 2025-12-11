// Hockey Wordle Game Logic

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
            },
            // Theme
            theme: {
                primaryColor: '#667eea',
                backgroundColor: '#1a1a2e'
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

        // Apply theme
        root.style.setProperty('--primary-color', this.settings.theme.primaryColor);
        root.style.setProperty('--bg-color', this.settings.theme.backgroundColor);

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
                        <label>Primary Color</label>
                        <input type="color" id="setting-primary-color" value="${this.settings.theme.primaryColor}">
                    </div>
                    <div class="setting-row">
                        <label>Background</label>
                        <input type="color" id="setting-bg-color" value="${this.settings.theme.backgroundColor}">
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

        this.settings.theme.primaryColor = this.panel.querySelector('#setting-primary-color').value;
        this.settings.theme.backgroundColor = this.panel.querySelector('#setting-bg-color').value;
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

// Guessmate - Your friendly hockey companion
class Guessmate {
    constructor() {
        this.element = null;
        this.speechBubble = null;
        this.mood = 'idle';
        this.position = 50;
        this.direction = 1;
        this.walkInterval = null;
        this.isWalking = false;
        this.create();
        this.startIdleWalk();
    }

    create() {
        // Create guessmate container
        const container = document.createElement('div');
        container.id = 'guessmate';
        container.className = 'guessmate';

        // Create the character
        container.innerHTML = `
            <div class="guessmate-speech" id="guessmate-speech">
                <span class="speech-text">Let's play hockey words! 🏒</span>
            </div>
            <div class="guessmate-character" id="guessmate-char">
                <div class="guessmate-body">
                    <div class="guessmate-head">
                        <div class="guessmate-helmet"></div>
                        <div class="guessmate-face">
                            <div class="guessmate-eye left"></div>
                            <div class="guessmate-eye right"></div>
                            <div class="guessmate-mouth"></div>
                        </div>
                    </div>
                    <div class="guessmate-torso" data-number="${settingsManager.settings.guessmate.jerseyNumber}"></div>
                    <div class="guessmate-legs">
                        <div class="guessmate-leg left"></div>
                        <div class="guessmate-leg right"></div>
                    </div>
                    <div class="guessmate-stick"></div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.element = container;
        this.speechBubble = document.getElementById('guessmate-speech');
        this.character = document.getElementById('guessmate-char');
    }

    say(message, duration = 3000) {
        const speechText = this.speechBubble.querySelector('.speech-text');
        speechText.textContent = message;
        this.speechBubble.classList.add('show');

        setTimeout(() => {
            this.speechBubble.classList.remove('show');
        }, duration);
    }

    setMood(mood) {
        this.mood = mood;
        const character = this.character;
        character.className = 'guessmate-character';
        character.classList.add(`mood-${mood}`);
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
        const greetings = [
            "Hey teammate! Let's find that word! 🏒",
            "Ready to score some letters? Let's go!",
            "Time to hit the ice! Good luck! ⭐",
            "I believe in you, champ! 💪"
        ];
        this.say(greetings[Math.floor(Math.random() * greetings.length)]);
    }

    onLetterTyped(letter, position) {
        if (position === 0) {
            this.setMood('thinking');
            const reactions = [
                `${letter}... interesting start!`,
                `Ooh, starting with ${letter}!`,
                `${letter}, nice choice!`
            ];
            this.say(reactions[Math.floor(Math.random() * reactions.length)], 1500);
        } else if (position === 4) {
            this.setMood('excited');
            this.say("Full word! Hit Enter! 🎯", 2000);
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
        const reactions = [
            "Hmm, that's not in my playbook! 📖",
            "Try another word, teammate!",
            "That word's offside! Try again!",
            "Not a valid play! Think again!"
        ];
        this.say(reactions[Math.floor(Math.random() * reactions.length)]);
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

        if (correctCount >= 3) {
            this.setMood('excited');
            const reactions = [
                `${correctCount} green! So close! 🔥`,
                "You're heating up! 🏒",
                "Almost there, keep pushing!",
                "Hat trick of greens! One more push!"
            ];
            this.say(reactions[Math.floor(Math.random() * reactions.length)]);
        } else if (correctCount >= 1 || presentCount >= 2) {
            this.setMood('happy');
            const reactions = [
                "Good progress! Keep going! 👍",
                "You're onto something!",
                "Nice! Use those clues!",
                "Getting warmer! 🌡️"
            ];
            this.say(reactions[Math.floor(Math.random() * reactions.length)]);
        } else if (presentCount >= 1) {
            this.setMood('thinking');
            const reactions = [
                "Yellow means it's there somewhere!",
                "Right letters, wrong spots!",
                "Shuffle those letters around!",
                "Close! Rearrange them!"
            ];
            this.say(reactions[Math.floor(Math.random() * reactions.length)]);
        } else {
            this.setMood('worried');
            const reactions = [
                "Tough one! Don't give up!",
                "Fresh start! Try new letters!",
                "That's hockey - shake it off!",
                "No worries, next attempt! 💪"
            ];
            this.say(reactions[Math.floor(Math.random() * reactions.length)]);
        }

        // Extra encouragement on later attempts
        if (attempt >= 4 && correctCount < 3) {
            setTimeout(() => {
                this.setMood('determined');
                const lateReactions = [
                    "Focus! We got this!",
                    "Crunch time! Concentrate!",
                    "Final minutes! Give it all!"
                ];
                this.say(lateReactions[Math.floor(Math.random() * lateReactions.length)]);
            }, 3500);
        }
    }

    onWin(attempts) {
        this.stopWalking();
        this.setMood('celebrating');
        const reactions = {
            1: "INCREDIBLE! First try?! You're a legend! 🏆",
            2: "AMAZING! Two tries! Pro player! 🥇",
            3: "FANTASTIC! Great skills! 🌟",
            4: "NICE ONE! Solid performance! 🏒",
            5: "GOOD JOB! You figured it out! 👏",
            6: "PHEW! Clutch play! Never gave up! 💪"
        };
        this.say(reactions[attempts] || "YOU WON! 🎉", 5000);
    }

    onLose(word) {
        this.stopWalking();
        this.setMood('sad');
        const reactions = [
            `The word was ${word}. We'll get 'em next time!`,
            `${word}! Tough one. You'll nail it next round!`,
            `Ah, ${word}! Hockey's about bouncing back!`
        ];
        this.say(reactions[Math.floor(Math.random() * reactions.length)], 5000);
    }

    onNewGame() {
        this.setMood('excited');
        this.startIdleWalk();
        const reactions = [
            "Fresh ice! Let's do this! 🏒",
            "New game, new chances!",
            "Back on the ice! Ready!",
            "Let's go, teammate! ⭐"
        ];
        this.say(reactions[Math.floor(Math.random() * reactions.length)]);
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

        this.init();
    }

    init() {
        this.createBoard();
        this.createKeyboard();
        this.selectNewWord();
        this.bindEvents();
        this.guessmate = new Guessmate();
        setTimeout(() => this.guessmate.onGameStart(), 500);

        // Apply saved settings
        settingsManager.apply();
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
    }

    deleteLetter() {
        if (this.currentCol <= 0) return;

        this.currentCol--;
        const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
        tile.textContent = "";
        tile.classList.remove("filled");
        this.currentGuess = this.currentGuess.slice(0, -1);
        this.guessmate.onLetterDeleted();
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
        return ALL_VALID_WORDS.includes(word.toUpperCase());
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
        } else if (this.currentRow >= this.maxAttempts - 1) {
            this.gameOver = true;
            this.showMessage(`GAME OVER! The word was ${this.targetWord}`, "lose");
            this.guessmate.onLose(this.targetWord);
            this.showResultModal("lose", this.targetWord);
        } else {
            // Move to next row
            this.currentRow++;
            this.currentCol = 0;
            this.currentGuess = "";
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

        if (type === "error") {
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
    }
}

// Start the game when page loads
document.addEventListener("DOMContentLoaded", () => {
    new HockeyWordle();
});

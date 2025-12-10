// Hockey Wordle Game Logic

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

        this.init();
    }

    init() {
        this.createBoard();
        this.createKeyboard();
        this.selectNewWord();
        this.bindEvents();
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
        this.currentCol++;
    }

    deleteLetter() {
        if (this.currentCol <= 0) return;

        this.currentCol--;
        const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
        tile.textContent = "";
        tile.classList.remove("filled");
        this.currentGuess = this.currentGuess.slice(0, -1);
    }

    submitGuess() {
        if (this.currentGuess.length !== this.wordLength) {
            this.showMessage("Not enough letters!", "error");
            this.shakeRow();
            return;
        }

        if (!this.isValidWord(this.currentGuess)) {
            this.showMessage("Not a valid word!", "error");
            this.shakeRow();
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
        } else if (this.currentRow >= this.maxAttempts - 1) {
            this.gameOver = true;
            this.showMessage(`GAME OVER! The word was ${this.targetWord}`, "lose");
        } else {
            // Move to next row
            this.currentRow++;
            this.currentCol = 0;
            this.currentGuess = "";
        }
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
    }
}

// Start the game when page loads
document.addEventListener("DOMContentLoaded", () => {
    new HockeyWordle();
});

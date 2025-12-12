// Landing Page Logic

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('entry-form');
    const nameInput = document.getElementById('player-name');
    const sportSelect = document.getElementById('sport-select');
    const sportSlider = document.getElementById('sport-slider');
    const sportOptions = document.querySelectorAll('.sport-option');
    const enterBtn = document.getElementById('enter-btn');

    // Sport option index mapping
    const sportIndexMap = {
        'HOCKEY': 0,
        'NFL': 1,
        'NBA': 2,
        'FA': 3
    };

    // Check if user already has saved preferences
    const savedName = localStorage.getItem('yinzordle_playerName');
    const savedSport = localStorage.getItem('yinzordle_sport');

    if (savedName) {
        nameInput.value = savedName;
    }

    if (savedSport && sportIndexMap[savedSport] !== undefined) {
        selectSport(savedSport);
    }

    // Sport slider click handling
    sportOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const sport = option.dataset.sport;
            selectSport(sport);

            // Add subtle pulse to button when sport is selected
            enterBtn.classList.add('pulse');
            setTimeout(() => enterBtn.classList.remove('pulse'), 600);
        });
    });

    function selectSport(sport) {
        const index = sportIndexMap[sport];

        // Update hidden input
        sportSelect.value = sport;

        // Update slider position
        sportSlider.dataset.active = index;

        // Update active state on options
        sportOptions.forEach((opt, i) => {
            opt.classList.toggle('active', i === index);
        });

        updateButtonState();
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const playerName = nameInput.value.trim();
        const selectedSport = sportSelect.value;

        if (!playerName || !selectedSport) {
            // Shake animation for incomplete form
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
            return;
        }

        // Save to localStorage
        localStorage.setItem('yinzordle_playerName', playerName);
        localStorage.setItem('yinzordle_sport', selectedSport);

        // Add button animation
        enterBtn.classList.add('entering');

        // Navigate to game after brief animation
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 400);
    });

    // Real-time validation feedback
    nameInput.addEventListener('input', () => {
        updateButtonState();
    });

    function updateButtonState() {
        const isValid = nameInput.value.trim() && sportSelect.value;
        enterBtn.disabled = !isValid;
    }

    // Initial button state
    updateButtonState();

    // Add keyboard navigation
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Focus first sport option if none selected
            if (!sportSelect.value) {
                sportOptions[0].focus();
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Keyboard navigation for sport options
    sportOptions.forEach((option, index) => {
        option.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % sportOptions.length;
                sportOptions[nextIndex].focus();
                selectSport(sportOptions[nextIndex].dataset.sport);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + sportOptions.length) % sportOptions.length;
                sportOptions[prevIndex].focus();
                selectSport(sportOptions[prevIndex].dataset.sport);
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectSport(option.dataset.sport);
                if (nameInput.value.trim()) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });
    });
});

// Add shake animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }

    .shake {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .pulse {
        animation: pulse 0.6s ease-in-out;
    }

    @keyframes entering {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1.5); opacity: 0; }
    }

    .entering {
        animation: entering 0.4s ease-in-out forwards;
    }
`;
document.head.appendChild(style);

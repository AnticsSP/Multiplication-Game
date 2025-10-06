let score = 0;
let problemsSolved = 0;
let currentAnswer = 0;
let attempts = 0;
let currentGrade = '3rd';
let currentMode = 'game';

// Flash card variables
let currentCardIndex = 0;
let flashCards = [];

// Grade-specific multiplication ranges
const gradeRanges = {
    '3rd': {
        min1: 2,
        max1: 12,
        min2: 2,
        max2: 12,
        description: 'Basic multiplication facts up to 12 × 12'
    },
    '4th': {
        min1: 2,
        max1: 12,
        min2: 10,
        max2: 99,
        description: 'Multiplication with two-digit numbers'
    },
    '5th': {
        min1: 10,
        max1: 99,
        min2: 10,
        max2: 99,
        description: 'Multi-digit multiplication'
    }
};

// Switch between game and practice modes
function switchMode(mode) {
    currentMode = mode;
    
    // Update button styles
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(mode + 'Mode').classList.add('active');
    
    // Show/hide appropriate sections
    document.getElementById('gameSection').style.display = mode === 'game' ? 'block' : 'none';
    document.getElementById('practiceSection').style.display = mode === 'practice' ? 'block' : 'none';
    
    if (mode === 'practice') {
        generateFlashCards();
        showCurrentCard();
    }
}

// Generate flash cards based on current grade level
function generateFlashCards() {
    flashCards = [];
    const range = gradeRanges[currentGrade];
    
    // Generate cards based on grade level
    for (let i = range.min1; i <= range.max1; i++) {
        for (let j = range.min2; j <= range.max2; j++) {
            flashCards.push({
                question: `${i} × ${j}`,
                answer: i * j
            });
        }
    }
    
    // Shuffle the cards
    flashCards.sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
}

// Show the current flash card
function showCurrentCard() {
    if (flashCards.length === 0) return;
    
    const card = flashCards[currentCardIndex];
    document.getElementById('flashCardQuestion').textContent = card.question;
    document.getElementById('flashCardAnswer').textContent = card.answer;
    
    // Reset card flip
    document.querySelector('.flash-card').classList.remove('flipped');
}

// Flip the current card
function flipCard() {
    document.querySelector('.flash-card').classList.toggle('flipped');
}

// Navigate to previous card
function previousCard() {
    currentCardIndex = (currentCardIndex - 1 + flashCards.length) % flashCards.length;
    showCurrentCard();
}

// Navigate to next card
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashCards.length;
    showCurrentCard();
}

// Set difficulty level
function setDifficulty(grade) {
    console.log('Setting difficulty to:', grade);
    
    currentGrade = grade;
    document.getElementById('currentGrade').textContent = grade + ' Grade';
    
    // Update active button styling
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const buttonId = 'grade' + grade[0];
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add('active');
    }
    
    // Reset score and problems for new difficulty
    score = 0;
    problemsSolved = 0;
    updateScore();
    
    // Generate new problem or flash cards based on current mode
    if (currentMode === 'game') {
        newProblem();
    } else {
        generateFlashCards();
        showCurrentCard();
    }
}

// Generate a new multiplication problem
function newProblem() {
    const range = gradeRanges[currentGrade];
    
    const num1 = Math.floor(Math.random() * (range.max1 - range.min1 + 1)) + range.min1;
    const num2 = Math.floor(Math.random() * (range.max2 - range.min2 + 1)) + range.min2;
    
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    
    currentAnswer = num1 * num2;
    attempts = 0;
    
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    document.getElementById('answer').disabled = false;
    document.getElementById('submit-btn').disabled = false;
    
    document.getElementById('answer').focus();
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('problems-solved').textContent = problemsSolved;
}

// Check if the answer is correct
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedback = document.getElementById('feedback');
    
    if (isNaN(userAnswer)) {
        feedback.textContent = 'Please enter a number!';
        feedback.className = 'feedback incorrect';
        return;
    }
    
    attempts++;
    
    if (userAnswer === currentAnswer) {
        feedback.className = 'feedback correct';
        
        if (attempts === 1) {
            score += 15;
            feedback.textContent = '🌟 Perfect! First try bonus: +15 points! 🌟';
        } else {
            score += 10;
            feedback.textContent = '✨ Correct! +10 points! ✨';
        }
        
        problemsSolved++;
        
        document.getElementById('answer').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    } else {
        if (attempts < 2) {
            feedback.textContent = 'Try one more time!';
            feedback.className = 'feedback incorrect';
        } else {
            feedback.textContent = `The answer is ${currentAnswer}. Let's try another one!`;
            feedback.className = 'feedback incorrect';
            if (score > 0) score -= 5;
            document.getElementById('answer').disabled = true;
            document.getElementById('submit-btn').disabled = true;
        }
    }
    
    updateScore();
}

// Add event listener for Enter key
document.getElementById('answer').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !this.disabled) {
        checkAnswer();
    }
});

// Initialize the game
window.onload = function() {
    setDifficulty('3rd');
    switchMode('game');
    
    document.getElementById('next-btn').addEventListener('click', function() {
        document.getElementById('answer').disabled = false;
        document.getElementById('submit-btn').disabled = false;
        newProblem();
    });
    
    // Add keyboard navigation for flash cards
    document.addEventListener('keydown', function(event) {
        if (currentMode === 'practice') {
            switch(event.key) {
                case 'ArrowLeft':
                    previousCard();
                    break;
                case 'ArrowRight':
                    nextCard();
                    break;
                case ' ':
                    flipCard();
                    event.preventDefault();
                    break;
            }
        }
    });
};

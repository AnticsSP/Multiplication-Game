let score = 0;
let problemsSolved = 0;
let currentAnswer = 0;
let attempts = 0;
let currentGrade = '3rd';
let currentMode = 'game';

// Flash card variables
let currentCardIndex = 0;
let flashCards = [];
let williamCards = [];
let currentWilliamIndex = 0;

// William's specific multiplication problems
const williamProblems = [
    {question: "2 × 9", answer: 18}, {question: "1 × 10", answer: 10},
    {question: "2 × 6", answer: 12}, {question: "2 × 12", answer: 24},
    {question: "2 × 4", answer: 8}, {question: "2 × 10", answer: 20},
    {question: "2 × 7", answer: 14}, {question: "1 × 8", answer: 8},
    {question: "2 × 2", answer: 4}, {question: "2 × 8", answer: 16},
    {question: "3 × 12", answer: 36}, {question: "4 × 6", answer: 24},
    {question: "1 × 11", answer: 11}, {question: "2 × 5", answer: 10},
    {question: "3 × 10", answer: 30}, {question: "4 × 4", answer: 16},
    {question: "1 × 9", answer: 9}, {question: "2 × 3", answer: 6},
    {question: "3 × 8", answer: 24}, {question: "4 × 2", answer: 8},
    {question: "1 × 7", answer: 7}, {question: "2 × 1", answer: 2},
    {question: "3 × 5", answer: 15}, {question: "3 × 11", answer: 33},
    {question: "4 × 5", answer: 20}, {question: "3 × 6", answer: 18},
    {question: "3 × 3", answer: 9}, {question: "3 × 9", answer: 27},
    {question: "4 × 3", answer: 12}, {question: "3 × 4", answer: 12},
    {question: "3 × 1", answer: 3}, {question: "3 × 7", answer: 21},
    {question: "4 × 1", answer: 4}, {question: "3 × 2", answer: 6},
    {question: "5 × 5", answer: 25}, {question: "5 × 11", answer: 55},
    {question: "4 × 10", answer: 40}, {question: "5 × 4", answer: 20},
    {question: "5 × 10", answer: 50}, {question: "5 × 1", answer: 5},
    {question: "5 × 7", answer: 35}, {question: "4 × 8", answer: 32},
    {question: "5 × 2", answer: 10}, {question: "5 × 8", answer: 40},
    {question: "6 × 6", answer: 36}, {question: "6 × 12", answer: 72},
    {question: "7 × 6", answer: 42}, {question: "4 × 11", answer: 44},
    {question: "6 × 4", answer: 24}, {question: "6 × 10", answer: 60},
    {question: "7 × 4", answer: 28}, {question: "4 × 9", answer: 36},
    {question: "6 × 2", answer: 12}, {question: "6 × 8", answer: 48},
    {question: "7 × 2", answer: 14}, {question: "4 × 7", answer: 28},
    {question: "6 × 5", answer: 30}, {question: "6 × 11", answer: 66},
    {question: "7 × 5", answer: 35}, {question: "6 × 3", answer: 18},
    {question: "6 × 9", answer: 54}, {question: "7 × 3", answer: 21},
    {question: "6 × 1", answer: 6}, {question: "6 × 7", answer: 42},
    {question: "7 × 1", answer: 7}, {question: "8 × 5", answer: 40},
    {question: "8 × 11", answer: 88}, {question: "7 × 12", answer: 84},
    {question: "8 × 6", answer: 48}, {question: "8 × 12", answer: 96},
    {question: "8 × 3", answer: 24}, {question: "8 × 9", answer: 72},
    {question: "7 × 10", answer: 70}, {question: "8 × 4", answer: 32},
    {question: "8 × 10", answer: 80}, {question: "8 × 1", answer: 8},
    {question: "8 × 7", answer: 56}, {question: "7 × 8", answer: 56},
    {question: "8 × 2", answer: 16}, {question: "8 × 8", answer: 64},
    {question: "9 × 6", answer: 54}, {question: "9 × 12", answer: 108},
    {question: "10 × 6", answer: 60}, {question: "7 × 11", answer: 77},
    {question: "9 × 4", answer: 36}, {question: "9 × 10", answer: 90},
    {question: "10 × 4", answer: 40}, {question: "7 × 9", answer: 63},
    {question: "9 × 2", answer: 18}, {question: "9 × 8", answer: 72},
    {question: "10 × 2", answer: 20}, {question: "7 × 7", answer: 49},
    {question: "11 × 12", answer: 132}, {question: "9 × 5", answer: 45},
    {question: "9 × 11", answer: 99}, {question: "10 × 5", answer: 50},
    {question: "11 × 10", answer: 110}, {question: "9 × 3", answer: 27},
    {question: "9 × 9", answer: 81}, {question: "10 × 3", answer: 30},
    {question: "11 × 8", answer: 88}, {question: "9 × 1", answer: 9},
    {question: "9 × 7", answer: 63}, {question: "10 × 1", answer: 10},
    {question: "10 × 11", answer: 110}, {question: "11 × 5", answer: 55},
    {question: "11 × 11", answer: 121}, {question: "10 × 12", answer: 120},
    {question: "11 × 6", answer: 66}, {question: "10 × 9", answer: 90},
    {question: "11 × 3", answer: 33}, {question: "11 × 9", answer: 99},
    {question: "10 × 10", answer: 100}, {question: "11 × 4", answer: 44},
    {question: "10 × 7", answer: 70}, {question: "11 × 1", answer: 11},
    {question: "11 × 7", answer: 77}, {question: "10 × 8", answer: 80},
    {question: "11 × 2", answer: 22}, {question: "12 × 5", answer: 60},
    {question: "12 × 11", answer: 132}, {question: "12 × 6", answer: 72},
    {question: "12 × 12", answer: 144}, {question: "12 × 3", answer: 36},
    {question: "12 × 9", answer: 108}, {question: "12 × 4", answer: 48},
    {question: "12 × 1", answer: 12}, {question: "12 × 7", answer: 84},
    {question: "12 × 2", answer: 24}, {question: "12 × 8", answer: 96},
    {question: "0 × 5", answer: 0}, {question: "0 × 11", answer: 0},
    {question: "1 × 5", answer: 5}, {question: "0 × 6", answer: 0},
    {question: "0 × 12", answer: 0}, {question: "1 × 6", answer: 6},
    {question: "0 × 3", answer: 0}, {question: "0 × 9", answer: 0},
    {question: "1 × 3", answer: 3}, {question: "0 × 4", answer: 0},
    {question: "0 × 10", answer: 0}, {question: "1 × 4", answer: 4},
    {question: "0 × 1", answer: 0}, {question: "0 × 7", answer: 0},
    {question: "1 × 1", answer: 1}, {question: "0 × 2", answer: 0},
    {question: "0 × 8", answer: 0}, {question: "1 × 2", answer: 2},
    {question: "2 × 11", answer: 22}, {question: "1 × 12", answer: 12},
    {question: "4 × 12", answer: 48}, {question: "5 × 6", answer: 30},
    {question: "5 × 12", answer: 60}, {question: "5 × 3", answer: 15},
    {question: "5 × 9", answer: 45}
];

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
    console.log('Switching to mode:', mode);
    
    // Update mode
    currentMode = mode;
    
    // Get sections
    const gameSection = document.getElementById('gameSection');
    const practiceSection = document.getElementById('practiceSection');
    const williamSection = document.getElementById('williamSection');
    
    // Get buttons
    const gameModeBtn = document.getElementById('gameMode');
    const practiceModeBtn = document.getElementById('practiceMode');
    const williamModeBtn = document.getElementById('williamMode');
    
    // Hide all sections first
    gameSection.style.display = 'none';
    practiceSection.style.display = 'none';
    williamSection.style.display = 'none';
    
    // Remove active class from all buttons
    gameModeBtn.classList.remove('mode-active');
    practiceModeBtn.classList.remove('mode-active');
    williamModeBtn.classList.remove('mode-active');
    
    // Show appropriate section and activate correct button
    switch(mode) {
        case 'game':
            gameSection.style.display = 'block';
            gameModeBtn.classList.add('mode-active');
            break;
        case 'practice':
            practiceSection.style.display = 'block';
            practiceModeBtn.classList.add('mode-active');
            generateFlashCards();
            showCurrentCard();
            break;
        case 'william':
            williamSection.style.display = 'block';
            williamModeBtn.classList.add('mode-active');
            initializeWilliamCards();
            showCurrentWilliamCard();
            break;
    }
}

// Initialize William's flash cards
function initializeWilliamCards() {
    williamCards = [...williamProblems]; // Create a copy of the problems
    // Shuffle the cards
    williamCards.sort(() => Math.random() - 0.5);
    currentWilliamIndex = 0;
}

// Show current William card
function showCurrentWilliamCard() {
    if (williamCards.length === 0) return;
    
    const card = williamCards[currentWilliamIndex];
    document.getElementById('williamCardQuestion').textContent = card.question;
    document.getElementById('williamCardAnswer').textContent = card.answer;
    
    // Reset card flip
    document.querySelector('#williamSection .flash-card').classList.remove('flipped');
}

// Navigate William's cards
function previousWilliamCard() {
    currentWilliamIndex = (currentWilliamIndex - 1 + williamCards.length) % williamCards.length;
    showCurrentWilliamCard();
}

function nextWilliamCard() {
    currentWilliamIndex = (currentWilliamIndex + 1) % williamCards.length;
    showCurrentWilliamCard();
}

// Generate flash cards based on current grade level
function generateFlashCards() {
    flashCards = [];
    const range = gradeRanges[currentGrade];
    
    for (let i = range.min1; i <= range.max1; i++) {
        for (let j = range.min2; j <= range.max2; j++) {
            flashCards.push({
                question: `${i} × ${j}`,
                answer: i * j
            });
        }
    }
    
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
    document.querySelector('#practiceSection .flash-card').classList.remove('flipped');
}

// Flip the current card
function flipCard() {
    const currentSection = currentMode === 'practice' ? '#practiceSection' : '#williamSection';
    document.querySelector(currentSection + ' .flash-card').classList.toggle('flipped');
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
    } else if (currentMode === 'practice') {
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
        } else if (currentMode === 'william') {
            switch(event.key) {
                case 'ArrowLeft':
                    previousWilliamCard();
                    break;
                case 'ArrowRight':
                    nextWilliamCard();
                    break;
                case ' ':
                    flipCard();
                    event.preventDefault();
                    break;
            }
        }
    });
};

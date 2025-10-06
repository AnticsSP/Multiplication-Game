let score = 0;
let problemsSolved = 0;
let currentAnswer = 0;
let attempts = 0;
let currentGrade = '3rd';

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

// Set difficulty level
function setDifficulty(grade) {
    console.log('Setting difficulty to:', grade); // Debug log
    
    // Update current grade
    currentGrade = grade;
    document.getElementById('currentGrade').textContent = grade + ' Grade';
    
    // Update active button styling
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Update the active button
    const buttonId = 'grade' + grade.toLowerCase().replace('th', '').replace('rd', '').replace('nd', '');
    console.log('Looking for button:', buttonId); // Debug log
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add('active');
    }
    
    // Reset score and problems for new difficulty
    score = 0;
    problemsSolved = 0;
    updateScore();
    
    // Generate new problem at the selected difficulty
    newProblem();
}

// Generate a new multiplication problem
function newProblem() {
    const range = gradeRanges[currentGrade];
    
    // Generate random numbers within the grade-specific range
    const num1 = Math.floor(Math.random() * (range.max1 - range.min1 + 1)) + range.min1;
    const num2 = Math.floor(Math.random() * (range.max2 - range.min2 + 1)) + range.min2;
    
    // Update the display
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    
    // Store the correct answer
    currentAnswer = num1 * num2;
    
    // Reset attempts for new problem
    attempts = 0;
    
    // Clear the input and feedback
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    // Enable input and submit button
    document.getElementById('answer').disabled = false;
    document.getElementById('submit-btn').disabled = false;
    
    // Focus on the input field
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
        
        // Add bonus points for solving on first attempt
        if (attempts === 1) {
            score += 15; // Extra points for first try
            feedback.textContent = '🌟 Perfect! First try bonus: +15 points! 🌟';
        } else {
            score += 10;
            feedback.textContent = '✨ Correct! +10 points! ✨';
        }
        
        problemsSolved++;
        
        // Disable input until next problem
        document.getElementById('answer').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    } else {
        if (attempts < 2) {
            feedback.textContent = 'Try one more time!';
            feedback.className = 'feedback incorrect';
            // No points deducted for first attempt
        } else {
            feedback.textContent = `The answer is ${currentAnswer}. Let's try another one!`;
            feedback.className = 'feedback incorrect';
            if (score > 0) score -= 5;
            // Disable input until next problem
            document.getElementById('answer').disabled = true;
            document.getElementById('submit-btn').disabled = true;
        }
    }
    
    // Update score display
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
    // Set initial difficulty to 3rd grade
    setDifficulty('3rd');
    
    // Enable input and submit button when clicking Next Problem
    document.getElementById('next-btn').addEventListener('click', function() {
        document.getElementById('answer').disabled = false;
        document.getElementById('submit-btn').disabled = false;
        newProblem();
    });
};

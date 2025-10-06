let score = 0;
let problemsSolved = 0;
let currentAnswer = 0;
let attempts = 0;
let musicPlaying = false;

// Music controls
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicButton = document.getElementById('musicToggle');
    
    if (musicPlaying) {
        music.pause();
        musicButton.textContent = '🎵 Play Music';
    } else {
        music.play();
        musicButton.textContent = '🔇 Mute Music';
    }
    musicPlaying = !musicPlaying;
}

// Generate a new multiplication problem
function newProblem() {
    // Generate random numbers between 1 and 12
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    
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
    
    // Focus on the input field
    document.getElementById('answer').focus();
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
        score += 10;
        problemsSolved++;
        
        // Add some randomized encouraging messages
        const messages = [
            "Amazing work! 🌟",
            "You're doing great! 🎉",
            "Math superstar! ⭐",
            "Keep it up! 🚀",
            "Fantastic! 🌈"
        ];
        feedback.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        // Disable input until next problem
        document.getElementById('answer').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    } else {
        if (attempts < 2) {
            feedback.textContent = 'Try one more time!';
            feedback.className = 'feedback incorrect';
            // Don't deduct points for first attempt
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
    document.getElementById('score').textContent = score;
    document.getElementById('problems-solved').textContent = problemsSolved;
}

// Add event listener for Enter key
document.getElementById('answer').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !this.disabled) {
        checkAnswer();
    }
});

// Initialize the first problem when the page loads
window.onload = function() {
    newProblem();
    
    // Enable input and submit button when clicking Next Problem
    document.getElementById('next-btn').addEventListener('click', function() {
        document.getElementById('answer').disabled = false;
        document.getElementById('submit-btn').disabled = false;
    });
};

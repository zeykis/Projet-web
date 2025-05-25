const questions = [
  {
    question: "Où est-ce que j'étudie actuellement ?",
    answers: ["EPITECH", "HEC", "EPITA", "Sorbonne"],
    correct: 2
  },
  {
    question: "Quelle est ma spécialisation ?",
    answers: ["Marketing", "Cybersécurité", "Finance", "Architecture"],
    correct: 1
  },
  {
    question: "Quel langage de programmation je ne maitrise pas ?",
    answers: ["C#", "Python", "Java", "C++"],
    correct: 2
  },
  {
    question: "Dans quel lycée je suis allé ?",
    answers: ["Lycée Louis-le-Grand", "Lycée Hoche", "Lycée Henri-IV", "Lycée Stanislas"],
    correct: 1
  },
  {
    question: "Quel sport je pratique ?",
    answers: ["Tennis", "Football", "Judo", "Escalade"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let bruteForceMode = false;
let currentBruteForceAttempt = 0;
let bruteForceTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
  document.getElementById('bruteForceBtn').addEventListener('click', toggleBruteForce);
});

function loadQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.className = 'answer-button';
      button.addEventListener('click', () => selectAnswer(index));
      answersElement.appendChild(button);
    });
    
    if (bruteForceMode) {
      currentBruteForceAttempt = 0;
      tryNextAnswer();
    }
  } else {
    quizContainer.innerHTML = `
      <h1 class="text-2xl font-bold mb-6">Quiz Fini</h1>
      <p class="text-xl mb-6">Entrez votre message pour me contacter</p>
      <button onclick="sendMail()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
        Envoyer mail
      </button>
    `;
    stopBruteForce();
  }
}

function selectAnswer(selectedIndex) {
  if (bruteForceTimeout) return;
  
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(button => button.disabled = true);
  
  const selectedButton = buttons[selectedIndex];
  selectedButton.classList.add('selected');
  
  if (selectedIndex === currentQuestion.correct) {
    selectedButton.classList.add('correct');
    score++;
    
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, bruteForceMode ? 1000 : 2000);
  } else {
    selectedButton.classList.add('incorrect');
    buttons[currentQuestion.correct].classList.add('correct');
    
    setTimeout(() => {
      resetQuiz();
    }, 1000);
  }
}

function toggleBruteForce() {
  bruteForceMode = !bruteForceMode;
  const bruteForceBtn = document.getElementById('bruteForceBtn');
  
  if (bruteForceMode) {
    bruteForceBtn.textContent = 'Brute Force (ON)';
    bruteForceBtn.classList.remove('bg-purple-600');
    bruteForceBtn.classList.add('bg-red-600');
    currentBruteForceAttempt = 0;
    tryNextAnswer();
  } else {
    bruteForceBtn.textContent = 'Brute Force';
    bruteForceBtn.classList.remove('bg-red-600');
    bruteForceBtn.classList.add('bg-purple-600');
    stopBruteForce();
  }
}

function tryNextAnswer() {
  stopBruteForce();
  const buttons = document.querySelectorAll('#answers button');
  if (!buttons.length || currentBruteForceAttempt >= buttons.length) {
    bruteForceTimeout = setTimeout(() => {
      resetQuiz();
    }, 1000);
    return;
  }
  const button = buttons[currentBruteForceAttempt];
  button.click();
  button.classList.add('selected');
  
  const currentQuestion = questions[currentQuestionIndex];
  if (currentBruteForceAttempt === currentQuestion.correct) {
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
  }
  
  currentBruteForceAttempt++;
}

function stopBruteForce() {
  if (bruteForceTimeout) {
    clearTimeout(bruteForceTimeout);
    bruteForceTimeout = null;
  }
}

function resetQuiz() {
  stopBruteForce();
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}


function sendMail() {
  const mailtoLink = `mailto:thibaultgt971@outlook.fr
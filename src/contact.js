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
let quizFinished = false;

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
  document.getElementById('bruteForceBtn').addEventListener('click', toggleBruteForce);
  document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendEmail();
  });
});

function loadQuestion() {
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
    showQuizCompletion();
  }
}

function showQuizCompletion() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `
    <h1 class="text-2xl font-bold mb-6">Quiz Fini!</h1>
  `;
  document.getElementById('contact-form').classList.remove('hidden');
  quizFinished = true;
  const bruteForceBtn = document.getElementById('bruteForceBtn');
  bruteForceBtn.classList.add('hidden');
  stopBruteForce();
}

function isCorrectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  return selectedIndex === currentQuestion.correct;
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
    //console.log(isCorrectAnswer(selectedIndex));
    
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, bruteForceMode ? 0 : 1000);
  } else {
    selectedButton.classList.add('incorrect');
    //console.log(isCorrectAnswer(selectedIndex));
    
    setTimeout(() => {
      resetQuiz();
    }, 500);
  }
}

function toggleBruteForce() {
  bruteForceMode = !bruteForceMode;
  const bruteForceBtn = document.getElementById('bruteForceBtn');
  
  if (bruteForceMode && !quizFinished) {
    bruteForceBtn.textContent = 'Brute Force (ON)';
    bruteForceBtn.classList.remove('bg-purple-600');
    bruteForceBtn.classList.add('bg-red-600');
    currentBruteForceAttempt = 0;
    tryNextAnswer();
  } else {
    bruteForceBtn.textContent = 'Brute Force';
    bruteForceBtn.classList.remove('bg-red-600');
    bruteForceBtn.classList.add('bg-purple-600');
    resetQuiz();
    stopBruteForce();
  }   
}

function tryNextAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(element => {
    element.classList.remove('selected', 'correct', 'incorrect');
    element.disabled = false;
    
  });
  if (currentBruteForceAttempt < currentQuestion.answers.length) {
    const answerIndex = currentBruteForceAttempt;
    const selectedButton = buttons[answerIndex];
    
    selectedButton.classList.add('selected');
   
    if (answerIndex === currentQuestion.correct) {
      selectedButton.classList.add('correct');
      score++;
      currentQuestionIndex++;
      currentBruteForceAttempt = 0;
      //console.log("selected answer: " + selectedButton.textContent);
      bruteForceTimeout = setTimeout(() => {
        loadQuestion();
      }, 500);
    } else {
      //console.log("selected answer: " + selectedButton.textContent);
      selectedButton.classList.add('incorrect');
      currentBruteForceAttempt++;
      bruteForceTimeout = setTimeout(() => {
        tryNextAnswer();
      }, 1000);
    }
  } else {
    resetQuiz();
  }
  if (currentQuestionIndex >= questions.length) {
    showQuizCompletion();
  }

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
  document.getElementById('contact-form').classList.add('hidden');
  //console.log("Quiz reset");
  loadQuestion();
}


function sendEmail(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const subject = "Message from Quiz App";
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
  
  window.location.href = `mailto:thibaultgt971@outlook.fr?subject=${encodeURIComponent(subject)}&body=${body}`;
}
document.getElementById('email-form').addEventListener('submit', sendEmail);
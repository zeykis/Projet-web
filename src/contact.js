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
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
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
  } else {
    quizContainer.innerHTML = `
      <h1 class="text-2xl font-bold mb-6">Quiz Completed!</h1>
      <p class="text-xl mb-6">Your score: ${score} out of ${questions.length}</p>
      <button onclick="location.reload()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
        Restart Quiz
      </button>
    `;
  }
}
function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(button => {
    button.disabled = true;
  });
  const selectedButton = buttons[selectedIndex];
  selectedButton.classList.add('selected');
  if (selectedIndex === currentQuestion.correct) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('incorrect');
    buttons[currentQuestion.correct].classList.add('correct');
  }
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 2000);
}
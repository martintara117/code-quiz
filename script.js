// DATA
const quiz = [
  {
    q: "Commonly used data types DO NOT include:",
    a: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correct: "3. alerts",
  },
  {
    q: "The condition is an if/else statement when enclosed within____.",
    a: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correct: "3. parentheses",
  },
  {
    q: "Arrays in JavaScript can be used to store____.",
    a: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correct: "4. all of the above",
  },
  {
    q:
      "String values must be enclosed within ____ when being assigned to variables.",
    a: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correct: "4. parentheses",
  },
  {
    q:
      "A very useful tool used during development and debugging for printing content to the debugger:",
    a: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    correct: "4. console.log",
  },
];

//SETTINGS
const delayBetweenQuestions = 1500; //2 seconds is 2000 milliseconds
const maxTime = 75; //in seconds
const timePenalty = 10; //seconds lost with wrong answer

//APPLICATION VARIABLES
var numberOfCorrectAnswers;
var currentQuestionIndex;
var timer; //an identifier for the setInterval function
var timeRemaining; //starts at maxTime then decrement by one every second

//DOM ELEMENTS
var questionSection = document.querySelector("main section:nth-of-type(2)");
var answerButtons = questionSection.querySelectorAll("button");
var timeOutput = document.querySelector(".timer"); //<button class="timer">Time Remaining: 0</button>

//SET EVENT LISTENERS/HANDLERS
//header button
document
  .querySelector("header button")
  .addEventListener("click", showHighScores);
//start game screen
document
  .querySelector("main section:nth-of-type(1) button")
  .addEventListener("click", startQuiz);
//game over screen
document
  .querySelector("main section:nth-of-type(3) button")
  .addEventListener("click", addToHighScore);
//high score screen
document
  .querySelector("main section:nth-of-type(4) button")
  .addEventListener("click", startQuiz);
for (let button of answerButtons) {
  //for-of loop (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
  button.addEventListener("click", handleAnswer);
}
//APPLICATION LOGIC

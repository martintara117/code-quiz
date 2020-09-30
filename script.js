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
function showHighScores() {
  //get highscores from localStorage
  let highscores = localStorage.getItem("highscores") || "";
  //process highscores string
  //ex: ABC:97,FRW:85,OUY:99
  let scores = highscores.split(","); //["ABC:97", "FRW:85", "OUY:99"]
  //sort highscores
  //display high scores
  let ol = document.querySelector("ol");
  if (!scores.length) {
    ol.innerHTML = "<li>No high scores yet.</li>";
  } else {
    let items = "";
    for (let score of scores) {
      items += "<li>" + score + "</li>";
    }
    ol.innerHTML = items;
  }
  //show the high scores <section>
  document.querySelector("main").className = "highScore";
}

function startQuiz() {
  //set app variables
  numberOfCorrectAnswers = 0;
  currentQuestionIndex = 0;
  timeRemaining = maxTime;
  //start timer
  startTimer();
  //put our question into the HTML <section>
  nextQuestion();
  //show the question <section>
  document.querySelector("main").className = "question";
}

function startTimer() {
  timer = setInterval(timerTick, 1000);
}

function timerTick() {
  //will run once every second while timer is active
  //if timeRemaining is zero (or less)
  if (timeRemaining <= 0) {
    timeRemaining = 0;
  }
  //show timeRemaining in the header
  timeOutput.textContent = "Time Remaining: " + timeRemaining + " seconds";
  //	end the quiz if timeRemaining is zero and stop the timer
  if (timeRemaining === 0) {
    clearInterval(timer);
    endGame();
  }
  //subtract one from timeRemaining
  else {
    timeRemaining--;
  }
}

function nextQuestion() {
  let question = quiz[currentQuestionIndex]; //get the current question from quiz array (by index)
  questionSection.querySelector("h1").textContent = question.q; //put the q property into the h1
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = question.a[i]; //put each possible answer into the buttons
  }
  questionSection.querySelector("footer").className = ""; //empty "" hide the footer
}

function handleAnswer(e) {
  //e is the event that came originally from the OS
  //e.currentTarget is the actual html <button> that was clicked
  //e.currentTarget.textContent is the text in that <button>
  //if the text in the clicked button matches the "correct" property of the current question...
  //	then the user answered correctly (otherwise, it's an incorrect answer)
  let userAnswer = e.currentTarget.textContent;
  let correctAnswer = quiz[currentQuestionIndex].correct;
  //right or wrong?
  if (userAnswer === correctAnswer) {
    //correct!
    //add one to correct answer count
    numberOfCorrectAnswers++;
    //set footer text
    questionSection.querySelector("footer").textContent = "Correct!";
  } else {
    //incorrect...
    //subtract from timeRemaining
    timeRemaining -= timePenalty;
    //set footer text
    questionSection.querySelector("footer").textContent = "Wrong :(";
  }
  //show footer
  questionSection.querySelector("footer").className = "answered";
  //add one to our question index
  currentQuestionIndex++; //move to next question
  //is there a next question?
  if (quiz[currentQuestionIndex]) {
    //if another question exists...
    //delay, then load next question
    setTimeout(nextQuestion, delayBetweenQuestions);
  } else {
    //no more questions...
    timeRemaining = 0;
    endGame();
  }
}

function endGame() {
  var correctPercentage = (numberOfCorrectAnswers * 100) / quiz.length;
  //insert score into <p> of third section
  document.querySelector(
    "main section:nth-of-type(3) p"
  ).textContent = `You scored ${correctPercentage}%!`;
  //change to finished <section>
  document.querySelector("main").className = "score";
}

function addToHighScore() {
  //get initials
  let initials = document
    .querySelector("main section:nth-of-type(3) input")
    .value.trim(); //trim() removes leading/trailing whitespace
  if (initials.length <= 2) return; //not enough characters
  initials = initials.slice(0, 3).toUpperCase(); //take only the first two characters, uppercase
  //get percentage
  let percentage = Math.floor((numberOfCorrectAnswers * 100) / quiz.length);
  //save in localStorage
  let highscores = localStorage.getItem("highscores") || "";
  if (highscores.length) highscores += ",";
  highscores += initials + ":" + percentage;
  localStorage.setItem("highscores", highscores);
  //go to high scores screen
  showHighScores();
}

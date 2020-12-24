$(document).ready(function () {
  // Select already existing elements
  var $body = $('body');

  // Create new HTML elements
  var $header = $('<header></header>');
  var $nav = $('<nav><ul class="nav-list" id="nav-list"><li class="nav-list-item" id="nav-list-about">About</li></ul></nav>');

  var $main = $('<main></main>');
  var $titleScreen = $('<section class="title-screen container" id="title-screen"></section>');
  var $mainTitle = $('<h1 class="title" id="main-title">What\'s Your Actual Sign?</h1>');
  var $mainDescription = $('<h2 class="description" id="main-description">Discover when you were supposed to be born</h2>');
  var $quizStartButton = $('<div class="button-container" id="quiz-start-button-container"><button class="button" id="quiz-start-button" value="Start">Start</button></div>');

  var $quizContainer = $('<section class="container" id="quiz-container"></section>');
  var $quiz = $('<form action=""></form>');
  var $quizSubmit = $('<div class="button-container" id="quiz-submit-button-container"><button class="button" id="quiz-submit-button" value="Submit">Submit</button></div>');

  // Create event handler functions
  var showQuiz = function () {
    $titleScreen.hide();
    // Quiz
    $quizContainer.appendTo($main);
    $quiz.appendTo($quizContainer);
    $quizSubmit.appendTo($quizContainer);
  };

  // Set event listeners (providing appropriate handlers as input)
  $quizStartButton.on('click', showQuiz);

  // Append new HTML elements to the DOM
  // Header
  $header.appendTo($body);
  $nav.appendTo($header);

  // Main
  $main.appendTo($body);
  // Title Screen
  $titleScreen.appendTo($main);
  $mainTitle.appendTo($titleScreen);
  $mainDescription.appendTo($titleScreen);
  $quizStartButton.appendTo($titleScreen);
});
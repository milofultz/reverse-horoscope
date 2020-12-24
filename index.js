$(document).ready(function () {
  // Select already existing elements
  var $body = $('body');

  // Create new HTML elements

  // Header
  var $header = $('<header></header>');
  var $nav = $('<nav><ul class="nav-list" id="nav-list"><li class="nav-list-item" id="nav-list-about">About</li></ul></nav>');
  // Main
  var $main = $('<main></main>');
  // Main:Title Screen
  var $titleScreen = $('<section class="title-screen container" id="title-screen"></section>');
  var $mainTitle = $('<h1 class="title" id="main-title">What\'s Your Actual Sign?</h1>');
  var $mainDescription = $('<h2 class="description" id="main-description">Discover when you were supposed to be born</h2>');
  var $quizStartButton = $('<div class="button-container" id="quiz-start-button-container"><button class="button" id="quiz-start-button" value="Start">Start</button></div>');
  // Main:Quiz
  var $quiz = $('<section class="container" id="quiz"></section>');
  var $quizForm = $('<form action="" id="quiz-form"></form>');
  var $quizSubmit = $('<div class="button-container" id="quiz-submit-button-container"><button class="button" id="quiz-submit-button" value="Submit">Submit</button></div>');
  // Main:Results
  var $results = $('<section class="container" id="results"></section>');
  var $resultsTitle = $('<h1 class="title" id="results-title">Your Real Sign Is {this}</h1>');
  var $resultsBirthday = $('<h2 class="description" id="results-birthday">Birthday: Month Day</h2>');
  var $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  var $resultsGraph = $('<div class="chart-container" id="chart-container"></div>');

  // Create event handler functions

  // Set event listeners (providing appropriate handlers as input)

  // Append new HTML elements to the DOM

  // Header
  $header.appendTo($body);
  $nav.appendTo($header);
  // Main
  $main.appendTo($body);
  // Main:Title Screen
  $titleScreen.appendTo($main);
  $mainTitle.appendTo($titleScreen);
  $mainDescription.appendTo($titleScreen);
  $quizStartButton.appendTo($titleScreen);
  // Main:Quiz
  $quiz.appendTo($main);
  $quizForm.appendTo($quiz);
  $quizSubmit.appendTo($quiz);
  // Main:Results
  $results.appendTo($main);
  $resultsTitle.appendTo($results);
  $resultsBirthday.appendTo($results);
  $$resultsConstellation.appendTo($results);
  $resultsGraph.appendTo($results);
});
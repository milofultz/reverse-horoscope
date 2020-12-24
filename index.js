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
  var $mainDescription = $('<h2 class="description" id="main-description">Discover when you should have been born</h2>');
  var $quizStartButton = $('<div class="button-container" id="quiz-start-button-container"><button class="button" id="quiz-start-button" value="Start">Start</button></div>');
  // Main:Quiz
  var $quiz = $('<section class="container" id="quiz"></section>');
  var $quizForm = $('<form action="" id="quiz-form"></form>'); // all q's dynamically generated
  var $quizSubmit = $('<div class="button-container" id="quiz-submit-button-container"><button class="button" id="quiz-submit-button" value="Submit">Submit</button></div>');
  // Main:Results
  var $results = $('<section class="container" id="results"></section>');
  var $resultsTitle = $('<h1 class="title" id="results-title">Your Real Sign Is {this}</h1>');
  var $resultsBirthday = $('<h2 class="description" id="results-birthday">Birthday: Month Day</h2>');
  var $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  var $resultsGraph = $('<div class="chart-container" id="chart-container"></div>');

  // Create event handler functions

  // Set event listeners (providing appropriate handlers as input)
  $quizStartButton.on('click', function (event) {
    // Pull a random horoscope from each sign
    // Generate all questions and give each question a unique ID for calculating later
      // var $quizQuestionHeader = $('<h3>Question # of 12</h3>')
      // var $quizText = $('<div class="quiz-text">Horoscope goes here</div>');
      // var $quizQuestion = $('<label for="test">How much does this sound like you?</label><input type="range" min="1" max="100" value="50" class="range-slider" id="test" name="test"></input>')
    // Shuffle their order
    // Display them all
    $titleScreen.toggle();
    $quiz.toggle();
  });

  $quizSubmit.on('click', function (event) {
    // Calculate results of test
      // Get all values of questions and put them in an object (real values)
      // get highest score
      // measure pull of both adjacent signs and set birthday from that
        // sum both adjacent numbers
        // get (before / sum) and (after / sum)
        // if before is bigger:
          // multiply (1 - (before / sum)) * days in the sign's period
        // if after:
          // multiply ((after / sum)) * days in the sign's period
        // Set birthday to day ^^ in period
      // get adjusted sign averages
        // for each sign
          // create a new prop (adjusted values)
          // add that sign's numbers to it
          // look at adjacent signs and add 10% of each to it
        // add total adjusted values together
        // for each sign
          // add prop for percent of sign's value against total adjusted values
    // Generate graph elements
    $quiz.toggle();
    $results.toggle();
  });

  // Append new HTML elements to the DOM

  // Hide later elements
  $quiz.toggle();
  $results.toggle();

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
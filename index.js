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
    $quizForm.html('');
    // Pull a random horoscope from each sign
    var quizHoroscopes = [];
    for (sign in horoscopesText) {
      var index = Math.floor(Math.random() * horoscopesText[sign].length);
      var signObj = {};
      signObj[sign] = horoscopesText[sign][index];
      quizHoroscopes.push(signObj);
    }
    // Shuffle their order
    quizHoroscopes = shuffleArray(quizHoroscopes);
    // Generate all questions and give each question a unique ID for calculating later
    for (var i = 0; i < quizHoroscopes.length; i++) {
      var number = i + 1
      var horoscopeText = Object.values(quizHoroscopes[i])[0];
      var horoscopeSign = Object.keys(quizHoroscopes[i])[0];
      var $questionContainer = $('<fieldset class="question-container"></fieldset>');
      var $questionHeader = $('<legend class="question-header" id="question-#-header">Question ' + number + ' of 12</legend>');
      var $questionText = $('<div class="question-text" id="question-' + number + '-text"></div>');
      $questionText.text(horoscopeText);
      var $questionInput = $('<label for="question-' + number + '">How much does this sound like you?</label><input type="range" min="1" max="100" value="50" data-sign="' + horoscopeSign + '" class="range-slider" id="question-' + number + '" name="question-' + number + '"></input>')
      $questionContainer.appendTo($quizForm);
      $questionHeader.appendTo($questionContainer);
      $questionText.appendTo($questionContainer);
      $questionInput.appendTo($questionContainer);
    }
    // Display them all
    $titleScreen.toggle();
    $quiz.toggle();
  });

  $quizSubmit.on('click', function (event) {
    // Get all values of questions and put them in an object (real values)
    var $quizInputs = $quizForm.find('input');
    var quizAnswers = {};
    for (var i = 0; i < $quizInputs.length; i++) {
      var number = i + 1;
      var $question = $('#question-' + number);
      var questionSign = $question[0].dataset.sign;
      var questionScore = parseInt($question.val());
      quizAnswers[questionSign] = questionScore;
    }
    // get highest score
    console.log(quizAnswers);
    var winner = '';
    var highestScore = 0;
    for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
      if (quizAnswers[horoscopeSignsOrdered[i]] > highestScore) {
        winner = horoscopeSignsOrdered[i];
        highestScore = quizAnswers[horoscopeSignsOrdered[i]];
      }
    }
    console.log(winner, highestScore);
    // measure pull of both adjacent signs and set birthday from that
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

  var shuffleArray = function (array) {
    var endIndex, hold, index;
    for (index = array.length - 1; index > 0; index--) {
        endIndex = Math.floor(Math.random() * (index + 1));
        hold = array[index];
        array[index] = array[endIndex];
        array[endIndex] = hold;
    }
    return array;
}

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
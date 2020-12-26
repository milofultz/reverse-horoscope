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
  var $resultsTitle = $('<h1 class="title" id="results-title"></h1>');
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
    var scores = getScores();
    // Generate graph elements
    $resultsTitle.text('Your Real Sign Is ' + scores.winner);
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

  var getScores = function () {
    // Get answers
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
    var winner = '';
    var highestScore = 0;
    for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
      if (quizAnswers[horoscopeSignsOrdered[i]] > highestScore) {
        winner = horoscopeSignsOrdered[i];
        highestScore = quizAnswers[horoscopeSignsOrdered[i]];
      }
    }
    // get adjusted averages by adding some of adjacent signs
    var adjustedScores = {};
    for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
      var sign = horoscopeSignsOrdered[i];
      adjustedScores[sign] = quizAnswers[sign];
      var previous = horoscopeSignsOrdered[Math.abs((i - 1) % 12)];
      var next = horoscopeSignsOrdered[(i + 1) % 12];
      adjustedScores[sign] += 0.1 * quizAnswers[previous];
      adjustedScores[sign] += 0.1 * quizAnswers[next];
    }
    // get scores in percent
    var totalScores = Object.values(adjustedScores).reduce(function (total, el) {
      return total + el;
    });
    var resultsInPercent = {};
    var remainingPercentages = {};
    for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
      var sign = horoscopeSignsOrdered[i];
      var percent = (adjustedScores[sign] / totalScores) * 100;
      resultsInPercent[sign] = Math.floor(percent);
      remainingPercentages[sign] = percent - resultsInPercent[sign];
    }
    var difference = 100 - Object.values(resultsInPercent).reduce(function (total, el) {
      return total + el;
    });
    var localRemainingPercentages = JSON.parse(JSON.stringify(remainingPercentages));
    while (difference > 0) {
      var highestSign = '';
      var highestNum = 0;
      for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
        var sign = horoscopeSignsOrdered[i];
        if (localRemainingPercentages[sign] > highestNum) {
          highestSign = sign;
          highestNum = remainingPercentages[sign];
        }
      }
      delete localRemainingPercentages[highestSign];
      resultsInPercent[highestSign]++;
      difference--;
    }

    var scores = {};
    scores.winner = winner;
    scores.percentResults = resultsInPercent;
    return scores;
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
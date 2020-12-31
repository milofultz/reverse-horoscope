$(document).ready(function () {
  // Select already existing elements
  var $body = $('body');

  // Create new HTML elements

  // Header
  var $header = $('<header></header>');
  var $nav = $('<nav class="text-right navbar" id="navbar"><ul class="nav-list" id="nav-list"><li class="nav-list-item" id="nav-list-about">About</li></ul></nav>');
  // Main
  var $main = $('<main></main>');
  // Main:Title Screen
  var $titleScreen = $('<section class="container title-screen text-center" id="title-screen"></section>');
  var $mainTitle = $('<h1 class="title" id="main-title">What\'s Your<br>Actual Sign?</h1>');
  var $mainDescription = $('<h2 class="description" id="main-description">Discover when you should have been born</h2>');
  var $quizStartButton = $('<div class="button" id="quiz-start-button">Start</div>');
  // Main:Quiz
  var $quiz = $('<section class="container" id="quiz"></section>');
  var $quizForm = $('<form action="" id="quiz-form"></form>'); // all q's dynamically generated
  var $quizSubmit = $('<div class="button" id="quiz-submit-button">Submit</div>').toggle();
  // Main:Results
  var $results = $('<section class="container" id="results"></section>');
  var $resultsTitle = $('<h1 class="title" id="results-title"></h1>');
  var $resultsBirthday = $('<h2 class="description" id="results-birthday"></h2>');
  var $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  var $resultsGraph = $('<div class="chart-container" id="chart-container"></div>');
  var $resultsCtaButtons = $('<div class="cta-container" id="results-cta-buttons"></div>');
  var $tryAgainButton = $('<div class="button" id="try-again-button">Try Again</div>');
  var $shareButton = $('<div class="button" id="share-button">Share</div>');

  // Create event handler functions

  var startQuiz = function () {
    $results.hide();
    $quizForm.html('');

    var questions = generateQuestions();
    var addNextQuestionToQuiz = makeQuizQuestionManager(questions);
    addNextQuestionToQuiz();

    var $nextButton = $('<div class="button next-question" id="next-question">Next</div>');
    $nextButton.on('click', addNextQuestionToQuiz);
    $nextButton.appendTo($quiz);

    $titleScreen.toggle();
    $quiz.toggle();
  };

  var submitQuiz = function () {
    var scores = getScores();
    var birthday = makeBirthday(scores.winner, scores.percentResults);
    // Generate graph elements

    $resultsTitle.text('Your Real Sign Is ' + scores.winner + '!');
    $resultsBirthday.text('You should have been born on ' +
                          getMonthName(birthday.getMonth()) + ' ' +
                          birthday.getDate() + '.');
    // Append graph elements

    $quiz.toggle();
    $results.toggle();
  };

  var generateQuestions = function () {
    horoscopes = shuffleArray(getRandomHoroscopes());
    questions = [];
    for (var i = 0; i < horoscopes.length; i++) {
      var number = i + 1
      var horoscope = Object.values(horoscopes[i])[0];
      var sign = Object.keys(horoscopes[i])[0];
      var $questionContainer = $('<fieldset class="question-container" id="question-' + number + '"></fieldset>');
      var $questionHeader = $('<legend id="question-' + number + '-legend">Question ' + number + ' of 12</legend><h3 class="question-header text-center" id="question-' + number + 'header">' + number + ' / 12</h3>');
      var $questionText = $('<div class="question-text" id="question-' + number + '-text"></div>');
      $questionText.text(horoscope);
      var $questionInput = $('<div class="input-container"><label class="question-label text-center" for="question-' + number + '">How much does this resonate with you today?</label><br><input type="range" min="1" max="100" data-sign="' + sign + '" class="range-slider" id="question-' + number + '-answer" name="question-' + number + '"></input></div>')
      $questionHeader.appendTo($questionContainer);
      $questionText.appendTo($questionContainer);
      $questionInput.appendTo($questionContainer);
      questions.push($questionContainer);
    }

    return questions;
  };

  var getRandomHoroscopes = function () {
    var quizHoroscopes = [];
    for (sign in horoscopesText) {
      var index = Math.floor(Math.random() * horoscopesText[sign].length);
      var signObj = {};
      signObj[sign] = horoscopesText[sign][index];
      quizHoroscopes.push(signObj);
    }
    return quizHoroscopes;
  };

  var shuffleArray = function (array) {
    var endIndex, hold, index;
    for (index = array.length - 1; index > 0; index--) {
        endIndex = Math.floor(Math.random() * (index + 1));
        hold = array[index];
        array[index] = array[endIndex];
        array[endIndex] = hold;
    }
    return array;
  };

  var makeQuizQuestionManager = function (questions) {
    return function () {
      $('#question-' + (12 - questions.length)).hide();
      questions.shift().prependTo($quizForm);
      if (questions.length === 0) {
        $('#next-question').hide();
        $quizSubmit.show();
      }
    }
  };

  var getScores = function () {
    // Get answers
    var $quizInputs = $quizForm.find('input');
    var quizAnswers = {};
    for (var i = 0; i < $quizInputs.length; i++) {
      var number = i + 1;
      var $question = $('#question-' + number + '-answer');
      var questionSign = $question[0].dataset.sign;
      var questionScore = parseInt($question.val());
      quizAnswers[questionSign] = questionScore;
    }
    // get highest score
    var winner = '';
    var highestScore = 0;
    Object.keys(quizAnswers).forEach(function (el) {
      if (quizAnswers[el] > highestScore) {
        winner = el;
        highestScore = quizAnswers[el];
      }
    });
    // get adjusted averages by adding adjacent signs
    var adjustedScores = {};
    for (var i = 0; i < horoscopeSignsOrdered.length; i++) {
      var sign = horoscopeSignsOrdered[i];
      var lastSign = horoscopeSignsOrdered[(12 + i - 1) % 12];
      var nextSign = horoscopeSignsOrdered[(i + 1) % 12];
      adjustedScores[sign] = quizAnswers[sign] +
                             0.1 * quizAnswers[lastSign] +
                             0.1 * quizAnswers[nextSign];
    }
    // get scores in percent
    var totalScores = Object.values(adjustedScores).reduce(getSum);
    var resultsInPercent = {};
    var remainingPercentages = [];
    for (sign in adjustedScores) {
      var percent = (adjustedScores[sign] / totalScores) * 100;
      resultsInPercent[sign] = Math.floor(percent);
      var remaining = {};
      remaining[sign] = percent - resultsInPercent[sign];
      remainingPercentages.push(remaining);
    }
    var difference = 100 - Object.values(resultsInPercent).reduce(getSum);
    remainingPercentages.sort(function (a, b) {
      return Object.values(a)[0] - Object.values(b)[0];
    });
    for (var i = 0; i < difference; i++) {
      var sign = Object.keys(remainingPercentages)[i];
      resultsInPercent[sign]++;
    }

    var scores = {};
    scores.winner = winner;
    scores.percentResults = resultsInPercent;
    return scores;
  };

  var getSum = function (a, b) {
    return a + b;
  };

  var makeBirthday = function (sign, percents) {
    var midpoint = new Date(ms=((horoscopeDates[sign].end - horoscopeDates[sign].start) / 2)).getTime();
    var signIndex = horoscopeSignsOrdered.indexOf(sign);
    var lastSign = horoscopeSignsOrdered[(12 + signIndex - 1) % 12];
    var nextSign = horoscopeSignsOrdered[(signIndex + 1) % 12];
    if (percents[lastSign] > percents[nextSign]) {
      var offset = midpoint - ((1/percents[lastSign]) * midpoint);
    } else {
      var offset = midpoint + (1/percents[nextSign]) * midpoint;
    }
    // set birthday to start + adjustment
    var birthday = new Date(ms=(horoscopeDates[sign]['start'].getTime() + offset));
    return birthday;
  };

  var getMonthName = function(num) {
    var months = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ];
    return months[num];
  };

  // Set event listeners (providing appropriate handlers as input)

  $quizStartButton.on('click', startQuiz);
  $quizSubmit.on('click', submitQuiz);
  $tryAgainButton.on('click', startQuiz);

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
  $resultsConstellation.appendTo($results);
  $resultsGraph.appendTo($results);
  $resultsCtaButtons.appendTo($results);
  $tryAgainButton.appendTo($resultsCtaButtons);
  $shareButton.appendTo($resultsCtaButtons);
});
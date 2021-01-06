$(document).ready(function () {
  // Select already existing elements
  var $body = $('body');

  // Create new HTML elements

  // Header
  var $header = $('<header></header>');
  var $nav = $('<nav class="text-right navbar" id="navbar"></nav>');
  var $navList = $('<ul class="nav-list" id="nav-list"></ul>');
  var $navListAbout = $('<li class="nav-list-item" id="nav-list-about">About</li>');
  // Main
  var $main = $('<main></main>');
  // Main:Title Screen
  var $titleScreen = $('<section class="container title-screen text-center" id="title-screen"></section>');
  var $mainTitle = $('<h1 class="title" id="main-title">What\'s Your Actual Sign?</h1>');
  var $mainDescription = $('<span class="description" id="main-description">Discover when you should have been born</span>');
  var $quizStartButton = $('<div class="button" id="quiz-start-button">Start</div>');
  // Main:Quiz
  var $quiz = $('<section class="container" id="quiz"></section>');
  var $quizForm = $('<form action="" id="quiz-form"></form>'); // all q's dynamically generated
  var $quizSubmit = $('<div class="button" id="quiz-submit-button">Submit</div>').hide();
  // Main:Results
  var $results = $('<section class="container text-center" id="results"></section>');
  var $resultsTitle = $('<h1 class="title" id="results-title"></h1>');
  var $resultsBirthday = $('<span class="description" id="results-birthday"></span>');
  var $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  var $resultsChart = $('<div class="chart-container" id="chart-container"></div>');
  var $resultsCtaButtons = $('<div class="cta-container" id="results-cta-buttons"></div>');
  var $tryAgainButton = $('<div class="button" id="try-again-button">Try Again</div>');
  var $shareButton = $('<div class="button" id="share-button">Share</div>');

  // Create event handler functions

  var startQuiz = function () {
    $results.animate({ opacity: '0'}, 350, function () {
      $results.hide();
      $quiz.show().animate({ opacity: '1'}, 350)
      $quizForm.html('');
    });

    var addNextQuestionToQuiz = makeQuizQuestionManager(generateQuestions());
    var $nextButton = $('<div class="button next-question" id="next-question">Next</div>');
    $nextButton.on('click', addNextQuestionToQuiz);

    $titleScreen.animate({ opacity: '0' }, 350, function () {
      $titleScreen.hide();
      $quiz.show();
      addNextQuestionToQuiz();
      $nextButton.css('opacity', '0').appendTo($quiz).animate({ opacity: '1' }, 350);
    });
  };

  var submitQuiz = function () {
    var scores = getScores();
    var birthday = makeBirthday(scores.winner, scores.percentResults);

    $resultsTitle.text('Your Real Sign Is ' + scores.winner + '!');
    $resultsBirthday.text('You should have been born on ' + getMonthName(birthday.getMonth()) + ' ' + birthday.getDate() + '.');
    makeResultsChart(scores.percentResults);

    $quiz.animate({ opacity: '0'}, 350, function () {
      $quiz.hide();
      $quizSubmit.hide();
      $results.show().animate({ opacity: '1'}, 350);
    });
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
    // make a copy to not modify input array
    questions = questions.slice();

    var showQuestion = function ($q) {
      $q.css({ opacity: '0' }).show()
      $q.animate({ opacity: '1' }, 350);
    };
    var hideQuestionAndShowNext = function ($q, $next) {
      $q.animate({ opacity: '0' }, 350, function () {
        $(this).hide()
        showQuestion($next);
      });
    };

    return function () {
      var $currentQuestion = $('#question-' + (12 - questions.length));
      var $nextQuestion = questions.shift();
      $nextQuestion.hide().prependTo($quizForm);

      if ($currentQuestion[0] === undefined) {
        showQuestion($nextQuestion);
      } else {
        hideQuestionAndShowNext($currentQuestion, $nextQuestion);
      }

      if (questions.length === 0) {
        $('#next-question').remove();
        $quizSubmit.show();
      }
    };
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
    for (key in quizAnswers) {
      if (quizAnswers[key] > highestScore) {
        winner = key;
        highestScore = quizAnswers[key];
      }
    };
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
      var sign = Object.keys(remainingPercentages[i])[0];
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

  var makeResultsChart = function (signPercentages) {
    var $table = $('<table class="results-chart charts-css column hide-data show-labels data-spacing-2" id="results-chart"></table>');
    var $caption = $('<caption>Quiz Results</caption>');
    $caption.appendTo($table);

    var $header = $('<thead></thead>');
    var $headerRow = $('<tr></tr>');
    var $headerColSign = $('<th scope="col">Sign</tr>').hide();
    var $headerColPercent = $('<th scope="col">Percentage</tr>').hide();
    $headerColSign.appendTo($headerRow);
    $headerColPercent.appendTo($headerRow);
    $headerRow.appendTo($table);

    var $body = $('<tbody></tbody>');
    var maxScore = Object.values(signPercentages).reduce(function (highest, current) {
      return highest > current ? highest : current;
    });
    console.log(maxScore);
    for (sign in signPercentages) {
      var $bodyRow = $('<tr></tr>');
      var $bodyColSign = $('<th scope="row" class="chart-sign">' + sign + '</th>');
      var $bodyColPercentage = $('<td style="--size: calc(' + signPercentages[sign] + ' / ' + maxScore + ')">' + signPercentages[sign] + '</td>');
      $bodyColSign.appendTo($bodyRow);
      $bodyColPercentage.appendTo($bodyRow);
      $bodyRow.appendTo($body);
    }

    $body.appendTo($table);
    $table.appendTo($resultsChart);
  }

  // Set event listeners (providing appropriate handlers as input)

  $quizStartButton.on('click', startQuiz);
  $quizSubmit.on('click', submitQuiz);
  $tryAgainButton.on('click', startQuiz);
  $navListAbout.hover(function () {
    $(this).html('<a href="http://www.github.com/milofultz" target="_blank">Made by Milo Fultz</a>')
  }, function () {
    $(this).text('About');
  })

  // Append new HTML elements to the DOM

  // Hide later elements
  $quiz.toggle();
  $results.toggle();

  // Header
  $header.appendTo($body);
  $nav.appendTo($header);
  $navList.appendTo($nav);
  $navListAbout.appendTo($navList);
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
  $resultsChart.appendTo($results);
  $resultsCtaButtons.appendTo($results);
  $tryAgainButton.appendTo($resultsCtaButtons);
  $shareButton.appendTo($resultsCtaButtons);
});
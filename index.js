$(document).ready(function () {
  var $body = $('body');

  var $header = $('<header></header>');
  var $nav = $('<nav class="text-right navbar" id="navbar"></nav>');
  var $navList = $('<ul class="nav-list" id="nav-list"></ul>');
  var $navListAbout = $('<li class="nav-list-item" id="nav-list-about"><img src="./assets/GitHub-Mark-Light-32px.png"></li>');

  var $main = $('<main></main>');

  var $titleScreen = $('<section class="container title-screen text-center" id="title-screen"></section>');
  var $mainTitle = $('<h1 class="title" id="main-title">What\'s Your Actual Sign?</h1>');
  var $mainDescription = $('<span class="description" id="main-description">Discover when you should have been born</span>');
  var $quizStartButton = $('<div class="button" id="quiz-start-button">Start</div>');

  var $quiz = $('<section class="container" id="quiz"></section>');
  var $quizForm = $('<form action="" id="quiz-form"></form>'); // all q's dynamically generated
  var $quizSubmit = $('<div class="button" id="quiz-submit-button">Submit</div>').hide();

  var $results = $('<section class="container text-center" id="results"></section>');
  var $resultsTitle = $('<h1 class="title" id="results-title"></h1>');
  var $resultsBirthday = $('<span class="description" id="results-birthday"></span>');
  var $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  var $resultsChart = $('<div class="chart-container" id="chart-container"></div>');
  var $resultsCtaButtons = $('<div class="cta-container" id="results-cta-buttons"></div>');
  var $tryAgainButton = $('<div class="button" id="try-again-button">Try Again</div>');
  var $shareButton = $('<div class="button" id="share-button">Share</div>');

  /* --------------------
  Event Handler Functions
  -------------------- */

  var getMaxValue = function (obj) {
    return Object.values(obj).reduce(function (highest, current) {
      return highest > current ? highest : current;
    });
  };

  var sumAllValues = function (obj) {
    return Object.values(obj).reduce(function (a, b) {
      return a + b;
    });
  };

  var getMonthName = function(num) {
    var months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[num];
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

  var generateQuestions = function () {
    var horoscopes = shuffleArray(getRandomHoroscopes());
    var questions = [];
    for (var i = 0; i < horoscopes.length; i++) {
      var sign = Object.keys(horoscopes[i])[0];
      var horoscope = Object.values(horoscopes[i])[0];

      var number = i + 1
      var $questionContainer = $('<fieldset class="question-container" id="question-' + number + '"></fieldset>');
      var $questionHeader = $('<legend id="question-' + number + '-legend">Question ' + number + ' of 12</legend><h3 class="question-header text-center" id="question-' + number + 'header">' + number + ' / 12</h3>');
      var $questionText = $('<div class="question-text" id="question-' + number + '-text"></div>');
      $questionText.text(horoscope);
      var $questionInput = $('<div class="input-container"><label class="question-label text-center" for="question-' + number + '">How much does this resonate with you today?</label><br><input type="range" min="1" max="100" data-sign="' + sign + '" class="range-slider" id="question-' + number + '-answer" name="question-' + number + '"></input></div>');

      $questionHeader.appendTo($questionContainer);
      $questionText.appendTo($questionContainer);
      $questionInput.appendTo($questionContainer);
      questions.push($questionContainer);
    }
    return questions;
  };

  var makeQuizQuestionManager = function (questions) {
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
        $('#next-question').animate({ opacity: '0' }, 350, function () {
          if (questions.length === 0) {
            // Change `next` button to `submit`
            $('#next-question').remove();
            $quizSubmit.css('opacity', '0').show();
            $quizSubmit.animate({ opacity: '1' }, 350);
          } else {
            $('#next-question').animate({ opacity: '1' }, 350);
          }
        });
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
    var totalScores = sumAllValues(adjustedScores);
    var resultsInPercent = {};
    var remainingPercentages = [];
    for (sign in adjustedScores) {
      var percent = (adjustedScores[sign] / totalScores) * 100;
      resultsInPercent[sign] = Math.floor(percent);
      var remaining = {};
      remaining[sign] = percent - resultsInPercent[sign];
      remainingPercentages.push(remaining);
    }
    var difference = 100 - sumAllValues(resultsInPercent);
    remainingPercentages.sort(function (a, b) {
      return Object.values(a)[0] - Object.values(b)[0];
    });
    for (var i = 0; i < difference; i++) {
      var sign = Object.keys(remainingPercentages[i])[0];
      resultsInPercent[sign]++;
    }
    // get highest score
    var winner = '';
    var highestScore = 0;
    for (key in resultsInPercent) {
      if (resultsInPercent[key] > highestScore) {
        winner = key;
        highestScore = resultsInPercent[key];
      }
    };

    return { winner: winner, resultsInPercent: resultsInPercent };
  };

  var makeBirthday = function (sign, percents) {
    var signIndex = horoscopeSignsOrdered.indexOf(sign);
    var lastSign = horoscopeSignsOrdered[(12 + signIndex - 1) % 12];
    var nextSign = horoscopeSignsOrdered[(signIndex + 1) % 12];
    var maxScore = getMaxValue(percents);
    var midpoint = new Date(ms=((horoscopeDates[sign].end - horoscopeDates[sign].start) / 2)).getTime();
    var offset = midpoint - ((percents[lastSign]/maxScore) * midpoint) + ((percents[nextSign]/maxScore) * midpoint);
    // set birthday to start + adjustment
    return new Date(ms=(horoscopeDates[sign]['start'].getTime() + offset));
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
    var maxScore = getMaxValue(signPercentages);

    for (sign in signPercentages) {
      var $bodyRow = $('<tr></tr>');
      var $bodyColSign = $('<th scope="row" class="chart-sign">' + sign + '</th>');
      var graphPercent = Math.round(signPercentages[sign] / maxScore) === 0 ? (signPercentages[sign] / maxScore) + 1 / maxScore : (signPercentages[sign] / maxScore);
      var $bodyColPercentage = $('<td style="--size: calc(' + graphPercent + ')">' + signPercentages[sign] + '</td>');
      $bodyColSign.appendTo($bodyRow);
      $bodyColPercentage.appendTo($bodyRow);
      $bodyRow.appendTo($body);
    }

    $body.appendTo($table);
    $table.appendTo($resultsChart);
  };

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
    $resultsChart.html('');

    var scores = getScores();
    var birthday = makeBirthday(scores.winner, scores.resultsInPercent);

    $resultsTitle.text('Your Real Sign Is ' + scores.winner + '!');
    $resultsBirthday.text('You should have been born on ' + getMonthName(birthday.getMonth()) + ' ' + birthday.getDate());
    makeResultsChart(scores.resultsInPercent);

    $quiz.animate({ opacity: '0'}, 350, function () {
      $quiz.hide();
      $quizSubmit.hide();
      $results.show().animate({ opacity: '1'}, 350);
    });
  };

  /* ------------
  Event Listeners
  ------------ */

  $quizStartButton.on('click', startQuiz);
  $quizSubmit.on('click', submitQuiz);
  $tryAgainButton.on('click', startQuiz);

  /* -------------------
  Appending DOM Elements
  ------------------- */

  // Show only title screen
  $quiz.hide();
  $results.hide();

  $header.appendTo($body);
  $nav.appendTo($header);
  $navList.appendTo($nav);
  $navListAbout.appendTo($navList);

  $main.appendTo($body);

  $titleScreen.appendTo($main);
  $mainTitle.appendTo($titleScreen);
  $mainDescription.appendTo($titleScreen);
  $quizStartButton.appendTo($titleScreen);

  $quiz.appendTo($main);
  $quizForm.appendTo($quiz);
  $quizSubmit.appendTo($quiz);

  $results.appendTo($main);
  $resultsTitle.appendTo($results);
  $resultsBirthday.appendTo($results);
  $resultsConstellation.appendTo($results);
  $resultsChart.appendTo($results);
  $resultsCtaButtons.appendTo($results);
  $tryAgainButton.appendTo($resultsCtaButtons);
  $shareButton.appendTo($resultsCtaButtons);
});
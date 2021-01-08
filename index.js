$(document).ready(function () {
  const $body = $('body');

  const $header = $('<header></header>');
  const $nav = $('<nav class="text-right navbar" id="navbar"></nav>');
  const $navList = $('<ul class="nav-list" id="nav-list"></ul>');
  const $navListAbout = $('<li class="nav-list-item" id="nav-list-about"><a href="http://www.github.com/milofultz"><img src="./assets/GitHub-Mark-Light-32px.png"></a></li>');

  const $main = $('<main></main>');

  const $titleScreen = $('<section class="container title-screen text-center" id="title-screen"></section>');
  const $mainTitle = $('<h1 class="title" id="main-title">What\'s Your Actual Sign?</h1>');
  const $mainDescription = $('<span class="description" id="main-description">Discover when you should have been born</span>');
  const $quizStartButton = $('<div class="button" id="quiz-start-button">Start</div>');

  const $quiz = $('<section class="container" id="quiz"></section>');
  const $quizForm = $('<form action="" id="quiz-form"></form>'); // all q's dynamically generated
  const $quizSubmit = $('<div class="button" id="quiz-submit-button">Submit</div>').hide();

  const $results = $('<section class="container text-center" id="results"></section>');
  const $resultsTitle = $('<h1 class="title" id="results-title"></h1>');
  const $resultsBirthday = $('<span class="description" id="results-birthday"></span>');
  const $resultsConstellation = $('<img src="" class="constellation" id="results-constellation" />');
  const $resultsChart = $('<div class="chart-container" id="chart-container"></div>');
  const $resultsCtaButtons = $('<div class="cta-container" id="results-cta-buttons"></div>');
  const $tryAgainButton = $('<div class="button" id="try-again-button">Try Again</div>');
  const $shareButton = $('<div class="button" id="share-button">Share</div>');

  /* --------------------
  Event Handler Functions
  -------------------- */

  const getMaxValue = function (obj) {
    return Object.values(obj).reduce(function (highest, current) {
      return highest > current ? highest : current;
    });
  };

  const sumAllValues = function (obj) {
    return Object.values(obj).reduce(function (a, b) {
      return a + b;
    });
  };

  const getMonthName = function(num) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[num];
  };

  const shuffleArray = function (array) {
    let endIndex, hold, index;
    for (let index = array.length - 1; index > 0; index--) {
        endIndex = Math.floor(Math.random() * (index + 1));
        hold = array[index];
        array[index] = array[endIndex];
        array[endIndex] = hold;
    }
    return array;
  };

  const getRandomHoroscopes = function () {
    const quizHoroscopes = [];
    for (let sign in horoscopesText) {
      const index = Math.floor(Math.random() * horoscopesText[sign].length);
      const signObj = {};
      signObj[sign] = horoscopesText[sign][index];
      quizHoroscopes.push(signObj);
    }
    return quizHoroscopes;
  };

  const generateQuestions = function () {
    const horoscopes = shuffleArray(getRandomHoroscopes());
    const questions = [];
    for (let i = 0; i < horoscopes.length; i++) {
      const sign = Object.keys(horoscopes[i])[0];
      const horoscope = Object.values(horoscopes[i])[0];

      const number = i + 1
      const $questionContainer = $('<fieldset class="question-container" id="question-' + number + '"></fieldset>');
      const $questionHeader = $('<legend id="question-' + number + '-legend">Question ' + number + ' of 12</legend><h3 class="question-header text-center" id="question-' + number + 'header">' + number + ' / 12</h3>');
      const $questionText = $('<div class="question-text" id="question-' + number + '-text"></div>');
      $questionText.text(horoscope);
      const $questionInput = $('<div class="input-container"><label class="question-label text-center" for="question-' + number + '">How much does this resonate with you today?</label><br><input type="range" min="1" max="100" data-sign="' + sign + '" class="range-slider" id="question-' + number + '-answer" name="question-' + number + '"></input></div>');

      $questionHeader.appendTo($questionContainer);
      $questionText.appendTo($questionContainer);
      $questionInput.appendTo($questionContainer);
      questions.push($questionContainer);
    }
    return questions;
  };

  const makeQuizQuestionManager = function (questions) {
    questions = questions.slice();

    const showQuestion = function ($q) {
      $q.css({ opacity: '0' }).show()
      $q.animate({ opacity: '1' }, 350);
    };
    const hideQuestionAndShowNext = function ($q, $next) {
      $q.animate({ opacity: '0' }, 350, function () {
        $(this).hide()
        showQuestion($next);
      });
    };

    return function () {
      const $currentQuestion = $('#question-' + (12 - questions.length));
      const $nextQuestion = questions.shift();
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

  const getScores = function () {
    // Get answers
    const $quizInputs = $quizForm.find('input');
    const quizAnswers = {};
    for (let i = 0; i < $quizInputs.length; i++) {
      const number = i + 1;
      const $question = $('#question-' + number + '-answer');
      const questionSign = $question[0].dataset.sign;
      const questionScore = parseInt($question.val());
      quizAnswers[questionSign] = questionScore;
    }
    // get adjusted averages by adding adjacent signs
    const adjustedScores = {};
    for (let i = 0; i < horoscopeSignsOrdered.length; i++) {
      const sign = horoscopeSignsOrdered[i];
      const lastSign = horoscopeSignsOrdered[(12 + i - 1) % 12];
      const nextSign = horoscopeSignsOrdered[(i + 1) % 12];
      adjustedScores[sign] = quizAnswers[sign] +
                             0.1 * quizAnswers[lastSign] +
                             0.1 * quizAnswers[nextSign];
    }
    // get scores in percent
    const totalScores = sumAllValues(adjustedScores);
    const resultsInPercent = {};
    const remainingPercentages = [];
    for (let sign in adjustedScores) {
      const percent = (adjustedScores[sign] / totalScores) * 100;
      resultsInPercent[sign] = Math.floor(percent);
      const remaining = {};
      remaining[sign] = percent - resultsInPercent[sign];
      remainingPercentages.push(remaining);
    }
    const difference = 100 - sumAllValues(resultsInPercent);
    remainingPercentages.sort(function (a, b) {
      return Object.values(a)[0] - Object.values(b)[0];
    });
    for (let i = 0; i < difference; i++) {
      const sign = Object.keys(remainingPercentages[i])[0];
      resultsInPercent[sign]++;
    }
    // get highest score
    let winner = '';
    let highestScore = 0;
    for (let key in resultsInPercent) {
      if (resultsInPercent[key] > highestScore) {
        winner = key;
        highestScore = resultsInPercent[key];
      }
    };

    return { winner: winner, resultsInPercent: resultsInPercent };
  };

  const makeBirthday = function (sign, percents) {
    const signIndex = horoscopeSignsOrdered.indexOf(sign);
    const lastSign = horoscopeSignsOrdered[(12 + signIndex - 1) % 12];
    const nextSign = horoscopeSignsOrdered[(signIndex + 1) % 12];
    const maxScore = getMaxValue(percents);
    const midpoint = new Date(ms=((horoscopeDates[sign].end - horoscopeDates[sign].start) / 2)).getTime();
    const offset = midpoint - ((percents[lastSign]/maxScore) * midpoint) + ((percents[nextSign]/maxScore) * midpoint);
    // set birthday to start + adjustment
    return new Date(ms=(horoscopeDates[sign]['start'].getTime() + offset));
  };

  const makeResultsChart = function (signPercentages) {
    const $table = $('<table class="results-chart charts-css column hide-data show-labels data-spacing-2" id="results-chart"></table>');
    const $caption = $('<caption>Quiz Results</caption>');
    $caption.appendTo($table);

    const $header = $('<thead></thead>');
    const $headerRow = $('<tr></tr>');
    const $headerColSign = $('<th scope="col">Sign</tr>').hide();
    const $headerColPercent = $('<th scope="col">Percentage</tr>').hide();
    $headerColSign.appendTo($headerRow);
    $headerColPercent.appendTo($headerRow);
    $headerRow.appendTo($table);

    const $body = $('<tbody></tbody>');
    const maxScore = getMaxValue(signPercentages);

    for (let sign in signPercentages) {
      const $bodyRow = $('<tr></tr>');
      const $bodyColSign = $('<th scope="row" class="chart-sign">' + sign + '</th>');
      const graphPercent = Math.round(signPercentages[sign] / maxScore) === 0 ? (signPercentages[sign] / maxScore) + 1 / maxScore : (signPercentages[sign] / maxScore);
      const $bodyColPercentage = $('<td style="--size: calc(' + graphPercent + ')">' + signPercentages[sign] + '</td>');
      $bodyColSign.appendTo($bodyRow);
      $bodyColPercentage.appendTo($bodyRow);
      $bodyRow.appendTo($body);
    }

    $body.appendTo($table);
    $table.appendTo($resultsChart);
  };

  const startQuiz = function () {
    $results.animate({ opacity: '0'}, 350, function () {
      $results.hide();
      $quiz.show().animate({ opacity: '1'}, 350)
      $quizForm.html('');
    });

    const addNextQuestionToQuiz = makeQuizQuestionManager(generateQuestions());
    const $nextButton = $('<div class="button next-question" id="next-question">Next</div>');
    $nextButton.on('click', addNextQuestionToQuiz);

    $titleScreen.animate({ opacity: '0' }, 350, function () {
      $titleScreen.hide();
      $quiz.show();
      addNextQuestionToQuiz();
      $nextButton.css('opacity', '0').appendTo($quiz).animate({ opacity: '1' }, 350);
    });
  };

  const submitQuiz = function () {
    $resultsChart.html('');

    const scores = getScores();
    const birthday = makeBirthday(scores.winner, scores.resultsInPercent);

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
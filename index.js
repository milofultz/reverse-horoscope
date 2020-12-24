$(document).ready(function () {
  // Select already existing elements
  var $body = $('body');

  // Create new HTML elements
  var $header = $('<header></header>');
  var $nav = $('<nav><ul class="nav-list" id="nav-list"><li class="nav-list-item" id="nav-list-about">About</li></ul></nav>');

  // Create event handler functions

  // Set event listeners (providing appropriate handlers as input)

  // Append new HTML elements to the DOM
  $header.appendTo($body);
  $nav.appendTo($header);
});
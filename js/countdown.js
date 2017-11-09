(function() {
  'use strict';

  var END_DATE = new Date('2017-11-14 14:00Z');
  var ONE_SECOND = 1000;
  var ONE_MINUTE = ONE_SECOND * 60;
  var ONE_HOUR = ONE_MINUTE * 60;
  var ONE_DAY = ONE_HOUR * 24;
  var thunderclapElement = document.querySelector('#thunderclap-container');
  var tweetsElement = document.querySelector('#tweets-container');

  function count() {
    var today = new Date();
    var distance = END_DATE - today;
    if (distance <= 0) {
        clearInterval(interval);
        tweetsElement.classList.remove('hidden');
        thunderclapElement.classList.add('hidden');
        return;
    }
  }

  var interval = setInterval(function() {
    count();
  }, 1000);

  count();
})();

window.addEventListener('DOMContentLoaded', function() {
  registerLanguageChangeListener();
  changeLanguageToRequestedIfNecessary();

  document.l10n.ready.then(updateTweets);
});

function registerLanguageChangeListener() {
  var languageDropdown = document.querySelector('#language-dropdown');
  languageDropdown.addEventListener('change', function(event) {
    document.l10n.requestLanguages([event.target.value]);
    window.location.search = '?lang=' + event.target.value;
  });
}

function changeLanguageToRequestedIfNecessary() {
  var preferredLanguage = getParameterByName('lang');
  if (preferredLanguage) {
    document.l10n.requestLanguages([preferredLanguage]);
    var languageDropdown = document.querySelector('#language-dropdown');
    languageDropdown.value = preferredLanguage;
  }
}

function updateTweets() {
  const url = 'https%3A%2F%2Fmzl.la%2Fnewfirefox';

  const officialTweet = document.querySelector('#official-tweet');
  const tweetId = document.querySelector('#official-tweet-id').textContent;
  officialTweet.href = 'https://twitter.com/intent/retweet?tweet_id=' + tweetId;

  const tweet1 = document.querySelector('[data-l10n-id="tweet-1"]');
  const link1 = document.querySelector('#tweet-link1');
  link1.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet1.textContent) + ' ' + url;

  const tweet2 = document.querySelector('[data-l10n-id="tweet-2"]');
  const link2 = document.querySelector('#tweet-link2');
  link2.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet2.textContent) + ' ' + url;

  const tweet3 = document.querySelector('[data-l10n-id="tweet-3"]');
  const link3 = document.querySelector('#tweet-link3');
  link3.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet3.textContent) + ' ' + url;
}

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

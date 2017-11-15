window.addEventListener('DOMContentLoaded', function() {
  registerLanguageChangeListener();
  changeLanguageToRequestedIfNecessary();

  document.l10n.ready.then(updateTweets);
  document.querySelector('html').addEventListener('DOMRetranslated', updateTweets);
});

function registerLanguageChangeListener() {
  var languageDropdown = document.querySelector('#language-dropdown');
  languageDropdown.addEventListener('change', function(event) {
    document.l10n.requestLanguages([event.target.value]);
    window.location.hash = '?lang=' + event.target.value;
    document.l10n.ready.then(updateTweets);
  });
}

function changeLanguageToRequestedIfNecessary() {
  var preferredLanguage = getHashByName('lang');
  if (preferredLanguage) {
    document.l10n.requestLanguages([preferredLanguage]);
    var languageDropdown = document.querySelector('#language-dropdown');
    languageDropdown.value = preferredLanguage;
    document.l10n.ready.then(updateTweets);
  }
}

function updateTweets() {
  var thunderclap = document.querySelector('#thunderclap');
  var thunderclapLink = document.querySelector('#thunderclap-link').textContent;
  thunderclap.href = thunderclapLink;

  var officialTweet = document.querySelector('#official-tweet');
  var tweetId = document.querySelector('#official-tweet-id').textContent;
  if (tweetId !== 'tbd') {
    officialTweet.href = 'https://twitter.com/intent/retweet?tweet_id=' + tweetId;
    officialTweet.classList.remove('hidden');
  } else {
    officialTweet.classList.add('hidden');
  }

  var tweet1 = document.querySelector('[data-l10n-id="tweet-1"]');
  var link1 = document.querySelector('#tweet-link1');
  link1.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet1.textContent);

  var tweet2 = document.querySelector('[data-l10n-id="tweet-2"]');
  var link2 = document.querySelector('#tweet-link2');
  link2.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet2.textContent);

  var tweet3 = document.querySelector('[data-l10n-id="tweet-3"]');
  var link3 = document.querySelector('#tweet-link3');
  link3.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet3.textContent);

  var tweetOwn = document.querySelector('#own-tweet');
  var hashtag = document.querySelector('#hashtag').textContent;
  tweetOwn.href = tweetOwn.href + encodeURIComponent(hashtag);
}

function getHashByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

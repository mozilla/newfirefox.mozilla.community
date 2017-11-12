window.addEventListener('DOMContentLoaded', function() {
  registerLanguageChangeListener();
  changeLanguageToRequestedIfNecessary();

  document.l10n.ready.then(updateTweets);
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
  // It seems that the document.10n.ready doesn't quite work with putting the translated
  // string into the thunderclap-link placeholder, so we read it out too early and
  // displayed the wrong link. This is a HACK for now, can't guarantee 300ms will be enough.
  // FIXME: is there any event?
  setTimeout(function() {
    const thunderclap = document.querySelector('#thunderclap');
    const thunderclapLink = document.querySelector('#thunderclap-link').textContent;
    thunderclap.href = thunderclapLink;

    const officialTweet = document.querySelector('#official-tweet');
    const tweetId = document.querySelector('#official-tweet-id').textContent;
    officialTweet.href = 'https://twitter.com/intent/retweet?tweet_id=' + tweetId;

    const tweet1 = document.querySelector('[data-l10n-id="tweet-1"]');
    const link1 = document.querySelector('#tweet-link1');
    link1.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet1.textContent);

    const tweet2 = document.querySelector('[data-l10n-id="tweet-2"]');
    const link2 = document.querySelector('#tweet-link2');
    link2.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet2.textContent);

    const tweet3 = document.querySelector('[data-l10n-id="tweet-3"]');
    const link3 = document.querySelector('#tweet-link3');
    link3.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet3.textContent);

    const tweetOwn = document.querySelector('#own-tweet');
    const hashtag = document.querySelector('#hashtag').textContent;
    tweetOwn.href = tweetOwn.href + encodeURIComponent(hashtag);
  }, 300);
}

function getHashByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

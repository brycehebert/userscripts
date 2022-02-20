// ==UserScript==
// @name        Remove Shorts
// @description Remove the Shorts category in side navbar of YouTube
// @namespace   https://www.github.com/brycehebert/userscripts
// @version     1.0.0
// @match       https://*.youtube.com/*
// @run-at      document-idle
// @updateURL   https://raw.githubusercontent.com/brycehebert/userscripts/master/youtube/remove-shorts.user.js

// ==/UserScript==

const check = (changes, observer) => {
  let element = target.querySelector(`[title="Shorts"]`);
  if (element) {
    element.parentNode.remove();
    observer.disconnect();
  }
}

const target = document.getElementById("guide-content");

new MutationObserver(check).observe(target, { childList: true, subtree: true });
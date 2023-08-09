// Inject sheets-injected
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('sheets-injected.js');
(document.head || document.documentElement).prepend(injectedScript);
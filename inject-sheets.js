const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('script-sheets.js');
(document.head || document.documentElement).prepend(injectedScript);
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('script-docs.js');
(document.head || document.documentElement).prepend(injectedScript);
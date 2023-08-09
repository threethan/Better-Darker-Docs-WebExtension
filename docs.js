// Inject docs-injected
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('docs-injected.js');
(document.head || document.documentElement).prepend(injectedScript);

// Refresh page on change of cleartype setting
// otherwise, document would disappear when changing that setting
var lastEnableSubpixel;
function checkOptions() {

    function checkSubpixel(result) {
        let newEnableSubpixel = result.subpixel == null ? true : result.subpixel;
        if (lastEnableSubpixel == null) lastEnableSubpixel = newEnableSubpixel;
        else if (lastEnableSubpixel != newEnableSubpixel) location.reload();
    }

    let spgetting = browser.storage.sync.get("subpixel");
    spgetting.then(checkSubpixel, onError);
}
checkOptions();

function onError(error) {
    console.log(`BDD Options Error: ${error}`);
}
browser.storage.onChanged.addListener(checkOptions);
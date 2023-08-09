function updateDarkMode() {
    let invert = enableAlwaysDarkMode || (enableAutoDarkMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (invert) document.documentElement.classList.add("bdd-dark");
    else document.documentElement.classList.remove("bdd-dark");
}

function updateOptions() {
    function setSubpixel(result) {
        enableSubpixel = result.subpixel == null ? true : result.subpixel;

        // Set all canvases to be opaque. May cause layout issues
        var canvases = document.getElementsByTagName('canvas');
        for (var i = 0; i < canvases.length; i++) {
            if (enableSubpixel) canvases[i].setAttribute("moz-opaque", "true");
        }
        if (enableSubpixel) document.documentElement.classList.add("bdd-subpixel");
        else document.documentElement.classList.remove("bdd-subpixel");
    }

    function setDarkmode(result) {
        let dm = result.darkmode || "auto";
        enableAutoDarkMode   = dm == "auto";
        enableAlwaysDarkMode = dm == "always";
        updateDarkMode()
    }

    let spgetting = browser.storage.sync.get("subpixel");
    spgetting.then(setSubpixel, onError);

    let dmgetting = browser.storage.sync.get("darkmode");
    dmgetting.then(setDarkmode, onError);
}
updateOptions();


function onError(error) {
    console.log(`BDD Options Error: ${error}`);
}
browser.storage.onChanged.addListener(updateOptions);

const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
darkModePreference.addEventListener("change", e => e.matches && updateDarkMode());
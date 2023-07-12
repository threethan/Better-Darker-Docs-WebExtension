const enableAutoDarkMode = true;
const enableSubpixel = true;

(function () {
    'use strict';


    var invert
    var clearColor

    invert = enableAutoDarkMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function updateDarkMode(isDark) {
        invert = isDark
        clearColor = invert ? '#0D0D0F' : 'white';
    }
    // Set black text to white if in dark mode
    if (enableAutoDarkMode) {
        CanvasRenderingContext2D.prototype.fillText = function (orig) {
            return function (type) {
                var prevFillStyle = this.fillStyle;
                if (invert && prevFillStyle == "#000000") this.fillStyle = 'white';
                var out = orig.apply(this, arguments);
                this.fillStyle = prevFillStyle;
                return out
            }
        }(CanvasRenderingContext2D.prototype.fillText)
    }
    updateDarkMode(invert);

    // Listen for changes
    if (enableAutoDarkMode) {
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", function (e) {
            const colorScheme = e.matches ? "dark" : "light";

            if (colorScheme === "dark") {
                updateDarkMode(true)
            } else {
                updateDarkMode(false)
            }
        });
    }
    // Set all canvases to be opaque. May cause layout issues
    if (enableSubpixel) {
        var canvases = document.getElementsByTagName('canvas');
        for (var i = 0; i < canvases.length; i++) {
            canvases[i].setAttribute("moz-opaque", "true");
        }
    }

    // Fix clearrect to work correctly with opaque canvases
    CanvasRenderingContext2D.prototype.clearRect = function (orig) {
        return function (type) {
            var prevFillStyle = this.fillStyle;

            this.fillStyle = clearColor;

            var out = this.fillRect(...arguments);
            this.fillStyle = prevFillStyle;

            return out;
        }
    }(CanvasRenderingContext2D.prototype.clearRect)

    // Look for new canvases
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                if (mutation.addedNodes[i].nodeName == "CANVAS") {
                    mutation.addedNodes[i].setAttribute("moz-opaque", "true");
                }
            }
        })

    });
    observer.observe(document, {
        subtree: true,
        childList: true
    });

})();
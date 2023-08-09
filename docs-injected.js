(function () {
    'use strict';

    var clearColor

    function checkInvert() {
        let invert = document.documentElement.classList.contains("bdd-dark")
        console.log(invert)
        clearColor = invert ? '#0D0D0F' : 'white';
        return invert;
    }
    // Set black text to white if in dark mode
    CanvasRenderingContext2D.prototype.fillText = function (orig) {
        return function (type) {
            var prevFillStyle = this.fillStyle;
            if (checkInvert() && prevFillStyle == "#000000") this.fillStyle = 'white';
            var out = orig.apply(this, arguments);
            this.fillStyle = prevFillStyle;
            return out
        }
    }(CanvasRenderingContext2D.prototype.fillText)

    // Fix clearrect to work correctly with opaque canvases
    CanvasRenderingContext2D.prototype.clearRect = function (orig) {
        return function (type) {
            var prevFillStyle = this.fillStyle;

            checkInvert();
            this.fillStyle = clearColor;

            var out = this.fillRect(...arguments);
            this.fillStyle = prevFillStyle;

            return out;
        }
    }(CanvasRenderingContext2D.prototype.clearRect)

    // Look for new canvases
    var observer = new MutationObserver(function (mutations) {
        let enableSubpixel = document.documentElement.classList.contains("bdd-subpixel");
        if (enableSubpixel) {
            var canvases = document.getElementsByTagName('canvas');

            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].nodeName == "CANVAS") {
                        canvases[i].setAttribute("moz-opaque", "true");
                    }
                }
            })
        }
    });
    observer.observe(document, {
        subtree: true,
        childList: true
    });


})();
// ==UserScript==
// @name         WaybackMachine DeviantArt remove mature blur (kind of)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes the mature blur on DeviantArt posts saved in the WaybackMachine. Sadly the image wont be at full quality, because it only archives the thumbnails of mature posts
// @author       You
// @match        https://web.archive.org/web/*/https://www.deviantart.com/*/art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=archive.org
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    setInterval((e) => {
        let imageDiv = document.querySelector('div[style^="background-image"]');
        if (!imageDiv) return;
        imageDiv.className = imageDiv.className.split(" ")[0];
        for (let e of imageDiv.parentElement.parentElement.childNodes) {
            if (e != imageDiv.parentElement) {
                e.remove();
                let styles = " div::before {  display:none;} ";
                let styleSheet = document.createElement("style");
                styleSheet.innerText = styles;
                styleSheet.id = "removeAgeRestriction";
                document.body.append(styleSheet);
            }
        }
    }, 100);
})();

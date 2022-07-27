// ==UserScript==
// @name         WaybackMachine DeviantArt remove mature blur (kind of)
// @version      1.2
// @description  Removes the blur on mature DeviantArt posts saved in the WaybackMachine.
// @author       Creepler13
// @match        https://web.archive.org/web/*/https://www.deviantart.com/*/art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=archive.org
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function () {
    "use strict";

    setInterval((e) => {
        fixImage();
        fixText();
    }, 100);
})();

function fixText() {
    if (!window.__INITIAL_STATE__)
        for (let script of document.querySelectorAll("script")) {
            if (script.textContent.trim().startsWith("window.__BASEURL")) {
                eval(script.textContent);
                let deviation = window.__INITIAL_STATE__["@@entities"].deviation;
                deviation = deviation[Object.keys(deviation)[0]];

                console.log(deviation.textContent.html.markup)
                let state = Draft.convertFromRaw(JSON.parse(deviation.textContent.html.markup));
                console.log(state);

                let editorState = Draft.EditorState.createWithContent(state);

                let elem = React.createElement(Draft.Editor, { editorState: editorState,readOnly:true }, null);
                ReactDOM.render(elem,document.querySelectorAll("section")[1])


              }
        }
}

function fixImage() {
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
}

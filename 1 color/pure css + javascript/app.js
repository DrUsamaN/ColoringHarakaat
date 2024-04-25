"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorHarakaat = void 0;

// The way this function works is that it will first draw the text with all harakaat in red
// Then a black text is put on top of that and all harakaat that should have colors are removed from
// that black text so that we can see the red layer below instead for those harakaat.
function colorHarakaat(textRed, indexesToColorRed) {
    
    // Define the pattern for harakah (Arabic diacritics)
    var harakahPattern = /[\u064B-\u065F\u0610-\u061A]/g;
    
    // Initialize removed count, set to 1 so that the first harakah is gien index 1
    var removedCount = 1;
    
    // To have colored harakaat, the text that's most on top (black) needs to be missing those harakaat so that
    // lower layers can be seen for those harakaat.
    const textBlack = textRed.replace(harakahPattern, function (match, offset) {
        if (indexesToColorRed.indexOf(removedCount) !== -1) {
            removedCount++;
            return '';
        }
        removedCount++;
        return match;
    });
    
    // Generate the HTML string
    // The colored layers shouldn't contain any html other than the one this code chooses, so other html code
    // is removed by using ".replace(/<[^>]*>?/gm". The upper most layer can have html to change colors of letters
    const html = `
        <div style="position: relative;">
            <span style="z-index: 0; color: #EF4444; font-size: 1.5rem;">${textRed.replace(/<[^>]*>?/gm, '')}</span>
            <span style="z-index: 10; position: absolute; top: 0; left: 0; font-size: 1.5rem;">${textBlack}</span>
        </div>
    `;
    
    // Return the HTML string
    return html;
}

exports.colorHarakaat = colorHarakaat;

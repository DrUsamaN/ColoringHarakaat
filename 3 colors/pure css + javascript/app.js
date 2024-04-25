"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorHarakaat = void 0;

// The way this function works is that it will first draw the text with all harakaat in red
// Then on top of that it draws the same text again but in yellow but some harakaat are removed from the
// yellow text so that the red harakah in red from the layer below can be seen instead.
// Then a blue layer is adder on top and it needs to have the harakaat we wanted to see in blue or yellow
// removed from it so that we can see the layers below it for those harakaat.
// Then finally a black text is put on top of that and all harakaat that should have colors are removed from
// that black text so that we can see the colored layers below instead for those harakaat.
// So in summary we have a layer for each text color and if we want to see a harakah in a color then the
// harakah is removed from every layer above that specific layer.
function colorHarakaat(textRed, indexesToColorRed, indexesToColorYellow, indexesToColorBlue) {
    
    // Define the pattern for harakah (Arabic diacritics)
    var harakahPattern = /[\u064B-\u065F\u0610-\u061A]/g;
    
    // If we want to show red harakaat we have to remove the chosen harakaat from the black, the blue and the yellow text
    // So we need to add every harakah index from the "indexesToColorRed" to "indexesToColorBlue" and "indexesToColorYellow"
    indexesToColorRed.forEach(function (index) {
        if (indexesToColorBlue.indexOf(index) === -1) {
            indexesToColorBlue.push(index);
        }
    });
    
    indexesToColorRed.forEach(function (index) {
        if (indexesToColorYellow.indexOf(index) === -1) {
            indexesToColorYellow.push(index);
        }
    });
    
    // Likewise if we want yellow harakaat we want to remove the chosen harakaat from the black and the blue text
    // So we need to add every harakah index from the "indexesToColorYellow" to "indexesToColorBlue"
    indexesToColorYellow.forEach(function (index) {
        if (indexesToColorBlue.indexOf(index) === -1) {
            indexesToColorBlue.push(index);
        }
    });
    
    // Initialize removed count, set to 1 so that the first harakah is gien index 1
    var removedCount = 1;
    
    // To have red harakaat, the yellow text needs to be missing those harakaat so that the lower red layer can be seen at those places.
    const textYellow = textRed.replace(harakahPattern, function (match, offset) {
        if (indexesToColorRed.indexOf(removedCount) !== -1) {
            removedCount++;
            return '';
        }
        removedCount++;
        return match;
    });
    
    // Reinitialize removed count again to 1
    removedCount = 1;
    
    // To have colored harakaat other than blue, the blue text needs to be missing those harakaat so that lower layers
    // (red and yellow) can be seen. Remember that "indexesToColorYellow" also has all indexes of "indexesToColorRed"
    const textBlue = textRed.replace(harakahPattern, function (match, offset) {
        if (indexesToColorYellow.indexOf(removedCount) !== -1) {
            removedCount++;
            return '';
        }
        removedCount++;
        return match;
    });
    
    // Reinitialize removed count again
    removedCount = 1;
    
    // To have colored harakaat, the text that's most on top (black) needs to be missing those harakaat so that
    // lower layers can be seen for those harakaat. Remember that "indexesToColorBlue" also has all indexes of
    // "indexesToColorYellow" and of "indexesToColorRed" because we added them to "indexesToColorBlue" via code.
    const textBlack = textRed.replace(harakahPattern, function (match, offset) {
        if (indexesToColorBlue.indexOf(removedCount) !== -1) {
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
            <span style="z-index: 5; position: absolute; top: 0; left: 0; color: #F59E0B; font-size: 1.5rem;">${textYellow.replace(/<[^>]*>?/gm, '')}</span>
            <span style="z-index: 7; position: absolute; top: 0; left: 0; color: #3B82F6; font-size: 1.5rem;">${textBlue.replace(/<[^>]*>?/gm, '')}</span>
            <span style="z-index: 10; position: absolute; top: 0; left: 0; font-size: 1.5rem;">${textBlack}</span>
        </div>
    `;
    
    // Return the HTML string
    return html;
}

exports.colorHarakaat = colorHarakaat;

// The way this function works is that it will first draw the text with all harakaat in red
// Then on top of that it draws the same text again but in yellow but some harakaat are removed from the
// yellow text so that the red harakah in red from the layer below can be seen instead.
// Then a blue layer is adder on top and it needs to have the harakaat we wanted to see in blue or yellow
// removed from it so that we can see the layers below it for those harakaat.
// Then finally a black text is put on top of that and all harakaat that should have colors are removed from
// that black text so that we can see the colored layers below instead for those harakaat.
// So in summary we have a layer for each text color and if we want to see a harakah in a color then the
// harakah is removed from every layer above that specific layer.
export function colorHarakaat(textRed: string, indexesToColorRed: number[], indexesToColorYellow: number[], indexesToColorBlue: number[]): string {
    
    // Define the pattern for harakah (Arabic diacritics)
    const harakahPattern = /[\u064B-\u065F\u0610-\u061A]/g;
    
    // If we want to show red harakaat we have to remove the chosen harakaat from the black, the blue and the yellow text
    // So we need to add every harakah index from the "indexesToColorRed" to "indexesToColorBlue" and "indexesToColorYellow"
    indexesToColorRed.forEach(index => {
        if (indexesToColorBlue.indexOf(index) === -1) {
            indexesToColorBlue.push(index);
        }
    });
    
    indexesToColorYellow.forEach(index => {
        if (indexesToColorBlue.indexOf(index) === -1) {
            indexesToColorBlue.push(index);
        }
    });
    
    // Likewise if we want yellow harakaat we want to remove the chosen harakaat from the black and the blue text
    // So we need to add every harakah index from the "indexesToColorYellow" to "indexesToColorBlue"
    indexesToColorRed.forEach(index => {
        if (indexesToColorYellow.indexOf(index) === -1) {
            indexesToColorYellow.push(index);
        }
    });

    // Initialize removed count, set to 1 so that the first harakah is gien index 1
    let removedCount = 1;

    // To have red harakaat, the yellow text needs to be missing those harakaat so that the lower red layer can be seen at those places.
    const textYellow = textRed.replace(harakahPattern, (match, offset) => {
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
    const textBlue = textRed.replace(harakahPattern, (match, offset) => {
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
    const textBlack = textRed.replace(harakahPattern, (match, offset) => {
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
        <div class="relative">
            <span class="z-0 text-red-500 text-2xl">${textRed.replace(/<[^>]*>?/gm, '')}</span>
            <span class="z-5 absolute top-0 left-0 text-yellow-500 text-2xl">${textYellow.replace(/<[^>]*>?/gm, '')}</span>
            <span class="z-7 absolute top-0 left-0 text-blue-500 text-2xl">${textBlue.replace(/<[^>]*>?/gm, '')}</span>
            <span class="z-10 absolute top-0 left-0 text-2xl">${textBlack}</span>
        </div>
    `;

    // Return the HTML string
    return html;
}
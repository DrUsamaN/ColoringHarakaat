# ColoringHarakaat
Basic functions to color the harakaat ( tashkeel ) in html text.  

You might be thinking "Well why not just put the harakah in a span with css styling that colors the harakah?"  
The answer is that while the harakah will indeed be colored in firefox, it won't get any color on chrome. This is because chrome makes the harakah always have the same color as the letter it is associated with.  
I also tried making a color font (both COLRv1 and OpenType-SVG) to sole that issue but chrome still forced the harakah to have the same color as the letter it is associated with.  

I came accross an idea of using layers to fix the issue and decided I'll make some functions that do exactly that.  

Now if you look at the files for this project I have made this work for either just 1 color or for 3 different colors of harakaat. For the letters you can easily just put them in a span with css styling to change their color as I did in these examples to color the word "نص". For coloring the harakaat, the examples call the function like this:  
    colorHarakaat(textWithHarakaat,[1,4]) // That will color the first and 4th harakah in red.  

In each of the 2 folders ("1 color" and "3 colors") I have shown 3 different ways of using my code:  
- with normal ("pure") css and javascript, that's the easiest way of course.  
- with tailwind css and javascript for those that prefer tailwind over pure css  
- with tailwind and typescript for those that prefer typescript over javascript  

I recommend everyone who wants to understand the code just goes to the 1 color folder first and goes to the subfolder he prefers. It's easier to understand a function that just adds 1 color rather than 3 of course. Once you understand it you can go to the "3 colors" folder and choose the subfolder you prefer and look at that code. I added lots of comments to make the process as easy as I can.  

For real use I would always recommend the 3 colors code. If you use the 3 colors code but only wanna use 1 color you can leave the lists for the others empty:  
    colorHarakaat(textWithHarakaat,[7], [], []) // This will only color the 7th harakah red  
    colorHarakaat(textWithHarakaat,[7], [3], []) // This will color the 7th harakah red and the 3rd yellow  
    colorHarakaat(textWithHarakaat,[7], [3], [8]) // This will color the 7th harakah red, the 3rd yellow and the 8th blue  
    colorHarakaat(textWithHarakaat,[], [], [8]) // This will color the 8th harakah blue 

In the "pure css + javascript" and the "tailwind + javascript" subfolders, the "app.js" file is manually made.  
In the "tailwind + typescript" subfolders, the "app.ts" file is manually made and then the "app.js" is made automatically by running "tsc app.ts" in a terminal. Make sure you have typescript installed via "sudo npm install -g typescript" before trying to run the tsc command.  

"use strict";

var Scene = {
    canvas : undefined,
    canvasContext : undefined,
	mouseSprite: undefined
};

// global variables to be used later in the program
var timeNow;
var timeDiff;
var timeStart;
var yOffset;


Scene.start = function () {
	// Get the canvas and it's context.
    Scene.canvas = document.getElementById("myCanvas");
    Scene.canvasContext = Scene.canvas.getContext("2d");
	
	// Setup the images to be displayed that have associated Objects
    Scene.mouseSprite = mouse;
    Scene.background= background;
    Scene.catSprite = cat;
    Scene.cheese = cheese;
    Scene.ending = ending;
	
    // Attach the image to be used for the sprite.
    // either directly or through its associated Object
	Scene.mouseSprite.img = new Image();
    Scene.mouseSprite.img.src = Scene.mouseSprite.src;
    Scene.background.img=new Image();
    Scene.background.img.src= Scene.background.src;
    Scene.catSprite.img = new Image();
    Scene.catSprite.img.src=Scene.catSprite.src;
    Scene.ending.img = new Image();
    Scene.ending.img.src = Scene.ending.src; // image property of Warner Bros
    Scene.cheese = new Image();
    Scene.cheese.src = "smallCheese.png";
    Scene.mouseWant= new Image();
    Scene.mouseWant.src='mouseWant.png';
    Scene.mouseGet = new Image();
    Scene.mouseGet.src='mouseGet.png';
    Scene.evilCat = new Image();
    Scene.evilCat.src='evilCat.png';
    Scene.cage = new Image();
    Scene.cage.src='cage.png';

    // original vertical position of the cage image
    yOffset = -100;

    // draw living room background image and cheese
    Scene.canvasContext.drawImage(Scene.background.img,Scene.background.frames[Scene.background.frame].frame.x,Scene.background.frames[Scene.background.frame].frame.y,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h,0,0,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h);
    Scene.canvasContext.drawImage(Scene.cheese, 820, 400);

    // make the width of the canvas the same as the window
    Scene.canvas.width = window.innerWidth;
	
    // Wait till the mouse image is loaded before starting the animation.
    //Set the original horizontal position of the mouse
    // determine the start time of the animation which will be referenced throughout the program
	Scene.mouseSprite.img.onload = function() {		
        Scene.mouseSprite.offset=-Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w;
        timeStart = new Date().getTime();
    	Scene.mainLoop();
    }
    //Set the original horizontal position of the cat
    Scene.catSprite.img.onload=function(){
        Scene.catSprite.offset=-Scene.catSprite.frames[Scene.catSprite.frame].frame.w;
    }
};

// Once the basic HTML document is loaded and its parsing has taken place, start the scene.
document.addEventListener( 'DOMContentLoaded', Scene.start);

Scene.clearCanvas = function () {
    Scene.canvas.width = window.innerWidth;
    // towards the end of the animation, draw a black background on the canvas
    // along with an ending image
    if(timeDiff>10000){
        Scene.canvasContext.fillStyle='black';
        Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
        Scene.canvasContext.drawImage(Scene.ending.img,0.5 * Scene.canvas.width - 0.5 * Scene.ending.frames[0].frame.w , 0.5 * Scene.canvas.height - 0.5 * Scene.ending.frames[0].frame.h,Scene.ending.frames[0].frame.w,Scene.ending.frames[0].frame.h);
	Scene.canvasContext.fillStyle="gray";
	Scene.canvasContext.fillText("Image Property of Warner Bros", 800, 400);
    } // otherwise draw the living room background and the cheese images
    else {
        Scene.canvasContext.drawImage(Scene.background.img,Scene.background.frames[Scene.background.frame].frame.x,Scene.background.frames[Scene.background.frame].frame.y,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h,0,0,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h);
        Scene.canvasContext.drawImage(Scene.cheese, 820, 400);
    }
};

Scene.mainLoop = function() {
    Scene.clearCanvas();
    Scene.update();
    Scene.draw();
	// Animate at 18 frames a second.
    window.setTimeout(Scene.mainLoop, 1000 /18);
};

Scene.update = function () {
    //use current time stamp to calculate timing since beginning of animation
    //used to time each component of the animation
    timeNow = new Date().getTime();
    timeDiff = timeNow-timeStart;

    // Set the location of the mouse's next frame during the time it moves across screen  
    if (Scene.mouseSprite.offset<650 && (timeDiff<820 || timeDiff>5500))        
        Scene.mouseSprite.offset+=18;
    
    // Set the location of the cat's next frme during the time it moves across the screen
    if(timeDiff>5500 && timeDiff<7000)
        Scene.catSprite.offset+=18;

    // Once the mouse is in place, bring the cage downwards until reaches the ground
    if(timeDiff>7000 && yOffset<265)
        yOffset+=18;
};

Scene.draw = function () {
    if(timeDiff<10000){
        // drawing mouse and advancing frame
        // At the end of the sprite sheet, start at the first frame.
        Scene.canvasContext.drawImage(Scene.mouseSprite.img,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.x,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.y,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.h,Scene.mouseSprite.offset,400,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.h);
        if (Scene.mouseSprite.offset<650 && (timeDiff<820 || timeDiff>5500) && Scene.mouseSprite.frame+1==Scene.mouseSprite.frames.length){
            Scene.mouseSprite.frame=0; 
        }else if (Scene.mouseSprite.offset<650 && (timeDiff<820 || timeDiff>5500)){
            Scene.mouseSprite.frame++;
        }

        //drawing mouse Speech bubble 1 & 2 consecutively while mouse is still
        if(Scene.mouseSprite.offset>100 && timeDiff<3500){
            Scene.canvasContext.drawImage(Scene.mouseWant, 200, 350);
        } else if (timeDiff>3500 && timeDiff<5500){
            Scene.canvasContext.drawImage(Scene.mouseGet, 200, 350);
        }
        
        //drawing cat and advancing frame
        // At the end of the sprite sheet, start at the first frame.
        Scene.canvasContext.drawImage(Scene.catSprite.img,Scene.catSprite.frames[Scene.catSprite.frame].frame.x,Scene.catSprite.frames[Scene.catSprite.frame].frame.y,Scene.catSprite.frames[Scene.catSprite.frame].frame.w,Scene.catSprite.frames[Scene.catSprite.frame].frame.h,Scene.catSprite.offset,300,Scene.catSprite.frames[Scene.catSprite.frame].frame.w,Scene.catSprite.frames[Scene.catSprite.frame].frame.h);
        if(timeDiff>5500 && timeDiff<7000 && Scene.catSprite.frame+1==Scene.catSprite.frames.length ){
            Scene.catSprite.frame=0;
        }else if (timeDiff>5500 && timeDiff<7000){
            Scene.catSprite.frame++; 
        }

        // draw cat speech bubble while cat is still
        if(timeDiff>7900 && timeDiff<10000)
            Scene.canvasContext.drawImage(Scene.evilCat, 375, 300);
        
        //drawing cage
        Scene.canvasContext.drawImage(Scene.cage, 650, yOffset);
    }
    
    // once the animation has reached its end, reload the window
    // allowing animation to begin again and loop continously
    if(timeDiff>13000)
        window.location.reload(true);
};


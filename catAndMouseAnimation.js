"use strict";

var Scene = {
    canvas : undefined,
    canvasContext : undefined,
	mouseSprite: undefined
};
var timeNow;
var timeDiff;
var timeStart;
var yOffset;

Scene.start = function () {
	// Get the canvas and it's context.
    Scene.canvas = document.getElementById("myCanvas");
    Scene.canvasContext = Scene.canvas.getContext("2d");
	
	// Seup the mouse to be displayed.
    Scene.mouseSprite = mouse;
    Scene.background= background;
    Scene.catSprite = cat;
    Scene.cheese = cheese;
    Scene.ending = ending;
	
	// Attach the image to be used for the sprite.
	Scene.mouseSprite.img = new Image();
    Scene.mouseSprite.img.src = Scene.mouseSprite.src;

    Scene.background.img=new Image();
    Scene.background.img.src= Scene.background.src;

    Scene.catSprite.img = new Image();
    Scene.catSprite.img.src=Scene.catSprite.src;

    Scene.cheese.img = new Image();
    Scene.cheese.img.src = Scene.cheese.src;

    Scene.mouseWant= new Image();
    Scene.mouseWant.src='mouseWant.png';

    Scene.mouseGet = new Image();
    Scene.mouseGet.src='mouseGet.png';

    Scene.evilCat = new Image();
    Scene.evilCat.src='evilCat.png';

    Scene.ending.img = new Image();
    Scene.ending.img.src = Scene.ending.src;

    Scene.cage = new Image();
    Scene.cage.src='cage.png';

    yOffset = -100;

    Scene.canvasContext.drawImage(Scene.background.img,Scene.background.frames[Scene.background.frame].frame.x,Scene.background.frames[Scene.background.frame].frame.y,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h,0,0,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h);
    Scene.canvasContext.drawImage(Scene.cheese.img,Scene.cheese.frames[Scene.cheese.frame].frame.x,Scene.cheese.frames[Scene.cheese.frame].frame.y,Scene.cheese.frames[Scene.cheese.frame].frame.w,Scene.cheese.frames[Scene.cheese.frame].frame.h,800,400,Scene.cheese.frames[Scene.cheese.frame].frame.w,Scene.cheese.frames[Scene.cheese.frame].frame.h);
    //Scene.canvasContext.drawImage(Scene.cage, 650, yOffset);

    Scene.canvas.width = window.innerWidth;
	
	// Wait till the mouse image is loaded before starting the animation.
	Scene.mouseSprite.img.onload = function() {		
        Scene.mouseSprite.offset=-Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w;
        timeStart = new Date().getTime();
    	Scene.mainLoop();
    }
    Scene.catSprite.img.onload=function(){
        Scene.catSprite.offset=-Scene.catSprite.frames[Scene.catSprite.frame].frame.w;
    	//Scene.mainLoop();
    }
};

// Once the basic HTML document is loaded and its parsing has taken place, start the scene.
document.addEventListener( 'DOMContentLoaded', Scene.start);

Scene.clearCanvas = function () {
    Scene.canvas.width = window.innerWidth;
    if(timeDiff>11000){
        Scene.canvasContext.fillStyle='black';
        Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
        Scene.canvasContext.drawImage(Scene.ending.img,0.5 * Scene.canvas.width - 0.5 * Scene.ending.frames[0].frame.w , 0.5 * Scene.canvas.height - 0.5 * Scene.ending.frames[0].frame.w,Scene.ending.frames[0].frame.w,Scene.ending.frames[0].frame.h);
    } 
    else {
        Scene.canvasContext.drawImage(Scene.background.img,Scene.background.frames[Scene.background.frame].frame.x,Scene.background.frames[Scene.background.frame].frame.y,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h,0,0,Scene.background.frames[Scene.background.frame].frame.w,Scene.background.frames[Scene.background.frame].frame.h);
        Scene.canvasContext.drawImage(Scene.cheese.img,Scene.cheese.frames[Scene.cheese.frame].frame.x,Scene.cheese.frames[Scene.cheese.frame].frame.y,Scene.cheese.frames[Scene.cheese.frame].frame.w,Scene.cheese.frames[Scene.cheese.frame].frame.h,800,400,Scene.cheese.frames[Scene.cheese.frame].frame.w,Scene.cheese.frames[Scene.cheese.frame].frame.h);
    }

};

Scene.mainLoop = function() {
    Scene.clearCanvas();
    Scene.update();
    Scene.draw();
	
	// Animate at 24 frames a second.
    window.setTimeout(Scene.mainLoop, 1000 /18);
};

Scene.update = function () {
    // Set the location of the next frame.
    timeNow = new Date().getTime();
    timeDiff = timeNow-timeStart;


    if(timeDiff>820 && timeDiff<5500){
        Scene.mouseSprite.offset==Scene.mouseSprite.offset;
    }
    else if (Scene.mouseSprite.offset<650){
        Scene.mouseSprite.offset+=18;
    }
    else{
	if(Scene.mouseSprite.offset>Scene.canvas.width)
         Scene.mouseSprite.offset=-Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w;
    }      

    if(timeDiff>5500 && timeDiff<7000){
        Scene.catSprite.offset+=18;
    }
    if(Scene.catSprite.offset>Scene.canvas.width){
        Scene.catSprite.offset=-Scene.catSprite.frames[Scene.catSprite.frame].frame.w;
    }

    if(timeDiff>9000 && yOffset<265){
        yOffset+=18;
    }
    
};

Scene.draw = function () {

	Scene.canvasContext.drawImage(Scene.mouseSprite.img,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.x,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.y,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.h,Scene.mouseSprite.offset,400,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.w,Scene.mouseSprite.frames[Scene.mouseSprite.frame].frame.h);
    if(timeDiff>820 && timeDiff<5500){
        Scene.mouseSprite.frame==Scene.mouseSprite.frame;
    }
    
    else if(Scene.mouseSprite.offset<650){
        Scene.mouseSprite.frame++;    
    }

    //mouse Speech bubble
    if(Scene.mouseSprite.offset>100 && timeDiff<3500){
        Scene.canvasContext.drawImage(Scene.mouseWant, 200, 350);
    }
        
    if (Scene.mouseSprite.offset>100 && timeDiff>3500 && timeDiff<5500){
        Scene.canvasContext.drawImage(Scene.mouseGet, 200, 350);
    }
        
    Scene.canvasContext.drawImage(Scene.catSprite.img,Scene.catSprite.frames[Scene.catSprite.frame].frame.x,Scene.catSprite.frames[Scene.catSprite.frame].frame.y,Scene.catSprite.frames[Scene.catSprite.frame].frame.w,Scene.catSprite.frames[Scene.catSprite.frame].frame.h,Scene.catSprite.offset,300,Scene.catSprite.frames[Scene.catSprite.frame].frame.w,Scene.catSprite.frames[Scene.catSprite.frame].frame.h);
    if(timeDiff>5500 && timeDiff<7000){
        Scene.catSprite.frame++;
    }

    if(timeDiff>7000 && timeDiff<9000){
        Scene.canvasContext.drawImage(Scene.evilCat, 375, 300);
    }

    if(timeDiff>11000){
        Scene.canvasContext.fillStyle='black';
        Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
        Scene.canvasContext.drawImage(Scene.ending.img,0.5 * Scene.canvas.width - 0.5 * Scene.ending.frames[0].frame.w , 0.5 * Scene.canvas.height - 0.5 * Scene.ending.frames[0].frame.h,Scene.ending.frames[0].frame.w,Scene.ending.frames[0].frame.h);
    } 
    
    if(timeDiff<11000){
        Scene.canvasContext.drawImage(Scene.cage, 650, yOffset);
    }

    //document.addEventListener( 'timeDiff>14000', Scene.start);
    if(timeDiff>14000){
        //Scene.start();
        window.location.reload(true);
    }
    

	// At the end of the sprite sheet, start at the first frame.
	if(Scene.mouseSprite.frame==Scene.mouseSprite.frames.length)
        Scene.mouseSprite.frame=0;

    if(Scene.catSprite.frame==Scene.catSprite.frames.length)
        Scene.catSprite.frame=0;
        
    
};


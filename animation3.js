"use strict";

var Scene = {
    canvas : undefined,
    canvasContext : undefined,
	sprite: undefined
};

Scene.start = function () {
	// Get the canvas and it's context.
    Scene.canvas = document.getElementById("myCanvas");
    Scene.canvasContext = Scene.canvas.getContext("2d");
    Scene.canvasContext.fillStyle = "purple";
    Scene.canvasContext.fillRect(0,0, Scene.canvas.width, Scene.canvas.height);
	
	// Seup the numbers to be displayed.
    Scene.sprite = numbers;
	
	// Attach the image to be used for the sprite.
    Scene.sprite.img = new Image();
    Scene.sprite.img.src = Scene.sprite.src;
	
	// Wait till the number image is loaded before starting the animation.
	Scene.sprite.img.onload = function() {	  	
        Scene.sprite.offset=(Scene.canvas.width)/2-0.5*(Scene.sprite.frames[Scene.sprite.frame].frame.w) ;
        Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[0].frame.x,Scene.sprite.frames[0].frame.y,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h);
    }
};

// Once the basic HTML document is loaded and its parsing has taken place, start the scene.
document.addEventListener( 'DOMContentLoaded', Scene.start);

Scene.clearCanvas = function () {
    Scene.canvasContext.globalCompositeOperation = 'destination-over' // taken from Stack Overflow
    Scene.canvasContext.fillStyle = "purple";
    Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

function mainLoop() {
    Scene.clearCanvas();
    Scene.update();
    Scene.draw();
	
	// Animate at 2 frames a second.
    window.setTimeout(mainLoop, 500);
};

Scene.update = function () {
	// Set the canvas width to be that of the display Window. Which helps if you resize the window.
  	Scene.canvas.width = Scene.canvas.width;
	
    // Set the location of the next frame. 
  	Scene.sprite.offset=(Scene.canvas.width)/2-0.5*(Scene.sprite.frames[Scene.sprite.frame].frame.w) ;
};
var a=-1;
Scene.draw = function () {
    a++;
    Scene.canvasContext.fillStyle = "purple";
    Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);

    if(a==0){
        Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[0].frame.x,Scene.sprite.frames[0].frame.y,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h);
    }
    else if(a<10){
        Scene.sprite.frame++; 
        Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[Scene.sprite.frame].frame.x,Scene.sprite.frames[Scene.sprite.frame].frame.y,Scene.sprite.frames[Scene.sprite.frame].frame.w,Scene.sprite.frames[Scene.sprite.frame].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[Scene.sprite.frame].frame.w,Scene.sprite.frames[Scene.sprite.frame].frame.h);
    }
    else{
        Scene.sprite.offset=Scene.canvas.width/2 - Scene.sprite.frames[1].frame.w;
        Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[1].frame.x,Scene.sprite.frames[1].frame.y,Scene.sprite.frames[1].frame.w,Scene.sprite.frames[1].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[1].frame.w,Scene.sprite.frames[1].frame.h);
        Scene.sprite.offset= (Scene.canvas.width/2);
        Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[0].frame.x,Scene.sprite.frames[0].frame.y,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[0].frame.w,Scene.sprite.frames[0].frame.h);
    
    }     
};


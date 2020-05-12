// declares global variables that will be used later in the program
var recognition, ctx, canvas;
// once the DOM Contents are loaded, it calls the draw() function
document.addEventListener('DOMContentLoaded', draw);
// draws the canvas with its original details
function draw() {
    canvas = document.getElementById("BarCanvas");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        drawOnCanvas("white", "black", 50);
    }	
}

//draws the background, circle and text on the canvas in accordance with 
    // the given parameters
function drawOnCanvas(bgColor, circleColor, circleSize){
// console.log("background: " + bgColor);
    ctx.fillStyle =bgColor;
    ctx.fillRect(0, 0, 800, 600);
    //console.log("circle color: " + circleColor);
    ctx.fillStyle =circleColor;
    //console.log("circle size: " + circleSize);
    var rad = circleSize/2;
    ctx.beginPath();
    ctx.arc(400, 300, rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "12px Georgia";
    if(bgColor==='black'){ctx.fillStyle='white';}
    else{ctx.fillStyle='black';}
    ctx.fillText("Commands:", 15, 15);
    ctx.fillText("To change the color of the circle, say \"color _____\". For example \"color blue\" to make the circle blue.", 15, 35);
    ctx.fillText("To change the background color, say \"background _____\". For example \"background yellow\" to make the background yellow.", 15, 55);
    ctx.fillText("To change the size of the circle, say \"size _____\". For example \"size 50\" to make the circle with a diameter of 50.", 15, 75);
    ctx.fillText("Access spoken instructions by saying \"Help\".", 15, 95);                    
    ctx.fillText("Access information about the program by saying \"About\".", 15, 115);
}

//sets default values for background color, circle color and circle size
var size=50;
var color="black";
var background="white";

// declares object to allow for speech recognition
recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

// once speech has been successfully recognized, recognition is stopped
    // the recognized words are individually examined to look for Keywords that 
    // indicate a working command to access information and change colors and size
recognition.onresult = function (event) {
    stopVoice();
    //console.log(event);
    var sizeChange=false;
    var colorChange=false;
    var bgChange=false;
    var result, words, word, hasNextWord;
    for (var i = 0; i < event.results.length; i++) {
        // take the string recognized by the speech recognition and split it
            // so that each word is an element in an array
            // each word is tested against specific keywords to search for potential commands
        result= event.results[i][0].transcript;
        var words = result.split(" ");
        for(var i =0; i<words.length; i++){
            hasNextWord = (i+1)<words.length;
            console.log(hasNextWord + "word?");
            word=words[i];
            console.log("my word " + word); // indicates the word being tested
            // uses text to speech to respond to "Help" command
            if(word === "help" || word === "Help"){
                speak("Say color, followed by a color, to set the circle color.  Say background, followed by a color, to set the background color. Say size, followed of a number from 1 to 300, to set the diameter of the circle. Say about, to hear about the program");
            }
            // uses text to speech to respond to "About" command
            if(word === "about" || word === "About"){
                speak("This program was created by Zainab Nathani. It changes the background color, circle color and circle size based on user speech input")
            }
            if((word === "size" || word === "Size") && hasNextWord){
                // the word following the "size" keyword should be the number
                // the next word is parsed from a string to an int
                // if this next word is not a number, it would return NaN, which is then tested for
                var sizeTemp = parseInt(words[i+1]); 
                // only if the next word was indeed a number, that number is tested to make sure it does not exceed the bounds
                    // if the bounds are exceeded, the user is informed through text-to-speech
                if(!isNaN(sizeTemp)){
                    size=sizeTemp;
                    if(size>300){ speak("Size too big, the size limit is 300"); }
                    else if(size<1){ speak("Size too small, the minimize size is 1"); }
                    else{ sizeChange =true; }
                }    
            }
            if((word === "color" || word === "Color")&& hasNextWord){
                console.log("entered?");
                // the word following the "color" keyword should be the color
                // thus the next word is tested against the JS color keywords to ensure it is a valid color
                // this is done through calling the isValidColor() function
                //colorTemp = words[i+1];
                colorTemp = words[i+1].toLowerCase();
                //if (colorTemp==="purple") { colorTemp="purple";}
                if(isValidColor(colorTemp)){ 
                    colorChange =true;
                    console.log(colorChange);
                    color=colorTemp; 
                }
                
            }
            if((word === "background" || word === "Background") && hasNextWord){
                // the word following the "background" keyword should be the color
                // thus the next word is tested against the JS color keywords to ensure it is a valid color
                // this is done through calling the isValidColor() function
                backgroundTemp = words[i+1];
                var check = isValidColor(backgroundTemp);
                if(check){ 
                    bgChange =true; 
                    background = backgroundTemp;
                }
            }
        }
        // is the commands resulted in any changes to the size/ color of the circle
            // or to the background color, the elements of the canvas are redrawn
        if(sizeChange || bgChange || colorChange){
            drawOnCanvas(background, color, size);
        }
    }     
};

// If button was clicked to "Start", Speech Recognition begins and 
    // the text of the button changes to "Stop"
    // vice versa if the button was clicked to "Stop"
function clickedButton() {
    var button = document.getElementById("button");
    if(button.innerHTML === 'Speak'){
        button.value = "Stop";
        button.innerHTML = "Stop";
        recognition.start();
    }else{
        stopVoice();
    }
}

// changes the text of the button to "Speak" and stops Speech recognition
function stopVoice(){
    button.value = "Speak";
    button.innerHTML = "Speak";
    recognition.stop();
}

// from Stack Overflow
// checks color string against JS color Keywords
function isValidColor(strColor) {
    var s = new Option().style;
    s.color = strColor;
    // return 'false' if color wasn't assigned
    return s.color == strColor;
}

// creates an object that allows for text-to-speech
// speaks the text passed as a String
function speak(text) {
    var voice = new SpeechSynthesisUtterance();
    voice.text = text;
    speechSynthesis.speak(voice);
}
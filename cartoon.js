"use strict";
function draw(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    //sky - first layer over the entire canvas
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //grass base on bottom of canvas
    ctx.fillStyle = "green";
    ctx.fillRect(0, 450, 800, 250);

    //house base
    ctx.fillStyle = "rgb(130, 70, 30)";
    ctx.fillRect(100, 300, 200, 200);

    //house roof
    ctx.fillStyle = "tan";
    ctx.beginPath();
    ctx.moveTo(100, 300);
    ctx.lineTo(200, 200);
    ctx.lineTo(300, 300);
    ctx.fill();

    //bricks - for loops for horizontal and vertical lines
    ctx.strokeStyle = "brown";
    for (var y = 310; y < 500; y += 10) {
        ctx.beginPath();
        ctx.moveTo(100, y);
        ctx.lineTo(300, y);
        ctx.stroke();
    }
    for (var x = 100; x < 300; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 300);
        ctx.lineTo(x, 500);
        ctx.stroke();
    }

    //door
    ctx.fillStyle = "tan";
    ctx.fillRect(175, 425, 50, 75);
    ctx.fillStyle = "rgb(150, 69, 30)";
    ctx.fillRect(180, 430, 40, 70);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(215, 465, 5, 0, 2 * (Math.PI), true);
    ctx.fill();

    //windows
    //window pane
    ctx.fillStyle = "tan";
    ctx.fillRect(125, 325, 50, 50);
    ctx.fillRect(225, 325, 50, 50);
    //window inner
    ctx.fillStyle = "black";
    ctx.fillRect(130, 330, 40, 40);
    ctx.fillRect(230, 330, 40, 40);
    ctx.fillStyle = "tan";
    // vertical line window detail
    ctx.fillRect(149, 325, 2, 50);
    ctx.fillRect(125, 349, 50, 2);
    // horizontal line window detail
    ctx.fillRect(249, 325, 2, 50);
    ctx.fillRect(225, 349, 50, 2);

    //tree
    ctx.fillStyle = "brown";
    ctx.fillRect(450, 300, 40, 150);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(485, 50 + 200, 20, 0, (Math.PI), true);
    ctx.arc(455, 50 + 200, 20, 0, (Math.PI), true);
    ctx.arc(375 + 55, 70 + 200, 20, 3 * (Math.PI) / 2, (Math.PI) / 2, true);
    ctx.arc(375 + 55, 90 + 200, 20, 3 * (Math.PI) / 2, (Math.PI) / 2, true);
    ctx.arc(455, 110 + 200, 20, (Math.PI), 0, true);
    ctx.arc(485, 110 + 200, 20, (Math.PI), 0, true);
    ctx.arc(465 + 45, 90 + 200, 20, (Math.PI) / 2, 3 * (Math.PI) / 2, true);
    ctx.arc(465 + 45, 70 + 200, 20, (Math.PI) / 2, 3 * (Math.PI) / 2, true);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(470, 410, 13, 0, (Math.PI) * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(430, 280, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(450, 265);
    ctx.arc(450, 265, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(450, 290);
    ctx.arc(450, 300, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(470, 280);
    ctx.arc(470, 280, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(510, 280);
    ctx.arc(510, 280, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(490, 265);
    ctx.arc(490, 265, 5, 0, (Math.PI) * 2, true);
    ctx.moveTo(490, 300);
    ctx.arc(490, 300, 5, 0, (Math.PI) * 2, true);
    ctx.fill();

    //right fence
    ctx.fillStyle = "white";
    for (var x = 300; x < canvas.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 500);
        ctx.lineTo(x, 425);
        ctx.lineTo(x + 7.5, 415);
        ctx.lineTo(x + 15, 425);
        ctx.lineTo(x + 15, 500);
        ctx.stroke();
        ctx.fill();
    }
    //left fence
    for (var x = -5; x <= 85; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 500);
        ctx.lineTo(x, 425);
        ctx.lineTo(x + 7.5, 415);
        ctx.lineTo(x + 15, 425);
        ctx.lineTo(x + 15, 500);
        ctx.stroke();
        ctx.fill();
    }
    //grass details
    ctx.fillStyle = "rgb(0, 200, 0)";
    for (var x = 0; x < 800; x += 7) {
        for (var y = 525; y < 700; y += 40) {
            ctx.fillRect(x, y, 2, 15);
        }
    }
    for (var x = 0; x < 800; x += 7) {
        ctx.fillRect(x, 495, 3, 10);
    }
    ctx.fillStyle = "rgb(100, 255, 50)";
    for (var x = 3.5; x < 800; x += 7) {
        for (var y = 505; y < 700; y += 40) {
            ctx.fillRect(x, y, 2, 15);
        }
    }
    // fallen apples
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(490, 500, 6, 0, (Math.PI) * 2, true);
    ctx.moveTo(470, 520);
    ctx.arc(470, 510, 6, 0, (Math.PI) * 2, true);
    ctx.fill();
    
    // sun
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2, true);
    ctx.fill();
    
    //clouds
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(540 - 100, 50, 25, 0, (Math.PI), true);
    ctx.arc(500 - 100, 50, 25, 0, (Math.PI), true);
    ctx.arc(475 - 100, 70, 25, 3 * (Math.PI) / 2, (Math.PI) / 2, true);
    ctx.arc(500 - 100, 90, 25, (Math.PI), 0, true);
    ctx.arc(540 - 100, 90, 25, (Math.PI), 0, true);
    ctx.arc(565 - 100, 70, 25, (Math.PI) / 2, 3 * (Math.PI) / 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(540 - 470, 50 + 40, 25, 0, (Math.PI), true);
    ctx.arc(500 - 470, 50 + 40, 25, 0, (Math.PI), true);
    ctx.arc(475 - 470, 70 + 40, 25, 3 * (Math.PI) / 2, (Math.PI) / 2, true);
    ctx.arc(500 - 470, 90 + 40, 25, (Math.PI), 0, true);
    ctx.arc(540 - 470, 90 + 40, 25, (Math.PI), 0, true);
    ctx.arc(565 - 470, 70 + 40, 25, (Math.PI) / 2, 3 * (Math.PI) / 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(540 + 200, 50 + 100, 25, 0, (Math.PI), true);
    ctx.arc(500 + 200, 50 + 100, 25, 0, (Math.PI), true);
    ctx.arc(475 + 200, 70 + 100, 25, 3 * (Math.PI) / 2, (Math.PI) / 2, true);
    ctx.arc(500 + 200, 90 + 100, 25, (Math.PI), 0, true);
    ctx.arc(540 + 200, 90 + 100, 25, (Math.PI), 0, true);
    ctx.arc(565 + 200, 70 + 100, 25, (Math.PI) / 2, 3 * (Math.PI) / 2, true);
    ctx.fill();
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("A lovely summer day...", 400, 50);
}

document.addEventListener('DOMContentLoaded', draw);

/**
 * Created by Dragu Costel on 27.12.2015.
 */

// shim layer with setTimeout fallback
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//Our Canvas
var canvas = document.getElementById("canvas");
//2s Context
var context = canvas.getContext("2d");

//Create the ball object
var ball = new Object();
ball.x = 160;
ball.y = 240;
ball.xspeed = 5;
ball.yspeed = 5;

//Create top Paddle
var topPaddle = new Object();
topPaddle.x = 100;
topPaddle.y = 10;
//Create bottom Paddle
var bottomPaddle = new Object();
bottomPaddle.x = 100;
bottomPaddle.y = 580;

//Set the width and height paddle
var PADDLE_WIDTH = 100;
var PADDLE_HEIGHT = 10;

//Create the table
function createTable() {
    context.fillStyle = '#dbdbdb ';
    context.fillRect(0, 0, canvas.width, canvas.height)
}
//Draw the top paddle
function drawTopPad() {
    context.fillStyle = '#000000 '; // color for inside shapes
    context.fillRect(topPaddle.x, topPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT); // draw top paddle
}

//Draw bottom paddle
function drawBottomPad() {
    context.fillStyle = '#000000 '; // color for inside shapes
    context.fillRect(bottomPaddle.x, bottomPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT); // draw top paddle
}

//Draw the ball
function drawBall() {
    context.strokeStyle = '#000000 '; // color for ball
    context.beginPath(); // start a draw path
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;

    context.arc(ball.x, ball.y, 10, 0, Math.PI * 2, true); // draw ball
    //Change the ball x speed to negative
    if (ball.x >= canvas.width || ball.x <= 0) {
        ball.xspeed = ball.xspeed * -1;
    }
    //Change the ball y speed to negative
    if (ball.y >= canvas.height || ball.y <= 0) {
        ball.yspeed = ball.yspeed * -1;
    }
    context.fill(); // close path and fill in the shape
}

//Computer AI 1 - top Paddle
function computerAI1() {
    //Position the paddle if the ball is coming to me
        if (ball.yspeed < 0) {
        if (ball.x < (topPaddle.x + PADDLE_WIDTH / 2)) {
            topPaddle.x -= 5;
        } else {
            topPaddle.x += 5;
        }
    }
    //Correct the position
    if (topPaddle.x <= 0) {
        topPaddle.x = 0;
    }
    if (topPaddle.x >= (canvas.width - PADDLE_WIDTH)) {
        topPaddle.x = canvas.width - PADDLE_WIDTH;
    }
}
//Computer AI 2 - bottom Paddle
function computerAI2() {
    //Position the paddle if the ball is coming to me
    if (ball.yspeed > 0) {
        if (ball.x < (bottomPaddle.x + PADDLE_WIDTH / 2)) {
            bottomPaddle.x -= 5;
        } else {
            bottomPaddle.x += 5;
        }
    }

    //Correct the position
    if (bottomPaddle.x <= 0) {
        bottomPaddle.x = 0;
    }
    if (bottomPaddle.x >= (canvas.width - PADDLE_WIDTH)) {
        bottomPaddle.x = canvas.width - PADDLE_WIDTH;
    }
}

//Render the game
function game() {
    computerAI1();
    computerAI2();
    createTable();
    drawTopPad();
    drawBottomPad();
    drawBall();
    fps();
    requestAnimFrame(game);
}

/**
 * Calculate frame rate per seconds
 */
var frameTime = 0, nextLoop = new Date().getTime() + 1000;

function fps() {
    var thisFrameTime = new Date().getTime();
    if (thisFrameTime < nextLoop) {
        ++frameTime
    } else {
        document.getElementById('frame_per_second').innerHTML = frameTime.toFixed(1);
        nextLoop += 1000;
        frameTime = 0
    }
}

//Start the game
game();
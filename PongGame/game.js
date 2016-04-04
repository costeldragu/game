/**
 * Created by Dragu Costel on 27.12.2015.
 */

    // shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var gameFPS = 30; // Our game will run at 30 frames per second
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ball = new Object();
ball['x'] = 160;
ball ['y'] = 240;
ball ['xspeed'] = 5;
ball ['yspeed'] = 5;

var topPaddle = new Object();
topPaddle.x = 100;
topPaddle.y = 10;

var bottomPaddle = new Object();
bottomPaddle.x = 100;
bottomPaddle.y = 580;

var PADDLE_WIDTH = 100;
var PADDLE_HEIGHT = 10;


function createTable() {
    context.fillStyle = '#dbdbdb '; // color for rectangle
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawTopPad() {
    context.fillStyle = '#000000 '; // color for inside shapes
    context.fillRect(topPaddle.x, topPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT); // draw top paddle
}


function drawBottomPad() {
    context.fillStyle = '#000000 '; // color for inside shapes
    context.fillRect(bottomPaddle.x, bottomPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT); // draw top paddle
}


function drawBall() {
    context.strokeStyle = '#000000 '; // color for ball
    context.beginPath(); // start a draw path
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;
    context.arc(ball.x, ball.y, 10, 0, Math.PI * 2, true); // draw ball
    if (ball.x >= canvas.width || ball.x <= 0) {
        ball.xspeed = ball.xspeed * -1;
    }
    if (ball.y >= canvas.height || ball.y <= 0) {
        ball.yspeed = ball.yspeed * -1;
    }
    context.fill(); // close path and fill in the shape

}

function computerAI1() {
    if (ball.yspeed < 0) {
        if (ball.x < (topPaddle.x + PADDLE_WIDTH / 2)) {
            topPaddle.x -= 5;
        } else {
            topPaddle.x += 5;
        }
    }
    if (topPaddle.x <= 0) {
        topPaddle.x = 0;
    }
    if (topPaddle.x >= (canvas.width - PADDLE_WIDTH)) {
        topPaddle.x = canvas.width - PADDLE_WIDTH;
    }
}

function computerAI2() {
    if (ball.yspeed > 0) {
        if (ball.x < (bottomPaddle.x + PADDLE_WIDTH / 2)) {
            bottomPaddle.x -= 5;
        } else {
            bottomPaddle.x += 5;
        }
    }
    if (bottomPaddle.x <= 0) {
        bottomPaddle.x = 0;
    }
    if (bottomPaddle.x >= (canvas.width - PADDLE_WIDTH)) {
        bottomPaddle.x = canvas.width - PADDLE_WIDTH;
    }
}


function game() {
    computerAI1();
    computerAI2();
    createTable();
    drawTopPad();
    drawBottomPad();
    drawBall();
    requestAnimFrame(game);
}


game();
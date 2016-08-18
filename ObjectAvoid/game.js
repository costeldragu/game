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


var ball = new Object();

ball.coordonates = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
};

ball.dimensions = {
    width: 0,
    height: 0,
    radius: 0
};

ball.div = null;

ball.create = function (container) {
    var radius = Math.floor((Math.random() * 50) + 10);
    this.dimensions = {
        width: radius * 2,
        height: radius * 2,
        radius: radius
    };

    console.log(container.offsetHeight);
    console.log(container.offsetWidth);

    this.coordonates = {
        top: Math.floor((Math.random() * (container.offsetHeight - radius)) + 5),
        left: Math.floor((Math.random() * (container.offsetWidth - radius)) + 5)

    };

    this.coordonates.right = this.coordonates.left + radius;
    this.coordonates.bottom = this.coordonates.top + radius;

    this.div = document.createElement('div');
    this.div.setAttribute("class", "ball");
    this.div.setAttribute("style",
        "top:" + this.coordonates.top + "px;" +
        "left:" + this.coordonates.left + "px;" +
        "width:" + this.dimensions.width + "px;" +
        "height:" + this.dimensions.height + "px;" +
        "border-radius:" + this.dimensions.radius + "px;"
    );
    this.div.style.backgroundColor = 'rgb(' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ')'

    container.appendChild(this.div);

};

var mouseBall = Object.assign(ball);


//Move the ball after the mouse
document.onmousemove = function (event) {
    event = event || window.event; // IE-ism
    var posX = event.clientX;
    var posY = event.clientY;

    // console.log(posX, posY);
};

window.balls = [];
function init() {
    mouseBall.create(document.getElementById('board'));
    for (var x = 0; x < 10; ++x) {
        var oneRound = Object.assign(ball);
        oneRound.create(document.getElementById('board'));
        window.balls.push(oneRound);
    }

}


//Render the game
function game() {


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

init();
//Start the game
game();
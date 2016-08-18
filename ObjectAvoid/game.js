/**
 * Created by Dragu Costel on 18.08.2016.
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

//Ball coordinates
ball.coordinates = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    direction: 1
};

//Ball  center coordinates based on 
ball.center = {
    x: 0,
    y: 0
};

//Ball dimensions
ball.dimensions = {
    width: 0,
    height: 0,
    radius: 0
};
//Div object
ball.div = null;
ball.container = null;
ball.id = null;

ball.create = function (container) {
    var radius = 100;//Math.floor((Math.random() * 50) + 10);
    this.container = container;
    this.div = document.createElement('div');
    this.div.setAttribute("class", "ball");

    this.dimensions = {
        width: radius * 2,
        height: radius * 2,
        radius: radius
    };

    Object.assign(this.div.style, {
        borderRadius: +this.dimensions.radius + "px",
        backgroundColor: 'rgb(' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ')'
    });

    this.randomPosition();


    container.appendChild(this.div);

};

ball.randomPosition = function () {
    this.coordinates = {
        top: Math.floor((Math.random() * ( this.container.offsetHeight - this.dimensions.radius)) + 5),
        left: Math.floor((Math.random() * ( this.container.offsetWidth - this.dimensions.radius)) + 5)
    };

    this.coordinates.right = this.coordinates.left + this.dimensions.radius;
    this.coordinates.bottom = this.coordinates.top + this.dimensions.radius;
    //Don't go outside of board
    if (this.coordinates.left + this.dimensions.width >  this.container.offsetWidth) {
        this.coordinates.left =  this.container.offsetWidth - this.dimensions.width;
    }
    //Don't go outside of board
    if (this.coordinates.top + this.dimensions.height >  this.container.offsetHeight) {
        this.coordinates.top =  this.container.offsetHeight - this.dimensions.height;
    }
    this.center = {
        x: this.coordinates.left + this.dimensions.radius,
        y: this.coordinates.top + this.dimensions.radius
    };
    this.setStyle();
};
/**
 * Set style
 */
ball.setStyle = function () {
    Object.assign(this.div.style, {
        top: this.coordinates.top + "px",
        left: this.coordinates.left + "px",
        width: this.dimensions.width + "px",
        height: this.dimensions.height + "px"
    });
};

ball.overlap = function (otherBall) {
    var x = otherBall.center.x - this.center.x;
    var y = otherBall.center.y - this.center.y;
    var sumRad = otherBall.dimensions.radius + this.dimensions.radius;
    var d = Math.sqrt((x * x) + (y * y));


    if (d < sumRad) {
        return true;
    } else {
        return false;
    }
};

ball.move = function () {

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
    for (var x = 0; x < 2; ++x) {
        var oneRound = Object.assign({},ball);
        oneRound.create(document.getElementById('board'));
        oneRound.id = x;
        //Avoid startup overlap

        if(window.balls.length) {
            window.checkOverlap = 0;
            avoidOverLap(oneRound);
        }

        window.balls[x]=oneRound;

    }
    console.log(window.balls.length);
}

function avoidOverLap(ball) {

    if(window.checkOverlap > 10 ) {
        console.log('Unable to stop overlap');
        return true;
    }else{
        ++window.checkOverlap;
    }

    window.balls.forEach(function (inserted_ball) {

        if(ball.id !=  inserted_ball.id) {
            if(inserted_ball.overlap(ball)) {
                ball.randomPosition();
                avoidOverLap(ball);
            }
        }

    });

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
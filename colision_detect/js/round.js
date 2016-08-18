/**
 * Created by cdragu on 05.04.2016.
 */

(function ($, window, document) {
    "use strict";

    var round = {

        radius: 0,
        /**
         * Rectangular coordinates
         */
        rect: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        directions: {
            x: 1,
            y: -1
        },
        speed: 1,
        //Init the element
        init: function init(options) {
            //Ensure that option is an object
            options = options || {};
            //Init doom element
            if (!this.doomElement) {
                this.doomElement = $('<div>', {
                    'class': 'round'
                });
            }
            //Set the radius if any
            if (options.radius) {
                this.radius = options.radius;
            }

            //set square to board if board exits
            if (options.board) {
                options.board.dom.append(this.doomElement);
                this.doomBoard = options.board;
            }

            this.startUpPosition();


            this.directions.x = Math.floor((Math.random() * 2) + 1) > 1 ? -1 : 1;
            this.directions.y = Math.floor((Math.random() * 2) + 1) > 1 ? -1 : 1;

            this.doomElement.css({
                backgroundColor: 'rgb(' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ')'
            });
            this.doomElement.html(this.id);
            this.render();


        },
        /**
         * Start up position of rect
         */
        startUpPosition: function startUpPosition() {
            if (!this.doomBoard) return;
            this.radius = Math.floor((Math.random() * 100) + 10);
            this.rect.top = Math.floor((Math.random() * (this.doomBoard.height - this.radius)) + 5);
            this.rect.left = Math.floor((Math.random() * (this.doomBoard.width - this.radius)) + 5);
            this.rect.right = this.rect.left + this.radius;
            this.rect.bottom = this.rect.top + this.radius
        },
        /**
         * Render the element
         */
        render: function render() {
            this.doomElement.css({
                top: this.rect.top,
                left: this.rect.left,
                height: this.radius,
                width: this.radius,
                borderRadius: this.radius
            })

        },
        /**
         * check if overlap occurs
         * @param container -
         * @returns {*}
         */
        overlap: function overlap(container) {
            if (container === null) {
                return this;
            }

            //var d =  this.rect.top - container.rect.top

            return !(
                this.rect.top > container.rect.bottom ||
                this.rect.right < container.rect.left ||
                this.rect.bottom < container.rect.top ||
                this.rect.left > container.rect.right
            );


        },
        /**
         * Move the sqare
         * @returns {square}
         */
        move: function move() {
            var container = this.doomBoard;
            var rect = this.rect;

            /**
             * Set x direction base on the container
             */
            if (rect.left > (container.width - this.radius)) {
                this.directions.x = -1;
            }
            if (rect.left < 0) {
                this.directions.x = 1;
            }

            /**
             * Set y direction  base on the container
             */
            if (rect.top > (container.height - this.radius)) {
                this.directions.y = -1;
            }
            if (rect.top < 0) {
                this.directions.y = 1;
            }

            //Calculate new position
            rect.top += this.speed * this.directions.y;
            rect.left += this.speed * this.directions.x;
            //Recalculate the rect
            this.rect = {
                top: rect.top,
                left: rect.left,
                right: rect.left + this.radius,
                bottom: rect.top + this.radius
            };

            this.render();
            return this;

        },
        /**
         * If overlap occurs , change direction
         * @param container
         * @returns {square}
         */
        changeDirection: function changeDirection() {

            if (this.directions.y == 1) {
                this.directions.y = -1
            } else {
                this.directions.y = 1
            }
            if (this.directions.x == 1) {
                this.directions.x = -1
            } else {
                this.directions.x = 1
            }
            //this.move();
            return this;
        }

    };


    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    //Init the
    $(function () {
        //Init square array list
        window.rounds = [];
        var gameWidth = $('#game_board').outerWidth();
        var gameHeight = $('#game_board').outerHeight();


        for (var x = 0; x < 10; ++x) {
            var oneRound = $.extend(true, {}, round);
            oneRound.id = x;
            oneRound.init({
                board: {
                    dom: $('#game_board'),
                    width: gameWidth,
                    height: gameHeight
                }
            });

            //Avoid startup overlap
            window.checkOverlap = 0;
            avoidOverLap(oneRound);
            rounds.push(oneRound);
        }

        gameLoop();
        // $('#move').on('mousedown',gameLoop);
    });


    /**
     * Game loop
     */
    function gameLoop() {
        $.each(window.rounds, function (index, round) {
            $.each(window.rounds, function (other_index, other_round) {
                if (other_round.id != round.id && round.overlap(other_round)) {
                    round.changeDirection();
                }
            });
            round.move();
        });
        fps();
        window.requestAnimationFrame(gameLoop)
    }

    /**
     * Try to avoid overlap on the initialization
     * @param oneRound
     */
    function avoidOverLap(oneRound) {
        if (window.checkOverlap > 10) {
            return true;
        } else {
            ++window.checkOverlap;
        }
        $.each(window.rounds, function (index, round) {
            if (round.overlap(oneRound)) {
                oneRound.init();
                avoidOverLap(oneRound);
            }
        });
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
            $('#frame_per_second').html(frameTime.toFixed(1));
            nextLoop += 1000;
            frameTime = 0
        }
    }

})(jQuery, window, document);
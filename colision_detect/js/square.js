(function ($, window, document) {
    "use strict";
    var square = {
        /**
         * Rectangular coordinates
         */
        rect: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        id:0,
        dimensions: {
            width: 0,
            height: 0
        },
        /**
         * Movement direction
         */
        directions: {
            x: 1,
            y: -1
        },
        speed: 1,
        doomBoard: {},
        doomElement: false,
        //Init the element
        init: function init(options) {
            //Ensure that option is an object
            options = options || {};
            //Init doom element
            if(!this.doomElement) {
                this.doomElement = $('<div>', {
                    'class': 'square'
                });
            }
            //Set the rect if any
            if (options.rect) {
                this.rect = options.rect;
            }
            //Set the rect if any
            if (options.dimensions) {
                this.dimensions = options.dimensions;
            }
            //set square to board if board exits
            if (options.board) {
                options.board.dom.append(this.doomElement);
                this.doomBoard = options.board;
            }

            this.startUpPosition();
            this.dimensions.x =  Math.floor((Math.random() * 2) + 1) > 1 ? -1:1;
            this.dimensions.y =  Math.floor((Math.random() * 2) + 1) > 1 ? -1:1;

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
            if(!this.doomBoard) return;
            this.dimensions.width = Math.floor((Math.random() * 100) + 10);
            this.dimensions.height = Math.floor((Math.random() * 100) + 10);
            this.rect.top = Math.floor((Math.random() * (this.doomBoard.height - this.dimensions.height)) + 5);
            this.rect.left = Math.floor((Math.random() * (this.doomBoard.width - this.dimensions.width)) + 5);
            this.rect.right = this.rect.left + this.dimensions.width;
            this.rect.bottom = this.rect.top + this.dimensions.height
        },
        /**
         * Render the element
         */
        render: function render() {
            this.doomElement.css({
                top: this.rect.top,
                left: this.rect.left,
                height: this.dimensions.height,
                width: this.dimensions.width
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
            return !(
                this.rect.top > container.rect.bottom ||
                this.rect.right < container.rect.left ||
                this.rect.bottom < container.rect.top ||
                this.rect.left > container.rect.right
            );




        },
        /**
         *
         * @returns {square}
         */
        move: function move() {
            var container = this.doomBoard;
            var rect = this.rect;
            var dimensions = this.dimensions;

            /**
             * Set x direction base on the container
             */
            if (rect.left > (container.width - dimensions.width)) {
                this.directions.x = -1;
            }
            if (rect.left < 0) {
                this.directions.x = 1;
            }

            /**
             * Set y direction  base on the container
             */
            if (rect.top > (container.height - dimensions.height)) {
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
                right: rect.left + dimensions.width,
                bottom: rect.top + dimensions.height
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

            if(this.directions.y == 1) {
                this.directions.y = -1
            }else{
                this.directions.y = 1
            }
            if(this.directions.x == 1) {
                this.directions.x = -1
            }else{
                this.directions.x = 1
            }
            //this.move();
            return this;
        }


    };
    //Init the 
    $(function () {
        //Init square array list
        window.squares = [];
        var gameWidth = $('#game_board').outerWidth();
        var gameHeight = $('#game_board').outerHeight();

        for (var x = 0; x <10; ++x) {
            var oneSquare = $.extend(true, {}, square);
            oneSquare.id = x;
            oneSquare.init({
                board: {
                    dom: $('#game_board'),
                    width: gameWidth,
                    height: gameHeight
                }
            });

            //Avoid startup overlap
            window.checkOverlap = 0;
            avoidOverLap(oneSquare);
            squares.push(oneSquare);
        }

        gameLoop();
        $('#move').on('mousedown',gameLoop);
    });


    /**
     * Game loop
     */
    function gameLoop() {

        $.each(window.squares, function (index, square) {
            $.each(window.squares, function (other_index, other_square) {
                if(other_square.id != square.id && square.overlap(other_square)){
                    square.changeDirection();

                }
            });
            square.move();

        });
        fps();
       window.requestAnimationFrame(gameLoop)
    }

    /**
     * Try to avoid overlap on the initialization
     * @param oneSquare
     */
    function avoidOverLap(oneSquare) {
        if(window.checkOverlap > 10 ) {
            return true;
        }else{
           ++window.checkOverlap;
        }
        $.each(window.squares, function (index, square) {
            if(square.overlap(oneSquare)) {
                oneSquare.init();
                avoidOverLap(oneSquare);
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
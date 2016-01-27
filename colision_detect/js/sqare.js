(function ($, window, document) {
    "use strict";
    var square = {
        /**
         * Rectangular coordonates
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
            y: 1
        },
        speed: 2,
        doomBoard: {},
        doomElement: false,
        //Init the element
        init: function init(options) {
            //Init doom element
            this.doomElement = $('<div>', {
                'class': 'square'
            });
            //Set the rect if any
            if (options.rect) {
                this.rect = options.rect;
            }
            //Set the rect if any
            if (options.dimensions) {
                this.rect = options.dimensions;
            }
            //set sqare to board if board exits
            if (options.board) {
                options.board.dom.append(this.doomElement);
                this.doomBoard = options.board;
                this.startUpPosition(options.board)
            }

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
            this.dimensions.width = Math.floor((Math.random() * 50) + 10);
            this.dimensions.height = Math.floor((Math.random() * 50) + 10);
            this.rect.top = Math.floor((Math.random() * (this.doomBoard.height - this.dimensions.height)) + 5);
            this.rect.left = Math.floor((Math.random() * (this.doomBoard.width - this.dimensions.width)) + 5);
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
            var isOverlap = !(
                this.rect.top > container.rect.bottom ||
                this.rect.right < container.rect.left ||
                this.rect.bottom < container.rect.top ||
                this.rect.left > container.rect.right
            );

            console.log(isOverlap);
            if (isOverlap) {
                container.changeDirection(this);
                this.changeDirection(container);
            }
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
             * Set x direction
             */
            if (rect.left > (container.width - dimensions.width)) {
                this.directions.x = -1;
            }
            if (rect.left < 0) {
                this.directions.x = 1;
            }

            /**
             * Set y direction
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
         * If overlap obscures , change direction
         * @param container
         * @returns {square}
         */
        changeDirection: function changeDirection(container) {
            if (container === null) {
                return this;
            }

            if (!(this.rect.top > container.rect.bottom)) {
                this.directions.y = -1;
            }
            if (!(this.rect.right > container.rect.left)) {
                this.directions.x = 1;
            }

            if (!(this.rect.bottom < container.rect.top)) {
                this.directions.y = 1;
            }
            if (!(this.rect.left > container.rect.right)) {
                this.directions.x = -1;
            }
            this.move();
            return this;
        }


    };
    //Init the 
    $(function () {
        //Init square array list
        window.squares = [];
        var gameWidth = $('#game_board').outerWidth();
        var gameHeight = $('#game_board').outerHeight();

        for (var x = 0; x < 10; ++x) {
            var oneSquare = $.extend(true, {}, square);
            oneSquare.id = x;
            oneSquare.init({
                board: {
                    dom: $('#game_board'),
                    width: gameWidth,
                    height: gameHeight
                }
            });
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
                if(other_square.id != square.id) {
                    square.overlap(other_square);
                }
            });
            square.move();

        });
        fps();
     //  window.requestAnimationFrame(gameLoop)
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
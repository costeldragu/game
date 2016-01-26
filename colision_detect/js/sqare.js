(function ($, window, document) {
    "use strict";
    var square = {
        /**
         * Rectangular coordonates
         */
        rect: {
            top: 0,
            left: 0,
            height: 0,
            width: 0
        },
        doomBoard : {},
        doomElement: false,
        //Init the element
        init: function (options) {
            //Init doom element
            this.doomElement = $('<div>', {
                'class': 'square'
            });
            //Set the rect if any
            if (options.rect) {
                this.rect = options.rect;
            }
            //set sqare to board if board exits
            if (options.board) {
                options.board.dom.append(this.doomElement);
                this.doomBoard = options.board;
                this.startUpPosition(options.board)
            }

            this.doomElement.css({
                backgroundColor:'rgb('+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+')'
            })

            this.render();


        },
        /**
         * Start up position of rect
         */
        startUpPosition: function() {
            this.rect.width = Math.floor((Math.random() * 50) + 10);
            this.rect.height = Math.floor((Math.random() * 50) + 10);
            this.rect.top = Math.floor((Math.random() * (this.doomBoard.height-this.rect.height)) + 5);
            this.rect.left = Math.floor((Math.random() * (this.doomBoard.width-this.rect.width)) + 5);
        },
        render: function () {
            this.doomElement.css({
                top: this.rect.top,
                left: this.rect.left,
                height: this.rect.height,
                width: this.rect.width
            })
        }

    };
    //Init the 
    $(function () {
        //Init square array list
        var squares = [];
        var gameWidth = $('#game_board').outerWidth();
        var gameHeight = $('#game_board').outerHeight();
        for(var x=0;x<10;++x) {
            var oneSquare = Object.create(square);
            oneSquare.init({
                board: {
                    dom:$('#game_board'),
                    width:gameWidth,
                    height:gameHeight
                }
            });
            squares.push(oneSquare);

        }

        gameLoop();
    });



    /**
     * Game loop
     */
    function gameLoop() {


        fps();
        window.requestAnimationFrame(gameLoop)
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
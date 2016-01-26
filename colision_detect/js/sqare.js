(function ( $,window,document ){
    "use strict";    
    var square = {
        /**
         * Rectangular coordonates
         */
        rect: {
            top:0,
            left:0,
            height:0,
            width:0,
        },
        doomElement : false,
        //Init the element
        init : function(options) {            
            //Init doom element
            this.doomElement = $('<div>',{
                'class':'sqare'
            });
            //Set the rect if any
            if(options.rect) {
                this.rect = options.rect;
            }
            //set sqare to board if board exits
            if(options.board) {
                options.board.append(this.doomElement);
            }
            this.render();
            
            
        },
        render:function() {
            
            this.doomElement.css({
                top:this.rect.top,
                left:this.rect.left,
                height:this.rect.height,
                width : this.rect.width
                
            })
        }
        
    }
    //Init the 
    $(function(){
       //Init sqare array list
    var sqares = new Array();
    
    var sqare = Object.create(square);
    var gameWidth = $('#game_board').outerWidth()
    var gameHeight = $('#game_board').outerHeight()
    sqare.init({
        rect : {
            top:0,
            left:10,
            width:15,
            height:20
        },
        board:$('#game_board')
    })   
    
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
    var frameTime = 0, lastLoop = new Date().getTime(), nextLoop = new Date().getTime()+1000;
    function fps() {
        var thisFrameTime = new Date().getTime();
        if(thisFrameTime<nextLoop) {
           ++frameTime 
        }else{
             $('#frame_per_second').html(frameTime.toFixed(1));
              nextLoop += 1000;
             frameTime=0
        }
    }
    
})(jQuery,window,document);
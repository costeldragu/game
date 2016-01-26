/**
 * Created by CaDyMaN on 26.01.2016.
 */
(function ($, window, document) {
    "use strict";

    //Init the
    $(function () {
        //Init square array list

        var gameWidth = $('#game_board').outerWidth();
        var gameHeight = $('#game_board').outerHeight();

        var iTop = 0;
        var iLeft = 0;



        function setPosition() {
            iTop = Math.floor((Math.random() * (gameHeight - $('.square.over.position').outerHeight())) + 1);
            iLeft = Math.floor((Math.random() * (gameWidth - $('.square.over.position').outerWidth())) + 1);
            $('.square.over.position').css({
                top: iTop,
                left: iLeft
            });
            setTimeout(function() {
                $('.square.move').css({
                    top: iTop,
                    left: iLeft
                });
            },500)
        }

        //$('#goto_over').on('click', function () {
        //
        //
        //});

        $('#reposition').on('click', setPosition)
        setPosition();


    });
})(jQuery, window, document);
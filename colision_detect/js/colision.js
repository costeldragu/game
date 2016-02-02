/**
 * Created by CaDyMaN on 29.01.2016.
 */

(function ($, window, document) {
    "use strict";

    $(function () {
        $("#box1,#box2 ").draggable(
            {
                drag: function () {
                    var box1 = $('#box1');
                    var box2 = $('#box2');

                    var box1_rect = {
                        top: parseInt(box1.css('top')),
                        left: parseInt(box1.css('left')),
                        right: parseInt(box1.css('left')) + box1.width(),
                        bottom: parseInt(box1.css('top')) + box1.height()
                    };

                    var box2_rect = {
                        top: parseInt(box2.css('top')),
                        left: parseInt(box2.css('left')),
                        right: parseInt(box2.css('left')) + box2.width(),
                        bottom: parseInt(box2.css('top')) + box2.height()
                    };

                    if(
                        ((box1_rect.top < box2_rect.bottom) || !(box2_rect.top < box1_rect.bottom)) &&
                        (!(box1_rect.right < box2_rect.left) || (box2_rect.right < box1_rect.left) )

                    ) {
                        console.log('o top bottom')
                    }

                    console.log('box1 top bottom',(box1_rect.top < box2_rect.bottom));
                    console.log('box2 bottom top',!(box2_rect.top < box1_rect.bottom));
                    console.log('box1 right to left',!(box1_rect.right < box2_rect.left));
                    console.log('box2 right to left',(box2_rect.right < box1_rect.left));

                    //(
                    //    this.rect.top > container.rect.bottom ||
                    //    this.rect.right < container.rect.left ||
                    //    this.rect.bottom < container.rect.top ||
                    //    this.rect.left > container.rect.right
                    //)

                }
            }
        );
    })
})(jQuery, window, document);
;
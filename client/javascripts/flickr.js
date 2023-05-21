var main = function () {
    "use strict";

    var images = [];
    var show = false, clicked = false;

    $("button").on("click", function () {
        clicked = true;
        images = [];

        var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" +
            $("input").val() +
            "&format=json&jsoncallback=?";

        var loadImages = function () {
            if (show) {
                setTimeout(loadImages, 100);
                return;
            }
            $.getJSON(url, function (flickrResponse) {
                flickrResponse.items.forEach(function (item) {
                    images.push(item.media.m);
                });
            });
            show = true;
            clicked = false;
            displayImage(0);
        };

        loadImages();
    });

    var displayImage = function (index) {
        if (clicked) {
            show = false;
            clicked = false;
            return;
        }
        var $img = $("#pictures").hide();
        $img.attr("src", images[index]);
        $img.fadeIn(0);
        setTimeout(function () {
            displayImage((index === images.length) ? 0 : index + 1);
        }, 1500);
    };
};
$(document).ready(main);
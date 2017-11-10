var currentImage = "";
var images = [];

$(document).ready(function() {
    getImages(images, finishLoading);

    // Dashboard controls using mouse
    $('#button_yes').click(function() {
        currentImage = images.pop();
        $('#currentMeme').attr('id', 'oldMeme');

        $('.boxaroo').append(
            $('<img />')
            .attr("src", currentImage)
            .addClass("meme")
            .attr("id", "currentMeme")
        );

        $('#oldMeme').slideUp(100, function() {
            $('#oldMeme').remove();
        });

        if(images.length < 6) {
            getImages(images, reloadImages);
        }
    });

    $('#button_no').click(function() {
        currentImage = images.pop();
        $('#currentMeme').attr('id', 'oldMeme');

        $('.boxaroo').append(
            $('<img />')
            .attr("src", currentImage)
            .addClass("meme")
            .attr("id", "currentMeme")
        );

        $('#oldMeme').slideUp(100, function() {
            $('#oldMeme').remove();
        });

        if(images.length < 6) {
            getImages(images, reloadImages);
        }
    });

    // Right arrow key
    $(document).keyup(function(e) {
        if(e.which == 39) {
            imgURL = $('#currentMeme').attr("src");
            imageAnalyze(imgURL);

            currentImage = images.pop();
            $('#currentMeme').attr('id', 'oldMeme');

            $('.boxaroo').append(
                $('<img />')
                .attr("src", currentImage)
                .addClass("meme")
                .attr("id", "currentMeme")
            );

            $('#oldMeme').slideUp(100, function() {
                $('#oldMeme').remove();
            });

            if(images.length < 6) {
                getImages(images, reloadImages);
            }
        }

        // Left Arrow Key
        if(e.which == 37) {
            currentImage = images.pop();
            $('#currentMeme').attr('id', 'oldMeme');

            $('.boxaroo').append(
                $('<img />')
                .attr("src", currentImage)
                .addClass("meme")
                .attr("id", "currentMeme")
            );

            $('#oldMeme').slideUp(100, function() {
                $('#oldMeme').remove();
            });

            if(images.length < 6) {
                getImages(images, reloadImages);
            }
        }
    });
});

function finishLoading(imageArray) {
    images = imageArray;

    $('.meme').attr('src', imageArray.pop());
    $('.meme').attr('id', 'currentMeme');
    
    $('.loading').fadeOut(300, function() {
        $('.content').fadeIn(300);
    });
}

function reloadImages(imageArray) {
    images = imageArray;
}

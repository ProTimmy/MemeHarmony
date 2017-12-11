var currentImage = "";
var images = [];

$(document).ready(function() {
    getImages(images, finishLoading);

    // Dashboard controls using mouse
    $('#button_yes').click(function() {
		imgURL = $('#currentMeme').attr("src");
		imageAnalyze(imgURL);

        currentImage = images.pop();
        $('#currentMeme').attr('id', 'oldMeme');

        $('.memebox').append(
            $('<img />')
            .attr("src", currentImage)
            .addClass("meme")
            .attr("id", "currentMeme")
        );

        $('#oldMeme').hide(0, function() {
            $('#oldMeme').remove();
        });

        if(images.length < 6) {
            getImages(images, reloadImages);
        }
    });

    $('#button_no').click(function() {
        currentImage = images.pop();
        $('#currentMeme').attr('id', 'oldMeme');

        $('.memebox').append(
            $('<img />')
            .attr("src", currentImage)
            .addClass("meme")
            .attr("id", "currentMeme")
        );

        $('#oldMeme').hide(0, function() {
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

            $('.memebox').append(
                $('<img />')
                .attr("src", currentImage)
                .addClass("meme")
                .attr("id", "currentMeme")
            );

            $('#oldMeme').hide(0, function() {
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

            $('.memebox').append(
                $('<img />')
                .attr("src", currentImage)
                .addClass("meme")
                .attr("id", "currentMeme")
            );

            $('#oldMeme').hide(0, function() {
                $('#oldMeme').remove();
            });

            if(images.length < 6) {
                getImages(images, reloadImages);
            }
        }
    });

	$(".sync").click(function() {
		$(".match").remove();
		$(".matches").append("<li class='match' id='loading'><h3>Loading...</h3></li>");

		database.ref("users/" + username).once("value", snapshot => {
			var userInfo = snapshot.val();

			database.ref("users/").once("value", snapshot => {
				var users = snapshot.val();
				snapshot.forEach(function(user) {
					var attr = user.val();
					if(userInfo.username == attr.username) {
						return;
					}

					if(userInfo.preference.indexOf(attr.gender) === -1) {
						return;
					}

					var temp = [];
					for(var i = 0; i < userInfo.tags.length; i++) {
						for(var j = 0; j < attr.tags.length; j++) {
							if(userInfo.tags[i] === attr.tags[j]) {
								temp = [];
								console.log("True");
							}
						}
					}
				});

				$("#loading").remove();
			});
		});
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

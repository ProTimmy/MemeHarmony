var criticalSection = false;
var lastValues = {};
var apiKey = 'AIzaSyA5eT5cmEVop6msDBtveV6g0t4HyVRIGbM';

function getImages(imageArray, callback) {
    if(!criticalSection) {
        criticalSection = true;
        last = lastValues;

        $.ajax('reddit.php', {
            type: 'GET',
            dataType: 'json',
            data: {
                after: last
            },
            success: function(data, status, xhr) {
                for(var i = 0, len = data.length; i < len - 1; i++) {
                    subreddit = data[i];
                    for(var j = 0, children = subreddit.data.children.length; j < children; j++) {
                        if(subreddit.data.children[j].data.post_hint == "image") {
                            if(!subreddit.data.children[j].data.preview.images[0].source.url.includes(".gif")) {
                                imageArray.push(subreddit.data.children[j].data.preview.images[0].source.url);
                            }
                        }
                    }
                }

                lastValues = data[i];

                imageArray = imageArray.sort();
                imageArray = imageArray.reverse();

                callback(imageArray);
                criticalSection = false;
            }
        });
    }
}

function imageAnalyze(imgURL) {
    var request = {
		"requests": [{
			"image": {
				"source": {
					"imageUri": imgURL
				}
			},"features": [
				{"type": "LANDMARK_DETECTION","maxResults": 1},
				{"type": "WEB_DETECTION","maxResults": 2},
				{"type": "LOGO_DETECTION", "maxResults": 1}
			]
		}]
	};

    $.ajax({
        type: 'POST',
		url: 'https://vision.googleapis.com/v1/images:annotate?fields=responses&key=' + apiKey,
        dataType: 'json',
        data: JSON.stringify(request),
		headers: {
	      "Content-Type": "application/json",
	    },
        success: function(data, status, xhr) {
			// TODO: Extract keywords and add to profile
			var tags = [];
			database.ref('/users/' + username).once("value", snapshot => {
				var info = snapshot.val();

				if(info.tags !== 0) {
					tags = info.tags;
				}

				if(data.responses[0].webDetection.webEntities != undefined) {
					for(var i = 0; i < data.responses[0].webDetection.webEntities.length; i++) {
						if(tags.length == 100) {
							tags.pop();
						}

						tags.push(data.responses[0].webDetection.webEntities[i].description);
					}
				}

				database.ref('users/' + username).update({
					tags: tags
				}, function(err) {
					if (err !== null) {
						// Insert error handling here for register page
						displayLog("Username already created.")
						return;
					} else {
						$('#register_username').val("");
						$('#register_password').val("");
						$('input:checkbox').prop('checked', '');
						$('input:radio').prop('checked', '');
						displayLog("User successfully registered!");
					}
				});
			});
        }
    });
}

function shuffle(array) {
    //console.log(array);
    //console.log(array.length);
    var currentIndex = array.length, temporaryValue, randomIndex;

    //While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
			},"features": [{
				"type": "LANDMARK_DETECTION","maxResults": 1},{
				"type": "WEB_DETECTION","maxResults": 2
			}]
		}]
	};

    $.ajax({
        type: 'POST',
		url: 'https://vision.googleapis.com/v1/images:annotate?fields=responses&key=' + apiKey,
        // dataType: 'json',
        data: JSON.stringify(request),
		headers: {
	      "Content-Type": "application/json",
	    },
        success: function(data, status, xhr) {
			// TODO: Extract keywords and add to profile
            console.log(data);
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

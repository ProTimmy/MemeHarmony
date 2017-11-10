var criticalSection = false;
var lastValues = {};

function getImages(imageArray, callback) {
    if(!criticalSection) {
        criticalSection = true;
        last = lastValues;
        console.log(last);

        $.ajax('reddit.php', {
            type: 'GET',
            dataType: 'json',
            data: {
                after: last
            },
            success: function(data, status, xhr) {
                console.log(data);
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
                console.log(lastValues);

                imageArray = imageArray.sort();
                imageArray = imageArray.reverse();

                callback(imageArray);
                criticalSection = false;
            }
        });
    }
}

function imageAnalyze(imgURL) {
    var request = '{"requests": [{"image": {"source": {"imageUri": "' + imgURL + '"}},"features": [{"type": "LANDMARK_DETECTION","maxResults": 1},{"type": "WEB_DETECTION","maxResults": 2}]}]}';

    $.ajax('vision.php', {
        type: 'POST',
        dataType: 'json',
        data: {
            resource: request
        },
        success: function(data, status, xhr) {
            console.log(status);
            console.log(data);
        }
    });
    //console.log(JSON.parse(test));
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

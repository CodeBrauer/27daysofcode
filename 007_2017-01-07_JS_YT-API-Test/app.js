function getUsersPlaylist(channel) {
    var data = {
        part        : 'contentDetails', 
        forUsername : channel,
        key         : 'AIzaSyBoLArgB7n25mqBcIGipwDcBkb6Yi6gQzU',
    };

    superagent
    .get('https://www.googleapis.com/youtube/v3/channels')
    .query(data)
    .set('Accept', 'application/json')
    .end(function(err, res) {
        if (err || !res.ok) {
            alert('Oh no! error');
        } else {
            res.body.items.forEach(function(item, i) {
               var pid = item.contentDetails.relatedPlaylists.uploads
               getUsersVideos(pid);
            });
        }
    });
}

function getUsersVideos(pid) {
    var data = {
        part       : 'snippet', 
        maxResults : 10,
        playlistId : pid,
        key        : 'AIzaSyBoLArgB7n25mqBcIGipwDcBkb6Yi6gQzU',
        order      : 'date'
    };

    superagent
    .get('https://www.googleapis.com/youtube/v3/playlistItems')
    .query(data)
    .set('Accept', 'application/json')
    .end(function(err, res) {
        if (err || !res.ok) {
            alert('Oh no! error');
        } else {
            res.body.items.forEach(function(video, i) {
                var html = '<div class="video"> \
                    <a href="//youtube.com/watch?v=' + video.snippet.resourceId.videoId + '" class="title">\
                    <img src="//img.youtube.com/vi/' + video.snippet.resourceId.videoId + '/maxresdefault.jpg">' + 
                    video.snippet.title + '</a> \
                </div>';
                document.querySelector('.videos').innerHTML += html;
            });
        }
    });
}
getUsersPlaylist('testedcom');
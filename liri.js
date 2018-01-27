require('dotenv').config();

//Data from ./keys.js
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var fs = require('fs');

var tweetsArray = [];

// terminal input starts here
var consoleInput = process.argv[2];
// var songMovie = process.argv.slice[3].join(' ');
var songMovie = process.argv[3];
// process multiple words. Triggers if user types anything after second argument
	for(i=4; i<process.argv.length; i++){
	    songMovie += '+' + process.argv[i];
	}

// Function to work with console input
console.log(consoleInput);

function caseInput(){
	//action statement, switch statement to declare what action to execute.
	switch(consoleInput){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		getSpotify(songMovie);
		break;

		case 'movie-this':
		getMovie(songMovie);
		break;

		case 'do-what-it-says':
		getRandomTxt();
		break;
		
	}
}

// all of the code for getTweets goes here
function getTweets() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'irchap99', count: 20, exclude_replies:true, trim_user:true};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    //console.log(tweets);
                    tweetsArray = tweets;

                    for(i=0; i<tweetsArray.length; i++){
                        console.log("Created at: " + tweetsArray[i].created_at);
                        console.log("Text: " + tweetsArray[i].text);
                        console.log('--------------------------------------');

                        fs.appendFile('log.txt', tweetsArray[i].created_at);
                        fs.appendFile('log.txt', tweetsArray[i].text );
                        fs.appendFile('log.txt',"-------------------------------------------------");
                        fs.appendFile('log.txt',"-------------------------------------------------");
                    }
                }
                else{
                    console.log(error);
                }
    });
        
}

 // all of the getSpotify code will go here
function getSpotify(song) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: song}, function(error, data){
        if(!error){
          for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
            //artist
            
            console.log("Artist: " + songData.artists[i].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");
            
            //adds text to log.txt
            fs.appendFile('log.txt', songData.artists[0].name);
            fs.appendFile('log.txt', songData.name);
            fs.appendFile('log.txt', songData.preview_url);
            fs.appendFile('log.txt', songData.album.name);
            fs.appendFile('log.txt', "-----------------------------------------------------");
            fs.appendFile('log.txt', "-----------------------------------------------------");
            
         } 
        } else{
          console.log('Error occurred.');
        }
      });
    }
    //end getSpotify
		       
    // all of the getMovie code goes here
 function getMovie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!inputs){
            inputs = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
           /*
                //adds text to log.txt
                fs.appendFile('log.txt', "Title: " + body.Title);
                fs.appendFile('log.txt', "Release Year: " + body.Year);
                fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
                fs.appendFile('log.txt', "Country: " + body.Country);
                fs.appendFile('log.txt', "Language: " + body.Language);
                fs.appendFile('log.txt', "Plot: " + body.Plot);
                fs.appendFile('log.txt', "Actors: " + body.Actors);
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
                fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
            */    
        }
    });
};




// function getRandomTxt goes here
function getRandomTxt() {
    fs.readFile('random.txt', 'utf-8', function (error, data) {
        var randomText = data.split(',');
        getSpotify(randomText[1]);
    });
}
caseInput();


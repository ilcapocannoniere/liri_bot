require("dotenv").config();
//Data from ./keys.js
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var spotify = require("spotify");
var fs = require('fs');

// Inquirer starts here
var inquirer = require("inquirer");

inquirer.prompt([
	{
      type: "list",
      message: "What Do You Want To Do?",
      choices: ['my-tweets', 'spotify-this-song', 'movie-this','do-what-it-says'],
      name: "options"
    },
  ])
.then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    //switch case
switch(command){
  case "my-tweets":
    showTweets();
  break;

  case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("Fluorescent Adolescent");
    }
  break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}
  });
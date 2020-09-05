// An array of colors for each corresponding button
var buttonColors = ["red", "blue", "green", "yellow"];
// An array storing the pattern of which color buttons to press
var gamePattern = [];
// An array storing the pattern of which color buttons the user presses
var userClickedPattern = [];

var highScore = 0;
var currentScore = 0;

//-----------------------------------------------------------------------------------
var started = false;
var level = 0;

$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//-----------------------------------------------------------------------------------
//Adding event listeners to elements with class = .btn
//When a click is detected. execute the following function
$(".btn").click(function() {
  //Determining the actual button (this) that was clicked and storing its id (aka the color name) inside userChosenColor
  var userChosenColor = $(this).attr("id");
  //Adding the userChosenColor at the end of the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  // Call function to play the sound of the corresponding color
  playSound(userChosenColor);
  //Call function to create an animative effect when user clicks on a button
  animatePress(userChosenColor);
  //Check the answer of the user's recent input
  checkAnswer(userClickedPattern.length - 1);

  //Testing purposes
  // console.log(userClickedPattern);
});

//Adding keyboard presses functionality
$(document).keypress(function(event) {
  switch (event.key) {
    case "r":
      userClickedPattern.push("red");
      playSound("red");
      animatePress("red");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case "g":
      userClickedPattern.push("green");
      playSound("green");
      animatePress("green");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case "b":
      userClickedPattern.push("blue");
      playSound("blue");
      animatePress("blue");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case "y":
      userClickedPattern.push("yellow");
      playSound("yellow");
      animatePress("yellow");
      checkAnswer(userClickedPattern.length - 1);
      break;
  }
});

//-----------------------------------------------------------------------------------
function nextSequence() {
  //Reset the array for the next level
  userClickedPattern = [];

  //Increase the level number and update the <h1> with the change in the value of the level
  level++;
  $("#level-title").text("Level " + level);

  // Generate a randomNumber between 0 and 3
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber); //Round the number down a whole number
  var randomChosenColor = buttonColors[randomNumber]; //Use randomNumber as an index for buttonColors array, store the color in randomChosenColor
  gamePattern.push(randomChosenColor); //Add the randomChosenColor at the end of the gamePattern array

  //Select the id with the same name as the randomChosenColor (using concatenation!)
  //Create a flash effect with fadeOut and fadeIn
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // Call function to play the sound of the corresponding color
  playSound(randomChosenColor);
}
//-----------------------------------------------------------------------------------
function playSound(name) {
  //Create a new Audio object with the file path of the corresponding color sound
  var colorAudio = new Audio("sounds/" + name + ".mp3");
  colorAudio.play(); //Play the sound
}
//-----------------------------------------------------------------------------------
function animatePress(currentColor) {
  //Select a class (evident of the ".") with the currentColor (concatenation) and add an extra class (pressed)
  $("." + currentColor).addClass("pressed");
  // Create a timeout function to remove a class after a certain period of time
  // Carry out the function (first parameter) in the amount of milliseconds (second parameter)
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
//-----------------------------------------------------------------------------------
function checkAnswer(currentLevel) {
  //If the last index of both arrays are the statement
  //The user clicked correctly along with the gamePattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //If the sequence is finished
    if (gamePattern.length === userClickedPattern.length) {
      //Transition to the next sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);

      //Update the user's score (at the end of each correct sequence)
      currentScore++;
      if(currentScore >= highScore){
        highScore = currentScore;
      }
      $(".current-score .score-number").text(currentScore);
      $(".high-score .score-number").text(highScore);
    }

  }
  //The user clicked incorrectly
  else {
    //Play the sound to singal an incorrect press
    playSound("wrong");
    //Add the class = game-over to the entire body so the user can see a red background
    $("body").addClass("game-over");
    //Timeout function to remove the class = game-over after a certain period of time
    // Carry out the function (first parameter) in the amount of milliseconds (second parameter)
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //Update the <h1>
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//-----------------------------------------------------------------------------------
function startOver() {
  //Reset
  gamePattern = [];
  started = false;
  currentScore = 0;
  $(".current-score .score-number").text(currentScore);
  level = 0;
}

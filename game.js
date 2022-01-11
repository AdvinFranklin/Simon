var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;

$(document).keypress(function() {
  if(level === 0) {
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  started = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
      if(started === level) {
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }
    else {
      startOver();
    }
}

function startOver() {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
  $("#level-title").text("Game Over Kiddo, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
}

$(".btn").click(function() {
  started++;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(started);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

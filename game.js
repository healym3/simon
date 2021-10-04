var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
$(document).keypress(function(){
  if (!gameStarted) {
    gameStarted=true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  //Clear user answer array
  userClickedPattern = [];

  //increase level
  level++;
  $("h1").html("Level " + level);

  //get random game color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout($("body").removeClass("game-over"), 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
}

function startOver(){
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

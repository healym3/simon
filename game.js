var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //alert((userClickedPattern.length - 1) + ":" + userChosenColor);
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
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // console.log(currentLevel + ": " + userClickedPattern[currentLevel] +" vs " + gamePattern[currentLevel]);
  // if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  //   console.log("success");
  //   if (userClickedPattern.length === gamePattern.length) {
  //     setTimeout(function() {
  //       nextSequence();
  //     }, 1000);
  //   } else {
  //     //alert(userClickedPattern[currentLevel] +" vs " + gamePattern[currentLevel]);
  //     playSound("wrong");
  //     $("body").addClass("game-over");
  //     setTimeout($("body").removeClass("game-over"), 200);
  //     $("#level-title").text("Game Over, Press Any Key to Restart");
  //     startOver();
  //   }
  // }
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }
}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false
var level = 0;


function playSound(name) {
    var snd = new Audio("./sounds/" + name + ".mp3");
    snd.play();
}



function checkAnswer() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            var wrong = 'wrong';
            playSound(wrong);
            start = false;
            level = 0;
            gamePattern = [];
            userClickedPattern = [];
            $("h1").text("Game Over, Press Any Key to Restart");
            $(".start-btn").show().html("Restart")
            return;
        }
    }
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}


function nextSequence() {
    userClickedPattern  = []  
    level++

    $("h1").html("level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);

}




$(document).keypress(function () {
    if (!start) {
        nextSequence()
    }
    start = true
    $(".start-btn").hide()
})

$(".start-btn").click(function () {
    if (!start) {
        nextSequence()
    }
    start = true
    $(".start-btn").hide()
})


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer();
});

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 200);
}



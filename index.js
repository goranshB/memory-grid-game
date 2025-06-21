let gamePattern = [];
let userClicked = [];
let started = false;
let level = 0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    let bttn = parseInt($(this).attr('id'));
    userClicked.push(bttn);
    playSound(bttn);
    animatePress(bttn);
    checkAnswer(userClicked.length - 1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClicked[currentLevel]){
        if (gamePattern.length === userClicked.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("gameover");
        $("h1").text("Game Over! Press any key");
        setTimeout(function(){
            $("body").removeClass("gameover");
        }, 200);
        startOver();
    }
}

function nextSequence(){
    userClicked = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 9) + 1;
    gamePattern.push(randomNumber);
    $("#" + randomNumber).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomNumber);
}

function animatePress(key){
    $("#" + key).addClass("pressed");
    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    let music = new Audio("sounds/" + name + ".mp3");
    music.play();
}

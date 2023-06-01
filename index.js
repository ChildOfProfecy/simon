var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = false;
$(document).keydown(function(){
    if(!count){
        $("h1").text("Level "+level);
        gameSequence();
        count = true;
    }
});
$("button").on("click", handler);
function gameSequence(){
    console.log(userClickedPattern);
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randNum = Math.floor(Math.random()*3) +1;
    var randColor = buttonColor[randNum];
    gamePattern.push(randColor);
    $("."+randColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randColor);
}

function handler(){
    var chosedColor = this.className;
    userClickedPattern.push(chosedColor);
    playSound(chosedColor);
    animationPress(chosedColor);
    checkAnswer(userClickedPattern.length-1);
}



function checkAnswer(currLevel){
    if(gamePattern[currLevel]==userClickedPattern[currLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            gameSequence();
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(function(){$("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name){
    var volume = new Audio("/sounds/"+name+".mp3");
    volume.play();
}

function animationPress(name){
    $("."+name).addClass("pressed");
    setInterval(function(){$("."+name).removeClass("pressed");},100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    count = false;
}
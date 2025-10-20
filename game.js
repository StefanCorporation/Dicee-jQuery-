const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


function playSound(name) {
    const sound = new Audio(`./sounds/${name}.mp3`);
    sound.play();    
};



$('.btn').on('click', function() {

    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
});


function animatePress(currentColour) {
    $(`.${currentColour}`).addClass('pressed');
    setTimeout(function() {$(`.${currentColour}`).removeClass('pressed');}, 100)
};



function nextSequence() {
    const randomNumber = Math.round(Math.random() * 3);
    const randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


    level ++;
    $('#level-title').text(`Level ${level}`);
};



let level = 0;
let started = false;



$('#id-button').on('click', function(event) {      

    if (event.type === 'click') {
        if (!started) {
            $('#level-title').text('Level 0');
            started = true;
        }
        
        nextSequence();  
       
    } 
})



$(document).on('keypress', function(event) {
    
    if (event.key === 'A' || event.key === 'a') {
        if (!started) {
            $('#level-title').text('Level 0');
            started = true;
        }
        
        nextSequence();  
       
    } 

});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);

            userClickedPattern = [];
        }

    } else {

        playSound('wrong');

        $('#level-title').text('Game Over, Press A to Restart');
        $('#restart-button').text('Restart');

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        userClickedPattern = [];

        startOver();
    }
       
};


function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
};






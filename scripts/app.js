/* 1. Click link to start game
create division for opening text.-
Create centered text in index file.-
make link inline with text.-
create modal division in body-
create sections for the minimize button, spinner, name, stats, and buttons-
create input and button above the spinner-
input and button disappear when entered
use jquery to add listener to link that will open the modal division


2. Modal pops up with loading spinner
3. Care for the loading spinner, stats and buttons displayed beneath spinner.
   * Name the spinner
   * 'Feed' by 'uploading' data
   * Poke to prevent boredom
   * Minimize modal to rest
4. Loading spinner transforms into more 'sleek' versions over time.
5. The spinner will die and become a flat line if it is not taken care of. */

// Global variables
let name = "";
let hunger = 0;
let boredom = 0;
let rest = 10; 
let time = 0;


// functions
/**
 * @description Function for gathering and assigning the name for the pet spinner 
 * */
const inputName = function inputName(e){
    name = $("#name--input").val();
}

const startGame = function startGame(e){
    $("#initialize--game").remove();
    generatePet();
    $("#gamearea").show();
}

const increaseNeeds = function increaseNeeds() {
    if(hunger < 10) hunger++;
    if(boredom < 10)boredom++;
    if(rest > 0 )rest--;
    $(".rest__value").text(rest);
    $(".boredom__value").text(boredom);
    $(".hunger__value").text(hunger);
};

const increaseRest = function increaseRest(){
    if(rest < 10) rest++;
    $(".rest__value").text(rest);
}
const decreaseHunger = function decreaseHunger(){
    if(hunger > 0)hunger--;
    $(".hunger__value").text(hunger);
}
const decreaseBoredom = function decreaseBoredom(){
    if(boredom > 0)boredom--;
    $(".boredom__value").text(boredom);
}


const minimizeGame = function minimizeGame(){
    $("#gamearea").hide();
    $("#minimized--stats").show();
}

const enlargeGame = function englargeGame(){
    $("#gamearea").show();
    $("#minimized--stats").hide();
}
const generatePet = function generatePet(){
    const spinner = $("#pet");
    if(spinner.hasClass("first--form")){
        spinner.removeClass("first--form");
        spinner.addClass("second--form");
    }else if(spinner.hasClass("second--form")){
        spinner.removeClass("second--form");
        spinner.addClass("third--form");
    }else{
        spinner.addClass("first--form");
    }
 }

 
 const checkDeath = function checkDeath(){
    if(hunger === 10 || boredom === 10 || rest === 0){
        applyDeath();
        return true;
    }
    return false;
}

const applyDeath = function applyDeath(){
    const spinner = $('#pet');
        spinner.removeClass(["first--form", "second--form", "third--form"]);
        spinner.addClass("dead");
}


const setTimer = function setTimer(){
    console.log("timer started");
    const updateTime = function updateTime(){
        time++;
        if(checkDeath()){
            clearInterval(timer);
        }
        if(time%5 === 0){
            increaseNeeds();
        }
    }
    const timer = setInterval(updateTime, 1000);
}



// Event listener assignment
$("#name--btn").on('click', inputName);
$("#initialize--game__link").on('click', startGame);
$(".fa-mouse-pointer").on('click', decreaseBoredom);
$(".fa-upload").on('click', decreaseHunger);
$(".fa-window-minimize").on('click', minimizeGame);
$("#minimized--stats").on('click', enlargeGame);









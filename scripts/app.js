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
let gameMinimized = false;

// functions
/**
 * @description Function for gathering and assigning the name for the pet spinner 
 * */
const inputName = function inputName(e){
    name = $("#name--input").val();
    $(".pet--name").text(name);
    const parent = $(this).parent();
    parent.children("p").text("");
    parent.children(":not(p)").remove();
}

const startGame = function startGame(e){
    $("#initialize--game").remove();
    generatePet();
    $("#gamearea").show();
    setTimer();
}

const increaseNeeds = function increaseNeeds() {
    if(hunger < 10) hunger++;
    if(boredom < 10)boredom++;
    $(".boredom__value").text(boredom);
    $(".hunger__value").text(hunger);
    if(time%2 === 0 && !gameMinimized){
        if(rest > 0 )rest--;
        $(".rest__value").text(rest);
    }
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

const toggleMinimize = function toggleMinimize(){
    gameMinimized = !gameMinimized;
    if(gameMinimized){
        $("#gamearea").hide();
        $("#minimized--stats").show();
    } else {
        $("#gamearea").show();
        $("#minimized--stats").hide();
    }
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
        $(".status").text("Dead");
}


const setTimer = function setTimer(){
    console.log("timer started");
    const updateTime = function updateTime(){
        time++;
        if(checkDeath()){
            clearInterval(timer);
        }
        if(gameMinimized && time%2){
            increaseRest();
        }
        if(time%5 === 0){
            increaseNeeds();
        }
        if(time%30 === 0){
            generatePet();
        }
        
    }
    const timer = setInterval(updateTime, 1000);
}



// Event listener assignment
$("#name--btn").on('click', inputName);
$("#initialize--game__link").on('click', startGame);
$(".fa-mouse-pointer").on('click', decreaseBoredom);
$(".fa-upload").on('click', decreaseHunger);
$(".fa-window-minimize").on('click', toggleMinimize);
$("#minimized--stats").on('click', toggleMinimize);









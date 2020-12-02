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

// functions
/**
 * @description Function for gathering and assigning the name for the pet spinner 
 * */
const inputName = function inputName(e){
    name = $("#name--input").val();
}

const startGame = function startGame(e){
    console.log('clicked');

    $("#initialize--game").remove();
    $("#gamearea").show();
}
const increaseHunger = function increaseHunger(){
    if(hunger < 10) hunger++;
    $(".hunger__value").text(hunger);
}
const increaseBoredom = function increaseBoredom(){
    if (boredom < 10)boredom++;
    $(".boredom__value").text(boredom);
}
const increaseRest = function increaseRest(){
    if(rest < 10);
    rest++;
    $(".rest__value").text(rest);
}
const decreaseHunger = function decreaseHunger(){
    hunger--;
    $(".hunger__value").text(hunger);
}
const decreaseBoredom = function decreaseBoredom(){
    boredom--;
    $(".boredom__value").text(boredom);
}
const decreaseRest = function decreaseRest(){
    rest--;
    $(".rest__value").text(rest);
}

const checkDeath = function checkDeath(){
    if(hunger === 10 || boredom === 10 || rest === 0){
        return true;
    }
    return false;
}


// Event listener assignment
$("#name--btn").on('click', inputName);
$("#initialize--game__link").on('click', startGame);
$(".fa-mouse-pointer").on('click', decreaseBoredom);
$(".fs-upload").on('click', decreaseHunger);









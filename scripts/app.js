
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

/**
 * @description Initializes the game, called when "here" is clicked on initial text.
 * */
const startGame = function startGame(e){
    $("#initialize--game").remove();
    generatePet();
    $("#gamearea").show();
    setTimer();
}

/**
 * @description hides play areas on initial page load, invoked in designated area for invoked functions below
 * */
const hideGame = function hideGame(){
    $("#gamearea").hide();
    $("#minimized--stats").hide();
}

/**
 * @description handles the pet's needs propogation, hunger, boredom, and rest.
 * */
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

/**
 * @description increases and sets displays for pet's rest value
 * */
const increaseRest = function increaseRest(){
    if(rest < 10) rest++;
    $(".rest__value").text(rest);
}

/**
 * @description decreases and sets displays for pet's hunger value
 * */
const decreaseHunger = function decreaseHunger(){
    if(hunger > 0)hunger--;
    $(".hunger__value").text(hunger);
}

/**
 * @description decreases and sets displays for pet's boredom value
 * */
const decreaseBoredom = function decreaseBoredom(){
    if(boredom > 0)boredom--;
    $(".boredom__value").text(boredom);
}

/**
 * @description toggles display areas between active game and minimized game
 * */
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

/**
 * @description sets css classes to control pet's age form
 * */
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

 /**
 * @description checks if pet is dead and returns boolean. True if dead, False if alive. invokes applyDeath if pet is dead.
 * */
 const checkDeath = function checkDeath(){
    if(hunger === 10 || boredom === 10 || rest === 0){
        applyDeath();
        return true;
    }
    return false;
}

/**
 * @description invoked when pet dies, removes age form css class and applies death css class
 * */
const applyDeath = function applyDeath(){
    const spinner = $('#pet');
        spinner.removeClass(["first--form", "second--form", "third--form"]);
        spinner.addClass("dead");
        $(".status").text("Dead");
}

/**
 * @description contains control for gameplay how fast the timer runs, how often needs are increased, how fast rest recovers when minimized, and interval for pet age changes
 * */
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
$("#pet").on("click", decreaseBoredom);

// Invoke functions
hideGame();






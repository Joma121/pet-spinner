
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
        restSpeedChange();
    }
    boredMovement();
    hungerColorChange();
};

/**
 * @description increases and sets displays for pet's rest value
 * */
const increaseRest = function increaseRest(){
    if(rest < 10) rest++;
    $(".rest__value").text(rest);
    restSpeedChange();
}

/**
 * @description decreases and sets displays for pet's hunger value
 * */
const decreaseHunger = function decreaseHunger(){
    if(hunger > 0)hunger--;
    $(".hunger__value").text(hunger);
    hungerColorChange();
}

/**
 * @description decreases and sets displays for pet's boredom value
 * */
const decreaseBoredom = function decreaseBoredom(){
    if(boredom > 0)boredom--;
    $(".boredom__value").text(boredom);
    boredMovement();
}

/**
 * @description changes the color of the pet if they are hungry
 * */
const hungerColorChange = function hungerColorChange(){
    if(hunger > 6){
        $(":root").css("--spinner-base-color", "#8F0101");
        $(":root").css("--spinner-highlight-color", "#B50202");
        $(":root").css("--spinner-border-color", "#570101");
    } else if(hunger < 6){
        $(":root").css("--spinner-base-color", "#1BA698");
        $(":root").css("--spinner-highlight-color", "#27F2DE");
        $(":root").css("--spinner-border-color", "#10665D");
    }
}

/**
 * @description changes the spin speed of the pet if they are tired
 * */
const restSpeedChange = function restSpeedChange(){
    if(rest < 4){
        $(".first--form").css("animation", "1.2s linear 0s infinite normal none running spinner1");    
        $(".second--form").css("animation", "1.2s linear 0s infinite normal none running spinner1");    
        $(".third--form").css("animation", "1.2s linear 0s infinite normal none running spinner1")
    }else if(rest > 4){
        $(".first--form").css("animation", "0.6s linear 0s infinite normal none running spinner1");    
        $(".second--form").css("animation", "0.6s linear 0s infinite normal none running spinner1");    
        $(".third--form").css("animation", "0.7s linear 0s infinite normal none running spinner1")
    }
}

/**
 * @description moves the pet left and right when bored
 * */
const boredMovement = function boredMovement(){
    if(boredom > 6) {
        $("#pet--box").css("animation", "2s ease-in-out infinite boredom");    
        // $(".pet").css("transform", "translateX(50px) translateX(-100px) translateX(50px)");
    } else {
        $("#pet--box").css("animation", "");
    }
}


/**
 * @description toggles display areas between active game and minimized game
 * */
const toggleGameDisplay = function toggleGameDisplay(){
    gameMinimized = !gameMinimized;
    const gameBox = $("#gamearea");
    const minBox = $("#minimized--stats");
    gameBox.toggleClass("animate__zoomOut");
    gameBox.toggleClass("animate__zoomIn");
    if(gameBox.is(":hidden")){
        minBox.toggle();
        gameBox.toggle();
    }else{
        gameBox.toggle("slow", function(){ minBox.toggle();});
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
        $("#pet--box").css("animation", "");

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
$(".fa-window-minimize").on('click', toggleGameDisplay);
$("#minimized--stats").on('click', toggleGameDisplay);
$("#pet").on("click", decreaseBoredom);

// Invoke functions
hideGame();





// Global variables
let name = "";
let hunger = 0;
let boredom = 0;
let rest = 10; 
let time = 0;
let gameMinimized = false;
let intro = true;

// functions
/**
 * @description Function for gathering and assigning the name for the pet spinner 
 * */
const inputName = function inputName(){
    name = $("#name--input").val();
    $(".pet--name").text(name);
    const parent = $(this).parent();
    parent.children("p").text("");
    parent.children(":not(p)").remove();
    $("#gamearea__communicate").html("")
    if(intro)introPart2();
}

/**
 * @description Initializes the game, called when "here" is clicked on initial text.
 * */
const startGame = function startGame(e){
    $("#initialize--game").remove();
    generatePet();
    $("#gamearea").show();
    introduction();
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
    if(boredom < 10) boredom++;
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
    if(rest <= 0 ) return;
    if(rest < 10) rest++;
    $(".rest__value").text(rest);
    restSpeedChange();
}

/**
 * @description decreases and sets displays for pet's hunger value
 * */
const decreaseHunger = function decreaseHunger(){
    if(hunger >= 10) return;
    if(hunger > 0)hunger--;
    $(".hunger__value").text(hunger);
    hungerColorChange();
}

/**
 * @description decreases and sets displays for pet's boredom value
 * */
const decreaseBoredom = function decreaseBoredom(){
    if(boredom >= 10) return;
    if(boredom > 0)boredom--;
    $(".boredom__value").text(boredom);
    boredMovement();
}

/**
 * @description changes the color of the pet if they are hungry
 * */
const hungerColorChange = function hungerColorChange(){
    if(hunger > 5){
        $(":root").css("--spinner-base-color", "#8F0101");
        $(":root").css("--spinner-highlight-color", "#B50202");
        $(":root").css("--spinner-border-color", "#570101");
    } else {
        $(":root").css("--spinner-base-color", "#1BA698");
        $(":root").css("--spinner-highlight-color", "#27F2DE");
        $(":root").css("--spinner-border-color", "#10665D");
    }
}

/**
 * @description changes the spin speed of the pet if they are tired
 * */
const restSpeedChange = function restSpeedChange(){
    if(rest < 5){
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
    if(boredom > 5) {
        $("#pet--box").css("animation", "2s ease-in-out infinite boredom");    
    } else {
        $("#pet--box").css("animation", "");
    }
}


/**
 * @description toggles display areas between active game and minimized game
 * */
const toggleGameDisplay = function toggleGameDisplay(){
    if(intro)demonstration('rest');
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
        sleep(300).then(() => {$(".pet").css("transition", "2s ease-in-out all")})
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

/**
 * @description skips intro sequence
 * */
const skipIntro = function skipIntro() {
    intro = false;
    $("#initialize--game").remove();
    $("#gamearea__communicate").html(`<input id="name--input"type="text" placeholder="Name, ie 'Jeff'"><button id="name--btn">Name</button>`);
    $("#minimized--stats").on('click', toggleGameDisplay);
    $("#name--btn").on('click', inputName);
    $("#name--input").on('keypress', enterPress);
    $("#gamearea").show();
    generatePet();
    setTimer();
}

/**
 * @description runs dialogue to introduce gameplay and names the pet
 * */
const introduction = function introduction(){
    $("i").hide();
    $("#gamearea__name--display").hide();
    $("#gamearea__stats").hide();
    $("#gamearea__stats--hunger").hide();
    $("#gamearea__stats--bored").hide();
    $("#gamearea__stats--rest").hide();
    const communicate = $("#gamearea__communicate");

    sleep(4000).then(() => { 
        communicate.html("<p>Oh man, this sure is taking its time loading.</p>");
    
        sleep(4000).then(() => { 
            communicate.html("<p>...maybe we should do something?</p>");
        
            sleep(3500).then(() => { 
                communicate.html("<p>I know! Let's give our little spinner buddy a name!</p>");

                sleep(5000).then(() => { 
                    communicate.html("<p>I vote Jeff, a nice sturdy name for the loading indicator blocking our path.</p>");
                    sleep(7000).then(() => {    
                        communicate.html(`<input id="name--input"type="text" placeholder="Name, ie 'Jeff'"><button id="name--btn">Name</button>`);
                    $("#name--btn").on('click', inputName);})
                    $("#name--input").on('keypress', enterPress);
                });
            });
        });
    });
}


/**
 * @description runs dialogue to introduce gameplay 
 * */
const introPart2 = function introPart2() {
    const communicate = $("#gamearea__communicate");
    if(name == "Jeff"){ 
        communicate.html("<p>You thought so too? Awesome.</p>")
    } else {
    communicate.html("<p>Great choice!</p>");
    }
    $("#gamearea__name--display").show();
    sleep(5000).then(() => {
        communicate.html("<p>So... how long are we-</p>");
        sleep(2000).then(() => {  
            $("#gamearea__stats").show();
            $("#gamearea__stats--bored").show();
            boredom = 8;
            $(".boredom__value").text(boredom);
            boredMovement();
            sleep(1000).then(() =>{
                communicate.html("<p>Really? <em>It</em> is bored?</p>");
                sleep(4000).then(() => {              
                    $(".fa-mouse-pointer").show();
                    communicate.html(`<p>Let's poke ${name} a few times, or use that new pointer icon.</p>`);
                    demonstration('bored');
                })
            })
        })
    })
}


/**
 * @description runs dialogue to introduce gameplay and begins game and timer afterward
 * */
const introPart3 = function introPart3(str){
    const communicate = $("#gamearea__communicate");
    if(str == 'demo1'){
        sleep(3000).then(() => {
            communicate.html(`<p>Excellent, maybe now we can get to the game.</p>`);
            sleep(4000).then(() => {       
                $("#gamearea__stats--hunger").show();                     
                hunger = 8;
                $(".hunger__value").text(hunger);
                hungerColorChange();
                communicate.html(`<p>What is <em>this</em> now? Is ${name} okay?</p>`);
                sleep(4000).then(() => {
                    $(".fa-upload").show();
                    communicate.html(`<p>Perhaps ${name} is hungry? Try feeding it some data with that upload icon.</p>`);
                    demonstration('hungry');
                })
            })
        })
    }
    if(str == 'demo2'){
        sleep(4000).then(() => {
            communicate.html(`<p>Nice, looks like ${name} is feeling better.</p>`);
            sleep(4000).then(() => {   
                communicate.html(`<p>${name}, would you be so kind as to load the game for us now?</p>`);
                sleep(6000).then(() => {
                    $("#gamearea__stats--rest").show();
                    rest = 3;
                    $(".rest__value").text(rest);
                    restSpeedChange();
                    communicate.html(`<p>Oh dear. ${name} seems to be tired.</p>`);
                    sleep(4000).then(() => {
                        $(".fa-window-minimize").show();
                        communicate.html(`<p>Why don't let ${name} rest back up to 10, could you click the minimize icon.</p>`);
                    })
                })
            })
        })
    }
    if(str == 'demo3'){
        sleep(1000).then(() => {
            communicate.html(`<p>All rested! Still no game though...</p>`);
            sleep(4000).then(() => {   
                communicate.html(`<p>Oh, by the by, when minimized, clicking the area with the stats will return from resting.</p>`);
                sleep(7000).then(() => {
                    communicate.html(`<p>Looks like this guy is your responsibility now.</p>`);
                    $("#minimized--stats").on('click', toggleGameDisplay);
                    setTimer();
                    intro = false;
                    sleep(5000).then(() => {
                        communicate.html(`<p>let me know if the game ever loads.</p>`)
                        sleep(4000).then(() => {
                            communicate.html("");
                        })
                    })
                })
            })
        })
    }
}

/**
 * @description controls stat demonstration during intro
 * */
const demonstration = function demonstration(str){
    const communicate = $("#gamearea__communicate");
    console.log(str);
    if(str == 'bored'){
        sleep(4000).then(() => {
            if(boredom > 3){
                communicate.html(`<p>Perhaps a few more? ${name} still seems a bit bored.</p>`)
                demonstration('bored');
            } else {
                introPart3('demo1');
            }
        })
    }
    if(str == 'hungry'){
        sleep(4000).then(() => {
            if(hunger > 3){
                communicate.html(`<p>Perhaps some more? ${name} still seems a bit hungry.</p>`)
                demonstration('hungry');
            } else {
                introPart3('demo2');
            }
        })
    }
    if(str == 'rest'){
        const restingDemo = function restingDemo(){
            if(gameMinimized){
                rest++;
                $(".rest__value").text(rest);
                if(rest >= 10){
                    restSpeedChange();
                    clearInterval(timer);
                    toggleGameDisplay();
                    introPart3('demo3');
                }
            }
        }    
        const timer = setInterval(restingDemo, 1000);
    }
}

/**
 * @description adds delays, used for dialogue output.
 * */
const sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description handler for pressing enter on input box
 * */
const enterPress = function enterPress(e) { 
    if(e.key === 'Enter') inputName(); 
};

// Event listener assignment
$("#initialize--game__link").on('click', startGame);
$("#initialize--game__skip").on('click', skipIntro);
$(".fa-window-minimize").on('click', toggleGameDisplay);
$(".fa-mouse-pointer").on('click', decreaseBoredom);
$(".fa-upload").on('click', decreaseHunger);
$("#pet").on("click", decreaseBoredom);

// Invoke functions
hideGame();




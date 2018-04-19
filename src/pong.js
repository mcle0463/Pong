
//Declare class variables
var canvas_obj; // canvas reference 
var canvas_context; // ctx variable for drawing
var interval; // the frame rate at which the game is currently being processed
var paused; // bool used to check if user wants to pause game
var startGame; // bool used to check if user wants to start game
var ball_x; // the current ball x coordinate
var ball_y; // the current ball y coordinate
var p1_score = 0; //ai score
var p2_score = 0; //user score
var user_paddle; //user paddle y value
var ai_paddle; //ai paddle y value
p_height = 80; //paddle height
p_width = 8; //paddle width
b_hw = 6; //ball height and width
xv = 6; //ball x movement speed
yv = 6; //ball y movement speed


canvas_obj = document.getElementById("pong");
canvas_context = canvas_obj.getContext('2d');
ball_x = canvas_obj.width / 2;
ball_y = canvas_obj.height / 2;
ai_paddle = canvas_obj.height / 2;


/**
 * Declaring event listeners for the user peripherals
 */
canvas_obj.addEventListener('mousemove', function (e) {
    user_paddle = e.clientY - 40;
});
window.addEventListener('keydown', function (e) {

    var key = e.keyCode;
    if (key == 80) {
        pauseGame();
    }
});
window.addEventListener('keydown', function (e) {

    var key = e.keyCode;
    if (key == 83) {
        if (startGame == false) {
            interval = window.setInterval(process, 1000 / 60);
            startGame = true;

        } else if (paused == true) {
            reset();
        }
    }
});

setUpGame();

/**
 * Function name : process()
 * Purpose : Function is called on an interval basis.
 * Fills canvas with required elements and sets
 * their properties based on the previous values.
 */
function process() {
    canvas_context.fillStyle = 'black';
    canvas_context.fillRect(0, 0, canvas_obj.width, canvas_obj.height);
    canvas_context.fillStyle = 'white';
    canvas_context.fillRect(0, ai_paddle, p_width, p_height);
    canvas_context.fillRect(canvas_obj.width - p_width, user_paddle, p_width, p_height);
    canvas_context.fillRect(ball_x, ball_y, b_hw, b_hw);
    canvas_context.font = "20px Arial";
    canvas_context.fillText(p1_score, 180, 40);
    canvas_context.fillText(p2_score, 540, 40);

    ball_x += xv;
    ball_y += yv;
    ai_paddle = (ball_y) / 1.25;
    if (ball_y <= 0 || ball_y >= canvas_obj.height) {
        yv = -yv;
    }
    if (ball_x < 0) {
        p2_score++;
        reset();
    }
    if (ball_x > canvas_obj.width) {
        p1_score++;
        reset()
    }
    if (ball_x >= canvas_obj.width - p_width) {
        if (ball_y > user_paddle && ball_y < user_paddle + p_height) {
            xv = -xv;
        }
    }
    if (ball_x <= p_width) {
        if (ball_y > ai_paddle && ball_y < ai_paddle + p_height) {
            xv = -xv;
            xv *= 1.05;
            yv *= 1.05;
        }
    }
}

/**
 * Function name : reset()
 * Purpose : Called when a player scores a point
 * which results in the ball and paddle values being reset.
 */
function reset() {
    ball_x = canvas_obj.width / 2;
    ball_y = canvas_obj.height / 2;
    xv = yv = 6;

}

/**
 * Function name : pauseGame()
 * Purpose : adds pause functionality using the clearInterval()
 * function. Uses boolean value to determine games current state.
 */
function pauseGame() {
    if (paused == true) {
        interval = window.setInterval(process, 1000 / 60);
        paused = false;
    } else if (paused == false) {
        canvas_context.fillText("GAME PAUSED", 300, 240);
        clearInterval(interval);
        paused = true;
    }
}

function setUpGame() {

    process();
    startGame = false;
    paused = false;
    canvas_context.font = "20px Arial";
    canvas_context.fillText("Press 'S' for a new game!\n 'P' to Pause", 180, 200);
    clearInterval(interval);

}

function newGame(){
    p1_score = 0;
    p2_score = 0;
    reset();
}



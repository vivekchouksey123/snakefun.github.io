//Game constant& variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound=new Audio('button-3.mp3');
const musicSound = new Audio('during.mp3');
let speed = 10;
let lastPaintTime = 0;
let score=0;
//snake ki tale ki length 
let snakeArr = [
    { x: 5, y: 15 }
]
food = { x: 15, y: 7 };
//Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake){
// khud mai tukh jana
for (let i= 1; i < snakeArr.length; i++) {
    if(snake[i].x=== snake[0].x && snake[i].y === snake[0].y){
        return true;
        }   
    }
    // wall mai tukh jana
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ){
        return true;
    }
}
    
function gameEngine() {
    //Part 1: Update the snake array nd food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir= { x: 0, y: 0 };
        alert("Game over press any key to play again");
        snakeArr=[ { x: 13, y: 15 }];
        musicSound.play();
        score=0;
    }
    // if u have eaten the food,increament the score nd regenrate the food 
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML="ScoreBox:" + score;
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x, y: snakeArr[0].y+ inputDir.y});
        let a=2;
        let b=1;
        food={x:2+Math.round(a + (b-a)*Math.random()),y:2+Math.round(a + (b-a)*Math.random())}
    }
    // moving the snake
    for (let i =  snakeArr.length - 2; i>=0;  i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    //Part 2: Display the snake nd food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        //class add isliye kiya taki css daalske nd ek br mai hi daal de
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        //board ke andr add krne ke liye snake element
        board.appendChild(snakeElement);
    });
    //Display the  khanna
    foodElement =document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    //class add isliye kiya taki css daalske nd ek br mai hi daal de
    foodElement.classList.add('food');
    //boards ke andr add krne ke liye snake element
    board.appendChild(foodElement);
}


//Main logic
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir = { x: 0, y: 1 }    //start the game
    musicSound.play();
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
            
    default:
        break;
    }

});
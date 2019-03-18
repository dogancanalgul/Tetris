var arrows = [];// 0 UP 1 DOWN 2 LEFT 3 RIGHT
var gameState = 2;
var mousePressed = false;
var FinalScore;

function setup() {
    createCanvas(501, 801);
    for(var i = 0; i < 4; ++i)
        arrows[i] = false;
    frameRate(60);
    mainGame.init();
}

function draw() {
    background(255)
    fill(153, 230, 255);
    rect(0, 0, 400, 800);//BORDERS
    if(gameState == 0){
        gameOver();
    }else if(gameState == 1){
        playGame();
    }else{
        menu();
    }
}
function gameOver(){
    background(255, 0, 0);
    textSize(32);
    text("Game Over!", width/2 - 100, height/2);
    text("Score :" + FinalScore,  width/2 - 100,height/2 + 100)
    fill(0, 0, 0)
}
function playGame(){
    rectMove();
    mainGame.draw();
    if(mainGame.isGameOver()){
        var d = new Date();
        console.log(d.getTime() + " + " + mainGame.score + " = " /*+ d.getTime() - mainGame.score*/);
        FinalScore = d.getTime() - mainGame.score ;
        delete mainGame;
        gameState = 0;
    }
}
function menu(){
    background(0, 200, 0);
    fill(255, 0, 0);
    rect(width/2 - 100, height/2 - 100, 200, 50);
    fill(255, 255, 255);
    textSize(32);
    text("Play Game", width/2 - 80, height/2 - 66);
    if(mousePressed){
        mousePressed = false;
        if(mouseX <= width/2 + 100 && mouseX >= width/2 - 100 &&
            mouseY <= height/2 - 50&& mouseY >= height/2 - 100){
            gameState = 1;
            mainGame.start();
        }
    }

}
function mouseClicked(){
    mousePressed = true;
}



function rectMove() {  
    if(arrows[0])
        mainGame.up();
    if(arrows[1])
        mainGame.down();
    if(arrows[2])
        mainGame.left();
    if(arrows[3])
        mainGame.right();
}
function keyPressed() {
    if(keyCode == UP_ARROW)
        arrows[0] = true;
    else if(keyCode == DOWN_ARROW)
        arrows[1] = true;
    else if(keyCode == LEFT_ARROW)
        arrows[2] = true;
    else if(keyCode == RIGHT_ARROW)
        arrows[3] = true;
}
function keyReleased() {
    if(keyCode == UP_ARROW)
        arrows[0] = false;
    else if(keyCode == DOWN_ARROW)
        arrows[1] = false;
    else if(keyCode == LEFT_ARROW)
        arrows[2] = false;
    else if(keyCode == RIGHT_ARROW)
        arrows[3] = false;
}
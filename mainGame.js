function GameCreator() {
    this.tetromino = [];
    this.letters = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    this.frame = 0;
    this.theTetro; //the one in control.(i.e last one created.)
    this.continium = false;
    this.holds;
    this.score;
    this.init = function() {
        this.holds = this.letters[Math.floor(Math.random() * 7)];
        this.addRandom();
    }
    this.start = function() {
        continium = true;
        var d = new Date();
        this.score = d.getTime();
    }
    this.draw = function() {
        if(!continium)
            return ;
        for(var i = 0; i < this.tetromino.length; ++i)
            this.tetromino[i].draw();
        if(this.frame > 60){//FRAMERATE FOR SLOW TETROMINO FALL
            this.goDown();
            this.frame = 0;
        }
        ++this.frame;
        this.doIStopTetro();
        this.checkRows();
        this.showHold();
    };
    this.showHold = function()  {
        tempTetro = new TetrominoCreator(this.holds);
        for(i in tempTetro.blocks){
            tempTetro.blocks[i].size = 20;
            tempTetro.blocks[i].x += 17.65;
            tempTetro.blocks[i].y += 4;
        }
        fill(125, 125, 125);
        rect(400, 50, 100, 80);
        tempTetro.draw();
    }
    this.addRandom = function() {
        
       this.tetromino[this.tetromino.length] = new TetrominoCreator(this.holds);
       this.holds = this.letters[Math.floor(Math.random() * 7)];
       this.theTetro = this.tetromino[this.tetromino.length - 1];
    };
    this.checkRows = function() {
        var count = 0, i = 0;
        var fullRow = false;
        var stillMoving = false;
        for(; i < 20; ++i){
            count = 0;
            for(var j = 0; j < 10; ++j){
                stillMoving = false;
                for(k in this.theTetro.blocks)
                    if(this.theTetro.blocks[k].x == j && this.theTetro.blocks[k].y == i)
                        stillMoving = true;         
                if(this.occupied(j, i) && !stillMoving)
                    ++count;
            }
            if(10 == count){
                fullRow = true;
                break;
            }
        }
        if(fullRow){
            for(var k = 0; k < 10; ++k)
                this.deleteBlock(k, i);
                this.fallOne(i);
        }
    };
    this.isGameOver = function() {// UPDATE IT WITH BETTER DESIGN
        var isItThe = false;
        for(j in this.theTetro.blocks)
            if((this.theTetro.blocks[j].x == 4 || this.theTetro.blocks[j].x == 5)
             && this.theTetro.blocks[j].y == 0)
             isItThe = true;
        if((this.occupied(4,0) || this.occupied(5,0)) && !isItThe)
            return true;
        return false;
    };
    this.goDown = function() {
        if(!this.doIStopTetro())
            this.theTetro.down();
    };
    this.up =  function() {//ROTATE
        if(this.frame%6 != 0)
            return ;
        var inThetetro = false;
        var itCantRotate = false;
        var newOne = this.theTetro.newRotated();
        for(var i = 0; i < newOne.blocks.length && !itCantRotate; ++i){
            inThetetro = false;
            for(j in this.theTetro.blocks)
                if(this.theTetro.blocks[j].x == newOne.blocks[i].x && this.theTetro.blocks[j].y == newOne.blocks[i].y)
                    inThetetro = true;
            if(!inThetetro)
                itCantRotate = this.occupied(newOne.blocks[i].x, newOne.blocks[i].y);
        }
        if(!itCantRotate){
            this.tetromino.splice(this.tetromino.length - 1, 1);
            newOne.rotation = this.theTetro.nextRotation();
            this.tetromino[this.tetromino.length] = newOne;     
            this.theTetro = newOne;
        }
    };
    this.down = function(){ 
        if(!this.doIStopTetro() && this.frame%2 == 0)
            this.theTetro.down();
        
    };
    this.left = function(){
        if(!this.occupiedOftetro(-1, 0) && this.frame%4 == 0)
            this.theTetro.left();

    };
    this.right =  function(){
        if(!this.occupiedOftetro(1, 0) && this.frame%4 == 0)
            this.theTetro.right();
    };
    this.doIStopTetro = function() {
        var doI = false;
        for(var i = 0; i < 4; ++i){
           if(this.occupiedOftetro(0, 1))     
                doI = true;
        }
        
        if(doI)
            this.addRandom();
        return doI;
    };
    this.occupied = function(xCor, yCor){
        if(xCor > 9 ||xCor < 0 || yCor > 19 ||yCor < 0 )
            return true;
        for(var i = 0; i < this.tetromino.length; ++i)
            for(var j = 0; j < this.tetromino[i].blocks.length; ++j)
                if(this.tetromino[i].blocks[j].x == xCor && this.tetromino[i].blocks[j].y == yCor)
                    return true;
        return false;
    };
    this.deleteBlock = function(xCor, yCor) {
        var continium = true;
        for(i in this.tetromino){
            for(j in this.tetromino[i].blocks){
              if(this.tetromino[i].blocks[j].x == xCor && this.tetromino[i].blocks[j].y == yCor){
                this.tetromino[i].blocks.splice(j, 1);
                continium = false;  
                break;
              }
            }
            if(!continium){
                if(this.tetromino[i].blocks.length == 0)
                    this.tetromino.splice(i,1);
                break;
            }
        }
    }
    this.fallOne = function(fallTo){
        for(var i = 0; i < this.tetromino.length - 1; ++i){
            for(j in this.tetromino[i].blocks){
                if(this.tetromino[i].blocks[j].y < fallTo){
                    ++this.tetromino[i].blocks[j].y;
                }
            }
        }
    }
    this.occupiedOftetro = function(xCor, yCor){//x, y are offset for tetronimo like 1, 0 is 1 block right
        var itself;
        var cantMove = false;
        for(var i = 0; i < this.theTetro.blocks.length; ++i){
            itself = false;
            for(var j = 0; j < this.theTetro.blocks.length; ++j)
                if(this.theTetro.blocks[i].x +  xCor == this.theTetro.blocks[j].x && 
                    this.theTetro.blocks[i].y + yCor == this.theTetro.blocks[j].y)  
                    itself = true;         
            if((this.theTetro.blocks[i].x + xCor > 9 || this.theTetro.blocks[i].x + xCor < 0) ||
                (this.theTetro.blocks[i].y + yCor > 19 || this.theTetro.blocks[i].y + yCor < 0) || 
                (this.occupied(this.theTetro.blocks[i].x + xCor, this.theTetro.blocks[i].y + yCor) && !itself))
                cantMove = true;
        }
        return cantMove;
    }
}
var mainGame = new GameCreator();

function TetrominoCreator(shapeOf) {

    this.blocks = [];
    this.rotated = ["NORMAL", "ROTATED_RIGHT", "REVERSE", "ROTATED_LEFT"];
    this.rotation = 0;
    this.shape = shapeOf;
    switch(shapeOf){
    case "I":
        this.blocks[0] = new BlockCreator(3, 0, 0, 255, 255);
        this.blocks[1] = new BlockCreator(4, 0, 0, 255, 255);
        this.blocks[2] = new BlockCreator(5, 0, 0, 255, 255);
        this.blocks[3] = new BlockCreator(6, 0, 0, 255, 255);
    break;
    case "J":
        this.blocks[0] = new BlockCreator(3, 0, 0, 0, 204);   
        this.blocks[1] = new BlockCreator(3, 1, 0, 0, 204);
        this.blocks[2] = new BlockCreator(4, 1, 0, 0, 204);
        this.blocks[3] = new BlockCreator(5, 1, 0, 0, 204);   
    break;
    case "L":
        this.blocks[0] = new BlockCreator(3, 1, 255, 155, 4);   
        this.blocks[1] = new BlockCreator(4, 1, 255, 155, 4);
        this.blocks[2] = new BlockCreator(5, 1, 255, 155, 4);
        this.blocks[3] = new BlockCreator(5, 0, 255, 155, 4);
    break;
    case "O":
        this.blocks[0] = new BlockCreator(4, 0, 255, 255, 0);   
        this.blocks[1] = new BlockCreator(4, 1, 255, 255, 0);
        this.blocks[2] = new BlockCreator(5, 0, 255, 255, 0);
        this.blocks[3] = new BlockCreator(5, 1, 255, 255, 0);   
    break;
    case "S":
        this.blocks[0] = new BlockCreator(4, 1, 102, 255, 51);
        this.blocks[1] = new BlockCreator(5, 1, 102, 255, 51);
        this.blocks[2] = new BlockCreator(5, 0, 102, 255, 51);
        this.blocks[3] = new BlockCreator(6, 0, 102, 255, 51);   
    break;
    case "T":
        this.blocks[0] = new BlockCreator(3, 1, 163, 0, 204);
        this.blocks[1] = new BlockCreator(4, 1, 163, 0, 204);
        this.blocks[2] = new BlockCreator(4, 0, 163, 0, 204);
        this.blocks[3] = new BlockCreator(5, 1, 163, 0, 204);   
    break;
    case  "Z":
        this.blocks[0] = new BlockCreator(4, 0, 255, 0, 0);
        this.blocks[1] = new BlockCreator(5, 0, 255, 0, 0);
        this.blocks[2] = new BlockCreator(5, 1, 255, 0, 0);
        this.blocks[3] = new BlockCreator(6, 1, 255, 0, 0);   
    }
    this.draw = function() {
        for(var i = 0; i < this.blocks.length; ++i)
            this.blocks[i].draw();
    }
    this.up =  function() {
    };
    this.down = function(){
        for(var i = 0; i < this.blocks.length; ++i)
            this.blocks[i].down();
    };
    this.left = function(){
        for(var i = 0; i < this.blocks.length; ++i)
            this.blocks[i].left();
    };
    this.right =  function(){
        for(var i = 0; i < this.blocks.length; ++i)
            this.blocks[i].right();
    };
    this.rotationCompleted = function() {
        this.rotation = (this.rotation + 1)%4;
    }
    this.newRotated = function(){
        var newOne;
        switch(this.shape){
            case "I":
                newOne = new TetrominoCreator("I");
                for(i in newOne.blocks){
                    newOne.blocks[i].y = this.blocks[2].y;
                    newOne.blocks[i].x = this.blocks[2].x;
                }
                t = 1;
                switch(this.rotated[(this.rotation+1)%4]){
                    case "REVERSE":
                        t = -1;
                    case "NORMAL":
                        newOne.blocks[0].x = this.blocks[2].x - t;
                        newOne.blocks[2].x = this.blocks[2].x + t;
                        newOne.blocks[3].x = this.blocks[2].x + 2*t;
                    break;
                    case "ROTATED_LEFT":
                        t = -1;
                    case "ROTATED_RIGHT":
                        newOne.blocks[0].y = this.blocks[2].y - 1;
                        newOne.blocks[2].y = this.blocks[2].y + 1;
                        newOne.blocks[3].y = this.blocks[2].y + 2;
                }
            break;
            case "J":
            break;
            case "L":
            break;
            case "S":
            break;
            case "T":
            break;
            case "Z":
            break;
            default:
                newOne = this;   
            }
        }    
    }

        //RETURNS ROTATED ONE!
    }
   

}
/*







*/
function BlockCreator(x , y, r, g, b) {
    this.size = 40;
    this.x = x;
    this.y = y;
    //COLOR OF BLOCKs
        this.r = r;
        this.g = g;
        this.b = b;
    this.draw = function() {
        fill(this.r, this.g, this.b);
        rect(this.x*this.size, this.y*this.size, this.size, this.size);
        noFill();
    }
    this.up =  function() {
    };
    this.down = function(){
            ++this.y;
    };
    this.left = function(){
            --this.x;
    };
    this.right =  function(){
            ++this.x;
    };
}
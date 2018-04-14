function Snake() {
  this.x = 300;
  this.y = 300;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < sizeScale - speedScale +1) {
      this.total++;
      return true;
    } else {
      return false;
    }
};

  this.direction = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
};

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        noLoop();
        return true;
      }
    }
    return false;
};

   this.checkWall = function(){
      //implement automatic changing direction(speed) for when user hits wall
      if(this.x === width-sizeScale && this.xspeed === 1)
      {
        this.direction(0,1); //force update speed first
         //force user to go up when hitting right wall
      }
      else if(this.x === 0 && this.xspeed === -1) //user hitting left wall
      {
        this.direction(0, -1);
      }
     else if(this.y === height-sizeScale && this.yspeed === 1){ //user hitting bottom wall
        this.direction(-1, 0);
     }
     else if(this.y === 0 && this.yspeed === -1){ //user hitting top wall
        this.direction(1, 0);
     }
     //change the snakes spot on screen
     this.x = this.x + this.xspeed * speedScale;
     this.y = this.y + this.yspeed * speedScale;

     this.x = constrain(this.x, 0, width - sizeScale);
     this.y = constrain(this.y, 0, height - sizeScale);

   };

  this.update = function() {

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.checkWall();


};

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, sizeScale, sizeScale);
    }
    rect(this.x, this.y, sizeScale, sizeScale);

   };
}

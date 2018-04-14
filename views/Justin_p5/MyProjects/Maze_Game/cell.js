function index(i, j){ //finds correct index due to array being 1 dimenstional
   if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
      return -1;}
   return i + j*cols;//formula to get correct index in 1D array
}

function Cell(i, j){ //i is the column, j is the row
   this.x = i;
   this.y = j;
   this.walls = [true, true, true, true]; //array of walls(true is has wall) top right bottom left
   this.visited = false;
   this.exit = false;

   this.exitChance = function(){
      if(exit == 1){ //we already have an exit
         return false;
      }
      if(j == (height/size1) -1 && i > width/(2*size1) ||
         j > height/(2*size1) && i == (width/size1) -1) //if this cell is on the bottom right size of maze)
      {
         var ran = floor(random(0,2));
         if(ran == 1)
         {
            exit = 1; //we now have our exit
            this.exit = true; //this cell is the exit
         }
      }
   };

   this.checkNeighbors = function() {
      var neighbors = []; //unvisted neighbors

      //get each cell object which is a neighbor of this cell
      var top = grid[index(i, j-1)];
      var right = grid[index(i+1, j)];
      var bottom = grid[index(i, j+1)];
      var left = grid[index(i-1, j)];
      this.visited = true;

      if(top && !top.visited) //if top is not null and not visted
      {
         neighbors.push(top);
      }
      if(right && !right.visited)
      {
         neighbors.push(right);
      }
      if(bottom && !bottom.visited)
      {
         neighbors.push(bottom);
      }
      if(left && !left.visited)
      {
         neighbors.push(left);
      }

      if(neighbors.length > 0) //return random neighbor to visit
      {
         var rand = floor(random(0, neighbors.length));
         return neighbors[rand];
      }
      else {//no new neighbor to vist
         return undefined;
      }
   };

   this.highlight = function(){
      var x = this.x*size1;
      var y = this.y*size1;
      noStroke();
      fill(0,150,100,100);
      rect(x, y, size1, size1);
   };


   this.show = function() {
      var x = this.x*size1; //ie co1 2 will net an x position of 2 times the size of each square (putting it in the second square on the grid)
      var y = this.y*size1; //same here
      stroke(255);

      if(this.walls[0]){
         line(x,y, x+size1, y);//top
      }
      if(this.walls[1]){
         line(x+size1, y, x+size1, y+size1);//right
      }
      if(this.walls[2] || this.walls[2] == -1){
         if(this.walls[2] == -1)
         {
            stroke(255,0,0);
         }
         line(x+size1,y+size1, x, y+size1);//bottom
         stroke(255);
      }
      if(this.walls[3]){
         line(x,y+size1, x, y);//left
      }

      if(this.visited){
         noStroke();
         if(this.exit)
         {
            fill(255, 225, 0);
            rect(x, y, size1, size1);
         }
         else{
            fill(255,0,255, 100);
            rect(x, y, size1, size1);
         }
      }
   };

}

var cols,rows;
var size1 = 60;
var grid;
var user; //0 is generating the maze, once done player = 1
//keeps player locked out from controls until maze is done generating
var current;
var stack = [];
var exit; //will changed to 1 once an exit is made

var timer; //visual header element for timer
var timeTick; //ticks each frame refresh
var time; //time in seconds after correcting for framerate
var frames; //current framerate of game

var victoryMessage; //appears when user wins

var exportBox; //textbox to transfer to SQL
var exportButton;

function setup(){
   createCanvas(600,600);
   //creating timer within JS
   timer = createElement('h1', 'Time: ' + 0);
   timer.position(610,0);

   //fetching input element from html and setting up style
   exportBox = select('#output')
   exportBox.style('position', 'absolute');
   exportBox.style('top', '300px');
   exportBox.style('left', '250px');
   exportBox.style('z-index', '-1'); //hiding input box
   //fetching submit button from html
   exportButton = select('#submit');
   exportButton.style('position', 'absolute');
   exportButton.style('top', '300px');
   exportButton.style('left', '250px');
   exportButton.style('z-index', '-1'); //hiding button

   cols = floor(width/size1); //x cols exist
   rows = floor(height/size1);//x rows exist
   reset();
}

function reset(){
   //button starts under canvas


   //reset clock
   timeTick = 0;
   time = 0;
   timer.html('Time: ' + time);

   //reset game elements
   exit = 0;
   user = new Player();
   grid = [];

   //reset frames for maze generation
   frames = 40;
   frameRate(frames);

   //create the new cells
   for (var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
         var newcell = new Cell(i,j); //ie send col 2 row 5
         newcell.exitChance();
         grid.push(newcell);
      }
   }
   current = grid[0];
}

function draw(){
   background(51);
   if(user.players == 1){ ////switch from maze generation code to player code
      frames = 10;
      frameRate(frames);
      timeTick = timeTick+1;
      if(timeTick%frames == 0){
         time = time+1;
      }
      timer.html('Time: ' + time);
      user.show();
   }

   else{ //use this code if maze is generating
      current.visited = true; //current cell has been visited
      current.highlight(); //visually show which cell is current
      for (var i = 0; i < grid.length; i++){
         grid[i].show();
      }

      var nextCell = current.checkNeighbors(); //find next neighbor to visit

      //once the maze is complete, stop looping and let the player play
      //no new cells to pop, located at top left, new neighbor doesnt exist
      if(stack.length == 0 && current.x == 0 && current.y == 0 && !nextCell){
         user.players = 1;
      }

      if(nextCell){ //if there is a neighbor to go to
         removeWalls(current, nextCell); //get rid of lines to make maze path before show is called
         nextCell.visited = true;
         stack.push(current); //add current cell for future backtracking

         current = nextCell;
      }
      else if(stack.length > 0){ //no available neighbors, start popping off the stack to go back
         var previousCell = stack.pop();
         current = previousCell;
      }
   }
      function removeWalls(a, b){
      var x = a.x - b.x; //difference in x location of the current and next cell
      if(x == 1){
         a.walls[3] = false; //left wall removed from current
         b.walls[1] = false; //right wall removed from next
      }
      else if(x == -1)
      {
         a.walls[1] = false;
         b.walls[3] = false;
      }

      var y = a.y - b.y; //difference in y location of the current and next cell
      if(y == 1){
         a.walls[0] = false; //top wall removed from current
         b.walls[2] = false; //bottom wall removed from next
      }
      else if(y == -1)
      {
         a.walls[2] = false;
         b.walls[0] = false;
      }
   }
}

function keyPressed() {
   if(keyCode === ENTER){
     //get rid of victory message
      victoryMessage.remove();
      //place button back under canvas
      exportButton.style('z-index', '-1');
      loop();
   }

  if (keyCode === UP_ARROW && user.players == 1) {
     if(current.walls[0]){
        current = current;
     }
      else{
         current = grid[index(current.x, current.y-1)];
      }
  }
  if (keyCode === DOWN_ARROW && user.players == 1) {
     if(current.walls[2]){
        current = current;
     }
      else {
         current = grid[index(current.x, current.y+1)];
      }
  }
  if (keyCode === RIGHT_ARROW && user.players == 1) {
     if(current.walls[1]){
        current = current;
     }
      else{
         current = grid[index(current.x+1, current.y)];
      }
  }
  if (keyCode === LEFT_ARROW && user.players == 1) {
     if(current.walls[3]){
        current = current;
     }
      else{
         current = grid[index(current.x-1, current.y)];
      }
  }
  if(current.exit){
     victoryMessage = createElement('h1', 'You won in ' + time + ' seconds! <br> -Submit your score below <br> Or press Enter to restart');
     victoryMessage.position(150,100);
     //removed once KEY_CODE Enter is pressed
     exportButton.style('z-index', '0');
     exportBox.value(time);
     noLoop();
     reset();
 }
}

var s;
var sizeScale = 25;
var speedScale = sizeScale;

var food;
var scoreCounter; //visual counter on screen
var score; //keeps track of the score
var player; //0 if player is dead 1 if alive
var startScreen;
var deathScreen;

var exportBox; //textbox to transfer to SQL
var exportButton;

function setup() {
  createCanvas(600, 600);
  player = 0;

  //fetching input element from html and setting up style
  exportBox = select('#output')
  exportBox.style('position', 'absolute');
  exportBox.style('top', '300px');
  exportBox.style('left', '250px');
  exportBox.style('z-index', '-1'); //hiding input box
  //fetching submit button from html
  exportButton = select('#submit');
  exportButton.style('position', 'absolute');
  exportButton.style('top', '400px');
  exportButton.style('left', '250px');
  exportButton.style('z-index', '-1'); //hiding button

  scoreCounter = createElement('h1', 'Snake Length: ' + 1);
  scoreCounter.position(600, 0);

  reset();
}

function reset(){
  score = 1;

  startScreen = createElement('h1', 'Use the arrow keys to control your snake!<br>Press the SHIFT key to start!');
  startScreen.position(25, 100);

  s = new Snake();
  frameRate(15);
  spawnFood();
  loop();
}

function spawnFood() {
  var cols = floor(width/sizeScale);
  var rows = floor(height/sizeScale);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(sizeScale);
}

function draw() {
  background(51);

  if (s.eat(food)) {
     score++;
    spawnFood();
  }

  scoreCounter.html('Snake Length: ' + score);

  if(s.death()){
    player = 0;
    deathScreen = createElement('h1', 'You Lose! Your score is ' + score +'!<br> Submit your score below or<br>Press Enter to play again.');
    deathScreen.position(125, 100);
    exportBox.value(score);
    exportButton.style('z-index', '0'); //hiding button
    noLoop();
  };

  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, sizeScale, sizeScale);
}


function keyPressed() {

  if(keyCode === ENTER && player === 0){
    deathScreen.remove();
    reset();
  }

  if(keyCode === SHIFT && player === 0){
    startScreen.remove();
    player = 1;
  }

  if (keyCode === UP_ARROW && player === 1) {
    if(s.y === 0 && s.yspeed === -1){ //support for if snake is at edge and user tries to change speed to out of mapn
      s.direction(1, 0); //change speed to right
    }
    else if (s.y === 0 && s.xspeed != 0){
    s.direction(s.xspeed, 0); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(0, -1); //user is breaking no rules, key acts normal
    }
  }

  else if (keyCode === DOWN_ARROW && player ===1 ) {
    if(s.y === height-sizeScale && s.yspeed === 1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(-1, 0); //change speed to left
    }
    else if (s.y === height-sizeScale && s.xspeed != 0){
    s.direction(s.xspeed, 0); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{ //user is breaking no rules, key acts normal
      s.direction(0, 1);
    }
  }

  else if (keyCode === RIGHT_ARROW && player===1) {
    if(s.x === width-20 && s.xspeed === 1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(0, 1); //change speed to down
    }
    else if (s.x === width-20 && s.yspeed != 0){
    s.direction(0, s.yspeed); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(1, 0); //user is breaking no rules, key acts normal
    }
  }

  else if (keyCode === LEFT_ARROW && player===1) {
    if(s.x === 0 && s.xspeed === -1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(0, -1); //change speed to up
    }
    else if (s.x === 0 && s.yspeed != 0){
    s.direction(0, s.yspeed); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(-1,0);
    }
  }
}

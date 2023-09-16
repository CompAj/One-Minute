// One Minute 
// Anjana Samarasinghe
// 14-09-2023

//spawn points
//power up locations 



let player;
let storm; 



function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = width;
  player = new Player({
    position:{
      x: 0,
      y: 0
    },

    velocity: {
      x: 3,
      y: 3,
    }
  }); 
  storm = new Storm(width,height);
}


function draw() {
  background(220); 
  player.movement();
  player.update();
  player.display();
  storm.storm_check(); 
  storm.shrink(); 
  //storm.display();
}


function distance_to_storm(){

}

function keyPressed() {
  if (key == 'w') {
    player.movingUp = true;
  }
  if (key == 'a') {
    player.movingLeft = true;
  }
  if (key == 's') {
    player.movingDown = true;
  }
  if (key == 'd') {
    player.movingRight = true;
  }
}

function keyReleased() {
  if (key == 'w') {
    player.movingUp = false;
  }
  if (key == 'a') {
    player.movingLeft = false;
  }
  if (key == 's') {
    player.movingDown = false;
  }
  if (key == 'd') {
    player.movingRight = false;
  }
}
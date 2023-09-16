// One Minute 
// Anjana Samarasinghe
// 14-09-2023

//spawn points
//power up locations 

let radius;

let powerup; 

let player; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = width;
  player = new Player();
  powerup = new Powerup; 
}

function draw() {
  background(220); 
  storm(radius, width, height);


  if (radius <= 200){
    radius = 200
  }
  else {
    radius -=  0.15; 
  }
}

function storm(r, width, height) {
  fill("red");
  circle(width/2, height/2, r);
}


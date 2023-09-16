// One Minute 
// Anjana Samarasinghe
// 14-09-2023

//spawn points
//power up locations 



let radius;

let powerup_x; 

let powerup_y;

let player = new Player(); 



function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = width;
  powerup_x = random(width, height);
  powerup_y = random(width, height);

}


function draw() {
  background(220); 
  // storm(radius, width, height);
  player.movement(); 
  player.display(); 


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


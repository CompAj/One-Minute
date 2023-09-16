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
  player = new Player(); 
  storm = new Storm(width,height);
}


function draw() {
  background(220); 
  player.movement(); 
  player.display();
  storm.storm_check(); 
  storm.shrink(); 
  //storm.display();
}



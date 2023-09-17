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
    },

    health: {
      hp:1000,
    },
  });


  storm = new Storm({
    position: {
      x: width / 2,  
      y: height / 2,
    },
    radius: 1000
  });
  
}


function draw() {
  background(220);
  
  distance_to_storm(); 
  player.display();
  storm.display();
  storm.shrink();
  player.movement();
  player.update();
  print(player.hp);
}




function distance_to_storm(){
  let distance = dist(player.x, player.y, storm.x, storm.y);
  if (distance + player.r > storm.r) {
    player.hp -= 0.5; 
  }
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


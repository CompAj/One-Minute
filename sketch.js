class Player {
  constructor() {
    this.health = 60;
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.topSpeed = 5;
  }
  
  display() {
    circle(this.pos.x, this.pos.y, 20);
  }
  
  tickHealth() {
    this.health --;
  }
  
  update() {
    this.pos.add(this.vel)
  }

  checkInput() {
    if (keyIsDown(87) && ! keyIsDown(83)) { //w
      this.vel.y = -this.topSpeed;
    }
    else if (keyIsDown(83) && ! keyIsDown(87)) { //s
      this.vel.y = this.topSpeed;
    }
    else {
      this.vel.y = 0;
    }

    if (keyIsDown(65) && ! keyIsDown(68)) { //w
      this.vel.x = -this.topSpeed;
    }
    else if (keyIsDown(68) && ! keyIsDown(65)) { //s
      this.vel.x = this.topSpeed;
    }
    else {
      this.vel.x = 0;
    } 
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  players.push(new Player());
  
  setInterval(tickAllHealth, 1000)
}

function draw() {
  translate(width/2, height/2)
  background(220);
  
  for (let somePlayer of players) {
    somePlayer.display();
    somePlayer.checkInput();
    somePlayer.update();
  }
}

function tickAllHealth() {
  for (let somePlayer of players) {
    somePlayer.tickHealth()
    console.log(somePlayer.health)
  }
}

let players = [];

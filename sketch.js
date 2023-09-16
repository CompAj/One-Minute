class Player {
  constructor() {
    this.health = 60;
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.acceleration = 1;
    this.topSpeed = 5;
  }
  
  display() {
    circle(this.pos.x, this.pos.y, 20);
  }
  
  tickHealth() {
    this.health --;
  }
  
  update() {
    if (this.direction.x === 0 && this.direction.y === 0) {
      if (this.vel.mag() >= this.acceleration) {
        this.vel.setMag(this.vel.mag() - this.acceleration);
      }
      else {
        this.vel.set(0);
      }
    }

    else {
      //realistic physics movement in the desired direction
      this.vel.x += this.acceleration*this.direction.x;
      this.vel.y += this.acceleration*this.direction.y;
      this.vel = this.vel.limit(this.topSpeed);
    }

    this.pos.add(this.vel);

  }

  checkInput() {
    this.direction.set(int(keyIsDown(68)) - int(keyIsDown(65)), int(keyIsDown(83)) - int(keyIsDown(87)));
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


class Player {
  constructor(x, y, up, down, left, right, shoot) {
    this.health = 60;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.acceleration = 1;
    this.topSpeed = 5;
    this.weaponAngle = PI/2
    this.weaponPos = createVector(0,0);
    this.weaponBasePos = createVector(0, 0);
    this.reach = 40
    this.throwing = false;
    this.throwSpeed = 8;
    this.radius = 20;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.immune = false;
  }
  
  display() {
    circle(this.pos.x, this.pos.y, this.radius*2);
    line(this.weaponPos.x, this.weaponPos.y, this.weaponBasePos.x, this.weaponBasePos.y);
    text(players[0].health, this.pos.x, this.pos.y)
  }
  
  tickHealth() {
    this.health --;
  }
  
  update() {
    //Player Movement Mechanics
    if (this.direction.x === 0 && this.direction.y === 0) {
      if (this.vel.mag() >= this.acceleration) {
        this.vel.setMag(this.vel.mag() - this.acceleration);
      }
      else {
        this.vel.set(0);
      }
    }

    else {
      this.vel.x += this.acceleration*this.direction.x;
      this.vel.y += this.acceleration*this.direction.y;
      this.vel = this.vel.limit(this.topSpeed);
    }

    this.pos.add(this.vel);

    //Out of Bounds
    if (sqrt(sq(this.pos.x) + sq(this.pos.y)) > arenaRadius + this.radius) {
      this.pos.set(0, 0)
      this.health = 0;
    }

    //Weapon Mechanics
    if (! this.throwing) {
      this.weaponAngle -= PI / 48
      this.weaponPos.x = this.pos.x + cos(this.weaponAngle)*(this.reach + this.radius);
      this.weaponPos.y = this.pos.y - sin(this.weaponAngle)*(this.reach + this.radius);
    }
    else {
      this.weaponPos.x += cos(this.weaponAngle)*this.throwSpeed;
      this.weaponPos.y -= sin(this.weaponAngle)*this.throwSpeed;
    }
    this.weaponBasePos.x = this.weaponPos.x - cos(this.weaponAngle)*(this.reach);
    this.weaponBasePos.y = this.weaponPos.y + sin(this.weaponAngle)*(this.reach);

  }

  checkInput() {
    this.direction.set(int(keyIsDown(this.right)) - int(keyIsDown(this.left)), int(keyIsDown(this.down)) - int(keyIsDown(this.up)));
    if (keyIsDown(this.shoot) && ! this.throwing) {
      this.throwing = true;
      setTimeout(() => {
        this.throwing = false;
      }, 1000);
      
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(15)
  players.push(new Player(0, 0, 87, 83, 65, 68, 16)); //w s a d Lshift
  players.push(new Player(0, height/4)) // training dummy
  arenaRadius = height/2
  
  setInterval(tickAllHealth, 1000)
}

function draw() {
  translate(width/2, height/2)
  background(220);
  
  if (width > height) {
    arenaRadius = height/2;
  }
  else {
    arenaRadius = width/2;
  }

  circle(0, 0, arenaRadius*2)

  checkCollisions()

  for (let somePlayer of players) {
    somePlayer.checkInput();
    somePlayer.update();
    somePlayer.display();
  }
}

function tickAllHealth() {
  for (let somePlayer of players) {
    somePlayer.tickHealth()
    console.log(somePlayer.health)
  }
}

function checkCollisions() {
  for (let somePlayer of players) {
    for (let otherPlayer of players) {
      if (otherPlayer === somePlayer) {
        break;
      }
      
    }
  }
}

let players = [];
let arena;

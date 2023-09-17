class Player {
  constructor(x, y, up, down, left, right, shoot) {
    this.health = 60;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.acceleration = 1;
    this.topSpeed = 5;
    this.weaponAngle = random(0, 2*PI)
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
    this.immune = true;
    this.weaponRadius = 12;
    this.weaponSpin = -1;
    this.spinImmune = false;
    this.dead = false;

    setTimeout(() => {
      this.immune = false;
    }, 200);
  }
  
  display() {
    circle(this.pos.x, this.pos.y, this.radius*2);
    line(this.weaponPos.x, this.weaponPos.y, this.weaponBasePos.x, this.weaponBasePos.y);
    circle(this.weaponPos.x, this.weaponPos.y, this.weaponRadius*2);
    text(this.health, this.pos.x, this.pos.y)
    //circle(lerp(this.weaponPos.x, this.weaponBasePos.x, 0.5), lerp(this.weaponPos.y, this.weaponBasePos.y, 0.5), this.weaponRadius*2)
  }
  
  tickHealth() {
    this.health --;
    if (this.health < 0) {
      this.health = 0;
      this.dead = true;
    }
  }

  checkCollisions(otherPlayer) {
    if (this.weaponPos.dist(otherPlayer.weaponPos) < this.weaponRadius + otherPlayer.weaponRadius && ! this.spinImmune) {
      this.weaponSpin *= -1
      this.spinImmune = true;
      setTimeout(() => {
        this.spinImmune = false;
      }, 100);
    }

    if (this.weaponPos.dist(otherPlayer.pos) < this.weaponRadius + otherPlayer.radius && ! this.immune) {
      this.health += 5;
      otherPlayer.health -= 5;
      this.immune = true;
      setTimeout(() => {
        this.immune = false;
      }, 1000);
    }
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
      this.health = 0;
    }

    //Weapon Mechanics
    if (! this.throwing) {
      this.weaponAngle += PI / 24 * this.weaponSpin
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
  players.push(new Player(0, 0, 87, 83, 65, 68, 32)); //w s a d space
  players.push(new Player(0, height/4, 38, 40, 37, 39, 16)) // training dummy upArrow downArrow leftArrow rightArrow Rshift
  arenaRadius = height/2
  
  setInterval(tickAllHealth, 1000)

  console.log("Player 1: WASD move, space to throw")
  console.log("Player 2 (shit controls): OKL; move, Rshift to throw")
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

  checkAllCollisions()

  for (let somePlayer of players) {
    somePlayer.checkInput();
    somePlayer.update();
    somePlayer.display();
  }
}

function tickAllHealth() {
  for (let i = 0; i < players.length; i++) {
    players[i].tickHealth();
    if (players[i].dead) {
      players.splice(i, 1);
    }
  }
}

function checkAllCollisions() {
  for (let somePlayer of players) {
    for (let otherPlayer of players) {
      if (somePlayer !== otherPlayer) {
        somePlayer.checkCollisions(otherPlayer);
      }
    }
  }
}

let players = [];
let arena;

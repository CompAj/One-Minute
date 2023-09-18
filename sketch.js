class Player {
  constructor(x, y, up, down, left, right, shoot, isBot, sprite) {
    this.bot = isBot;
    this.botTarget = createVector(x, y);
    this.botStart = createVector(x, y);
    this.health = 60;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.acceleration = 1*scaling;
    this.topSpeed = 3*scaling;
    this.weaponAngle = random(0, 2*PI)
    this.weaponPos = createVector(0,0);
    this.weaponBasePos = createVector(0, 0);
    this.reach = 40*scaling
    this.throwing = false;
    this.throwSpeed = 8*scaling;
    this.radius = 20*scaling;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.immune = true;
    this.weaponRadius = 12*scaling;
    this.weaponSpin = -1;
    this.spinImmune = false;
    this.dead = false;
    this.sprite = sprite;

    setTimeout(() => {
      this.immune = false;
    }, 200);
  }
  
  display() {
    this.sprite.width = this.radius*2;
    this.sprite.height = this.radius*2;
    //circle(this.pos.x, this.pos.y, this.radius*2);
    image(this.sprite, this.pos.x, this.pos.y);

    push()
    fill("black")
    strokeWeight(3)
    line(this.weaponPos.x, this.weaponPos.y, this.weaponBasePos.x, this.weaponBasePos.y);
    circle(this.weaponPos.x, this.weaponPos.y, this.weaponRadius*2);
    pop()
    text(this.health, this.pos.x, this.pos.y + this.radius*2)
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

    if (this.weaponPos.dist(otherPlayer.pos) < this.weaponRadius + otherPlayer.radius && ! otherPlayer.immune) {
      this.health += 3;
      otherPlayer.health -= 8;
      otherPlayer.immune = true;
      setTimeout(() => {
        otherPlayer.immune = false;
      }, 400);
    }
  }

  botWandering() {
    if (! this.bot) {
      return;
    }
    
    if (this.pos.dist(this.botTarget) <= this.radius*1.1) {
      let angle = random(0, 2*PI)
      let ranRadius = random(arenaRadius*0.4, arenaRadius*0.9)
      this.botTarget.set(cos(angle)*ranRadius, sin(angle)*ranRadius);

      let nonBotPlayers = [];
      for (let somePlayer of players) {
        if (! somePlayer.bot) {
          nonBotPlayers.push(somePlayer);
        }
      }
      if (nonBotPlayers.length < 1) {
        nonBotPlayers.push(this);
      }
      this.botTarget.lerp(random(nonBotPlayers).pos, 0.6) // adjust second parameter to change aggressiveness
    }

    this.direction.x = this.botTarget.x - this.pos.x;
    this.direction.y = this.botTarget.y - this.pos.y;
    this.direction.normalize();
    //circle(this.botTarget.x, this.botTarget.y, 5)
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
      if (! this.immune) {
        this.weaponAngle += PI / 24 * this.weaponSpin;
      }
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

function preload() {
  redImage = loadImage("assets/Yabusame-Red.png")
  blueImage = loadImage("assets/Yabusame-Blue.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  rectMode(CENTER);
  imageMode(CENTER);  

  if (width > height) {
    arenaRadius = height/2;
  }
  else {
    arenaRadius = width/2;
  }

  clockSprites.push(loadImage("assets/clock1.png"));
  clockSprites.push(loadImage("assets/clock2.png"));
  clockSprites.push(loadImage("assets/clock3.png"));
  clockSprites.push(loadImage("assets/clock4.png"));
  clockSprites.push(loadImage("assets/clock5.png"));
  clockSprites.push(loadImage("assets/clock6.png"));
  clockSprites.push(loadImage("assets/clock7.png"));
  clockSprites.push(loadImage("assets/clock8.png"));

  scaling = arenaRadius / defaultRadius
  console.log(scaling)
  
  setInterval(tickAllHealth, 1000);
  setInterval(animateClock, 1000);

  console.log("Player 1: WASD move, space to throw")
}

function draw() {
  translate(width/2, height/2)
  background(220);

  if (gameState === 0) {
    text("One Minute Remaining", 0, -100);

    if (keyIsDown(87)) {
      mode = 0; // 1 player
    }
    if (keyIsDown(83)) {
      mode = 1; // 2 player
    }

    push();
    if (mode === 0) {
      fill(color(171,219,227));
    }
    else {
      fill("white")
    }
    rect(0, 0, 100, 30)
    pop();
    
    push();
    if (mode === 1) {
      fill(color(171,219,227));
    }
    else {
      fill("white")
    }
    rect(0, 50, 100, 30)
    pop();

    text("1 Player", 0, 0);
    text("2 Player", 0, 50);
    text("Press 1 to Start", 0, 100)
  }

  if (gameState === 1) {

    clockSprites[clockIndex].width = arenaRadius*2;
    clockSprites[clockIndex].height = arenaRadius*2;
    image(clockSprites[clockIndex], 0, 0);

    //circle(0, 0, arenaRadius*2)
    checkAllCollisions()
    for (let somePlayer of players) {
      somePlayer.checkInput();
      somePlayer.botWandering();
      somePlayer.update();
      somePlayer.display();
    }

    if (players.length < 2) {
      setTimeout(() => {
        gameState = 0;
      }, 1500);
    }
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

function startGame() {
  let isBot;
  if (mode === 0) {
    isBot = true;
  }
  else {
    isBot = false;
  }
  players = [];
  players.push(new Player(0, -arenaRadius/2, 87, 83, 65, 68, 32, false, redImage)); //w s a d space
  players.push(new Player(0, arenaRadius/2, 38, 40, 37, 39, 16, isBot, blueImage)) // upArrow downArrow leftArrow rightArrow Rshift
  gameState = 1;
}

function animateClock() {
  clockIndex++
  if (clockIndex > 7) {
    clockIndex = 0;
  }
}

function keyTyped() {
  if (key === "1" && gameState === 0) {
    startGame();
  }
}

let players = [];
let arenaRadius;
let gameState = 0;
let mode = 0;
let redImage;
let blueImage;
let clockSprites = [];
let clockIndex = 0;

let defaultRadius = 371;
let scale;

class Player {
  constructor({position, velocity, health}) {
    this.x = position.x;
    this.y = position.y;
    this.dx = velocity.x; 
    this.dy = velocity.y;
    this.hp = health.hp; 
    this.r = 10

    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
  }

  display() {
    fill("green")
    // circle(this.x, this.y, this.r); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  movement() {
  
    
  }

  update() {
    if (this.movingRight) {
      this.x += this.dx;
    }
    if (this.movingLeft) {
      this.x -= this.dx;
    }
    if (this.movingUp) {
      this.y -= this.dy;
    }
    if (this.movingDown) {
      this.y += this.dy;
    }
  }
}










class Storm {
  constructor({position, radius}) {
    this.x = position.x; 
    this.y = position.y; 
    this.r = radius;
  }

  display() {
    fill("red"); 
    // circle(this.x/2, this.y/2, this.r); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  shrink() {
    if (this.r > 100){
      this.r -= 0.5; 
    }
  }
}
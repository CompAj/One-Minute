class Player {
  constructor({position, velocity}) {
    this.x = position.x;
    this.y = position.y;
    this.dx = velocity.x; 
    this.dy = velocity.y;

    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
  }

  display() {
    fill("green")
    circle(this.x, this.y, 10); 
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
  constructor(x,y) {
    this.x = x; 
    this.y = y; 
    this.r = x; 
  }

  display() {
    fill("red"); 
    circle(this.x/2, this.y/2, this.r); 
  }

  shrink() {
    this.r -= 0.25; 
  }

  storm_check() {
    if (storm.r <= 1000){
      storm.r = 1000;
    }

  }
}
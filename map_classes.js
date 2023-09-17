class Player {
  constructor({position, velocity, health}) {
    this.x = position.x;
    this.y = position.y;
    this.dx = velocity.x; 
    this.dy = velocity.y;
    this.hp = health.hp; 
    this.r = 10
    this.lastDamageTime = millis();

    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
  }

  display() {
    noStroke(); 
    fill("red")
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }



  update() {

      if (this.movingRight && this.x + this.r < width) {
        this.x += this.dx;
      }
      if (this.movingLeft && this.x - this.r > 0) {
          this.x -= this.dx;
      }
      if (this.movingUp && this.y - this.r > 0) {
          this.y -= this.dy;
      }
      if (this.movingDown && this.y + this.r < height) {
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
    stroke(255,0,0);
    strokeWeight(5); 
    fill(255, 0, 0, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  shrink() {
    if (this.r > 100){
      this.r -= 1; 
    }
  }
}




class PowerUps {
  constructor(position) {
    this.x = position.x; 
    this.y = position.y; 
  }
}
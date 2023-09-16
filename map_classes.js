class Player {
  constructor({position, velocity}) {
    this.x = position.x;
    this.y = position.y;
    this.dx = velocity.x; 
    this.dy = velocity.y; 
  }

  display() {
    fill("green")
    circle(this.x, this.y, 10); 
  }

  movement() {

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
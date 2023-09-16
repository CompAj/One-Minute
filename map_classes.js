class Player {
  constructor() {
    this.x = 0;
    this.y = 0; 
  }

  display() {
    fill("green")
    circle(this.x, this.y, 10); 
  }

  movement() {
    this.x ++; 
  }
}
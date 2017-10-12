let particles = [];
let fires = {
  green: false,
  red: false,
  blue: false
};

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  generateParticles(5);
  for(let i=0; i < particles.length; i++){
    particles[i].purge();
    if(fires.green || fires.red || fires.blue && particles.length > 0){
      particles[i].update();
      particles[i].show();
    }
  }
}

function generateParticles(density){
  for(let i=0; i<density; i++){
    if(fires.green){
      particles.push(new Particle(100, 200, 'green'));
      removeParticles('green');
    }
    if(fires.red){
      particles.push(new Particle(350, 450, 'red'));
      removeParticles('red');
    }
    if(fires.blue){
      particles.push(new Particle(600, 700, 'blue'));
      removeParticles('blue');
    }
  }
}

function removeParticles(color){
  if(fires[color] == false){
    for(let i=0; i < particles.length; i++){
      if(particles[i].color == color){
        particles[i].alpha = 0;
      }
    }
  }
}

class Particle {
  constructor(x, xy, color){
    this.x = random(x, xy);
    this.y = 800;
    this.vx = random(-1, 1);
    this.vy = random(-10, -1);
    this.alpha = 150;
    this.color = color;
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  purge(){
     if(this.alpha <= 0){
       particles.splice(particles.indexOf(this), 1);
     }
  }

  show(){
    noStroke();
    if(this.color === 'green'){
      fill(100, 250, 100, this.alpha);
    } else if(this.color === 'red'){
      fill(255, 120, 100, this.alpha);
    } else if(this.color === 'blue'){
      fill(100, 120, 255, this.alpha);
    }
    ellipse(this.x, this.y, 20);
  }
}

function makeGreenFire(){
  fires['green'] = !fires['green'];
}

function makeRedFire(){
  fires['red'] = !fires['red'];
}

function makeBlueFire(){
  fires['blue'] = !fires['blue'];
}

let particles = [];
let density = 1;
let particleSize = 16;
let particleDecay = 5;

let fires = {
  green: false,
  red: false,
  blue: false
};

function setup() {
  let canvas = createCanvas(800, 800);

  canvas.parent('sketch-holder');
}

function draw() {
  background(0);
  generateParticles(density);
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
    this.alpha -= particleDecay;
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
    ellipse(this.x, this.y, particleSize);
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


//fire density slider
var fireDensitySlider = document.getElementById("fireDensity");
var densityOutput = document.getElementById("densityNum");
densityOutput.innerHTML = `Fire Density: ${fireDensitySlider.value}`;

fireDensitySlider.oninput = function() {
  density = this.value;
  densityOutput.innerHTML = `Fire Density: ${this.value}`;
}

//particle size slider
var particleSizeSlider = document.getElementById("particleSize");
var particleOutput = document.getElementById("particleSizeNum");
particleOutput.innerHTML = `Particle Size: ${particleSizeSlider.value}`;

particleSizeSlider.oninput = function() {
  particleSize = parseInt(this.value);
  particleOutput.innerHTML = `Particle Size: ${this.value}`;
}
//particle size slider
var particleSizeSlider = document.getElementById("particleSize");
var particleOutput = document.getElementById("particleSizeNum");
particleOutput.innerHTML = `Particle Size: ${particleSizeSlider.value}`;

particleSizeSlider.oninput = function() {
  particleSize = parseInt(this.value);
  particleOutput.innerHTML = `Particle Size: ${this.value}`;
}

//particle decay slider
var particleDecaySlider = document.getElementById("particleDecay");
var particleDecayOutput = document.getElementById("particleDecayNum");
particleDecayOutput.innerHTML = `Particle Decay: ${particleDecaySlider.value}`;

particleDecaySlider.oninput = function() {
  particleDecay = parseInt(this.value);
  particleDecayOutput.innerHTML = `Particle Decay: ${this.value}`;
}

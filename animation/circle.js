// Where is the circle
let x, y;
var depth = 1;
var a = 0; //angle

function setup() {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  x = width / 2;
  y = height /2;
  strokeWeight(2);
  frameRate(30);
  background(128, 0, 0);
  stroke(50);
  fill(100);
}

function draw() {
  a = a+0.1;
  drawCircle(x, y, height);
}


drawCircle = (x, y, width) => {
  console.log(x, y, width, Math.round(a));
  if(depth <= 0 || width < 2 ){
    return;
  }
  fill(noise(x)*255, noise(y+10000)*255, noise(5*x+5*y+20000)*255);
  ellipse(x, y, width);
  widthChange = depth * 8;
  newWidth = width - widthChange;
  xChange = depth*cos(a) * 4;// - (depth*2); //r cos (theta) is radius (angle adjusted at recursive call)

  yChange = depth*sin(a) * 4;// - (depth*2); //direction + length (r/2)

  drawCircle(x + xChange, y + yChange, newWidth);
}

var mouseWheel = (event) =>{
  (event.delta <= 0 ? depth ++ : depth --);
  if(depth < 1)
    depth = 1;
  if(depth > 8)
    depth = 8;
  redraw();
}

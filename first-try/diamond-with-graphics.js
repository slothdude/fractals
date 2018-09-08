var pg;
var depth = 0;
var bend1 = 0.5;
var bend2 = 0.5;

var setup = () => {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  background(10,10,10);
  strokeWeight(1.1);
  frameRate(10);
  noLoop();
  pg = createGraphics(width, height);
}

var draw = () => {
  if(depth < 0)
    return;
  pg.background(10);
  //bottom triangle
  drawTriangle(width/2, height, height/4, height/4, -1, depth);
  //top triangle
  drawTriangle(width/2, 0, height/4, height/4, 1, depth);
  image(pg, 0, 0);
}

drawTriangle = (x, y, xdist, ydist, mult, depth) => {
  if(depth <= 0 || xdist < 1)
    return;
  pg.stroke(noise(x)*255, noise(y+10000)*255, noise(5*x+5*y+20000)*255);
  pg.line(x,y,x-xdist, y+ydist*mult);
  pg.line(x,y,x+xdist, y+ydist*mult);
  //left side
  drawTriangle(x-xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult, depth-1);
  // right side
  drawTriangle(x+xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult, depth -1);
  // outmost inner
  drawTriangle(x, y, xdist*bend1, ydist*0.5, mult, depth -1);
  // inner inner, starting from middle. uncomment this for grid fractal
  // drawTriangle(x, y+2*ydist*mult, xdist*bend2, ydist*0.5, mult, depth -1);
}

var mouseWheel = (event) =>{
  (event.delta <= 0 ? depth ++ : depth --);
  if(depth < -1)
    depth = -1;
  if(depth > 8)
    depth = 8;
  redraw();
}

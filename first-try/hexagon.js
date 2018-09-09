var pg;
var depth = 0;
var bend1 = 0.5;
var bend2 = 0.5;

var setup = () => {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  background(10);
  stroke(10);

  strokeWeight(1.1);
  frameRate(10);
  noLoop();
  pg = createGraphics(width, height);
  // pg.fill(100);
}

var draw = () => {
  if(depth <= 0)
    return;
  pg.background(10);
  drawHex(height/6, width/2, height/2, depth);
  image(pg, 0, 0);
}

//draws one hexagon
var drawHex = (curHeight, centerx, centery, depth) => {
  // console.log(centerx+ "" + centery)
  if(depth <= 0 || curHeight < 2)
    return;
  pg.fill(noise(centerx)*255, noise(centery+10000)*255, noise(5*centerx+5*centery+20000)*255);
  pg.beginShape();
  //left
  pg.vertex(centerx - 2*(curHeight/sqrt(3)),centery);
  //bottom (starting with left)
  pg.vertex(centerx - (curHeight/sqrt(3)), centery + curHeight);
  pg.vertex(centerx + (curHeight/sqrt(3)), centery + curHeight);
  //right
  pg.vertex(centerx + 2*(curHeight/sqrt(3)),centery);
  //top (starting with right)
  pg.vertex(centerx + (curHeight/sqrt(3)), centery - curHeight);
  pg.vertex(centerx - (curHeight/sqrt(3)), centery - curHeight);
  pg.endShape(CLOSE);


  //left
  drawHex(curHeight/2, centerx - 3*(curHeight/sqrt(3)), centery, depth-1);
  //bottom (starting with left)
  drawHex(curHeight/2, centerx - 3/2*(curHeight/sqrt(3)), centery + 3/2*curHeight, depth-1);
  drawHex(curHeight/2, centerx + 3/2*(curHeight/sqrt(3)), centery + 3/2*curHeight, depth-1);
  //right
  drawHex(curHeight/2, centerx + 3*(curHeight/sqrt(3)), centery, depth-1);
  //top (starting with right)
  drawHex(curHeight/2, centerx + 3/2*(curHeight/sqrt(3)), centery - 3/2*curHeight, depth-1);
  drawHex(curHeight/2, centerx - 3/2*(curHeight/sqrt(3)), centery - 3/2*curHeight, depth-1);
}

var mouseWheel = (event) =>{
  (event.delta <= 0 ? depth ++ : depth --);
  if(depth < -1)
    depth = -1;
  if(depth > 8)
    depth = 8;
  redraw();
}

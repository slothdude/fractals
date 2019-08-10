var pg;
var dg;
var depth = 0;
var bend1 = 0.216;
// var bend2 = 0.7;
var currShape = "hexagon";
var a = 0;
var r = 50;
var circleSpacing = 3;

var setup = () => {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  background(10);
  noLoop();
  pg = createGraphics(width, height);
  dg = createGraphics(width, height);
  sg = createGraphics(width, height);
}

var draw = () => {
  console.log(currShape);
  if(depth <= 0)
    return;

  if(currShape == "hexagon"){
    pg.background(10);
    drawHex(height/6, width/2, height/2, depth);
    image(pg, 0, 0);
  }
  else if(currShape == "diamond"){
    dg.background(10);
    //bottom
    drawTriangle(width/2, height, height/4, height/4, -1, depth);
    //top
    drawTriangle(width/2, 0, height/4, height/4, 1, depth);
    image(dg, 0, 0);
  }
  else if(currShape == "spiral"){
    sg.background(50);
    drawSpiral(width/2, height/2, height);
    image(sg, 0, 0);
  }
}

drawSpiral = (x, y, width) => {
  if(depth <= 0 || width < 2 ){
    return;
  }
  sg.strokeWeight(2);
  sg.fill(noise(x)*255, noise(y+10000)*255, noise(5*x+5*y+20000)*255);
  sg.ellipse(x, y, width);
  // a += 0.1;
  // r += 1;
  xChange = 0;
  yChange = 0;//r * sin(a);
  push();
  // sg.translate(width / 2, height / 2);
  sg.ellipse(x, y, width);
  pop();
  drawSpiral(x, y+ 3*depth, width - (6*depth));
}

//draws one triangle
drawTriangle = (x, y, xdist, ydist, mult, depth) => {
  if(depth <= 0 || xdist < 1)
    return;
  dg.strokeWeight(2);
  dg.stroke(noise(x)*255, noise(y+10000)*255, noise(5*x+5*y+20000)*255);
  dg.line(x,y,x-xdist, y+ydist*mult);
  dg.line(x,y,x+xdist, y+ydist*mult);
  //left side
  drawTriangle(x-xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult, depth-1);
  // right side
  drawTriangle(x+xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult, depth -1);
  // outmost inner
  drawTriangle(x, y, xdist*bend1, ydist*0.5, mult, depth -1);
  // inner inner, starting from middle. uncomment this for grid fractal
  // drawTriangle(x, y+2*ydist*mult, xdist*bend2, ydist*0.5, mult, depth -1);
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
  if(depth < 1)
    depth = 1;
  if(depth > 8)
    depth = 8;
  redraw();
}

var mouseClicked = () => {
  depth = 1;
  switch(currShape){
    case "hexagon": currShape = "diamond"; break;
    case "diamond": currShape = "spiral"; break;
    case "spiral": currShape = "hexagon"; break;
  }
  redraw();
}

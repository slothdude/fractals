//What to do next: Make it so multiple fractals can be on the same page, select
//which one you want. also maybe try setting the sides at the same time as the up and down


function setup() {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  background(10,10,10);
  strokeWeight(1.1);
  frameRate(10);
  // noLoop();
  colorSlider = createSlider(0, 255, 100, 1);
  colorSlider.position(50, height/2);
  colorSlider.style('width', '200px');
  colorSlider.style('rotate', 90);
  // colorSlider.mouseMoved(() => {redraw()});
  depthSlider = createSlider(0, 10, 100, 1);
  depthSlider.position(width - 250, height/2);
  depthSlider.style('width', '200px');
  depthSlider.style('rotate', 90);
  depthSlider.style('margin-right', '50px');
  // depthSlider.mouseMoved(() => {redraw()});
}

function draw() {
  // clear();
  background(10,10,10);
  recurse(0, height, 0, height);
  recurse(height/4, height*3/4, height/4, height/2);
  recurse(-height/4, height*3/4, height/4, height/2);
}

recurse = (horo, bottom, top, curHeight) => {
  if(curHeight < 20)
    return;
  drawTriangle(width/2 + horo, bottom, curHeight/4, curHeight/4, -1);
  recurse(horo, bottom, (bottom+top)/2, curHeight/2);
  drawTriangle(width/2 + horo, top, curHeight/4, curHeight/4, 1);
  recurse(horo, (bottom+top)/2, top, curHeight/2);
}

//current way it works is by redrawing over the parts it doesnt need anymore
drawTriangle = (x, y, xdist, ydist, mult) => {
  if(xdist < 1 || ydist < 1){
    return;
  }
  var color;
  var depth = depthSlider.value();
  if(xdist < pow(depth+1,2) || ydist < pow(depth+1, 2)){
    stroke(10,10,10)
  }
  else{
    var color = colorSlider.value();
    stroke((x + color)*2 % 255, (y + color)*2 % 255, (x+color+y)*2 % 255);
  }
  var line1 = line(x,y,x-xdist, y+ydist*mult);

  var line2 = line(x,y,x+xdist, y+ydist*mult);

  drawTriangle(x-xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult);
  drawTriangle(x+xdist, y+ydist*mult, xdist*0.5, ydist*0.5, mult);
}

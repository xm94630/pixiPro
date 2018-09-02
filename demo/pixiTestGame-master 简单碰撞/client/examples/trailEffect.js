var x = 20.0; // Initial x-coordinate
var y = 10.0; // Initial y-coordinate
var targetX = 370.0; // Destination x-coordinate
var targetY = 380.0; // Destination y-coordinate
var easing = 0.02; // Size of each step along the path
var d;

var stage = new PIXI.Stage(0x000000);
var renderer = PIXI.autoDetectRenderer(512, 512,
  {antialiasing: true, transparent: false, resolution: 1});
document.body.appendChild(renderer.view);
 

var fade = new PIXI.Graphics();
stage.addChild(fade);

mainLoop();

function mainLoop() {
  d = dist(x, y, targetX, targetY);

  if (d > 1.0) {
    x += (targetX - x) * easing;
    y += (targetY - y) * easing;

    fade.beginFill(0x000000,0.03);
    fade.drawRect(0, 0, renderer.width, renderer.height);
    fade.endFill();             
    
    fade.beginFill(0x0cf727);
    fade.drawEllipse(x, y, 20, 20);
    fade.endFill();             
  }

  renderer.render(stage);          
  requestAnimationFrame(mainLoop);
}
 
// find distance between two points
function dist(x1,y1,x2,y2) {
  return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}






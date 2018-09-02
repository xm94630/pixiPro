// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var canvas = document.getElementById('content');
var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x1099bb});
var elem = document.getElementById("content");
elem.appendChild(renderer.view);

// The renderer will create a canvas element for you that you can then insert into the DOM.
elem.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();
stage.width = 800;
stage.height = 600;

var bgStage = new PIXI.Container();
bgStage.width = 800;
bgStage.height = 600;


// adding background
var bgTexture = PIXI.Texture.fromImage('balloons/bg.png');
var bg = new PIXI.Sprite(bgTexture);
//
//// center the sprite's anchor point
bg.anchor.x = 0.5;
bg.anchor.y = 0.5;
//
//// move the sprite to the center of the screen
bg.position.x = 400;
bg.position.y = 300;
//
bgStage.addChild(bg);
stage.addChild(bgStage);


// adding pointer
var pointerStage = new PIXI.Container();
pointerStage.width = 800;
pointerStage.height = 600;

var pointerTexture = PIXI.Texture.fromImage('balloons/bow.png');
var pointer = new PIXI.Sprite(pointerTexture);
pointer.anchor.x = 0;
pointer.anchor.y = 0;

pointer.position.x = 400;
pointer.position.y = 300;

pointerStage.addChild(pointer);
stage.addChild(pointerStage);





// adding fin ballons
var finStage = new PIXI.Container();
finStage.width = 800;
finStage.height = 600;

var finTexture = PIXI.Texture.fromImage('balloons/fin.png');
var fin = new PIXI.Sprite(finTexture);
fin.anchor.x = 0;
fin.anchor.y = 0;

fin.position.x = 0;
fin.position.y = 600;

finStage.addChild(fin);
stage.addChild(finStage);





// adding congrats 
var congratsStage = new PIXI.Container();
congratsStage.width = 800;
congratsStage.height = 600;

var congratsTexture = PIXI.Texture.fromImage('balloons/congrats.png');
var congrats = new PIXI.Sprite(congratsTexture);
congrats.anchor.x = 0.5;
congrats.anchor.y = 0;

congrats.position.x = 400;
congrats.position.y = -300;

congratsStage.addChild(congrats);
stage.addChild(congratsStage);
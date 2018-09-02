var balloons = [];

var totalDudes = 20;
var balloonsStage = new PIXI.Container();
balloonsStage.width = 800;
balloonsStage.height = 600;

for (var i = 0; i < totalDudes; i++)
{
    // create a new Sprite that uses the image name that we just generated as its source
    var dude =  PIXI.Sprite.fromImage('balloons/balloon.png');
    dude.buttonMode = true;
    // set the anchor point so the texture is centerd on the sprite
    dude.anchor.set(0.5);
    // make the button interactive...
    dude.interactive = true;
    
    // set the mousedown and touchstart callback...
    dude.on('mousedown', onButtonDown)
    dude.on('touchstart', onButtonDown)

    // set a random scale for the dude - no point them all being the same size!
    dude.scale.set(0.8 + Math.random() * 0.3);

    // finally lets set the dude to be at a random position..
    dude.position.x = Math.random() * renderer.width;
    dude.position.y = (Math.random() * renderer.height) + 400;

    dude.tint = Math.random() * 0xFFFFFF;

    // create some extra properties that will control movement :
    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
    dude.direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the dude over time
    dude.turningSpeed = Math.random() - 0.8;

    // create a random speed for the dude between 0 - 2
    dude.speed = 3 + Math.random() * 2;

    // finally we push the dude into the balloons array so it it can be easily accessed later
    balloons.push(dude);

    balloonsStage.addChild(dude);
   
}
 stage.addChild(balloonsStage);
// create a bounding box for the little dudes
var dudeBoundsPadding = 100;
var dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
                                    -dudeBoundsPadding,
                                    renderer.width + dudeBoundsPadding * 2,
                                    renderer.height + dudeBoundsPadding * 2);

var tick = 0;

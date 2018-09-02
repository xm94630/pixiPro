
//Lock Picker game developed by Alnoor Verjee using Pixi JS and Tween Max
//Intro Animation was created using CSS3 Keyframe Animations in styles.css

var app = new PIXI.Application();
document.body.appendChild(app.view);

// create a background
var background = PIXI.Sprite.fromImage('images/background.png');
background.width = app.screen.width;
background.height = app.screen.height;

// add background to stage
app.stage.addChild(background);

var textureLogo = PIXI.Texture.fromImage('images/logo.png');
var logo = new PIXI.Sprite(textureLogo);
logo.scale.set(0.6, 0.6);
logo.anchor.set(-0.55, -0.1);
app.stage.addChild(logo);

// font loader
PIXI.loader
		.add('message_simple-export', 'fonts/message_simple-export.xml')
        .load(onFontsLoaded);

var prizeText;
var prizes = ['£3', '£10', '£1,000'];
var randomPrize = prizes[Math.floor(Math.random()*prizes.length)];

var shufflingText;

function onFontsLoaded() {
	console.log(randomPrize);
	prizeText = new PIXI.extras.BitmapText(randomPrize, { font: '24px message_simple-export'});
    prizeText.alpha = 0;
    app.stage.addChild(prizeText);
    shufflingText = new PIXI.extras.BitmapText("SHUFFLING...", { font: '24px message_simple-export'});
    shufflingText.anchor.set(-1.3, -23.2);
    app.stage.addChild(shufflingText);
    pickText = new PIXI.extras.BitmapText("PICK A SAFE", { font: '24px message_simple-export'});
    pickText.anchor.set(-1.25, -19);
    pickText.alpha = 0;
    app.stage.addChild(pickText);
}

// creating textures
var textureSafe = PIXI.Texture.fromImage('images/box.png');
var textureDoor = PIXI.Texture.fromImage('images/box_door.png');
var textureShadow = PIXI.Texture.fromImage('images/box_padlock_shadow.png');
var textureLock = PIXI.Texture.fromImage('images/box_padlock.png');
var textureWin = PIXI.Texture.fromImage('images/pep_0.png');
var textureButtonOn = PIXI.Texture.fromImage('images/buttonOn.png');
var textureButtonOver = PIXI.Texture.fromImage('images/buttonOver.png');
var textureContinue = PIXI.Texture.fromImage('images/cta_textContinue.png');

var win = new PIXI.Sprite(textureWin);
//win.anchor.set(-1.6, -7.5);
win.anchor.set(0.5);
win.x = 400;
win.y = 475;
win.scale.set(0.75, 0.75);
win.alpha = 0;
app.stage.addChild(win);

var button = new PIXI.Sprite(textureButtonOn);
button.anchor.set(-1.15, -5.23);
button.alpha = 0;
button.interactive = true;
button.buttonMode = true;
button.scale.set(0.75, 0.75);
app.stage.addChild(button);


var continueText = new PIXI.Sprite(textureContinue);
continueText.anchor.set(-1.82, -12.7);
continueText.alpha = 0;
continueText.scale.set(0.75, 0.75);
app.stage.addChild(continueText);

var safes = [];
var doors = [];
var shadows = [];
var locks = [];

var safePositions = [
	195, 304,
	395, 304,
	595, 304
];

for (var i = 0; i < 3; i++) {
	
	var safe1Clicked;
	var safe2Clicked;
	var safe3Clicked;

	var safe = new PIXI.Sprite(textureSafe);
	safe.anchor.set(0.5);
	safe.x = safePositions[i*2];
    safe.y = safePositions[i*2 + 1];
    safe.scale.set(0.75, 0.75);

    var door = new PIXI.Sprite(textureDoor);
    door.x = safe.x - 75;
	door.y = safe.y - 70;
    door.scale.set(0.75, 0.75);

    var shadow = new PIXI.Sprite(textureShadow);
    shadow.x = safe.x - 35;
	shadow.y = safe.y - 30;
    shadow.scale.set(0.75, 0.75);

    var lock = new PIXI.Sprite(textureLock);
    lock.x = safe.x - 20;
	lock.y = safe.y - 40;
    lock.scale.set(0.75, 0.75);
    
    //create arrays
    safes.push(safe);
    doors.push(door);
    shadows.push(shadow);
    locks.push(lock); 

    app.stage.addChild(safes[i]);
    app.stage.addChild(doors[i]);
    app.stage.addChild(shadows[i]);
    app.stage.addChild(locks[i]); 

	//safe positions after shuffling: 2, 3, 1
	doors[i].on('pointerdown', function(i){
		if(!(safe1Clicked == true && safe2Clicked == true && safe3Clicked == true)){
			//if x value lies between certain ranges then we can clear the shadow and lock as well as the door
			//console.log(i.data.global.x);
			//safe 2
			if (i.data.global.x > 125 && i.data.global.x < 275) {
				
				TweenMax.to(doors[1], 0.75, {alpha:0, delay:0.75});
				TweenMax.to(shadows[1], 0.75, {alpha:0});
				TweenMax.to(locks[1], 0.75, {alpha:0});

				safe2Clicked = true;

				if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
					setPrize(1);
					//TweenMax.to(safes[1].scale, 0.5, {x:1.1, y:1.1, yoyo:true, repeat:1, delay:2});
				}
			//safe 3	
			} else if (i.data.global.x > 332 && i.data.global.x < 469) {
				
				TweenMax.to(doors[2], 0.75, {alpha:0, delay:0.75});
				TweenMax.to(shadows[2], 0.75, {alpha:0});
				TweenMax.to(locks[2], 0.75, {alpha:0});

				safe3Clicked = true;

				if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
					setPrize(2);
					//TweenMax.to(safes[2].scale, 0.5, {x:1.1, y:1.1, yoyo:true, repeat:1});
				}
			//safe 1
			} else {

				TweenMax.to(doors[0], 0.75, {alpha:0, delay:0.75});
				TweenMax.to(shadows[0], 0.75, {alpha:0});
				TweenMax.to(locks[0], 0.75, {alpha:0});

				safe1Clicked = true;

				if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
					setPrize(3);
					//TweenMax.to(safes[0].scale, 0.5, {x:1.1, y:1.1, yoyo:true, repeat:1});
				}
			}
		}

		function setPrize(n){	

			prizeText.x = 200 * n;
			prizeText.y = 290;
			//prizeText.alpha = 1;
			pickText.alpha = 0;
			//win.alpha = 1;

			prizeText.anchor.set(0.5);
			//win prize animation
			TweenMax.to(prizeText, 0.75, {alpha:1, delay:0.75});
			TweenMax.to(prizeText, 1, {y:150, yoyo:true, repeat:1, delay:1.75});
			TweenMax.to(prizeText.scale, 0.5, {x:1.5, y:1.5, yoyo:true, repeat:3, delay:4});
			TweenMax.to(win, 0.75, {alpha:1, delay:0.75});

			setTimeout(function(){
				win.alpha = 0;
				button.alpha = 1;
				continueText.alpha = 1;

				button.on('pointerover', function(){
					this.texture = textureButtonOver;
				});

				button.on('pointerout', function(){
					this.texture = textureButtonOn;
				});

				button.on('pointerdown', function(){
					this.texture = textureButtonOn;
					location.reload();
				});
				
			}, 6000);

		}

	});
}

//shuffling animations for safes

//safe 1
//right
TweenMax.to(safes[0], 1, {x:395, delay:1});
TweenMax.to(doors[0], 1, {x:320, delay:1});
TweenMax.to(shadows[0], 1, {x:360, delay:1});
TweenMax.to(locks[0], 1, {x:375, delay:1});

//down
TweenMax.to(safes[0], 1, {y:470, delay:2});
TweenMax.to(doors[0], 1, {y:400, delay:2});
TweenMax.to(shadows[0], 1, {y:440, delay:2});
TweenMax.to(locks[0], 1, {y:430, delay:2});

//right
TweenMax.to(safes[0], 1, {x:593, delay:3});
TweenMax.to(doors[0], 1, {x:520, delay:3});
TweenMax.to(shadows[0], 1, {x:560, delay:3});
TweenMax.to(locks[0], 1, {x:575, delay:3});

//up
TweenMax.to(safes[0], 1, {y:300, delay:4});
TweenMax.to(doors[0], 1, {y:230, delay:4});
TweenMax.to(shadows[0], 1, {y:270, delay:4});
TweenMax.to(locks[0], 1, {y:260, delay:4});

//safe 2
//down
TweenMax.to(safes[1], 1, {y:470});
TweenMax.to(doors[1], 1, {y:400});
TweenMax.to(shadows[1], 1, {y:440});
TweenMax.to(locks[1], 1, {y:430});

//left
TweenMax.to(safes[1], 1, {x:195, delay:1});
TweenMax.to(doors[1], 1, {x:120, delay:1});
TweenMax.to(shadows[1], 1, {x:160, delay:1});
TweenMax.to(locks[1], 1, {x:175, delay:1});

//up
TweenMax.to(safes[1], 1, {y:300, delay:2});
TweenMax.to(doors[1], 1, {y:230, delay:2});
TweenMax.to(shadows[1], 1, {y:270, delay:2});
TweenMax.to(locks[1], 1, {y:260, delay:2});

//safe 3
//down
TweenMax.to(safes[2], 1, {y:470});
TweenMax.to(doors[2], 1, {y:400});
TweenMax.to(shadows[2], 1, {y:440});
TweenMax.to(locks[2], 1, {y:430});

//up
TweenMax.to(safes[2], 1, {y:300, delay:2});
TweenMax.to(doors[2], 1, {y:230, delay:2});
TweenMax.to(shadows[2], 1, {y:270, delay:2});
TweenMax.to(locks[2], 1, {y:260, delay:2});

//left
TweenMax.to(safes[2], 1, {x:395, delay:3});
TweenMax.to(doors[2], 1, {x:320, delay:3});
TweenMax.to(shadows[2], 1, {x:360, delay:3});
TweenMax.to(locks[2], 1, {x:375, delay:3});

//enabling safes to be clicked on once shuffling animation has finished
setTimeout(function(){
	shufflingText.alpha = 0;
	pickText.alpha = 1;

	doors[0].interactive = true;
	doors[0].buttonMode = true;
	doors[1].interactive = true;
	doors[1].buttonMode = true;    
	doors[2].interactive = true;
	doors[2].buttonMode = true;        

}, 5000);





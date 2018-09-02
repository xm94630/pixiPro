
var step = 50;

// var DIR = 
// {
// 	left	= 0,
// 	up		= 1,
// 	right	= 2,
// 	top		= 3,
// };


var classShip = function(stage)
{
	var main = this;
	var mShip;
	var mDirectionLeft = false;
	var mDirectionRight = false;
	var mDirectionUp = false;
	var mDirectionDown = false;
	var mExplode;
	var mExplodeCount = 0;

	this.init = function()
	{
		var texture = PIXI.Texture.fromImage("assert/ship.png");
		mShip = new PIXI.Sprite(texture);
		mShip.anchor.x = 0.5;
		mShip.anchor.y = 0.5;
		mShip.position.x = 300;
		mShip.position.y = 250;
		stage.addChild(mShip);

		mExplode = new PIXI.Sprite(PIXI.Texture.fromImage("assert/explode.png"));
		mExplode.position.x = 300;
		mExplode.position.y = 250;
		mExplode.anchor.x = 0.5;
		mExplode.anchor.y = 0.5;
		stage.addChild(mExplode);
		mExplode.visible = false;
	}

	this.animate = function()
	{
		if(mDirectionLeft)
		{
			mShip.position.x -= 0.5;
		}
		else if(mDirectionRight)
		{
			mShip.position.x += 0.5;
		}
		else if(mDirectionUp)
		{
			mShip.position.y -= 0.5;
		}
		else if(mDirectionDown)
		{
			mShip.position.y += 0.5;
		}

		if(mExplodeCount > 0)
		{
			mExplodeCount--;
			if(mExplodeCount > step * 0.7)
			{
				mExplode.scale.x += (2.0 / step);
				mExplode.scale.y += (2.0 / step);
			}
			else
			{
				mExplode.scale.x -= (0.8 / step);
				mExplode.scale.y -= (0.8 / step);
				if(mExplodeCount == 1)
				{
					mExplode.visible = false;
					mShip.visible = false;
				}
			}
		}
		else
		{
		}
	}

	this.onBtnMouseDownLeft = function(e)
	{
		mDirectionLeft = true;
		mDirectionRight = false;
		mDirectionUp = false;
		mDirectionDown = false;
		mShip.rotation = 0;
	}
	this.onBtnMouseUpLeft = function(e)
	{
		mDirectionLeft = false;
	}
	this.onBtnMouseDownRight = function(e)
	{
		mDirectionLeft = false;
		mDirectionRight = true;
		mDirectionUp = false;
		mDirectionDown = false;
		mShip.rotation = 3.14;
	}
	this.onBtnMouseUpRight = function(e)
	{
		mDirectionRight = false;
	}
	this.onBtnMouseDownUp = function(e)
	{
		mDirectionLeft = false;
		mDirectionRight = false;
		mDirectionUp = true;
		mDirectionDown = false;
		mShip.rotation = 3.14 * 0.5;
	}
	this.onBtnMouseUpUp = function(e)
	{
		mDirectionUp = false;
	}
	this.onBtnMouseDownDown = function(e)
	{
		mDirectionLeft = false;
		mDirectionRight = false;
		mDirectionUp = false;
		mDirectionDown = true;
		mShip.rotation = 3.14 * 1.5;
	}
	this.onBtnMouseUpDown = function(e)
	{
		mDirectionDown = false;
	}

	this.onBtnMouseDownRemove = function(e)
	{
	}
	this.onBtnMouseUpRemove = function(e)
	{
		mExplodeCount = step;
		mExplode.scale.x = 0.01;
		mExplode.scale.y = 0.01;
		mExplode.visible = true;
		mExplode.position = mShip.position;
	}

	this.init();
}

var classMain = function()
{
	var main = this;
	var mShip;

	this.init = function()
	{
		var stage = new PIXI.Stage(0x6699ff, true);
		var renderer = PIXI.autoDetectRenderer(800, 600);
		document.body.appendChild(renderer.view);

		mShip = new classShip(stage);

		var btn_left = new PIXI.Sprite(PIXI.Texture.fromImage("assert/left.png"));
		btn_left.position.x = 500;
		btn_left.position.y = 500;
		var btn_right = new PIXI.Sprite(PIXI.Texture.fromImage("assert/right.png"));
		btn_right.position.x = 700;
		btn_right.position.y = 500;
		var btn_up = new PIXI.Sprite(PIXI.Texture.fromImage("assert/up.png"));
		btn_up.position.x = 600;
		btn_up.position.y = 400;
		var btn_down = new PIXI.Sprite(PIXI.Texture.fromImage("assert/down.png"));
		btn_down.position.x = 600;
		btn_down.position.y = 500;
		var btn_remove = new PIXI.Sprite(PIXI.Texture.fromImage("assert/remove.png"));
		btn_remove.position.x = 350;
		btn_remove.position.y = 500;

		stage.addChild(btn_left);
		stage.addChild(btn_right);
		stage.addChild(btn_up);
		stage.addChild(btn_down);
		stage.addChild(btn_remove);

		btn_left.setInteractive(true);
		btn_left.mousedown = function(mouseData)
		{
		   mShip.onBtnMouseDownLeft(mouseData);
		}
		btn_left.mouseup = function(mouseData)
		{
		   mShip.onBtnMouseUpLeft(mouseData);
		}

		btn_right.setInteractive(true);
		btn_right.mousedown = function(mouseData)
		{
		   mShip.onBtnMouseDownRight(mouseData);
		}
		btn_right.mouseup = function(mouseData)
		{
		   mShip.onBtnMouseUpRight(mouseData);
		}

		btn_up.setInteractive(true);
		btn_up.mousedown = function(mouseData)
		{
		   mShip.onBtnMouseDownUp(mouseData);
		}
		btn_up.mouseup = function(mouseData)
		{
		   mShip.onBtnMouseUpUp(mouseData);
		}

		btn_down.setInteractive(true);
		btn_down.mousedown = function(mouseData)
		{
		   mShip.onBtnMouseDownDown(mouseData);
		}
		btn_down.mouseup = function(mouseData)
		{
		   mShip.onBtnMouseUpDown(mouseData);
		}

		btn_remove.setInteractive(true);
		btn_remove.mousedown = function(mouseData)
		{
		   mShip.onBtnMouseDownRemove(mouseData);
		}
		btn_remove.mouseup = function(mouseData)
		{
		   mShip.onBtnMouseUpRemove(mouseData);
		}

		requestAnimFrame( animate );
		function animate() {
			requestAnimFrame( animate );
			mShip.animate();
			renderer.render(stage);
		}
	}

	this.init();
}


var mainView    = new classMain();
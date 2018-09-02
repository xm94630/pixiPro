/**
*    This object respresents the main playable game character
*    @param {object} spr - reference to sprite to be dynamically extended into playerShip
*/
var playerShip = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.acceleration = .05;
    spr.spd = 5;
    spr.turnSpd = .05; //speed at which ship rotates
    spr.friction = .997; //speed at which ship will gradually slowdown
    spr.canShoot = true;
    spr.coolingDown = false;
    spr.coolDownPeriod = 10;
    spr.coolDownTime = 0;
    spr.name = "playerShip";
    spr.respawnTime = 200;
    //Set up variables for after image effect
    spr.aImageIsCoolingDown = false;
    spr.aImageCoolDownPeriod = 1;
    spr.aImageCoolDownTime = 1;
    spr.aImageThreshold = false;



    /**
    *    This method prevents the ship from breaking a given speed limit
    *    @param {number} maxVX - speed cap for x-axis
    *    @param {number} maxVY - speed cap for y-axis
    */
    spr.speedCap = function(maxVX, maxVY){
        if (spr.vx > maxVX)  spr.vx = maxVX;
        if (spr.vx < -maxVX) spr.vx = -maxVX;
        if (spr.vy > maxVY)  spr.vy = maxVY;
        if (spr.vy < -maxVY) spr.vy = -maxVY;

        //check to see if going fast enough to leave after images
        var blazingX = Math.abs(spr.vx) > 7;
        var blazingY = Math.abs(spr.vy) > 7;
        if (blazingX || blazingY) {
            //spr.debugMsg("Threshold Reached!!");
            spr.aImageThreshold = true;
        }
    }

    /**
    *    This method creates an after image sprite
    *    Note: After Images do not come with image IDs
    *    @returns {object} - An output of the newly created afterImage
    */
    spr.afterImage = function(){
        var img = spr.texture;
        img = new _sprite(img);
        img = _objPolymorph(img);
        img.name = "afterImage";
        _gameMaster.initGameSprite(img);
        img.x = spr.x;
        img.y = spr.y;
        img.anchor.x = spr.anchor.x;
        img.anchor.y = spr.anchor.y;
        img.rotation = spr.rotation;
        img.update = function(delta){
            if (img.alpha > 0){
                img.alpha -= .05 * delta;
            }
            else{
                img.destroySelf();
            }
        }
        app.stage.addChild(img);
        return img.id;
    }
    /**
    *    This method enables a player ship to fire a bullet object
    *    @returnss {object} a new created bullet object
    */
    spr.fireBullet = function(){
        var img = _resources[_astroidSpritesSheet].textures["fireball.png"];
        var bullet = new _sprite(img);
        bullet = _objPolymorph(bullet);  //universal game object attributes
        _gameMaster.initGameSprite(bullet);    //register new sprite into game
        playerBullet(bullet); //bullet specific fields
        bullet.x = spr.x;
        bullet.y = spr.y;
        bullet.rotation = spr.rotation;
        //bullet.parent = spr;
        bullet.create();
        app.stage.addChild(bullet);

        return bullet;
    }

    /**
    *    The method handles the delay for bullet shooting
    *    TODO: reimpliment this using the ticker for timing
    *    @returns {number} value representing how long down will last
    */
    spr.bulletCoolDownCheck = function() {
        if (spr.coolDown){
            if (spr.coolDownTime > 0){
                spr.coolDownTime--;
            }
            else {
                spr.canShoot = true;
                spr.coolDown = false;
                spr.coolDownTime = spr.coolDownPeriod;
            }
        }
        return spr.coolDownTime;
    }

    /**
    *    This method checks for collisions and resets the game if the ship gets destroyed
    */
    spr.checkMyDeath = function (){
        if (spr.alive) {
            playerControls(spr);
            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, rockSpr){
                if (rockSpr.name === "asteroidRock"){
                    self.destroySelf();
                    rockSpr.explode();
                    _referee.playerDead = true;
                    spr.alive = false;
                    spr.vx = 0;
                    spr.vy = 0;
                }
            });
        }
        // else if (--spr.respawnTime < 0){
        //     window.location.reload();
        // }
    }
    /** DEBUGGING ITEMS **/
    spr.debugMsg = function (msg){
        if(spr.debug){
            spr.debug.text = "DEBUG: " + msg;
        }
    }

    /**
    *    This method checks if ship is fast enough for after images
    */
    spr.superFastEffect = function (){
        var fastAndCool = !spr.aImageIsCoolingDown && spr.aImageThreshold;
        if (spr.aImageIsCoolingDown){
            if (spr.aImageCoolDownTime > 0){
                spr.aImageCoolDownTime--;
            }
            else {
                spr.aImageIsCoolingDown = false;
            }
        }
        else if (fastAndCool) {
            spr.afterImage();
            spr.aImageCoolDownTime = spr.aImageCoolDownPeriod;
            spr.aImageIsCoolingDown = true;
            spr.aImageThreshold = false;
        }
    }

    /**
    *    @param {number} delta - A time based value that sustains relative space/time accuracy
    */
    spr.update = function(delta){
        spr.checkMyDeath();
        spr.bulletCoolDownCheck();
        spr.superFastEffect();
        //var msg = "vx: " + spr.vx +" vy:"+ spr.vy;;
        spr.debugMsg();

        spr.screenWrap();
        spr.speedCap(10,10);
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
    }
}

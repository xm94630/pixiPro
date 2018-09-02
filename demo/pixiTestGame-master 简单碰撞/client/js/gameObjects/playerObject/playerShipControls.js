
//Be sure to only define keys once, otherwise memory leak will occur!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);
k.fInput = keyboard(70);


/**  This utility function setups the player controls for the space ship
*    @param {object} ship - reference to game ship
*    @returnss TODO: find a testable return value to work with here
*/
var playerControls = function(ship){

    var thrusting = k.upInput.isDown;
    var turningLeft =  k.leftInput.isDown && !k.rightInput.isDown;
    var turningRight =  k.rightInput.isDown && !k.leftInput.isDown;
    var okToShoot = k.fInput.isDown && ship.canShoot;

    if (okToShoot){
        ship.fireBullet()
        ship.canShoot = false;
        ship.coolDown = true;
    }
    if(thrusting){
        if (ship.texture.textureCacheIds[0] === "ship1.png"){
            ship.texture = ship.textureThrust
        }
        ship.vx += Math.cos(ship.rotation) * ship.acceleration;
        ship.vy += Math.sin(ship.rotation) * ship.acceleration;
    }
    else {
        ship.vx *= ship.friction;
        ship.vy *= ship.friction;
        if (ship.texture.textureCacheIds[0] === "ship2.png"){
            ship.texture = ship.textureIdle
        }
    }
    if (turningRight) {
        ship.rotation += ship.turnSpd;
    }
    if (turningLeft) {
        ship.rotation -= ship.turnSpd;
    }
}

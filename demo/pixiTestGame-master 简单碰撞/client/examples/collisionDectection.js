function spriteCollision(spr1, spr2) {

    //Define the variables we'll need to calculate
    var possibleCollision, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    possibleCollision = false;

    //Find the center points of each sprite
    spr1.centerX = spr1.x + spr1.width / 2;
    spr1.centerY = spr1.y + spr1.height / 2;
    spr2.centerX = spr2.x + spr2.width / 2;
    spr2.centerY = spr2.y + spr2.height / 2;

    //Find the half-widths and half-heights of each sprite
    spr1.halfWidth = spr1.width / 2;
    spr1.halfHeight = spr1.height / 2;
    spr2.halfWidth = spr2.width / 2;
    spr2.halfHeight = spr2.height / 2;

    //Calculate the distance vector between the sprites
    vx = spr1.centerX - spr2.centerX;
    vy = spr1.centerY - spr2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = spr1.halfWidth + spr2.halfWidth;
    combinedHalfHeights = spr1.halfHeight + spr2.halfHeight;

    var horizontalCollision = Math.abs(vx) < combinedHalfWidths;
    var verticalCollision   = Math.abs(vy) < combinedHalfHeights;
    possibleCollision = horizontalCollision && verticalCollision;

    return possibleCollision;
};

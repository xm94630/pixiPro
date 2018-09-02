/**
*    This is a unique game object that essentially handles the logic and transition of game states.
*    @param {object} spr - reference to sprite to be dynamically expanded into statemachine
*/
var stateController = function(spr){
    var respawnTime = 200;
    spr.playerDead  = false

    /**
    *    This function checks to see if the game is over
    *    @returns {number} The amount of ticks left until the game is reset
    */
    spr.resetGame = function(){
        var gameOver = spr.playerDead
        if(gameOver){
            //Start the respawn timer
            if (--respawnTime < 0){
                window.location.reload();
            }
        }
        return respawnTime;
    }

    spr.update = function(delta){
        spr.resetGame();
    }
}

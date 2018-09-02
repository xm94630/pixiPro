var Level = function(gameMaster){
    this.game = gameMaster;
};


Level.preload = function(urls, loader){
    //Traverse url collection to cache graphics
    for (var x = 0; x < urls.length; x++){
        loader.add(urls[x]);
        console.log(urls[x] + ": loaded in the game");
    }
    //Load all resources into the game
    loader.load();

    //return value does not effect asynchronous timing
    return true;
};


/**
*    Place holder create method for game level, no return value because this method is arbitrary
*/
Level.create = function(sprites){};

Level.update = function(delta){
    requestAnimationFrame(update);
    this.game.updateAll(delta);
};

Level.start = function (){
    this.update();
}

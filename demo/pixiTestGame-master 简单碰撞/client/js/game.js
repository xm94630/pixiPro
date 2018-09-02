//setup game constants
var _container      = PIXI.container;
var _renderEngine   = PIXI.autoDetectRenderer;
var _loader         = PIXI.loader;
var _resources      = PIXI.loader.resources;
var _sprite         = PIXI.Sprite;
//var _animSpr        = new PIXI.extras.AnimatedSprite;
var _ticker         =  new PIXI.ticker.Ticker;
var _gameWidth      = 500;
var _gameHeight     = 500;
var _imgRoot        = "client/img/"; //from index.html location
var _astroidSpritesSheet = _imgRoot + "astroidsSprite.json";
var _urls           = [_astroidSpritesSheet];
var _gameCanvas     = document.getElementById("gameContainer");
var _gameMaster     = new spriteHandler; //from spriteHandler.js
var _objPolymorph   = gameObject.sprConstruct;

//setup game audio
var _ost = new Ost().init().src;

//Check for mobile TODO: make game responsive
var _mobileuser = /Android|webOS|iPhone|iPod|BlackBerry|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

//Initiate the game state controller
var _referee = {};
_objPolymorph(_referee);
stateController(_referee);
_gameMaster.initGameSprite(_referee);

//text object for bug tracking
var _debug = new PIXI.Text("DEBUG: ", {fontSize: 24});

//assign app parameters
var opts = {};
opts.autoStart = false;
opts.width     = _gameWidth;
opts.height    = _gameHeight;
opts.backgroundColor = 0x1099bb;

//initialize app
var app = new PIXI.Application(opts);
_gameCanvas.appendChild(app.view);

/**
*    @param {int} x - horizontal axis coordinate to set in canvas
*    @param {int} y - vertical axis coordiante to set in canvas
*    @param {object} src - A url reference to collection of textures
*    @param {string} texture - A url reference to ideal texture
*    @param {function} call - optional callback assign attributes to new sprite
*    @returns {obj}  - Ship sprite
*/
var addSprite = function(x, y, src, texture, call = false){
    var img  = _resources[src].textures[texture];
    var spr = new _sprite(img);
    spr = _objPolymorph(spr);
    spr.x = x;
    spr.y = y;

    if (call && typeof call === "function") {
        call(spr);
    }

    _gameMaster.initGameSprite(spr);
    return spr;
}

//setup scoreBoard
var scoreBoard = new Score("Score");
scoreBoard.init();

/**
*    @param {int} x - horizontal axis coordinate to set in canvas
*    @param {int} y - vertical axis coordiante to set in canvas
*    @param {object} src - A url reference to collection of textures
*    @param {string} texture - A url reference to ideal texture
*    @param {function} call - optional callback assign attributes to new sprite
*    @returns {obj}  - Ship sprite
*/
var addAnimatedSprite = function(x, y, src, textures, call = false){
    var spr  = PIXI.extras.AnimatedSprite.fromImages(textures)
    // for(var x = 0; x < textures.length; x++){
    //     // img.push(_resources[src].textures[x])
    //     img.push(PIXI.Texture[x])
    // }

    //var spr = new PIXI.extras.AnimatedSprite(img);
    //var spr = new _animSpr(img);
    spr = _objPolymorph(spr);
    spr.x = x;
    spr.y = y;
    spr.animationSpeed = 0.2;
    spr.loop = true;
    spr.play();
    console.log(spr.currentFrame)
    if (call && typeof call === "function") {
        call(spr);
    }

    _gameMaster.initGameSprite(spr);
    return spr;
}

/**
*    This handles loading game resources
*    @param {obj} L - A reference to the loader object
*    @param {array} urls - A collection of resource locations for loading
*    @param {function} call - Function to run when resources have fully loaded
*    @returns {bool} - Whether the resources have successfully loaded
*/
var preload = function(urls = _urls, L = _loader){

    //Traverse url collection to cache graphics
    for (var x = 0; x < urls.length; x++){
        L.add(urls[x]);
        console.log(urls[x] + ": loaded in the game");
    }
    //Load all resources into the game
    L.load();

    //return value does not effect asynchronous timing
    return true;
};

/**
*    Game loop that will constantly update the state of the game.
*    Ideal for game play logic
*/
var update = function(){
    //var lastTime = _ticker.lastTime;
    requestAnimationFrame(update);
    scoreBoard.format = scoreBoard.name + ": " + scoreBoard.score;
    scoreBoard.instance.text = scoreBoard.format;
    _gameMaster.updateAll(_ticker.deltaTime);
};

/**
*   TODO: make this function more modular and testable, add parameters and return value
        return value should be a number that represents a create state in FSM
*   TODO: make this function dynamic, it should be able to handle create phase of any level
*/
var createPhase = function(){
    console.log("Everything has loaded!");
    var shipTextures = [_imgRoot+"sprites/ship2.png",_imgRoot+"sprites/ship1.png",];
    //_gameMaster.initGameSprite(scoreBoard);
    //var ship = addAnimatedSprite(250, 250, _astroidSpritesSheet, shipTextures, playerShip);
    var ship = addSprite(250, 250, _astroidSpritesSheet, "ship1.png", playerShip);
    ship.debug = _debug; //temporary
    ship.textureIdle = ship.texture;
    ship.textureThrust = _resources[_astroidSpritesSheet].textures["ship2.png"];

    var asteroid1 = addSprite(150,100, _astroidSpritesSheet, "rock1.png", asteroidRock);
    var asteroid2 = addSprite(350,400, _astroidSpritesSheet, "rock2.png", asteroidRock);
    asteroid1.sizeState = "big";
    asteroid2.sizeState = "big";
    //app.stage.addChild(ship.debug);
    app.stage.addChild(scoreBoard.instance);
    app.stage.addChild(ship);
    app.stage.addChild(asteroid1);
    app.stage.addChild(asteroid2);
    _gameMaster.createAll();
}

//Make sure resources are loaded before starting game
_loader.onComplete.add(createPhase);

//Run the game
(function startGame(){

    console.log(_urls);
    preload(_urls, _loader);
     //only needs to be ran once
    app.render();
    //_ticker.start();
    update();
})()

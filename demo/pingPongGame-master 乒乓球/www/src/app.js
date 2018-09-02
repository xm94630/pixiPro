/* jshint browser:true */
/* globals PIXI, requestAnimationFrame */
(function() {

    document.addEventListener('DOMContentLoaded', function() {
        
        // define EDGE
        var LEFT = "left",
            RIGHT = "right",
            TOP = "top",
            BOTTOM = "bottom";
        
        // define default velocity value
        var DEFAULT_VELOCITY = 5;
        
        // define PIXI libraries
        var Graphics = PIXI.Graphics,
            Text = PIXI.Text,
            Container = PIXI.Container,
            autoDetectRenderer = PIXI.autoDetectRenderer;
        
        // define Game Objects
        var circle,
            roundBox;
        
        // define parameters
        var isStopGame;
        var isPlayGame;
        
        // create an new instance of a pixi stage
        var stage = new Container();
        
        // create an new instance of a gameOverScene
        var gameOverScene = new Container();
        gameOverScene.visible = false;
        
        stage.addChild(gameOverScene);
        
        // register backgound listener
        stage.interactive = true;
        stage.mousedown = stage.touchstart = onMouseDown;
        stage.mousemove = stage.touchmove = onMouseMove;
        stage.mouseup = stage.touchend = onMouseUp;
        stage.tap = onMouseMove;
        
        // create a renderer instance
        var width = window.innerWidth//screen.availWidth;
        var height = window.innerHeight//screen.availHeight;
        var renderer = new autoDetectRenderer(width, height);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);
        
        requestAnimationFrame(onStart);
        
        var scores = 0;
        var message = new Text(
          "0", 
          {font: "32px sans-serif", fill: "white"}
        );

        message.position.set(20, 20);
        message.visible = false;
        stage.addChild(message);
        
        function onStart() {            
            if(!isPlayGame){
                initPlayButton();
            }else{
                message.visible = true;
                
                initCircleObject();
                initRoundBoxObject();
                initGameOverScene();

                circle.vx = DEFAULT_VELOCITY;
                circle.vy = DEFAULT_VELOCITY;

                requestAnimationFrame(onUpdate);        
            }
        
        }
        
        
        function onUpdate(){
            
            // Stop game
            if(isStopGame) return;
            
            requestAnimationFrame(onUpdate);
            
            circle.y += circle.vy;
            circle.x += circle.vx;

            var edge,
                isHit;
            
            //check for a collision between the 'circle' and the 'roundBox'
            isHited = hitObjects(circle, roundBox);
            
            var frameHeight;
            if (isHited) {
//                frameHeight = height;
                // plus scores
                        scores++;
                        
                        // show user's scores
                        message.text = scores;
                        
                        circle.vy = (-1.1) * circle.vy;
                        circle.vx = (1.1) * circle.vx;  
            }else{
                frameHeight = height + roundBox.height;
                
                 edge = contain(circle, {x: 0, y: 0, width: width, height: frameHeight});

            // check position hited of 'circle'
            switch(edge){
                case LEFT:{
                    circle.vx = (-1) * circle.vx;
                    break;
                }
                case RIGHT:{
                     circle.vx = (-1) * circle.vx;

                    break;
                }
                case TOP:{
                    circle.vy = (-1) * circle.vy;

                    break;
                }
                 case BOTTOM:{
                    if(!isHited){
                        // lose game
                        lose();
                        
                    }else{
                        // plus scores
                        scores++;
                        
                        // show user's scores
                        message.text = scores;
                        
                        circle.vy = (-1.1) * circle.vy;
                        circle.vx = (1.1) * circle.vx;   
                    }

                    break;
                }
                    
                default:{
                    break;
                }
            }
            }
            
           
            
            // render the stage
            renderer.render(stage);
        }
        
        
        // lose game
        function lose(){
            isStopGame = true;
            
            circle.vy = 0;
            circle.vx = 0;  
            
            gameOverScene.visible = true;
        }
        
        // reset game
        function reset(){
            isStopGame = false;
            
            scores = 0;
            message.text = scores;
            
            circle.vy = DEFAULT_VELOCITY;
            circle.vx = DEFAULT_VELOCITY;
            
            circle.x = Math.floor((Math.random() * width) + 0);
            circle.y = 130;            
            
            gameOverScene.visible = false;
            
            onUpdate();
        }
        
        /***** ACTIONS ******/
        function onMouseDown(mouseData){
            console.log("onMouseDown");

            if(isStopGame){
               reset();
            }
            
             var mouse = mouseData.data.originalEvent;
            _mouseY = mouse.y;
            _mouseX = mouse.x;
            
            if(_mouseX > (width - roundBox.width)){
                
                _mouseX = width - roundBox.width;
                
            }
   
            // update roundBox position
            roundBox.x = _mouseX;
        }
        
        function onMouseMove(mouseData){
//             console.log("onMouseMoved");
            
            if(isStopGame) return;
            
             var mouse = mouseData.data.originalEvent;
            _mouseY = mouse.y;
            _mouseX = mouse.x;
            
            if(_mouseX > (width - roundBox.width)){
                
                _mouseX = width - roundBox.width;
                
            }
   
            // update roundBox position
            roundBox.x = _mouseX;
        }
        
        function onMouseUp(mouseData){
            console.log("onMouseUp");

        }
        
        /***** EXTERNAL FUNCTION *****/
        function contain(sprite, container) {

          var collision = undefined;

          //Left
          if (sprite.x < container.x) {
            sprite.x = container.x;
            collision = LEFT;
          }

          //Top
          if (sprite.y < container.y) {
            sprite.y = container.y;
            collision = TOP;
          }

          //Right
          if (sprite.x + sprite.width > container.width) {
            sprite.x = container.width - sprite.width;
            collision = RIGHT;
          }

          //Bottom
          if (sprite.y + sprite.height > container.height) {
            sprite.y = container.height - sprite.height;
            collision = BOTTOM;
          }

          //Return the `collision` value
          return collision;
        }
        
        //The `hitObjects` function
        function hitObjects(r1, r2) {

          //Define the variables we'll need to calculate
          var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

          //hit will determine whether there's a collision
          hit = false;

          //Find the center points of each sprite
          r1.centerX = r1.x + r1.width / 2; 
          r1.centerY = r1.y + r1.height / 2; 
          r2.centerX = r2.x + r2.width / 2; 
          r2.centerY = r2.y + r2.height / 2; 

          //Find the half-widths and half-heights of each sprite
          r1.halfWidth = r1.width / 2;
          r1.halfHeight = r1.height / 2;
          r2.halfWidth = r2.width / 2;
          r2.halfHeight = r2.height / 2;

          //Calculate the distance vector between the sprites
          vx = r1.centerX - r2.centerX;
          vy = r1.centerY - r2.centerY;

          //Figure out the combined half-widths and half-heights
          combinedHalfWidths = r1.halfWidth + r2.halfWidth;
          combinedHalfHeights = r1.halfHeight + r2.halfHeight;

          //Check for a collision on the x axis
          if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

              //There's definitely a collision happening
              hit = true;
            } else {

              //There's no collision on the y axis
              hit = false;
            }
          } else {

            //There's no collision on the x axis
            hit = false;
          }

          //`hit` will be either `true` or `false`
          return hit;
        }
        
        function initCircleObject(){
            //Circle
            circle = new Graphics();
            circle.beginFill(0x9966FF);
            circle.drawCircle(0, 0, 15);
            circle.endFill();
            circle.x = 64;
            circle.y = 130;

            stage.addChild(circle);
        }
        
        function initRoundBoxObject(){
            
            var roundBoxHeight = 20;
            var roundBoxWidth = width/4;
            
            //Rounded rectangle
            roundBox = new Graphics();
            roundBox.lineStyle(4, 0x9966FF, 1);
            roundBox.beginFill(0xFF9933);
            roundBox.drawRoundedRect(0, 0, roundBoxWidth, roundBoxHeight, 10)
            roundBox.endFill();
            roundBox.x = 5;
            roundBox.y = height - roundBoxHeight;
            stage.addChild(roundBox);
        }
        
        function initGameOverScene(){
            var loseMessage = new Text(
                  "YOU LOSE :((\n\nTAP ME TO RETRY", 
                  {font: "32px sans-serif", fill: "white", align: "center"}
                 );
            loseMessage.anchor.x = 0.5;
            loseMessage.anchor.y= 0.5;
            
            loseMessage.x = width/2;
            loseMessage.y = height/2;
            
            gameOverScene.addChild(loseMessage);
        }
    
        function initPlayButton(){
            var playButton = new Text(
                  "PLAY", 
                  {font: "32px sans-serif", fill: "white", align: "center"}
                 );
            playButton.anchor.x = 0.5;
            playButton.anchor.y= 0.5;
            
            playButton.x = width/2;
            playButton.y = height/2;
            
            stage.addChild(playButton);
            renderer.render(stage);

            // turn on interactive
            playButton.interactive = true;
            playButton.click = playButton.tap = function play(){
                playButton.visible = false;
                isPlayGame = true;
                
                onStart();
            }
        }
        
    }, false);

}());


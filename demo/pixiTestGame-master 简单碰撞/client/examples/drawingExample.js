var app = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb});

var game = document.getElementById("gameContainer");
//var game = document.getElementById('gameContainer')
game.appendChild(app.view);

// document.body.appendChild(app.view);

var basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 30;
basicText.y = 90;

app.stage.addChild(basicText);

var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
richText.x = 30;
richText.y = 180;

var generateText = function(x, y, text, style){
    var newText = new PIXI.Text(text, style);
    newText.x = x;
    newText.y = y;
    return newText;
}

app.stage.addChild(richText);

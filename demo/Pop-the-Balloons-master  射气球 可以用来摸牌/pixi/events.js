function onButtonDown()
{
    this.alpha = 0.5;
    var balloonIndex = balloons.indexOf(this);
    console.log('Clicked!', balloonIndex);
    balloonsStage.removeChildAt(balloonIndex);
    shoot.play();
    if (balloonIndex > -1) {
        balloons.splice(balloonIndex, 1);
    }
    if (balloons.length < 1) {
//        setTimeout(function() { alert("Congratulations!"); }, 10);
//        alert('Congratulations!')
        var blurFilter1 = new PIXI.filters.BlurFilter();
        var blurFilter2 = new PIXI.filters.BlurFilter();

        bg.filters = [blurFilter1];
        pointer.filters = [blurFilter2];
        music.play();
        animateFin();
    }
}



function animateFin() {
    requestAnimationFrame(animateFin);
    congrats.position.y += Math.random(congrats.direction) * 7;
    if (congrats.position.y > 5)
        {
            congrats.position.y = 5;
        }
    
    
    // just for fun, let's rotate mr rabbit a little
    fin.position.y -= Math.random(fin.direction) * 11;
    if (fin.position.y < 5)
        {
            fin.position.y = 5;
        }
    // render the container
    renderer.render(stage);
}


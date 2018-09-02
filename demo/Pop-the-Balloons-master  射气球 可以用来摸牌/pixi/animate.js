
requestAnimationFrame(animate);

function animate() {

    // iterate through the dudes and update their position
    for (var i = 0; i < balloons.length; i++)
    {
        var dude = balloons[i];
        dude.direction += dude.turningSpeed * 0.01;
        dude.position.x += Math.sin(dude.direction) * dude.speed;
        dude.position.y -= Math.random(dude.direction) * dude.speed;
//        dude.position.y -= 1;
//        dude.rotation = -dude.direction - Math.PI / 2;

        // wrap the dudes by testing their bounds...
        if (dude.position.x < dudeBounds.x)
        {
            dude.position.x += dudeBounds.width;
        }
        else if (dude.position.x > dudeBounds.x + dudeBounds.width)
        {
            dude.position.x -= dudeBounds.width;
        }

        if (dude.position.y < dudeBounds.y)
        {
            dude.position.y += dudeBounds.height;
        }
        else if (dude.position.y > dudeBounds.y + dudeBounds.height)
        {
            dude.position.y -= dudeBounds.height;
        }
    }
//    pointer.position.x = document.event.clientX;
//    pointer.position.y = document.event.clientY;
    // increment the ticker
    tick += 1;

    // time to render the stage!
    renderer.render(stage);

    // request another animation frame...
    requestAnimationFrame(animate);
}

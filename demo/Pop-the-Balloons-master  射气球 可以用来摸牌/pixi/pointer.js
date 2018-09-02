document.addEventListener('mousemove', function(event) {
    console.log(event.clientX, event.clientY);
    pointer.position.x = event.clientX;
    pointer.position.y = event.clientY;
});
# Basic Scaling, Animation, and Parallax Tutorial for Pixi.js v3

This is a demo of several basic game features in Pixi.js v3:

 * Scaling to fill available screen space;
 * Using alternate high resolution graphics;
 * Basic spritesheet animation;
 * Parallax scrolling using tiled sprites;
 * Spritesheet creation with TexturePacker.

The demo is [available live](http://rocketshipgames.com/tmp/20150908-pixi-scaling/).  There is also an [extensive writeup](http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/).

![Screenshot](https://github.com/RocketshipGames/tutorial-pixi-scaling/raw/master/article/game-shot.png)

## Assets

All of the assets used are open game art by [Bevouliin](http://bevouliin.com/):

 * [Background](http://opengameart.org/content/bevouliin-free-game-background-for-game-developers)
 * [Monster](http://opengameart.org/content/bevouliin-free-flappy-monster-sprite-sheets)

## TexturePacker

The spritesheets have been prepared using ImageMagick and TexturePacker, a la:

    cd sources/monster/Transparent\ PNG/flying/       
    mkdir sm
    for i in frame-*.png; do convert $i -scale 10% sm/$i; done
    cd -
    TexturePacker --png-opt-level 0 --algorithm "Basic" \
                  --disable-rotation --trim-mode "None" \
                  --format "json" --data monster.json   \
                  --sheet monster.png                   \
                  sources/monster/Transparent\ PNG/flying/sm/*

## License

This software is released under the [open source MIT license](https://opensource.org/licenses/MIT):

Copyright (c) 2015 [Joe Kopena](http://rocketshipgames.com/blogs/tjkopena/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

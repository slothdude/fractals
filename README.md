*still updating but it works*

Trying it yourself
==========

```
git clone (project url)
start ./fractals/first-try/index.html
```
(or open index.html *in a browser* another way)

Overview
==========

A fractal is a shape that is the same when you zoom in on a specific part. In the
hourglass part below, notice how the 2 sides are identical to the whole:
![fractal-demonstration](https://media.giphy.com/media/xBoMMLbTUP4i0EL9TK/giphy.gif)

![sketch.js](./first-try/sketch.js) was my first try and is very slow, but you
can control the color with the slider on the left and the fractal depth with the
slider on the right. If you want to see this, change the script that is being
rendered in ![index.html](./first-try/index.html)

Playing
==============

To switch which fractal you are rendering, click the screen.
*Note*: It's not animated, you control it with the mousewheel.


Future Plans
============

- syncing up to music
- playing with sound
- circle fractals
- increase speed

Challenges
========

1. I was having trouble going back in depth of the fractal. **Solved**: Everytime
the depth of the fractal changes, the picture is redrawn into a graphics buffer
and re-rendered.

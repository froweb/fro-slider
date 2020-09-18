# fro-slider

Fro-slider is fairly easy to implement into a project. it has no redundant features and is intuitive.

## Getting Started

To install the slider, you can either manually download the repository (https://github.com/froweb/fro-slider) or use npm:

```
$ npm install --save fro-slider
```

Add the css file to the <head> section of your HTML. Then you need to apply the slider HTML code in the right place of your page. The result should look something like this:

```html
<html>
<head>
	...
	<link rel="stylesheet" href="./fro-slider.css">
	<link rel="stylesheet" href="./default.css">
	...
</head>
<body>
  ...
  <div class="fro-slider" id="one">
    <div class="fro-slider__row">
      <img class="fro__slide" src="./images/img_1.jpg" alt="Kitty">
      <img class="fro__slide" src="./images/img_2.jpg" alt="Kitty">
      <img class="fro__slide" src="./images/img_3.jpg" alt="Kitty">
    </div>
  </div>
  ...
	<script src="./index.js"></script>
</body>
</html>
```

Add the lines below to your index.js file and the slider will work with default settings!

```js
const Froslider = require('fro-slider');
...
const myFavoriteSlider = new Froslider('one');
myFavoriteSlider.play();
```
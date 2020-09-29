# fro-slider

Fro-slider is fairly easy to implement into a project. it has no dependencies, redundant features and is intuitive.

## Getting Started

To install the slider, you can either manually download the repository (https://github.com/froweb/fro-slider) or use npm:

```
$ npm install fro-slider --save
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

The default settings do not suit you? You can customize the slider like this:

```js
const Froslider = require('fro-slider');
...
const myFavoriteSlider = new Froslider();
myFavoriteSlider.options = {
  id: 'one',
  interval: 5,
  dots: true,
  buttons: true,
  click: false,
}
myFavoriteSlider.play();
```

## Settings

|Setting|Default Value|Type|Description|
|---|---|---|---|
|id|no default|String|ID selector for the slider|
|interval|0|Number|Time (in second) to wait before changing to the next slide|
|dots|true|Boolean|Display dots (markers) for easy navigation among images|
|buttons|true|Boolean|Display buttons (previous / next) for easy navigation between images|
|click|false|Boolean|Show next image when clicking on image (does not work when showing buttons)|

## Demos

coming soon ...

## License

ISC
module.exports = FroSlider;
'use strict';

class FroSlider {
  /**
  * Setting basic parameters of the slider.
  * @param {string} id Identifier of the processed slider.
  * @param {boolean} avtoplay Automatic image change in the slider.
  * @param {number} interval Time interval between image change (in seconds).
  */
  constructor (id, avtoplay, interval) {
    this.options = {
      id: id,
      avtoplay: avtoplay || true,
      interval: interval || 5,
    }
    this.play();
  }
  /**
  * Checking the validity of the types of slider parameters.
  */
  checkIncoming() {
    if (this.options.id == '' || typeof this.options.id !== 'string') {
      console.log(
        "fro-slider ERROR! \n" + 
        "Parameter \"id\" is set incorrectly!");
    }
    if (typeof this.options.avtoplay !== 'boolean') {
      console.log(
        "fro-slider ERROR! \n" + 
        "Parameter \"avtoPlay\" is set incorrectly!");
        this.options['avtoplay'] = false;
    }
    if (typeof this.options.interval !== 'number') {
      console.log(
        "fro-slider ERROR! \n" + 
        "Parameter \"interval\" is set incorrectly!");
    }
  }
  /**
  * Gets all images in slider.
  * @param {object} sliderId Charset of connecting DataBase.
  * @return {object} Returns NodeList of images in the slider.
  */
  getItems(sliderId) {
    const sliderItems = sliderId.querySelectorAll(".fro__slide");
    return sliderItems;
  }
  /**
  * Adds a class to display the image.
  * @param {number} i Number of the desired image in the set.
  */
  addView(i) {
    const sliderId = document.querySelector(`#${this.options.id}`);
    const sliderItems = this.getItems(sliderId);
    sliderItems[i].classList.add('active-slide');
  }
  /**
  * Removes a class to hide the image.
  * @param {number} i Number of the desired image in the set.
  */
  removeView(i) {
    const sliderId = document.querySelector(`#${this.options.id}`);
    const sliderItems = this.getItems(sliderId);
    sliderItems[i].classList.remove('active-slide');
  }
  /**
  * Shows the next image.
  * @param {object} sliderItems NodeList of images in the slider.
  */
  setNext(sliderItems) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('active-slide')) {
        const end = sliderItems.length - 1;
        if (i == end) {
          this.removeView(i);
          this.addView(0);
        } else {
          this.removeView(i);
          this.addView(++i);
        }
      }
    }
  }
  /**
  * Shows the previous image.
  * @param {object} sliderItems NodeList of images in the slider.
  */
  setPrev(sliderItems) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('active-slide')) {
        if (i == 0) {
          const endSlide = sliderItems.length - 1;
          this.removeView(i);
          this.addView(endSlide);
          i = endSlide;
        } else {
          this.removeView(i);
          this.addView(--i);
        }
      }
    }
  }
  /**
  * Start displaying images.
  */
  play() {
    const sliderId = document.querySelector(`#${this.options.id}`);
    const sliderItems = this.getItems(sliderId);
    sliderItems[0].classList.add('active-slide');
    this.checkIncoming();

    if (this.options.avtoplay) {
      setInterval(() => this.setNext(sliderItems), this.options.interval * 1000);
    }
  }
}

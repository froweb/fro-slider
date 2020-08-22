'use strict';

// export default 
class FroSlider {
  /**
  * Setting basic parameters of the slider.
  * @param {string} id Identifier of the processed slider.
  * @param {boolean} avtoplay Automatic image change in the slider.
  * @param {number} interval Time interval between image change (in seconds).
  * 
  */
  constructor (id, avtoplay, interval) {
    this.options = {
      id: id,
      avtoplay: avtoplay || true,
      interval: interval || 5,
    }
    this.play();
  }

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

  play() {
    const sliderId = document.querySelector(`#${this.options.id}`);
    const sliderItems = this.getItems(sliderId);
    sliderItems[0].classList.add('active-slide');
    this.checkIncoming();
  }
}

window.addEventListener('DOMContentLoaded', function() {
  new FroSlider("one", true, 6);
})
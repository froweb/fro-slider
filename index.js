module.exports = FroSlider;
'use strict';

class ProtoSlider {
  constructor(id) {
    this.options = {
      id: id
    }
  }
  /**
  * Returns a slider object by id.
  * @return {object} Object by id.
  */
  get sliderId() {
    return document.querySelector(`#${this.options.id}`);
  }
  /**
  * Gets all images in slider.
  * @return {object} Returns NodeList of images in the slider.
  */
  get sliderItems() {
    return this.sliderId.querySelectorAll('.fro__slide');
  }
  /**
  * Gets id of autoplay function.
  * @return {number} Returns NodeList of images in the slider.
  */
  get newPlayId() {
    return setInterval(() => this.setNext(), this.options.interval * 1000);
  }
  /**
  * Adds a class to display the image.
  * @param {number} i Number of the desired image in the set.
  */
  addView(i) {
    this.sliderItems[i].classList.add('active-slide');
    if (this.options.dots == true) {
      let dotItem = this.sliderId.querySelectorAll('.fro__dot');
      dotItem[i].classList.add('active-dot');
    }
  }
  /**
  * Removes a class to hide the image.
  * @param {number} i Number of the desired image in the set.
  */
  removeView(i) {
    this.sliderItems[i].classList.remove('active-slide');
    if (this.options.dots == true) {
      let dotItem = this.sliderId.querySelectorAll('.fro__dot');
      dotItem[i].classList.remove('active-dot');
    }
  }
  /**
  * Shows the next image.
  */
  setNext() {
    for (let i = 0; i < this.sliderItems.length; i++) {
      if (this.sliderItems[i].classList.contains('active-slide')) {
        const end = this.sliderItems.length - 1;
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
  */
  setPrev() {
    for (let i = 0; i < this.sliderItems.length; i++) {
      if (this.sliderItems[i].classList.contains('active-slide')) {
        if (i == 0) {
          const endSlide = this.sliderItems.length - 1;
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
  * Show the desired image at the selected dot.
  * @param {object} target Node of selected dot.
  * 
  */
  setDot(target) {
    console.log(target);
    const dotItem = this.sliderId.querySelectorAll('.fro__dot');
    for (let i=0; i < dotItem.length; i++) {
      if (dotItem[i].classList.contains('active-dot')) {
        this.removeView(i);
      }
      if (target == dotItem[i]) {
        this.addView(i);
      }
    }
  }
  /**
  * Adds dots to navigate through slides.
  */
  makeDots() {
    let dotRow = document.createElement('div');
    dotRow.className = 'fro__dot-bar';
    this.sliderId.append(dotRow);
    for (let i=0;  i < this.sliderItems.length; i++) {
      let dotTage = document.createElement('button');
      dotTage.className = 'fro__dot';
      if (i==0) {
        dotTage.className = 'fro__dot active-dot';
      }
      dotRow.append(dotTage);
    }
  }
  /**
  * Adds buttons to navigate through slides.
  */
  makeButtons() {
    const btnRow = document.createElement('div'),
          btnNext = document.createElement('button'),
          btnPrev = document.createElement('button');
    btnRow.className = 'fro__btn-bar';
    btnNext.className = 'fro__btn btn-next';
    btnPrev.className = 'fro__btn btn-prev';
    this.sliderId.append(btnRow);
    btnRow.append(btnPrev, btnNext);
  }
}

class FroSlider extends ProtoSlider {
  /**
  * Setting basic parameters of the slider.
  * @param {string} id Identifier of the processed slider.
  * @param {number} interval Time interval between image change (in seconds).
  * @param {boolean} dots Show points for navigation.
  * @param {boolean} buttons Show buttons for navigation.
  * @param {boolean} click Go to the next slide by clicking on the image.
  */
  constructor (id, interval, dots, buttons, click) {
    super(id);
    this.options.interval = interval || 0;
    this.options.dots = dots || true;
    this.options.buttons = buttons || true;
    this.options.click = click || false;
  }
  /**
  * Checking the validity of the types of slider parameters.
  */
  checkIncoming() {
    const errorMessage = (key) => {
      let str = "fro-slider: ERROR! \n" +
            `Parameter \"${key}\" is set incorrectly!`;
      return str;
    };
    const checkType = (data, dataType) => {
      if (data !== '' && typeof(data) === dataType) {
        return true;
      } else {
        return false;
      }
    }
    for (let key in this.options) {
      const dataType = () => {
        if (key == 'id') {return 'string'};
        if (key == 'interval') {return 'number'};
        if (key == 'dots' || key == 'buttons' || 
        key == 'click') {return 'boolean'};
      }
      console.assert(
        checkType(this.options[key], dataType()), errorMessage(key)
      );
    }
  }
  /**
  * Check pressing buttons and dots.
  */
  clickCheck() {
    let playId;
    if (this.options.interval > 0) {
      playId = this.newPlayId;
    }
    this.sliderId.addEventListener('click', (e) => {
      let target = e.target;
      console.log(target)
      if (target.classList.contains('btn-next')) {
        this.setNext();
      }
      if (target.classList.contains('btn-prev')) {
        this.setPrev();
      }
      if (target.classList.contains('fro__dot')) {
        this.setDot(target);
      }
      if (target.classList.contains('fro__slide') && 
          this.options.interval <= 0 && 
          this.options.buttons == false) {
        this.setNext();
      }
      playId = this.restart(playId);
    })
  }
  /**
  * Restart slideshow.
  * @param {number} playId Id of autoplay function.
  */
  restart(playId) {
    if (this.options.interval > 0) {
      clearInterval(playId);
      playId = this.newPlayId;
    }
    return playId;
  }
  /**
  * Start displaying images.
  */
  play() {
    this.checkIncoming();
    if (this.options.buttons === true) {
      this.makeButtons();
    }
    if (this.options.dots === true) {
      this.makeDots();
    }
    this.addView(0);
    this.clickCheck();
  }
}
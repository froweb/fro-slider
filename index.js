// module.exports = FroSlider;
'use strict';

class FroSlider {
  /**
  * Setting basic parameters of the slider.
  * @param {string} id Identifier of the processed slider.
  * @param {boolean} avtoplay Automatic image change in the slider.
  * @param {number} interval Time interval between image change (in seconds).
  * @param {boolean} dots Show points for navigation.
  * @param {boolean} btns Show buttons for navigation.
  */
  constructor (id, avtoplay, interval, dots, btns) {
    this.options = {
      id: id,
      avtoplay: avtoplay || true,
      interval: (interval || 5) * 1000,
      dots: dots || true,
      btns: btns || true,
    };
    this._on = false;
    this._playForward;
  }
  isOn() {
    const on = this._on
    return on;
  }
  switchPlay() {
    if (this.isOn() == true) {
      this._on = false;
      console.log("false")
    } else {
      this._on = true;
      console.log("true")
    }
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
  * Returns a slider object by id.
  * @return {object} Object by id.
  */
 getId() {
  return document.querySelector(`#${this.options.id}`);
}
  /**
  * Gets all images in slider.
  * @return {object} Returns NodeList of images in the slider.
  */
  getItems() {
    const sliderId = this.getId();
    const sliderItems = sliderId.querySelectorAll(".fro__slide");
    return sliderItems;
  }
  /**
  * Adds a class to display the image.
  * @param {number} i Number of the desired image in the set.
  */
  addView(i) {
    const sliderItems = this.getItems();
    sliderItems[i].classList.add('active-slide');
    if (this.options.dots) {
      const sliderId = this.getId();
      let dotItem = sliderId.querySelectorAll('.fro__dot');
      dotItem[i].classList.add('active-dot');
    }
  }
  /**
  * Removes a class to hide the image.
  * @param {number} i Number of the desired image in the set.
  */
  removeView(i) {
    const sliderItems = this.getItems();
    sliderItems[i].classList.remove('active-slide');
    if (this.options.dots) {
      const sliderId = this.getId();
      let dotItem = sliderId.querySelectorAll('.fro__dot');
      dotItem[i].classList.remove('active-dot');
    }
  }
  /**
  * Shows the next image.
  */
  setNext() {
    const sliderItems = this.getItems();
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
  */
  setPrev() {
    const sliderItems = this.getItems();
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
  * Adds dots to navigate through slides.
  */
  makeDots() {
    const sliderId = this.getId();
    const sliderItems = this.getItems();
    let dotRow = document.createElement('div');
    dotRow.className = "fro__dot-bar";
    sliderId.append(dotRow);
    for (let i=0;  i < sliderItems.length; i++) {
      let dotTage = document.createElement('button');
      dotTage.className = "fro__dot";
      if (i==0) {
        dotTage.className = "fro__dot active-dot";
      }
      dotRow.append(dotTage);
    }
  }
  /**
  * Adds buttons to navigate through slides.
  */
  makeButtons() {
    const sliderId = this.getId();
    let btnRow = document.createElement('div'),
        btnNext = document.createElement('button'),
        btnPrev = document.createElement('button');
    btnRow.className = "fro__btn-bar";
    btnNext.className = "fro__btn btn-next";
    btnPrev.className = "fro__btn btn-prev";
    sliderId.append(btnRow);
    btnRow.append(btnPrev, btnNext);
  }
  /**
  * Check pressing buttons and dots.
  */
  clickCheck() {
    const sliderId = this.getId();
    if (this.options.btns || this.options.dots) {
      sliderId.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('btn-next')) {
          this.start();
          this.setNext();
          this.start();
        }
        if (target && target.classList.contains('btn-prev')) {
          this.start();
          this.setPrev();
          this.start();
        }
        if (target && target.classList.contains('fro__dot')) {
          const dotItem = sliderId.querySelectorAll('.fro__dot');
          for (let i=0; i < dotItem.length; i++) {
            if (dotItem[i].classList.contains('active-dot')) {
              this.removeView(i);
            }
            if (target == dotItem[i]) {
              this.addView(i);
            }
          }
        }
      })
    }
  }
  start() {
    if (this.isOn() == true) {
      this._playForward = setInterval(() => this.setNext(), this.options.interval);
      console.log("play");
    }
    if (this.isOn() == false) {
      clearInterval(this._playForward);
      this._playForward = "";
      console.log("pause");
    }
    this.switchPlay();
  }
  /**
  * Start displaying images.
  */
  play() {
    this.checkIncoming();
    
    if (this.options.dots) {
      this.makeDots();
    }
    if (this.options.btns) {
      this.makeButtons();
    }
    this.addView(0);
    if (this.options.avtoplay) {
      this._playForward = setInterval(() => this.setNext(), this.options.interval);
    }
    this.clickCheck();
  }
}

const slider = new FroSlider("one");
slider.play();

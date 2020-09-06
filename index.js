// module.exports = FroSlider;
'use strict';

class FroSlider {
  /**
  * Setting basic parameters of the slider.
  * @param {string} id Identifier of the processed slider.
  * @param {boolean} autoplay Automatic image change in the slider.
  * @param {number} interval Time interval between image change (in seconds).
  * @param {boolean} dots Show points for navigation.
  * @param {boolean} btns Show buttons for navigation.
  * @param {boolean} click Go to the next slide by clicking on the image.
  */
  constructor (id, autoplay, interval, dots, btns, click) {
    this.options = {
      id: id,
      autoplay: autoplay || true,
      interval: (interval || 5) * 1000,
      dots: dots || true,
      btns: btns || true,
      click: click || false,
    };
    this._playForward; //stores id of autoplay interval
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
    if (typeof this.options.autoplay !== 'boolean') {
      console.log(
        "fro-slider ERROR! \n" + 
        "Parameter \"autoplay\" is set incorrectly!");
        this.options['autoplay'] = false;
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
  get sliderId() {
    return document.querySelector(`#${this.options.id}`);
  }
  /**
  * Gets all images in slider.
  * @return {object} Returns NodeList of images in the slider.
  */
  get sliderItems() {
    // const sliderId = this.getId();this.sliderId.querySelectorAll(".fro__slide");
    return this.sliderId.querySelectorAll(".fro__slide");
  }
  /**
  * Adds a class to display the image.
  * @param {number} i Number of the desired image in the set.
  */
  addView(i) {
    // const sliderItems = this.getItems();
    this.sliderItems[i].classList.add('active-slide');
    if (this.options.dots == true) {
      // const sliderId = this.getId();
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
  * Adds dots to navigate through slides.
  */
  makeDots() {
    let dotRow = document.createElement('div');
    dotRow.className = "fro__dot-bar";
    this.sliderId.append(dotRow);
    for (let i=0;  i < this.sliderItems.length; i++) {
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
    const btnRow = document.createElement('div'),
        btnNext = document.createElement('button'),
        btnPrev = document.createElement('button');
    btnRow.className = "fro__btn-bar";
    btnNext.className = "fro__btn btn-next";
    btnPrev.className = "fro__btn btn-prev";
    this.sliderId.append(btnRow);
    btnRow.append(btnPrev, btnNext);
  }
  /**
  * Check pressing buttons and dots.
  */
  clickCheck() {
    if (!this.options.autoPlay && !this.options.btns) {
      this.sliderId.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('fro__slide')) {
          this.setNext();
        }
      })
    }
    if (this.options.btns || this.options.dots) {
      this.sliderId.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('btn-next')) {
          this.setNext();
          this.restart();
        }
        if (target && target.classList.contains('btn-prev')) {
          this.setPrev();
          this.restart();
        }
        if (target && target.classList.contains('fro__dot')) {
          const dotItem = this.sliderId.querySelectorAll('.fro__dot');
          for (let i=0; i < dotItem.length; i++) {
            if (dotItem[i].classList.contains('active-dot')) {
              this.removeView(i);
            }
            if (target == dotItem[i]) {
              this.addView(i);
            }
          }
          this.restart();
        }
      })
    }
  }
    /**
  * Restart slideshow.
  */
  restart() {
    if (this.options.autoplay == true) {
      clearInterval(this._playForward);
      this._playForward = setInterval(() => this.setNext(), this.options.interval);
    }
  }
  /**
  * Start displaying images.
  */
  play() {
    this.checkIncoming();
    if (this.options.dots == true) {
      this.makeDots();
    }
    if (this.options.btns == true) {
      this.makeButtons();
    }
    this.addView(0);
    if (this.options.autoplay == true) {
      this._playForward = setInterval(() => this.setNext(), this.options.interval);
    }
    this.clickCheck();
  }
}

const slider = new FroSlider("one");
// slider.options.autoplay = false;
// slider.options.btns = "we";

slider.play();
import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.createSlider();
    this.carouselWidth = this.getSlideWidth();
    this.initEventListeners();
    this.updateArrows();
  }

  createSlider() {
    this.slider = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(this.createSlide).join('')}
        </div>
      </div>
    `);

    this.leftArrow = this.slider.querySelector('.carousel__arrow_left');
    this.rightArrow = this.slider.querySelector('.carousel__arrow_right');
    this.carouselInner = this.slider.querySelector('.carousel__inner');
    this.slidesElements = this.slider.querySelectorAll('.carousel__slide');

    return this.slider;
  }

  createSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  getSlideWidth() {
    return this.slides.length ? this.slider.querySelector('.carousel__slide').offsetWidth : 0;
  }

  initEventListeners() {
    this.elem.addEventListener('click', (e) => {
      this.carouselWidth = this.getSlideWidth();
      if (e.target.closest('.carousel__arrow_right')) this.nextSlide();
      if (e.target.closest('.carousel__arrow_left')) this.prevSlide();
      if (e.target.closest('.carousel__button')) this.onProductAdd(e);
    });
  }

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
      this.updateCarousel();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const offset = -this.currentSlideIndex * this.carouselWidth;
    this.carouselInner.style.transform = `translateX(${offset}px)`;
    this.updateArrows();
  }

  updateArrows() {
    this.leftArrow.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    this.rightArrow.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : '';
  }

  onProductAdd(event) {
    const slide = event.target.closest('.carousel__slide');
    const id = slide.dataset.id;
    const customEvent = new CustomEvent("product-add", {
      detail: id,
      bubbles: true
    });
    this.slider.dispatchEvent(customEvent);
  }
}


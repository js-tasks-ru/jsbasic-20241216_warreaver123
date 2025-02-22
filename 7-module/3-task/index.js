import createElement from "../../assets/lib/create-element.js";


export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = this.steps - 1;

    this.elem = this.render();
    this.bindEvents();
  }

  render() {
    this.slider = createElement(`

        <div class="slider">
          <div class="slider__thumb" style="left: ${this.getPercent(this.value)}%;">
            <span class="slider__value">${this.value}</span>
          </div>
          <div class="slider__progress" style="width: ${this.getPercent(this.value)}%;"></div>
          <div class="slider__steps">
            ${Array.from({ length: this.steps }, (_, index) => {
                const activeClass = index === this.value ? 'slider__step-active' : '';
                return `<span class="${activeClass}" data-index="${index}"></span>`;
              }).join('')}
          </div>
        </div>

    `);

    this.sliderThumb = this.slider.querySelector('.slider__thumb');
    this.sliderValue = this.slider.querySelector('.slider__value');
    this.progress = this.slider.querySelector('.slider__progress');

    return this.slider;
  }

  bindEvents() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      leftRelative = Math.max(0, Math.min(1, leftRelative));

      let approximateValue = leftRelative * this.segments;
      let newValue = Math.floor(approximateValue + 0.5);

      if (newValue === this.value) return;

      this.updateSlider(newValue);
    });
  }

  getPercent(value) {
    return (value / this.segments) * 100;
  }

  updateSlider(newValue) {
    if (newValue < 0 || newValue > this.segments) return;

    this.value = newValue;
    const percent = this.getPercent(this.value);

    this.progress.style.width = `${percent}%`;
    this.sliderThumb.style.left = `${percent}%`;
    this.sliderValue.textContent = this.value;

    this.elem.querySelectorAll('.slider__steps span').forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === this.value);
    });

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    }));
  }
}

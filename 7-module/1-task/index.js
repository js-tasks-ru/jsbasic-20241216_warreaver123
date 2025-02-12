import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbonMenu();
    this.initialListeners();
    // setTimeout(() => this.updateCarousel(), 0);
  }

  createRibbonMenu() {
    this.ribbon = createElement(`
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
          ${this.categories.map(ribbon => this.viewLinks(ribbon)).join('')}
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.ribbonInner = this.ribbon.querySelector(`.ribbon__inner`);
    this.arrowLeft = this.ribbon.querySelector(`.ribbon__arrow_left`);
    this.arrowRight = this.ribbon.querySelector(`.ribbon__arrow_right`);
    this.ribbonElements = this.ribbon.querySelectorAll('.ribbon__item');


    return this.ribbon;
  }

  viewLinks(ribbon) {
    return `<a href="#" class="ribbon__item" data-id="${ribbon.id}">${ribbon.name}</a>`;
  }

  getSliderWidth() {
    this.scrollLeft = this.ribbonInner.scrollLeft;

    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;

    this.scrollRight = scrollWidth - this.scrollLeft - clientWidth;

  }

  initialListeners() {
    this.elem.addEventListener('click', e => {
      if (e.target.closest('.ribbon__arrow_right')) {
        this.scrollToRight();
      }

      if (e.target.closest('.ribbon__arrow_left')) {
        this.scrollToLeft();
      }

      if (e.target.closest('.ribbon__item')) {
        this.onProductSelect(e);
      }

    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.updateCarousel();
    });
  }

  scrollToRight() {
    this.ribbonInner.scrollBy(350, 0);
  }

  scrollToLeft() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  updateCarousel() {
    this.getSliderWidth();
    if (this.scrollRight === 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }

    if (this.scrollLeft < 1) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }
  }

  setActiveLink(element) {
    this.ribbonElements.forEach(el => {
      el.classList.remove('ribbon__item_active');
    });

    element.classList.add('ribbon__item_active');
  }

  onProductSelect(event) {
    event.preventDefault();
    const element = event.target.closest('.ribbon__item');
    this.setActiveLink(element);
    const id = element.dataset.id;
    const customEvent = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true
    });
    this.ribbon.dispatchEvent(customEvent);
  }
}

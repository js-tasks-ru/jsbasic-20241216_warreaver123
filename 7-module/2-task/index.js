import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.bindListeners();
  }


  render() {
    const view = createElement(`
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>

          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `);

    this.body = document.body;
    this.body.appendChild(view);
    this.modal = view;

    this.modalClose = this.modal.querySelector('.modal__close');

    this.modalTitle = this.modal.querySelector('.modal__title');
    this.modalBody = this.modal.querySelector('.modal__body');

  }

  bindListeners() {
    this.modalClose.addEventListener('click', () => this.close());
    document.addEventListener('keydown', this.onEscPress);
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(body) {
    this.modalBody.appendChild(body);
  }

  open() {
    this.body.classList.add('is-modal-open');
  }

  close() {
    if (this.modal) {
      this.modal.remove();
      this.body.classList.remove('is-modal-open');
      this.modal = null;
      document.removeEventListener('keydown', this.onEscPress);
    }
  }

  onEscPress = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

}

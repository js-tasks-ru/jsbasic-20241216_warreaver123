function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel__inner');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const carouselWidth = slides[0].offsetWidth;
  let currentSlideIndex = 0;

  const leftArrow = carousel.querySelector('.carousel__arrow_left');
  const rightArrow = carousel.querySelector('.carousel__arrow_right');

  updateArrow();

  carousel.addEventListener('click', (e) => {

    if (e.target.classList.contains('carousel__arrow_right')) {

      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        const offset = -currentSlideIndex * carouselWidth;
        carouselInner.style.transform = `translateX(${offset}px)`;
      }
    }

    if (e.target.classList.contains('carousel__arrow_left')) {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        const offset = -currentSlideIndex * carouselWidth;
        carouselInner.style.transform = `translateX(${offset}px)`;
      }
    }

    updateArrow();
  });

  function updateArrow() {
    leftArrow.style.display = currentSlideIndex === 0 ? 'none' : '';
    rightArrow.style.display = currentSlideIndex === slides.length - 1 ? 'none' : '';
  }
}

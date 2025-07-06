class Slideshow {
  constructor() {
    // Initialize DOM elements for the slideshow
    // Converts NodeList to Array for better method availability
    this.slides = Array.from(document.querySelectorAll('.cs-slide'));
    this.nextButton = document.querySelector('.cs-slideshow-next');
    this.prevButton = document.querySelector('.cs-slideshow-prev');

    // Track the currently displayed slide and animation state
    this.currentIndex = 0;
    this.isMoving = false;

    // Setup event listeners and initial slide positions
    this.init();
  }

  init() {
    // Attach click handlers for navigation, using optional chaining for null safety
    this.nextButton?.addEventListener('click', () => this.moveSlide('next'));
    this.prevButton?.addEventListener('click', () => this.moveSlide('prev'));

    // Position slides in their starting configuration
    this.updateSlideStates();
  }

  updateSlideStates() {
    this.slides.forEach((slide, index) => {
      // Clear existing position classes to prevent conflicts
      slide.classList.remove('active', 'prev', 'next', 'initial');

      // Apply appropriate positioning class based on slide's relation to current slide
      if (index === this.currentIndex) {
        slide.classList.add('active');
      } else if (index === this.getAdjacentIndex('prev')) {
        slide.classList.add('prev');
      } else if (index === this.getAdjacentIndex('next')) {
        slide.classList.add('next');
      }
    });
  }

  getAdjacentIndex(direction) {
    const totalSlides = this.slides.length;
    // Calculate the index of the next/previous slide with wrapping
    // Using modulo to create circular navigation
    if (direction === 'next') {
      return (this.currentIndex + 1) % totalSlides;
    } else {
      return (this.currentIndex - 1 + totalSlides) % totalSlides;
    }
  }

  moveSlide(direction) {
    // Prevent animation overlap by checking if transition is in progress
    if (this.isMoving) return;
    this.isMoving = true;

    // Update the current slide index based on navigation direction
    this.currentIndex = this.getAdjacentIndex(direction);

    // Apply new positioning classes to slides
    this.updateSlideStates();

    // Re-enable navigation after transition animation completes
    setTimeout(() => {
      this.isMoving = false;
    }, 300); // Timeout should match CSS transition-duration
  }
}

// Create slideshow instance once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new Slideshow();
});

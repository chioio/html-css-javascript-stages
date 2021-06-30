/* -------------------------------------------------------------------------- */
/*                                  TEST DATA                                 */
/* -------------------------------------------------------------------------- */
let carouselItems = [
  {
    color: '#27baff',
    content: 'Item 1',
  },
  {
    color: '#33eeaa',
    content: 'Item 2',
  },
  {
    color: '#993aff',
    content: 'Item 3',
  },
  {
    color: '#ff5ec9',
    content: 'Item 4',
  },
];

/* -------------------------------------------------------------------------- */
/*                               GET DOM ELEMENT                              */
/* -------------------------------------------------------------------------- */
// Get the `slide-carouse-map` document element
const carouselEl = document.querySelector('#slide-carousel-map');
// Get the wrapper document element
const wrapperEl = carouselEl.children[0];
// Get the indicator document element
const indicatorsUlEl = carouselEl.children[2].children[0];

/* -------------------------------------------------------------------------- */
/*                         DYNAMIC CREATE DOM ELEMENT                         */
/* -------------------------------------------------------------------------- */
// Just provide 4 slides
carouselItems = carouselItems.slice(0, 4);
// Append indicators
for (let i = 0; i < carouselItems.length; i++) {
  const liEl = document.createElement('li');
  indicatorsUlEl.appendChild(liEl);
}
// Clone the first slide to the end.
carouselItems.push(carouselItems[0]);
// Append slides.
carouselItems.map((item) => {
  const divEl = document.createElement('div');
  divEl.className = 'slide';
  divEl.style.backgroundColor = item.color;
  divEl.innerText = item.content;
  wrapperEl.appendChild(divEl);
});

/* -------------------------------------------------------------------------- */
/*                   GET DYNAMIC DOM ELEMENT & INIT SLIDING                   */
/* -------------------------------------------------------------------------- */
// Slide dom elements
const slideEls = wrapperEl.children;
// Indicator elements
const indicatorEls = indicatorsUlEl.children;
// Get single slide width
const slideElWidth = slideEls[0].offsetWidth;
// Update slide wrapper width
wrapperEl.style.width = `${slideElWidth * slideEls.length}px`;
// Set 1st indicator active by default
indicatorEls[0].className = 'current';
// Mark the slide index and indicator index
let [slideIndex, indicatorIndex] = [0, 0];

/**
 * Carousel map sliding in right direction.
 */
const slidingNext = () => {
  // slide moving
  slideIndex++;

  if (slideIndex == slideEls.length) {
    slideIndex = 1;
    wrapperEl.style.left = 0;
  }

  const offset = -(slideElWidth * slideIndex);
  animate(wrapperEl, offset);

  // indicator moving
  indicatorIndex++;

  if (indicatorIndex == indicatorEls.length) {
    indicatorIndex = 0;
  }

  for (const i in indicatorEls) {
    indicatorEls[i].className = '';
  }
  indicatorEls[indicatorIndex].className = 'current';
};

/**
 * Carousel map sliding in right direction.
 */
const slidingPrev = () => {
  // slide moving
  slideIndex--;

  if (slideIndex < 0) {
    wrapperEl.style.left = `-${(slideEls.length - 1) * slideElWidth}px`;
    slideIndex = slideEls.length - 2;
  }

  const offset = -(slideElWidth * slideIndex);
  animate(wrapperEl, offset);

  // indicator moving
  indicatorIndex--;

  if (indicatorIndex < 0) {
    indicatorIndex = indicatorEls.length - 1;
  }

  for (const i in indicatorEls) {
    indicatorEls[i].className = '';
  }
  indicatorEls[indicatorIndex].className = 'current';
};

/**
 * The slide animation.
 *
 * @param {Element} element The animate element
 * @param {number} offsetX animate offsetX
 */
const animate = (element, offset) => {
  clearInterval(element.timer);
  element.timer = setInterval(() => {
    const speed = element.offsetLeft > offset ? -5 : 5;
    const result = offset - element.offsetLeft;
    if (Math.abs(result) > Math.abs(speed)) {
      element.style.left = `${element.offsetLeft + speed}px`;
    } else {
      element.style.left = `${offset}px`;
      clearInterval(element.timer);
    }
  }, 10);
};

/**
 * Init auto play.
 *
 * @returns a interval
 */
const autoplay = () => setInterval(slidingNext, 3000);

// Make sliding play automatic.
let interval = autoplay();

/* -------------------------------------------------------------------------- */
/*                               CONTROL EVENTS                               */
/* -------------------------------------------------------------------------- */
// Get previous button dom element
const prevSlideControlEl = carouselEl.children[1].children[0];
// Get next button dom element
const nextSlideControlEl = carouselEl.children[1].children[1];
// Add click event for the left slide control button
prevSlideControlEl.addEventListener('click', (e) => {
  clearInterval(interval);
  slidingPrev();
  interval = autoplay();
});
// Add click event for the right slide control button
nextSlideControlEl.addEventListener('click', (e) => {
  clearInterval(interval);
  slidingNext();
  interval = autoplay();
});
// Add mouse over event for indicators list element
indicatorsUlEl.addEventListener('mouseenter', (e) => clearInterval(interval));
// Add mouse leave event for indicators list element
indicatorsUlEl.addEventListener('mouseleave', (e) => (interval = autoplay()));
// Add click event for indicator elements
for (const i in indicatorEls) {
  indicatorEls[i].onclick = () => {
    animate(wrapperEl, -i * slideElWidth);
    for (const i in indicatorEls) {
      indicatorEls[i].className = '';
    }
    indicatorEls[i].className = 'current';
  };
}

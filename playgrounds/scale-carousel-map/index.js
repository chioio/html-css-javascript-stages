/* -------------------------------------------------------------------------- */
/*                                  TEST DATA                                 */
/* -------------------------------------------------------------------------- */
let carouselItems = [
  {
    color: '#27baff',
    content: 'Item 1',
  },
  {
    color: '#ff5ec9',
    content: 'Item 2',
  },
  {
    color: '#993aff',
    content: 'Item 3',
  },
];

/* -------------------------------------------------------------------------- */
/*                               GET DOM ELEMENT                              */
/* -------------------------------------------------------------------------- */
// Get the `scale-carousel-map` document element
const scaleCarouselMap = document.querySelector('#scale-carousel-map');

/* -------------------------------------------------------------------------- */
/*                         DYNAMIC CREATE DOM ELEMENT                         */
/* -------------------------------------------------------------------------- */
const classNames = ['slide current', 'slide left', 'slide right'];

const slideEls = scaleCarouselMap.children;
for (let i = 0; i < slideEls.length; i++) {
  slideEls[i].style.backgroundColor = carouselItems[i].color;
  slideEls[i].innerText = carouselItems[i].content;
}
let index = [0, 1, 2];
const sliding = () => {
  for (const i in index) {
    index[i] = (index[i] + 1) % index.length;
    slideEls[i].className = classNames[index[i]];
  }
};

let interval = setInterval(sliding, 3000);

scaleCarouselMap.addEventListener('mouseenter', () => {
  clearInterval(interval);
});
scaleCarouselMap.addEventListener('mouseleave', () => {
  interval = setInterval(sliding, 3000);
});

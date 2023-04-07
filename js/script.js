/** @format */

//------ CHANGE HEADER BACKGROUND ------//
const scrollHeader = () => {
  let header = document.getElementsByTagName('header')[0];
  if (this.scrollY >= 10) {
    header.classList.add('header-sticky');
  } else {
    header.classList.remove('header-sticky');
  }
};
window.addEventListener('scroll', scrollHeader);

//------ SCROLL REVEAL ANIMATION ------//
//const sr = ScrollReveal({
//  origin: 'top',
//  distance: '60px',
//  duration: 2000,
//  delay: 400,
//  reset: false,
//});

//sr.reveal('.text-2', { delay: 500 });
//sr.reveal('.resume', { delay: 600 });
//sr.reveal('.right', { delay: 700 });
//sr.reveal('.left', { delay: 800, origin: 'bottom' });
//sr.reveal('.card', { interval: 400 });

//------ VALUE ACCORDION ------//
let accordionItems = Array.from(
  document.getElementsByClassName('value_accordion-item'),
);

accordionItems.forEach((element) => {
  let accordionHeader = element.getElementsByClassName(
    'value_accordion-header',
  )[0];

  accordionHeader.addEventListener('click', () => {
    let openedAccordion = document.getElementsByClassName('accordion-open')[0];

    toggleItem(element);

    if (openedAccordion && openedAccordion != element) {
      toggleItem(openedAccordion);
    }
  });
});

const toggleItem = (element) => {
  let accordionContent = element.getElementsByClassName(
    'value_accordion-content',
  )[0];

  if (element.classList.contains('accordion-open')) {
    accordionContent.removeAttribute('style');
    element.classList.remove('accordion-open');
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + 'px';
    element.classList.add('accordion-open');
  }
};

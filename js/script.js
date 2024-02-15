/** @format */

window.addEventListener('load', () => {
  let loader = document.getElementsByTagName('loader')[0];
  loader.classList.add('remove');
});

//------ ABOUT ME SECTION ------//
let aboutMeP = document
  .getElementsByClassName('about-me')[0]
  .getElementsByTagName('p')[0];

window.addEventListener('scroll', () => {
  let rect = aboutMeP.getBoundingClientRect();
  let top = rect.top;
  let viewportHeight = window.innerHeight;
  let span = aboutMeP.getElementsByTagName('span')[0];
  if (top + 100 < viewportHeight) {
    let bottom = rect.bottom;
    let midViewport = viewportHeight / 2 + 96;
    let distanceToMid = Math.min(
      (midViewport - (top + (bottom - top) / 2)) * -1,
      midViewport,
    );
    let minValue = 0;
    let maxValue = 100;
    let calculatedValue;
    if (distanceToMid < 1) {
      calculatedValue = 100;
    } else {
      calculatedValue =
        minValue + (maxValue - minValue) * (1 - distanceToMid / midViewport);
    }
    span.style.backgroundSize = calculatedValue + '% 100%';
  } else {
    span.style.backgroundSize = '0% 100%';
  }
});
//------ PROJECTS SECTION ------//
let projects = document.getElementById('projects');
let projectsShown = false;
let detailsContainer = projects.getElementsByClassName('details-container')[0];
let imgsWrapper = projects.getElementsByClassName('imgs-wrapper')[0];
let detailsHeight = detailsContainer.children[0].offsetHeight;
let imgWidth = imgsWrapper.children[0].offsetWidth;
let totalCount = detailsContainer.childElementCount;
let currentCount = 1;

projects.style.height = 100 * totalCount + 'vh';

window.addEventListener('scroll', () => {
  let rect = projects.getBoundingClientRect();
  let container = projects.getElementsByClassName('container')[0];
  let detailsHeight = detailsContainer.children[0].offsetHeight;
  let imgWidth = imgsWrapper.children[0].offsetWidth;
  if (rect.top < 1 && rect.bottom > window.innerHeight) {
    container.style.position = 'fixed';
    container.style.top = '0';
    let proportion = rect.top / window.innerHeight;
    if (proportion <= 0) {
      let index = Math.ceil(proportion * totalCount);
      index = Math.abs(index);
      detailsContainer.style.transform = `translateY(-${
        detailsHeight * index
      }px)`;
      imgsWrapper.style.transform = `translateX(-${imgWidth * index}px)`;
    }
  } else if (rect.bottom <= window.innerHeight) {
    container.style.position = 'sticky';
    container.style.top = '100%';
  } else {
    container.style.position = 'sticky';
    container.style.top = '0';
  }
});

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

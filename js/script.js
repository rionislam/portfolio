/** @format */

window.addEventListener('load', () => {
  let loader = document.getElementsByTagName('loader')[0];
  loader.classList.add('remove');
});

//------ CHANGE HEADER BACKGROUND ------//
// const scrollHeader = () => {
//   let header = document.getElementsByTagName('header')[0];
//   if (this.scrollY >= 10) {
//     header.classList.add('header-sticky');
//   } else {
//     header.classList.remove('header-sticky');
//   }
// };
// window.addEventListener('scroll', scrollHeader);

//------ ABOUT ME SECTION ------//
const isInViewport = (element) => {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
let aboutMeP = document
  .getElementsByClassName('about-me')[0]
  .getElementsByTagName('p')[0];

window.addEventListener('scroll', () => {
  if (isInViewport(aboutMeP)) {
    let viewportHeight = window.innerHeight;
    let rect = aboutMeP.getBoundingClientRect();
    let top = rect.top;
    let bottom = rect.bottom;
    // Calculate opacity based on scroll position
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

    let span = aboutMeP.getElementsByTagName('span')[0];
    span.style.backgroundSize = calculatedValue + '% 100%';
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

// let projectsObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.intersectionRatio > 0.5) {
//         // More than 50% of projects element is visible
//         window.scrollTo({
//           top: projects.offsetTop + 32,
//           behavior: 'smooth',
//         });
//       }
//       projectsShown = entry.isIntersecting;
//     });
//   },
//   {
//     threshold: 0.5,
//   },
// );

// projectsObserver.observe(projects);

// let rotation = 0;

// let touchStartY = 0;
// let touchEndY = 0;

// projects.addEventListener('touchstart', (event) => {
//   touchStartY = event.touches[0].clientY;
// });

// projects.addEventListener('touchmove', (event) => {
//   if (projectsShown) {
//     event.preventDefault();
//   }
// });

// projects.addEventListener('touchend', (event) => {
//   touchEndY = event.changedTouches[0].clientY;
//   handleTouchScroll();
// });

// projects.addEventListener('wheel', (event) => {
//   event.preventDefault();
//   handleMouseWheelScroll(event.deltaY);
// });

// function handleTouchScroll() {
//   if (projectsShown) {
//     let deltaY = touchStartY - touchEndY;
//     if (Math.abs(deltaY) > 100) {
//       // Adjust this threshold as needed
//       if (deltaY > 0) {
//         scrollDown();
//       } else {
//         scrollUp();
//       }
//     }
//   }
// }

// function handleMouseWheelScroll(deltaY) {
//   if (projectsShown) {
//     rotation++;
//     if (rotation >= 4) {
//       if (deltaY > 1) {
//         scrollDown();
//       } else {
//         scrollUp();
//       }
//       rotation = 0;
//     }
//   }
// }

// function scrollDown() {
//   if (currentCount != totalCount) {
//     currentCount++;
//     detailsContainer.scrollTop += detailsHeight;
//     imgsWrapper.scrollLeft += imgWidth;
//   } else {
//     window.scrollTo({
//       top: projects.offsetTop + projects.offsetHeight + 32,
//     });
//   }
// }

// function scrollUp() {
//   if (currentCount > 1) {
//     currentCount--;
//     detailsContainer.scrollTop -= detailsHeight;
//     imgsWrapper.scrollLeft -= imgWidth;
//   } else {
//     window.scrollTo({
//       top: projects.offsetTop - projects.offsetHeight + 32,
//     });
//   }
// }

// let startY = 0;
// let endY = 0;

// projects.addEventListener('touchstart', (event) => {
//   if (projectsShown) {
//     startY = event.touches[0].clientY;
//     currentCount = Math.round(scrollTop / detailsHeight) + 1;
//   }
// });

// projects.addEventListener('touchmove', (event) => {
//   if (projectsShown) {
//     let count = 0;
//     event.preventDefault();
//     const touch = event.touches[0];
//     endY = touch.clientY;
//     let deltaY = (endY - startY) * -1;
//     if (Math.abs(deltaY) > detailsHeight / 1.2 && count == 0) {
//       count = 1;
//       if (deltaY > 1) {
//         if (currentCount != totalCount) {
//           currentCount++;
//           detailsContainer.scrollTop += detailsHeight;
//           imgsWrapper.scrollLeft += imgWidth;
//         } else {
//           window.scrollTo({
//             top: projects.offsetTop + projects.offsetHeight + 32,
//           });
//         }
//       } else {
//         if (currentCount > 1) {
//           currentCount--;
//           detailsContainer.scrollTop -= detailsHeight;
//           imgsWrapper.scrollLeft -= imgWidth;
//         } else {
//           window.scrollTo({
//             top: projects.offsetTop - projects.offsetHeight + 32,
//           });
//         }
//       }
//     }
//   }
// });

// // detailsContainer.addEventListener('scroll', () => {
// //   scrollTop = detailsContainer.scrollTop;
// //   if (projectsShown) {
// //     window.scrollTo({
// //       top: projects.offsetTop - 96,
// //     });
// //   }
// // });

// window.addEventListener('scroll', () => {
//   if (sticky == true) {
//     let scrollPosition = window.scrollY || window.pageYOffset;
//     let offsetTop = projects.offsetTop;
//     let offsetHeight = projects.offsetHeight;
//     if (
//       scrollPosition < offsetTop - 96 &&
//       scrollPosition > offsetTop - 96 - offsetHeight / 2
//     ) {
//       window.scrollTo({
//         top: projects.offsetTop - 96,
//       });
//     }
//   }
// });

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

gsap.registerPlugin(ScrollTrigger);

/**
 * Elements with .anim-fade-up will fade in and upwards on scroll
 */
(function() {

  const elements = gsap.utils.toArray(".anim-fade-up");

  elements.forEach((item) => {
    gsap.set(item, {
      opacity: 0,
      y: 20
    });
    gsap.to(item, {
      duration: 1,
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
      }
    })
  });
})();

/**
 * Elements with .anim-container-fade-up will fade their children in and 
 * upwards on scroll (staggered)
 */
(function() {

  const elements = document.querySelectorAll(".anim-container-fade-up");

  elements.forEach((item) => {
    gsap.set(item.children, {
      opacity: 0,
      y: 20
    });
    gsap.to(item.children, {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
      }
    })
  });
})();

/**
 * Elements with .anim-scroll-slow will scroll slightly slower creating a 
 * parallax effect.
 */
(function () {
  elements = gsap.utils.toArray(".anim-scroll-slow");

  elements.forEach((item) => {
    gsap.set(item, {
      y: -80
    });
    gsap.to(item, {
      y: 80,
      ease: 'linear',
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: () => (item.clientHeight + 160) + " top",
        scrub: true,
      }
    });
  });
})();

/**
 * Elements with .anim-scroll-slow will scroll slightly faster creating a parallax effect.
 */
(function () {
  elements = gsap.utils.toArray(".anim-scroll-up");

  elements.forEach((item) => {
    gsap.set(item, {
      y: 20
    });
    gsap.to(item, {
      y: -150,
      ease: 'linear',
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
})();

/**
 * This effect was designed for pretty menus.
 * .animContainerReplace is the trigger.
 * [data-anim-hide] is the container of elements that will be hidden.
 * [data-anim-show] is the container of element that will be shown.
 */
(function() {
  const elements = document.querySelectorAll(".animContainerReplace");

  elements.forEach((item) => {
    item.addEventListener("click", (event) => {
      const itemsToHide = document.querySelectorAll(`#${item.dataset.animHide} > *`);
      const itemsToShow = document.querySelectorAll(`#${item.dataset.animShow} > *`);
      const tl = gsap.timeline({});
      tl.to(itemsToHide, {
        duration: 0.4,
        stagger: 0.1,
        opacity: 0,
        y: -20,
        onComplete: () => {
          document.querySelector(`#${item.dataset.animHide}`).classList.add("d-none");
          document.querySelector(`#${item.dataset.animShow}`).classList.remove("d-none");
        }
      }).staggerFromTo(itemsToShow, 0.4, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1
      },
      0.1);
    });
  });
})();


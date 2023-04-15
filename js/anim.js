// FUNCTIONS

/**
 * Fades in and up the selector passed in.
 */
function animFadeIn(selector) {
  const item = document.querySelector(selector); 
  item.classList.remove("d-none");
  gsap.set(item, {
    opacity: 0,
    y: 20
  });
  gsap.to(item, {
    duration: 0.4,
    opacity: 1,
    y: 0,
  });
}

/**
 * Fades out and down the selector passed in.
 */
function animFadeOut(selector) {
  const item = document.querySelector(selector); 
  gsap.set(item, {
    opacity: 1,
    y: 0
  });
  gsap.to(item, {
    opacity: 0,
    y: 20,
    onComplete: () => {
      item.classList.add("d-none");
    }
  });
}

/**
 * Fades in and up the selector passed in.
 */
function animContainerFadeIn(selector) {
  const item = document.querySelector(selector); 
  item.classList.remove("d-none");
  gsap.set(item.children, {
    opacity: 0,
    y: 20
  });
  gsap.to(item.children, {
    duration: 0.4,
    opacity: 1,
    y: 0,
    stagger: 0.1
  });
}

/**
 * Replace an element
 */
function animReplace(selectorToHide, selectorToShow) {

  const itemToHide = document.querySelector(selectorToHide);
  const itemToShow = document.querySelector(selectorToShow);

  const tl = gsap.timeline({});
  tl.to(itemToHide, {
    duration: 0.4,
    opacity: 0,
    y: -20,
    onComplete: () => {
      itemToHide.classList.add("d-none");
      itemToShow.classList.remove("d-none");
    }
  }).staggerFromTo(
    itemToShow,
    0.4,
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    },
    0.1
  );
}

/**
 * Replace containers' children staggered
 */ 
function animContainerReplace(selectorToHide, selectorToShow) {

  const itemToHide = document.querySelector(selectorToHide);
  const itemToShow = document.querySelector(selectorToShow);

  const tl = gsap.timeline({});
  tl.to(itemToHide.children, {
    duration: 0.4,
    stagger: 0.1,
    opacity: 0,
    y: -20,
    onComplete: () => {
      itemToHide.classList.add("d-none");
      itemToShow.classList.remove("d-none");
    }
  }).staggerFromTo(
    itemToShow.children,
    0.4,
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    },
    0.1
  );
}

// EVENTS

const elements = document.querySelectorAll("[class*=anim]");

elements.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (item.classList.contains("anim-fade-in")) {
      const targets = item.dataset.animFadeInTarget.split(" ");
      targets.forEach((target) => {
        animFadeIn(`#${target}`);
      });
    }
    if (item.classList.contains("anim-fade-out")) {
      const targets = item.dataset.animFadeOutTarget.split(" ");
      targets.forEach((target) => {
        animFadeOut(`#${target}`);
      });
    }
    if (item.classList.contains("anim-container-fade-in")) {
      const targets = item.dataset.animContainerFadeInTarget.split(" ");
      targets.forEach((target) => {
        animContainerFadeIn(`#${target}`);
      });
    }
    if (item.classList.contains("anim-container-fade-out")) {
      const targets = item.dataset.animContainerFadeOutTarget.split(" ");
      targets.forEach((target) => {
        animContainerFadeOut(`#${target}`);
      });
    }
    if (item.classList.contains("anim-replace")) {
      const itemsTohide = item.dataset.animReplaceHide.split(" ");
      const itemsToShow = item.dataset.animReplaceShow.split(" ");
      targets.forEach((target, index) => {
        animReplace(`#${target}`, itemsToShow[index]);
      });
    }
    if (item.classList.contains("anim-container-replace")) {
      const itemsTohide = item.dataset.animContainerReplaceHide.split(" ");
      const itemsToShow = item.dataset.animContainerReplaceShow.split(" ");
      targets.forEach((target, index) => {
        animContainerReplace(`#${target}`, itemsToShow[index]);
      });
    }
  });
});

// SCROLL

gsap.registerPlugin(ScrollTrigger);

/**
 * Elements with .anim-scroll-fade-in will fade in and upwards on scroll
 */
(function () {
  const elements = gsap.utils.toArray(".anim-scroll-fade-in");

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
        end: "bottom 20%"
      }
    });
  });
})();

/**
 * Elements with .anim-container-scroll-fade-in will fade their children
 * in and upwards on scroll (staggered)
 */
(function () {
  const elements = document.querySelectorAll(".anim-container-scroll-fade-in");

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
        end: "bottom 20%"
      }
    });
  });
})();

/**
 * Elements with .anim-scroll-slow will scroll slightly slower creating a parallax effect.
 */
(function () {
  elements = gsap.utils.toArray(".anim-scroll-slow");

  elements.forEach((item) => {
    gsap.set(item, {
      y: -80
    });
    gsap.to(item, {
      y: 80,
      ease: "linear",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: () => item.clientHeight + 160 + " top",
        scrub: true
      }
    });
  });
})();

/**
 * Elements with .anim-scroll-fast will scroll slightly faster creating a parallax effect.
 */
(function () {
  elements = gsap.utils.toArray(".anim-scroll-fast");

  elements.forEach((item) => {
    gsap.set(item, {
      y: 20
    });
    gsap.to(item, {
      y: -150,
      ease: "linear",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
})();

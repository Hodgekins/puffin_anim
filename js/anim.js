// FUNCTIONS

const duration = 0.1;

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
    duration: duration,
    opacity: 1,
    y: 0,
    clearProps: true
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
    duration: duration,
    opacity: 0,
    y: 20,
    onComplete: () => {
      item.classList.add("d-none");
    },
    clearProps: true
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
    duration: duration,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    clearProps: true
  });
}

/**
 * Fades out and down the selector passed in.
 */
function animContainerFadeOut(selector) {
  const item = document.querySelector(selector); 
  gsap.set(item.children, {
    opacity: 1,
    y: 0
  });
  gsap.to(item, {
    duration: duration,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    onComplete: () => {
      item.classList.add("d-none");
    },
    clearProps: true
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
    duration: duration,
    opacity: 0,
    y: -20,
    onComplete: () => {
      itemToHide.classList.add("d-none");
      itemToShow.classList.remove("d-none");
      gsap.set(itemToHide, {clearProps: true});
    }
  }).staggerFromTo(
    itemToShow,
    duration,
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      clearProps: true
    },
    duration
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
    duration: duration,
    stagger: 0.1,
    opacity: 0,
    y: -20,
    onComplete: () => {
      itemToHide.classList.add("d-none");
      itemToShow.classList.remove("d-none");
      gsap.set(itemToHide, {clearProps: true});
    }
  }).staggerFromTo(
    itemToShow.children,
    duration,
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      clearProps: true
    },
    duration
  );
}

// EVENTS

(function () {
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
        itemsTohide.forEach((target, index) => {
          animReplace(`#${target}`, `#${itemsToShow[index]}`);
        });
      }
      if (item.classList.contains("anim-container-replace")) {
        const itemsTohide = item.dataset.animContainerReplaceHide.split(" ");
        const itemsToShow = item.dataset.animContainerReplaceShow.split(" ");
        itemsTohide.forEach((target, index) => {
          animContainerReplace(`#${target}`, `#${itemsToShow[index]}`);
        });
      }
    });
  });
})();

// SCROLL

gsap.registerPlugin(ScrollTrigger);

/**
 * .anim-scroll-fade-in elements fade in and rise on scroll.
 *
 * Modifier classes (value is **milliseconds**):
 *   anim-delay-[int] — delay before start
 *   anim-fade-[int]  — animation duration
 *
 * Example:
 *   class="anim-scroll-fade-in anim-delay-300 anim-fade-750"
 *     → delay = 0.3 s, duration = 0.75 s
 */
(function () {
  const elements = gsap.utils.toArray(".anim-scroll-fade-in");

  elements.forEach((el) => {
    // pull ms values from class names, default 0 ms / 1000 ms
    const delayMs = +(el.className.match(/anim-delay-(\d+)/)?.[1] || 0);
    const fadeMs  = +(el.className.match(/anim-fade-(\d+)/)?.[1]  || 1000);

    gsap.set(el, { opacity: 0, y: 20 });

    gsap.to(el, {
      delay: delayMs / 1000,
      duration: fadeMs / 1000,
      opacity: 1,
      y: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
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

gsap.registerPlugin(ScrollTrigger);

/**
 * Elements that gain anim-fade-in or anim-fade-out will fade in (or out)
 *
 * Elements that gain anim-container-replace will fade one container's children out (staggered) 
 * and another container's children in (staggered)
 * [data-anim-hide] is the container whose child elements will be hidden.
 * [data-anim-show] is the container whose child elements will be shown.
 */
(function() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (
          !mutation.oldValue.includes("anim-fade-in") &&
          mutation.target.classList.contains("anim-fade-in")
        ) {
          mutation.target.classList.remove("d-none");
          gsap.set(mutation.target, {
            opacity: 0,
            y: 20
          });
          gsap.to(mutation.target, {
            duration: 1,
            opacity: 1,
            y: 0,
            onComplete: () => {
              mutation.target.classList.remove("anim-fade-in");
            }
          });
        }
        if (
          !mutation.oldValue.includes("anim-fade-out") &&
          mutation.target.classList.contains("anim-fade-out")
        ) {
          gsap.to(mutation.target, {
            duration: 1,
            opacity: 0,
            y: 20,
            onComplete: () => {
              mutation.target.classList.add("d-none");
              mutation.target.classList.remove("anim-fade-out");
            }
          });
        }
        if (
          !mutation.oldValue.includes("anim-container-replace") &&
          mutation.target.classList.contains("anim-container-replace")
        ) {
          mutation.target.classList.remove("anim-container-replace");
          const itemsToHide = document.querySelectorAll(
            `#${mutation.target.dataset.animHide} > *`
          );
          const itemsToShow = document.querySelectorAll(
            `#${mutation.target.dataset.animShow} > *`
          );
          const tl = gsap.timeline({});
          tl.to(itemsToHide, {
            duration: 0.4,
            stagger: 0.1,
            opacity: 0,
            y: -20,
            onComplete: () => {
              document
                .querySelector(`#${mutation.target.dataset.animHide}`)
                .classList.add("d-none");
              document
                .querySelector(`#${mutation.target.dataset.animShow}`)
                .classList.remove("d-none");
            }
          }).staggerFromTo(
            itemsToShow,
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
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
    attributeOldValue: true
  });
})();

function anim_fade_in(item) {}
function anim_fade_out(item) {}
function anim_container_replace() {}

/**
 * Elements that gain anim-container-replace will fade one container's children out (staggered) 
 * and another container's children in (staggered)
 * [data-anim-hide] is the container whose child elements will be hidden.
 * [data-anim-show] is the container whose child elements will be shown.
 */

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

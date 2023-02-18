gsap.registerPlugin(ScrollTrigger);

//Fade in (upwards) on scroll
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

//Highlight on hover
(function() {
  
  const elements = document.querySelectorAll('.anim-highlight');

  elements.forEach((el) => {
    el.addEventListener("mouseover", () => {
      gsap.to(el, {
        duration: 1,
        scale: 1.04,
      });    
    });
    el.addEventListener("mouseout", () => {
      TweenLite.to(el, 1, {
        scale: 1,
      });    
    });
  }); 
})();

//anim-scroll-slow
(function () {
  items = gsap.utils.toArray(".anim-scroll-slow");

  items.forEach((item) => {
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

//anim-scroll-up
(function () {
  items = gsap.utils.toArray(".anim-scroll-up");

  items.forEach((item) => {
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




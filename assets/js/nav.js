$(document).ready(function () {
  // Homepage hero only
  const coverBox = document.querySelector('.cover_box');
  if (typeof gsap === 'undefined' || !coverBox) return;

  // ANIMATE ON
  gsap.fromTo(".sw_profile", { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 1.4, ease: "expo" });
  gsap.fromTo(".de", { opacity: 0, left: -40 }, { opacity: 1, left: 20, duration: 2, delay: 0.8, ease: "expo" });
  gsap.fromTo(".co", { opacity: 0, right: -60 }, { opacity: 1, right: 0, duration: 2, delay: 1, ease: "expo" });

  // INTERACTIVE HERO: highlight the side the cursor is on
  let side = null;
  coverBox.addEventListener('mousemove', (e) => {
    const left = e.clientX < window.innerWidth / 2;
    if (left === side) return;
    side = left;
    gsap.to(".de", { alpha: left ? 1 : 0.1, duration: 2 });
    gsap.to(".co", { alpha: left ? 0.1 : 1, duration: 2 });
  });
});

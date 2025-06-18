$(document).ready(function(){

  gsap.registerPlugin(EaselPlugin)
  gsap.registerPlugin(ScrollToPlugin);

  //ANIMATE ON
  gsap.fromTo(".sw_profile", { opacity: 0 }, { opacity: 1, duration: 1.2, delay:1.4, ease: "expo" });
  //gsap.fromTo(".sw_design", { opacity: 0 }, { opacity: 1, duration: 1.4, delay:1.4, ease: "expo" });
  //gsap.fromTo(".sw_code", { opacity: 0 }, { opacity: 1, duration: 1.6, delay:1.6, ease: "expo" });
  gsap.fromTo(".de", { opacity:0, left:-40}, { opacity: 1, left:20, duration: 2, delay:0.8, ease: "expo" });
  gsap.fromTo(".co", { opacity: 0, right:-60 }, { opacity: 1, right:0, duration: 2, delay:1, ease: "expo" });

    // SCROLL TO LINKS
  document.querySelectorAll(".navbar-nav .nav-item .nav-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      event.preventDefault();
      hrefValue = btn.hash; 
      gsap.to(window, {duration: 2, scrollTo:{y:hrefValue, ease: "expo"}});
  });
});

    //INTERACTIVE HERO
    const sw_design = document.querySelector('.sw_design'),
    sw_profile = document.querySelector('.sw_profile'),
    sw_code = document.querySelector('.sw_code'),
    cover_box = document.querySelector('.cover_box')

    cover_box.addEventListener('mousemove', (e) => {
      const x = e.clientX,
            y = e.clientY;
      //sw_design.style.transform = `translate(${x / -60}px,0)`;
      sw_profile.style.transform = `translate(${x / -10 -100}px, 0)`;
      //sw_code.style.transform = `translate(${x / -40}px,0)`;

      //ANIMATION HERO
      if(x<739){
        gsap.to(".de", {alpha: 1, duration: 2});
        gsap.to(".co", {alpha: 0.1, duration: 2});
        //gsap.to(".sw_design", {alpha: 1, duration: 2});
        //gsap.to(".sw_code", {alpha: 0.4, duration: 2});
      }
      else {
        gsap.to(".de", {alpha: 0.1, duration: 2});
        gsap.to(".co", {alpha: 1, duration: 2});
        //gsap.to(".sw_design", {alpha: 0.4, duration: 2});
        //gsap.to(".sw_code", {alpha: 1, duration: 2});
      }

    });
});
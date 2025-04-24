$(document).ready(function(){
    // Add smooth scrolling to all links
    $(".nav-link").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 2000, "easeOutExpo", function() {
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          //window.location.hash = hash;
        });
      } // End if
    });

    // const sw_design = document.querySelector('.sw_design'),
    // swrobot = document.querySelector('.swrobot'),
    // sw_code = document.querySelector('.sw_code'),
    // root = document.documentElement;

    // root.addEventListener('mousemove', (e) => {
    // const x = e.clientX,
    //       y = e.clientY;
    // sw_design.style.transform = `translate(${x / -60}px,0)`;
    // swrobot.style.transform = `translate(${x / 80}px,0)`;
    // sw_code.style.transform = `translate(${x / 50}px,0)`;

    // console.log();
});


  });
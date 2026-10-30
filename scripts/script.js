$(document).ready(function(){

    //Home section size
    $(window).scroll(function(){

        var homeSize = $( "#home" ).height();
        var navbarSize =  $(".navbar").height();

        $('nav').toggleClass('scrolled', $(this).scrollTop() > homeSize -navbarSize);
        $('.social, #socialArrow').toggleClass('heroIconsHidden', $(this).scrollTop() > 50);
    });

    //Scrolling
    $("#mainNav a, #socialArrow a, #upArrow a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } 
    });

    //ProjectsAndMagnifer
    $(function() {
      $('.projectGif, .projectTitle').hover(function() {
        const $card = $(this).closest('.projectGifAndMagnifer');

        $card.find('.magnifier').addClass('magnifierShow');
        $card.find('.projectGif .card-img-top').addClass('projectGifOpacity');
      }, function() {
        const $card = $(this).closest('.projectGifAndMagnifer');

        // on mouseout, reset the background colour
        $card.find('.magnifier').removeClass('magnifierShow');
        $card.find('.projectGif .card-img-top').removeClass('projectGifOpacity');
      });
    });

    //Modal image gallery
    $(".sImg").on('click', function(event) {
      let imgsrc = ($(this).attr('src'));
      let id = ($(this).attr('smallID'));
      let sliceNumber = 0;
      if(id.length == 6){
        sliceNumber = 1;
      }
      else if(id.length == 7){
        sliceNumber = 2;
      }

      id = id.slice(id.length - sliceNumber);
      let bigScreen = 'main' + id;
      let bigphoto =  $("#" + bigScreen);
      bigphoto.attr("src",imgsrc);
 
    });

    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  });
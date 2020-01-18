$(document).ready(function(){


    $(window).scroll(function(){

        var homeSize = $( "#home" ).height();
        var navbarSize =  $(".navbar").height();

        $('nav').toggleClass('scrolled', $(this).scrollTop() > homeSize -navbarSize);
    });

    
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

    $(function() {
      let projectid = "";
      $('.projectGifAndMagnifer').hover(function() {       
        projectid = this.id;

        $('#' + projectid + ' .magnifier').addClass('magnifierShow');
        $('#' + projectid + ' .projectGif').addClass('projectGifOpacity');
      }, function() {

        // on mouseout, reset the background colour
        $('#' + projectid + ' .magnifier').removeClass('magnifierShow');
        $('#' + projectid + ' .projectGif').removeClass('projectGifOpacity');
      });
    });

    $(".sImg").on('click', function(event) {
      let imgsrc = ($(this).attr('src'));
      let id = ($(this).attr('smallID'));
      id = id.slice(id.length - 1);
      let bigScreen = 'main' + id;
      let bigphoto =  $("#" + bigScreen);
      bigphoto.attr("src",imgsrc);
 
    });

  });
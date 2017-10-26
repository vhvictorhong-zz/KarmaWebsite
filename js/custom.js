jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {

              var top_space = 0;

              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }

              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }

              return false;
          }
      }
  });

  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }

  });

  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

  var galleryFeed = new Instafeed({
    get: 'user',
    userId: '2054867612',
    accessToken: '2054867612.1677ed0.531bc5fd088b47618c58effe957cc866',
    resolution: "standard_resolution",
    useHttp: "true",
    sortBy: 'most-recent',
    limit: 100,
    template:
      '<div class="img-featured-container">'+
      '<div class="img-backdrop"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></div>'+
      '</div>',
      target: "instafeed-gallery-feed",
      after: function() {
        // disable button if no more results to load
        if (!this.hasNext()) {
          btnInstafeedLoad.setAttribute('disabled', 'disabled');
        }

        var owl = $(".owl-carousel"),
        owlSlideSpeed = 300;

        // init owl
        $(document).ready(function(){
          owl.owlCarousel({
            // navContainer: '.owl-nav-custom',
            // dotsContainer: '.owl-dots-custom',
            margin:10,
            loop:true,
            margin:10,
            nav:true,
            responsive:{
              0:{
                items:1
              },
              370:{
                items:2
              },
              640:{
                items:3
              }
            }
          });
        });

        // keyboard controls
        $(document.documentElement).keydown(function(event) {
          if (event.keyCode == 37) {
            owl.trigger('prev.owl.carousel', [owlSlideSpeed]);
          }
          else if (event.keyCode == 39) {
            owl.trigger('next.owl.carousel', [owlSlideSpeed]);
          }
        });
      }
    });

    galleryFeed.run();

    var btnInstafeedLoad = document.getElementById("btn-instafeed-load");
    btnInstafeedLoad.addEventListener("click", function() {
      galleryFeed.next()
    });

});

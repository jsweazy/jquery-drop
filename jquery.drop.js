(function($){
  $.fn.extend({ 
    drop: function(options) {
      //Defaults
      var defaults = {
        hoverClass: "hover", // class name used for when an element is hovered and has no dropdown
        hasDropdownClass: "drop", // class name used for when an element that contains a dropdown
        activeClass: "active", // class name used for when an element is hovered and has a dropdown
        animated: false, // true to make dropdown anmiated
        easeIn: false, // easing for "in" transition
        easeOut: false, // easing for "out" transition
        duration: 0, // milliseconds for animation
        durationIn: false, // milliseconds for animation "in"
        durationOut: false // milliseconds for animation "out"
      }
      	
      var options =  $.extend(defaults, options);
      
      //if easing is set check for easing plugin
      if(options.easeIn || options.easeOut) {
        if(!jQuery.easing["jswing"]) {
          alert('To use easing please include jquery.easing.js.');
        }
      }
      
      return this.each(function() {
        var o = options;
        var $el = $(this);
        var durationIn = (o.durationIn) ? o.durationIn : o.duration;
        var durationOut = (o.durationOut) ? o.durationOut : o.duration;
        
        if($('ul',this).children('li').length > 0) {
          $el.addClass(o.hasDropdownClass);
        }
        $el.hover(
          function(){
            if($(this).hasClass(o.hasDropdownClass)) {
              $(this).addClass(o.activeClass);
              if(o.animated) {
                if(o.easeIn) {
                  $el.children('ul').stop(true,true).slideDown({duration: durationIn, easing: o.easeIn});
                } else {
                  $el.children('ul').stop(true,true).slideDown({duration: durationIn}); 
                }
              } else {
                $el.children('ul').fadeIn({duration: durationIn});
              }
            } else {
              $(this).addClass(o.hoverClass);
            }
            
          },
          function() {
            if($(this).hasClass(o.hasDropdownClass)) {
              $(this).removeClass(o.activeClass);
              if(o.animated) {
                if(o.easeOut) {
                  $el.children('ul').stop(true,true).slideUp({duration: durationOut, easing: o.easeOut});
                } else {
                  $el.children('ul').stop(true,true).slideUp({duration: durationOut}); 
                }
              } else {
                $el.children('ul').fadeOut({duration: durationOut});
              }
            } else {
              $(this).removeClass(o.hoverClass);
            }
          }
        );
      });
    }
  });
})(jQuery);
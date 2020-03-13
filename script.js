
$(document).ready(function() {

  jQuery("#img_cont").image_with_controls(['rotate', 'flip', 'zoom', 'review'], {imagetype: "tiff"});

  $( ".tooltip" ).mousemove(function( e ) {

    var tooltipSpan = jQuery("span.tooltiptext", event.target)[0];

    if( !tooltipSpan ) return;

    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';

  });

} );


( function($) {

  $.fn.image_with_controls = function (opts, f_img_opts, b_img_opts ) {

    if( !this.is("div") ) {
      console.log("Container parent not a DIV ");
      return;
    }

    this.addClass("image_with_controls_cont");

    var f_img = jQuery("<img src='check-image.jpg' class='visible'></img>");
    if ( f_img_opts ) {
      Object.keys(f_img_opts).forEach(e => f_img.attr(e, f_img_opts[e]));
    }

    var b_img = jQuery("<img src='check_back.png' class='invisible' style='display:none'></img>");
    if ( b_img_opts ) {
      Object.keys(b_img_opts).forEach(e => b_img.attr(e, b_img_opts[e]));
    }

    var cont_div = jQuery("<div/>");
    if( opts.indexOf("rotate") != -1 ) {
      // add rotation button
      cont_div.append("<button class='rotate tooltip'><i class='fa fa-rotate-right'></i><span class='tooltiptext'>Rotate Image</span></button>");
    }

    if( opts.indexOf("flip") != -1 ) {
      // add flip button
      cont_div.append("<button class='flip tooltip'><i class='fa fa-sticky-note-o'></i><span class='tooltiptext'>Flip Image</span></button>");
    }

    if( opts.indexOf("zoom") != -1 ) {
      // add zoom/expand button
      cont_div.append("<button class='zoom tooltip'><i class='fa fa-expand'></i><span class='tooltiptext'>Zoom Image</span></button>");
    }

    if( opts.indexOf("review") != -1 ) {
      // add mark for review button
      cont_div.append("<button class='review tooltip'><i class='fa fa-eye'></i><span class='tooltiptext'>Mark for Review</span></button>");
    }

    this.append(f_img);
    this.append(b_img);
    this.append(cont_div);

    jQuery("div", this ).hide();
    this.hover( function() {
      jQuery("div", this ).show();
    }, function() {
      jQuery("div", this ).hide();
    });

    
    // rotation logic
    jQuery('button.rotate', this).click(function(e, img) {

      var img = jQuery("img.visible", jQuery(e.target).closest("div.image_with_controls_cont"));

      var degrees = jQuery(img).attr("rotation");
      if( !degrees || degrees == 360 ) degrees = 0;
      degrees = parseInt(degrees);
      degrees += 90;

      jQuery(img).css({
        'transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-o-transform': 'rotate(' + degrees + 'deg)'
      }); 

      jQuery(img).attr("rotation", degrees);

    });

    // flip logic
    jQuery('button.flip', this).click(function(e, img) {
      var v_img = jQuery("img.visible", jQuery(e.target).closest("div.image_with_controls_cont"));
      var i_img = jQuery("img.invisible", jQuery(e.target).closest("div.image_with_controls_cont"));

      v_img.removeClass("visible").addClass("invisible").hide();
      i_img.removeClass("invisible").addClass("visible").show();

    });


  }

} (jQuery));









jQuery(document).ready(function(){
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


jQuery('.renee_progress_container').each(function(){
  var this_val = jQuery(this).find('.renee_wip_anim_time').val() * 1000;
  var $this = jQuery(this);
  jQuery({ Counter: 0 }).animate({ Counter: $this.find(".renee_wip_hidden_percent").val() }, {
    duration: this_val,
    easing: "swing",
    step: function () {
      $this.find(".renee_progress_text").text(Math.round(this.Counter) + "%");
    }
  });
});

function wipBlocksWrap(){
  var count_blocks = jQuery(".wp-block-renee-wip-g-block").length;
  var id = 0;
  for(id = 0; id < count_blocks; id++){
    var first_block = jQuery(".wp-block-renee-wip-g-block").eq(id).parent().is(":not(.renee_wip_blocks_outer)");
    if(first_block == true){
      var first_block2 = jQuery(".wp-block-renee-wip-g-block").eq(id);
      first_block2.wrap('<div class="renee_wip_blocks_outer" id="renee_wip_blocks' + id + '"></div>');
      var first_block_siblings = jQuery("#renee_wip_blocks" + id).next(".wp-block-renee-wip-g-block");
      while(first_block_siblings.length > 0){
        first_block_siblings.appendTo("#renee_wip_blocks" + id);
        first_block_siblings = jQuery("#renee_wip_blocks" + id).next(".wp-block-renee-wip-g-block");
      }
    }
  }
  jQuery(".wp-block-renee-wip-g-block").css("opacity", "1");

  function textSize(thiss, fitee, font_size){
    var val = font_size;
    var min = 0.00;
    var max = 10;
    var step = max / 100;
    var final_val = 10 - val * step;
    jQuery(thiss).find(fitee).off('resize.fittext orientationchange.fittext');
    jQuery(thiss).find(fitee).fitText(final_val);
  }

  jQuery.fn.isInViewport = function() {
    if(typeof(jQuery(this).offset()) !== "undefined"){
      var elementTop = jQuery(this).offset().top;
      var elementBottom = elementTop + jQuery(this).outerHeight();

      var viewportTop = jQuery(window).scrollTop();
      var viewportBottom = viewportTop + jQuery(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
  };

  function animateMeters(thiss){
    var this_val = jQuery(thiss).val();
    var meter_start = jQuery(thiss).find(".hidden_gauge_meter_start").val();
    var meter_end = jQuery(thiss).find(".hidden_gauge_meter_end").val();
    var hand_start = jQuery(thiss).find(".hidden_gauge_hand_start").val();
    var hand_end = jQuery(thiss).find(".hidden_gauge_hand_end").val();
    var anim_time = jQuery(thiss).find(".renee_wip_anim_time").val();
    var btn_font_size = jQuery(thiss).find(".renee_wip_btn_font_size").val();
    var txt_font_size = jQuery(thiss).find(".renee_wip_txt_font_size").val();
    jQuery(thiss).find(".svg_meter_color, .svg_hand_color, .hand_group").css({
      "-webkit-transition": "all 0s",
      "transition": "all 0s"
    });
    jQuery(thiss).find(".svg_meter_color").css({
      "stroke-dasharray": meter_start
    });
    jQuery(thiss).find(".svg_hand_color, .hand_group").css({
      "transform": hand_start
    });
    jQuery(thiss).offset();
    jQuery(thiss).find(".svg_meter_color, .svg_hand_color, .hand_group").css({
      "-webkit-transition": "all " + anim_time + "s",
      "transition": "all " + anim_time + "s"
    });
    jQuery(thiss).find(".svg_meter_color").css({
      "stroke-dasharray": meter_end
    });
    jQuery(thiss).find(".svg_hand_color, .hand_group").css({
      "transform": hand_end
    });
    jQuery(thiss).each(function(){
      textSize(this, ".renee_wip_gotomodel", btn_font_size);
    });
    jQuery(thiss).each(function(){
      textSize(this, ".renee_progress_text", txt_font_size);
    });
  }

  jQuery('.renee_progress_container').each(function(){
    animateMeters(this);
  });

  jQuery(window).on('scroll resize', function(){
    if(jQuery(this).find('.renee_progress_container').isInViewport() === true){
      animateMeters(jQuery(this).find('.renee_progress_container'));
    }
  });
}
wipBlocksWrap();



});//end doc ready

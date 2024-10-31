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
        settings = jQuery.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = jQuery(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      jQuery(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


jQuery(document).ready(function(){

	var tab_gauges = jQuery('.renee_wip_settings_container .tab');
	var gauges = jQuery('.renee_wip_settings_container .gauge_styles');
	for(var i = 0; i < gauges.length; i++){
		if(jQuery(tab_gauges[i]).is(':checked') === true){
			jQuery(gauges[i]).css('display', 'block');
		}
	}
	jQuery('#tab_circle').on('click', function(){
		jQuery('.gauge_styles').css('display', 'none');
		jQuery('.circle_styles').css('display', 'block');
	});
	jQuery('#tab_battery').on('click', function(){
		jQuery('.gauge_styles').css('display', 'none');
		jQuery('.battery_styles').css('display', 'block');
	});
	jQuery('#tab_speedo1').on('click', function(){
		jQuery('.gauge_styles').css('display', 'none');
		jQuery('.speedo1_styles').css('display', 'block');
	});
	jQuery('#tab_speedo2').on('click', function(){
		jQuery('.gauge_styles').css('display', 'none');
		jQuery('.speedo2_styles').css('display', 'block');
	});
	jQuery('#tab_rogal').on('click', function(){
		jQuery('.gauge_styles').css('display', 'none');
		jQuery('.rogal_styles').css('display', 'block');
	});

	jQuery('.tab, .settings_tab').on('click', function(){
    setTimeout(function(){
      jQuery(".buttontext_size").each(function(){
  			textSize(this, ".renee_wip_gotomodel");
  		});
  		jQuery(".text_size").each(function(){
  			textSize(this, ".renee_progress_text");
  		});
  		jQuery('.gauge_styles').each(function(){
  			var this_val = jQuery(this).find('.anim_time').val() * 1000;
  			var $this = jQuery(this);
  			jQuery({ Counter: 0 }).animate({ Counter: $this.find(".renee_wip_hidden_percent").val() }, {
  				duration: this_val,
  				easing: "swing",
  		    step: function () {
  		      $this.find(".renee_progress_text").text(Math.round(this.Counter) + "%");
  		    }
  		  });
  		});
  		jQuery(".anim_time").each(function(){
  			animateMeters(this);
  		});
    }, 100);

	});

/*************************************************** STYLE GAUGES ****************************/

	jQuery(".bg_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_bg_color').css('stroke', val);
	});

	jQuery(".grid_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_text_color').css({
			'stroke': val,
			'fill': val
		});
		jQuery(this).parents('.gauge_styles').find('.svg_line_color').css({
			'stroke': val
		});
	});

	jQuery(".grid_color2").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_text_color2').css({
			'fill': val,
			'stroke': val
		});
		jQuery(this).parents('.gauge_styles').find('.svg_line_color2').css({
			'fill': val
		});
	});

	jQuery(".fill_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_fill_color').css('fill', val);
	});

	jQuery(".edge_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_edge_color').css('stroke', val);
		jQuery(this).parents('.gauge_styles').find('.svg_edgefill_color').css('fill', val);
	});

	jQuery(".meter_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_meter_color').css('stroke', val);
	});

	jQuery(".hand_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_hand_color').css('fill', val);
	});

	jQuery(".hand_color2").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.svg_hand_color2').css({
			'fill': val,
			'stroke': val
		});
	});

	jQuery(".button_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('background-color', val);
	});

	jQuery(".buttonborder_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-color', val);
	});

	jQuery(".buttonborder_width").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-width', val + "px");
	});

	jQuery(".buttonborder_style").on('change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-style', val);
	});

	jQuery(".buttonborder_radius_tl").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-top-left-radius', val + "px");
	});

	jQuery(".buttonborder_radius_tr").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-top-right-radius', val + "px");
	});

	jQuery(".buttonborder_radius_bl").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-bottom-left-radius', val + "px");
	});

	jQuery(".buttonborder_radius_br").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('border-bottom-right-radius', val + "px");
	});

	jQuery(".buttontext_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('color', val);
	});

  jQuery(".color_hex").on('keyup', function(){
		var val = jQuery(this).val();
		jQuery(this).prev('input[type="color"]').val(val);
    jQuery(this).prev('input[type="color"]').trigger('keyup');
	});


	function textSize(thiss, fitee){
		var val = jQuery(thiss).val();
		var min = 0.00;
		var max = 10;
		var step = max / 100;
		var final_val = 10 - val * step;
		jQuery(thiss).off('resize.fittext orientationchange.fittext');
		jQuery(thiss).parents('.gauge_styles').find(fitee).fitText(final_val);
	}

	jQuery(".buttontext_size").each(function(){
		textSize(this, ".renee_wip_gotomodel");
	});

	jQuery(".buttontext_size").on('keyup mouseup', function(){
		textSize(this, ".renee_wip_gotomodel");
	});


	jQuery(".buttontext_shadow_h, .buttontext_shadow_v, .buttontext_shadow_blur, .buttontext_shadow_color").on('keyup mouseup change', function(){
		var h = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_h").val();
		var v = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_v").val();
		var blur = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_blur").val();
		var color = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_color").val();
		if(jQuery(this).parents('.gauge_styles').find(".buttontext_shadow").is(':checked') === true){
			jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('text-shadow', h + 'px ' + v + 'px ' + blur + 'px ' + color);
		}
		else{
			jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('text-shadow', '0 0 0 #ffffff');
		}
	});

	jQuery(".buttontext_shadow").on('change', function(){
		var h = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_h").val();
		var v = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_v").val();
		var blur = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_blur").val();
		var color = jQuery(this).parents('.gauge_styles').find(".buttontext_shadow_color").val();
		if(jQuery(this).is(':checked') === true){
			jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('text-shadow', h + 'px ' + v + 'px ' + blur + 'px ' + color);
		}
		else{
			jQuery(this).parents('.gauge_styles').find('.renee_wip_gotomodel').css('text-shadow', '0 0 0 #ffffff');
		}
	});

	jQuery(".text_color").on('keyup mouseup change', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('color', val);
	});


	jQuery(".text_size").each(function(){
		textSize(this, ".renee_progress_text");
	});

	jQuery(".text_size").on('keyup mouseup', function(){
		textSize(this, ".renee_progress_text");
	});


	jQuery(".text_vposition").on('keyup mouseup', function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('line-height', val + '%');
	});

	jQuery(".text_shadow_h, .text_shadow_v, .text_shadow_blur, .text_shadow_color").on('keyup mouseup change', function(){
		var h = jQuery(this).parents('.gauge_styles').find(".text_shadow_h").val();
		var v = jQuery(this).parents('.gauge_styles').find(".text_shadow_v").val();
		var blur = jQuery(this).parents('.gauge_styles').find(".text_shadow_blur").val();
		var color = jQuery(this).parents('.gauge_styles').find(".text_shadow_color").val();
		if(jQuery(this).parents('.gauge_styles').find(".text_shadow").is(':checked') === true){
			jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('text-shadow', h + 'px ' + v + 'px ' + blur + 'px ' + color);
		}
		else{
			jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('text-shadow', '0 0 0 #ffffff');
		}
	});

	jQuery(".text_shadow").on('change', function(){
		var h = jQuery(this).parents('.gauge_styles').find(".text_shadow_h").val();
		var v = jQuery(this).parents('.gauge_styles').find(".text_shadow_v").val();
		var blur = jQuery(this).parents('.gauge_styles').find(".text_shadow_blur").val();
		var color = jQuery(this).parents('.gauge_styles').find(".text_shadow_color").val();
		if(jQuery(this).is(':checked') === true){
			jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('text-shadow', h + 'px ' + v + 'px ' + blur + 'px ' + color);
		}
		else{
			jQuery(this).parents('.gauge_styles').find('.renee_progress_text').css('text-shadow', '0 0 0 #ffffff');
		}
	});

	/***************************************** DEFINE ANIMATION **********************************/
	jQuery('.gauge_styles').each(function(){
		var this_val = jQuery(this).find('.anim_time').val() * 1000;
		var $this = jQuery(this);
		jQuery({ Counter: 0 }).animate({ Counter: $this.find(".renee_wip_hidden_percent").val() }, {
			duration: this_val,
			easing: "swing",
	    step: function () {
	      $this.find(".renee_progress_text").text(Math.round(this.Counter) + "%");
	    }
	  });
	});

	jQuery(".anim_time").on('keyup mouseup', function () {
		var this_val = jQuery(this).val() * 1000;
		var $this = jQuery(this).parents('.gauge_styles');
		jQuery({ Counter: 0 }).animate({ Counter: $this.find(".renee_wip_hidden_percent").val() }, {
			duration: this_val,
			easing: "swing",
	    step: function () {
	      $this.find(".renee_progress_text").text(Math.round(this.Counter) + "%");
	    }
	  });
	});

	jQuery('.gauge_styles').each(function(){
		var anim_time = jQuery(this).find(".anim_time").val();
		var meter_init = jQuery(this).find(".hidden_gauge_meter_end").val();
		var hand_init = jQuery(this).find(".hidden_gauge_hand_end").val();
		jQuery(this).find(".svg_meter_color, .svg_hand_color, .hand_group").css({
			"-webkit-transition": "all " + anim_time + "s",
			"transition": "all " + anim_time + "s"
		});
		jQuery(this).find(".svg_meter_color").css({
			"stroke-dasharray": meter_init
		});
		jQuery(this).find(".svg_hand_color, .hand_group").css({
			"transform": hand_init
		});
	});

	function animateMeters(thiss){
		var this_val = jQuery(thiss).val();
		var meter_start = jQuery(thiss).parents('.gauge_styles').find(".hidden_gauge_meter_start").val();
		var meter_end = jQuery(thiss).parents('.gauge_styles').find(".hidden_gauge_meter_end").val();
		var hand_start = jQuery(thiss).parents('.gauge_styles').find(".hidden_gauge_hand_start").val();
		var hand_end = jQuery(thiss).parents('.gauge_styles').find(".hidden_gauge_hand_end").val();
		jQuery(thiss).parents('.gauge_styles').find(".svg_meter_color, .svg_hand_color, .hand_group").css({
			"-webkit-transition": "all 0s",
			"transition": "all 0s"
		});
		jQuery(thiss).parents('.gauge_styles').find(".svg_meter_color").css({
			"stroke-dasharray": meter_start
		});
		jQuery(thiss).parents('.gauge_styles').find(".svg_hand_color, .hand_group").css({
			"transform": hand_start
		});
		jQuery(thiss).offset();
		jQuery(thiss).parents('.gauge_styles').find(".svg_meter_color, .svg_hand_color, .hand_group").css({
			"-webkit-transition": "all " + this_val + "s",
			"transition": "all " + this_val + "s"
		});
		jQuery(thiss).parents('.gauge_styles').find(".svg_meter_color").css({
			"stroke-dasharray": meter_end
		});
		jQuery(thiss).parents('.gauge_styles').find(".svg_hand_color, .hand_group").css({
			"transform": hand_end
		});
	}
	jQuery(".anim_time").on('keyup mouseup', function(){
		animateMeters(this);
	});
  jQuery('.renee_wip_settings_container .default_gauge').on('mouseup keyup', function(){
    jQuery(this).siblings('.default').insertBefore(jQuery(this));
  });

  /***************************************** SAVE / AUTOSAVE **********************************/
  jQuery('.renee_wip_settings_save').on('click', function(e){
    e.preventDefault();

    jQuery('.renee_wip_settings_save .renee_wip_spinner').addClass('visible');
    jQuery('.renee_wip_settings_save .renee_wip_tick').addClass('hidden');

  	data = new FormData();

    var inputs = jQuery('.renee_wip_settings_form input:not([type="checkbox"], [type="radio"])');
    for(var i = 0; i < inputs.length; i++){
      data.append(jQuery(inputs[i]).attr('name'), jQuery(inputs[i]).val());
    }

    var checks = jQuery('.renee_wip_settings_form input[type="checkbox"]');
    for(var ii = 0; ii < checks.length; ii++){
      if(jQuery(checks[ii]).is(':checked') === true){
        data.append(jQuery(checks[ii]).attr('name'), 'on');
      }
      else{
        data.append(jQuery(checks[ii]).attr('name'), '');
      }
    }

    var radios = jQuery('.renee_wip_settings_form input[type="radio"]');
    for(var iii = 0; iii < radios.length; iii++){
      if(jQuery(radios[iii]).is(':checked') === true){
        data.append(jQuery(radios[iii]).attr('name'), jQuery(radios[iii]).val());
      }
    }

    var selects = jQuery('.renee_wip_settings_form select');
    for(var i2 = 0; i2 < selects.length; i2++){
      data.append(jQuery(selects[i2]).attr('name'), jQuery(selects[i2]).val());
    }
    data.append('action', 'renee_wip_settings_ajax');


  	jQuery.ajax({
  		type:'post',
  		url: renee_wip_admin_ajax_object.ajax_url,
  		data: data,
  		dataType: 'html',
  		enctype: 'application/x-www-form-urlencoded',
  		processData: false,
  		contentType: false,
  		success: function(res){
        if( res !== 'OK' ){
          console.log(res);
        }
        jQuery('.renee_wip_settings_save .renee_wip_spinner').removeClass('visible');
        jQuery('.renee_wip_settings_save .renee_wip_tick').removeClass('hidden');
  		},
  		error: function(err){
  			throw err;
  		}
  	});

  });

});//end doc ready

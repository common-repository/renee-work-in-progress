<?php
defined( 'ABSPATH' ) or die();
global $wpdb;
$table = $wpdb->prefix . 'renee_wip_settings';

$circle_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='circle'" );
$circle_css_decoded = json_decode( $circle_css_settings, true );

$battery_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='battery'" );
$battery_css_decoded = json_decode( $battery_css_settings, true );

$speedometer1_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='speedometer'" );
$speedometer1_css_decoded = json_decode( $speedometer1_css_settings, true );

$speedometer2_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='speedometer2'" );
$speedometer2_css_decoded = json_decode( $speedometer2_css_settings, true );

$rogal_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='rogal'" );
$rogal_css_decoded = json_decode( $rogal_css_settings, true );

$general_css_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='general'" );
$general_css_decoded = json_decode( $general_css_settings, true );
$block_width_mobile = ( isset( $general_css_decoded ) && $general_css_decoded['columns_mobile'] !== null ) ? 100 / intval( $general_css_decoded['columns_mobile'] ): 100;
$block_width_tablet = ( isset( $general_css_decoded ) && $general_css_decoded['columns_tablet'] !== null ) ? 100 / intval( $general_css_decoded['columns_tablet'] ): 50;
$block_width_laptop = ( isset( $general_css_decoded ) && $general_css_decoded['columns_laptop'] !== null ) ? 100 / intval( $general_css_decoded['columns_laptop'] ): 33.33;
$block_width_desktop = ( isset( $general_css_decoded ) && $general_css_decoded['columns_desktop'] !== null ) ? 100 / intval( $general_css_decoded['columns_desktop'] ): 25;

?>
<style media="screen">
	@media screen and (max-width:700px){
		.renee_wip_settings_container .wp-block-renee-wip-g-block,
		.renee_wip_blocks_outer .wp-block-renee-wip-g-block{
			display:inline-block;
			position:relative;
			padding:2%;
			width:<?php echo $block_width_mobile - 0; ?>%;
			opacity:0;
		}
	}
	@media screen and (min-width:701px){
		.renee_wip_settings_container .wp-block-renee-wip-g-block,
		.renee_wip_blocks_outer .wp-block-renee-wip-g-block{
			display:inline-block;
			position:relative;
			padding:2%;
			width:<?php echo $block_width_tablet - 0; ?>%;
			opacity:0;
		}
	}
	@media screen and (min-width:1200px){
		.renee_wip_settings_container .wp-block-renee-wip-g-block,
		.renee_wip_blocks_outer .wp-block-renee-wip-g-block{
			display:inline-block;
			position:relative;
			padding:2%;
			width:<?php echo $block_width_laptop - 0; ?>%;
			opacity:0;
		}
	}
	@media screen and (min-width:1600px){
		.renee_wip_settings_container .wp-block-renee-wip-g-block,
		.renee_wip_blocks_outer .wp-block-renee-wip-g-block{
			display:inline-block;
			position:relative;
			padding:2%;
			width:<?php echo $block_width_desktop - 0; ?>%;
			opacity:0;
		}
	}


	/***************************************************** CIRCLE *****************/
	.renee_wip_settings_container .renee_progress_icon_circle .renee_progress_text,
	.renee_wip_blocks_outer .renee_progress_icon_circle .renee_progress_text{
		line-height: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['text_vposition'] ) : '470'; ?>%;
		color:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['text_color'] ) : '#000000'; ?>;
		text-shadow:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null && $circle_css_decoded['text_shadow'] === 'on' ) ? intval( $circle_css_decoded['text_shadow_h'] ) . "px " . intval( $circle_css_decoded['text_shadow_v'] ) . "px " . intval( $circle_css_decoded['text_shadow_blur'] ) . "px " . esc_attr( $circle_css_decoded['text_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_icon_circle .svg_bg_color{
		stroke: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['bg_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_circle .svg_meter_color{
		stroke: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['meter_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_circle{
		background-color: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['button_color'] ) : '#658ba8'; ?>;
		border-color:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['buttonborder_color'] ) : '#658ba8'; ?>;
		border-width:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['buttonborder_width'] ) : '0'; ?>px;
		border-style:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['buttonborder_style'] ) : 'solid'; ?>;
		border-top-left-radius: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['buttonborder_radius_tl'] ) : '0'; ?>px;
		border-top-right-radius: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['buttonborder_radius_tr'] ) : '0'; ?>px;
		border-bottom-left-radius: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['buttonborder_radius_bl'] ) : '0'; ?>px;
		border-bottom-right-radius: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? intval( $circle_css_decoded['buttonborder_radius_br'] ) : '0'; ?>px;
		color:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['buttontext_color'] ) : '#ffffff'; ?>;
		text-shadow:<?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null && $circle_css_decoded['buttontext_shadow'] === 'on' ) ? intval( $circle_css_decoded['buttontext_shadow_h'] ) . "px " . intval( $circle_css_decoded['buttontext_shadow_v'] ) . "px " . intval( $circle_css_decoded['buttontext_shadow_blur'] ) . "px " . esc_attr( $circle_css_decoded['buttontext_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_circle:hover{
		background-color: <?php echo ( isset( $circle_css_decoded ) && $circle_css_decoded !== null ) ? esc_attr( $circle_css_decoded['button_color'] ) : '#658ba8'; ?>;
	}

	/***************************************************** BATTERY *****************/
	.renee_wip_settings_container .renee_svg_battery_rect01{
		opacity:1;
		fill:#ffffff;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#ccc;
		stroke-width:2.5173862;
		stroke-linecap:butt;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_wip_settings_container .renee_svg_battery_rect02{
		opacity:1;
		fill:#ccc;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#ccc;
		stroke-width:2.49451399;
		stroke-linecap:butt;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_wip_settings_container .renee_svg_battery_path01{
		transition:all 0.3s;
		fill:none;
		fill-rule:evenodd;
		stroke:#658ba8;
		stroke-width:42.33333206;
		stroke-linecap:butt;
		stroke-linejoin:miter;
		stroke-miterlimit:4;
		stroke-dasharray:0, 108;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_wip_settings_container .renee_progress_icon_battery .renee_progress_text,
	.renee_wip_blocks_outer .renee_progress_icon_battery .renee_progress_text{
		line-height: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['text_vposition'] ) : '200'; ?>%;
		color:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['text_color'] ) : '#000000'; ?>;
		text-shadow:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null && $battery_css_decoded['text_shadow'] === 'on' ) ? intval( $battery_css_decoded['text_shadow_h'] ) . "px " . intval( $battery_css_decoded['text_shadow_v'] ) . "px " . intval( $battery_css_decoded['text_shadow_blur'] ) . "px " . esc_attr( $battery_css_decoded['text_shadow_color'] ) : 'none'; ?>;
	}



	.renee_progress_icon_battery .svg_fill_color{
		fill: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['fill_color'] ) : '#ffffff'; ?>;
	}

	.renee_progress_icon_battery .svg_edge_color{
		stroke: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['edge_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_battery .svg_edgefill_color{
		stroke: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['edge_color'] ) : '#cccccc'; ?>;
		fill: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['edge_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_battery .svg_meter_color{
		stroke: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['meter_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_battery{
		background-color: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['button_color'] ) : '#658ba8'; ?>;
		border-color:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['buttonborder_color'] ) : '#658ba8'; ?>;
		border-width:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['buttonborder_width'] ) : '0'; ?>px;
		border-style:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['buttonborder_style'] ) : 'solid'; ?>;
		border-top-left-radius: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['buttonborder_radius_tl'] ) : '0'; ?>px;
		border-top-right-radius: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['buttonborder_radius_tr'] ) : '0'; ?>px;
		border-bottom-left-radius: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['buttonborder_radius_bl'] ) : '0'; ?>px;
		border-bottom-right-radius: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? intval( $battery_css_decoded['buttonborder_radius_br'] ) : '0'; ?>px;
		color:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['buttontext_color'] ) : '#ffffff'; ?>;
		text-shadow:<?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null && $battery_css_decoded['buttontext_shadow'] === 'on' ) ? intval( $battery_css_decoded['buttontext_shadow_h'] ) . "px " . intval( $battery_css_decoded['buttontext_shadow_v'] ) . "px " . intval( $battery_css_decoded['buttontext_shadow_blur'] ) . "px " . esc_attr( $battery_css_decoded['buttontext_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_battery:hover{
		background-color: <?php echo ( isset( $battery_css_decoded ) && $battery_css_decoded !== null ) ? esc_attr( $battery_css_decoded['button_color'] ) : '#658ba8'; ?>;
	}

	/***************************************************** SPEEDOMETER1 *****************/
	.renee_svg_speedometer_icon01 .bg_path,
	.renee_svg_speedometer_icon01 .bar_path{
		opacity:1;
		fill:none;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#ccc;
		stroke-width:22.11133194;
		stroke-linecap:butt;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_svg_speedometer_icon01 .bar_path{
		stroke-dasharray:1, 170;
		stroke:#658ba8;
	}
	.renee_svg_speedometer_icon01 .text1{
		font-style:normal;
		font-variant:normal;
		font-weight:normal;
		font-stretch:normal;
		font-size:14.11111069px;
		line-height:125%;
		font-family:'Advent Pro';
		-inkscape-font-specification:'Advent Pro, Normal';
		font-variant-ligatures:normal;
		font-variant-caps:normal;
		font-variant-numeric:normal;
		font-feature-settings:normal;
		text-align:start;
		letter-spacing:0px;
		word-spacing:0px;
		writing-mode:lr-tb;
		text-anchor:start;
		fill:#ffffff;
		fill-opacity:1;
		stroke:none;
		stroke-width:0.26458332px;
		stroke-linecap:butt;
		stroke-linejoin:miter;
		stroke-opacity:1;
	}

	.renee_svg_speedometer_icon01 .text1 path{
		font-style:normal;
		font-variant:normal;
		font-weight:normal;
		font-stretch:normal;
		font-size:10.58333302px;
		font-family:'Advent Pro';
		-inkscape-font-specification:'Advent Pro, Normal';
		font-variant-ligatures:normal;
		font-variant-caps:normal;
		font-variant-numeric:normal;
		font-feature-settings:normal;
		text-align:start;
		writing-mode:lr-tb;
		text-anchor:start;
	}

	.renee_svg_speedometer_icon01 .line{
		opacity:1;
		fill:none;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#ffffff;
		stroke-width:1.05882347;
		stroke-linecap:butt;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_svg_speedometer_icon01 .text2{
		font-style:normal;
		font-variant:normal;
		font-weight:normal;
		font-stretch:normal;
		font-size:3.52777767px;
		line-height:125%;
		font-family:'Modern Pictograms';
		-inkscape-font-specification:'Modern Pictograms, Normal';
		font-variant-ligatures:normal;
		font-variant-caps:normal;
		font-variant-numeric:normal;
		font-feature-settings:normal;
		text-align:start;
		letter-spacing:0px;
		word-spacing:0px;
		writing-mode:lr-tb;
		text-anchor:start;
		fill:#ffffff;
		fill-opacity:1;
		stroke:#ffffff;
		stroke-width:1;
		stroke-linecap:butt;
		stroke-linejoin:miter;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-opacity:1;
	}

	.renee_svg_speedometer_icon01 .text2 path{
		font-style:normal;
		font-variant:normal;
		font-weight:normal;
		font-stretch:normal;
		font-size:3.52777767px;
		font-family:'Modern Pictograms';
		font-variant-ligatures:normal;
		font-variant-caps:normal;
		font-variant-numeric:normal;
		font-feature-settings:normal;
		text-align:start;
		writing-mode:lr-tb;
		text-anchor:start;
		fill:#ffffff;
		stroke:#ffffff;
		stroke-width:1;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-opacity:1;
	}

	.renee_svg_speedometer_icon01 .hand{
		fill:#333333;
		fill-rule:evenodd;
		stroke:none;
		stroke-width:0.26458332px;
		stroke-linecap:butt;
		stroke-linejoin:miter;
		stroke-opacity:1;
		transform-origin: 50% 430%;
		transform: rotate(-89deg);
	}

	.renee_wip_settings_container .renee_progress_icon_speedometer .renee_progress_text,
	.renee_wip_blocks_outer .renee_progress_icon_speedometer .renee_progress_text{
		line-height: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['text_vposition'] ) : '400'; ?>%;
		color:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['text_color'] ) : '#000000'; ?>;
		text-shadow:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null && $speedometer1_css_decoded['text_shadow'] === 'on' ) ? intval( $speedometer1_css_decoded['text_shadow_h'] ) . "px " . intval( $speedometer1_css_decoded['text_shadow_v'] ) . "px " . intval( $speedometer1_css_decoded['text_shadow_blur'] ) . "px " . esc_attr( $speedometer1_css_decoded['text_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_icon_speedometer .svg_bg_color{
		stroke: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['bg_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_speedometer .svg_line_color,
	.renee_progress_icon_speedometer path.svg_text_color,
	.renee_progress_icon_speedometer g.svg_text_color{
		stroke: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['grid_color'] ) : '#ffffff'; ?>;
	}

	.renee_progress_icon_speedometer path.svg_text_color,
	.renee_progress_icon_speedometer g.svg_text_color{
		fill: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['grid_color'] ) : '#ffffff'; ?>;
	}

	.renee_progress_icon_speedometer .svg_meter_color{
		stroke: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['meter_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_icon_speedometer .svg_hand_color{
		fill: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['hand_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_speedometer{
		background-color: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['button_color'] ) : '#658ba8'; ?>;
		border-color:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['buttonborder_color'] ) : '#658ba8'; ?>;
		border-width:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['buttonborder_width'] ) : '0'; ?>px;
		border-style:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['buttonborder_style'] ) : 'solid'; ?>;
		border-top-left-radius: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['buttonborder_radius_tl'] ) : '0'; ?>px;
		border-top-right-radius: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['buttonborder_radius_tr'] ) : '0'; ?>px;
		border-bottom-left-radius: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['buttonborder_radius_bl'] ) : '0'; ?>px;
		border-bottom-right-radius: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? intval( $speedometer1_css_decoded['buttonborder_radius_br'] ) : '0'; ?>px;
		color:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['buttontext_color'] ) : '#ffffff'; ?>;
		text-shadow:<?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null && $speedometer1_css_decoded['buttontext_shadow'] === 'on' ) ? intval( $speedometer1_css_decoded['buttontext_shadow_h'] ) . "px " . intval( $speedometer1_css_decoded['buttontext_shadow_v'] ) . "px " . intval( $speedometer1_css_decoded['buttontext_shadow_blur'] ) . "px " . esc_attr( $speedometer1_css_decoded['buttontext_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_speedometer:hover{
		background-color: <?php echo ( isset( $speedometer1_css_decoded ) && $speedometer1_css_decoded !== null ) ? esc_attr( $speedometer1_css_decoded['button_color'] ) : '#658ba8'; ?>;
	}

	/***************************************************** SPEEDOMETER2 *****************/
	.renee_svg_speedometer2_icon01 .grid{
		color:#000000;
		opacity:1;
		fill:#4d4d4d;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:none;
		stroke-width:2.6895113;
		stroke-linecap:butt;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_svg_speedometer2_icon01 .numbers{
		fill:#4d4d4d;
		fill-opacity:1;
		stroke:#4d4d4d;
		stroke-width:0.75901484;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-opacity:1;
	}

	.renee_svg_speedometer2_icon01 .hidden_hand{
		opacity:1;
		fill:#aa0000;
		fill-opacity:0;
		fill-rule:nonzero;
		stroke:#aa0000;
		stroke-width:2.64583325;
		stroke-linecap:round;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:0;
	}

	.renee_svg_speedometer2_icon01 .hand{
		opacity:1;
		fill:#aa0000;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#aa0000;
		stroke-width:2.64583325;
		stroke-linecap:round;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_progress_icon_speedometer2 .renee_progress_text{
		line-height: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['text_vposition'] ) : '650'; ?>%;
		color:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['text_color'] ) : '#000000'; ?>;
		text-shadow:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null && $speedometer2_css_decoded['text_shadow'] === 'on' ) ? intval( $speedometer2_css_decoded['text_shadow_h'] ) . "px " . intval( $speedometer2_css_decoded['text_shadow_v'] ) . "px " . intval( $speedometer2_css_decoded['text_shadow_blur'] ) . "px " . esc_attr( $speedometer2_css_decoded['text_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_icon_speedometer2 .svg_line_color2{
		fill: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['grid_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_speedometer2 .svg_text_color2{
		stroke: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['grid_color'] ) : '#cccccc'; ?>;
		fill: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['grid_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_speedometer2 .svg_hand_color2{
		stroke: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['hand_color'] ) : '#658ba8'; ?>;
		fill: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['hand_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_speedometer2{
		background-color: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['button_color'] ) : '#658ba8'; ?>;
		border-color:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['buttonborder_color'] ) : '#658ba8'; ?>;
		border-width:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['buttonborder_width'] ) : '0'; ?>px;
		border-style:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['buttonborder_style'] ) : 'solid'; ?>;
		border-top-left-radius: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['buttonborder_radius_tl'] ) : '0'; ?>px;
		border-top-right-radius: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['buttonborder_radius_tr'] ) : '0'; ?>px;
		border-bottom-left-radius: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['buttonborder_radius_bl'] ) : '0'; ?>px;
		border-bottom-right-radius: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? intval( $speedometer2_css_decoded['buttonborder_radius_br'] ) : '0'; ?>px;
		color:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['buttontext_color'] ) : '#ffffff'; ?>;
		text-shadow:<?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null && $speedometer2_css_decoded['buttontext_shadow'] === 'on' ) ? intval( $speedometer2_css_decoded['buttontext_shadow_h'] ) . "px " . intval( $speedometer2_css_decoded['buttontext_shadow_v'] ) . "px " . intval( $speedometer2_css_decoded['buttontext_shadow_blur'] ) . "px " . esc_attr( $speedometer2_css_decoded['buttontext_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_speedometer2:hover{
		background-color: <?php echo ( isset( $speedometer2_css_decoded ) && $speedometer2_css_decoded !== null ) ? esc_attr( $speedometer2_css_decoded['button_color'] ) : '#658ba8'; ?>;
	}

	/***************************************************** ROGAL *****************/
	.renee_svg_rogal_icon01 .bgpath,
	.renee_svg_rogal_icon01 .meter{
		opacity:1;
		fill:none;
		fill-opacity:1;
		fill-rule:nonzero;
		stroke:#ccc;
		stroke-width:15.875;
		stroke-linecap:round;
		stroke-linejoin:round;
		stroke-miterlimit:4;
		stroke-dasharray:none;
		stroke-dashoffset:0;
		stroke-opacity:1;
	}

	.renee_svg_rogal_icon01 .meter{
		stroke:#658ba8;
		stroke-dasharray:0,230;
	}

	.renee_progress_icon_rogal .renee_progress_text{
		line-height: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['text_vposition'] ) : '470'; ?>%;
		color:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['text_color'] ) : '#000000'; ?>;
		text-shadow:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null && $rogal_css_decoded['text_shadow'] === 'on' ) ? intval( $rogal_css_decoded['text_shadow_h'] ) . "px " . intval( $rogal_css_decoded['text_shadow_v'] ) . "px " . intval( $rogal_css_decoded['text_shadow_blur'] ) . "px " . esc_attr( $rogal_css_decoded['text_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_icon_rogal .svg_bg_color{
		stroke: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['bg_color'] ) : '#cccccc'; ?>;
	}

	.renee_progress_icon_rogal .svg_meter_color{
		stroke: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['meter_color'] ) : '#658ba8'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_rogal{
		background-color: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['button_color'] ) : '#658ba8'; ?>;
		border-color:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['buttonborder_color'] ) : '#658ba8'; ?>;
		border-width:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['buttonborder_width'] ) : '0'; ?>px;
		border-style:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['buttonborder_style'] ) : 'solid'; ?>;
		border-top-left-radius: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['buttonborder_radius_tl'] ) : '0'; ?>px;
		border-top-right-radius: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['buttonborder_radius_tr'] ) : '0'; ?>px;
		border-bottom-left-radius: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['buttonborder_radius_bl'] ) : '0'; ?>px;
		border-bottom-right-radius: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? intval( $rogal_css_decoded['buttonborder_radius_br'] ) : '0'; ?>px;
		color:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['buttontext_color'] ) : '#ffffff'; ?>;
		text-shadow:<?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null && $rogal_css_decoded['buttontext_shadow'] === 'on' ) ? intval( $rogal_css_decoded['buttontext_shadow_h'] ) . "px " . intval( $rogal_css_decoded['buttontext_shadow_v'] ) . "px " . intval( $rogal_css_decoded['buttontext_shadow_blur'] ) . "px " . esc_attr( $rogal_css_decoded['buttontext_shadow_color'] ) : 'none'; ?>;
	}

	.renee_progress_container input.renee_wip_gotomodel_rogal:hover{
		background-color: <?php echo ( isset( $rogal_css_decoded ) && $rogal_css_decoded !== null ) ? esc_attr( $rogal_css_decoded['button_color'] ) : '#658ba8'; ?>;
	}

</style>

<?php
	defined( 'ABSPATH' ) or die();

	function renee_validate_hex_color( $value ){
		if( preg_match( "|^#([A-Fa-f0-9]{3}){1,2}$|", $value ) ){
			return $value;
		}
		else{
			die( "invalid color hex value $value" );
		}
	}

	if( isset( $_POST['renee_wip_columns_desktop'] ) ){
		// CREATE TABLE IF DOS NOT EXIST
		$table_name = $wpdb->prefix . 'renee_wip_settings';
		$charset_collate = $wpdb->get_charset_collate();
		$create_table = "CREATE TABLE IF NOT EXISTS $table_name (
		id BIGINT(20) NOT NULL AUTO_INCREMENT,
		time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		section TEXT NOT NULL,
		object MEDIUMTEXT NOT NULL,
		PRIMARY KEY  ( id )
		) $charset_collate;";
		dbDelta( $create_table );


		$general_settings_object = '{"columns_desktop":' . intval( $_POST["renee_wip_columns_desktop"] ) . ', ' .
															'"columns_laptop":' . intval( $_POST["renee_wip_columns_laptop"] ) . ', ' .
															'"columns_tablet":' . intval( $_POST["renee_wip_columns_tablet"] ) . ', ' .
															'"columns_mobile":' . intval( $_POST["renee_wip_columns_mobile"] ) . ', ' .
															'"default_gauge":"' . sanitize_text_field( $_POST["default_gauge"] ) .
															'"}';
		$circle_settings_object = '{"anim_time":' . intval( $_POST["circle_anim_time"] ) .
															', "bg_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_bg_color"] ) ) .
															'", "meter_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_meter_color"] ) ) .
															'", "button_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_button_color"] ) ) .
															'", "buttonborder_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_buttonborder_color"] ) ) .
															'", "buttonborder_width":' . intval( $_POST["circle_buttonborder_width"] ) .
															', "buttonborder_style":"' . sanitize_text_field( $_POST["circle_buttonborder_style"] ) .
															'", "buttonborder_radius_tl":' . intval( $_POST["circle_buttonborder_radius_tl"] ) .
															', "buttonborder_radius_tr":' . intval( $_POST["circle_buttonborder_radius_tr"] ) .
															', "buttonborder_radius_bl":' . intval( $_POST["circle_buttonborder_radius_bl"] ) .
															', "buttonborder_radius_br":' . intval( $_POST["circle_buttonborder_radius_br"] ) .
															', "buttontext_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_buttontext_color"] ) ) .
															'", "buttontext_size":' . intval( $_POST["circle_buttontext_size"] ) .
															', "buttontext_shadow":"' . sanitize_text_field( $_POST["circle_buttontext_shadow"] ) .
															'", "buttontext_shadow_h":' . intval( $_POST["circle_buttontext_shadow_h"] ) .
															', "buttontext_shadow_v":' . intval( $_POST["circle_buttontext_shadow_v"] ) .
															', "buttontext_shadow_blur":' . intval( $_POST["circle_buttontext_shadow_blur"] ) .
															', "buttontext_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_buttontext_shadow_color"] ) ) .
															'", "text_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_text_color"] ) ) .
															'", "text_size":' . intval( $_POST["circle_text_size"] ) .
															', "text_vposition":' . intval( $_POST["circle_text_vposition"] ) .
															', "text_shadow":"' . sanitize_text_field( $_POST["circle_text_shadow"] ) .
															'", "text_shadow_h":' . intval( $_POST["circle_text_shadow_h"] ) .
															', "text_shadow_v":' . intval( $_POST["circle_text_shadow_v"] ) .
															', "text_shadow_blur":' . intval( $_POST["circle_text_shadow_blur"] ) .
															', "text_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["circle_text_shadow_color"] ) ) .
															'"}';

		$battery_settings_object = '{"anim_time":' . intval( $_POST["battery_anim_time"] ) .
															', "fill_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_fill_color"] ) ) .
															'", "edge_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_edge_color"] ) ) .
															'", "meter_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_meter_color"] ) ) .
															'", "button_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_button_color"] ) ) .
															'", "buttonborder_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_buttonborder_color"] ) ) .
															'", "buttonborder_width":' . intval( $_POST["battery_buttonborder_width"] ) .
															', "buttonborder_style":"' . sanitize_text_field( $_POST["battery_buttonborder_style"] ) .
															'", "buttonborder_radius_tl":' . intval( $_POST["battery_buttonborder_radius_tl"] ) .
															', "buttonborder_radius_tr":' . intval( $_POST["battery_buttonborder_radius_tr"] ) .
															', "buttonborder_radius_bl":' . intval( $_POST["battery_buttonborder_radius_bl"] ) .
															', "buttonborder_radius_br":' . intval( $_POST["battery_buttonborder_radius_br"] ) .
															', "buttontext_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_buttontext_color"] ) ) .
															'", "buttontext_size":' . intval( $_POST["battery_buttontext_size"] ) .
															', "buttontext_shadow":"' . sanitize_text_field( $_POST["battery_buttontext_shadow"] ) .
															'", "buttontext_shadow_h":' . intval( $_POST["battery_buttontext_shadow_h"] ) .
															', "buttontext_shadow_v":' . intval( $_POST["battery_buttontext_shadow_v"] ) .
															', "buttontext_shadow_blur":' . intval( $_POST["battery_buttontext_shadow_blur"] ) .
															', "buttontext_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_buttontext_shadow_color"] ) ) .
															'", "text_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_text_color"] ) ) .
															'", "text_size":' . intval( $_POST["battery_text_size"] ) .
															', "text_vposition":' . intval( $_POST["battery_text_vposition"] ) .
															', "text_shadow":"' . sanitize_text_field( $_POST["battery_text_shadow"] ) .
															'", "text_shadow_h":' . intval( $_POST["battery_text_shadow_h"] ) .
															', "text_shadow_v":' . intval( $_POST["battery_text_shadow_v"] ) .
															', "text_shadow_blur":' . intval( $_POST["battery_text_shadow_blur"] ) .
															', "text_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["battery_text_shadow_color"] ) ) .
															'"}';

		$speedometer1_settings_object = '{"anim_time":' . intval( $_POST["speedometer1_anim_time"] ) .
															', "bg_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_bg_color"] ) ) .
															'", "grid_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_grid_color"] ) ) .
															'", "meter_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_meter_color"] ) ) .
															'", "hand_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_hand_color"] ) ) .
															'", "button_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_button_color"] ) ) .
															'", "buttonborder_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_buttonborder_color"] ) ) .
															'", "buttonborder_width":' . intval( $_POST["speedometer1_buttonborder_width"] ) .
															', "buttonborder_style":"' . sanitize_text_field( $_POST["speedometer1_buttonborder_style"] ) .
															'", "buttonborder_radius_tl":' . intval( $_POST["speedometer1_buttonborder_radius_tl"] ) .
															', "buttonborder_radius_tr":' . intval( $_POST["speedometer1_buttonborder_radius_tr"] ) .
															', "buttonborder_radius_bl":' . intval( $_POST["speedometer1_buttonborder_radius_bl"] ) .
															', "buttonborder_radius_br":' . intval( $_POST["speedometer1_buttonborder_radius_br"] ) .
															', "buttontext_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_buttontext_color"] ) ) .
															'", "buttontext_size":' . intval( $_POST["speedometer1_buttontext_size"] ) .
															', "buttontext_shadow":"' . sanitize_text_field( $_POST["speedometer1_buttontext_shadow"] ) .
															'", "buttontext_shadow_h":' . intval( $_POST["speedometer1_buttontext_shadow_h"] ) .
															', "buttontext_shadow_v":' . intval( $_POST["speedometer1_buttontext_shadow_v"] ) .
															', "buttontext_shadow_blur":' . intval( $_POST["speedometer1_buttontext_shadow_blur"] ) .
															', "buttontext_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_buttontext_shadow_color"] ) ) .
															'", "text_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_text_color"] ) ) .
															'", "text_size":' . intval( $_POST["speedometer1_text_size"] ) .
															', "text_vposition":' . intval( $_POST["speedometer1_text_vposition"] ) .
															', "text_shadow":"' . sanitize_text_field( $_POST["speedometer1_text_shadow"] ) .
															'", "text_shadow_h":' . intval( $_POST["speedometer1_text_shadow_h"] ) .
															', "text_shadow_v":' . intval( $_POST["speedometer1_text_shadow_v"] ) .
															', "text_shadow_blur":' . intval( $_POST["speedometer1_text_shadow_blur"] ) .
															', "text_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer1_text_shadow_color"] ) ) .
															'"}';

		$speedometer2_settings_object = '{"anim_time":' . intval( $_POST["speedometer2_anim_time"] ) .
															', "grid_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_grid_color"] ) ) .
															'", "hand_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_hand_color"] ) ) .
															'", "button_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_button_color"] ) ) .
															'", "buttonborder_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_buttonborder_color"] ) ) .
															'", "buttonborder_width":' . intval( $_POST["speedometer2_buttonborder_width"] ) .
															', "buttonborder_style":"' . sanitize_text_field( $_POST["speedometer2_buttonborder_style"] ) .
															'", "buttonborder_radius_tl":' . intval( $_POST["speedometer2_buttonborder_radius_tl"] ) .
															', "buttonborder_radius_tr":' . intval( $_POST["speedometer2_buttonborder_radius_tr"] ) .
															', "buttonborder_radius_bl":' . intval( $_POST["speedometer2_buttonborder_radius_bl"] ) .
															', "buttonborder_radius_br":' . intval( $_POST["speedometer2_buttonborder_radius_br"] ) .
															', "buttontext_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_buttontext_color"] ) ) .
															'", "buttontext_size":' . intval( $_POST["speedometer2_buttontext_size"] ) .
															', "buttontext_shadow":"' . sanitize_text_field( $_POST["speedometer2_buttontext_shadow"] ) .
															'", "buttontext_shadow_h":' . intval( $_POST["speedometer2_buttontext_shadow_h"] ) .
															', "buttontext_shadow_v":' . intval( $_POST["speedometer2_buttontext_shadow_v"] ) .
															', "buttontext_shadow_blur":' . intval( $_POST["speedometer2_buttontext_shadow_blur"] ) .
															', "buttontext_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_buttontext_shadow_color"] ) ) .
															'", "text_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_text_color"] ) ) .
															'", "text_size":' . intval( $_POST["speedometer2_text_size"] ) .
															', "text_vposition":' . intval( $_POST["speedometer2_text_vposition"] ) .
															', "text_shadow":"' . sanitize_text_field( $_POST["speedometer2_text_shadow"] ) .
															'", "text_shadow_h":' . intval( $_POST["speedometer2_text_shadow_h"] ) .
															', "text_shadow_v":' . intval( $_POST["speedometer2_text_shadow_v"] ) .
															', "text_shadow_blur":' . intval( $_POST["speedometer2_text_shadow_blur"] ) .
															', "text_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["speedometer2_text_shadow_color"] ) ) .
															'"}';

		$rogal_settings_object = '{"anim_time":' . intval( $_POST["rogal_anim_time"] ) .
															', "bg_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_bg_color"] ) ) .
															'", "meter_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_meter_color"] ) ) .
															'", "button_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_button_color"] ) ) .
															'", "buttonborder_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_buttonborder_color"] ) ) .
															'", "buttonborder_width":' . intval( $_POST["rogal_buttonborder_width"] ) .
															', "buttonborder_style":"' . sanitize_text_field( $_POST["rogal_buttonborder_style"] ) .
															'", "buttonborder_radius_tl":' . intval( $_POST["rogal_buttonborder_radius_tl"] ) .
															', "buttonborder_radius_tr":' . intval( $_POST["rogal_buttonborder_radius_tr"] ) .
															', "buttonborder_radius_bl":' . intval( $_POST["rogal_buttonborder_radius_bl"] ) .
															', "buttonborder_radius_br":' . intval( $_POST["rogal_buttonborder_radius_br"] ) .
															', "buttontext_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_buttontext_color"] ) ) .
															'", "buttontext_size":' . intval( $_POST["rogal_buttontext_size"] ) .
															', "buttontext_shadow":"' . sanitize_text_field( $_POST["rogal_buttontext_shadow"] ) .
															'", "buttontext_shadow_h":' . intval( $_POST["rogal_buttontext_shadow_h"] ) .
															', "buttontext_shadow_v":' . intval( $_POST["rogal_buttontext_shadow_v"] ) .
															', "buttontext_shadow_blur":' . intval( $_POST["rogal_buttontext_shadow_blur"] ) .
															', "buttontext_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_buttontext_shadow_color"] ) ) .
															'", "text_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_text_color"] ) ) .
															'", "text_size":' . intval( $_POST["rogal_text_size"] ) .
															', "text_vposition":' . intval( $_POST["rogal_text_vposition"] ) .
															', "text_shadow":"' . sanitize_text_field( $_POST["rogal_text_shadow"] ) .
															'", "text_shadow_h":' . intval( $_POST["rogal_text_shadow_h"] ) .
															', "text_shadow_v":' . intval( $_POST["rogal_text_shadow_v"] ) .
															', "text_shadow_blur":' . intval( $_POST["rogal_text_shadow_blur"] ) .
															', "text_shadow_color":"' . sanitize_hex_color( renee_validate_hex_color( $_POST["rogal_text_shadow_color"] ) ) .
															'"}';

		$sections_array = array(
			'general',
			'circle',
			'battery',
			'speedometer',
			'speedometer2',
			'rogal'
		);
		$settings_array = array(
			$general_settings_object,
			$circle_settings_object,
			$battery_settings_object,
			$speedometer1_settings_object,
			$speedometer2_settings_object,
			$rogal_settings_object
		);

		for($i = 0; $i < count( $sections_array ); $i++ ){
			$does_exist = $wpdb->get_row("SELECT * FROM $table_name WHERE section='$sections_array[$i]'", ARRAY_N);
			if( $does_exist === NULL ){
				$wpdb->insert(
					$table_name,
					array(
						'section' => $sections_array[$i],
						'object' => $settings_array[$i]
					),
					array(
						'%s',
						'%s'
					)
				);
			}
			else{
				$wpdb->update(
					$table_name,
					array(
						'object' => $settings_array[$i]
					),
					array( 'section' => $sections_array[$i] ),
					array(
						'%s'
					),
					array( '%s' )
				);
			}
		}
		echo 'OK';
	}
?>

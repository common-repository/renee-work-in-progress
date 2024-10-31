<?php
defined('ABSPATH') or die();

if( isset( $_POST['gauge_list'] ) && sanitize_text_field( $_POST['gauge_list'] ) === '1' ){
	$table = $wpdb->prefix . 'renee_wip_settings';
	$general_settings = $wpdb->get_var( "SELECT object FROM $table WHERE section='general'" );
	$general_decoded = json_decode( $general_settings, true );
	$def_gauge = ( isset( $general_decoded ) && $general_decoded !== null ) ? $general_decoded['default_gauge'] : 'circle';

	echo esc_attr( $def_gauge );
}

?>

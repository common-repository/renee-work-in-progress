<?php
defined('ABSPATH') or die();

	if ( isset ( $_FILES["renee_wip_upload"] ) ){
		$countfiles = count( $_FILES['renee_wip_upload']['name'] );
		for($i=0;$i<$countfiles;$i++){
			$filename = sanitize_text_field( $_FILES['renee_wip_upload']['name'][$i] );
			$tmp_name = sanitize_text_field( $_FILES['renee_wip_upload']['tmp_name'][$i] );
			$html2php = str_replace( ".html", ".php", $filename );
			move_uploaded_file( $tmp_name, $uploads_basedir . '/solid/models/' . $html2php );
			$filename = $uploads_basedir . '/solid/models/' . $html2php;
		}
	}

?>

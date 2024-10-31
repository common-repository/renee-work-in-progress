<?php
defined('ABSPATH') or die();

	if (isset ( $_POST["get_files"] ) && sanitize_text_field( $_POST["get_files"] ) === '1' && isset( $_POST['gaugetype'] ) && isset( $_POST['shortcode'] ) ){

		$gaugetype = ( isset( $_POST['gaugetype'] ) ) ? sanitize_text_field( $_POST['gaugetype'] ) : 'circle';
		if( isset( $_POST['shortcode'] ) && $_POST['shortcode'] !== 'undefined' && $_POST['shortcode'] !== '0' ){
			$shortcode =  sanitize_text_field( $_POST['shortcode'] );
			$first_shc = explode("file='", $shortcode);
			$second_shc = explode('.php', $first_shc[1]);
		}
		else{
			$second_shc = 'circle';
		}

		$dir = $uploads_basedir . '/solid/models/';
		$filelist = scandir( $dir );
		//echo 'Filelist:';
		//var_dump($filelist);
		$countfiles = count( $filelist );
		if( $countfiles > 0 ){
			echo '[';
			echo '{ "value": "empty", "label": "..." }';
			for( $i=0;$i<$countfiles;$i++ ){
				$file = $filelist[$i];
				if( strpos( $file, '.php' ) != false ){

					list( $f2, $s2 ) = explode( '.php', $file );
					$name = $f2;

					$selected = ( $name === $second_shc[0] ) ? 'selected' : '';

					if($name != 'index'){
						echo ( $i > 2 ) ? ',' : '';
						echo '{ "value": "[renee_wip file=\'' . $file . '\' gauge=\'' . $gaugetype . '\']", "label": "' . $name . '", "selected": "' . $selected . '" }';
					}
				}
			}
			echo ' ] ';
		}
		else{
			echo '[';
			echo '{ "value": "empty", "label": "..." }';
			echo ' ] ';
		}
	}
?>

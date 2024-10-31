<?php
	defined('ABSPATH') or die();

	if ( isset ( $_POST["single_del_file"] ) ){
		$single_del_file = sanitize_text_field( $_POST["single_del_file"] );
		$dir = $uploads_basedir . '/solid/models/';
		if ( file_exists( realpath( $dir . $single_del_file ) ) ){
			unlink( realpath( $dir . $single_del_file ) );
			if ( !file_exists( realpath( $dir . $single_del_file ) ) ){
				echo 'file ' . $single_del_file . 'deleted.';
			}
			else{ echo 'something went wrong with single deletion of ' . $single_del_file; }
		}
		else{ echo 'nothing to delete...'; }
	}

	if ( isset ( $_POST["delete_files"] ) ){
		$dir = $uploads_basedir . '/solid/models/';
		$filescount = count( $_POST['delete_files'] );
		for( $i = 0; $i < $filescount; $i++){
			$del_file = sanitize_text_field( $_POST["delete_files"][$i] );
			unlink( realpath( $dir . $del_file ) );
			if ( !file_exists( realpath( $dir . $del_file ) ) ){
				echo 'file ' . $del_file . 'deleted';
			}
			else{ echo 'something went wrong with deletion of ' . $del_file; }
		}
	}

?>

<?php
defined('ABSPATH') or die();

if( isset( $_POST['snapshot_base64_url'] ) && isset( $_POST['snapshot_target_file'] ) ){
	$file = sanitize_text_field( $_POST['snapshot_target_file'] );
	$base64_url = sanitize_text_field( $_POST['snapshot_base64_url'] );
	$target_file = $uploads_basedir . '/solid/snapshots/' . $file;
	file_put_contents( $target_file . '.png', file_get_contents( $base64_url ) );
	$image = imagecreatefrompng( $target_file . '.png' );

	//validation
	imagepng( $image, $target_file . '.png' );
	$img_data = getimagesize( $target_file . '.png' );
	if( !$img_data[0] && !$img_data[1] && !$img_data[0] ){
		unlink( $target_file . '.png' );
		die();
	}
	else{
		unlink( $target_file . '.png' );
	}
	
	$bg = imagecreatetruecolor( imagesx( $image ), imagesy( $image ) );

	imagefill( $bg, 0, 0, imagecolorallocate( $bg, 255, 255, 255 ) );
	imagealphablending($bg, TRUE);
	imagecopy( $bg, $image, 0, 0, 0, 0, imagesx( $image ), imagesy( $image ) );
	imagedestroy( $image );
	$quality = 70; // 0 = worst / smaller file, 100 = better / bigger file

	imagejpeg( $bg, $target_file . ".jpg", $quality );
	$image2 = imagecreatefromjpeg( $_POST['snapshot_target_file'] . '.jpg' );
	$cropped = imagecropauto( $image2,IMG_CROP_WHITE );
	imagejpeg( $cropped, $target_file . ".jpg", $quality );
	imagedestroy( $bg );
	unlink( $target_file . '.png' );
	echo '<img src="' . $target_file . '.jpg" />';
}

?>

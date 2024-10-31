<?php
defined('ABSPATH') or die();

	if (isset ( $_POST["get_del_files"] ) && sanitize_text_field( $_POST["get_del_files"] ) === '1' ){
		$dir = $uploads_basedir . '/solid/models/';
		$filelist = scandir( $dir );
		//echo 'Filelist:';
		//var_dump($filelist);
		$countfiles = count( $filelist );
		//var_dump($countfiles);
		echo '[ ';
		$switcher = 0;
		for( $i=0;$i<$countfiles;$i++ ){
			$file = $filelist[$i];
			if( strpos( $file, '.php' ) != false ){
				list( $f, $s ) = explode('.php', $file );
				$name = $f;
				if($name != 'index'){
					if( $switcher == 1 ){
						echo ', ';
					}
					echo '
					{ "file":"' . $file . '", "name":"' . $name . '" }
					';
					$switcher = 1;
				}
			}
		}
		echo ' ]';
	}
?>

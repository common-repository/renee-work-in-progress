<?php
/*
Plugin Name: 3D Work In Progress
Plugin URI: https://reneecussack.com
Description: A Gutenberg editor block to display work progress of a SolidWorks project with customizable and animated meters, 3D model viewer based on e-drawings html file, and per project chat to discuss the work online with your clients.
Version: 1.0.3
Author: ReneeCussack
Text Domain: renee-work-in-progress
Domain Path: /languages
License: GPLv2
*/
defined('ABSPATH') or die();
$abspath = str_replace ( '\\' , '/' , ABSPATH );
require_once( $abspath . 'wp-admin/includes/upgrade.php' );

/////////////// COPY ASSETS AND SETTINGS ON ACTIVATION ////////////////////////
function renee_wip_copy_folder(){

	$uploads_paths = wp_get_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];

	global $wpdb;

		$dir_list = array( "solid" );
		$dirs_count = count($dir_list);
		for($i=0; $i<$dirs_count; $i++){
			if ( !file_exists( $uploads_basedir . '/' . $dir_list[$i] ) ){
				mkdir( $uploads_basedir . '/' . $dir_list[$i], 0755, true );
			}
		}
		// CREATE SUBDIRECTORIES
		$dir_list2 = array( "snapshots", "models" );
		$dirs_count2 = count($dir_list2);
		for($i2=0; $i2<$dirs_count2; $i2++){
			if ( !file_exists( $uploads_basedir . '/solid/' . $dir_list2[$i2] ) ){
				mkdir(	$uploads_basedir . '/solid/' . $dir_list2[$i2], 0755, true);
			}
		}

		//COPY FILES TO UPLOAD FOLDER
		$files_list = array( ".htaccess", "index.php", "camera.mp3", "click.mp3", "tick.png", "spinner.gif" );
		$files_count = count($files_list);
		for($i3=0; $i3<$files_count; $i3++){
			if ( !file_exists( $uploads_basedir . '/solid/' . $files_list[$i3] ) ){
				copy( plugin_dir_path( __FILE__ ) . '/solid/' . $files_list[$i3] , $uploads_basedir . '/solid/' . $files_list[$i3] );
			}
		}
		//COPY FILES TO SNAPSHOTS FOLDER
		$files_list2 = array( ".htaccess", "index.php" );
		$files_count2 = count($files_list2);
		for($i4=0; $i4<$files_count2; $i4++){
			if ( !file_exists( $uploads_basedir . '/solid/snapshots/' . $files_list2[$i4] ) ){
				copy( plugin_dir_path( __FILE__ ) . '/solid/snapshots/' . $files_list2[$i4] , $uploads_basedir . '/solid/snapshots/' . $files_list2[$i4] );
			}
		}
		//COPY FILES TO MODELS FOLDER
		$files_list3 = array( ".htaccess", "index.php" );
		$files_count3 = count($files_list3);
		for($i5=0; $i5<$files_count3; $i5++){
			if ( !file_exists( $uploads_basedir . '/solid/models/' . $files_list3[$i5] ) ){
				copy( plugin_dir_path( __FILE__ ) . '/solid/models/' . $files_list3[$i5] , $uploads_basedir . '/solid/models/' . $files_list3[$i5] );
			}
		}

		//COPY languages
		$files_list4 = array( "renee-work-in-progress-pl_PL.mo", "renee-work-in-progress-pl_PL.po" );
		$files_count4 = count($files_list4);
		for($i6=0; $i6<$files_count4; $i6++){
			copy( plugin_dir_path( __FILE__ ) . '/languages/' . $files_list4[$i6] , WP_CONTENT_DIR . '/languages/plugins/' . $files_list4[$i6] );
		}

		// CREATE INITIAL Settings
		$table_n = $wpdb->prefix . 'renee_wip_settings';
		$charset_collate = $wpdb->get_charset_collate();
		$create_t = "CREATE TABLE IF NOT EXISTS $table_n (
		id BIGINT(20) NOT NULL AUTO_INCREMENT,
		time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		section TEXT NOT NULL,
		object MEDIUMTEXT NOT NULL,
		PRIMARY KEY  ( id )
	) $charset_collate;";
		dbDelta( $create_t );


		//INSERT INITIAL SETTINGS
		$fill = 'INSERT INTO ' . $table_n . ' (id, time, section, object) VALUES
(1, "2020-07-30 13:19:10", "general", "{\"columns_desktop\":4, \"columns_laptop\":3, \"columns_tablet\":2, \"columns_mobile\":1, \"default_gauge\":\"circle\"}"),
(2, "2020-07-30 13:19:10", "circle", "{\"anim_time\":4, \"bg_color\":\"#cccccc\", \"meter_color\":\"#658ba8\", \"button_color\":\"#658ba8\", \"buttonborder_color\":\"#658ba8\", \"buttonborder_width\":0, \"buttonborder_style\":\"dotted\", \"buttonborder_radius_tl\":0, \"buttonborder_radius_tr\":0, \"buttonborder_radius_bl\":0, \"buttonborder_radius_br\":0, \"buttontext_color\":\"#ffffff\", \"buttontext_size\":80, \"buttontext_shadow\":\"\", \"buttontext_shadow_h\":0, \"buttontext_shadow_v\":0, \"buttontext_shadow_blur\":0, \"buttontext_shadow_color\":\"#000000\", \"text_color\":\"#000000\", \"text_size\":95, \"text_vposition\":470, \"text_shadow\":\"\", \"text_shadow_h\":0, \"text_shadow_v\":0, \"text_shadow_blur\":0, \"text_shadow_color\":\"#ffffff\"}"),
(3, "2020-07-30 13:19:10", "battery", "{\"anim_time\":4, \"fill_color\":\"#ffffff\", \"edge_color\":\"#cccccc\", \"meter_color\":\"#658ba8\", \"button_color\":\"#658ba8\", \"buttonborder_color\":\"#658ba8\", \"buttonborder_width\":0, \"buttonborder_style\":\"dotted\", \"buttonborder_radius_tl\":0, \"buttonborder_radius_tr\":0, \"buttonborder_radius_bl\":0, \"buttonborder_radius_br\":0, \"buttontext_color\":\"#ffffff\", \"buttontext_size\":80, \"buttontext_shadow\":\"\", \"buttontext_shadow_h\":0, \"buttontext_shadow_v\":0, \"buttontext_shadow_blur\":0, \"buttontext_shadow_color\":\"#000000\", \"text_color\":\"#000000\", \"text_size\":95, \"text_vposition\":200, \"text_shadow\":\"\", \"text_shadow_h\":0, \"text_shadow_v\":0, \"text_shadow_blur\":0, \"text_shadow_color\":\"#ffffff\"}"),
(4, "2020-07-30 13:19:10", "speedometer", "{\"anim_time\":4, \"bg_color\":\"#cccccc\", \"grid_color\":\"#ffffff\", \"meter_color\":\"#658ba8\", \"hand_color\":\"#cccccc\", \"button_color\":\"#658ba8\", \"buttonborder_color\":\"#658ba8\", \"buttonborder_width\":0, \"buttonborder_style\":\"dotted\", \"buttonborder_radius_tl\":0, \"buttonborder_radius_tr\":0, \"buttonborder_radius_bl\":0, \"buttonborder_radius_br\":0, \"buttontext_color\":\"#ffffff\", \"buttontext_size\":80, \"buttontext_shadow\":\"\", \"buttontext_shadow_h\":0, \"buttontext_shadow_v\":0, \"buttontext_shadow_blur\":0, \"buttontext_shadow_color\":\"#000000\", \"text_color\":\"#000000\", \"text_size\":95, \"text_vposition\":470, \"text_shadow\":\"\", \"text_shadow_h\":0, \"text_shadow_v\":0, \"text_shadow_blur\":0, \"text_shadow_color\":\"#ffffff\"}"),
(5, "2020-07-30 13:19:10", "speedometer2", "{\"anim_time\":4, \"grid_color\":\"#cccccc\", \"hand_color\":\"#658ba8\", \"button_color\":\"#658ba8\", \"buttonborder_color\":\"#658ba8\", \"buttonborder_width\":0, \"buttonborder_style\":\"dotted\", \"buttonborder_radius_tl\":0, \"buttonborder_radius_tr\":0, \"buttonborder_radius_bl\":0, \"buttonborder_radius_br\":0, \"buttontext_color\":\"#ffffff\", \"buttontext_size\":80, \"buttontext_shadow\":\"\", \"buttontext_shadow_h\":0, \"buttontext_shadow_v\":0, \"buttontext_shadow_blur\":0, \"buttontext_shadow_color\":\"#000000\", \"text_color\":\"#000000\", \"text_size\":95, \"text_vposition\":650, \"text_shadow\":\"\", \"text_shadow_h\":0, \"text_shadow_v\":0, \"text_shadow_blur\":0, \"text_shadow_color\":\"#ffffff\"}"),
(6, "2020-07-30 13:19:10", "rogal", "{\"anim_time\":4, \"bg_color\":\"#cccccc\", \"meter_color\":\"#658ba8\", \"button_color\":\"#658ba8\", \"buttonborder_color\":\"#658ba8\", \"buttonborder_width\":0, \"buttonborder_style\":\"dotted\", \"buttonborder_radius_tl\":0, \"buttonborder_radius_tr\":0, \"buttonborder_radius_bl\":0, \"buttonborder_radius_br\":0, \"buttontext_color\":\"#ffffff\", \"buttontext_size\":80, \"buttontext_shadow\":\"\", \"buttontext_shadow_h\":0, \"buttontext_shadow_v\":0, \"buttontext_shadow_blur\":0, \"buttontext_shadow_color\":\"#000000\", \"text_color\":\"#000000\", \"text_size\":95, \"text_vposition\":470, \"text_shadow\":\"\", \"text_shadow_h\":0, \"text_shadow_v\":0, \"text_shadow_blur\":0, \"text_shadow_color\":\"#ffffff\"}");
';
	$isempty = $wpdb->get_row( "SELECT * FROM $table_n WHERE section = 'general'" , ARRAY_A );
	if( $isempty === NULL ){
		$wpdb->query( $fill );
	}

	//ADD VIEWER PAGE
	if ( !$post = get_page_by_path( '3d-wip-viewer', OBJECT, 'page' ) ){
		$renee_wip_viewer_page = array(
		  'post_title'    => '3D Work In Progress Viewer',
		  'post_content'  => 'Do not remove this page, it is necessary for 3D Work In Progress to work properly.',
			'post_name'    => '3d-wip-viewer',
		  'post_status'   => 'publish',
		  'post_author'   => 1,
		  'post_type' => 'page'
		);
		wp_insert_post( $renee_wip_viewer_page );
	}


	register_uninstall_hook( __FILE__, 'renee_wip_remove_folder' );

}
register_activation_hook( __FILE__, 'renee_wip_copy_folder' );

//////////////////////// REMOVE ASSETS AND SETTINGS ON UNINSTALL //////////////
function renee_wip_remove_folder(){
	$uploads_paths = wp_get_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	//REMOVE FILES FROM SNAPSHOTS
	$filelist2 = scandir( $uploads_basedir . '/solid/snapshots/' );
	$countfiles2 = count( $filelist2 );
	for( $i = 0; $i < $countfiles2; $i++ ){
		if ( file_exists( $uploads_basedir . '/solid/snapshots/' . $filelist2[$i] ) && $filelist2[$i] != "." && $filelist2[$i] != ".." ){
			unlink( $uploads_basedir . '/solid/snapshots/' . $filelist2[$i] );
		}
	}
	//REMOVE FILES FROM MODELS
	$filelist3 = scandir( $uploads_basedir . '/solid/models/' );
	$countfiles3 = count( $filelist3 );
	for( $i = 0; $i < $countfiles3; $i++ ){
		if ( file_exists( $uploads_basedir . '/solid/models/' . $filelist3[$i] ) && $filelist3[$i] != "." && $filelist3[$i] != ".." ){
			unlink( $uploads_basedir . '/solid/models/' . $filelist3[$i] );
		}
	}
	// REMOVE DIRECTORY SNAPSHOTS AND MODELS
	$dir_list = array( "snapshots", "models" );
	$dirs_count = count($dir_list);
	for( $i = 0; $i < $dirs_count; $i++ ){
		if ( file_exists($uploads_basedir . '/solid/' . $dir_list[$i] ) ){
			rmdir( $uploads_basedir . '/solid/' . $dir_list[$i] );
		}
	}
	//REMOVE FILES FROM SOLID
	$filelist = scandir( $uploads_basedir . '/solid/' );
	$countfiles = count( $filelist );
	for( $i = 0; $i < $countfiles; $i++ ){
		if ( file_exists( $uploads_basedir . '/solid/' . $filelist[$i] ) && $filelist[$i] != "." && $filelist[$i] != ".." ){
			unlink( $uploads_basedir . '/solid/' . $filelist[$i] );
		}
	}
	// REMOVE DIRECTORY SOLID
	$dir_list3 = array( "solid" );
	$dirs_count3 = count($dir_list3);
	for( $i = 0; $i < $dirs_count3; $i++ ){
		if ( file_exists($uploads_basedir . '/' . $dir_list3[$i] ) ){
			rmdir( $uploads_basedir . '/' . $dir_list3[$i] );
		}
	}
	// DELETE TABLES
	global $wpdb;
    $sql = 'SHOW TABLES LIKE "' . $wpdb->prefix . 'renee_wip\_%";';
    $results = $wpdb->get_results($sql);
	foreach( $results as $result ){
		foreach( $result as $r ){
			$sql2 = 'DROP TABLE ' . $r . ';';
			$wpdb->query($sql2);
		}
	}
	// DELETE VIEWER PAGE
	if ( $post = get_page_by_path( '3d-wip-viewer', OBJECT, 'page' ) ){
    $id = $post->ID;
		wp_delete_post( $id, true );
	}
}

//////////////////////////////////// ADMIN FUNCTIONS //////////////////////////
function renee_wip_admin_assets(){
	// WIP BLOCK FUNCTIONS
	global $wpdb;
	$required_js_files = array(
		'jquery',
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-components',
		'wp-editor',
	);

	wp_register_script( 'renee-wip-block-js', plugins_url( 'assets/renee_wip.js', __FILE__ ), $required_js_files, '1.0.20', true );
	wp_enqueue_script( 'renee-wip-block-js' );

	wp_localize_script( 'renee-wip-block-js',
										'renee_wip_ajax_object',
										array(
											'ajax_url' => admin_url( 'admin-ajax.php' ),
											'del_value' => 'something',
											'del_mult_value' => [],
											'gauge_type_value' => 1,
											'shortcode_value' => 'something',
											'renee_wip_upload_value' => 'test'
										)
									);

	wp_set_script_translations( 'renee-wip-block-js', 'renee-work-in-progress', plugin_dir_path( __FILE__ ) . 'languages' );

	wp_register_style(
        'renee-wip-block-editor-css',
        plugins_url( 'assets/renee-wip-editor.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/renee-wip-editor.css' )
  );
	wp_enqueue_style('renee-wip-block-editor-css');

	register_block_type('renee-wip/g-block', array(
	  'editor_script' => 'renee-wip-block-js',
	  'editor_style'  => 'renee-wip-block-editor-css',
	));

	// SETTINS FUNCTIONS
	wp_register_style(
    'renee-wip-settings-style',
    plugins_url( 'assets/renee-wip-settings.css', __FILE__ ),
    array(),
    '1.0.1'
  );
	wp_enqueue_style('renee-wip-settings-style');

	wp_add_inline_style( 'renee-wip-settings-style', require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_settings_css.php' ) );

	wp_register_script(
        'renee-wip-admin-js',
        plugins_url( 'assets/renee_wip_admin.js', __FILE__ ),
        array('jquery'),
        '1.0.0'
  );
	wp_enqueue_script('renee-wip-admin-js');
	wp_localize_script( 'renee-wip-admin-js',
										'renee_wip_admin_ajax_object',
										array(
											'ajax_url' => admin_url( 'admin-ajax.php' )
										)
									);

	//wp_enqueue_style('renee-wip-fontawesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', array(), '1.0.0', true);
}
add_action( 'admin_enqueue_scripts', 'renee_wip_admin_assets' );

function renee_wip_embed_fontawesome_admin(){
	echo '<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>';
}
add_action('admin_head', 'renee_wip_embed_fontawesome_admin');

function renee_wip_settings_page(){
	global $wpdb;
	$uploads_paths = wp_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	$uploads_baseurl = $uploads_paths['baseurl'];
	$plugindirpath = plugin_dir_path( __FILE__ );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_settings_page.php' );
}

function renee_wip_settings_submenu() {
	add_submenu_page(
				'options-general.php',
				__('3D WIP Settings', 'renee-work-in-progress'),
				__('3D WIP Settings', 'renee-work-in-progress'),
				'administrator',
				'wip_options',
				'renee_wip_settings_page' );
}
add_action("admin_menu", "renee_wip_settings_submenu");

function renee_wip_settings_link ( $links ){
	$links = array_merge( array(
		'<a href="options-general.php?page=wip_options">' . esc_html__('Settings', 'renee-work-in-progress') . '</a>'
	), $links );
	return $links;
}
$plugin_file = plugin_basename(__FILE__);
add_action( "plugin_action_links_$plugin_file", 'renee_wip_settings_link' );

////////////////////////////////// ADMIN AJAX //////////////////////////
function renee_wip_block_ajax() {
	global $wpdb;
	$uploads_paths = wp_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_delete_files.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_get_file_list.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_get_delete_list.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_block_default_gauge.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_html_upload.php' );
	wp_die();
}
add_action( 'wp_ajax_renee_wip_block_ajax', 'renee_wip_block_ajax' );

function renee_wip_settings_ajax() {
	global $wpdb;
	$uploads_paths = wp_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	$uploads_baseurl = $uploads_paths['baseurl'];
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_settings_update.php' );
	wp_die();
}
add_action( 'wp_ajax_renee_wip_settings_ajax', 'renee_wip_settings_ajax' );


////////////////////// FRONTEND FUNCTIONS ///////////////////////////////////
function renee_wip_register_front_scripts(){
	wp_register_script( 'renee-wip-block-front-js', plugins_url( 'assets/renee_wip_front.js', __FILE__ ), array( 'jquery' ),'1.0.0', true );
	wp_enqueue_script( 'renee-wip-block-front-js' );
	wp_localize_script( 'renee-wip-block-front-js',
										'renee_wip_front_ajax_object',
										array(
											'ajaxurl' => admin_url( 'admin-ajax.php' ),
											'chat_name' => 'none',
											'msgs_count' => 0
										)
	);

	$uploads_paths = wp_upload_dir();
	$uploads_baseurl = $uploads_paths['baseurl'];
	$site_file = ( isset( $_GET['f'] ) ) ? sanitize_text_field( $_GET['f'] ) : '';
	$curr_user = wp_get_current_user();
	$site_user = $curr_user->user_login;
	$site_id = get_current_user_id();
	$file_src = $uploads_baseurl . '/solid/models/' . $site_file . '.php';
	$chat_create_name = preg_replace('/[^\w]/', '', $site_file);
	wp_register_script( 'renee-wip-viewer-js', plugins_url( 'assets/renee_wip_viewer.js', __FILE__ ), array( 'jquery' ),'1.0.0', true );
	wp_enqueue_script( 'renee-wip-viewer-js' );
	wp_localize_script( 'renee-wip-viewer-js',
										'renee_wip_viewer_object',
										array(
											'uploads_baseurl' => $uploads_paths['baseurl'],
											'site_file' => $site_file,
											'curr_user' => wp_get_current_user(),
											'site_user' => $curr_user->user_login,
											'site_id' => get_current_user_id(),
											'file_src' => $uploads_baseurl . '/solid/models/' . $site_file . '.php',
											'chat_create_name' => preg_replace('/[^\w]/', '', $site_file)
										)
	);

	wp_register_style(
    'renee-wip-block-front-style',
    plugins_url( 'assets/renee-wip-front.css', __FILE__ ),
    array(),
    '1.0.0'
  );
	wp_enqueue_style('renee-wip-block-front-style');

	wp_add_inline_style( 'renee-wip-block-front-style', require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_settings_css.php' ) );

	wp_add_inline_style( 'renee-wip-block-front-style', require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_viewer_css.php' ) );

	//wp_enqueue_style('renee-wip-front-fontawesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', array(), '1.0.0', true);
}
add_action( 'wp_enqueue_scripts', 'renee_wip_register_front_scripts' );


function renee_wip_shortcode( $atts ) {
	$uploads_paths = wp_get_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	ob_start();

	list( $f, $s ) = explode( '.php', $atts['file'] );
	$filename = $f;
	$curr_user = wp_get_current_user();

	global $wpdb;
	$table_n = $wpdb->prefix . 'renee_wip_settings';

	$circle_anim_time = $wpdb->get_var( "SELECT object FROM $table_n WHERE section='circle'" );
	$circle_anim_time_decoded = json_decode( $circle_anim_time, true );

	$battery_anim_time = $wpdb->get_var( "SELECT object FROM $table_n WHERE section='battery'" );
	$battery_anim_time_decoded = json_decode( $battery_anim_time, true );

	$speedometer1_anim_time = $wpdb->get_var( "SELECT object FROM $table_n WHERE section='speedometer'" );
	$speedometer1_anim_time_decoded = json_decode( $speedometer1_anim_time, true );

	$speedometer2_anim_time = $wpdb->get_var( "SELECT object FROM $table_n WHERE section='speedometer2'" );
	$speedometer2_anim_time_decoded = json_decode( $speedometer2_anim_time, true );

	$rogal_anim_time = $wpdb->get_var( "SELECT object FROM $table_n WHERE section='rogal'" );
	$rogal_anim_time_decoded = json_decode( $rogal_anim_time, true );

	switch ( $atts['gauge'] ) {
	    case 'circle':
	      $anim_time = $circle_anim_time_decoded['anim_time'];
				$txt_font_size = $circle_anim_time_decoded['text_size'];
				$btn_font_size = $circle_anim_time_decoded['buttontext_size'];
	      break;
	    case 'battery':
	      $anim_time = $battery_anim_time_decoded['anim_time'];
				$txt_font_size = $battery_anim_time_decoded['text_size'];
				$btn_font_size = $battery_anim_time_decoded['buttontext_size'];
	      break;
	    case 'speedometer':
	      $anim_time = $speedometer1_anim_time_decoded['anim_time'];
				$txt_font_size = $speedometer1_anim_time_decoded['text_size'];
				$btn_font_size = $speedometer1_anim_time_decoded['buttontext_size'];
	      break;
			case 'speedometer2':
			  $anim_time = $speedometer2_anim_time_decoded['anim_time'];
				$txt_font_size = $speedometer2_anim_time_decoded['text_size'];
				$btn_font_size = $speedometer2_anim_time_decoded['buttontext_size'];
			  break;
			case 'speedometer2':
				$anim_time = $rogal_anim_time_decoded['anim_time'];
				$txt_font_size = $rogal_anim_time_decoded['text_size'];
				$btn_font_size = $rogal_anim_time_decoded['buttontext_size'];
				break;
			default:
				$anim_time = 4;
				$txt_font_size = 95;
				$btn_font_size = 85;
		}

	echo '<form action="' . esc_attr( get_site_url() . '/3d-wip-viewer?f=' .  $filename ) . '" method="post" target="_blank" >
			<input type="hidden" class="renee_wip_anim_time" value="' . esc_attr( $anim_time ) . '" />
			<input type="hidden" class="renee_wip_btn_font_size" value="' . esc_attr( $btn_font_size ) . '" />
			<input type="hidden" class="renee_wip_txt_font_size" value="' . esc_attr( $txt_font_size ) . '" />
			<input type="submit" class="renee_wip_gotomodel renee_wip_gotomodel_' . esc_attr( $atts['gauge'] ) . '" value="' . esc_attr( $filename ). '" />
			</form>';

		return ob_get_clean();

}
add_shortcode( 'renee_wip', 'renee_wip_shortcode' );

///////////////////////// PAGE TEMPLATE FOR VIEWER ///////////////
function renee_wip_viewer_page_template( $page_template ){
	$uploads_paths = wp_get_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	if ( is_page( '3d-wip-viewer' ) ) {
      $page_template = plugin_dir_path( __FILE__ ) . '/templates/renee_wip_viewer_template.php';
  }
  return $page_template;
}
add_filter( 'page_template', 'renee_wip_viewer_page_template' );

///////////////////////////// FRONTEND AJAX ////////////////////////////////
function renee_wip_chat_ajax() {
	global $wpdb;
	$uploads_paths = wp_upload_dir();
	$uploads_basedir = $uploads_paths['basedir'];
	$uploads_baseurl = $uploads_paths['baseurl'];
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_chat_update.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_chat_refresh.php' );
	require_once( plugin_dir_path( __FILE__ ) . '/inc/renee_wip_save_snapshot.php' );
	wp_die();
}
add_action( 'wp_ajax_renee_wip_chat_ajax', 'renee_wip_chat_ajax' );
add_action( 'wp_ajax_nopriv_renee_wip_chat_ajax', 'renee_wip_chat_ajax' );


?>

<?php
defined( 'ABSPATH' ) or die();
global $wpdb;
$upl_paths = wp_upload_dir();
$uploads_basedir = $upl_paths['basedir'];
$uploads_baseurl = $upl_paths['baseurl'];
$snapshots_path = $uploads_baseurl . '/solid/snapshots/';
$site_file = esc_attr( $_GET['f'] );
$curr_user = wp_get_current_user();
$site_user = $curr_user->user_login;
$site_id = get_current_user_id();
$src = $uploads_basedir . '/solid/models/' . $site_file . '.php';
$file_src = $uploads_baseurl . '/solid/models/' . $site_file . '.php';
$chat_create_name = preg_replace('/[^\w]/', '', $site_file);



if( isset( $chat_create_name ) ){
  // CREATE CHAT TABLE IF NOT EXISTS
	$sql = 'CREATE TABLE IF NOT EXISTS ' . $wpdb->prefix . 'renee_wip_chats (
	ID INT(6) AUTO_INCREMENT PRIMARY KEY,
	time TEXT NOT NULL,
  chat_name TEXT NOT NULL,
	user_id INT(6) NOT NULL,
	user_name TEXT NOT NULL,
	snapshot_url TEXT NOT NULL,
	message LONGTEXT NOT NULL
	)';
  dbDelta( $sql );

	//UPDATE TABLE
  if( isset( $chat_create_name ) ){
  	$chat_name = $chat_create_name;
  }
  else if( isset( $_POST['renee_wip_chat_name'] ) ){
  	$chat_name = sanitize_text_field( $_POST['renee_wip_chat_name'] );
  }
  else{
  	die('No chat name...');
  }
	//DISPLAY CHAT DATA
  //$msgs_query = $wpdb->prepare( 'SELECT * FROM ' . $wpdb->prefix . 'renee_wip_chats WHERE chat_name="' . $chat_name . '"');
  $msgs = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'renee_wip_chats WHERE chat_name="' . $chat_name . '"', ARRAY_A );
  $count_msgs = count( $msgs );
  $chat_history = '';
	if ( $count_msgs > 0 ) {
		for( $i = 0; $i < $count_msgs; $i++ ) {

      $img = ( isset ( $msgs[$i]['snapshot_url'] ) && $msgs[$i]['snapshot_url'] != "" ) ? '<img src="' . esc_attr( $snapshots_path . $msgs[$i]['snapshot_url'] . '.jpg' ) . '" />' : "";
			$chat_history .= '<div class="' . esc_attr( 'renee_wip_chat_msg usr_' . $msgs[$i]['user_id'] . ' visible' ) . '">
				<span>' . esc_html( $msgs[$i]['time'] . ' ' . $msgs[$i]['user_name'] ) . ':</span>
				<p>' . esc_html( $msgs[$i]['message'] ) . '</p>' .
				$img .
				'</div>';
		}
	}
  else {
		$chat_history = '';
	}
}
?>
<!DOCTYPE html>

<html class="renee_wip_viewer_html">

<head>
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
<?php wp_head(); ?>
</head>

<body>

<div class="renee_wip_viewer_container">

	<iframe id="renee_wip_model_container" src="<?php echo $file_src; ?>?f=<?php echo esc_attr( $_GET['f'] ); ?>" ></iframe>
	<div class="renee_wip_viewer_snapshot_full"></div>
	<div class="renee_wip_viewer_chat_container">

		<div class="renee_wip_viewer_chat_history">
			<div class="renee_wip_viewer_chat_history_inner">
				<?php
				if( isset( $chat_history ) ){
					echo $chat_history;
				}
				else{
					echo 'Chat history undefined';
				}
				?>
			</div>
		</div>
		<div class="renee_wip_viewer_chat_input_area">
			<form class="renee_wip_chat_form" method="post" action=" ">
				<textarea name="renee_wip_chat_message" placeholder="<?php _e( 'Message text...', 'renee-work-in-progress' ); ?>"></textarea>
				<div class="renee_wip_chat_snapshot_preview">
					<img id="targetimg" />
				</div>
				<input type="hidden" id="snapshot_base64_url" value="" />
				<input type="submit" value="<?php _e( 'Send', 'renee-work-in-progress' ); ?>" />
				<div class="renee_wip_viewer_chat_snapshot">
					<i class="fas fa-camera"></i>
				</div>
			</form>
		</div>
	</div>
</div>
<div id="new-parent"></div>
<?php wp_footer(); ?>
</body>

</html>

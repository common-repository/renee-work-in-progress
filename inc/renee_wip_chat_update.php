<?php
defined('ABSPATH') or die();

if( isset( $_POST['renee_wip_chat_name'] ) ){
	$snapshots_path = $uploads_baseurl . '/solid/snapshots/';

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

	if( isset( $_POST["renee_wip_chat_time"] ) &&
    isset( $_POST["renee_wip_chat_usrid"] ) &&
    isset( $_POST["renee_wip_chat_usrname"] ) &&
    isset( $_POST["renee_wip_chat_snapshot"] ) &&
    isset( $_POST["renee_wip_chat_msg"] ) ){
    $wpdb->insert(
      $wpdb->prefix . 'renee_wip_chats',
      array(
        'time' => sanitize_text_field( $_POST["renee_wip_chat_time"] ),
        'chat_name' => $chat_name,
        'user_id' => intval( $_POST["renee_wip_chat_usrid"] ),
        'user_name' => sanitize_text_field( $_POST["renee_wip_chat_usrname"] ),
        'snapshot_url' => sanitize_text_field( $_POST["renee_wip_chat_snapshot"] ),
        'message' => sanitize_text_field( $_POST["renee_wip_chat_msg"] )
      ),
      array( '%s', '%s', '%d', '%s', '%s', '%s' )
    );
	}
}


?>

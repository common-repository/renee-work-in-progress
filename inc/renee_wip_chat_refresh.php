<?php
defined('ABSPATH') or die();

if( isset( $_POST['renee_wip_chat_name2'] ) && isset( $_POST['renee_wip_msgs_count'] ) ){
	$chat_name2 = sanitize_text_field( $_POST['renee_wip_chat_name2'] );
  $snapshots_path2 = $uploads_baseurl . '/solid/snapshots/';

  //DISPLAY CHAT DATA
  $msgs_query2 = $wpdb->prepare( 'SELECT * FROM ' . $wpdb->prefix . 'renee_wip_chats WHERE chat_name="' . $chat_name2 . '"');
  $msgs2 = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'renee_wip_chats WHERE chat_name="' . $chat_name2 . '"', ARRAY_A );
  $count_msgs2 = count( $msgs2 );
  $post_msgs2 = intval( $_POST['renee_wip_msgs_count'] );

	if ( $count_msgs2 > 0 && $post_msgs2 < $count_msgs2 ) {
		$difference = $count_msgs2 - $post_msgs2;
		for($a = $post_msgs2; $a < $count_msgs2; $a++ ) {
      $img2 = ( isset ( $msgs2[$a]['snapshot_url'] ) && $msgs2[$a]['snapshot_url'] != "" ) ? '<img src="' . esc_attr( $snapshots_path2 . $msgs2[$a]['snapshot_url'] . '.jpg' ) . '" />' : "";
			$chat_history2 .= '<div class="' . esc_attr( 'renee_wip_chat_msg usr_' . $msgs2[$a]['user_id'] . ' visible' ) . '">
				<span>' . esc_html( $msgs2[$a]['time'] . ' ' . $msgs2[$a]['user_name'] ) . ':</span>
				<p>' . esc_html( $msgs2[$a]['message'] ) . '</p>' .
				$img2 .
				'</div>';
      echo $chat_history2;
		}
	}
	else{
		echo "";
	}
}
?>

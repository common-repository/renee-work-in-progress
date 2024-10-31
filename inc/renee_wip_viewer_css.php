<?php
defined( 'ABSPATH' ) or die();
$site_id = get_current_user_id();
?>
<style>
	body, html.renee_wip_viewer_html{
		width:100%;
		height:100%;
		padding:0;
		margin:0 !important;
	}
	div#wpadminbar{
		display:none;
	}
	.renee_wip_viewer_container{
		position:relative;
		width:100%;
		height:100%;
		top:0;
		padding:0;
		margin:0;
		font-size:0;
	}
	iframe#renee_wip_model_container,
	.renee_wip_viewer_chat_container,
	.renee_wip_viewer_chat_history,
	.renee_wip_viewer_chat_input_area,
	.renee_wip_viewer_chat_snapshot{
		display:inline-block;
		position:relative;
		vertical-align:top;
		border:0;
		outline:1px solid #ccc;
	}
	#renee_wip_model_container{
		width:calc(100% - 300px) !important;
		height:100%;
		z-index:1;
	}
	.renee_wip_viewer_snapshot_full{
		display:none;
		position:absolute;
		width:calc(100% - 400px);
		height:calc(100% - 100px);
		margin:50px;
		padding:0;
		top:0;
		left:0;
		background-color:#fff;
		background-size:contain;
		background-position:center;
		background-repeat:no-repeat;
		z-index:100000;
		box-shadow: 0px 0px 42px -15px rgba(0,0,0,0.75);
	}
	.renee_wip_viewer_chat_container{
		width:300px;
		height:100%;
	}
	.renee_wip_viewer_chat_history{
		width:100%;
		height:calc(100% - 200px);
		overflow-y:scroll;
		overflow-x:hidden;
	}
	.renee_wip_viewer_chat_input_area{
		width:100%;
		height:200px;
	}
	.renee_wip_viewer_chat_input_area form{
		width:100%;
		height:100%;
	}
	.renee_wip_viewer_chat_input_area textarea{
		width:96%;
		padding:2%;
		height:30%;
		border:0;
		outline:1px solid #ccc;
	}
	.renee_wip_viewer_chat_input_area input[type="submit"]{
		display:inline-block;
		border:0;
		margin:2%;
		padding:0;
		height:17%;
		width:71%;
		background-color:#658ba8;
		color:#fff;
		font-size:20px;
	}
	.renee_wip_viewer_chat_snapshot{

		outline:none;
		width:21%;
		height:17%;
		margin:2%;
		font-size:20px;
		color:#fff;
		background-color:#658ba8;
		text-align:center;
	}
	.renee_wip_viewer_chat_snapshot i{
		font-family: 'Font Awesome 5 Free';
		font-weight: 900;
		display:inline-block;
		position:relative;
		top:calc(50% - 12px);
	}
	.renee_wip_viewer_chat_input_area input[type="submit"]:hover,
	.renee_wip_viewer_chat_snapshot:hover{
		background-color:#86a4bb;
		cursor:pointer;
	}
	.renee_wip_chat_snapshot_preview{
		display:block;
		position:relative;
		width:100%;
		height:40%;
		background-color:#fff;
		outline:1px solid #ccc;
		text-align:center;
	}
	.renee_wip_chat_snapshot_preview canvas,
	.renee_wip_chat_snapshot_preview img{
		display:inline;
		width:auto;
		height:100%;
		text-align:center;
	}
	.renee_wip_chat_msg{
		position:relative;
		width:80%;
		left:-100%;
		padding:10px;
		margin:10px 0;
		font-size:14px;
		overflow:hidden;
		box-shadow: 0px 0px 20px -8px rgba(0,0,0,0.75);
		left:-100%;
		border-radius:0 20px 20px 0;
	}
	.renee_wip_chat_msg.visible{
		left:0;
	}
	.renee_wip_chat_msg span{
		box-sizing:content-box;
		display:inline-block;
		position:absolute;
		width:calc(100% - 20px);
		top:0;
		left:0;
		padding:5px 10px;
		background-color:#4a4a4a;
		color:#fff;
	}
	.renee_wip_chat_msg p{
		margin-top:24px;
	}
	.renee_wip_chat_msg img{
		width:100%;
		height:auto;
	}
	.usr_<?php echo $site_id; ?>{
		transition:all 0.3s;
	}

	.usr_<?php echo $site_id; ?>{
		left:120%;
		border-radius:20px 0 0 20px;
	}
	.usr_<?php echo $site_id; ?>.visible{
		left:20%;
	}
	.usr_<?php echo $site_id; ?> span{
		background-color:#658ba8;
		text-align:right;
	}
	#new-parent{
		position:relative;
		width:100%;
		height:auto;

	}
	#new-parent img{
		position:relative;
		z-index:-1;
	}
	#new-parent canvas{
		position:relative;
		width:100%;
		height:auto;
	}
</style>

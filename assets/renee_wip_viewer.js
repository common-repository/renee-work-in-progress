	jQuery(document).ready(function(){
		var uploads_baseurl = renee_wip_viewer_object.uploads_baseurl;
		var site_file = renee_wip_viewer_object.site_file;
		var curr_user = renee_wip_viewer_object.curr_user;
		var site_user = renee_wip_viewer_object.site_user;
		var site_id = renee_wip_viewer_object.site_id;
		var file_src = renee_wip_viewer_object.file_src;
		var chat_create_name = renee_wip_viewer_object.chat_create_name;

		var msg_audio = new Audio(uploads_baseurl + '/solid/click.mp3');
		var snapshot_audio = new Audio(uploads_baseurl + '/solid/camera.mp3');
		var reneeWipChat = {
			scrollToBottom: function(container_class){
				jQuery(container_class).offset();
				var history_height = jQuery(container_class).height();
				jQuery(container_class).parent().scrollTop(history_height);
			},
			sendMessage: function(button, input_field, snapshot_id, img_preview_id, container_class, msg_class, usrname, usrclass, animclass){

				function sendIt(snap_file, img, button, input_field, snapshot_id, img_preview_id, container_class, msg_class, usrname, usrclass, animclass){
					var msg = jQuery(button).siblings(input_field).val();
					var currentdate = new Date();

					var date_prezero = currentdate.getDate()+1 < 10 ? '0' : '';
					var month_prezero = currentdate.getMonth()+1 < 10 ? '0' : '';
					var hours_prezero = currentdate.getHours() < 10 ? '0' : '';
					var minutes_prezero = currentdate.getMinutes() < 10 ? '0' : '';
					var seconds_prezero = currentdate.getSeconds() < 10 ? '0' : '';

					var datetime = date_prezero + currentdate.getDate() + "."
					+ month_prezero + (currentdate.getMonth()+1)  + "."
					+ currentdate.getFullYear() + " "
					+ hours_prezero + currentdate.getHours() + ":"
					+ minutes_prezero + currentdate.getMinutes() + ":"
					+ seconds_prezero + currentdate.getSeconds();

					var message = '<div class="' + msg_class + ' ' + usrclass + '">\n<span>' + datetime + ' ' + usrname + ':</span>\n<p>' + msg + '</p>\n' + img + '\n</div>';

					var data = {
						'action': 'renee_wip_chat_ajax',
						'renee_wip_chat_time': datetime,
						'renee_wip_chat_usrid': site_id,
						'renee_wip_chat_usrname': site_user,
						'renee_wip_chat_snapshot': snap_file,
						'renee_wip_chat_msg': msg,
						'renee_wip_chat_name': chat_create_name
					};

					jQuery.post(renee_wip_front_ajax_object.ajaxurl, data, function(response) {

					}).fail(function(err){
						throw err;
					});
					jQuery("." + msg_class).offset();
					reneeWipChat.scrollToBottom(container_class);
					jQuery("." + msg_class).css('transition', 'all 0.3s');
					jQuery("." + msg_class).addClass(animclass);
					jQuery(input_field).val('');
					jQuery(snapshot_id).val("");
					jQuery(img_preview_id).attr("src", "");
				}
				var img = "";
				var snap_src = jQuery(snapshot_id).val();

				if(typeof(snap_src) !== "undefined" && snap_src != ""){
					var d = new Date();
					var snap_file = 'snapshot_' + site_user + d.getTime();
					var data = {
						'action': 'renee_wip_chat_ajax',
						'snapshot_base64_url': snap_src,
						'snapshot_target_file': snap_file
					};


					jQuery.post(renee_wip_front_ajax_object.ajaxurl, data, function(response) {

						img = '';
						sendIt(snap_file, img, button, input_field, snapshot_id, img_preview_id, container_class, msg_class, usrname, usrclass, animclass);
					}).fail(function(err){
						throw err;
					});
				}
				else{
					img = "";
					snap_file = "";
					sendIt(snap_file, img, button, input_field, snapshot_id, img_preview_id, container_class, msg_class, usrname, usrclass, animclass);
				}
			},
			refreshChat: function(container_class){
				setInterval(function(thiss){
									//AJAX
									var count_msgs = jQuery(container_class + " > div").length;
                  renee_wip_front_ajax_object.chat_name = chat_create_name;
                  renee_wip_front_ajax_object.msgs_count = count_msgs;
									var data = {
										'action': 'renee_wip_chat_ajax',
										'renee_wip_chat_name2': renee_wip_front_ajax_object.chat_name,
										'renee_wip_msgs_count': renee_wip_front_ajax_object.msgs_count,
									};

									jQuery.post(renee_wip_front_ajax_object.ajaxurl, data, function(response) {
										if(response !== ""){
                      
											jQuery(container_class).append(response);
											jQuery(container_class + " div").offset();
											jQuery(container_class + " div").css("transition", "all 0.3s");
											jQuery(container_class + " div").addClass('visible');
											reneeWipChat.scrollToBottom(container_class);
											msg_audio.play();
										}
									}).fail(function(err){
										throw err;
									});
				}, 1000);
			},
			takeSnapshot: function(source_class, preview_class){

				var src = document.getElementById('renee_wip_model_container').contentWindow.document.getElementById('edrawings-canvas-canvas-container').getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('canvas')[0];
				var src2 = document.getElementById('renee_wip_model_container').contentWindow.document.getElementById('arcanvas');
				setTimeout(function(){
					var img = document.getElementById('targetimg');
					img.src = src.toDataURL();
					document.getElementById('snapshot_base64_url').value = src.toDataURL();
					src.style.display = "";
					document.getElementsByTagName('body')[0].style.width = "100%";
					document.getElementById('new-parent').innerHTML = "";
				}, 1000);
				var canvas = src;

				var img2 = new Image();
				img2.src    = canvas.toDataURL("image/png");

				document.getElementById('new-parent').append(img2);
				var src_parent = jQuery(src).parent();
				src.style.display = "none";
				document.getElementsByTagName('body')[0].style.width = "99%";
			}
		};
		reneeWipChat.scrollToBottom(".renee_wip_viewer_chat_history_inner");
		jQuery('.renee_wip_chat_form input[type="submit"]').on("click", function(e){
			e.preventDefault();
			reneeWipChat.sendMessage(this, "textarea","#snapshot_base64_url", "#targetimg", ".renee_wip_viewer_chat_history_inner", "renee_wip_chat_msg", site_user, 'usr_' + site_id, "visible");
			reneeWipChat.scrollToBottom(".renee_wip_viewer_chat_history_inner");
		});
		reneeWipChat.refreshChat(".renee_wip_viewer_chat_history_inner");
		jQuery('.renee_wip_viewer_chat_snapshot').on("click", function(){
			jQuery(this).trigger('focus');
			jQuery(this).trigger('paste');
			reneeWipChat.takeSnapshot('#renee_wip_model_container', ".renee_wip_chat_snapshot_preview");
			snapshot_audio.play();
		});
		jQuery(document).on("mouseover", '.renee_wip_chat_msg img', function(){
			var src = jQuery(this).attr("src");
			jQuery(".renee_wip_viewer_snapshot_full").css({
				"background-image":'url(' + src + ')',
				"display":"block"
			});
		});
		jQuery(document).on("mouseout", '.renee_wip_chat_msg img', function(){
			jQuery(".renee_wip_viewer_snapshot_full").css("display", "none");
		});
	});//end doc ready

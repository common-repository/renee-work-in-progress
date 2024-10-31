(function() {
const { __ } = wp.i18n;
var el = wp.element.createElement,
  registerBlockType = wp.blocks.registerBlockType,
	RichText = wp.blockEditor.RichText,
	TextControl = wp.components.TextControl,
	SVG = wp.components.SVG,
	Path = wp.components.Path,
	G = wp.components.G,
	Polygon = wp.components.Polygon,
	Circle = wp.components.Circle,
  Rect = wp.components.Rect,
	FileUpload = wp.components.FormFileUpload,
	Button = wp.components.Button,
	Select = wp.components.SelectControl,
	Spinner = wp.components.Spinner,
	Checkbox = wp.components.CheckboxControl;
	var scripts = document.getElementsByTagName("script"),
    url = scripts[scripts.length-1].src,
	split_url = url.split("renee-work-in-progress/"),
	pluginsUrl = split_url[0],
	split_url2 = url.split("plugins/"),
	contentUrl = split_url2[0];
	var wip_value2 = [],
	wip_object;
registerBlockType( 'renee-wip/g-block', {
	title: __( 'Work In Progress', 'renee-work-in-progress' ),
	icon: 'backup',
	category: 'common',
	attributes: {
    wipform: {
			type:'string',
			source: 'html',
			selector: '#renee_wip_form',
		},
		percent: {
            type: 'string',
            source: 'html',
            selector: 'p.renee_progress_text',
        },
		polygonstyle: {
			type: 'string',
			source: 'html',
			selector: '.renee_svg_circle3',

		},
		polygonstyle2: {
			type: 'string',
			source: 'html',
			selector: '.renee_wip_hidden_gauge'
		},
    batterystripestyle: {
      type: 'string',
			source: 'html',
			selector: '.renee_svg_icon_battstripe path',
		},
    batterystripestyle2: {
      type: 'string',
      source: 'html',
      selector: '.renee_wip_hidden_battery_gauge'
    },
    speedostyle: {
      type: 'string',
			source: 'html',
			selector: '.renee_svg_icon_speedometer path',
		},
    speedostyle2: {
      type: 'string',
      source: 'html',
      selector: '.renee_wip_hidden_speedo_gauge'
    },
    speedohandstyle: {
      type: 'string',
			source: 'html',
			selector: '.renee_svg_icon_speedometer hand',
		},
    speedohandstyle2: {
      type: 'string',
      source: 'html',
      selector: '.renee_wip_hidden_speedohand_gauge'
    },
    speedo2style: {
      type: 'string',
			source: 'html',
			selector: '.renee_svg_icon_speedometer2 path',
		},
    speedo2style2: {
      type: 'string',
      source: 'html',
      selector: '.renee_wip_hidden_speedo2_gauge'
    },
    rogalstyle: {
      type: 'string',
			source: 'html',
			selector: '.renee_svg_icon_rogal path',
		},
    rogalstyle2: {
      type: 'string',
      source: 'html',
      selector: '.renee_wip_hidden_rogal_gauge'
    },
		fshortcode: {
        type: 'string',
        source: 'html',
        selector: 'div.renee_fshortcode_text',
    },
    gaugetype: {
			type: 'string',
		},
    gaugeoptions: {
			type: 'object',
		},
    selectgauge: {
			type: 'string',
			source: 'html',
			selector: '.renee_gauge_select',
		},
		selectfile: {
			type: 'string',
			source: 'html',
			selector: '.renee_file_select',
		},
		fileoptions: {
			type: 'object',
		},
		deletefileoptions: {
			type: 'object',
		},
		selectalltodelete: {
			type: 'boolean',
			source: 'html',
			selector: '.renee_wip_select_file_to_delete',
		},
		selectfilestodelete: {
			type: 'array',
		},
		selectalltodeletestate: {
			type: 'boolean',
		},
		spinnershow: {
			type: 'string',
		},
		spinnerstyle: {
			type: 'string',
		},
		spinnervalue: {
			type: 'string',
		},
		uploadspinnerstyle: {
			type: 'string',
		},
		switcher: {
			type: 'string',
		},
		deleteshow: {
			type: 'string',
		},
  },

  /********************************************* EDIT */

	edit: function( props ) {
        var percent = props.attributes.percent,
		fshortcode = props.attributes.fshortcode,
		polygonstyle = (parseFloat(percent) * (282 / 100)) + ", " + (282 - (parseFloat(percent) * (282 / 100))),
		polygonstyle2 = (parseFloat(percent) * (282 / 100)) + ", " + (282 - (parseFloat(percent) * (282 / 100))),
    batterystripestyle = (parseFloat(percent) / 100 * 109) + ", 108",
    batterystripestyle2 = (parseFloat(percent) / 100 * 109) + ", 108",
    speedostyle = ((parseFloat(percent) / 100 * 165) + ", 165"),
    speedostyle2 = ((parseFloat(percent) / 100 * 165) + ", 165"),
    speedohandstyle = ("rotate(" + ((parseFloat(percent) / 100 * 178) - 89) + "deg)"),
    speedohandstyle2 = ("rotate(" + ((parseFloat(percent) / 100 * 178) - 89) + "deg)"),
    speedo2style = ("rotate(" + ((parseFloat(percent) / 100 * 240) - 120) + "deg)"),
    speedo2style2 = ("rotate(" + ((parseFloat(percent) / 100 * 240) - 120) + "deg)"),
    rogalstyle = (parseFloat(percent) / 100 * 230) + ", 230",
    rogalstyle2 = (parseFloat(percent) / 100 * 230) + ", 230",
		wipform = props.attributes.wipform,
		selectfile = props.attributes.selectfile,
		fileoptions = props.attributes.fileoptions,
    gaugetype = props.attributes.gaugetype,
    selectgauge = props.attributes.selectgauge,
    gaugeoptions = props.attributes.gaugeoptions,
		deletefileoptions = props.attributes.deletefileoptions,
		selectalltodelete = props.attributes.selectalltodelete,
		selectfilestodelete = props.attributes.selectfilestodelete,
		selectalltodeletestate = props.attributes.selectalltodeletestate,
		spinnershow = props.attributes.spinnershow,
		spinnerstyle = props.attributes.spinnerstyle,
		spinnervalue = props.attributes.spinnervalue,
		uploadspinnerstyle = props.attributes.uploadspinnerstyle,
		switcher = props.attributes.switcher,
		deleteshow = props.attributes.deleteshow;
        function onChangeContent( newContent ) {
            props.setAttributes( { percent: newContent } );
			props.setAttributes( { polygonstyle: (parseFloat(newContent) * (282 / 100)) + ", " + (282 - (parseFloat(newContent) * (282 / 100))) } );
			props.setAttributes( { polygonstyle2: (parseFloat(newContent) * (282 / 100)) + ", " + (282 - (parseFloat(newContent) * (282 / 100))) } );
      props.setAttributes( { batterystripestyle: (parseFloat(newContent) / 100 * 109) + ", 108", } );
      props.setAttributes( { speedostyle: ((parseFloat(newContent) / 100 * 165) + ", 165") } );
      props.setAttributes( { speedohandstyle: ("rotate(" + ((parseFloat(newContent) / 100 * 178) - 89) + "deg)") } );
      props.setAttributes( { speedo2style: ("rotate(" + ((parseFloat(newContent) / 100 * 240) - 120) + "deg)") } );
      props.setAttributes( { rogalstyle: (parseFloat(newContent) / 100 * 230) + ", 230" } );

    }
		function onChangeContent2( newContent2 ) {
      props.setAttributes( { fshortcode: newContent2 } );
    }
    var files2;
		function changeFile(e) {
			files2 = e.target.files;
      console.log(files2);
    }

		function fileSubmit(e) {
			e.preventDefault();
			if(typeof(files2) !== "undefined"){
        
        data = new FormData();

        for (var i = 0; i < files2.length; i++) {
					var file = files2[i];
					data.append('renee_wip_upload[]', file, file.name);
				}
        data.append('action', 'renee_wip_block_ajax');

				props.setAttributes( { uploadspinnerstyle: "block" } );
				jQuery.ajax({
					xhr: function () {
						var xhr = new window.XMLHttpRequest();
						xhr.upload.addEventListener("progress", function (evt) {
							if (evt.lengthComputable) {
								var percentComplete = Math.round((evt.loaded / evt.total) * 100);
							props.setAttributes( { spinnershow: "block" } );
							props.setAttributes( { spinnerstyle: Math.round((percentComplete * 2.82)) + ", " + Math.round((282 - (percentComplete * 2.82))) } );
							props.setAttributes( { spinnervalue: percentComplete + "%" } );
							}
						}, false);
						xhr.addEventListener("progress", function (evt) {
							if (evt.lengthComputable) {
								var percentComplete = Math.round((evt.loaded / evt.total) * 100);
							props.setAttributes( { spinnershow: "block" } );
							props.setAttributes( { spinnerstyle: Math.round((percentComplete * 2.82)) + ", " + Math.round((282 - (percentComplete * 2.82))) } );
							props.setAttributes( { spinnervalue: percentComplete + "%" } );
							}
						}, false);
						return xhr;
					},
					success: function(data){
            console.log('data: ', data);
            props.setAttributes( { uploadspinnerstyle: "none" } );
            props.setAttributes( { spinnershow: "none" } );
						getFileList();
					},
          error: function(err){
            props.setAttributes( { uploadspinnerstyle: "none" } );
            props.setAttributes( { spinnershow: "none" } );
            throw err;
      		},
					type: "post",
					url: renee_wip_ajax_object.ajax_url,
					data: data,

					dataType: "html",

					enctype: 'multipart/form-data',

					processData: false,
					contentType: false,

				}).done(function(msg){
          console.log('done: ', msg);
					props.setAttributes( { uploadspinnerstyle: "none" } );
					props.setAttributes( { spinnershow: "none" } );
					getFileList();
				}).fail(function(err){
          props.setAttributes( { uploadspinnerstyle: "none" } );
          props.setAttributes( { spinnershow: "none" } );
          alert('Upload failed, try uploading fewer files, or set max_upload_size and max_post_size to higher values');
          throw err;
				});
				getFileList();
			}
    }

		var fileoptions;
    var gauge;
    var fileoptions_object;

		function getFileList(){
      var gauge_final = (typeof(gauge) !== 'undefined') ? gauge : ((typeof(gaugetype) !== 'undefined') ? gaugetype : 'circle');
      renee_wip_ajax_object.gauge_type_value = gauge_final;
      renee_wip_ajax_object.shortcode_value = (typeof(fshortcode) !== 'undefined' && fshortcode !== '') ? fshortcode : '0';
      var data = {
    		'action': 'renee_wip_block_ajax',
    		'gaugetype': renee_wip_ajax_object.gauge_type_value,
        'get_files': '1',
        'shortcode': renee_wip_ajax_object.shortcode_value
    	};

    	jQuery.post(renee_wip_ajax_object.ajax_url, data, function(response) {
        props.setAttributes( { fileoptions: jQuery.parseJSON(response) } );
        fileoptions_object = jQuery.parseJSON(response);
        if(typeof(fileoptions_object) !== 'undefined' && typeof(fshortcode) !== 'undefined'){
          var first = fshortcode.split("file='");
          if(first.length > 1){
            var second = first[1].split(".php");
            var file = second[0];
            for(var i = 0; i < fileoptions_object.length; i++){
              if(fileoptions_object[i].label === file){
                props.setAttributes( { fshortcode: fileoptions_object[i].value } );
              }
            }
          }
          else{
            var file = '';
          }
        }
    	}).fail(function(response) {
          console.log('Error: ' + response.responseText);
      });
		}
		if(typeof(switcher) === "undefined"){
			getFileList();
      getGaugeList();
			props.setAttributes( { switcher: 1 } );
		}
		var deletefileoptions;
		function openFilesToDelete(e){
			e.preventDefault();
			getFilesToDelete();
			props.setAttributes( { deleteshow: "block" } );
		}
		function getFilesToDelete(){
      var data = {
    		'action': 'renee_wip_block_ajax',
    		'get_del_files': '1'      // We pass php values differently!
    	};
    	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
    	jQuery.post(renee_wip_ajax_object.ajax_url, data, function(response) {
        if(typeof(response) !== "undefined"){
          wip_object = jQuery.parseJSON(response);
          wip_object_count = wip_object.length;
          if(wip_value2.length == wip_object_count){
            var selall = true;
          }
          wip_result = [];
          wip_result.push(
            el ( 'tr', {},
                el ( 'th', {},
                  __( 'Delete', 'renee-work-in-progress' )
                ),
                el ( 'th', {},
                  el (
                    Checkbox,
                    {
                      checked: selall,
                      className: 'renee_delete_select_all',
                      title: __( 'Select all', 'renee-work-in-progress' ),
                      onChange: selectAll,
                    }
                  ),
                ),
                el ( 'th', {},
                  __( 'File name', 'renee-work-in-progress' )
                ),
              )
          );

            for(var i = 0; i < wip_object_count; i++){
              if(wip_value2.includes(wip_object[i].file) == true){
                var selected = true;
              }
              else{
                var selected = false;
              }
              wip_result.push( el ( "tr", {},
                el ( "td", {},
                  el (
                    Button,
                    {
                      type: "submit",
                      className: "renee_single_delete_button",
                      onClick: deleteFiles,
                      value: wip_object[i].file,
                    },
                    el ( 'i',
                      {
                        className: 'fas fa-trash-alt',
                      }
                    ),
                  ),
                ),
                el ( "td", {},
                  el ( Checkbox,
                    {
                      checked: selected,
                      className: 'renee_wip_select_file_to_delete',
                      name: "delete_files[]",
                      value: wip_object[i].file,
                      onClick: selectFilesToDelete,
                    },
                  ),
                ),
                el ( "td", {}, wip_object[i].name
                ),
              )
              );
            }

          props.setAttributes( { deletefileoptions: wip_result } );
        }
    	}).fail(function(response) {
          console.log('Error: ' + response.responseText);
      });
		}

		function selectAll(e){
			if(wip_value2.length != wip_object.length){
				wip_value2 = [];
				for(var i = 0; i < wip_object.length; i++){
					wip_value2.push(wip_object[i].file);
				}
				getFilesToDelete();
			}
			else{
				wip_value2 = [];
				getFilesToDelete();
			}

		}
		function deleteFiles(e){
			e.preventDefault();
			renee_wip_ajax_object.del_value = e.currentTarget.value;
      var data = {
    		'action': 'renee_wip_block_ajax',
    		'single_del_file': renee_wip_ajax_object.del_value      // We pass php values differently!
    	};
    	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
    	jQuery.post(renee_wip_ajax_object.ajax_url, data, function(response) {
    		console.log(response);
        getFilesToDelete(e);
        getFileList();
    	}).fail(function(response) {
          console.log('Error: ' + response.responseText);
      });
		}
		function selectFilesToDelete(e) {

			if(wip_value2.includes(e.target.value) == false){
				wip_value2.push(e.target.value);
				getFilesToDelete();
			}
			else{
				var index = wip_value2.indexOf(e.target.value);
				if (index > -1) {
				  wip_value2.splice(index, 1);
				}
				getFilesToDelete();
			}
    }
		function deleteFilesMultiple(e){
			e.preventDefault();
      renee_wip_ajax_object.del_mult_value = [];
      var count_val2 = wip_value2.length;
			for(var i = 0; i < count_val2; i++){
				renee_wip_ajax_object.del_mult_value.push(wip_value2[i]);
			}
      var data = {
    		'action': 'renee_wip_block_ajax',
    		'delete_files': renee_wip_ajax_object.del_mult_value      // We pass php values differently!
    	};
    	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
    	jQuery.post(renee_wip_ajax_object.ajax_url, data, function(response) {
        getFilesToDelete(e);
        getFileList();
    	}).fail(function(response) {
          console.log('Error: ' + response.responseText);
      });
		}
		function deleteClose(e){
			e.preventDefault();
			props.setAttributes( { deleteshow: "none" } );
		}
		function selectFile(selectfile){
			props.setAttributes( { selectfile: selectfile } );
			props.setAttributes( { fshortcode: selectfile } );
		}
    function getGaugeList(){
      var data = {
    		'action': 'renee_wip_block_ajax',
    		'gauge_list': '1'
    	};
    	jQuery.post(renee_wip_ajax_object.ajax_url, data, function(response) {
        if(typeof(gaugetype) === 'undefined'){
          props.setAttributes( { gaugetype: response } );
          gauge = response;
          getFileList();
        }
    	}).fail(function(response) {
          console.log('Error: ' + response.responseText);
      });
    }
    function changeGauge(selectgauge){
			props.setAttributes( { selectgauge: selectgauge } );
			props.setAttributes( { gaugetype: selectgauge } );
      gauge = selectgauge;
      getFileList();

		}
		function prevDefault(e){
			e.preventDefault();
		}



    return el ( 'div', { className: props.className, onClick: getFilesToDelete, },
			el ('div', { className: 'renee_progress_container' },
				el ( 'div', { className: 'renee_delete_list_wrapper', style: { display: deleteshow } },
					el ( 'form', {},
						el ( 'div', { className: 'renee_delete_list_viewer' } ,
							el ( 'table', { style: { cellSpacing: 'none', width: '100%' } },
								deletefileoptions
							),
						),
						el ( 'div', { className: 'renee_delete_list_buttons' },
							el (
								Button,
								{
									className: 'renee_delete_file_button',
									isPrimary: true,
									type: 'submit',
									onClick: deleteFilesMultiple,
								},
								__( 'Delete selected', 'renee-work-in-progress' )
							),
							el (
								Button,
								{
									className: 'renee_delete_close_button',
									isPrimary: true,
									type: 'submit',
									onClick: deleteClose,
								},
								__( 'Close', 'renee-work-in-progress' )
							),
						),
					),
				),
				el ( 'div', { className: 'renee_progress_spinner', style: { display: spinnershow } },
					el (
						SVG,
						{
							className: 'renee_spinner_svg',
							viewBox: "-20 -20 140 140",

						},
						el (
							Circle,
							{
								type: "arc",
								cx: "50",
								cy: "50",
								r: "45",
								style: { strokeDasharray: spinnerstyle },
							},
						),
					),
					el (
						SVG,
						{
							className: 'renee_spinner_svg2',
							viewBox: "-20 -20 140 140",

						},
						el (
							Circle,
							{
								type: "arc",
								cx: "50",
								cy: "50",
								r: "45",
							},
						),
					),
					el (
						'span',
						{

						},
						spinnervalue,
					),
				),
        el (
          Select,
          {
            className: 'renee_gauge_select',
            label: __( 'Select meter type: ', 'renee-work-in-progress' ),
            value: gaugetype,
            onChange: changeGauge,
            options: [{ value: "circle", label: __( 'Circle', 'renee-work-in-progress' ) }, { value: "battery", label: __( 'Battery', 'renee-work-in-progress' ) }, { value: "speedometer", label: __( 'Speed-o-meter 1', 'renee-work-in-progress' ) }, { value: "speedometer2", label: __( 'Speed-o-meter 2', 'renee-work-in-progress' ) }, { value: "rogal", label: __( 'Croissant', 'renee-work-in-progress' )}],
            //renderToggle: isOpen, onToggle,
          }
        ),
        el('input',
          {
            className: 'renee_wip_gauge_type',
            type: 'hidden',
            value: gaugetype,
          }
        ),
				el ('div', { className: 'renee_progress_outer' },
					el ('div', { className: 'renee_progress_inner' },
						el ('div', { className: 'renee_progress_icon renee_progress_icon_' + gaugetype },
							el (
								'input',
								{
									className: 'renee_wip_hidden_percent',
									type: 'hidden',
									value: percent
								}
							),
              el(function(){
                if(gaugetype === 'circle' || typeof(gaugetype) === 'undefined'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 282"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: polygonstyle2
      								}
      							)
                  )
                }
                else if(gaugetype === 'battery'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_battery_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 108"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_battery_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: batterystripestyle2
      								}
      							)
                  )
                }
                else if(gaugetype === 'speedometer'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 170"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: speedostyle2
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedohand_gauge hidden_gauge_hand_start',
      									type: 'hidden',
      									value: "rotate(-89deg)"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedohand_gauge hidden_gauge_hand_end',
      									type: 'hidden',
      									value: speedohandstyle2
      								}
      							)
                  )

                }
                else if(gaugetype === 'speedometer2'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo2_gauge hidden_gauge_hand_start',
      									type: 'hidden',
      									value: "rotate(-120deg)"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo2_gauge hidden_gauge_hand_end',
      									type: 'hidden',
      									value: speedo2style2
      								}
      							)
                  )
                }
                else if(gaugetype === 'rogal'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_rogal_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 230"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_rogal_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: rogalstyle2
      								}
      							)
                  )
                }
              }),
							el (
								RichText,
								{
									tagName: 'p',
									className: 'renee_progress_text ' + 'renee_progress_text_' + gaugetype,
									onChange: onChangeContent,
									value: percent,
								},
							),
              el(function(){
                /************************************************ CIRCLE */
                if(gaugetype === 'circle' || typeof(gaugetype) === 'undefined'){
                  return el (
    								SVG,
    								{
    									className: 'renee_svg_icon',
    									viewBox: "-20 -20 140 140",

    								},
                    el(G,{},
                      el (
      									Circle,
      									{
                          className: 'renee_svg_circle2 svg_bg_color',
      										type: "arc",
      										cx: "50",
      										cy: "50",
      										r: "45",
      									},
      								),
                      el (
      									Circle,
      									{
                          className: 'renee_svg_circle3 svg_meter_color',
                          type: "arc",
      										cx: "50",
      										cy: "50",
      										r: "45",
      										style: { strokeDasharray: polygonstyle },
      									},
      								)
      							),
                  );
                }
                /******************************************** BATTERY */
                else if(gaugetype === 'battery'){
                  return el (
    								SVG,
    								{
    									className: 'renee_svg_battery_icon',
    									viewBox: "0 0 132.29166 58.208335",
    								},
                    el(G,{},
                      el (
      									Rect,
      									{
                          y:"5.2916632",
                          x:"5.2916665",
                          height:"47.624996",
                          width:"113.77084",
                          className:"renee_svg_battery_rect1 svg_fill_color svg_edge_color",

      									},
      								),
                      el (
      									Rect,
      									{
                          y:"18.520849",
                          x:"119.0625",
                          height:"21.166641",
                          width:"7.9375",
                          className:"renee_svg_battery_rect2 svg_edge_color svg_edgefill_color",
      									},
      								),
                      el (
      									Path,
      									{
                          className:"renee_svg_battery_path svg_meter_color",
                          d:"M 7.9374999,29.10417 H 116.41667",
                          style: { strokeDasharray: batterystripestyle },
      									},
      								),
                    )
    							);
                }
                /************************************ SPEEDOMETER */
                else if(gaugetype === 'speedometer'){
                  return el(
                    SVG,
    								{
    									className: 'renee_svg_speedometer_icon',
    									viewBox: "0 0 132.29166 68.791668",
    								},
                    el(
                      G, {
                        transform: "translate(0,-228.20833)"
                      },
                      el(
                        Path,
                        {
                          className: 'bg_path svg_bg_color',
                          d: "M 13.229173,294.5343 A 52.921349,52.921349 0 0 1 66.056939,242.22128 52.921349,52.921349 0 0 1 119.0625,294.35414"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'bar_path svg_meter_color',
                          d: "m 13.229173,294.5343 a 52.921349,52.921349 0 0 1 52.7941,-52.31296 52.921349,52.921349 0 0 1 53.038187,52.06547",
                          style: { strokeDasharray: speedostyle },
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'text1 svg_text_color'
                        },
                        /* 1 */
                        el(
                          Path,
                          {
                            d: "m 8.1419516,289.07846 3.3899394,0.22275 q 1.066617,0.0701 1.5305,0.75815 0.454017,0.67681 0.39434,1.58501 -0.05968,0.90821 -0.59974,1.54091 -0.54993,0.62145 -1.616547,0.55136 L 7.8399442,293.5132 q -1.0877376,-0.0715 -1.6085877,-0.69964 -0.5201561,-0.63873 -0.4514579,-1.68423 0.068698,-1.04549 0.6975612,-1.5769 0.629557,-0.54197 1.6644918,-0.47397 z m 3.3306524,0.80219 -3.4744237,-0.2283 q -0.7709208,-0.0507 -1.1915001,0.37777 -0.4198854,0.41787 -0.4684598,1.15711 -0.048574,0.73924 0.3130215,1.20846 0.361596,0.46922 1.1325168,0.51987 l 3.4849843,0.229 q 0.7498,0.0493 1.170379,-0.37916 0.410713,-0.43969 0.457206,-1.14724 0.04719,-0.71812 -0.292595,-1.19651 -0.349647,-0.48965 -1.131129,-0.541 z"
                          }
                        ),
                        /* 2 */
                        el(
                          Path,
                          {
                            d: "m 13.617238,288.00199 -0.484921,0.28508 -6.1505248,-7.2737 0.5051766,-0.3351 z m 0.72893,-5.54934 q 0.353924,0.51952 0.235643,1.14341 -0.118281,0.62388 -0.637799,0.97781 -0.519517,0.35392 -1.143404,0.23564 -0.623886,-0.11828 -0.97781,-0.6378 -0.353924,-0.51952 -0.235643,-1.1434 0.118281,-0.62389 0.637798,-0.97781 0.519517,-0.35393 1.143404,-0.23565 0.623887,0.11828 0.977811,0.6378 z m -0.441358,0.28257 q -0.25029,-0.32752 -0.63502,-0.40046 -0.384731,-0.0729 -0.727133,0.14221 -0.3528,0.21318 -0.435597,0.6499 -0.0828,0.43672 0.167494,0.76424 0.239892,0.32555 0.624622,0.39849 0.38473,0.0729 0.73753,-0.14024 0.342402,-0.21515 0.425199,-0.65187 0.0828,-0.43672 -0.157095,-0.76227 z m -4.8508821,2.06414 q 0.353924,0.51951 0.235643,1.1434 -0.118281,0.62389 -0.6377984,0.97781 -0.5195173,0.35393 -1.143404,0.23564 -0.6238867,-0.11828 -0.9778107,-0.63779 -0.353924,-0.51952 -0.235643,-1.14341 0.118281,-0.62388 0.6377984,-0.97781 0.5195173,-0.35392 1.143404,-0.23564 0.6238867,0.11828 0.9778107,0.6378 z M 8.61257,285.08192 q -0.2502902,-0.32752 -0.6350203,-0.40046 -0.3847301,-0.0729 -0.7271323,0.14222 -0.3528003,0.21318 -0.435597,0.6499 -0.082797,0.43672 0.1674934,0.76424 0.2398921,0.32555 0.6246222,0.39849 0.3847301,0.0729 0.7375304,-0.14024 0.3424022,-0.21516 0.4251989,-0.65188 0.082797,-0.43672 -0.1570953,-0.76227 z"
                          }
                        ),
                        /* 3 */
                        el(
                          Path,
                          {
                            d: "m 28.286148,258.11999 -2.503067,2.74482 -0.41446,-0.37796 -1.19936,-4.7318 q -0.196834,-0.69514 -0.548734,-1.01604 -0.437919,-0.39935 -0.929244,-0.33177 -0.484193,0.0598 -0.769443,0.37256 -0.28525,0.3128 -0.311508,0.71855 -0.02626,0.40575 0.178885,0.79335 l -0.527225,0.26402 q -0.278966,-0.52654 -0.244644,-1.08249 0.03363,-0.5709 0.504295,-1.08702 0.477793,-0.52394 1.148533,-0.59979 0.737675,-0.0864 1.269435,0.3985 0.523939,0.4778 0.788844,1.34959 l 1.111517,4.45118 2.039537,-2.23652 z"
                          }
                        ),
                        /* 4 */
                        el(
                          Path,
                          {
                            d: "m 28.03744,257.11231 0.148484,-0.57112 q 0.853639,0.20389 1.505118,-0.401 0.50412,-0.46807 0.529631,-1.15609 0.02551,-0.68801 -0.442562,-1.19213 -0.468073,-0.50412 -1.156086,-0.52963 -0.688014,-0.0255 -1.192134,0.44256 l -1.116821,1.03696 -2.183577,-2.91169 2.05526,-1.90829 0.396062,0.42656 -1.675231,1.55544 1.484522,1.97215 0.643723,-0.59769 q 0.690257,-0.6409 1.61758,-0.60652 0.927322,0.0344 1.568222,0.72464 0.633698,0.6825 0.599314,1.60983 -0.03438,0.92732 -0.724641,1.56822 -0.418807,0.38886 -0.963353,0.53342 -0.551747,0.1368 -1.093511,0.004 z"
                          }
                        ),
                        /* 5 */
                        el(
                          Path,
                          {
                            d: "m 32.383202,254.27836 -0.549677,-0.11948 0.414885,-9.51648 0.59849,0.0965 z m 4.299894,-3.58294 q -0.09236,0.6218 -0.60247,0.99996 -0.510112,0.37817 -1.131908,0.28581 -0.621795,-0.0924 -0.999964,-0.60247 -0.378169,-0.51011 -0.285809,-1.1319 0.09236,-0.6218 0.602471,-0.99997 0.510111,-0.37817 1.131907,-0.28581 0.621796,0.0924 0.999964,0.60247 0.378169,0.51011 0.285809,1.13191 z m -0.515964,-0.0918 q 0.03827,-0.41043 -0.194937,-0.725 -0.233204,-0.31457 -0.630731,-0.38874 -0.40383,-0.0827 -0.760908,0.18203 -0.357077,0.26472 -0.395344,0.67515 -0.04457,0.40192 0.188635,0.71649 0.233204,0.31457 0.637033,0.39725 0.397527,0.0742 0.754605,-0.19054 0.357078,-0.26472 0.401647,-0.66664 z m -4.964377,-1.77389 q -0.09236,0.6218 -0.602471,0.99997 -0.510111,0.37816 -1.131907,0.2858 -0.621796,-0.0924 -0.999965,-0.60247 -0.378168,-0.51011 -0.285809,-1.1319 0.09236,-0.6218 0.602471,-0.99997 0.510111,-0.37817 1.131907,-0.28581 0.621796,0.0924 0.999965,0.60247 0.378169,0.51011 0.285809,1.13191 z m -0.515964,-0.0918 q 0.03827,-0.41043 -0.194938,-0.725 -0.233204,-0.31456 -0.630731,-0.38874 -0.403829,-0.0827 -0.760907,0.18203 -0.357078,0.26472 -0.395345,0.67515 -0.04457,0.40192 0.188635,0.71649 0.233204,0.31457 0.637034,0.39725 0.397527,0.0742 0.754604,-0.19054 0.357078,-0.26472 0.401648,-0.66664 z"
                          }
                        ),
                        /* 6 */
                        el(
                          Path,
                          {
                            d: "m 59.650314,241.69196 0.469859,-0.35702 q 0.544781,0.6881 1.430818,0.61558 0.685624,-0.0561 1.131121,-0.58104 0.445497,-0.52493 0.389379,-1.21055 -0.05612,-0.68563 -0.581042,-1.13112 -0.524925,-0.4455 -1.210549,-0.38938 l -1.51892,0.12432 0.08446,-3.63852 2.795236,-0.22879 0.04748,0.58015 -2.278381,0.18648 -0.05286,2.46787 0.875489,-0.0717 q 0.938777,-0.0768 1.646285,0.52362 0.707507,0.60045 0.784345,1.53923 0.07597,0.92823 -0.524478,1.63573 -0.600452,0.70751 -1.539229,0.78435 -0.569595,0.0466 -1.086938,-0.1765 -0.518206,-0.23368 -0.862087,-0.67275 z"
                          }
                        ),
                        /* 7 */
                        el(
                          Path,
                          {
                            d: "m 69.282315,236.90787 -0.05326,3.39683 q -0.01676,1.06879 -0.68081,1.56644 -0.653302,0.48723 -1.563357,0.47296 -0.910055,-0.0143 -1.568924,-0.52208 -0.648122,-0.51822 -0.631363,-1.58701 l 0.05343,-3.40741 q 0.01709,-1.08995 0.618478,-1.64151 0.61197,-0.55139 1.659591,-0.53496 1.047621,0.0164 1.609759,0.61798 0.57272,0.60172 0.556459,1.63876 z m -0.634942,3.36654 0.05459,-3.48149 q 0.01211,-0.77248 -0.436776,-1.17115 -0.438306,-0.39851 -1.179048,-0.41012 -0.740742,-0.0116 -1.191327,0.37295 -0.450585,0.38456 -0.462697,1.15705 l -0.05476,3.49207 q -0.01178,0.75133 0.437107,1.15 0.459636,0.38825 1.168632,0.39937 0.719578,0.0113 1.180413,-0.35195 0.471583,-0.37366 0.483862,-1.15673 z"
                          }
                        ),
                        /* 8 */
                        el(
                          Path,
                          {
                            d: "m 70.63068,242.32213 -0.309191,-0.46992 6.954009,-6.5098 0.360169,0.48762 z m 5.57906,0.44791 q -0.500992,0.3797 -1.130053,0.29306 -0.629062,-0.0866 -1.008755,-0.58764 -0.379694,-0.50099 -0.293052,-1.13005 0.08664,-0.62906 0.587635,-1.00876 0.500992,-0.37969 1.130053,-0.29305 0.629062,0.0866 1.008755,0.58764 0.379694,0.50099 0.293052,1.13005 -0.08664,0.62906 -0.587635,1.00875 z m -0.304483,-0.42653 q 0.314471,-0.2665 0.3679,-0.65442 0.05343,-0.38792 -0.178731,-0.71903 -0.230716,-0.34159 -0.671059,-0.40224 -0.440343,-0.0607 -0.754813,0.20585 -0.313027,0.25602 -0.366456,0.64394 -0.05343,0.38792 0.177287,0.72951 0.23216,0.33111 0.672503,0.39176 0.440343,0.0606 0.753369,-0.19537 z m -2.306336,-4.74052 q -0.500992,0.37969 -1.130053,0.29305 -0.629062,-0.0866 -1.008755,-0.58763 -0.379694,-0.501 -0.293052,-1.13006 0.08664,-0.62906 0.587635,-1.00875 0.500992,-0.37969 1.130053,-0.29305 0.629062,0.0866 1.008755,0.58763 0.379694,0.50099 0.293052,1.13006 -0.08664,0.62906 -0.587635,1.00875 z m -0.304483,-0.42653 q 0.314471,-0.26651 0.3679,-0.65443 0.05343,-0.38792 -0.178731,-0.71902 -0.230716,-0.3416 -0.671059,-0.40224 -0.440343,-0.0606 -0.754813,0.20585 -0.313027,0.25601 -0.366456,0.64394 -0.05343,0.38792 0.177287,0.72951 0.23216,0.3311 0.672503,0.39175 0.440343,0.0606 0.753369,-0.19536 z"
                          }
                        ),
                        /* 9 */
                        el(
                          Path,
                          {
                            d: "m 98.963226,253.60212 -0.504639,-0.4194 6.943263,-3.10552 -2.68598,-2.23228 0.37205,-0.44766 3.20689,2.66521 -0.37204,0.44766 z"
                          }
                        ),
                        /* 10 */
                        el(
                          Path,
                          {
                            d: "m 102.55045,255.47583 0.57681,0.12456 q -0.16816,0.86139 0.46334,1.48711 0.48867,0.48419 1.17715,0.48102 0.68848,-0.003 1.17266,-0.49183 0.48419,-0.48867 0.48102,-1.17715 -0.003,-0.68847 -0.49183,-1.17266 l -1.08258,-1.07266 2.81821,-2.30296 1.99225,1.97399 -0.4097,0.41349 -1.62387,-1.60899 -1.9086,1.56538 0.62398,0.61826 q 0.6691,0.66297 0.67337,1.59092 0.004,0.92795 -0.65869,1.59704 -0.65552,0.66158 -1.58347,0.66585 -0.92795,0.004 -1.59704,-0.65869 -0.40597,-0.40225 -0.57308,-0.9403 -0.15967,-0.54557 -0.0499,-1.09238 z"
                          }
                        ),
                        /* 11 */
                        el(
                          Path,
                          {
                            d: "m 105.5629,259.69978 0.0965,-0.55418 9.52551,0.0176 -0.0714,0.60199 z m 3.75917,4.14672 q -0.62511,-0.0663 -1.02422,-0.56024 -0.39912,-0.4939 -0.33277,-1.119 0.0663,-0.62511 0.56023,-1.02423 0.4939,-0.39911 1.11901,-0.33277 0.6251,0.0663 1.02422,0.56024 0.39911,0.49389 0.33277,1.119 -0.0663,0.62511 -0.56024,1.02422 -0.49389,0.39912 -1.119,0.33278 z m 0.0702,-0.51935 q 0.41167,0.0211 0.71623,-0.225 0.30457,-0.24613 0.36211,-0.6464 0.0658,-0.40693 -0.21362,-0.75265 -0.27938,-0.34573 -0.69105,-0.36684 -0.40343,-0.0278 -0.708,0.21835 -0.30457,0.24612 -0.37033,0.65305 -0.0575,0.40027 0.22185,0.746 0.27938,0.34573 0.68281,0.37349 z m 1.56529,-5.03404 q -0.62511,-0.0663 -1.02423,-0.56024 -0.39911,-0.49389 -0.33277,-1.119 0.0663,-0.62511 0.56024,-1.02422 0.49389,-0.39912 1.119,-0.33278 0.62511,0.0663 1.02422,0.56024 0.39912,0.4939 0.33278,1.119 -0.0663,0.62511 -0.56024,1.02423 -0.4939,0.39911 -1.119,0.33277 z m 0.0702,-0.51934 q 0.41166,0.0211 0.71623,-0.22501 0.30457,-0.24612 0.3621,-0.6464 0.0658,-0.40692 -0.21361,-0.75265 -0.27938,-0.34573 -0.69105,-0.36684 -0.40343,-0.0278 -0.708,0.21835 -0.30457,0.24613 -0.37034,0.65305 -0.0575,0.40028 0.22185,0.746 0.27938,0.34573 0.68282,0.3735 z"
                          }
                        ),
                        /* 12 */
                        el(
                          Path,
                          {
                            d: "m 114.73175,274.11143 -0.24443,-0.53991 6.11258,-2.76734 q -0.21445,-0.0888 -0.43054,-0.25816 -0.20645,-0.17373 -0.31049,-0.30089 l -0.10404,-0.12716 0.45425,-0.35668 q 0.096,0.21211 0.39524,0.43679 0.30358,0.23431 0.63191,0.31802 l 0.24443,0.53991 z"
                          }
                        ),
                        /* 13 */
                        el(
                          Path,
                          {
                            d: "m 121.68059,277.29202 -3.19264,1.1612 q -1.00454,0.36536 -1.70622,-0.0777 -0.68812,-0.43668 -0.99922,-1.29203 -0.3111,-0.85534 -0.0715,-1.65196 0.25312,-0.79028 1.25766,-1.15564 l 3.20258,-1.16482 q 1.02443,-0.37259 1.75414,-0.007 0.73332,0.3752 1.09145,1.35984 0.35813,0.98465 -0.004,1.7243 -0.35802,0.7496 -1.33271,1.10411 z m -3.37171,0.60694 3.27221,-1.19014 q 0.72605,-0.26407 0.9385,-0.82559 0.21606,-0.55157 -0.0372,-1.24779 -0.25322,-0.69621 -0.77315,-0.98009 -0.51993,-0.28388 -1.24598,-0.0198 l -3.28215,1.19375 q -0.70616,0.25684 -0.91861,0.81836 -0.19889,0.56785 0.0435,1.23422 0.24599,0.67633 0.74965,0.97739 0.51721,0.30739 1.25321,0.0397 z"
                          }
                        ),
                        /* 14 */
                        el(
                          Path,
                          {
                            d: "m 123.29816,283.48613 -3.30125,0.80191 q -1.03871,0.25231 -1.68724,-0.2654 -0.63575,-0.50993 -0.85059,-1.39437 -0.21484,-0.88445 0.11113,-1.64977 0.33876,-0.75754 1.37747,-1.00985 l 3.31154,-0.80441 q 1.05928,-0.25731 1.74424,0.18621 0.68746,0.4538 0.93478,1.47195 0.24732,1.01814 -0.1937,1.71338 -0.43852,0.70554 -1.44638,0.95035 z m -3.41808,0.23128 3.38352,-0.82189 q 0.75075,-0.18237 1.02385,-0.71702 0.2756,-0.52437 0.10073,-1.24427 -0.17487,-0.7199 -0.66032,-1.05941 -0.48544,-0.33951 -1.23619,-0.15714 l -3.39381,0.82439 q -0.73018,0.17737 -1.00328,0.71202 -0.26031,0.54244 -0.0929,1.23149 0.16987,0.69933 0.63724,1.05412 0.48015,0.36257 1.24119,0.17771 z"
                          }
                        ),
                        /* 15 */
                        el(
                          Path,
                          {
                            d: "m 118.39339,286.15243 0.37761,-0.41693 8.04269,5.10399 -0.38199,0.47072 z m 0.96227,5.51367 q -0.49297,-0.39005 -0.56649,-1.02078 -0.0735,-0.63073 0.31655,-1.1237 0.39005,-0.49297 1.02078,-0.56648 0.63073,-0.0735 1.1237,0.31654 0.49297,0.39005 0.56648,1.02078 0.0735,0.63073 -0.31654,1.1237 -0.39005,0.49297 -1.02078,0.56648 -0.63074,0.0735 -1.1237,-0.31654 z m 0.33678,-0.40152 q 0.33671,0.23779 0.72566,0.19246 0.38895,-0.0453 0.65143,-0.35296 0.273,-0.30885 0.22154,-0.75036 -0.0515,-0.44151 -0.38816,-0.67929 -0.3262,-0.23902 -0.71515,-0.19368 -0.38895,0.0453 -0.66195,0.35418 -0.26248,0.30762 -0.21103,0.74913 0.0515,0.44151 0.37766,0.68052 z m 4.01266,-3.4191 q -0.49297,-0.39005 -0.56648,-1.02078 -0.0735,-0.63073 0.31654,-1.1237 0.39006,-0.49297 1.02079,-0.56648 0.63073,-0.0735 1.1237,0.31654 0.49297,0.39005 0.56648,1.02078 0.0735,0.63073 -0.31655,1.1237 -0.39005,0.49297 -1.02078,0.56648 -0.63073,0.0735 -1.1237,-0.31654 z m 0.33678,-0.40152 q 0.33671,0.23779 0.72566,0.19245 0.38895,-0.0453 0.65144,-0.35295 0.273,-0.30885 0.22154,-0.75036 -0.0515,-0.44151 -0.38817,-0.6793 -0.32619,-0.23901 -0.71514,-0.19368 -0.38895,0.0453 -0.66195,0.35418 -0.26249,0.30763 -0.21103,0.74914 0.0515,0.44151 0.37765,0.68052 z"
                          }
                        ),
                      ),
                      el(
                        Path,
                        {
                          className: 'line svg_line_color',
                          d:"m 18.52085,294.5343 a 47.629208,47.629208 0 0 1 47.544983,-47.08171 47.629208,47.629208 0 0 1 47.704997,46.91957"
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'text2'
                        },
                        /* 1 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 19.400859,294.19895 0.0026,-0.13051 -3.530594,-0.0709 -0.0026,0.1305 z"
                          }
                        ),
                        /* 2 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 34.114159,261.02468 0.09519,-0.0893 -2.416292,-2.5752 -0.09519,0.0893 z"
                          }
                        ),
                        /* 3 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 66.044206,248.32747 0.130528,-1.1e-4 -0.003,-3.5313 -0.130528,1.1e-4 z"
                          }
                        ),
                        /* 4 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 98.029639,260.88418 0.09534,0.0891 2.411991,-2.57922 -0.0953,-0.0892 z"
                          }
                        ),
                        /* 5 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 112.88864,293.99344 0.003,0.1305 3.53047,-0.0769 -0.003,-0.1305 z"
                          }
                        ),
                      ),
                      el(
                        Path,
                        {
                          className: 'hand svg_hand_color',
                          d: "m 63.499999,294.35415 h 5.291667 l -2.645834,-63.5 z",
                          style: { transform: speedohandstyle }
                        }
                      )
                    )
                  )
                }
                /******************************** SPEEDOMETER 2 */
                else if(gaugetype === 'speedometer2'){
                  return el(
                    SVG,
                    {
                      className: 'renee_svg_speedometer2_icon',
                      viewBox: "0 0 132.29166 100"
                    },
                    el(
                      G,
                      {

                      },
                      el(
                        Path,
                        {
                          className: 'grid  svg_line_color2',
                          d: "m 65.718799,5.5340186 a 1.3448901,1.3448901 0 0 0 -1.337927,1.3531603 l 0.02732,4.8731631 a 1.3448901,1.3448901 0 0 0 1.353685,1.335826 h 0.179652 a 1.3448901,1.3448901 0 0 0 1.337926,-1.353161 L 67.252135,6.8698442 A 1.3448901,1.3448901 0 0 0 65.89845,5.5340186 Z m 23.993907,4.8710624 a 1.3448901,1.3448901 0 0 0 -1.2481,0.808429 l -1.943067,4.468685 a 1.3448901,1.3448901 0 0 0 0.697067,1.76972 l 0.165992,0.07197 a 1.3448901,1.3448901 0 0 0 1.769719,-0.697067 l 1.943592,-4.468686 a 1.3448901,1.3448901 0 0 0 -0.697592,-1.76972 l -0.165991,-0.07196 a 1.3448901,1.3448901 0 0 0 -0.52162,-0.111362 z m -47.790828,0.267375 a 1.3448901,1.3448901 0 0 0 -0.482222,0.115565 l -0.164415,0.07407 a 1.3448901,1.3448901 0 0 0 -0.67763,1.777074 l 1.994019,4.447674 a 1.3448901,1.3448901 0 0 0 1.777598,0.67553 l 0.163893,-0.07249 A 1.3448901,1.3448901 0 0 0 45.210752,15.9128 l -1.99402,-4.447149 a 1.3448901,1.3448901 0 0 0 -1.294854,-0.793195 z m 67.767802,13.878823 a 1.3448901,1.3448901 0 0 0 -0.94763,0.355625 l -3.57989,3.306732 a 1.3448901,1.3448901 0 0 0 -0.0741,1.900519 l 0.12081,0.132375 a 1.3448901,1.3448901 0 0 0 1.90052,0.07459 l 3.57989,-3.306732 a 1.3448901,1.3448901 0 0 0 0.0762,-1.900519 l -0.12292,-0.130798 a 1.3448901,1.3448901 0 0 0 -0.95289,-0.431793 z m -87.451136,0.486423 a 1.3448901,1.3448901 0 0 0 -1.045338,0.441248 l -0.120818,0.135001 a 1.3448901,1.3448901 0 0 0 0.09771,1.898417 l 3.617182,3.26576 a 1.3448901,1.3448901 0 0 0 1.898416,-0.0956 l 0.120818,-0.135 a 1.3448901,1.3448901 0 0 0 -0.0956,-1.898418 l -3.617182,-3.265759 a 1.3448901,1.3448901 0 0 0 -0.85518,-0.345645 z M 122.25999,45.552054 a 1.3448901,1.3448901 0 0 0 -0.135,0.0016 1.3448901,1.3448901 0 0 0 -0.35562,0.06986 l -4.61104,1.57431 a 1.3448901,1.3448901 0 0 0 -0.83995,1.707211 l 0.0588,0.16967 a 1.3448901,1.3448901 0 0 0 1.70669,0.837845 l 4.61314,-1.573784 a 1.3448901,1.3448901 0 0 0 0.83837,-1.70721 l -0.0588,-0.170195 a 1.3448901,1.3448901 0 0 0 -1.21659,-0.909286 z M 9.9025122,46.176629 a 1.3448901,1.3448901 0 0 0 -1.302732,0.92347 l -0.054631,0.172296 a 1.3448901,1.3448901 0 0 0 0.8572817,1.697229 l 4.6289011,1.521255 a 1.3448901,1.3448901 0 0 0 1.697229,-0.857282 l 0.05673,-0.170195 A 1.3448901,1.3448901 0 0 0 14.927486,47.766173 L 10.298585,46.242818 A 1.3448901,1.3448901 0 0 0 9.9025122,46.176629 Z M 120.33216,69.406757 a 1.3448901,1.3448901 0 0 0 -1.32059,1.230766 l -0.0152,0.179652 a 1.3448901,1.3448901 0 0 0 1.22446,1.455068 l 4.8553,0.417609 a 1.3448901,1.3448901 0 0 0 1.45507,-1.224462 l 0.0158,-0.179652 a 1.3448901,1.3448901 0 0 0 -1.22446,-1.455068 l -4.85583,-0.418133 a 1.3448901,1.3448901 0 0 0 -0.13448,-0.0058 z M 11.959043,70.010321 a 1.3448901,1.3448901 0 0 0 -0.09403,0.0063 l -4.8511007,0.47224 A 1.3448901,1.3448901 0 0 0 5.806786,71.957581 L 5.82412,72.137757 A 1.3448901,1.3448901 0 0 0 7.2928451,73.34436 L 12.14237,72.87212 a 1.3448901,1.3448901 0 0 0 1.209229,-1.468726 l -0.01786,-0.178075 A 1.3448901,1.3448901 0 0 0 11.959041,70.01031 Z M 113.87471,90.901309 a 1.3448901,1.3448901 0 0 0 -1.18139,0.697068 l -0.0877,0.158113 a 1.3448901,1.3448901 0 0 0 0.53108,1.826453 l 4.2717,2.345442 a 1.3448901,1.3448901 0 0 0 1.82592,-0.531074 l 0.0862,-0.158113 a 1.3448901,1.3448901 0 0 0 -0.5316,-1.826453 l -4.26959,-2.345442 a 1.3448901,1.3448901 0 0 0 -0.64402,-0.165994 z m -95.218679,0.531074 a 1.3448901,1.3448901 0 0 0 -0.601463,0.171773 l -4.245961,2.392719 a 1.3448901,1.3448901 0 0 0 -0.509536,1.831705 l 0.08772,0.156537 a 1.3448901,1.3448901 0 0 0 1.831704,0.511637 l 4.244385,-2.392718 a 1.3448901,1.3448901 0 0 0 0.511638,-1.831705 l -0.08983,-0.158639 A 1.3448901,1.3448901 0 0 0 18.656031,91.432383 Z M 66.146001,8.5339583 c -13.221314,0 -26.443374,4.5098607 -37.195859,13.5322647 C 7.4451725,40.111044 1.9969703,71.014579 16.033339,95.326292 l 2.328837,-1.344097 C 4.9694775,70.785355 10.160589,41.344362 30.679395,24.127041 c 20.518811,-17.2173307 50.414404,-17.2173307 70.933215,0 20.5188,17.217321 25.70992,46.658314 12.31722,69.855154 l 2.32883,1.344097 C 130.29503,71.014579 124.84484,40.111044 103.33988,22.066223 92.587392,13.043819 79.367315,8.5339583 66.146001,8.5339583 Z"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'numbers svg_text_color2',
                          d: "m 105.40031,91.28369 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.6953,-0.95553 1.08909,0 1.68501,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75357 -0.59592,0.95552 -1.68501,0.95552 -1.0891,0 -1.6953,-0.95552 -0.59592,-0.95553 -0.59592,-2.75357 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25686 -0.73976,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25687,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25687,0.98635 0.18494,0.42125 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.4418,0 0.73976,-0.25686 0.29796,-0.25687 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.652413,0 q 0,-1.80831 0.595923,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.60619,0.95553 0.60619,2.76384 0,1.79804 -0.60619,2.75357 -0.59592,0.95552 -1.68502,0.95552 -1.0891,0 -1.69529,-0.95552 -0.595923,-0.95553 -0.595923,-2.75357 z m 3.852943,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29797,-0.25686 -0.73977,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25686,0.98635 0.18494,0.42125 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.4418,0 0.73977,-0.25686 0.29796,-0.25687 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.159241,-2.10627 q 0.61647,-0.21577 1.099372,-0.54455 0.482901,-0.33906 0.955528,-0.91443 h 0.472627 v 7.12023 h -0.667842 v -6.10306 q -0.11302,0.1233 -0.297961,0.25687 -0.174666,0.13356 -0.400705,0.26713 -0.226039,0.1233 -0.472627,0.24659 -0.246588,0.11302 -0.493176,0.18494 z M 111.10484,69.95337 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.6953,-0.95553 1.08909,0 1.68501,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75356 -0.59592,0.95553 -1.68501,0.95553 -1.0891,0 -1.6953,-0.95553 -0.59592,-0.95552 -0.59592,-2.75356 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.1713 -0.0719,-0.56509 -0.25686,-0.99662 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25687 -0.73976,-0.25687 -0.45208,0 -0.75004,0.25687 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25687,0.99662 -0.0719,0.55483 -0.0719,1.1713 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25687,0.98635 0.18494,0.42125 0.4829,0.67811 0.29796,0.25687 0.75004,0.25687 0.4418,0 0.73976,-0.25687 0.29796,-0.25686 0.4829,-0.67811 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -5.2241,-0.73977 q 0,2.14737 -1.02745,3.23647 -1.02745,1.07882 -3.00016,1.07882 l -0.0205,-0.55482 q 0.67811,0 1.24321,-0.15412 0.5651,-0.15411 0.97608,-0.47262 0.42125,-0.32879 0.67811,-0.83224 0.26714,-0.51372 0.35961,-1.23294 -0.27741,0.14384 -0.66784,0.25686 -0.39043,0.10275 -0.83224,0.10275 -0.57537,0 -0.97607,-0.17467 -0.40071,-0.18494 -0.6473,-0.4829 -0.24658,-0.29796 -0.3596,-0.68839 -0.11302,-0.39043 -0.11302,-0.81169 0,-0.39043 0.12329,-0.79113 0.12329,-0.40071 0.38016,-0.71922 0.26713,-0.32878 0.65757,-0.53427 0.4007,-0.20549 0.94525,-0.20549 1.11992,0 1.69529,0.79113 0.58565,0.78087 0.58565,2.18847 z m -2.22957,0.84251 q 0.47263,0 0.82196,-0.10274 0.35961,-0.11302 0.66784,-0.25687 0.0103,-0.12329 0.0103,-0.23631 0.0103,-0.11302 0.0103,-0.25686 0,-0.4829 -0.0719,-0.91443 -0.0617,-0.43153 -0.24659,-0.76031 -0.17466,-0.32879 -0.47262,-0.51373 -0.29796,-0.19522 -0.76032,-0.19522 -0.38015,0 -0.64729,0.14385 -0.26714,0.13357 -0.43153,0.35961 -0.16439,0.22603 -0.24659,0.52399 -0.0719,0.29797 -0.0719,0.61647 0,0.81169 0.35961,1.20212 0.36988,0.39043 1.07882,0.39043 z m 0.96439,-18.55707 q 0,-1.80832 0.59592,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.6062,0.95552 0.6062,2.76384 0,1.79803 -0.6062,2.75356 -0.59592,0.95553 -1.68502,0.95553 -1.0891,0 -1.69529,-0.95553 -0.59592,-0.95553 -0.59592,-2.75356 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.1713 -0.0719,-0.56509 -0.25686,-0.99662 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25687 -0.73977,-0.25687 -0.45208,0 -0.75004,0.25687 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99662 -0.0719,0.55483 -0.0719,1.1713 0,0.61647 0.0719,1.18156 0.0822,0.55483 0.25686,0.98636 0.18494,0.42125 0.4829,0.67811 0.29796,0.25687 0.75004,0.25687 0.44181,0 0.73977,-0.25687 0.29796,-0.25686 0.4829,-0.67811 0.18494,-0.43153 0.25686,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -7.3612,3.70909 q -0.50345,0 -0.91443,-0.14384 -0.40071,-0.14384 -0.69867,-0.40071 -0.28769,-0.26713 -0.45208,-0.61647 -0.15411,-0.3596 -0.15411,-0.78086 0,-0.35961 0.10274,-0.64729 0.10275,-0.29796 0.26714,-0.524 0.17466,-0.23632 0.39043,-0.41098 0.22604,-0.18494 0.47263,-0.31851 -0.62675,-0.30824 -0.85279,-0.72949 -0.22604,-0.42126 -0.22604,-0.91443 0,-0.44181 0.15412,-0.80141 0.15412,-0.35961 0.42125,-0.6062 0.27742,-0.25686 0.65757,-0.39043 0.38016,-0.14384 0.83224,-0.14384 0.53427,0 0.9247,0.16439 0.39043,0.15412 0.63702,0.41098 0.25686,0.25686 0.36988,0.58565 0.1233,0.32878 0.1233,0.67811 0,0.33906 -0.10275,0.62675 -0.10274,0.27741 -0.26713,0.51372 -0.1644,0.22604 -0.36989,0.40071 -0.20549,0.17467 -0.4007,0.29796 0.71921,0.30823 1.0069,0.77059 0.29796,0.46235 0.29796,0.97607 0,0.44181 -0.16439,0.81169 -0.15412,0.36988 -0.44181,0.63702 -0.28768,0.25686 -0.69866,0.4007 -0.41098,0.15412 -0.91443,0.15412 z m 1.51035,-1.94188 q 0,-0.4418 -0.17467,-0.71921 -0.16439,-0.27742 -0.4418,-0.45208 -0.26714,-0.17467 -0.61647,-0.27741 -0.33906,-0.10275 -0.68839,-0.21577 -0.524,0.24659 -0.81169,0.66784 -0.28768,0.41098 -0.28768,0.99663 0,0.28769 0.0925,0.53428 0.0925,0.24658 0.27741,0.43152 0.19521,0.18495 0.47262,0.29796 0.28769,0.10275 0.66785,0.10275 0.38015,0 0.65757,-0.10275 0.28768,-0.11301 0.47262,-0.29796 0.19522,-0.18494 0.28769,-0.43152 0.0925,-0.24659 0.0925,-0.53428 z m -2.87686,-3.61662 q 0,0.28768 0.0617,0.524 0.0719,0.23631 0.25686,0.43153 0.18494,0.18494 0.51372,0.34933 0.32879,0.15412 0.86306,0.29796 0.47263,-0.26714 0.75004,-0.65757 0.27741,-0.39043 0.27741,-0.97608 0,-0.23631 -0.0822,-0.46235 -0.0719,-0.22604 -0.23632,-0.4007 -0.15412,-0.18495 -0.41098,-0.28769 -0.25686,-0.11302 -0.62674,-0.11302 -0.33906,0 -0.59592,0.10274 -0.25687,0.10275 -0.43153,0.28769 -0.16439,0.17467 -0.25687,0.41098 -0.0822,0.23631 -0.0822,0.49318 z m -3.2688,-13.0064 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75357 -0.59592,0.95553 -1.68502,0.95553 -1.0891,0 -1.69529,-0.95553 -0.59592,-0.95553 -0.59592,-2.75357 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25686 -0.73977,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25686,0.98635 0.18494,0.42126 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.44181,0 0.73977,-0.25686 0.29796,-0.25686 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -8.460574,3.55498 q 0.06165,-0.85278 0.308235,-1.80831 0.256862,-0.95553 0.61647,-1.84941 0.369882,-0.89388 0.791136,-1.64392 0.431529,-0.75004 0.832235,-1.20212 h -3.637173 v -0.61647 h 4.325565 v 0.59592 q -0.349333,0.42126 -0.770588,1.1302 -0.41098,0.69866 -0.780862,1.58227 -0.369882,0.87333 -0.647294,1.85968 -0.267137,0.98636 -0.328784,1.95216 z M 84.312912,24.12668 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95552 0.606196,2.76384 0,1.79803 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256862,-0.99662 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25687 -0.739764,-0.25687 -0.452078,0 -0.750038,0.25687 -0.297961,0.25686 -0.482902,0.68839 -0.174666,0.43153 -0.256862,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256862,0.98636 0.184941,0.42125 0.482902,0.67811 0.29796,0.25687 0.750038,0.25687 0.441804,0 0.739764,-0.25687 0.297961,-0.25686 0.482902,-0.67811 0.184941,-0.43153 0.256862,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -9.467471,0.72949 q 0,-2.08573 0.996627,-3.16455 1.006901,-1.07882 2.917958,-1.16102 l 0.0411,0.5651 q -0.626744,0.0411 -1.161018,0.19521 -0.524,0.14385 -0.93498,0.46236 -0.41098,0.30823 -0.688392,0.80141 -0.277411,0.49317 -0.380156,1.21239 0.277411,-0.14384 0.667843,-0.24659 0.390431,-0.11302 0.832234,-0.11302 0.575372,0 0.976078,0.18494 0.400705,0.17467 0.647293,0.47263 0.246588,0.29796 0.359608,0.68839 0.113019,0.39043 0.113019,0.82196 0,0.40071 -0.123294,0.80141 -0.123294,0.40071 -0.390431,0.72949 -0.256862,0.31851 -0.657568,0.524 -0.390431,0.20549 -0.934979,0.20549 -1.119921,0 -1.705568,-0.78086 -0.575372,-0.79114 -0.575372,-2.19874 z m 2.229567,-0.86306 q -0.472627,0 -0.832234,0.11302 -0.349334,0.10274 -0.657569,0.24659 -0.02055,0.17466 -0.02055,0.27741 0,0.0925 0,0.23631 0,0.4829 0.06165,0.91443 0.07192,0.43153 0.246588,0.76031 0.184941,0.32879 0.482902,0.524 0.297961,0.18495 0.760313,0.18495 0.380157,0 0.647294,-0.13357 0.267137,-0.14385 0.431529,-0.36989 0.164392,-0.22603 0.236313,-0.52399 0.0822,-0.29797 0.0822,-0.62675 0,-0.82196 -0.369882,-1.21239 -0.359607,-0.39043 -1.068548,-0.39043 z m -14.351934,-3.8563 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95552 -0.595921,-2.75356 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25687 -0.739764,-0.25687 -0.452078,0 -0.750039,0.25687 -0.29796,0.25686 -0.482901,0.68839 -0.174667,0.43153 -0.256863,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256863,0.98635 0.184941,0.42125 0.482901,0.67812 0.297961,0.25686 0.750039,0.25686 0.441804,0 0.739764,-0.25686 0.297961,-0.25687 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -7.803002,3.09262 q 0.513725,0 0.852784,-0.11302 0.349333,-0.12329 0.554823,-0.32878 0.20549,-0.20549 0.287686,-0.47263 0.09247,-0.27741 0.09247,-0.59592 0,-0.41098 -0.133568,-0.73976 -0.133569,-0.32879 -0.472627,-0.55483 -0.339059,-0.22603 -0.914431,-0.33905 -0.575372,-0.1233 -1.458979,-0.1233 0.06165,-0.524 0.102745,-0.95553 0.0411,-0.4418 0.07192,-0.84251 0.03082,-0.41098 0.0411,-0.79113 0.02055,-0.39043 0.03082,-0.80141 h 3.205644 V 17.1572 H 62.26634 q -0.01028,0.19522 -0.03082,0.50345 -0.02055,0.30824 -0.0411,0.63702 -0.02055,0.31851 -0.05137,0.61647 -0.03082,0.29796 -0.05137,0.47263 0.791137,0.0205 1.366509,0.19522 0.575372,0.17466 0.945254,0.47262 0.369882,0.29796 0.544548,0.71922 0.184941,0.42125 0.184941,0.93498 0,0.45208 -0.154117,0.84251 -0.143843,0.39043 -0.452078,0.67811 -0.308235,0.28769 -0.780862,0.45208 -0.472627,0.16439 -1.119921,0.16439 -0.328784,0 -0.61647,-0.0514 -0.277411,-0.0411 -0.50345,-0.10274 -0.215765,-0.0616 -0.369882,-0.1233 -0.154118,-0.0616 -0.226039,-0.10274 l 0.174666,-0.59592 q 0.06165,0.0411 0.20549,0.10274 0.154118,0.0616 0.349333,0.12329 0.20549,0.0514 0.452078,0.0925 0.256863,0.0411 0.534274,0.0411 z M 48.304111,24.7428 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606195,0.95552 0.606195,2.76384 0,1.79803 -0.606195,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256863,-0.99662 -0.184941,-0.43153 -0.482901,-0.6884 -0.297961,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750039,0.25686 -0.29796,0.25687 -0.482901,0.6884 -0.174667,0.43153 -0.256863,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256863,0.98636 0.184941,0.42125 0.482901,0.67811 0.297961,0.25687 0.750039,0.25687 0.441803,0 0.739764,-0.25687 0.29796,-0.25686 0.482901,-0.67811 0.184941,-0.43153 0.256863,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -9.744883,1.21239 q 0.184941,-0.49318 0.513725,-1.10965 0.339059,-0.61647 0.760313,-1.26376 0.421255,-0.6473 0.914431,-1.26377 0.493176,-0.62674 0.996627,-1.14047 h 0.698666 v 4.64408 h 0.883607 v 0.54455 h -0.883607 v 1.9316 H 45.63836 v -1.9316 h -3.226194 z m 3.226194,-0.13357 v -3.89404 q -0.359608,0.36989 -0.72949,0.85279 -0.369882,0.4829 -0.70894,1.0069 -0.328785,0.51372 -0.616471,1.03772 -0.287686,0.524 -0.482901,0.99663 z M 33.735199,36.77669 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95552 0.606196,2.76384 0,1.79803 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256862,-0.99662 -0.184941,-0.43153 -0.482902,-0.6884 -0.29796,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750038,0.25686 -0.297961,0.25687 -0.482902,0.6884 -0.174666,0.43153 -0.256862,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256862,0.98636 0.184941,0.42125 0.482902,0.67811 0.29796,0.25687 0.750038,0.25687 0.441804,0 0.739764,-0.25687 0.297961,-0.25686 0.482902,-0.67811 0.184941,-0.43153 0.256862,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -7.844099,3.09262 q 0.976077,0 1.397332,-0.4007 0.421254,-0.41098 0.421254,-1.09938 0,-0.45207 -0.174666,-0.75003 -0.164392,-0.29797 -0.462353,-0.47263 -0.287686,-0.18494 -0.678117,-0.25686 -0.380156,-0.0822 -0.811686,-0.0822 h -0.102745 v -0.55482 h 0.236314 q 0.277412,0 0.565098,-0.0514 0.29796,-0.0616 0.534274,-0.21576 0.246588,-0.15412 0.400705,-0.41098 0.164392,-0.25686 0.164392,-0.65757 0,-0.33906 -0.113019,-0.57537 -0.11302,-0.24659 -0.308235,-0.39043 -0.184941,-0.14384 -0.441804,-0.20549 -0.246588,-0.0719 -0.523999,-0.0719 -0.554824,0 -0.863059,0.15411 -0.308235,0.15412 -0.50345,0.28769 l -0.287686,-0.524 q 0.102745,-0.0719 0.256862,-0.16439 0.164392,-0.0925 0.380157,-0.17467 0.215764,-0.0822 0.472627,-0.13357 0.267137,-0.0616 0.575372,-0.0616 0.534274,0 0.914431,0.13357 0.390431,0.13356 0.647293,0.38015 0.256863,0.23632 0.380157,0.57537 0.123294,0.32879 0.123294,0.71922 0,0.62674 -0.339059,1.02745 -0.328784,0.39043 -0.852783,0.5651 0.287686,0.0719 0.554823,0.22604 0.277411,0.14384 0.493176,0.38015 0.215764,0.22604 0.349333,0.55483 0.133568,0.32878 0.133568,0.77058 0,0.45208 -0.164392,0.83224 -0.154117,0.38015 -0.472627,0.66784 -0.308235,0.27741 -0.791136,0.4418 -0.482902,0.15412 -1.130195,0.15412 -0.339059,0 -0.626745,-0.0514 -0.277412,-0.0411 -0.493176,-0.10275 -0.215765,-0.0616 -0.369882,-0.12329 -0.143843,-0.0616 -0.215765,-0.10275 l 0.174667,-0.59592 q 0.06165,0.0411 0.20549,0.10275 0.143843,0.0616 0.339058,0.12329 0.20549,0.0514 0.452078,0.0925 0.256863,0.0411 0.554824,0.0411 z m -4.403841,11.68557 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75357 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95553 -0.595921,-2.75357 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43152 -0.482902,-0.68839 -0.297961,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750039,0.25686 -0.29796,0.25687 -0.482901,0.68839 -0.174667,0.43153 -0.256863,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256863,0.98635 0.184941,0.42126 0.482901,0.67812 0.297961,0.25686 0.750039,0.25686 0.441803,0 0.739764,-0.25686 0.297961,-0.25686 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -5.573435,-1.79803 q 0,0.4007 -0.143843,0.76031 -0.143843,0.34933 -0.390431,0.67812 -0.236314,0.32878 -0.544549,0.63702 -0.308235,0.30823 -0.626744,0.61647 -0.267137,0.25686 -0.524,0.524 -0.246588,0.25686 -0.452078,0.52399 -0.195215,0.25687 -0.318509,0.51373 -0.11302,0.24659 -0.11302,0.49318 v 0.0205 h 3.359762 v 0.58565 h -4.099526 q 0,-0.0205 -0.01027,-0.0719 0,-0.0617 0,-0.17467 0,-0.4829 0.174666,-0.89388 0.174667,-0.42125 0.441804,-0.79113 0.277411,-0.36989 0.606195,-0.6884 0.339059,-0.31851 0.647294,-0.61647 0.256862,-0.24658 0.482901,-0.47262 0.236314,-0.23632 0.41098,-0.4829 0.174667,-0.24659 0.277412,-0.524 0.102745,-0.27742 0.102745,-0.6062 0,-0.71921 -0.390431,-1.02745 -0.380157,-0.31851 -0.965803,-0.31851 -0.328784,0 -0.585647,0.0822 -0.256862,0.0822 -0.452078,0.19521 -0.184941,0.10275 -0.318509,0.21577 -0.133569,0.11302 -0.195216,0.17466 l -0.349333,-0.46235 q 0.06165,-0.0719 0.215765,-0.20549 0.164392,-0.14384 0.400705,-0.27741 0.246588,-0.13357 0.565098,-0.22604 0.318509,-0.10275 0.70894,-0.10275 1.037725,0 1.561724,0.51373 0.524,0.50345 0.524,1.40761 z m -1.952104,20.57121 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75357 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75357 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750038,0.25686 -0.297961,0.25686 -0.482902,0.68839 -0.174666,0.43153 -0.256862,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256862,0.98635 0.184941,0.42126 0.482902,0.67812 0.29796,0.25686 0.750038,0.25686 0.441804,0 0.739764,-0.25686 0.297961,-0.25686 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.159236,-2.10627 q 0.61647,-0.21576 1.099372,-0.54455 0.482901,-0.33906 0.955529,-0.91443 h 0.472627 v 7.12023 h -0.667843 v -6.10305 q -0.11302,0.12329 -0.297961,0.25686 -0.174666,0.13357 -0.400705,0.26714 -0.226039,0.12329 -0.472627,0.24658 -0.246588,0.11302 -0.493176,0.18494 z m 6.410751,22.9494 q 0,-1.76694 0.582285,-2.7006 0.582285,-0.93367 1.656501,-0.93367 1.064177,0 1.646462,0.93367 0.592325,0.93366 0.592325,2.7006 0,1.75689 -0.592325,2.69056 -0.582285,0.93366 -1.646462,0.93366 -1.064176,0 -1.656501,-0.93366 -0.582285,-0.93367 -0.582285,-2.69056 z m 3.764775,0 q 0,-0.60237 -0.08032,-1.1445 -0.07028,-0.55216 -0.250985,-0.97382 -0.180709,-0.42165 -0.471852,-0.67264 -0.291143,-0.25098 -0.722837,-0.25098 -0.441733,0 -0.732876,0.25098 -0.291143,0.25099 -0.471852,0.67264 -0.17067,0.42166 -0.250985,0.97382 -0.07028,0.54213 -0.07028,1.1445 0,0.60236 0.07028,1.15453 0.08032,0.54213 0.250985,0.96378 0.180709,0.41162 0.471852,0.6626 0.291143,0.25099 0.732876,0.25099 0.431694,0 0.722837,-0.25099 0.291143,-0.25098 0.471852,-0.6626 0.180709,-0.42165 0.250985,-0.96378 0.08032,-0.55217 0.08032,-1.15453 z"
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'hand',
                          style: { transformOrigin: '50% 66%', transform: speedo2style }
                        },
                        el(
                          Path,
                          {
                            className: 'hidden_hand',
                            d: "m 65.637721,115.20452 2.465998,-44.392119 a 5.1123656,5.1123656 0 0 0 2.646868,-4.472078 5.1123656,5.1123656 0 0 0 -5.112351,-5.11235 5.1123656,5.1123656 0 0 0 -5.112347,5.11235 5.1123656,5.1123656 0 0 0 2.645833,4.477245 z"
                          }
                        ),
                        el(
                          Path,
                          {
                            className: 'hand svg_hand_color2',
                            d: "m 66.145832,17.110049 -2.465998,44.392122 a 5.1123656,5.1123656 0 0 0 -2.646868,4.472078 5.1123656,5.1123656 0 0 0 5.112351,5.11235 5.1123656,5.1123656 0 0 0 5.112347,-5.11235 5.1123656,5.1123656 0 0 0 -2.645833,-4.477245 z"
                          }
                        )
                      )
                    )
                  )
                }
                /**************************************** ROGAL */
                else if(gaugetype === 'rogal'){
                  return el(
                    SVG,
                    {
                      className: 'renee_svg_rogal_icon',
    									viewBox: "0 0 132.29166 110",
                    },
                    el(
                      G,
                      {
                        transform: "translate(0,-164.70833)"
                      },
                      el(
                        Path,
                        {
                          className: 'bgpath svg_bg_color',
                          d: "m 18.52084,262.91319 a 54.992607,54.992607 0 0 1 12.031946,-69.41672 54.992607,54.992607 0 0 1 70.449064,-0.6148 54.992607,54.992607 0 0 1 13.2416,69.19616"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'meter svg_meter_color',
                          d: "m 18.52084,262.91319 a 54.992607,54.992607 0 0 1 12.031946,-69.41672 54.992607,54.992607 0 0 1 70.449064,-0.6148 54.992607,54.992607 0 0 1 13.2416,69.19616",
                          style: { strokeDasharray: rogalstyle }
                        }
                      )
                    )
                  )
                }
              }),
						),
						el ( 'div' , { className: 'renee_wip_form_wrapper' },
							el ( 'form' , { id: 'renee_wip_form', action: '', method: 'post', enctype: 'multipart/form-data' },
								el ( 'span', {}, __( 'Select file(s) to upload: ', 'renee-work-in-progress' ), ),
								el (
									FileUpload,
									{
										id: "renee_wip_upload",
										name: "renee_wip_upload[]",
										accept: ".html",
										icon: "upload",
										multiple: true,
										onChange: changeFile,
									},
								),
								el (
									Button,
									{
										isPrimary: true,
										type: 'submit',
										onClick: fileSubmit,
									},
									__( 'Upload', 'renee-work-in-progress' ),
								),
							),
						),
						el (
							Select,
							{
								className: 'renee_file_select',
								value: selectfile,
								onChange: selectFile,
								options: fileoptions,
							},
						),
						el (
							Button,
							{
								isPrimary: true,
								className: 'renee_refresh_list',
								type: "image",
								url: 'update',
								onClick: getFileList,
							},
							__( 'Refresh list', 'renee-work-in-progress' ),
						),
						el (
							Button,
							{
								isPrimary: true,
								className: 'renee_delete_list',
								onClick: openFilesToDelete,
							},
							__( 'Delete files', 'renee-work-in-progress' ),
						),
						el (
							RichText,
							{
								tagName: 'div',
								className: 'renee_fshortcode_text',
								onChange: onChangeContent2,
								value: fshortcode,
							},
						),
					),
				),
			),
		);
    },

/*********************************************************** SAVE */
    save: function( props ) {

        var percent = props.attributes.percent,
		fshortcode = props.attributes.fshortcode,
    gaugetype = props.attributes.gaugetype,
		polygonstyle = "0, 282",
		polygonstyle2 = (parseFloat(percent) * (282 / 100)) + ", " + (282 - (parseFloat(percent) * (282 / 100))),
    batterystripestyle = '0, 108',
    batterystripestyle2 = (parseFloat(percent)  / 100 * 109) + ', 108',
    speedostyle = '0, 170',
    speedostyle2 = (parseFloat(percent) / 100 * 165) + ', 165',
    speedohandstyle = ("rotate(-89deg)"),
    speedohandstyle2 = ("rotate(" + ((parseFloat(percent) / 100 * 178) - 89) + "deg)"),
    speedo2style = ("rotate(-120deg)"),
    speedo2style2 = ("rotate(" + ((parseFloat(percent) / 100 * 240) - 120) + "deg)"),
    rogalstyle = "0, 230",
    rogalstyle2 = (parseFloat(percent) / 100 * 230) + ", 230";

		return el ( 'div', { className: props.className },
			el ('div', { className: 'renee_progress_container' },
        el ( function(){return null;} ),
        el ( function(){return null;} ),
        el ( function(){return null;} ),
        el('input',
          {
            className: 'renee_wip_gauge_type',
            type: 'hidden',
            value: gaugetype,
          }
        ),
				el ('div', { className: 'renee_progress_outer' },
					el ('div', { className: 'renee_progress_inner' },
						el ('div', { className: 'renee_progress_icon renee_progress_icon_' + gaugetype },
							el (
								'input',
								{
									className: 'renee_wip_hidden_percent',
									type: 'hidden',
									value: percent
								}
							),
              el(function(){
                if(gaugetype === 'circle' || typeof(gaugetype) === 'undefined'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 282"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: polygonstyle2
      								}
      							)
                  )
                }
                else if(gaugetype === 'battery'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_battery_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 108"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_battery_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: batterystripestyle2
      								}
      							)
                  )
                }
                else if(gaugetype === 'speedometer'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 170"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: speedostyle2
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedohand_gauge hidden_gauge_hand_start',
      									type: 'hidden',
      									value: "rotate(-89deg)"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedohand_gauge hidden_gauge_hand_end',
      									type: 'hidden',
      									value: speedohandstyle2
      								}
      							)
                  )

                }
                else if(gaugetype === 'speedometer2'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo2_gauge hidden_gauge_hand_start',
      									type: 'hidden',
      									value: "rotate(-120deg)"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_speedo2_gauge hidden_gauge_hand_end',
      									type: 'hidden',
      									value: speedo2style2
      								}
      							)
                  )
                }
                else if(gaugetype === 'rogal'){
                  return el(
                    'div',
                    {},
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_rogal_gauge hidden_gauge_meter_start',
      									type: 'hidden',
      									value: "0, 230"
      								}
      							),
                    el (
      								'input',
      								{
      									className: 'renee_wip_hidden_rogal_gauge hidden_gauge_meter_end',
      									type: 'hidden',
      									value: rogalstyle2
      								}
      							)
                  )
                }
              }),
							el (
								RichText.Content,
								{
									tagName: 'p',
									className: 'renee_progress_text ' + 'renee_progress_text_' + gaugetype,
									value: percent,
								},
							),
              el(function(){
                /************************************************ CIRCLE */
                if(gaugetype === 'circle' || typeof(gaugetype) === 'undefined'){
                  return el (
    								SVG,
    								{
    									className: 'renee_svg_icon',
    									viewBox: "-20 -20 140 140",

    								},
                    el(G,{},
                      el (
      									Circle,
      									{
                          className: 'renee_svg_circle2 svg_bg_color',
      										type: "arc",
      										cx: "50",
      										cy: "50",
      										r: "45",
                          style: { strokeDasharray: '282, 0' }
      									},
      								),
                      el (
      									Circle,
      									{
                          className: 'renee_svg_circle3 svg_meter_color',
                          type: "arc",
      										cx: "50",
      										cy: "50",
      										r: "45",
      										style: { strokeDasharray: polygonstyle },
      									},
      								)
      							),
                  );
                }
                /******************************************** BATTERY */
                else if(gaugetype === 'battery'){
                  return el (
    								SVG,
    								{
    									className: 'renee_svg_battery_icon',
    									viewBox: "0 0 132.29166 58.208335",
    								},
                    el(G,{},
                      el (
      									Rect,
      									{
                          y:"5.2916632",
                          x:"5.2916665",
                          height:"47.624996",
                          width:"113.77084",
                          className:"renee_svg_battery_rect1 svg_fill_color svg_edge_color",

      									},
      								),
                      el (
      									Rect,
      									{
                          y:"18.520849",
                          x:"119.0625",
                          height:"21.166641",
                          width:"7.9375",
                          className:"renee_svg_battery_rect2 svg_edge_color svg_edgefill_color",
      									},
      								),
                      el (
      									Path,
      									{
                          className:"renee_svg_battery_path svg_meter_color",
                          d:"M 7.9374999,29.10417 H 116.41667",
                          style: { strokeDasharray: batterystripestyle },
      									},
      								),
                    )
    							);
                }
                /************************************ SPEEDOMETER */
                else if(gaugetype === 'speedometer'){
                  return el(
                    SVG,
    								{
    									className: 'renee_svg_speedometer_icon',
    									viewBox: "0 0 132.29166 68.791668",
    								},
                    el(
                      G, {
                        transform: "translate(0,-228.20833)"
                      },
                      el(
                        Path,
                        {
                          className: 'bg_path svg_bg_color',
                          d: "M 13.229173,294.5343 A 52.921349,52.921349 0 0 1 66.056939,242.22128 52.921349,52.921349 0 0 1 119.0625,294.35414"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'bar_path svg_meter_color',
                          d: "m 13.229173,294.5343 a 52.921349,52.921349 0 0 1 52.7941,-52.31296 52.921349,52.921349 0 0 1 53.038187,52.06547",
                          style: { strokeDasharray: speedostyle },
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'text1 svg_text_color'
                        },
                        /* 1 */
                        el(
                          Path,
                          {
                            d: "m 8.1419516,289.07846 3.3899394,0.22275 q 1.066617,0.0701 1.5305,0.75815 0.454017,0.67681 0.39434,1.58501 -0.05968,0.90821 -0.59974,1.54091 -0.54993,0.62145 -1.616547,0.55136 L 7.8399442,293.5132 q -1.0877376,-0.0715 -1.6085877,-0.69964 -0.5201561,-0.63873 -0.4514579,-1.68423 0.068698,-1.04549 0.6975612,-1.5769 0.629557,-0.54197 1.6644918,-0.47397 z m 3.3306524,0.80219 -3.4744237,-0.2283 q -0.7709208,-0.0507 -1.1915001,0.37777 -0.4198854,0.41787 -0.4684598,1.15711 -0.048574,0.73924 0.3130215,1.20846 0.361596,0.46922 1.1325168,0.51987 l 3.4849843,0.229 q 0.7498,0.0493 1.170379,-0.37916 0.410713,-0.43969 0.457206,-1.14724 0.04719,-0.71812 -0.292595,-1.19651 -0.349647,-0.48965 -1.131129,-0.541 z"
                          }
                        ),
                        /* 2 */
                        el(
                          Path,
                          {
                            d: "m 13.617238,288.00199 -0.484921,0.28508 -6.1505248,-7.2737 0.5051766,-0.3351 z m 0.72893,-5.54934 q 0.353924,0.51952 0.235643,1.14341 -0.118281,0.62388 -0.637799,0.97781 -0.519517,0.35392 -1.143404,0.23564 -0.623886,-0.11828 -0.97781,-0.6378 -0.353924,-0.51952 -0.235643,-1.1434 0.118281,-0.62389 0.637798,-0.97781 0.519517,-0.35393 1.143404,-0.23565 0.623887,0.11828 0.977811,0.6378 z m -0.441358,0.28257 q -0.25029,-0.32752 -0.63502,-0.40046 -0.384731,-0.0729 -0.727133,0.14221 -0.3528,0.21318 -0.435597,0.6499 -0.0828,0.43672 0.167494,0.76424 0.239892,0.32555 0.624622,0.39849 0.38473,0.0729 0.73753,-0.14024 0.342402,-0.21515 0.425199,-0.65187 0.0828,-0.43672 -0.157095,-0.76227 z m -4.8508821,2.06414 q 0.353924,0.51951 0.235643,1.1434 -0.118281,0.62389 -0.6377984,0.97781 -0.5195173,0.35393 -1.143404,0.23564 -0.6238867,-0.11828 -0.9778107,-0.63779 -0.353924,-0.51952 -0.235643,-1.14341 0.118281,-0.62388 0.6377984,-0.97781 0.5195173,-0.35392 1.143404,-0.23564 0.6238867,0.11828 0.9778107,0.6378 z M 8.61257,285.08192 q -0.2502902,-0.32752 -0.6350203,-0.40046 -0.3847301,-0.0729 -0.7271323,0.14222 -0.3528003,0.21318 -0.435597,0.6499 -0.082797,0.43672 0.1674934,0.76424 0.2398921,0.32555 0.6246222,0.39849 0.3847301,0.0729 0.7375304,-0.14024 0.3424022,-0.21516 0.4251989,-0.65188 0.082797,-0.43672 -0.1570953,-0.76227 z"
                          }
                        ),
                        /* 3 */
                        el(
                          Path,
                          {
                            d: "m 28.286148,258.11999 -2.503067,2.74482 -0.41446,-0.37796 -1.19936,-4.7318 q -0.196834,-0.69514 -0.548734,-1.01604 -0.437919,-0.39935 -0.929244,-0.33177 -0.484193,0.0598 -0.769443,0.37256 -0.28525,0.3128 -0.311508,0.71855 -0.02626,0.40575 0.178885,0.79335 l -0.527225,0.26402 q -0.278966,-0.52654 -0.244644,-1.08249 0.03363,-0.5709 0.504295,-1.08702 0.477793,-0.52394 1.148533,-0.59979 0.737675,-0.0864 1.269435,0.3985 0.523939,0.4778 0.788844,1.34959 l 1.111517,4.45118 2.039537,-2.23652 z"
                          }
                        ),
                        /* 4 */
                        el(
                          Path,
                          {
                            d: "m 28.03744,257.11231 0.148484,-0.57112 q 0.853639,0.20389 1.505118,-0.401 0.50412,-0.46807 0.529631,-1.15609 0.02551,-0.68801 -0.442562,-1.19213 -0.468073,-0.50412 -1.156086,-0.52963 -0.688014,-0.0255 -1.192134,0.44256 l -1.116821,1.03696 -2.183577,-2.91169 2.05526,-1.90829 0.396062,0.42656 -1.675231,1.55544 1.484522,1.97215 0.643723,-0.59769 q 0.690257,-0.6409 1.61758,-0.60652 0.927322,0.0344 1.568222,0.72464 0.633698,0.6825 0.599314,1.60983 -0.03438,0.92732 -0.724641,1.56822 -0.418807,0.38886 -0.963353,0.53342 -0.551747,0.1368 -1.093511,0.004 z"
                          }
                        ),
                        /* 5 */
                        el(
                          Path,
                          {
                            d: "m 32.383202,254.27836 -0.549677,-0.11948 0.414885,-9.51648 0.59849,0.0965 z m 4.299894,-3.58294 q -0.09236,0.6218 -0.60247,0.99996 -0.510112,0.37817 -1.131908,0.28581 -0.621795,-0.0924 -0.999964,-0.60247 -0.378169,-0.51011 -0.285809,-1.1319 0.09236,-0.6218 0.602471,-0.99997 0.510111,-0.37817 1.131907,-0.28581 0.621796,0.0924 0.999964,0.60247 0.378169,0.51011 0.285809,1.13191 z m -0.515964,-0.0918 q 0.03827,-0.41043 -0.194937,-0.725 -0.233204,-0.31457 -0.630731,-0.38874 -0.40383,-0.0827 -0.760908,0.18203 -0.357077,0.26472 -0.395344,0.67515 -0.04457,0.40192 0.188635,0.71649 0.233204,0.31457 0.637033,0.39725 0.397527,0.0742 0.754605,-0.19054 0.357078,-0.26472 0.401647,-0.66664 z m -4.964377,-1.77389 q -0.09236,0.6218 -0.602471,0.99997 -0.510111,0.37816 -1.131907,0.2858 -0.621796,-0.0924 -0.999965,-0.60247 -0.378168,-0.51011 -0.285809,-1.1319 0.09236,-0.6218 0.602471,-0.99997 0.510111,-0.37817 1.131907,-0.28581 0.621796,0.0924 0.999965,0.60247 0.378169,0.51011 0.285809,1.13191 z m -0.515964,-0.0918 q 0.03827,-0.41043 -0.194938,-0.725 -0.233204,-0.31456 -0.630731,-0.38874 -0.403829,-0.0827 -0.760907,0.18203 -0.357078,0.26472 -0.395345,0.67515 -0.04457,0.40192 0.188635,0.71649 0.233204,0.31457 0.637034,0.39725 0.397527,0.0742 0.754604,-0.19054 0.357078,-0.26472 0.401648,-0.66664 z"
                          }
                        ),
                        /* 6 */
                        el(
                          Path,
                          {
                            d: "m 59.650314,241.69196 0.469859,-0.35702 q 0.544781,0.6881 1.430818,0.61558 0.685624,-0.0561 1.131121,-0.58104 0.445497,-0.52493 0.389379,-1.21055 -0.05612,-0.68563 -0.581042,-1.13112 -0.524925,-0.4455 -1.210549,-0.38938 l -1.51892,0.12432 0.08446,-3.63852 2.795236,-0.22879 0.04748,0.58015 -2.278381,0.18648 -0.05286,2.46787 0.875489,-0.0717 q 0.938777,-0.0768 1.646285,0.52362 0.707507,0.60045 0.784345,1.53923 0.07597,0.92823 -0.524478,1.63573 -0.600452,0.70751 -1.539229,0.78435 -0.569595,0.0466 -1.086938,-0.1765 -0.518206,-0.23368 -0.862087,-0.67275 z"
                          }
                        ),
                        /* 7 */
                        el(
                          Path,
                          {
                            d: "m 69.282315,236.90787 -0.05326,3.39683 q -0.01676,1.06879 -0.68081,1.56644 -0.653302,0.48723 -1.563357,0.47296 -0.910055,-0.0143 -1.568924,-0.52208 -0.648122,-0.51822 -0.631363,-1.58701 l 0.05343,-3.40741 q 0.01709,-1.08995 0.618478,-1.64151 0.61197,-0.55139 1.659591,-0.53496 1.047621,0.0164 1.609759,0.61798 0.57272,0.60172 0.556459,1.63876 z m -0.634942,3.36654 0.05459,-3.48149 q 0.01211,-0.77248 -0.436776,-1.17115 -0.438306,-0.39851 -1.179048,-0.41012 -0.740742,-0.0116 -1.191327,0.37295 -0.450585,0.38456 -0.462697,1.15705 l -0.05476,3.49207 q -0.01178,0.75133 0.437107,1.15 0.459636,0.38825 1.168632,0.39937 0.719578,0.0113 1.180413,-0.35195 0.471583,-0.37366 0.483862,-1.15673 z"
                          }
                        ),
                        /* 8 */
                        el(
                          Path,
                          {
                            d: "m 70.63068,242.32213 -0.309191,-0.46992 6.954009,-6.5098 0.360169,0.48762 z m 5.57906,0.44791 q -0.500992,0.3797 -1.130053,0.29306 -0.629062,-0.0866 -1.008755,-0.58764 -0.379694,-0.50099 -0.293052,-1.13005 0.08664,-0.62906 0.587635,-1.00876 0.500992,-0.37969 1.130053,-0.29305 0.629062,0.0866 1.008755,0.58764 0.379694,0.50099 0.293052,1.13005 -0.08664,0.62906 -0.587635,1.00875 z m -0.304483,-0.42653 q 0.314471,-0.2665 0.3679,-0.65442 0.05343,-0.38792 -0.178731,-0.71903 -0.230716,-0.34159 -0.671059,-0.40224 -0.440343,-0.0607 -0.754813,0.20585 -0.313027,0.25602 -0.366456,0.64394 -0.05343,0.38792 0.177287,0.72951 0.23216,0.33111 0.672503,0.39176 0.440343,0.0606 0.753369,-0.19537 z m -2.306336,-4.74052 q -0.500992,0.37969 -1.130053,0.29305 -0.629062,-0.0866 -1.008755,-0.58763 -0.379694,-0.501 -0.293052,-1.13006 0.08664,-0.62906 0.587635,-1.00875 0.500992,-0.37969 1.130053,-0.29305 0.629062,0.0866 1.008755,0.58763 0.379694,0.50099 0.293052,1.13006 -0.08664,0.62906 -0.587635,1.00875 z m -0.304483,-0.42653 q 0.314471,-0.26651 0.3679,-0.65443 0.05343,-0.38792 -0.178731,-0.71902 -0.230716,-0.3416 -0.671059,-0.40224 -0.440343,-0.0606 -0.754813,0.20585 -0.313027,0.25601 -0.366456,0.64394 -0.05343,0.38792 0.177287,0.72951 0.23216,0.3311 0.672503,0.39175 0.440343,0.0606 0.753369,-0.19536 z"
                          }
                        ),
                        /* 9 */
                        el(
                          Path,
                          {
                            d: "m 98.963226,253.60212 -0.504639,-0.4194 6.943263,-3.10552 -2.68598,-2.23228 0.37205,-0.44766 3.20689,2.66521 -0.37204,0.44766 z"
                          }
                        ),
                        /* 10 */
                        el(
                          Path,
                          {
                            d: "m 102.55045,255.47583 0.57681,0.12456 q -0.16816,0.86139 0.46334,1.48711 0.48867,0.48419 1.17715,0.48102 0.68848,-0.003 1.17266,-0.49183 0.48419,-0.48867 0.48102,-1.17715 -0.003,-0.68847 -0.49183,-1.17266 l -1.08258,-1.07266 2.81821,-2.30296 1.99225,1.97399 -0.4097,0.41349 -1.62387,-1.60899 -1.9086,1.56538 0.62398,0.61826 q 0.6691,0.66297 0.67337,1.59092 0.004,0.92795 -0.65869,1.59704 -0.65552,0.66158 -1.58347,0.66585 -0.92795,0.004 -1.59704,-0.65869 -0.40597,-0.40225 -0.57308,-0.9403 -0.15967,-0.54557 -0.0499,-1.09238 z"
                          }
                        ),
                        /* 11 */
                        el(
                          Path,
                          {
                            d: "m 105.5629,259.69978 0.0965,-0.55418 9.52551,0.0176 -0.0714,0.60199 z m 3.75917,4.14672 q -0.62511,-0.0663 -1.02422,-0.56024 -0.39912,-0.4939 -0.33277,-1.119 0.0663,-0.62511 0.56023,-1.02423 0.4939,-0.39911 1.11901,-0.33277 0.6251,0.0663 1.02422,0.56024 0.39911,0.49389 0.33277,1.119 -0.0663,0.62511 -0.56024,1.02422 -0.49389,0.39912 -1.119,0.33278 z m 0.0702,-0.51935 q 0.41167,0.0211 0.71623,-0.225 0.30457,-0.24613 0.36211,-0.6464 0.0658,-0.40693 -0.21362,-0.75265 -0.27938,-0.34573 -0.69105,-0.36684 -0.40343,-0.0278 -0.708,0.21835 -0.30457,0.24612 -0.37033,0.65305 -0.0575,0.40027 0.22185,0.746 0.27938,0.34573 0.68281,0.37349 z m 1.56529,-5.03404 q -0.62511,-0.0663 -1.02423,-0.56024 -0.39911,-0.49389 -0.33277,-1.119 0.0663,-0.62511 0.56024,-1.02422 0.49389,-0.39912 1.119,-0.33278 0.62511,0.0663 1.02422,0.56024 0.39912,0.4939 0.33278,1.119 -0.0663,0.62511 -0.56024,1.02423 -0.4939,0.39911 -1.119,0.33277 z m 0.0702,-0.51934 q 0.41166,0.0211 0.71623,-0.22501 0.30457,-0.24612 0.3621,-0.6464 0.0658,-0.40692 -0.21361,-0.75265 -0.27938,-0.34573 -0.69105,-0.36684 -0.40343,-0.0278 -0.708,0.21835 -0.30457,0.24613 -0.37034,0.65305 -0.0575,0.40028 0.22185,0.746 0.27938,0.34573 0.68282,0.3735 z"
                          }
                        ),
                        /* 12 */
                        el(
                          Path,
                          {
                            d: "m 114.73175,274.11143 -0.24443,-0.53991 6.11258,-2.76734 q -0.21445,-0.0888 -0.43054,-0.25816 -0.20645,-0.17373 -0.31049,-0.30089 l -0.10404,-0.12716 0.45425,-0.35668 q 0.096,0.21211 0.39524,0.43679 0.30358,0.23431 0.63191,0.31802 l 0.24443,0.53991 z"
                          }
                        ),
                        /* 13 */
                        el(
                          Path,
                          {
                            d: "m 121.68059,277.29202 -3.19264,1.1612 q -1.00454,0.36536 -1.70622,-0.0777 -0.68812,-0.43668 -0.99922,-1.29203 -0.3111,-0.85534 -0.0715,-1.65196 0.25312,-0.79028 1.25766,-1.15564 l 3.20258,-1.16482 q 1.02443,-0.37259 1.75414,-0.007 0.73332,0.3752 1.09145,1.35984 0.35813,0.98465 -0.004,1.7243 -0.35802,0.7496 -1.33271,1.10411 z m -3.37171,0.60694 3.27221,-1.19014 q 0.72605,-0.26407 0.9385,-0.82559 0.21606,-0.55157 -0.0372,-1.24779 -0.25322,-0.69621 -0.77315,-0.98009 -0.51993,-0.28388 -1.24598,-0.0198 l -3.28215,1.19375 q -0.70616,0.25684 -0.91861,0.81836 -0.19889,0.56785 0.0435,1.23422 0.24599,0.67633 0.74965,0.97739 0.51721,0.30739 1.25321,0.0397 z"
                          }
                        ),
                        /* 14 */
                        el(
                          Path,
                          {
                            d: "m 123.29816,283.48613 -3.30125,0.80191 q -1.03871,0.25231 -1.68724,-0.2654 -0.63575,-0.50993 -0.85059,-1.39437 -0.21484,-0.88445 0.11113,-1.64977 0.33876,-0.75754 1.37747,-1.00985 l 3.31154,-0.80441 q 1.05928,-0.25731 1.74424,0.18621 0.68746,0.4538 0.93478,1.47195 0.24732,1.01814 -0.1937,1.71338 -0.43852,0.70554 -1.44638,0.95035 z m -3.41808,0.23128 3.38352,-0.82189 q 0.75075,-0.18237 1.02385,-0.71702 0.2756,-0.52437 0.10073,-1.24427 -0.17487,-0.7199 -0.66032,-1.05941 -0.48544,-0.33951 -1.23619,-0.15714 l -3.39381,0.82439 q -0.73018,0.17737 -1.00328,0.71202 -0.26031,0.54244 -0.0929,1.23149 0.16987,0.69933 0.63724,1.05412 0.48015,0.36257 1.24119,0.17771 z"
                          }
                        ),
                        /* 15 */
                        el(
                          Path,
                          {
                            d: "m 118.39339,286.15243 0.37761,-0.41693 8.04269,5.10399 -0.38199,0.47072 z m 0.96227,5.51367 q -0.49297,-0.39005 -0.56649,-1.02078 -0.0735,-0.63073 0.31655,-1.1237 0.39005,-0.49297 1.02078,-0.56648 0.63073,-0.0735 1.1237,0.31654 0.49297,0.39005 0.56648,1.02078 0.0735,0.63073 -0.31654,1.1237 -0.39005,0.49297 -1.02078,0.56648 -0.63074,0.0735 -1.1237,-0.31654 z m 0.33678,-0.40152 q 0.33671,0.23779 0.72566,0.19246 0.38895,-0.0453 0.65143,-0.35296 0.273,-0.30885 0.22154,-0.75036 -0.0515,-0.44151 -0.38816,-0.67929 -0.3262,-0.23902 -0.71515,-0.19368 -0.38895,0.0453 -0.66195,0.35418 -0.26248,0.30762 -0.21103,0.74913 0.0515,0.44151 0.37766,0.68052 z m 4.01266,-3.4191 q -0.49297,-0.39005 -0.56648,-1.02078 -0.0735,-0.63073 0.31654,-1.1237 0.39006,-0.49297 1.02079,-0.56648 0.63073,-0.0735 1.1237,0.31654 0.49297,0.39005 0.56648,1.02078 0.0735,0.63073 -0.31655,1.1237 -0.39005,0.49297 -1.02078,0.56648 -0.63073,0.0735 -1.1237,-0.31654 z m 0.33678,-0.40152 q 0.33671,0.23779 0.72566,0.19245 0.38895,-0.0453 0.65144,-0.35295 0.273,-0.30885 0.22154,-0.75036 -0.0515,-0.44151 -0.38817,-0.6793 -0.32619,-0.23901 -0.71514,-0.19368 -0.38895,0.0453 -0.66195,0.35418 -0.26249,0.30763 -0.21103,0.74914 0.0515,0.44151 0.37765,0.68052 z"
                          }
                        ),
                      ),
                      el(
                        Path,
                        {
                          className: 'line svg_line_color',
                          d:"m 18.52085,294.5343 a 47.629208,47.629208 0 0 1 47.544983,-47.08171 47.629208,47.629208 0 0 1 47.704997,46.91957"
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'text2'
                        },
                        /* 1 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 19.400859,294.19895 0.0026,-0.13051 -3.530594,-0.0709 -0.0026,0.1305 z"
                          }
                        ),
                        /* 2 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 34.114159,261.02468 0.09519,-0.0893 -2.416292,-2.5752 -0.09519,0.0893 z"
                          }
                        ),
                        /* 3 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 66.044206,248.32747 0.130528,-1.1e-4 -0.003,-3.5313 -0.130528,1.1e-4 z"
                          }
                        ),
                        /* 4 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 98.029639,260.88418 0.09534,0.0891 2.411991,-2.57922 -0.0953,-0.0892 z"
                          }
                        ),
                        /* 5 */
                        el(
                          Path,
                          {
                            className: "line svg_line_color svg_text_color",
                            d: "m 112.88864,293.99344 0.003,0.1305 3.53047,-0.0769 -0.003,-0.1305 z"
                          }
                        ),
                      ),
                      el(
                        Path,
                        {
                          className: 'hand svg_hand_color',
                          d: "m 63.499999,294.35415 h 5.291667 l -2.645834,-63.5 z",
                          style: { transform: speedohandstyle }
                        }
                      )
                    )
                  )
                }
                /******************************** SPEEDOMETER 2 */
                else if(gaugetype === 'speedometer2'){
                  return el(
                    SVG,
                    {
                      className: 'renee_svg_speedometer2_icon',
                      viewBox: "0 0 132.29166 100"
                    },
                    el(
                      G,
                      {

                      },
                      el(
                        Path,
                        {
                          className: 'grid  svg_line_color2',
                          d: "m 65.718799,5.5340186 a 1.3448901,1.3448901 0 0 0 -1.337927,1.3531603 l 0.02732,4.8731631 a 1.3448901,1.3448901 0 0 0 1.353685,1.335826 h 0.179652 a 1.3448901,1.3448901 0 0 0 1.337926,-1.353161 L 67.252135,6.8698442 A 1.3448901,1.3448901 0 0 0 65.89845,5.5340186 Z m 23.993907,4.8710624 a 1.3448901,1.3448901 0 0 0 -1.2481,0.808429 l -1.943067,4.468685 a 1.3448901,1.3448901 0 0 0 0.697067,1.76972 l 0.165992,0.07197 a 1.3448901,1.3448901 0 0 0 1.769719,-0.697067 l 1.943592,-4.468686 a 1.3448901,1.3448901 0 0 0 -0.697592,-1.76972 l -0.165991,-0.07196 a 1.3448901,1.3448901 0 0 0 -0.52162,-0.111362 z m -47.790828,0.267375 a 1.3448901,1.3448901 0 0 0 -0.482222,0.115565 l -0.164415,0.07407 a 1.3448901,1.3448901 0 0 0 -0.67763,1.777074 l 1.994019,4.447674 a 1.3448901,1.3448901 0 0 0 1.777598,0.67553 l 0.163893,-0.07249 A 1.3448901,1.3448901 0 0 0 45.210752,15.9128 l -1.99402,-4.447149 a 1.3448901,1.3448901 0 0 0 -1.294854,-0.793195 z m 67.767802,13.878823 a 1.3448901,1.3448901 0 0 0 -0.94763,0.355625 l -3.57989,3.306732 a 1.3448901,1.3448901 0 0 0 -0.0741,1.900519 l 0.12081,0.132375 a 1.3448901,1.3448901 0 0 0 1.90052,0.07459 l 3.57989,-3.306732 a 1.3448901,1.3448901 0 0 0 0.0762,-1.900519 l -0.12292,-0.130798 a 1.3448901,1.3448901 0 0 0 -0.95289,-0.431793 z m -87.451136,0.486423 a 1.3448901,1.3448901 0 0 0 -1.045338,0.441248 l -0.120818,0.135001 a 1.3448901,1.3448901 0 0 0 0.09771,1.898417 l 3.617182,3.26576 a 1.3448901,1.3448901 0 0 0 1.898416,-0.0956 l 0.120818,-0.135 a 1.3448901,1.3448901 0 0 0 -0.0956,-1.898418 l -3.617182,-3.265759 a 1.3448901,1.3448901 0 0 0 -0.85518,-0.345645 z M 122.25999,45.552054 a 1.3448901,1.3448901 0 0 0 -0.135,0.0016 1.3448901,1.3448901 0 0 0 -0.35562,0.06986 l -4.61104,1.57431 a 1.3448901,1.3448901 0 0 0 -0.83995,1.707211 l 0.0588,0.16967 a 1.3448901,1.3448901 0 0 0 1.70669,0.837845 l 4.61314,-1.573784 a 1.3448901,1.3448901 0 0 0 0.83837,-1.70721 l -0.0588,-0.170195 a 1.3448901,1.3448901 0 0 0 -1.21659,-0.909286 z M 9.9025122,46.176629 a 1.3448901,1.3448901 0 0 0 -1.302732,0.92347 l -0.054631,0.172296 a 1.3448901,1.3448901 0 0 0 0.8572817,1.697229 l 4.6289011,1.521255 a 1.3448901,1.3448901 0 0 0 1.697229,-0.857282 l 0.05673,-0.170195 A 1.3448901,1.3448901 0 0 0 14.927486,47.766173 L 10.298585,46.242818 A 1.3448901,1.3448901 0 0 0 9.9025122,46.176629 Z M 120.33216,69.406757 a 1.3448901,1.3448901 0 0 0 -1.32059,1.230766 l -0.0152,0.179652 a 1.3448901,1.3448901 0 0 0 1.22446,1.455068 l 4.8553,0.417609 a 1.3448901,1.3448901 0 0 0 1.45507,-1.224462 l 0.0158,-0.179652 a 1.3448901,1.3448901 0 0 0 -1.22446,-1.455068 l -4.85583,-0.418133 a 1.3448901,1.3448901 0 0 0 -0.13448,-0.0058 z M 11.959043,70.010321 a 1.3448901,1.3448901 0 0 0 -0.09403,0.0063 l -4.8511007,0.47224 A 1.3448901,1.3448901 0 0 0 5.806786,71.957581 L 5.82412,72.137757 A 1.3448901,1.3448901 0 0 0 7.2928451,73.34436 L 12.14237,72.87212 a 1.3448901,1.3448901 0 0 0 1.209229,-1.468726 l -0.01786,-0.178075 A 1.3448901,1.3448901 0 0 0 11.959041,70.01031 Z M 113.87471,90.901309 a 1.3448901,1.3448901 0 0 0 -1.18139,0.697068 l -0.0877,0.158113 a 1.3448901,1.3448901 0 0 0 0.53108,1.826453 l 4.2717,2.345442 a 1.3448901,1.3448901 0 0 0 1.82592,-0.531074 l 0.0862,-0.158113 a 1.3448901,1.3448901 0 0 0 -0.5316,-1.826453 l -4.26959,-2.345442 a 1.3448901,1.3448901 0 0 0 -0.64402,-0.165994 z m -95.218679,0.531074 a 1.3448901,1.3448901 0 0 0 -0.601463,0.171773 l -4.245961,2.392719 a 1.3448901,1.3448901 0 0 0 -0.509536,1.831705 l 0.08772,0.156537 a 1.3448901,1.3448901 0 0 0 1.831704,0.511637 l 4.244385,-2.392718 a 1.3448901,1.3448901 0 0 0 0.511638,-1.831705 l -0.08983,-0.158639 A 1.3448901,1.3448901 0 0 0 18.656031,91.432383 Z M 66.146001,8.5339583 c -13.221314,0 -26.443374,4.5098607 -37.195859,13.5322647 C 7.4451725,40.111044 1.9969703,71.014579 16.033339,95.326292 l 2.328837,-1.344097 C 4.9694775,70.785355 10.160589,41.344362 30.679395,24.127041 c 20.518811,-17.2173307 50.414404,-17.2173307 70.933215,0 20.5188,17.217321 25.70992,46.658314 12.31722,69.855154 l 2.32883,1.344097 C 130.29503,71.014579 124.84484,40.111044 103.33988,22.066223 92.587392,13.043819 79.367315,8.5339583 66.146001,8.5339583 Z"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'numbers svg_text_color2',
                          d: "m 105.40031,91.28369 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.6953,-0.95553 1.08909,0 1.68501,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75357 -0.59592,0.95552 -1.68501,0.95552 -1.0891,0 -1.6953,-0.95552 -0.59592,-0.95553 -0.59592,-2.75357 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25686 -0.73976,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25687,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25687,0.98635 0.18494,0.42125 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.4418,0 0.73976,-0.25686 0.29796,-0.25687 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.652413,0 q 0,-1.80831 0.595923,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.60619,0.95553 0.60619,2.76384 0,1.79804 -0.60619,2.75357 -0.59592,0.95552 -1.68502,0.95552 -1.0891,0 -1.69529,-0.95552 -0.595923,-0.95553 -0.595923,-2.75357 z m 3.852943,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29797,-0.25686 -0.73977,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25686,0.98635 0.18494,0.42125 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.4418,0 0.73977,-0.25686 0.29796,-0.25687 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.159241,-2.10627 q 0.61647,-0.21577 1.099372,-0.54455 0.482901,-0.33906 0.955528,-0.91443 h 0.472627 v 7.12023 h -0.667842 v -6.10306 q -0.11302,0.1233 -0.297961,0.25687 -0.174666,0.13356 -0.400705,0.26713 -0.226039,0.1233 -0.472627,0.24659 -0.246588,0.11302 -0.493176,0.18494 z M 111.10484,69.95337 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.6953,-0.95553 1.08909,0 1.68501,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75356 -0.59592,0.95553 -1.68501,0.95553 -1.0891,0 -1.6953,-0.95553 -0.59592,-0.95552 -0.59592,-2.75356 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.1713 -0.0719,-0.56509 -0.25686,-0.99662 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25687 -0.73976,-0.25687 -0.45208,0 -0.75004,0.25687 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25687,0.99662 -0.0719,0.55483 -0.0719,1.1713 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25687,0.98635 0.18494,0.42125 0.4829,0.67811 0.29796,0.25687 0.75004,0.25687 0.4418,0 0.73976,-0.25687 0.29796,-0.25686 0.4829,-0.67811 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -5.2241,-0.73977 q 0,2.14737 -1.02745,3.23647 -1.02745,1.07882 -3.00016,1.07882 l -0.0205,-0.55482 q 0.67811,0 1.24321,-0.15412 0.5651,-0.15411 0.97608,-0.47262 0.42125,-0.32879 0.67811,-0.83224 0.26714,-0.51372 0.35961,-1.23294 -0.27741,0.14384 -0.66784,0.25686 -0.39043,0.10275 -0.83224,0.10275 -0.57537,0 -0.97607,-0.17467 -0.40071,-0.18494 -0.6473,-0.4829 -0.24658,-0.29796 -0.3596,-0.68839 -0.11302,-0.39043 -0.11302,-0.81169 0,-0.39043 0.12329,-0.79113 0.12329,-0.40071 0.38016,-0.71922 0.26713,-0.32878 0.65757,-0.53427 0.4007,-0.20549 0.94525,-0.20549 1.11992,0 1.69529,0.79113 0.58565,0.78087 0.58565,2.18847 z m -2.22957,0.84251 q 0.47263,0 0.82196,-0.10274 0.35961,-0.11302 0.66784,-0.25687 0.0103,-0.12329 0.0103,-0.23631 0.0103,-0.11302 0.0103,-0.25686 0,-0.4829 -0.0719,-0.91443 -0.0617,-0.43153 -0.24659,-0.76031 -0.17466,-0.32879 -0.47262,-0.51373 -0.29796,-0.19522 -0.76032,-0.19522 -0.38015,0 -0.64729,0.14385 -0.26714,0.13357 -0.43153,0.35961 -0.16439,0.22603 -0.24659,0.52399 -0.0719,0.29797 -0.0719,0.61647 0,0.81169 0.35961,1.20212 0.36988,0.39043 1.07882,0.39043 z m 0.96439,-18.55707 q 0,-1.80832 0.59592,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.6062,0.95552 0.6062,2.76384 0,1.79803 -0.6062,2.75356 -0.59592,0.95553 -1.68502,0.95553 -1.0891,0 -1.69529,-0.95553 -0.59592,-0.95553 -0.59592,-2.75356 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.1713 -0.0719,-0.56509 -0.25686,-0.99662 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25687 -0.73977,-0.25687 -0.45208,0 -0.75004,0.25687 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99662 -0.0719,0.55483 -0.0719,1.1713 0,0.61647 0.0719,1.18156 0.0822,0.55483 0.25686,0.98636 0.18494,0.42125 0.4829,0.67811 0.29796,0.25687 0.75004,0.25687 0.44181,0 0.73977,-0.25687 0.29796,-0.25686 0.4829,-0.67811 0.18494,-0.43153 0.25686,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -7.3612,3.70909 q -0.50345,0 -0.91443,-0.14384 -0.40071,-0.14384 -0.69867,-0.40071 -0.28769,-0.26713 -0.45208,-0.61647 -0.15411,-0.3596 -0.15411,-0.78086 0,-0.35961 0.10274,-0.64729 0.10275,-0.29796 0.26714,-0.524 0.17466,-0.23632 0.39043,-0.41098 0.22604,-0.18494 0.47263,-0.31851 -0.62675,-0.30824 -0.85279,-0.72949 -0.22604,-0.42126 -0.22604,-0.91443 0,-0.44181 0.15412,-0.80141 0.15412,-0.35961 0.42125,-0.6062 0.27742,-0.25686 0.65757,-0.39043 0.38016,-0.14384 0.83224,-0.14384 0.53427,0 0.9247,0.16439 0.39043,0.15412 0.63702,0.41098 0.25686,0.25686 0.36988,0.58565 0.1233,0.32878 0.1233,0.67811 0,0.33906 -0.10275,0.62675 -0.10274,0.27741 -0.26713,0.51372 -0.1644,0.22604 -0.36989,0.40071 -0.20549,0.17467 -0.4007,0.29796 0.71921,0.30823 1.0069,0.77059 0.29796,0.46235 0.29796,0.97607 0,0.44181 -0.16439,0.81169 -0.15412,0.36988 -0.44181,0.63702 -0.28768,0.25686 -0.69866,0.4007 -0.41098,0.15412 -0.91443,0.15412 z m 1.51035,-1.94188 q 0,-0.4418 -0.17467,-0.71921 -0.16439,-0.27742 -0.4418,-0.45208 -0.26714,-0.17467 -0.61647,-0.27741 -0.33906,-0.10275 -0.68839,-0.21577 -0.524,0.24659 -0.81169,0.66784 -0.28768,0.41098 -0.28768,0.99663 0,0.28769 0.0925,0.53428 0.0925,0.24658 0.27741,0.43152 0.19521,0.18495 0.47262,0.29796 0.28769,0.10275 0.66785,0.10275 0.38015,0 0.65757,-0.10275 0.28768,-0.11301 0.47262,-0.29796 0.19522,-0.18494 0.28769,-0.43152 0.0925,-0.24659 0.0925,-0.53428 z m -2.87686,-3.61662 q 0,0.28768 0.0617,0.524 0.0719,0.23631 0.25686,0.43153 0.18494,0.18494 0.51372,0.34933 0.32879,0.15412 0.86306,0.29796 0.47263,-0.26714 0.75004,-0.65757 0.27741,-0.39043 0.27741,-0.97608 0,-0.23631 -0.0822,-0.46235 -0.0719,-0.22604 -0.23632,-0.4007 -0.15412,-0.18495 -0.41098,-0.28769 -0.25686,-0.11302 -0.62674,-0.11302 -0.33906,0 -0.59592,0.10274 -0.25687,0.10275 -0.43153,0.28769 -0.16439,0.17467 -0.25687,0.41098 -0.0822,0.23631 -0.0822,0.49318 z m -3.2688,-13.0064 q 0,-1.80831 0.59592,-2.76384 0.59592,-0.95553 1.69529,-0.95553 1.0891,0 1.68502,0.95553 0.6062,0.95553 0.6062,2.76384 0,1.79804 -0.6062,2.75357 -0.59592,0.95553 -1.68502,0.95553 -1.0891,0 -1.69529,-0.95553 -0.59592,-0.95553 -0.59592,-2.75357 z m 3.85294,0 q 0,-0.61647 -0.0822,-1.17129 -0.0719,-0.5651 -0.25686,-0.99663 -0.18494,-0.43153 -0.4829,-0.68839 -0.29796,-0.25686 -0.73977,-0.25686 -0.45208,0 -0.75004,0.25686 -0.29796,0.25686 -0.4829,0.68839 -0.17467,0.43153 -0.25686,0.99663 -0.0719,0.55482 -0.0719,1.17129 0,0.61647 0.0719,1.18157 0.0822,0.55482 0.25686,0.98635 0.18494,0.42126 0.4829,0.67812 0.29796,0.25686 0.75004,0.25686 0.44181,0 0.73977,-0.25686 0.29796,-0.25686 0.4829,-0.67812 0.18494,-0.43153 0.25686,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -8.460574,3.55498 q 0.06165,-0.85278 0.308235,-1.80831 0.256862,-0.95553 0.61647,-1.84941 0.369882,-0.89388 0.791136,-1.64392 0.431529,-0.75004 0.832235,-1.20212 h -3.637173 v -0.61647 h 4.325565 v 0.59592 q -0.349333,0.42126 -0.770588,1.1302 -0.41098,0.69866 -0.780862,1.58227 -0.369882,0.87333 -0.647294,1.85968 -0.267137,0.98636 -0.328784,1.95216 z M 84.312912,24.12668 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95552 0.606196,2.76384 0,1.79803 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256862,-0.99662 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25687 -0.739764,-0.25687 -0.452078,0 -0.750038,0.25687 -0.297961,0.25686 -0.482902,0.68839 -0.174666,0.43153 -0.256862,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256862,0.98636 0.184941,0.42125 0.482902,0.67811 0.29796,0.25687 0.750038,0.25687 0.441804,0 0.739764,-0.25687 0.297961,-0.25686 0.482902,-0.67811 0.184941,-0.43153 0.256862,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -9.467471,0.72949 q 0,-2.08573 0.996627,-3.16455 1.006901,-1.07882 2.917958,-1.16102 l 0.0411,0.5651 q -0.626744,0.0411 -1.161018,0.19521 -0.524,0.14385 -0.93498,0.46236 -0.41098,0.30823 -0.688392,0.80141 -0.277411,0.49317 -0.380156,1.21239 0.277411,-0.14384 0.667843,-0.24659 0.390431,-0.11302 0.832234,-0.11302 0.575372,0 0.976078,0.18494 0.400705,0.17467 0.647293,0.47263 0.246588,0.29796 0.359608,0.68839 0.113019,0.39043 0.113019,0.82196 0,0.40071 -0.123294,0.80141 -0.123294,0.40071 -0.390431,0.72949 -0.256862,0.31851 -0.657568,0.524 -0.390431,0.20549 -0.934979,0.20549 -1.119921,0 -1.705568,-0.78086 -0.575372,-0.79114 -0.575372,-2.19874 z m 2.229567,-0.86306 q -0.472627,0 -0.832234,0.11302 -0.349334,0.10274 -0.657569,0.24659 -0.02055,0.17466 -0.02055,0.27741 0,0.0925 0,0.23631 0,0.4829 0.06165,0.91443 0.07192,0.43153 0.246588,0.76031 0.184941,0.32879 0.482902,0.524 0.297961,0.18495 0.760313,0.18495 0.380157,0 0.647294,-0.13357 0.267137,-0.14385 0.431529,-0.36989 0.164392,-0.22603 0.236313,-0.52399 0.0822,-0.29797 0.0822,-0.62675 0,-0.82196 -0.369882,-1.21239 -0.359607,-0.39043 -1.068548,-0.39043 z m -14.351934,-3.8563 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95552 -0.595921,-2.75356 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25687 -0.739764,-0.25687 -0.452078,0 -0.750039,0.25687 -0.29796,0.25686 -0.482901,0.68839 -0.174667,0.43153 -0.256863,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256863,0.98635 0.184941,0.42125 0.482901,0.67812 0.297961,0.25686 0.750039,0.25686 0.441804,0 0.739764,-0.25686 0.297961,-0.25687 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -7.803002,3.09262 q 0.513725,0 0.852784,-0.11302 0.349333,-0.12329 0.554823,-0.32878 0.20549,-0.20549 0.287686,-0.47263 0.09247,-0.27741 0.09247,-0.59592 0,-0.41098 -0.133568,-0.73976 -0.133569,-0.32879 -0.472627,-0.55483 -0.339059,-0.22603 -0.914431,-0.33905 -0.575372,-0.1233 -1.458979,-0.1233 0.06165,-0.524 0.102745,-0.95553 0.0411,-0.4418 0.07192,-0.84251 0.03082,-0.41098 0.0411,-0.79113 0.02055,-0.39043 0.03082,-0.80141 h 3.205644 V 17.1572 H 62.26634 q -0.01028,0.19522 -0.03082,0.50345 -0.02055,0.30824 -0.0411,0.63702 -0.02055,0.31851 -0.05137,0.61647 -0.03082,0.29796 -0.05137,0.47263 0.791137,0.0205 1.366509,0.19522 0.575372,0.17466 0.945254,0.47262 0.369882,0.29796 0.544548,0.71922 0.184941,0.42125 0.184941,0.93498 0,0.45208 -0.154117,0.84251 -0.143843,0.39043 -0.452078,0.67811 -0.308235,0.28769 -0.780862,0.45208 -0.472627,0.16439 -1.119921,0.16439 -0.328784,0 -0.61647,-0.0514 -0.277411,-0.0411 -0.50345,-0.10274 -0.215765,-0.0616 -0.369882,-0.1233 -0.154118,-0.0616 -0.226039,-0.10274 l 0.174666,-0.59592 q 0.06165,0.0411 0.20549,0.10274 0.154118,0.0616 0.349333,0.12329 0.20549,0.0514 0.452078,0.0925 0.256863,0.0411 0.534274,0.0411 z M 48.304111,24.7428 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606195,0.95552 0.606195,2.76384 0,1.79803 -0.606195,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256863,-0.99662 -0.184941,-0.43153 -0.482901,-0.6884 -0.297961,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750039,0.25686 -0.29796,0.25687 -0.482901,0.6884 -0.174667,0.43153 -0.256863,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256863,0.98636 0.184941,0.42125 0.482901,0.67811 0.297961,0.25687 0.750039,0.25687 0.441803,0 0.739764,-0.25687 0.29796,-0.25686 0.482901,-0.67811 0.184941,-0.43153 0.256863,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -9.744883,1.21239 q 0.184941,-0.49318 0.513725,-1.10965 0.339059,-0.61647 0.760313,-1.26376 0.421255,-0.6473 0.914431,-1.26377 0.493176,-0.62674 0.996627,-1.14047 h 0.698666 v 4.64408 h 0.883607 v 0.54455 h -0.883607 v 1.9316 H 45.63836 v -1.9316 h -3.226194 z m 3.226194,-0.13357 v -3.89404 q -0.359608,0.36989 -0.72949,0.85279 -0.369882,0.4829 -0.70894,1.0069 -0.328785,0.51372 -0.616471,1.03772 -0.287686,0.524 -0.482901,0.99663 z M 33.735199,36.77669 q 0,-1.80832 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95552 0.606196,2.76384 0,1.79803 -0.606196,2.75356 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75356 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.1713 -0.07192,-0.56509 -0.256862,-0.99662 -0.184941,-0.43153 -0.482902,-0.6884 -0.29796,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750038,0.25686 -0.297961,0.25687 -0.482902,0.6884 -0.174666,0.43153 -0.256862,0.99662 -0.07192,0.55483 -0.07192,1.1713 0,0.61647 0.07192,1.18156 0.0822,0.55483 0.256862,0.98636 0.184941,0.42125 0.482902,0.67811 0.29796,0.25687 0.750038,0.25687 0.441804,0 0.739764,-0.25687 0.297961,-0.25686 0.482902,-0.67811 0.184941,-0.43153 0.256862,-0.98636 0.0822,-0.56509 0.0822,-1.18156 z m -7.844099,3.09262 q 0.976077,0 1.397332,-0.4007 0.421254,-0.41098 0.421254,-1.09938 0,-0.45207 -0.174666,-0.75003 -0.164392,-0.29797 -0.462353,-0.47263 -0.287686,-0.18494 -0.678117,-0.25686 -0.380156,-0.0822 -0.811686,-0.0822 h -0.102745 v -0.55482 h 0.236314 q 0.277412,0 0.565098,-0.0514 0.29796,-0.0616 0.534274,-0.21576 0.246588,-0.15412 0.400705,-0.41098 0.164392,-0.25686 0.164392,-0.65757 0,-0.33906 -0.113019,-0.57537 -0.11302,-0.24659 -0.308235,-0.39043 -0.184941,-0.14384 -0.441804,-0.20549 -0.246588,-0.0719 -0.523999,-0.0719 -0.554824,0 -0.863059,0.15411 -0.308235,0.15412 -0.50345,0.28769 l -0.287686,-0.524 q 0.102745,-0.0719 0.256862,-0.16439 0.164392,-0.0925 0.380157,-0.17467 0.215764,-0.0822 0.472627,-0.13357 0.267137,-0.0616 0.575372,-0.0616 0.534274,0 0.914431,0.13357 0.390431,0.13356 0.647293,0.38015 0.256863,0.23632 0.380157,0.57537 0.123294,0.32879 0.123294,0.71922 0,0.62674 -0.339059,1.02745 -0.328784,0.39043 -0.852783,0.5651 0.287686,0.0719 0.554823,0.22604 0.277411,0.14384 0.493176,0.38015 0.215764,0.22604 0.349333,0.55483 0.133568,0.32878 0.133568,0.77058 0,0.45208 -0.164392,0.83224 -0.154117,0.38015 -0.472627,0.66784 -0.308235,0.27741 -0.791136,0.4418 -0.482902,0.15412 -1.130195,0.15412 -0.339059,0 -0.626745,-0.0514 -0.277412,-0.0411 -0.493176,-0.10275 -0.215765,-0.0616 -0.369882,-0.12329 -0.143843,-0.0616 -0.215765,-0.10275 l 0.174667,-0.59592 q 0.06165,0.0411 0.20549,0.10275 0.143843,0.0616 0.339058,0.12329 0.20549,0.0514 0.452078,0.0925 0.256863,0.0411 0.554824,0.0411 z m -4.403841,11.68557 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695293,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75357 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695293,-0.95553 -0.595921,-0.95553 -0.595921,-2.75357 z m 3.852938,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43152 -0.482902,-0.68839 -0.297961,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750039,0.25686 -0.29796,0.25687 -0.482901,0.68839 -0.174667,0.43153 -0.256863,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256863,0.98635 0.184941,0.42126 0.482901,0.67812 0.297961,0.25686 0.750039,0.25686 0.441803,0 0.739764,-0.25686 0.297961,-0.25686 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -5.573435,-1.79803 q 0,0.4007 -0.143843,0.76031 -0.143843,0.34933 -0.390431,0.67812 -0.236314,0.32878 -0.544549,0.63702 -0.308235,0.30823 -0.626744,0.61647 -0.267137,0.25686 -0.524,0.524 -0.246588,0.25686 -0.452078,0.52399 -0.195215,0.25687 -0.318509,0.51373 -0.11302,0.24659 -0.11302,0.49318 v 0.0205 h 3.359762 v 0.58565 h -4.099526 q 0,-0.0205 -0.01027,-0.0719 0,-0.0617 0,-0.17467 0,-0.4829 0.174666,-0.89388 0.174667,-0.42125 0.441804,-0.79113 0.277411,-0.36989 0.606195,-0.6884 0.339059,-0.31851 0.647294,-0.61647 0.256862,-0.24658 0.482901,-0.47262 0.236314,-0.23632 0.41098,-0.4829 0.174667,-0.24659 0.277412,-0.524 0.102745,-0.27742 0.102745,-0.6062 0,-0.71921 -0.390431,-1.02745 -0.380157,-0.31851 -0.965803,-0.31851 -0.328784,0 -0.585647,0.0822 -0.256862,0.0822 -0.452078,0.19521 -0.184941,0.10275 -0.318509,0.21577 -0.133569,0.11302 -0.195216,0.17466 l -0.349333,-0.46235 q 0.06165,-0.0719 0.215765,-0.20549 0.164392,-0.14384 0.400705,-0.27741 0.246588,-0.13357 0.565098,-0.22604 0.318509,-0.10275 0.70894,-0.10275 1.037725,0 1.561724,0.51373 0.524,0.50345 0.524,1.40761 z m -1.952104,20.57121 q 0,-1.80831 0.595921,-2.76384 0.595921,-0.95553 1.695292,-0.95553 1.089097,0 1.685018,0.95553 0.606196,0.95553 0.606196,2.76384 0,1.79804 -0.606196,2.75357 -0.595921,0.95553 -1.685018,0.95553 -1.089097,0 -1.695292,-0.95553 -0.595921,-0.95553 -0.595921,-2.75357 z m 3.852937,0 q 0,-0.61647 -0.0822,-1.17129 -0.07192,-0.5651 -0.256862,-0.99663 -0.184941,-0.43153 -0.482902,-0.68839 -0.29796,-0.25686 -0.739764,-0.25686 -0.452078,0 -0.750038,0.25686 -0.297961,0.25686 -0.482902,0.68839 -0.174666,0.43153 -0.256862,0.99663 -0.07192,0.55482 -0.07192,1.17129 0,0.61647 0.07192,1.18157 0.0822,0.55482 0.256862,0.98635 0.184941,0.42126 0.482902,0.67812 0.29796,0.25686 0.750038,0.25686 0.441804,0 0.739764,-0.25686 0.297961,-0.25686 0.482902,-0.67812 0.184941,-0.43153 0.256862,-0.98635 0.0822,-0.5651 0.0822,-1.18157 z m -9.159236,-2.10627 q 0.61647,-0.21576 1.099372,-0.54455 0.482901,-0.33906 0.955529,-0.91443 h 0.472627 v 7.12023 h -0.667843 v -6.10305 q -0.11302,0.12329 -0.297961,0.25686 -0.174666,0.13357 -0.400705,0.26714 -0.226039,0.12329 -0.472627,0.24658 -0.246588,0.11302 -0.493176,0.18494 z m 6.410751,22.9494 q 0,-1.76694 0.582285,-2.7006 0.582285,-0.93367 1.656501,-0.93367 1.064177,0 1.646462,0.93367 0.592325,0.93366 0.592325,2.7006 0,1.75689 -0.592325,2.69056 -0.582285,0.93366 -1.646462,0.93366 -1.064176,0 -1.656501,-0.93366 -0.582285,-0.93367 -0.582285,-2.69056 z m 3.764775,0 q 0,-0.60237 -0.08032,-1.1445 -0.07028,-0.55216 -0.250985,-0.97382 -0.180709,-0.42165 -0.471852,-0.67264 -0.291143,-0.25098 -0.722837,-0.25098 -0.441733,0 -0.732876,0.25098 -0.291143,0.25099 -0.471852,0.67264 -0.17067,0.42166 -0.250985,0.97382 -0.07028,0.54213 -0.07028,1.1445 0,0.60236 0.07028,1.15453 0.08032,0.54213 0.250985,0.96378 0.180709,0.41162 0.471852,0.6626 0.291143,0.25099 0.732876,0.25099 0.431694,0 0.722837,-0.25099 0.291143,-0.25098 0.471852,-0.6626 0.180709,-0.42165 0.250985,-0.96378 0.08032,-0.55217 0.08032,-1.15453 z"
                        }
                      ),
                      el(
                        G,
                        {
                          className: 'hand_group',
                          style: { transformOrigin: '50% 66%', transform: speedo2style }
                        },
                        el(
                          Path,
                          {
                            className: 'hidden_hand',
                            d: "m 65.637721,115.20452 2.465998,-44.392119 a 5.1123656,5.1123656 0 0 0 2.646868,-4.472078 5.1123656,5.1123656 0 0 0 -5.112351,-5.11235 5.1123656,5.1123656 0 0 0 -5.112347,5.11235 5.1123656,5.1123656 0 0 0 2.645833,4.477245 z"
                          }
                        ),
                        el(
                          Path,
                          {
                            className: 'hand svg_hand_color2',
                            d: "m 66.145832,17.110049 -2.465998,44.392122 a 5.1123656,5.1123656 0 0 0 -2.646868,4.472078 5.1123656,5.1123656 0 0 0 5.112351,5.11235 5.1123656,5.1123656 0 0 0 5.112347,-5.11235 5.1123656,5.1123656 0 0 0 -2.645833,-4.477245 z"
                          }
                        )
                      )
                    )
                  )
                }
                /**************************************** ROGAL */
                else if(gaugetype === 'rogal'){
                  return el(
                    SVG,
                    {
                      className: 'renee_svg_rogal_icon',
    									viewBox: "0 0 132.29166 110",
                    },
                    el(
                      G,
                      {
                        transform: "translate(0,-164.70833)"
                      },
                      el(
                        Path,
                        {
                          className: 'bgpath svg_bg_color',
                          d: "m 18.52084,262.91319 a 54.992607,54.992607 0 0 1 12.031946,-69.41672 54.992607,54.992607 0 0 1 70.449064,-0.6148 54.992607,54.992607 0 0 1 13.2416,69.19616"
                        }
                      ),
                      el(
                        Path,
                        {
                          className: 'meter svg_meter_color',
                          d: "m 18.52084,262.91319 a 54.992607,54.992607 0 0 1 12.031946,-69.41672 54.992607,54.992607 0 0 1 70.449064,-0.6148 54.992607,54.992607 0 0 1 13.2416,69.19616",
                          style: { strokeDasharray: rogalstyle }
                        }
                      )
                    )
                  )
                }
              }),
						),
						el ( function(){return null;} ),
						el ( function(){return null;} ),
						el ( function(){return null;} ),
						el ( function(){return null;} ),
						el (
							RichText.Content,
							{
								tagName: 'div',
								className: 'renee_fshortcode_text',
								value: fshortcode,
							},
						),
					),
				),
			),
		);
    },
} );
})()

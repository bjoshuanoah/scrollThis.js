var scrollThis = function(cont){
	var start, end;
	cont.hover(function(){
		cont.addClass('scroll_time');
		var move_this = cont.children(':first');
		var height = move_this.innerHeight();
		var cont_height = cont.innerHeight();
		var delta_d = move_this.position().top;
		var max_scroll = (height - cont_height) * (-1);
		var scroller_pct = (cont_height/height) * 100;
		var scroller_height = (cont_height/height) * cont_height;
		var max_scroller_scroll = (cont_height - scroller_height);
		//console.log(scroller_height, max_scroller_scroll)
		var scroller = $('.scroll_bar', cont);
		scroller.css({"height": "" + scroller_pct + "%"});
		cont.on('mousewheel', function(e,d){
			e.preventDefault();
			if (d > 1){d = 1;}
			delta_d = delta_d + d*10;
			// console.log(delta_d);
			if (delta_d < max_scroll){
				delta_d = max_scroll;
				move_this.css({
					"top": delta_d + 'px',
				});
			} else if (delta_d > 0){
				delta_d = 0
				move_this.css({
					"top": delta_d + 'px',
				});
			}
			move_this.css({
				'top': delta_d + "px",
			},0); 
			scroller.css({
				'top': (delta_d/max_scroll)*max_scroller_scroll + "px",
			});

		});
		scroller.draggable({ 
			axis: "y",
			scroll: true,
			containment: "parent", 
			drag: function(e, f){
				var top = f.position.top;
				move_this.css({
					'top': (top * max_scroll)/max_scroller_scroll + "px",
				}); 
			},
			stop: function(){
				setTimeout(function(){
					if (!cont.hasClass('scroll_time')){
						cont.addClass('scroll_time');
					}
				},1);
			}
		});
		return false;
	}, function() {
		cont.removeClass('scroll_time');
	});
	var platform = window.clientInformation.platform;
	var plt = platform.toLowerCase();
	if (plt == 'ipad' || plt == 'ipod' || plt == 'iphone' || plt.indexOf('arm') > -1 || plt == 'blackberry')
	{
		cont.css({'overflow':'auto'});
	}
	cont.append('<div id="scrollbar_container"><div class="scroll_bar" style=""></div></div>')
	cont.after('<style>#scrollbar_container{top:0; right:4px; width:7px; position:absolute; height:100%;} .scroll_bar{top:0; width:7px; border-radius:3px; height:0px; background: #999;opacity:0;cursor:pointer; -webkit-transition: opacity .8s linear; -moz-transition: opacity .8s linear; -o-transition: opacity .8s linear; transition: opacity .8s linear;} .scroll_time .scroll_bar{opacity:1} .scroll_bar:active{background:#777;}</style>')
}
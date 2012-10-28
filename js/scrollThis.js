var scrollThis = function(cont){
	var start, end;
	cont.hover(function(){
		var move_this = cont.children(':first');
		var height = move_this.innerHeight();
		var cont_height = cont.innerHeight();
		var delta_d = move_this.position().top;
		var max_scroll = (height - cont_height) * (-1);
		var scroller_pct = (cont_height/height) * 100;
		var scroller_height = (cont_height/height) * cont_height;
		var max_scroller_scroll = (cont_height - scroller_height);
		//console.log(scroller_height, max_scroller_scroll)
		var scroller = $('#scroll_bar');
		scroller.css({"height": "" + scroller_pct + "%"});
		scroller.fadeIn(800);
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
		$(function () {
			scroller.draggable({ 
				axis: "y",
				scroll: true,
				containment: "parent", 
				drag: function(e, f){
					var top = f.position.top;
					move_this.css({
						'top': (top * max_scroll)/max_scroller_scroll + "px",
					},0); 
				},
				
			});
		});
		return false;
	}, function(cont) {
		var scroller = $('#scroll_bar');
		scroller.delay(1500).fadeOut(800);
	});
	var platform = window.clientInformation.platform;
	var plt = platform.toLowerCase();
	if (plt == 'ipad' || plt == 'ipod' || plt == 'iphone' || plt.indexOf('arm') > -1 || plt == 'blackberry' || plt == 'win32')
	{
		cont.css({'overflow':'auto'});
	}
	cont.append('<div id="scrollbar_container" style="top:0; right:0; width:7px; position:absolute; height:100%;"><div id="scroll_bar" style="top:0; width:7px; border-radius:3px; height:0px; background: #999;display:none;cursor:pointer"></div></div>')
}

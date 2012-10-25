var scrollThis = function(cont){
	var start, end;
	cont.on('hover',function(){
		var move_this = cont.children(':first');
		var height = move_this.innerHeight();
		var cont_height = cont.innerHeight();
		var delta_d = move_this.position().top;
		var max_scroll = (height - cont_height)*(-1);
		var moov = 0;
		cont.on('mousewheel', function(e,d){
			e.preventDefault();
			if (d > 1){
				d = 1;
			}
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
			
		});
		return false;
	});
	var platform = window.clientInformation.platform;
	var plt = platform.toLowerCase();
	if (plt == 'ipad' || plt == 'ipod' || plt == 'iphone' || plt.indexOf('arm') > -1 || plt == 'blackberry' || plt == 'win32')
	{
		cont.css({'overflow':'auto'});
	}
}

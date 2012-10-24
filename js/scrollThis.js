$(document).ready(function() {
	var scrollThis = function(cont) {
		cont.on('hover',function() {
			var move_this = cont.children();
			var height = cont.children().innerHeight();
			var cont_height = cont.innerHeight();
			var delta_d = move_this.position().top;
			var max_scroll = (height - cont_height)*(-1);
			//console.log(height, cont_height, delta_d, max_scroll);
			cont.on('mousewheel', function(e, d){
				console.log(e, d);
				if (d > 1){
					d = 1;
				}
				delta_d = delta_d + d*10;
				if (delta_d < max_scroll){
					delta_d = max_scroll;
					move_this.css({
						"top": delta_d + 'px',
					});
				} else if (delta_d > 0){
					delta_d = 0;
					move_this.css({
						"top": delta_d + 'px',
					});
				}
				move_this.css({
					'top': delta_d + "px",
				},0); 
				e.preventDefault();
			});
			return false;
		});
	}

		
	scrollThis($('#container'));

});
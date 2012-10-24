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
		cont.on('touchstart', function(e){
			e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			 var start = touch.pageY;
			 cont.on('touchmove', function(e){
				e.preventDefault();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				 
				 var move = touch.pageY;
				 var d = (start - move) * -1;
				 //console.log(d, start);

				if (d > 1){
					d = 1;
				} else if (d < -1){
					d = -1;
				}
				delta_d = delta_d + d*5;
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
				return move;
			});
		});
		return false;
	});
}

$(document).ready(function() {

	scrollThis($('#container'));

});
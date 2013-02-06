(function($){
  var scrollThis  = function(container){
    if(!(this instanceof scrollThis)){
      return new scrollThis(container);
    }
    var that = this;
    that.container = container;
    that.scrollbar = $('<div/>').addClass('scrollbar');
    that.track = $('<div/>').addClass('scrollbar_track');
    that.track.append(that.scrollbar);

    that.begin = function (container) {
      var start, 
        end, 
        move_this, 
        height, 
        container_height, 
        delta_d, 
        max_scroll, 
        scroller_pct, 
        scroller_height, 
        max_scroller_scroll;

      if (that.container.children().length < 2){
        that.container.append(that.track);
        that.container
          .before($('<link>')
            .attr({
              href : './css/scrollThis.css',
              rel : 'stylesheet',
              type : 'text/css'
            })
          );
      }

      that.container.hover(function () {

        that.container.addClass('scroll_time');
        move_this = that.container.children(':first');
        height = move_this.innerHeight();
        container_height = that.container.innerHeight();
        delta_d = move_this.position().top;
        max_scroll = (height - container_height) * (-1);
        scroller_pct = (container_height/height) * 100;
        scroller_height = (container_height/height) * container_height;
        max_scroller_scroll = (container_height - scroller_height);
        that.scrollbar.css({
          "height": "" + scroller_pct + "%"
        });
        that.container.on('mousewheel', function (e,d) {
          e.preventDefault();
          if (d > 1){d = 1;}
          delta_d = delta_d + d*10;
          // console.log(delta_d);
          if (delta_d < max_scroll) {
            delta_d = max_scroll;
            move_this.css({
              "top": delta_d + 'px',
            });
          } else if (delta_d > 0) {
            delta_d = 0
            move_this.css({
              "top": delta_d + 'px',
            });
          }
          move_this.css({
            'top': delta_d + "px",
          }); 
          that.scrollbar.css({
            'top': (delta_d / max_scroll) * max_scroller_scroll + "px",
          });

        });
        that.scrollbar.draggable({ 
          axis: "y",
          scroll: true,
          containment: "parent", 
          drag: function (e, f) {
            var top = f.position.top;
            move_this.css({
              'top': (top * max_scroll) / max_scroller_scroll + "px",
            }); 
          },
          stop: function () {
            setTimeout(function () {
              if (!container.hasClass('scroll_time')){
                container.addClass('scroll_time');
              }
            }, 1);
          }
        });
        return false;
      }, function () {
        that.container.removeClass('scroll_time');
      });
      var platform = window.clientInformation.platform;
      var plt = platform.toLowerCase();
      if (plt == 'ipad' || plt == 'ipod' || plt == 'iphone' || plt.indexOf('arm') > -1 || plt == 'blackberry') {
        container.css({'overflow':'auto'});
      }
    }

    that.end = function (id) {
      var move_this, 
        height, 
        container_height, 
        max_scroll, 
        scroller_pct, 
        scroller_height, 
        max_scroller_scroll, 
        scroller;

      var this_id = "message_"+id;
        //console.log(this_id);
        setTimeout(function () {
          scrollThis(container);
          move_this = container.children(':first');
          height = move_this.innerHeight();
          container_height = that.container.innerHeight();
          max_scroll = (height - container_height) * (-1);
          scroller_pct = (container_height/height) * 100;
          scroller_height = (container_height/height) * container_height;
          max_scroller_scroll = (container_height - scroller_height);
          that.scrollbar.css({
            "height": "" + scroller_pct + "%"
          });
          move_this.animate({
            top: max_scroll + 'px',
          });
          scroller.animate({
            'top': max_scroller_scroll + "px",
          });
        }, 500);
    } 
    // init
    that.begin();
  }

  $.fn.scrollThis = function(){
    $(this).each(function(){
      scrollThis($(this));
    });
    return this;
  };

}(jQuery));
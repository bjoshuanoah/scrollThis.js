(function($){
  var scrollThis  = function(container){
    if(!(this instanceof scrollThis)){
      return new scrollThis(container);
    }
    var that = this;
    that.container = container;

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
        max_scroller_scroll, 
        scroller;

      if (that.container.children().length < 2){
        that.container.append('<div id="scrollbar_container"><div class="scroll_bar" style=""></div></div>');
        that.container.after('<style>#scrollbar_container{top:0; right:4px; width:7px; position:absolute; height:100%;} .scroll_bar{top:0; width:7px; border-radius:3px; height:0px; background: #999;opacity:0;cursor:pointer; -webkit-transition: opacity .8s linear; -moz-transition: opacity .8s linear; -o-transition: opacity .8s linear; transition: opacity .8s linear;} .scroll_time .scroll_bar{opacity:1} .scroll_bar:active{background:#777;}</style>');
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
        //console.log(scroller_height, max_scroller_scroll)
        scroller = $('.scroll_bar', container);
        scroller.css({
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
          scroller.css({
            'top': (delta_d / max_scroll) * max_scroller_scroll + "px",
          });

        });
        scroller.draggable({ 
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
        container.removeClass('scroll_time');
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
          scroller = $('.scroll_bar', container);
          scroller.css({
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
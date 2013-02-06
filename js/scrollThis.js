(function($){
  var scrollThis  = function(container){
    if(!(this instanceof scrollThis)){
      return new scrollThis(container);
    }
    var that = this;
    that.container = container;
    that.containerHeight = that.container.innerHeight();
    that.content = that.container.children(':first').addClass('scroll_content');
    that.contentHeight = that.content.innerHeight();
    //scrollbar elements
    that.scrollbar = $('<div/>').addClass('scrollbar');
    that.track = $('<div/>').addClass('scrollbar_track');
    that.track.append(that.scrollbar);
    that.max = (that.contentHeight - that.containerHeight) * (-1);
    //utilities
    that.transform = (function () {
      var body = document.body || document.documentElement,
        style = body.style, property = 'transform', vendor;
      if(typeof style[property] == 'string') {return true; }
      // Tests for vendor specific prop
      vendor = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
      property = property.charAt(0).toUpperCase() + property.substr(1);
      for(var i = 0; i < vendor.length; i += 1) {
        if(typeof style[vendor[i] + property] == 'string'){ 
          return vendor[i] + property; 
        }
      }
      return null;
    }());

    that.css = function(top){
      var obj = {};
      obj[(that.transform) ? that.transform : 'top'] = 
        (that.transform) ? 'translate3d(0,' + top + 'px,0)' : top + 'px';
      return obj;
    };

    that.begin = function (container) {
      var start, 
        end,  
        delta_d,  
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
        delta_d = that.content.position().top;
        scroller_pct = (that.containerHeight/that.contentHeight) * 100;
        scroller_height = (that.containerHeight/that.contentHeight) * that.containerHeight;
        max_scroller_scroll = (that.containerHeight - scroller_height);
        that.scrollbar.css({
          "height": "" + scroller_pct + "%"
        });
        that.container.on('mousewheel', function (e,d) {
          e.preventDefault();
          if (d > 1){d = 1;}
          delta_d = delta_d + d*10;
          // console.log(delta_d);
          if (delta_d < that.max) {
            delta_d = that.max;
            that.content.css(that.css(delta_d));
          } else if (delta_d > 0) {
            delta_d = 0
            that.content.css(that.css(delta_d));
          }
          that.content.css(that.css(delta_d));
          that.scrollbar.css(that.css((delta_d / that.max) * max_scroller_scroll));
        });
        that.scrollbar.draggable({ 
          axis: "y",
          scroll: true,
          containment: "parent", 
          drag: function (e, f) {
            var top = f.position.top;
            that.content.css(that.css((top * that.max) / max_scroller_scroll)); 
          },
          stop: function () {
            setTimeout(function () {
              if (!that.container.hasClass('scroll_time')){
                that.container.addClass('scroll_time');
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

    that.end = function () {
      var scroller_pct, 
        scroller_height, 
        max_scroller_scroll;

        setTimeout(function () {
          scrollThis(container);
          height = that.content.innerHeight();
          container_height = that.container.innerHeight();
          max_scroll = (height - container_height) * (-1);
          scroller_pct = (container_height/height) * 100;
          scroller_height = (container_height/height) * container_height;
          max_scroller_scroll = (container_height - scroller_height);
          that.scrollbar.css({
            "height": "" + scroller_pct + "%"
          });
          that.content.animate({
            top: max_scroll + 'px',
          });
          that.scrollbar.animate({
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
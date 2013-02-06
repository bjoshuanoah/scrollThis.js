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
    that.scrollbarMock = $('<div/>').addClass('scrollbar_mock');
    that.track = $('<div/>').addClass('scrollbar_track');
    that.track.append(that.scrollbar, that.scrollbarMock);
    //calculations
    that.percent = (that.containerHeight/that.contentHeight) * 100;
    that.scrollHeight = (that.containerHeight/that.contentHeight) * that.containerHeight;
    that.max = (that.contentHeight - that.containerHeight) * (-1);
    that.maxScroll = (that.containerHeight - that.scrollHeight);
    that.scrollbar.css({height: that.percent + "%"});
    that.scrollbarMock.css({height: that.percent + "%"});
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

    that.position = function(y){
      var content = (y * that.max) / that.maxScroll
      that.content.css(that.css(content));
      that.scrollbar.css(
        $.extend({}, that.css(y), {top : 0})
      );   
    };

    that.begin = function (container) {
      var delta_d;

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
          that.scrollbar.css(that.css((delta_d / that.max) * that.maxScroll));
          that.scrollbarMock.css({'top' : ((delta_d / that.max) * that.maxScroll) + 'px'})
        });
        that.scrollbarMock.draggable({ 
          axis: "y",
          scroll: true,
          containment: "parent", 
          drag: function (e, f) {
            var top = f.position.top;
            that.position(top);
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
      if ((('ontouchstart' in window) 
        || window.DocumentTouch 
        && document instanceof DocumentTouch) 
        ? true 
        : false) {
          that.container.css({'overflow':'auto'});
      }
    };

    that.end = function () {
      var duration = 500;
        that.container.addClass('scroll_to_end');
        that.content.css(that.css(that.max));
        that.scrollbar.css(that.css(that.maxScroll));
        setTimeout(function(){
          that.container.removeClass('scroll_to_end');
        }, duration);
    };
    // init
    that.begin();
  };

  $.fn.scrollThis = function(flag){
    var arr = []
    $(this).each(function(){
      arr.push(scrollThis($(this)));
    });
    this.scrollers = arr;
    return this;
  };

  $.fn.scrollToEnd = function(){
    if(this.scrollers){
      for(var i = 0; i < this.scrollers.length; i += 1){
        this.scrollers[i].end();
      }
    }else{
      throw 'You need to call scrollThis first'
    }
  };
}(jQuery));
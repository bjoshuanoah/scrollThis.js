scrollThis.js
=============

This jQuery Plugin adds functionality to your site by allowing for user to scroll inside elements on the DOM without native scrollbars. Cross browser compatible, IE8 and up.

Installation: 
  1. Place the scrollThis.js file into your javascript folder, and reference the file after jQuery, jQueryui, and jQuery.mousewheel, but before any other event or function JS files.
  2. Make sure the div you want to scroll is inside container div. scrollThis only scrolls the first element inside of a div, so if you want to scroll a list, make sure to reference the container of the \<ul\>, not the \<ul\> itself.
  3. Load your scrollThis() function. Reference the element using jQuery $('#container') as the argument. Either inside of another JS file, or directly in the markup as follows:
      $(document).ready(function() {
    	  	scrollThis($('#container'));
  		});
  4. Make sure the container div has a set (max)height, and has overflow set to hidden. We will not take care of this for you.
  5. If you have any questions, make sure to check out the example files.
  
Mobile browsers are reverted to an overflow:auto, as mobile browsers generally offer an aesthetically pleasing scrollbar.

Dependencies: jQuery, jQueryui, and jquery.mousewheel(to grab the delta of the mousewheel).

Backlog:
  add draggable scrollbar
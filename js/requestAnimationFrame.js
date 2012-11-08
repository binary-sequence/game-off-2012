/*

  This file is part of 'html5-invasion'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-invasion' is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by the Free
  Software Foundation, either version 3 of the License, or (at your option) any
  later version.

  'html5-invasion' is distributed in the hope that it will be useful, but
  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
  details.

  You should have received a copy of the GNU General Public License along with
  'html5-invasion'. If not, see <http://www.gnu.org/licenses/>.

*/

// Web animation optimized loop.
;(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];

	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
									  window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
	};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) { clearTimeout(id); };
}());

// Show information in the javascript console of the browser.
console.info("Included: requestAnimationFrame.js");

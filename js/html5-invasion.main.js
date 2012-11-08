/*

  This file is part of 'html5-invasion'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-invasion' is free software: you can redistribute it and/or
  modify it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or (at your
  option) any later version.

  'html5-invasion' is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
  Public License for more details.

  You should have received a copy of the GNU General Public License along with
  'html5-invasion'. If not, see <http://www.gnu.org/licenses/>.

*/
;
// GLOBAL VARIABLES.    --------//

	var main_loop;

	var state;
	/*
		STATE:
		license,
		menu,
		game,
		gameover
	*/


// FUNCTIONS.    --------//

	// Update data for each 'fps'.
	function mainLoop() {

	// STATE: LICENSE.

		if( state == 'license' ) {

			// Show information in the javascript console of the browser.
			console.info("Game state: License.");


		}// END if( state == 'license' ).


	// STATE: MENU.

		else if( state == 'menu' ) {

			// Show information in the javascript console of the browser.
			console.info("Game state: Menu.");

		}// END if( state == 'menu' ).


	// STATE: GAME.

		else if( state == 'game' ) {

			// Show information in the javascript console of the browser.
			console.info("Game state: Game.");

		}// END if( state == 'game' ).


	// STATE: GAME OVER.

		else if( state == 'gameover' ) {

			// Show information in the javascript console of the browser.
			console.info("Game state: Game over.");

		}// END if( state == 'gameover' ).

		// Continue the loop.
		main_loop = window.requestAnimationFrame( mainLoop );

	}// END mainLoop.


// EVENTS.    --------//

$(document).ready(function() {

	// Show information in the javascript console of the browser.
	console.info("Event: window.onload");

	// Initial state.
	state = 'license';


	// Event: oncontextmenu.
	window.oncontextmenu = function() {

		// Show information in the javascript console of the browser.
		console.info("Event: window.oncontextmenu");

		// Deactivate context menu.
		return false;

	};// END window.oncontextmenu.


	// Event: window.click.
	$(window).click(function(e) {

		// Show information in the javascript console of the browser.
		console.info("Event: window.click");
		console.info(e);

		if( state == 'license' ) {

			$('#divGameLicense').fadeOut( 1000, function() {
				$('#divGameMenu').fadeIn( 1000, function() {
					state = 'menu';
				});
			});

		}

	});


	// Execute main loop.
	mainLoop();

});// END $(document).ready.

// Show information in the javascript console of the browser.
console.info("Included: html5-invasion.main.js");

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

	// Images container.
	var images_container = new Object();

	// Load images.
	images_container['control_panel'] = new Image();
	images_container['control_panel'].src = 'img/control_panel.png';
	images_container['building'] = new Image();
	images_container['building'].src = 'img/building.png';
	images_container['fire'] = new Image();
	images_container['fire'].src = 'img/fire.png';
	images_container['truck'] = new Image();
	images_container['truck'].src = 'img/truck.png';
	images_container['crane'] = new Image();
	images_container['crane'].src = 'img/crane.png';
	images_container['shot_of_water'] = new Image();
	images_container['shot_of_water'].src = 'img/shot_of_water.png';

	// Elements container.
	var elements_container = new Object();

	// Clouds.
	elements_container['cloud_a'] = {
		x: 1
	};
	elements_container['cloud_b'] = {
		x: 400
	};

	// Buildings.
	elements_container['buildings'] = [
		{
			x: 144-266,
			floors: [
				'safe'
			]
		},
		{
			x: 144,
			floors: [
				'fire',
				'fire'
			]
		},
		{
			x: 144+266,
			floors: [
				'fire',
				'fire'
			]
		},
		{
			x: 144+532,
			floors: [
				'fire',
				'fire'
			]
		},
		{
			x: 144+798,
			floors: [
				'fire',
				'fire'
			]
		},
	];

	// Truck.
	elements_container['truck'] = {
		x: -131,
		is_moving: true
	};

	// Crane.
	elements_container['crane'] = {
		position: 0
	};

	// Shot of water.
	elements_container['shot_of_water'] = {
		show: false
	};

	// Infobox.
	elements_container['infoboxes'] = {
		commit_info: false,
		pull_info: false,
		push_info: false
	};

	// Reference to camera2d object.
	var camera2d = null;

	// Other stuff
	var FPS = 60, main_loop;
	var state;
	/*
		STATE:
		license,
		menu,
		game,
		gameover
	*/
	var temp = Object();


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

			// UPDATE ELEMENTS.

				// Clouds.
				elements_container['cloud_a'].x -= 1;
				elements_container['cloud_b'].x -= 1;
				if ( elements_container['cloud_a'].x <= -275 )
					elements_container['cloud_a'].x = 800;
				if ( elements_container['cloud_b'].x <= -300 )
					elements_container['cloud_b'].x = 800;

				// Truck.
				if( elements_container['truck'].x <= 20 ) {
					// Starting game.
					elements_container['truck'].is_moving = true;
					elements_container['truck'].x += 4;
					temp.starting_game = 'commit';
				} else if( temp.starting_game == 'commit' ) {
					// Starting game.
					elements_container['truck'].is_moving = false;
					elements_container['infoboxes'].commit_info = true;
					temp.starting_game = 'pull';
				}

			// Update canvas graphics.
			camera2d.update();

		}// END if( state == 'game' ).


	// STATE: GAME OVER.

		else if( state == 'gameover' ) {

			// Show information in the javascript console of the browser.
			console.info("Game state: Game over.");

		}// END if( state == 'gameover' ).


	// CONTINUE THE LOOP.

		window.setTimeout(function() {
			main_loop = window.requestAnimationFrame( mainLoop );
		}, 1000/FPS );

	}// END mainLoop.


// EVENTS.    --------//
$(document).ready(function() {

	// Show information in the javascript console of the browser.
	console.info("Event: window.onload");

	// Initial state.
	state = 'license';

	// camara2D object (See /js/html5-invasion.camera2d.js).
	camera2d = new Camera2D(images_container, elements_container);

	// Adjust canvas to fit with the new size of screen.
	camera2d.adjustGameScreen();


	// Event: Window size change.
	$(window).resize(function() {
		// Show information in the javascript console of the browser.
		console.info("Event: window.resize");

		// Adjust canvas to fit with the new size of screen.
		camera2d.adjustGameScreen();
	});


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

		// From game license to game menu.
		if( state == 'license' ) {

			$('#divGameLicense').fadeOut( 1000, function() {
				$('#divGameMenu').fadeIn( 1000, function() {
					state = 'menu';
				});
			});

		}

		// From game menu to game.
		else if( state == 'menu' ) {

			$('#divGameMenu').fadeOut( 1000, function() {
				$('#divGameScreen').fadeIn( 1000, function() {
					state = 'game';
				});
			});

		}

	});


	// Event: liGasPedal.mousedown.
	$('#liGasPedal a').mousedown(function(e){

		// Show information in the javascript console of the browser.
		console.info("Event: liGasPedal.mousedown");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		$(this).parent().addClass('pushed');

	});


	// Event: liGasPedal.mouseup.
	$('#liGasPedal a').mouseup(function(e){

		// Show information in the javascript console of the browser.
		console.info("Event: liGasPedal.mouseup");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		$(this).parent().removeClass('pushed');

	});


	// Event: liCraneLever.mousedown.
	$('#liCraneLever a').mousedown(function(e) {

		// Show information in the javascript console of the browser.
		console.info("Event: liCraneLever.mousedown");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		// Hide infobox pull_info / show infobox push_info.
		elements_container['infoboxes'].pull_info = false;
		elements_container['infoboxes'].push_info = true;

		// Move crane.
		elements_container['crane'].position++;
		if( elements_container['crane'].position > 3 ) {
			elements_container['crane'].position = 0;
		}

		$(this).parent().addClass('pushed');

	});


	// Event: liCraneLever.mouseup.
	$('#liCraneLever a').mouseup(function(e) {

		// Show information in the javascript console of the browser.
		console.info("Event: liCraneLever.mouseup");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		$(this).parent().removeClass('pushed');

	});


	// Event: liCommitButton.mousedown.
	$('#liCommitButton a').mousedown(function(e) {

		// Show information in the javascript console of the browser.
		console.info("Event: liCommitButton.mousedown");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		// Hide infobox commit_info / show infobox pull_info.
		elements_container['infoboxes'].commit_info = false;
		elements_container['infoboxes'].pull_info = true;

		// Show shot of water.
		elements_container['shot_of_water'].show = true;

		// Extinguish fire.
		elements_container['buildings'][1].floors[ elements_container['crane'].position ] = 'safe';

		$(this).parent().addClass('pushed');

	});


	// Event: liCommitButton.mouseup.
	$('#liCommitButton a').mouseup(function(e) {

		// Show information in the javascript console of the browser.
		console.info("Event: liCommitButton.mouseup");
		console.info(e);

		// Cancel default click actions.
		e.preventDefault();

		$(this).parent().removeClass('pushed');

	});


	// Execute main loop.
	mainLoop();

});// END $(document).ready.

// Show information in the javascript console of the browser.
console.info("Included: html5-invasion.main.js");

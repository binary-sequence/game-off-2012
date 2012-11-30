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
	images_container['fork'] = new Image();
	images_container['fork'].src = 'img/fork.png';
	images_container['meteorite'] = new Image();
	images_container['meteorite'].src = 'img/meteorite.png';
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

	// Space Fork One.
	elements_container['forks'] = [];

	// Meteorites.
	elements_container['meteorites'] = [
		{
			x: Math.floor((Math.random()*200-35)),
			y: -Math.floor((Math.random()*100)+25),
			x_speed: -Math.floor((Math.random()*4)+1),
			y_speed: Math.floor((Math.random()*10)+4)
		},
		{
			x: Math.floor((Math.random()*400-35)+200),
			y: -Math.floor((Math.random()*100)+25),
			x_speed: -Math.floor((Math.random()*4)+1),
			y_speed: Math.floor((Math.random()*10)+4)
		},
		{
			x: Math.floor((Math.random()*600-35)+400),
			y: -Math.floor((Math.random()*100)+25),
			x_speed: -Math.floor((Math.random()*4)+1),
			y_speed: Math.floor((Math.random()*10)+4)
		},
		{
			x: Math.floor((Math.random()*800-25)+600),
			y: -Math.floor((Math.random()*100)+25),
			x_speed: -Math.floor((Math.random()*4)+1),
			y_speed: Math.floor((Math.random()*10)+4)
		},
	];

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

	// Extra second.
	elements_container['extra_second'] = {
		show: false,
		seconds: 0
	};

	// Counters.
	elements_container['secured_buildings'] = 0;
	elements_container['countdown_seconds'] = 30;
	elements_container['counted_seconds'] = 0;
	elements_container['clock'] = {
		last: 0,
		now: function() {
			return (new Date()).getTime();
		}
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

				// Meteorites.
				for( i in elements_container['meteorites'] ) {
					elements_container['meteorites'][i].x += elements_container['meteorites'][i].x_speed;
					elements_container['meteorites'][i].y += elements_container['meteorites'][i].y_speed;

					if( elements_container['meteorites'][i].y <= 600 ) {
						elements_container['meteorites'][i].y_speed += 0.01;
					} else {
						elements_container['meteorites'][i].x = Math.floor((Math.random()*200*(i+1)-35)),
						elements_container['meteorites'][i].y = -Math.floor((Math.random()*100)+25),
						elements_container['meteorites'][i].x_speed = -Math.floor((Math.random()*4)+1),
						elements_container['meteorites'][i].y_speed = Math.floor((Math.random()*10)+4)
					}
				}

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

				// Move forward.
				if( temp.move_forward == true ) {
					elements_container['truck'].is_moving = true;
					for(i in elements_container['buildings']) {
						elements_container['buildings'][i].x -= 7;
					}
					if ( elements_container['buildings'][2].x == 144 ) {
						temp.move_forward = false;
						elements_container['truck'].is_moving = false;
						elements_container['buildings'].shift();
						floors = [
							'fire',
							'fire'
						];
						if( elements_container['secured_buildings'] >= 2 )
							floors[2] = 'fire';
						if( elements_container['secured_buildings'] >= 7 )
							floors[3] = 'fire';
						elements_container['buildings'].push({
							x: elements_container['buildings'][3].x + 266,
							floors: floors
						});
					}

					// Space Fork One.
					if( elements_container['secured_buildings'] >= 2 &&
						elements_container['forks'].length == 0 ) {
						elements_container['forks'][0] = {
							x: elements_container['buildings'][3].x + 80,
							y: 130
						};
					}
					if( elements_container['secured_buildings'] >= 7 &&
						elements_container['forks'].length == 1 ) {
						elements_container['forks'][1] = {
							x: elements_container['buildings'][3].x + 80,
							y: 130
						};
					}
					for(i in elements_container['forks']) {
						elements_container['forks'][i].x -= 7;
					}
				}

				// Clock.
				if( elements_container['clock'].now() - elements_container['clock'].last >= 1000 ) {
					elements_container['countdown_seconds'] --;
					elements_container['counted_seconds'] ++;
					$('#divTimeCounter').html( elements_container['countdown_seconds'] );

					elements_container['clock'].last = elements_container['clock'].now();
				}

			// Game over.
			if( elements_container['countdown_seconds'] <= 0 ) {
				state = 'gameover';
				var minutes = Math.floor( elements_container['counted_seconds'] / 60 );
				var seconds = elements_container['counted_seconds'] % 60;
				if( seconds < 10 )
					seconds = '0' + seconds;
				$('#divGameOver p:not(.notice)').html(
					'Time: ' + minutes + ':' + seconds + "<br>\n" +
					'Secured buildings: ' + elements_container['secured_buildings'] + "<br>\n"
				);
				$('#divGameOver').fadeIn( 1000 );
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

	// Start seconds counter.
	$('#divTimeCounter').html( elements_container['countdown_seconds'] );

	// camara2D object (See /js/html5-invasion.camera2d.js).
	camera2d = new Camera2D(images_container, elements_container);

	// Adjust canvas to fit with the new size of screen.
	camera2d.adjustGameScreen();

	// Start camera.
	camera2d.start();


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

		// From gameover to licence.
		if( state == 'gameover' ) {

			// RESET ELEMENTS.

				// Space Fork One.
				elements_container['forks'] = [];

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

				// Counters.
				elements_container['secured_buildings'] = 0;
				elements_container['countdown_seconds'] = 30;
				elements_container['counted_seconds'] = 0;

				temp.move_forward = false;

				$('#divGameScreen').fadeOut(500, function() {
					$('#divGameOver').fadeOut(500, function() {
						$('#divGameLicense').fadeIn(1000, function() {
							$('#canvasGameScreen').attr('width', $('#canvasGameScreen').attr('width') );

							// Start camera.
							camera2d.start();

							// Initial state.
							state = 'license';
						});
					});
				});

		}

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

					elements_container['clock'].last = elements_container['clock'].now();
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

		if( elements_container['infoboxes'].commit_info == false &&
			elements_container['infoboxes'].pull_info == false &&
			elements_container['truck'].is_moving == false &&
			state == 'game' ) {
			if( elements_container['infoboxes'].push_info ) {
				// Hide infobox push_info.
				elements_container['infoboxes'].push_info = false;
			}

			// Move forward.
			temp.move_forward = true;

			$(this).parent().addClass('pushed');
		}

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

		if( elements_container['infoboxes'].commit_info == false &&
			elements_container['infoboxes'].push_info == false &&
			elements_container['truck'].is_moving == false &&
			state == 'game' ) {
			if( elements_container['infoboxes'].pull_info ) {
				// Hide infobox pull_info / show infobox push_info.
				elements_container['infoboxes'].pull_info = false;
				elements_container['infoboxes'].commit_info = true;
			}

			// Move crane.
			elements_container['crane'].position++;
			if( elements_container['crane'].position > 3 ) {
				elements_container['crane'].position = 0;
			}

			$(this).parent().addClass('pushed');
		}

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

		if( elements_container['infoboxes'].pull_info == false &&
			elements_container['infoboxes'].push_info == false &&
			elements_container['truck'].is_moving == false &&
			state == 'game' ) {
			// Hide infobox commit_info / show infobox pull_info.
			if( elements_container['infoboxes'].commit_info ) {
				elements_container['infoboxes'].commit_info = false;
				if( elements_container['crane'].position == 0 ) {
					elements_container['infoboxes'].pull_info = true;
				} else if( elements_container['crane'].position == 1 ) {
					elements_container['infoboxes'].push_info = true;
				}
			}

			// Show shot of water.
			elements_container['shot_of_water'].show = true;

			// Extinguish fire.
			if( elements_container['buildings'][1].floors[ elements_container['crane'].position ] == 'fire' ) {
				elements_container['buildings'][1].floors[ elements_container['crane'].position ] = 'safe';
			}

			// Count secured buildings.
			temp.secured_floors = 0;
			for( i in elements_container['buildings'][1].floors ) {
				if( elements_container['buildings'][1].floors[i] == 'safe' )
					temp.secured_floors ++;
			}
			if( temp.secured_floors == elements_container['buildings'][1].floors.length ) {
				elements_container['secured_buildings'] ++;

				temp.extra_seconds = 2;
				if( temp.secured_floors >= 3 )
					temp.extra_seconds ++;
				if( temp.secured_floors >= 4 )
					temp.extra_seconds ++;
				elements_container['countdown_seconds'] += temp.extra_seconds;
				elements_container['extra_second'].seconds = temp.extra_seconds;				
				elements_container['extra_second'].show = true;
				$('#divTimeCounter').html( elements_container['countdown_seconds'] );
			}

			$(this).parent().addClass('pushed');
		}

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

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


// CLASS Camera2D.

function Camera2D(images, elements) {


// PROPERTIES.    --------//

	// Reference to images container.
	this.img = images;

	// Reference to elements container.
	this.elements = elements;

	// Graphics size.
	this.width = 800; this.height = 600;

	// Reference to canvas element.
	this.canvasGameScreen = document.getElementById('canvasGameScreen');

	// Object that performs drawing operations on canvas 2d.
	this.contextGameScreen = this.canvasGameScreen.getContext('2d');

	// Buffer for double buffering technique.
	this.canvasBufferScreen = document.createElement('canvas');

	// Object that performs drawing operations on buffer.
	this.contextBufferScreen = this.canvasBufferScreen.getContext('2d');

	// Size of canvas in pixels.
	this.canvasGameScreen.width = this.width;
	this.canvasGameScreen.height = this.height;

	// Size of buffer in pixels.
	this.canvasBufferScreen.width = this.canvasGameScreen.width;
	this.canvasBufferScreen.height = this.canvasGameScreen.height;

	// Frames to draw fire.
	this.elements['fire'] = {
		frame: 0,
		count: 0
	}

	// Frames to draw truck and crane.
	this.elements['truck'].frame = 0;
	this.elements['truck'].count = 0;
	this.elements['crane'] = {
		frame: 0,
		count: 0
	};

	// Frames to draw shot of water.
	this.elements['shot_of_water'].frame = 0;
	this.elements['shot_of_water'].count = 0;


// METHODS.    --------//

	// Update graphics.
	this.update = function() {

		// BACKGROUND.    --------//

			// Sky
			this.contextBufferScreen.fillStyle = "#E3E3E3";
			this.contextBufferScreen.fillRect(0, 0, 800, 430);

			// Land
			this.contextBufferScreen.fillStyle = "#755E58";
			this.contextBufferScreen.fillRect(0, 430, 800, 600-430);

			// Control panel box.
			this.contextBufferScreen.drawImage( images['control_panel'], 0, 430+10 );

			// Clouds.
			var x = elements['cloud_a'].x;
			var y = 1;
			this.drawEllipse( x+162.5, y+25, 225, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+200, y+37.5, 200, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+100, y+62.5, 200, 50, 'white', this.contextBufferScreen );
			x = elements['cloud_b'].x;
			this.drawEllipse( x+25, y+12.5, 50, 25, 'white', this.contextBufferScreen );
			this.drawEllipse( x+52.5, y+25, 75, 37.5, 'white', this.contextBufferScreen );
			this.drawEllipse( x+80, y+31.25, 100, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+125, y+37.5, 150, 75, 'white', this.contextBufferScreen );
			this.drawEllipse( x+200, y+50, 150, 75, 'white', this.contextBufferScreen );
			this.drawEllipse( x+270, y+37.5, 200, 75, 'white', this.contextBufferScreen );


		// BUILDINGS.

			for( i in elements['buildings'] ) {
				var x = elements['buildings'][i].x;
				var y = 350;
				this.contextBufferScreen.drawImage( images['building'],
					0, 0, 133, 80,
					x, y, 133, 80
				);
				for( j in elements['buildings'][i].floors ) {
					y -= 80;
					this.contextBufferScreen.drawImage( images['building'],
						133, 0, 133, 80,
						x, y, 133, 80
					);
					if( elements['buildings'][i].floors[j] == 'fire' ) {
						for( var k = 15; k <= (15+33*2); k += 33 ) {
							this.contextBufferScreen.drawImage( images['fire'],
								this.elements['fire'].frame, 0, 25, 26,
								x+k, y+24, 25, 26
							);
							if( this.elements['fire'].frame == 0 ) {
								this.elements['fire'].count++;
								if( this.elements['fire'].count > 4 ) {
									this.elements['fire'].frame = 25;
									this.elements['fire'].count = 0;
								}
							} else {
								this.elements['fire'].count++;
								if( this.elements['fire'].count > 4 ) {
									this.elements['fire'].frame = 0;
									this.elements['fire'].count = 0;
								}
							}
						}
					}
				}
			}


		// TRUCK.

			var x = elements['truck'].x;
			var y = 363;

			// Truck.
			if( this.elements['truck'].is_moving ) {
				if( this.elements['truck'].frame == 0 ) {
					this.elements['truck'].count++;
					if( this.elements['truck'].count > 4 ) {
						this.elements['truck'].frame = 131;
						this.elements['truck'].count = 0;
					}
				} else {
					this.elements['truck'].count++;
					if( this.elements['truck'].count > 4 ) {
						this.elements['truck'].frame = 0;
						this.elements['truck'].count = 0;
					}
				}
			}
			this.contextBufferScreen.drawImage( images['truck'],
				this.elements['truck'].frame, 0, 131, 78,
				x, y, 131, 78
			);

			// Crane.
			this.contextBufferScreen.drawImage( images['crane'],
				this.elements['crane'].frame, 0, 137, 294,
				x, y-294, 137, 294
			);

			// Shot of water.
			if( this.elements['shot_of_water'].show ) {
				this.elements['shot_of_water'].count++;
				if( this.elements['shot_of_water'].count > 4 ) {
					if( this.elements['shot_of_water'].frame == 0 ) {
						this.elements['shot_of_water'].frame = 87;
					} else {
						this.elements['shot_of_water'].frame = 0;
						this.elements['shot_of_water'].show = false;
					}
					this.elements['shot_of_water'].count = 0;
				}
				this.contextBufferScreen.drawImage( images['shot_of_water'],
					this.elements['shot_of_water'].frame, 0, 87, 10,
					x+130, y-49, 87, 10
				);
			}


		// INFOBOXES.

			if( elements['infoboxes'].commit_info ) {
				this.drawBox(4, 4, 462.5, 40, this.contextBufferScreen);
				this.drawText('Push the commit button to shoot water.', 9, 7, this.contextBufferScreen);
			}


		// DUMP BUFFER TO CANVAS.    --------//

			this.contextGameScreen.drawImage( this.canvasBufferScreen, 0, 0 );

	};

	// Adjust canvas to fit with the new size of screen.
	this.adjustGameScreen = function() {
		// Aspect ratio wished.
		var widthToHeight = this.width / this.height; // 800px / 600px

		// Current width and height of window.
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		// Current aspect ratio.
		var newWidthToHeight = newWidth / newHeight;

		// If it is wider than desired...
		if ( newWidthToHeight > widthToHeight ) {
			// Adjust to height.
			newWidth = newHeight * widthToHeight;
			this.canvasGameScreen.style.height = newHeight + 'px';
			this.canvasGameScreen.style.width = newWidth + 'px';
		} else {
		// If it is higher than desired...
			// Adjust to width.
			newHeight = newWidth / widthToHeight;
			this.canvasGameScreen.style.width = newWidth + 'px';
			this.canvasGameScreen.style.height = newHeight + 'px';
		}

		// According to the current size, move canvas to center of screen.
		this.canvasGameScreen.style.marginTop = (-newHeight / 2) + 'px';
		this.canvasGameScreen.style.marginLeft = (-newWidth / 2) + 'px';


		// MOVE divControlPanel. 800px*150px

			var ulControlPanel = document.getElementById('ulControlPanel');
			ulControlPanel.style.width = newWidth + 'px';
			ulControlPanel.style.height = 150 * newWidth / 800 + 'px';
			ulControlPanel.style.marginTop = newHeight/2 - 150*newWidth/800 - 10*newWidth/800 + 'px';
			ulControlPanel.style.marginLeft = this.canvasGameScreen.style.marginLeft;

	};


	// This function draws an ellipse.
	this.drawEllipse = function(centerX, centerY, width, height, color, context) {

		context.beginPath();
		context.moveTo(centerX, centerY - height/2); // A1
		context.bezierCurveTo(
			centerX + width/2, centerY - height/2, // C1
			centerX + width/2, centerY + height/2, // C2
			centerX, centerY + height/2 // A2
		);
		context.bezierCurveTo(
			centerX - width/2, centerY + height/2, // C3
			centerX - width/2, centerY - height/2, // C4
			centerX, centerY - height/2 // A1
		);
		context.fillStyle = color;
		context.fill();
		context.closePath();
	};


	// This function draws text.
	this.drawText = function(text, x, y, context) {
		context.textBaseline = 'top';
		context.font = 'bold 20pt Verdana';
		context.fillStyle = 'black';
		context.fillText( text, x, y );
	};

	this.drawBox = function(x, y, w, h, context) {
		context.beginPath();
		context.rect(x, y, w, h);
		context.fillStyle = 'white';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = 'black';
		context.stroke();
		context.closePath();
	};

	// Show information in the javascript console of the browser.
	console.info("Camera2D object has been created.");
}

// Show information in the javascript console of the browser.
console.info("Included: html5-invasion.camara2d.js");

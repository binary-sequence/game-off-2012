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
			var y = elements['cloud_a'].y;
			this.drawEllipse( x+162.5, y+25, 225, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+200, y+37.5, 200, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+100, y+50+12.5, 200, 50, 'white', this.contextBufferScreen );
			x = elements['cloud_b'].x;
			y = elements['cloud_b'].y;
			this.drawEllipse( x+25, y+12.5, 50, 25, 'white', this.contextBufferScreen );
			this.drawEllipse( x+52.5, y+25, 75, 37.5, 'white', this.contextBufferScreen );
			this.drawEllipse( x+80, y+31.25, 100, 50, 'white', this.contextBufferScreen );
			this.drawEllipse( x+125, y+37.5, 150, 75, 'white', this.contextBufferScreen );
			this.drawEllipse( x+200, y+50, 150, 75, 'white', this.contextBufferScreen );
			this.drawEllipse( x+270, y+37.5, 200, 75, 'white', this.contextBufferScreen );


		// BUILDINGS.

			for(var i = 0; i < elements['buildings'].length; i++) {
				var x = elements['buildings'][i].x;
				var y = 350;
				this.contextBufferScreen.drawImage( images['building'], 0, 0, 133, 80, x, y, 133, 80 );
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

	// Show information in the javascript console of the browser.
	console.info("Camera2D object has been created.");
}

// Show information in the javascript console of the browser.
console.info("Included: html5-invasion.camara2d.js");

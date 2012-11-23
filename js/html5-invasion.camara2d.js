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

			this.contextBufferScreen.fillStyle = "#E3E3E3";
			this.contextBufferScreen.fillRect(0, 0, 800, 430);
			this.contextBufferScreen.fillStyle = "#755E58";
			this.contextBufferScreen.fillRect(0, 430, 800, 600-430);
			this.contextBufferScreen.drawImage( images['control_panel'], 0, 430+10 );


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

			var divControlPanel = document.getElementById('divControlPanel');
			divControlPanel.style.width = newWidth + 'px';
			divControlPanel.style.height = 150 * newWidth / 800 + 'px';
			divControlPanel.style.marginTop = newHeight/2 - 150*newWidth/800 - 10*newWidth/800 + 'px';
			divControlPanel.style.marginLeft = this.canvasGameScreen.style.marginLeft;

	};

	// Show information in the javascript console of the browser.
	console.info("Camera2D object has been created.");
}

// Show information in the javascript console of the browser.
console.info("Included: html5-invasion.camara2d.js");

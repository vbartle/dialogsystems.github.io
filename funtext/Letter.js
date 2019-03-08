function Letter(letter, x, y, z, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD){
	this.letter = letter; // Letter
	this.pos = createVector(x, y, z); // Position
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.res = resolution; // Number of cubes per character (higher is more detailed)
	this.bevelled = bevelled; // Outer two z-layers are smaller to give a 3D effect
	this.font = font;
	this.style = style;
	

	this.create = function() {
		// Create the 2D graphic
		var test = createGraphics(this.res, this.res);
		var array = [];

		// Draw the given character in the centre
		test.textAlign(CENTER, CENTER);
		test.textSize(this.res * 6 / 5)
		test.textFont(font);
		test.textStyle(style);
		test.background(255);
		test.text(this.letter, test.width / 2, test.height / 2);

		// Put all of the non-white pixels in an array as 1s
		test.loadPixels()
		for (var x = 0; x < test.width; x++) {
			array.push([]);
			for (var y = 0; y < test.height; y++) {
				if (test.get(x, y)[0] != 255) {
					array[x].push(1);
				} else {
					array[x].push(0);
				}
			}
		}
		return array;
	}

	this.array = this.create();
	
	this.show = function() {
		for (var z = -depth; z < depth; z++) {
			for (var x = 0; x < this.res; x++) {
				for (var y = 0; y < this.res; y++) {
					push();

					// Move to the cubes to their place
					translate(this.pos.x + (x - this.res / 2) * this.size, this.pos.y + (y - this.res / 2) * this.size, this.pos.z + z * this.size);

					if (this.array[x][y] == 1) {
						if (!this.bevelled) {
							box(this.size, this.size, this.size);
						} else {
							// Checks to see if these points are "surrounded", and if so draw them, giving the inner part to create the 3D effect
							var inner = (x > 0 && y > 0 && x < this.res - 1 && y < this.res - 1);
							var surrounded = (inner && this.array[x - 1][y] && this.array[x + 1][y] && this.array[x][y - 1] && this.array[x][y + 1]);
							var edge = (z == -depth || z == depth - 1);
							
							// Draw the outer layers that are smaller
							if (surrounded && edge) {
								box(this.size, this.size, this.size);
							}
							// Draw only the outer part since the inner part is obscured by the inner layer
							if (!surrounded && !edge) {
								box(this.size, this.size, this.size);
							}
						}
					}

					pop();
				}
			}
		}
	}
}
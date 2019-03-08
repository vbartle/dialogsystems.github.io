function Word(string, x, y, z, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD) {
	this.string = string;
	this.pos = createVector(x, y, z);
	this.depth = depth;
	this.size = size;
	this.res = resolution;
	this.bevelled = bevelled;
	this.font = font;
	this.style = style;
	
	
	this.create = function() {
		var array = [];
		for (var i = 0; i < string.length; i++) {
			// Centre the word
			var mod = string.length/2 - 0.5
			var temp = new Letter(
				string[i], this.pos.x + (i-mod)*this.size*this.res, this.pos.y, this.pos.z, this.depth, this.size, this.res, this.bevelled, this.font, this.style
			)
			array.push(temp)
		}
		this.letters = array;
	}
	
	this.create()
	
	this.show = function() {
		for(var letter of this.letters) {
			letter.show()
		}
	}
	
}
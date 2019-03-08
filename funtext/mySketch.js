/*
TODO:

- Add proper kerning (give a boundary of at least 1 column of "blank" pixels, but no more)

- Use a greedy algorithm to create a series of cuboids instead of making them with cubes


*/




function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	cam = createEasyCam()
	cam.zoom(600)

	string = "ALEXA"

	size = width / 200 // Size of each cube making up the letters
	res = 20 // Number of letters per character
	
	word = new Word(string,0,0,0,3,size,res,true)
	string = ""
	fonts = ["Georgia", "Times New Roman", "Helvetica", "Verdana", "Arial", "Courier New", "Trebuchet MS"];
	styles = ["bold", "normal", "italic"];
	indexF = 0; // Current font
	indexS = 0; // Current style
}

function draw() {
	background(255);

	normalMaterial();
	//ambientMaterial(50);
	noStroke()
	
	word.show()
}


function keyPressed() {
	// Cycle through fonts and styles, type new words followed by enter to display them, SHIFT to toggle bevel
	if(keyCode == RIGHT_ARROW){indexF = indexF == fonts.length-1 ? 0 : indexF+1; word.font = fonts[indexF]; word.create()} else 
	if(keyCode == LEFT_ARROW){indexF = indexF == 0 ? fonts.length-1 : indexF-1; word.font = fonts[indexF]; word.create()} else
	if(keyCode == UP_ARROW){indexS = indexS == styles.length-1 ? 0 : indexS+1; word.style = styles[indexS]; word.create()} else 
	if(keyCode == DOWN_ARROW){indexS = indexS == 0 ? styles.length-1 : indexS-1; word.style = styles[indexS]; word.create()} else 
	if(keyCode == ENTER){
		word = new Word(string,0,0,0,3,size,res,true, fonts[indexF], styles[indexS]);
		string = ""
	} else
	if(keyCode == SHIFT){
		word.bevelled = !word.bevelled;
		word.create()
	}
	else{
		string += key
	}
}

/*

*/
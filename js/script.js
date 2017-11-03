/**
* Script turning a text and a picture into a page displaying the text as a picture.
*/
var text =
  "I’m sorry, but I don’t want to be an emperor. That’s not my business. I don’t want to rule or conquer anyone. I should like to help everyone - if possible - Jew, Gentile - black man - white. We all want to help one another. Human beings are like that. We want to live by each other’s happiness - not by each other’s misery. We don’t want to hate and despise one another. In this world there is room for everyone. And the good earth is rich and can provide for everyone."
+ "The way of life can be free and beautiful, but we have lost the way."
+ "Greed has poisoned men’s souls, has barricaded the world with hate, has goose-stepped us into misery and bloodshed. We have developed speed, but we have shut ourselves in. Machinery that gives abundance has left us in want. Our knowledge has made us cynical. Our cleverness, hard and unkind. We think too much and feel too little. More than machinery we need humanity. More than cleverness we need kindness and gentleness. Without these qualities, life will be violent and all will be lost ..."
+ "The aeroplane and the radio have brought us closer together. The very nature of these inventions cries out for the goodness in men - cries out for universal brotherhood - for the unity of us all. Even now my voice is reaching millions throughout the world - millions of despairing men, women, and little children - victims of a system that makes men torture and imprison innocent people."
+ "To those who can hear me, I say - do not despair. The misery that is now upon us is but the passing of greed - the bitterness of men who fear the way of human progress. The hate of men will pass, and dictators die, and the power they took from the people will return to the people. And so long as men die, liberty will never perish ..."
+ "Soldiers! don’t give yourselves to brutes - men who despise you - enslave you - who regiment your lives - tell you what to do - what to think and what to feel! Who drill you - diet you - treat you like cattle, use you as cannon fodder."
+ "Don’t give yourselves to these unnatural men - machine men with machine minds and machine hearts! You are not machines! You are not cattle! You are men! You have the love of humanity in your hearts! You don’t hate! Only the unloved hate - the unloved and the unnatural! Soldiers! Don’t fight for slavery! Fight for liberty!"
+ "Then - in the name of democracy - let us use that power - let us all unite. Let us fight for a new world - a decent world that will give men a chance to work - that will give youth a future and old age a security. By the promise of these things, brutes have risen to power. But they lie! They do not fulfil that promise. They never will!"
+ "Dictators free themselves but they enslave the people! Now let us fight to fulfil that promise! Let us fight to free the world - to do away with national barriers - to do away with greed, with hate and intolerance. Let us fight for a world of reason, a world where science and progress will lead to all men’s happiness. Soldiers! in the name of democracy, let us all unite!"

var text2 =
"On the question of racial discrimination, the Addis Ababa Conference taught, to those who will learn, this further lesson:"
+ "that until the philosophy which holds one race superior and another inferior is finally and permanently discredited and abandoned;"
+ "that until there are no longer first class and second class citizens of any nation;"
+ "that until the color of a man's skin is of no more significance than the color of his eyes;"
+ "that until the basic human rights are equally guaranteed to all without regard to race;"
+ "that until that day, the dream of lasting peace and world citizenship and the rule of international morality will remain but a fleeting illusion, to be pursued but never attained."
+ "And until the ignoble and unhappy regimes that hold our brothers in Angola, in Mozambique and in South Africa in subhuman bondage have been toppled and destroyed;"
+ "until bigotry and prejudice and malicious and inhuman self-interest have been replaced by understanding and tolerance and good-will;"
+ "until all Africans stand and speak as free beings, equal in the eyes of all men, as they are in the eyes of Heaven;"
+ "until that day, the African continent will not know peace. We Africans will fight, if necessary, and we know that we shall win, as we are confident in the victory of good over evil.";

var text3 =
"We had two bags of grass, seventy-five pellets of mescaline, five sheets of high-powered blotter acid, a saltshaker half-full of cocaine, and a whole galaxy of multi-colored uppers, downers, laughers, screamers..."
+ "Also, a quart of tequila, a quart of rum, a case of beer, a pint of raw ether, and two dozen amyls."
+ "Not that we needed all that for the trip, but once you get into locked a serious drug collection, the tendency is to push it as far as you can."
+ "The only thing that really worried me was the ether. There is nothing in the world more helpless and irresponsible and depraved than a man in the depths of an ether binge, and I knew we'd get into that rotten stuff pretty soon."


var text4 =
"Dog carcass in alley this morning. Tire tread on burst stomach. The city is afraid of me.I have seen it's true face."
+ "The streets are extended gutters and the gutters are full of blood and when the drains finally scab over all the vermin will drown."
+ "The accumulated filth of all their sex and murder will foam up about their waists and and all the whores and politicians will look up and shout \"Save us!\"... and I'll whisper... \"No.\""
+ "They had a choice, all of them. They could have followed in the footsteps of good men like my father, or president Truman."
+ "Decent men who believed in a day's work for a day's pay. Instead they followed the droppings of lechers and communists and didn't realize that the trail led over a precipice until it was too late."
+ "Don't tell me they didn't have a choice. Now the whole world stands on the brink, staring down into bloody Hell, all those liberals and intellectuals and smooth talkers...and all of a sudden nobody can think of anything to say."

var img = new Image();

img.onload = function() {
	var pixels = [];
	var asMatrix = function(data, x, y) {
		// Create a row if needed.
		pixels[x] = pixels[x] || [];
		// Fills array with pixel data.
		pixels[x][y] = data;
	},
	asArray = function(data, x, y) {
		pixels.push({ data : data, x : x, y : y});
	}

	getData(img, asMatrix);

	renderAsHtml(pixels, text4, img.width, img.height, renderCell1);
	//renderAsSvg(pixels, 'abcdefghi', 3, 3);
}

function renderAsSvg(pixels, text, width, height) {
	var scale = 100, w =  width * scale, h = height * scale;

	var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);
  text = svg.append("text");
		// console.log(pixels);
	var g = text.selectAll('tspan')
			.data(pixels)
			.enter()
        //.append('rect')
        .attr('x', function(d) { return d.x * scale})
				.attr('y', function(d, i) { return (d.y + 1) *scale /* for text, y is the BOTTOM of the text */})
				.attr('width', scale)
				.attr('height', scale)
				//.append('text')
				//.attr('style', 'fill:white;')
        .attr('textLength', scale)
        .attr('font-size', scale)
				.text('a')
				.attr('fill','black');

	//svg.data(pixels)

}

function renderCell1(cell, data, char) {
	var value = asLevel(greyscale(data));
	var opacity = "";
	var style = '';
	if (char === ' ') {
		// char = "\u25A0"; // Black square
		char = "\u25CF"; // Black circle
		opacity = "0.6"; // Consider the whitespaces in letters to be around 40%, and account for this when replacing spaces with squares.
		//cell.style = 'font-size : 1px;';
	} //else {
	cell.innerHTML = char;
	cell.className = 'w' + value;
	style = 'color : rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ');';
	if (opacity) {
		style +=  "opacity:" + opacity + ";"
	}
	cell.style = style;
}

function renderCell2(cell, data, char) {
	var value = asLevel(greyscale(data));

	cell.innerHTML = char;
	cell.className = 'w' + value;
	cell.style = 'background-color : rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ');';
}

function renderAsHtml(pixels, text, w, h, renderer) {
	var ctn = document.getElementById('container');
	var char = 0;
	for (var i = 0; i < pixels.length; i++) {
		var row = pixels[i];
		var rowEl = document.createElement('div');
    rowEl.className = 'row';
		for (var j = 0; j < row.length; j++) {
			var cell = document.createElement('span');
			// Generates text cells
			var charValue = text.charAt(char % text.length);
			renderer(cell, row[j], charValue);

			//}
			rowEl.appendChild(cell);
			char++;
			//console.log(value);
		}
		ctn.appendChild(rowEl);
	}
}
function getData(img, cb) {
	var w = img.width, h = img.height;

	var c = document.createElement('canvas');
	c.width  = w;
	c.height = h;

	// Context
	var ctx = c.getContext('2d');
	ctx.drawImage(img,0,0);
	var imgData = ctx.getImageData(0,0,w,h);

	for (var i=0;i<imgData.data.length;i+=4) {
		var data = imgData.data.slice(i, i + 4),
		x = parseInt((i / 4) / w), y = (i / 4) % w;
		cb(data, x, y);
	}
}

function greyscale(data) {
	var grayscalecolor, r = data[0], g = data[1], b = data[2];
	grayscalecolor = 255 - ((r + g + b) / 3);
	return grayscalecolor;
}

function asLevel(color) {
	return parseInt(color * 9 / 255) + 1;
}


//Loads the image
img.src = 'img/rorschach.jpg';

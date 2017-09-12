/**
* Script turning a text and a picture into a page displaying the text as a picture.
*/
var text = "I'm sorry,But I don't want to be an emperor. That's not my business.I don't want to rule or conquer anyone.I should like to help everyone, if possible,Jew, gentile, black man, white.We all want to help one another. Human beings are like that. We want to live by each other'shappiness — not by each other's misery.We don't want to hate and despise one another.In this world there is room for everyone. And the good earth is rich and can provide for everyone.The way of life can be free and beautiful,But we have lost the way.Greed has poisoned men's souls,Has barricaded the world with hate,Has goose-stepped us into misery and bloodshed.We have developed speed, but we have shut ourselves in.Machinery that gives abundance has left us in want.Ourknowledge has made us cynical. Our cleverness, hard and unkind. We think too much and feel too little.More than machinery we need humanity.More than cleverness we need kindness and gentleness.Without these qualities, life will be violent and all will be lost.The aeroplane and the radio have brought us closer together.The very nature of these inventions cries out for the goodness in men, cries out for universal brotherhood, for the unity of us all.Even now my voice is reaching millions throughout the worldMillions of despairing men, women and little childrenVictims of a system that makes men torture and imprison innocent people.To those who can hear me, I say - do not despair.The misery that is now upon us is but the passing of greed- the bitterness of men who fear the way of human progress.The hate of men will pass, and dictators die,And the power they took from the people will return to the peopleAnd so long as men die, liberty will never perish.Soldiers!Don't give yourselves to brutesMen who despise you - enslave youWho regiment your livesTell you what to do - what to think or what to feel!Who drill you, diet you, treat you like cattle, use you as cannon fodder.Don't give yourselves to these unnatural menMachine men with machine minds and machine hearts!You are not machines! You are not cattle!You are men!You have thelove of humanity in your hearts. You don't hate!Only the unloved hate - the unloved and the unnatural!Soldiers!Don't fight for slavery!Fight for liberty!In the 17th Chapter of St. Luke it is written: \"the Kingdom of God is within man\" - not one man, not a group of men,But in all men! In you! You, the people have the powerThe power to create machines. The power to create happiness!You, the people, have the power to make this life free and beautiful, to make this life a wonderful adventure.Then, in the name of democracy, let us use that power! Let us all unite!Let us fight for a new world,A decent world that will give men a chance to work,That will give youth the future and old age a security.By thepromise of these things, brutes have risen to power, but they lie!They do not fulfill their promise; they never will.Dictators free themselves, but they enslave the people!Now, let us fight to fulfill that promise! Let us fight to free the world, To do away with national barriers,To do away with greed, with hate and intolerance.Let us fight for a world of reason, a world where scienceand progress will lead to all men'shappiness.Soldiers! In the name of democracy, let us all unite!";

var img = new Image();

img.onload = function() {

	// Matrix
	var pixels = [];

	getData(img, function(data, x, y) {
		var grayscalecolor, r = data[0], g = data[1], b = data[2];
		grayscalecolor = 255 - ((r + g + b) / 3);
		// Create a row if needed.
		pixels[x] = pixels[x] || [];
		pixels[x][y] = data;
	});

	var ctn = document.getElementById('container');
	var char = 0;
	for (var i = 0; i < pixels.length; i++) {
		var row = pixels[i];
		var rowEl = document.createElement('div');
    rowEl.className = 'row';
		for (var j = 0; j < row.length; j++) {
			var value = asLevel(greyscale(row[j]));
			// Generates text cells
			var cell = document.createElement('span');
			cell.className = 'w' + value;
			cell.innerHTML = text.charAt(char % text.length);
			cell.style = 'color : rgb(' + row[j][0] + ',' + row[j][1] + ',' + row[j][2] + ')';
			rowEl.appendChild(cell);
			char++;
			//console.log(value);
		}
		ctn.appendChild(rowEl);
	}

	console.log(pixels);
	// ctx.putImageData(imgData,0,0);
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

	// Matrix
	var pixels = [];

	// invert colors
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
img.src = 'dictator.jpg';

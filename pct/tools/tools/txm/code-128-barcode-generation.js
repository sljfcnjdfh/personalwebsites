function code128generator(data, canvas, printText) {
	let renderElements = "";
	// 校验位的第一步
	let checkDigitCalculationSum = 0;
	let checkDigitWeight = 0;

	let Code128BarPattern = ["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110010","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100"];
	let stopBar = "1100011101011";
	let startPatternIndex = {"A": 103, "B": 104, "C": 105};

	let code128CombinationArr = [];

	/*
	三个临时数组，
	1是Code a和code b的前半部分，
	2是code a的后半部分，
	3是code b的后半部分。
	因为code a和code b的前半部分相同
	*/
	let tmpArr1 = [" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<", "=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_"];
	let tmpArr2 = ["\u0000","\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007","\u0008","\u0009","\u000A","\u000B","\u000C","\u000D","\u000E","\u000F","\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017","\u0018","\u0019","\u001A","\u001B","\u001C","\u001D","\u001E","\u001F"];
	let tmpArr3 = ["`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","\u007F"];

	let char = {
		"A": tmpArr1.concat(tmpArr2),
		"B": tmpArr1.concat(tmpArr3),
		"C": Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'))
	};

	// 存放当前正在使用的字符集，以便优先从当前字符集查找下一个字符，以此节省Bar code长度
	let currentCharList = "";
	let charIndex = 0;

	for (var i = 0; i < data.length; i++) {
		let currentRenderElements = "";
		let currentForCharList = "";
		let index = 0;
		let currentString = "";
		if ((/\d{4}/.test(data.substr(i, 4)) && currentCharList != "C") || (/\d{2}/.test(data.substr(i, 2)) && (i == 0 || currentCharList == "C"))) {
			currentString = data.substr(i, 2);
			index = char.C.indexOf(currentString);
			currentRenderElements = Code128BarPattern[index];
			currentForCharList = "C";
			i ++;
		} else {
			currentForCharList = currentCharList == "A" ? "A" : "B";
			currentString = data[i];
			index = char[currentForCharList].indexOf(currentString);
			if (index == -1) {
				currentForCharList = currentForCharList == "A" ? "B" : "A";
				index = char[currentForCharList].indexOf(currentString)
			}
			if (index == -1) {
				throw new RangeError("Parameter \"data\" (parameter 1) contains unsupported characters.");
			}
			currentRenderElements = Code128BarPattern[index];
		}
		checkDigitWeight ++;
		let checkDigitCalculationIncrease = index * checkDigitWeight;
		checkDigitCalculationSum += checkDigitCalculationIncrease;
		if (currentForCharList != currentCharList) {
			if (currentCharList != "") {
				checkDigitWeight ++;
			}
			currentCharList = currentForCharList;
			let index = startPatternIndex[currentForCharList]
			renderElements += Code128BarPattern[index];
			let checkDigitCalculationIncrease = index * checkDigitWeight;
			checkDigitCalculationSum += checkDigitCalculationIncrease;
			// console.log("更改编码集至Code %s，编码集起始绘制元%s，增加校验位计算和%s", currentForCharList, Code128BarPattern[startPatternIndex[currentForCharList]], checkDigitCalculationIncrease);
			code128CombinationArr.push(`[${currentForCharList}]`);
		}
		// console.log("当前字符绘制元%s，增加校验位计算和%s", currentRenderElements, checkDigitCalculationIncrease);
		renderElements += currentRenderElements;
		code128CombinationArr.push(currentString);
	}
	let checkDigit = checkDigitCalculationSum % 103;
	renderElements += Code128BarPattern[checkDigit];
	code128CombinationArr.push(`(${checkDigit})`);
	// console.log("校验位%s，绘制元%s", checkDigit, Code128BarPattern[checkDigitCalculationSum % 103]);
	renderElements += stopBar;
	// console.log("条形码结束，终止符绘制元%s", stopBar);

	if (canvas instanceof Element && canvas.tagName == "CANVAS") {
		let width = (renderElements.length * 5) + 50;
		let height = 220;
		let x = 25;
		let step = 5;
		canvas.width = width;
		canvas.height = height;
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(-1, -1, width + 2, height + 2);
		ctx.font = "17px monospace";
		if (printText) {
			let fillStyle = "#f3efb3";
			for (index in code128CombinationArr) {
				const item = code128CombinationArr[index];
				const textX = x + step * 11 * index;
				fillStyle = fillStyle == "#f3efb3" ? "#c3cafc" : "#f3efb3";
				ctx.fillStyle = fillStyle;
				ctx.fillRect(textX, height - 35, step * 11, 30);
				ctx.fillStyle = "#000000";
				ctx.fillText(item, textX, height - 13);
			}
			const textX = x + step * 11 * code128CombinationArr.length;
			fillStyle = fillStyle == "#f3efb3" ? "#c3cafc" : "#f3efb3";
			ctx.fillStyle = fillStyle;
			ctx.fillRect(textX, height - 35, step * 13, 30);
			ctx.fillStyle = "#000000";
			ctx.fillText("[END]", x + step * code128CombinationArr.length * 11, height - 13);
		}
		ctx.fillStyle = "#000000";
		for (i of renderElements) {
			if (i == '1') {
				ctx.fillRect(x, 10, step, height - (printText ? 50 : 20));
			}
			x += step;
		}
	}

	return renderElements;
}
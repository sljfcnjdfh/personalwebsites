


/*强制横屏*/
function horizontalScreen(className) {
	// transform 强制横屏
	function discriminate() {
		var conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (conW > conH) {
			var w = window,
				d = document.documentElement,
				c;
			function setSize() {
				var deviceWidth = d.clientHeight;
				deviceWidth > 750 && (deviceWidth = 750);
				var a = (deviceWidth / 7.5).toFixed(2);
				d.style.fontSize = a + "px";
				var b = parseFloat(w.getComputedStyle(d, null).fontSize).toFixed(2);
			}
			setSize();
			$(className).attr('style', 'width:100vw')
			return
		}
		$(className).css({
			"transform": "rotate(90deg) translate(" + ((conH - conW) / 2) + "px," + ((conH - conW) / 2) + "px)",
			"width": "100vh",
			"height": "100vw",
			"transform-origin": "center center",
			"-webkit-transform-origin": "center center"
		}).show();

		$(".box,.cover,.video-am,.obtain").css({
			"width": "100vh",
			"height": "100vw"
		})

		$(".content").css({
			"left": "18vh",
		})

		$(".video-am .video-js").css({
			"height": "100vw"
		})

		/*$(".fixed-top").css({
			"height": "100vw",
			"width": "100vh"
		})*/

		$(".obt-tips").css({
			"width": "100vh"
		})

	}
	discriminate();
	var c;
	window.addEventListener("resize", function () {
		clearTimeout(c),
			c = setTimeout(discriminate, 300)
	}, !1)
}

$(function () {
	horizontalScreen('body')
})

/*
 * @Author: Jin
 * @Date: 2023-02-21 09:53:18
 * @Description:
 */

// QQ
function setFontSize() {
	var w = window,
		d = document.documentElement,
		c;
	function setSize() {
		var deviceWidth = d.clientWidth;
		deviceWidth > 750 && (deviceWidth = 750);
		var a = (deviceWidth / 7.5).toFixed(2);
		d.style.fontSize = a + "px";
		var b = parseFloat(w.getComputedStyle(d, null).fontSize).toFixed(2);
	}
	setSize();
	w.addEventListener("resize", function () {
		clearTimeout(c),
			c = setTimeout(setSize, 300)
	}, !1)
}

(function () {
	setFontSize();
	var ua = window.navigator.userAgent;
	if (/\sQQ\//i.test(ua)) { setFontSize() }
})();

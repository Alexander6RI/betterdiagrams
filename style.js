canvas.addEventListener("mousemove", getMousePos);

function getMousePos(e) {
	document.getElementById("pos_x").innerText = Math.floor(e.x - canvas.parentElement.offsetLeft + canvas.parentElement.scrollLeft);
	document.getElementById("pos_y").innerText = Math.floor(e.y - canvas.parentElement.offsetTop + canvas.parentElement.scrollTop);
}

var paneSize = new ResizeObserver(calcSizes);
paneSize.observe(pane);
window.addEventListener("resize", calcSizes);

var background = document.getElementById("background");
const bg_img_width = 4032;
const bg_img_height = 2268;

function calcSizes() { // TODO: get a more zoomed out image to be able to show more book
	// offsetwidth includes scrollbar, clientwidth doesnt
	background.style["background-position-x"] = Math.ceil(pane.offsetWidth+10-(background.offsetWidth/1.825*1.25*(background.offsetHeight/background.offsetWidth))) + "px"
	background.style["background-size"] = "auto " + background.offsetHeight*1.25 + "px"
	pane.style["margin-top"] = (background.offsetHeight/35) + "px";
	pane.style["margin-bottom"] = "0px";
	
	calcCanvasSize();
}

calcSizes();
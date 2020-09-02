var canvas = document.getElementById("editor");
var ctx = canvas.getContext("2d");

var pane = document.getElementById("pane");
var tree = document.getElementById("tree");
var el_type = document.getElementById("element-type");

var master = new Connection({rotation: 0}, "Master", () => [0, 0], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"]);
var selectedItem; 

var lastpoint = [0,0];
var thispoint = [0,0];
/*canvas.onclick = function(e){ // this is for debugging, is also bad cuz it has to redraw
	
	lastpoint = JSON.parse(JSON.stringify(thispoint));
	thispoint[0] = e.clientX - e.target.offsetLeft;
	thispoint[1] = e.clientY - e.target.offsetTop;
	drawMaster();
	debug.point(lastpoint[0],lastpoint[1])
	debug.point(thispoint[0],thispoint[1])
	ctx.fillText(Math.ceil(Math.sqrt((lastpoint[0]-thispoint[0])*(lastpoint[0]-thispoint[0])+(lastpoint[1]-thispoint[1])*(lastpoint[1]-thispoint[1]))), 10, TEXT_HEIGHT)
	
}*/

function TEST() { // also debugging, obviously

	master.children[0].connections[0].children.push(new ModifierElement("yee yee yee yee", "adjective"))
	master.children[0].connections[0].children[0].connections[0].children.push(new ObjectElement("yeet", "noun"))
	master.children[0].connections[0].children[0].connections[0].children.push(new ConjunctionElement("yee yee", "conjunction_left"))
	master.children[1].connections[0].children.push(new ModifierElement("yee yee yee 2", "adjective"))
	master.children[1].connections[0].children[0].connections[0].children.push(new ObjectElement("electric boogaloo", "noun"))
	master.children[1].connections[0].children.push(new ModifierElement("¯\\_(ツ)_/¯", "adjective"))
	master.children[1].connections[0].children[1].connections[1].children.push(new MetaElement("reee", "adverb"))
	master.children[1].variant = "verb"
	master.children[2].variant = "direct_object"
	var starttime = performance.now();
	calcCanvasSize(true);
	debug.log("time elapsed: " + (performance.now() - starttime) + "ms");
	updateTree(tree, master);

}

function calcCanvasSize(dontcare, useCanvas=canvas, useContext=ctx, minWidth, minHeight) {
	if (minWidth == undefined) minWidth = useCanvas.parentElement.clientWidth
	if (minHeight == undefined) minHeight = useCanvas.parentElement.clientHeight
	
	ctx.font = FONT; // required to calculate line width
	
	master.calcSpace();
	var totalWidth = master.space+100;
	var totalHeight = master.spaceDown+master.spaceUp+200;
	/*for (var k in master) {
		master[k].calcSize();
		totalWidth += master[k].widthH;
		totalHeight = Math.max(totalHeight, master[k].heightUp + master[k].heightDown);
	}
	totalHeight += 200;*/
	
	var newSize = Math.max(totalWidth, minWidth);
	var newHeight = Math.max(minHeight, totalHeight);
	if (newSize != useCanvas.width || dontcare == true) {
		useCanvas.width = newSize;
		useCanvas.height = newHeight;
		useContext.font = FONT; // must be reset after resize
		useContext.lineWidth = 1.5; // probably this too, havent tested tho
		useContext.lineCap = "round"; // same as lineWidth
		drawMaster(useCanvas, useContext);
		return true;
	}
	
	return false;
	
}

function drawMaster(useCanvas=canvas, useContext=ctx) {
	
	useContext.clearRect(0, 0, useCanvas.width, useCanvas.height);
	drawAll(master.children, [50, Math.max(100, 50+master.children.reduce((acc, cur) => Math.max(acc, cur.heightUp), 0))], useCanvas, useContext);
	
}

/*function optionsOff(value, valueC=value) {
	//document.getElementById("selectcontent").disabled = valueC;
	//document.getElementById("selectstyle").disabled = value;
	document.getElementById("duplicate").disabled = value;
	document.getElementById("delete").disabled = value;
}*/

function updateOptions() {
	if (selectedItem != undefined) {
		//optionsOff(false, selectedItem.disableContent);
		/*document.getElementById("selectcontent").value = selectedItem.content;
		
		document.getElementById("selectstyle").innerHTML = "";
		for (var h = 0; h < Types[selectedItem.type].length; h++) {
			var newLabel = document.createElement("label");
			document.getElementById("selectstyle").appendChild(newLabel);
			
			var newSelection = document.createElement("input");
			newSelection.setAttribute("type", "radio");
			newSelection.setAttribute("name", "style");
			newSelection.setAttribute("value", Types[selectedItem.type][h]);
			newSelection.setAttribute("name", "style");
			if (Types[selectedItem.type][h] == selectedItem.variant) newSelection.checked = true;
			newSelection.addEventListener("input", function(){ if (event.target.checked) {
				
				selectedItem.variant = event.target.value;
				//previousTag.children[1].src = "assets/icons/" + event.target.value + ".svg";
				calcCanvasSize(true);
				
			}});
			newLabel.appendChild(newSelection);
			
			var newImage = document.createElement("img");
			newImage.setAttribute("src", "assets/icons/" + Types[selectedItem.type][h] + ".svg");
			newLabel.appendChild(newImage);
		}*/
		
	} else {
		//optionsOff(true);
		//document.getElementById("selectcontent").value = "";
		//document.getElementById("selectstyle").innerHTML = "";
	}
}
updateOptions();

/*document.getElementById("selectcontent").addEventListener("keyup", function(){
	
	selectedItem.content = document.getElementById("selectcontent").value;
	//previousTag.children[2].innerText = document.getElementById("selectcontent").value;
	calcCanvasSize(true);
	
});*/

function deleteItem(item, parent) {
	if (item != undefined) {
		
		var parentConnectionEl = parent.tether;
		
		undo.addStep("deleteElement", {index: parent.children.indexOf(item), item: item, parent: parent.children});
		
		item.tether.remove();
		parent.children.splice(parent.children.indexOf(item), 1);
		
		updateOptions();
		calcCanvasSize(true);
	}
	
}

function duplicateItem(item, parent) {
	
	if (item != undefined) {
		
		function copyElement(item){ // create copy of element & children
			
			var newItem;
			if (item.type == "object") newItem = new ObjectElement(item.content, item.variant);
			else if (item.type == "modifier") newItem = new ModifierElement(item.content, item.variant);
			else if (item.type == "meta") newItem = new MetaElement(item.content, item.variant);
			else if (item.type == "conjunction") newItem = new ConjunctionElement(item.content, item.variant);
			else if (item.type == "object_clause") newItem = new ObjectClauseElement("", item.variant);
			else if (item.type == "adjective_clause") newItem = new AdjectiveClauseElement("", item.variant);
			else if (item.type == "adverb_clause") newItem = new AdverbClauseElement("", item.variant);
			
			for (var y = 0; y < item.connections.length; y++) {
				
				for (var yy = 0; yy < item.connections[y].children.length; yy++) {
					newItem.connections[y].children.push(copyElement(item.connections[y].children[yy]));
				}
				
			}
			
			return newItem;
			
		}
		
		parent.children.splice(parent.children.indexOf(item), 0, copyElement(item));
		
		updateTreePart(item.tether.parentElement, parent);
		updateOptions();
		calcCanvasSize(true);
		
	}
	
}

var filemenu = document.getElementById("filemenu");
filemenu.addEventListener("input", function(){
	
	if (filemenu.value == "download") FileManager.save();
	if (filemenu.value == "upload") document.getElementById("upload-container").classList.add("shown");
	if (filemenu.value == "export") FileManager.export();
	if (filemenu.value == "share") FileManager.share();
	filemenu.children[0].selected = true;
	
});

window.addEventListener("beforeunload", function (e) {if (master.children.length > 0) {
	e.preventDefault();
	
    var confirmationMessage = 'If you leave without saving changes, your work will be lost. Are you sure?';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}});

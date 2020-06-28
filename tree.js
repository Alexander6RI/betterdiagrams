/*function getChildrenDeep(element, condition) {
	var children = [];
	for (var l in element.children) {
		if (element.children[l].nodeType === 1) {
			if (condition == undefined || condition(element.children[l]) == true) children.push(element.children[l]);
			children = children.concat(getChildrenDeep(element.children[l], condition));
		}
	}
	return children;
}*/

var deselectevent = new Event("deselect_el");

function deselectElement(event) {
	if (event != undefined) event.stopPropagation(); // stops bubbling to parent elements
	var el = event.target;
	el.style.background = NORMAL_BACKGROUND;
}

var previousTag;
var selectedParent;
var selectedIndex;

/*function selectItem(e) {
	
	if (e != undefined) e.stopPropagation(); // stops bubbling to parent elements
	
	// take action
	if (e.target.parentElement.tether == selectedItem) { 
		// deselect
		
		selectedItem = undefined;
		selectedParent = undefined;
		selectedIndex = undefined;
		//getChildrenDeep(tree, elem => (elem.getAttribute("class") == "item")).map(elem => elem.dispatchEvent(deselectevent));
		deselectAll();
	} else { 
		// select
		
		//if (selectedItem != undefined) getChildrenDeep(tree, elem => (elem.getAttribute("class") == "item")).map(elem => elem.dispatchEvent(deselectevent));
		deselectAll();
		selectedItem = e.target.parentElement.tether;
		selectedParent = e.target.parentElement.parentElement.tether;
		selectedIndex = selectedParent.children.indexOf(selectedItem);
		e.target.style.background = HIGHLIGHT_BACKGROUND;
	}
	
	previousTag = e.target;
	
	updateOptions();
	
}*/

/*function deselect(e) {
	
	if (e != undefined) e.stopPropagation(); // stops bubbling to parent elements
	//if (selectedItem != undefined) getChildrenDeep(tree, elem => (elem.getAttribute("class") == "item")).map(elem => elem.dispatchEvent(deselectevent));
	if (selectedItem != undefined) deselectAll();
	selectedItem = undefined;
	selectedParent = undefined;
	selectedIndex = undefined;
	updateOptions();
	
}
tree.addEventListener("click", deselect);*/

//function deselectAll() {document.querySelectorAll(".item").forEach((elem => elem.dispatchEvent(deselectevent)));}

var parentConnection;
var connectionElement;

function newObject(event) {

	if (event != undefined) event.stopPropagation(); // stops bubbling to parent elements
	
	// PLAN:
	// 1. select parent element
	// 2. identify connection
	// 3. push new child to connection
	// 4. select new child
	// 5. update tree
	
	//var acceptedVars = ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double"];
	
	connectionElement = event.target.parentElement;
	
	//deselect();
	
	/*if (event.target.parentElement.parentElement == tree) {
		parentConnection = master;
	} else {
		// select parent element
		event.target.parentElement.parentElement.firstElementChild.click();
		
		// identify connection
		var connItem = selectedItem.connections[getTagIndex(connectionElement)-1];
		parentConnection = connItem.children;
		acceptedVars = connItem.accepts;
	}*/
	
	parentConnection = connectionElement.tether;
	
	if (parentConnection.single == false || parentConnection.children.length == 0) {
	
		for (var g = 0; g < el_type.childElementCount; g++) {
			var child = el_type.children[g];
			if (parentConnection.accepts.includes(child.dataset.variant) || child.dataset.variant == "_close") child.removeAttribute("disabled");
			else child.disabled = "true";
		}
		
		el_type.classList.add("shown");
	
	}
	
}

function selectObject(type, variant) {
	
	el_type.classList.remove("shown");
	
	// push new child to connection
	var newChild;
	if (type == "object") newChild = new ObjectElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "modifier") newChild = new ModifierElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "meta") newChild = new MetaElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "conjunction") newChild = new ConjunctionElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "object_clause") newChild = new ObjectClauseElement("", variant);
	else if (type == "adjective_clause") newChild = new AdjectiveClauseElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "adverb_clause") newChild = new AdverbClauseElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	else if (type == "compound_mod") newChild = new CompoundModElement(NOUN_WORDS[Math.floor(Math.random() * NOUN_WORDS.length)], variant);
	parentConnection.children.push(newChild);
	
	// select new child
	//deselectAll();
	//selectedParent = parentConnection;
	//selectedIndex = selectedParent.length-1;
	//selectedItem = selectedParent[selectedIndex];
	
	undo.addStep("addElement", {item: newChild, parent: parentConnection.children});
	updateTreePart(connectionElement, parentConnection);
	updateOptions();
	calcCanvasSize(true);
	
}

function appendArray(parentElement, array) {
	var newConnectionDisplay = document.createElement("div");
	newConnectionDisplay.setAttribute("class", "item-connection");
	newConnectionDisplay.setAttribute("type", "item-connection");
	newConnectionDisplay.setAttribute("conn-name", array.name);
	parentElement.appendChild(newConnectionDisplay);
	array.tether = newConnectionDisplay;
	newConnectionDisplay.tether = array;
	
	var acceptedVars = array.accepts
	makeDropLocation(newConnectionDisplay, acceptedVars);
	
	updateTreePart(newConnectionDisplay, array);
}

/*function appendThis(parentElement, word) {
	// make tree element
	
	var newParent = document.createElement("div");
	newParent.setAttribute("type", "item-parent");
	newParent.setAttribute("class", "item-parent-hidden");
	parentElement.appendChild(newParent);
	
	var newItem = document.createElement("div");
	newItem.setAttribute("class", "item");
	newItem.addEventListener("click", selectItem);
	if (word === selectedItem) {
		newItem.style.background = HIGHLIGHT_BACKGROUND;
		previousTag = newItem;
	}
	newItem.addEventListener("deselect_el", deselectElement);
	newParent.appendChild(newItem);
	
	var newButton = document.createElement("button");
	newButton.setAttribute("class", "collapse");
	newButton.innerText = "▷";
	newButton.addEventListener("click", clickCollapse);
	newItem.prepend(newButton);
	
	var newIcon = document.createElement("img");
	newIcon.setAttribute("class", "icon");
	newIcon.src = "assets/icons/" + word.variant + ".svg";
	newItem.appendChild(newIcon);
	
	var newText = document.createElement("span");
	newText.setAttribute("style", "pointer-events: none;");
	newText.innerText = word.content;
	newItem.appendChild(newText);
	
	// append its children
	for (var a in word.connections) {
		
		appendArray(newParent, word.connections[a].children, word.connections[a].name);
		
	}
}*/

function createTreePart(parentElement, word) {
	// make tree element
	
	var newParent = document.createElement("div");
	newParent.setAttribute("type", "item-parent");
	newParent.setAttribute("class", "item-parent-hidden");
	parentElement.appendChild(newParent);
	makeDraggable(newParent, word.variant);
	newParent.tether = word;
	word.tether = newParent;
	
	var newItem = document.createElement("div");
	newItem.setAttribute("class", "item");
	//newItem.addEventListener("click", selectItem);
	/*if (word === selectedItem) {
		newItem.style.background = HIGHLIGHT_BACKGROUND;
		previousTag = newItem;
	}*/
	//newItem.addEventListener("deselect_el", deselectElement);
	newParent.appendChild(newItem);
	makeDropChild(newItem);
	
	var newButton = document.createElement("button");
	newButton.setAttribute("class", "collapse");
	newButton.innerText = "▷";
	newButton.addEventListener("click", clickCollapse);
	newItem.prepend(newButton);
	
	var newIcon = document.createElement("img");
	newIcon.setAttribute("class", "icon");
	newIcon.src = "assets/icons/" + word.variant + ".svg";
	newIcon.addEventListener("click", function(e){e.target.parentElement.children[3].classList.remove("slideoutBox-hidden")});
	newItem.appendChild(newIcon);
	
	var newText = document.createElement("input");
	newText.setAttribute("class", "content");
	newText.value = word.content;
	if (word.disableContent == true) newText.setAttribute("disabled", "true");
	newText.addEventListener("input", function(e){
		var oldContent = e.target.parentElement.parentElement.tether.content;
		e.target.parentElement.parentElement.tether.content = e.target.value;
		undo.addStep("changeContent", {item: e.target.parentElement.parentElement.tether, oldContent: oldContent, newContent: e.target.value});
		calcCanvasSize(true);
	});
	newItem.appendChild(newText);
	
	// variant selector
	var box = document.createElement("div");
	box.setAttribute("data-type", "slideoutBox");
	box.setAttribute("class", "slideoutBox-hidden");
	newItem.appendChild(box);
	var close = document.createElement("img");
	close.setAttribute("class", "icon");
	close.setAttribute("src", "assets/close.svg");
	close.addEventListener("click", function(e){e.target.parentElement.classList.add("slideoutBox-hidden");});
	box.appendChild(close);
	for (var a = 0; a < Types[word.type].length; a++) {
		var variant = Types[word.type][a];
		var thisVar = document.createElement("img");
		thisVar.setAttribute("class", "icon");
		thisVar.setAttribute("data-variant", variant);
		thisVar.setAttribute("src", "assets/icons/"+variant+".svg");
		box.appendChild(thisVar);
		thisVar.affects = word;
		thisVar.addEventListener("click", function(ev){
			ev.stopPropagation();
			var oldVariant = ev.target.affects.variant;
			ev.target.affects.variant = ev.target.dataset.variant;
			if (ev.target.affects.variant != oldVariant) {
				calcCanvasSize(true);
				undo.addStep("changeVariant", {item: ev.target.affects.variant, oldVariant: oldVariant, newVariant: ev.target.dataset.variant});
			}
			ev.target.parentElement.classList.add("slideoutBox-hidden");
		});
	}
	
	// actions
	var box2 = document.createElement("div");
	box2.setAttribute("class", "optionsBox");
	newItem.appendChild(box2);
	var dupe = document.createElement("img");
	dupe.setAttribute("class", "icon");
	dupe.setAttribute("src", "assets/duplicate.svg");
	dupe.addEventListener("click", function(e){
		var item = e.target.parentElement.parentElement.parentElement;
		duplicateItem(item.tether, item.parentElement.tether);
	});
	box2.appendChild(dupe);
	var del = document.createElement("img");
	del.setAttribute("class", "icon");
	del.setAttribute("src", "assets/delete.svg");
	del.addEventListener("click", function(e){
		var item = e.target.parentElement.parentElement.parentElement;
		deleteItem(item.tether, item.parentElement.tether);
	});
	box2.appendChild(del);
	
	// append its children
	for (var a in word.connections) {
		
		appendArray(newParent, word.connections[a]);
		
	}
	
	return newParent;
}

function updateTreePart(connectionElement, array) {
	
	connectionElement.innerHTML = "";
	
	for (var f in array.children) {
	
		createTreePart(connectionElement, array.children[f]);
	
	}
	
	var newElement = document.createElement("div");
	newElement.setAttribute("class", "micro-button add-element");
	newElement.innerText = "➕︎";
	newElement.title = "Add Child";
	newElement.addEventListener("click", newObject);
	connectionElement.appendChild(newElement);
	
}

function updateTree() {
	
	tree.innerHTML = "";
	
	// buffer element cuz all of the other connection elements have a div before them, this stops the functions from breaking
	tree.appendChild(document.createElement("div"));
	
	// append master items
	appendArray(tree, master);
	
	// refresh button
	var refresh = document.createElement("div");
	refresh.setAttribute("class", "micro-button refresh-tree");
	refresh.innerText = "⮹";
	refresh.title = "Collapse & Refresh";
	refresh.addEventListener("click", updateTree);
	tree.appendChild(refresh);
	
}

updateTree();

function clickCollapse(e) {
	if (e != undefined) e.stopPropagation();
	if (e.target.parentElement.parentElement.getAttribute("class") == "item-parent-hidden") {
		e.target.parentElement.parentElement.removeAttribute("class");
		e.target.innerText = "◿"
	} else {
		e.target.parentElement.parentElement.setAttribute("class", "item-parent-hidden");
		e.target.innerText = "▷"
	}
}

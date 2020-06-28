function moveItem(itemParent, itemIndex, newParent, newIndex) {
	moveItemNoUndo(itemParent, itemIndex, newParent, newIndex);
	undo.addStep("moveElement", {oldParent: itemParent, oldIndex: itemIndex, newParent: newParent, newIndex: newIndex});
}

function moveItemNoUndo(itemParent, itemIndex, newParent, newIndex) {
	newParent.splice(newIndex, 0, itemParent.splice(itemIndex, 1)[0]);
}

function allowDrop(ev) {
	ev.stopPropagation();
	if ((ev.currentTarget.tether.children.length == 0 || ev.currentTarget.tether.single == false) && ev.currentTarget.matchTypes != undefined && ev.currentTarget.matchTypes.includes(dragging.matchType)) ev.preventDefault();
}
function allowDropChild(ev) {
	ev.stopPropagation();
	if ((ev.currentTarget.parentElement.parentElement.tether.children.length == 0 || ev.currentTarget.parentElement.parentElement.tether.single == false) && ev.currentTarget.parentElement.parentElement.matchTypes != undefined && ev.currentTarget.parentElement.parentElement.matchTypes.includes(dragging.matchType)) ev.preventDefault();
}

function dragEnter(ev) {
	ev.stopPropagation();
	if ((ev.currentTarget.tether.children.length == 0 || ev.currentTarget.tether.single == false) && ev.currentTarget.matchTypes != undefined && ev.currentTarget.matchTypes.includes(dragging.matchType)) ev.currentTarget.setAttribute("current-drop-target", "true");
}
function dragEnterChild(ev) {
	ev.stopPropagation();
	if ((ev.currentTarget.parentElement.parentElement.tether.children.length == 0 || ev.currentTarget.parentElement.parentElement.tether.single == false) && ev.currentTarget.parentElement.parentElement.matchTypes != undefined && ev.currentTarget.parentElement.parentElement.matchTypes.includes(dragging.matchType)) ev.currentTarget.setAttribute("current-drop-target", "true");
}
function dragExit(ev) {
	ev.currentTarget.setAttribute("current-drop-target", "false");
}

var dragging;

function drag(ev) {
	ev.stopPropagation();
	dragging = ev.currentTarget;
}

function drop(ev) {
	ev.stopPropagation();
	ev.preventDefault();
	ev.currentTarget.setAttribute("current-drop-target", "false");
	moveItem(dragging.parentElement.tether.children, getTagIndex(dragging), ev.currentTarget.tether.children, 0);
	ev.currentTarget.insertAdjacentElement("afterbegin", dragging);
	calcCanvasSize(true);
}
function dropChild(ev) {
	ev.stopPropagation();
	ev.preventDefault;
	ev.currentTarget.setAttribute("current-drop-target", "false");
	moveItem(dragging.parentElement.tether.children, getTagIndex(dragging), ev.currentTarget.parentElement.parentElement.tether.children, getTagIndex(ev.currentTarget.parentElement)+1);
	ev.currentTarget.parentElement.insertAdjacentElement("afterend", dragging);
	calcCanvasSize(true);
}

function makeDraggable(element, matchType) {
	element.addEventListener("dragstart", drag);
	element.draggable = true;
	element.matchType = matchType;
	calcCanvasSize(true);
}

function makeDropLocation(element, matchTypes) {
	element.addEventListener("drop", drop);
	element.addEventListener("dragover", allowDrop);
	element.addEventListener("dragenter", dragEnter);
	element.addEventListener("dragexit", dragExit);
	// TODO: can drag connections, fix
	element.matchTypes = matchTypes;
}

function makeDropChild(element) {
	element.addEventListener("drop", dropChild);
	element.addEventListener("dragover", allowDropChild);
	element.addEventListener("dragenter", dragEnterChild);
	element.addEventListener("dragexit", dragExit);
}

tree.addEventListener("dragend", function(){
	tree.classList.remove("dragging");
});
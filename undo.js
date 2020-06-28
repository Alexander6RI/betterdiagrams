var undo = {};

undo.steps = [];
undo.index = 0;

undo.reset = function() {
	undo.steps = [];
	undo.index = 0;
}

undo.addStep = function(action, data) {
	if (undo.index != 0) {
		undo.steps.splice(0, undo.index);
		undo.index = 0;
	} else if (undo.steps.length > 0 && undo.steps[0].action == "changeContent" && undo.steps[0].changes < 5) {
		undo.steps[0].data = data;
		undo.steps[0].changes++;
	} else {
	
		var newStep = {};
		newStep.action = action;
		newStep.data = data;
		newStep.changes = 0;
		undo.steps.unshift(newStep);
		
		if (undo.steps.length > 20) {
			undo.steps.pop();
		}
	}
}

undo.undo = function() {if (undo.index < undo.steps.length) {
	
	var step = undo.steps[undo.index];
	if (step.action == "addElement") step.data.parent.splice(step.data.parent.indexOf(step.data.item), 1);
	if (step.action == "deleteElement") step.data.parent.splice(step.data.index, 0, step.data.item);
	if (step.action == "moveElement") moveItemNoUndo(step.data.newParent, step.data.newIndex, step.data.oldParent, step.data.oldIndex);
	if (step.action == "changeVariant") step.data.item.variant = step.data.oldVariant;
	if (step.action == "changeContent") {step.data.oldContent; step.data.item.tether.firstElementChild.children[2].value = step.data.oldContent;}
	
	undo.index++;
	
	calcCanvasSize(true);
}}

undo.redo = function() {if (undo.index > 0) {
	
	undo.index--;
	
	var step = undo.steps[undo.index];
	if (step.action == "addElement") step.data.parent.splice(step.data.parent.indexOf(step.data.item), 0, step.data.item);
	if (step.action == "deleteElement") step.data.parent.splice(step.data.index, 1);
	if (step.action == "moveElement") moveItemNoUndo(step.data.oldParent, step.data.oldIndex, step.data.newParent, step.data.newIndex);
	if (step.action == "changeVariant") step.data.item.variant = step.data.newVariant;
	if (step.action == "changeContent") {step.data.item.content = step.data.newContent; step.data.item.tether.firstElementChild.children[2].value = step.data.newContent;}
	
	calcCanvasSize(true);
}}

undo.key = function(event) {
	if (event.key == "z" && event.ctrlKey == true) {
		event.preventDefault();
		undo.undo();
	} else if (event.key == "y" && event.ctrlKey == true) {
		event.preventDefault();
		undo.redo();
	}
}

document.body.addEventListener("keydown", undo.key);
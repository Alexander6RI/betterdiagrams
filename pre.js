const Types = {
	object: ["noun", "verb", "direct_object", "predicate"],
	modifier: ["adjective"],
	meta: ["adverb"],
	conjunction: ["conjunction_left", "conjunction_double"],
	object_clause: ["noun_clause", "direct_object_clause"],
	adjective_clause: ["adjective_clause"],
	adverb_clause: ["adverb_clause"],
	compound_mod: ["compound_adj"]
}

const Variations = { // resources for types of elements
	noun: {
		form: (cal) => [[0, 0, false, []], [Math.max(cal.width,cal.widthH), 0, true, []]]
	}, verb: {
		form: (cal) => [[0, 0-TEXT_HEIGHT, false, []], [0, TEXT_HEIGHT*0.5, true, []], [0, 0, false, []], [Math.max(cal.width,cal.widthH), 0, true, []]]
	}, direct_object: {
		form: (cal) => [[0, 0-TEXT_HEIGHT, false, []], [0, 0, true, []], [Math.max(cal.width,cal.widthH), 0, true, []]]
	}, predicate: {
		form: (cal) => [[0-TEXT_HEIGHT*0.25, 0-TEXT_HEIGHT, false, []], [0, 0, true, []], [0, 0, false, []], [Math.max(cal.width,cal.widthH), 0, true, []]]
	}, adjective: {
		form: (cal) => [[0, 0, false, []], [Math.ceil(Math.max(BUFFER_D+cal.width, 1/Math.sin(cal.rotation)*cal.connections[0].spaceUp, 1/Math.cos(cal.rotation)*cal.connections[1].space)), 0, true, []]]
	}, adverb: {
		form: (cal) => [[0, 0, false, []], [0, TEXT_HEIGHT+TEXT_FLOAT, true, []], [BUFFER_H+cal.width, TEXT_HEIGHT+TEXT_FLOAT, true, []], [2*BUFFER_H+cal.width, TEXT_HEIGHT+TEXT_FLOAT, false, []] /* < spacer*/]
	}, conjunction_left: {
		form: (cal) => [
			[cal.width/2, 0-cal.width/2, false, []], 
			[cal.width/2, cal.width/2, true, [5, 5]],
			[Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), 0-Math.max(cal.width/2+BUFFER_H*2,0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), false, []], 
			[0, 0, true, []], 
			[Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), true, []]
		]
	}, conjunction_double: {
		form: (cal) => [
			// left dotted line
			[cal.width/2, 0-cal.width/2, false, []], 
			[cal.width/2, cal.width/2, true, [5, 5]],
			// right dotted line
			[Math.max(cal.connections[0].space,cal.connections[1].space)+2*Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp))-cal.width/2, 0-cal.width/2, false, []], 
			[Math.max(cal.connections[0].space,cal.connections[1].space)+2*Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp))-cal.width/2, cal.width/2, true, [5, 5]],
			// left bracket
			[Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), 0-Math.max(cal.width/2+BUFFER_H*2,0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), false, []], 
			[0, 0, true, []],
			[Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), true, []],
			// right bracket
			[Math.max(cal.connections[0].space,cal.connections[1].space)+Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), Math.max(cal.width/2+BUFFER_H*2,0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), true, []], 
			[Math.max(cal.connections[0].space,cal.connections[1].space)+2*Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), 0, true, []], 
			[Math.max(cal.connections[0].space,cal.connections[1].space)+Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), 0-Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), true, []],
			[Math.max(cal.width/2+BUFFER_H*2, 0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), 0-Math.max(cal.width/2+BUFFER_H*2,0.5*(cal.connections[0].spaceDown+cal.connections[1].spaceUp)), true, []]
		]
	}, noun_clause: {
		form: cal => [
			[0, 0, false, []],
			[Math.max(cal.width,cal.widthH), 0, true, []],
			[cal.connections[0].attachX-BUFFER_H, 0, false, []],
			[cal.connections[0].attachX, 0-BUFFER_H, true, []],
			[cal.connections[0].attachX+BUFFER_H, 0, true, []],
			[cal.connections[0].attachX, 0-BUFFER_H, false, []],
			[cal.connections[0].attachX, cal.connections[0].attachY, true, []]
		]
	}, direct_object_clause: {
		form: cal => [
			[0, 0-TEXT_HEIGHT, false, []],
			[0, 0, true, []],
			[Math.max(cal.width,cal.widthH), 0, true, []],
			[cal.connections[0].attachX-BUFFER_H, 0, false, []],
			[cal.connections[0].attachX, 0-BUFFER_H, true, []],
			[cal.connections[0].attachX+BUFFER_H, 0, true, []],
			[cal.connections[0].attachX, 0-BUFFER_H, false, []],
			[cal.connections[0].attachX, cal.connections[0].attachY, true, []]
		]
	}, adverb_clause: { // TODO: line only attaches to specific location relative to verb, makes weird stuff happen
		form: cal => [
			[0, 0, false, []],
			[cal.connections[0].attachD, cal.connections[0].attachD, true, [5, 5]]
		]
	}, adjective_clause: {
		form: cal => [
			[2*BUFFER_H, 0, false, []],
			[2*BUFFER_H, cal.connections[0].attachY, true, [5, 5]]
		]
	}, compound_adj: {
		form: cal => [
			[0, 0, false, []],
			[TEXT_FLOAT+TEXT_HEIGHT, TEXT_FLOAT+TEXT_HEIGHT, true, []],
			[cal.width+2*BUFFER_H, 0, false, []],
			[cal.width+2*BUFFER_H+TEXT_FLOAT+TEXT_HEIGHT, TEXT_FLOAT+TEXT_HEIGHT, true, []],
			[TEXT_FLOAT+TEXT_HEIGHT, TEXT_FLOAT+TEXT_HEIGHT, false, []],
			[cal.width+2*BUFFER_H+TEXT_FLOAT+TEXT_HEIGHT, TEXT_FLOAT+TEXT_HEIGHT, true, [5, 5]]
		]
	}
}


class Element {
	constructor(content, type, variant) {
		this.contentI = content;
		this.tether;
		this.type = type;
		this.width = 10;
		this.widthH = 10;
		this.variantI = variant;
		this.heightDown = 0;
		this.heightUp = 0;
		this.widthLeft = 0;
		this.selfWidthH = 10;
		this.selfHeightDown = 0;
		this.selfHeightUp = 0;
		this.selfWidthLeft = 0;
		this.disableContent = false;
		
	}
	
	set content(value) {
		//if (this.tether != undefined) this.tether.firstElementChild.children[2].value = value;
		this.contentI = value;
	}
	get content() {return this.contentI}
	
	set variant(value) {
		if (this.tether != undefined) this.tether.firstElementChild.children[1].src = "assets/icons/" + value + ".svg";
		this.variantI = value;
	}
	get variant() {return this.variantI}
	
	get form() {
		//this.calcSize();
		return Variations[this.variant].form(this);
	}
	
	calcSize() {
		
		// END GOAL:
		// 1. calculate horizontal & vertical bounding box of the element
		// 2. calculate minimum line width for text to be displayed
		// PLAN:
		// all connections calc space
		// calculate minimum line width to display text
		// all connections calc point locations relative to element origin, after rotation
		// calculate highest & lowest point of form of element including any child, relative to element origin after rotation
		// ???
		// profit
		
		// all connections calc space
		for (var i in this.connections) {
			this.connections[i].calcSpace();
		}
		
		// calculate minimum line width to display text
		this.width = Math.ceil(BUFFER_H*2 + ctx.measureText(this.content).width);
		
		// reset so no effect on form or points
		this.widthH = 10;
		this.selfWidthH = 10;
		this.heightUp = 0;
		this.widthLeft = 0;
		this.selfHeightUp = 0;
		this.heightDown = 0;
		this.selfHeightDown = 0;
		this.selfWidthLeft = 0;
		
		// calculate locations of connections
		for (var i in this.connections) {
			this.connections[i].calcPoints();
		}
		
		var formSaved = this.form;
		
		// calculate bounding box
		var maxChildWidthH = 0;
		var maxChildWidthLeft = 0;
		var maxChildHeightDown = 0;
		var maxChildHeightUp = 0;
		for (var i in this.connections) { // calculate maximum child bounding box
			var connItem = this.connections[i];
			maxChildWidthH = Math.max(maxChildWidthH, connItem.space + Math.cos(this.rotation)*connItem.x + Math.sin(this.rotation)*connItem.y)
			maxChildWidthLeft = Math.max(maxChildWidthLeft, connItem.spaceLeft - Math.cos(this.rotation)*connItem.x - Math.sin(this.rotation)*connItem.y)
			maxChildHeightDown = Math.max(maxChildHeightDown, connItem.spaceDown + Math.cos(this.rotation)*connItem.y + Math.sin(this.rotation)*connItem.x)
			maxChildHeightUp = Math.max(maxChildHeightUp, connItem.spaceUp-(Math.cos(this.rotation)*connItem.y+Math.sin(this.rotation)*connItem.x))
		}
		
		var maxFormWidthH = 0;
		var maxFormWidthLeft = 0;
		var maxFormHeightDown = 0;
		var maxFormHeightUp = 0;
		for (var i in formSaved) { // calculate maximum form bounding box
			var formItem = formSaved[i];
			maxFormWidthH = Math.max(maxFormWidthH, Math.cos(this.rotation)*formItem[0] - Math.sin(this.rotation)*formItem[1])
			maxFormWidthLeft = Math.max(maxFormWidthLeft, 0-(Math.cos(this.rotation)*formItem[0] - Math.sin(this.rotation)*formItem[1]))
			maxFormHeightDown = Math.max(maxFormHeightDown, Math.cos(this.rotation)*formItem[1] + Math.sin(this.rotation)*formItem[0])
			maxFormHeightUp = 0-Math.max(0-maxFormHeightUp, 0-(Math.cos(this.rotation)*formItem[1] + Math.sin(this.rotation)*formItem[0]))
		}
		
		this.selfWidthH = Math.ceil(maxFormWidthH)
		this.widthH = Math.ceil(Math.max(maxChildWidthH, maxFormWidthH));
		
		this.selfWidthLeft = Math.ceil(maxFormWidthLeft)
		this.widthLeft = Math.ceil(Math.max(maxChildWidthLeft, maxFormWidthLeft));
		
		this.selfHeightDown = Math.ceil(maxFormHeightDown);
		this.heightDown = Math.ceil(Math.max(maxChildHeightDown, maxFormHeightDown));
		
		this.selfHeightUp = Math.ceil(Math.max(maxFormHeightUp, Math.cos(this.rotation)*(this.textStyle.y+TEXT_HEIGHT+TEXT_FLOAT) - Math.sin(this.rotation)*this.textStyle.x))
		this.heightUp = Math.max(Math.ceil(maxChildHeightUp), this.selfHeightUp);
		
	}
	
	drawElement(x, y, useCanvas=canvas, useContext=ctx) {
		//debug.log(x+", "+y);
		var elform = this.form;
		useContext.translate(x, y);
		useContext.rotate(this.rotation);
		debug.point(0, 0);
		// draw form
		for (var i = 1; i < elform.length; i++) {
			var formItem = elform[i];
			if (formItem[2] == true) {
				useContext.beginPath();
				useContext.setLineDash(formItem[3]);
				useContext.moveTo(elform[i-1][0], elform[i-1][1])
				useContext.lineTo(formItem[0], formItem[1]);
				useContext.strokeStyle = NORMAL_COLOR;
				useContext.stroke();
			}
		}
		
		// draw connections
		useContext.strokeStyle = HIGHLIGHT_COLOR;
		useContext.setLineDash([10, 5]);
		if (debug.on) for (var i in this.connections) {
			useContext.beginPath();
			var connItem = this.connections[i];
			if (connItem.shape == "point") useContext.arc(connItem.x, connItem.y, 6, 0, 2*Math.PI);
			else {
				useContext.moveTo(connItem.x, connItem.y);
				useContext.lineTo(connItem.dx, connItem.dy);
			}
			useContext.stroke();
		}
		
		// draw text
		useContext.textAlign = this.textStyle.align; 
		useContext.rotate(this.textStyle.rotation);
		useContext.fillText(this.content, this.textStyle.x, this.textStyle.y);
		useContext.rotate(-this.textStyle.rotation);
		
		useContext.rotate(-this.rotation);
		
		// draw bounding box
		if (debug.on) {
			useContext.beginPath();
			useContext.strokeStyle = BOUNDING_COLOR;
			useContext.setLineDash([5, 10]);
			useContext.moveTo(0-this.widthLeft, 0-this.heightUp);
			useContext.lineTo(0-this.widthLeft, this.heightDown);
			useContext.lineTo(this.widthH, this.heightDown);
			useContext.lineTo(this.widthH, 0-this.heightUp);
			useContext.lineTo(0-this.widthLeft, 0-this.heightUp);
			useContext.stroke();
		}
		
		// loop through all connections
		for (var ii in this.connections) {
			// draw all elements that are children of this connection
			var connItem = this.connections[ii];
			
			drawAll(connItem.children, [Math.ceil(Math.cos(this.rotation)*connItem.x+Math.sin(this.rotation)*connItem.y), Math.ceil(Math.cos(this.rotation)*connItem.y+Math.sin(this.rotation)*connItem.x)], useCanvas, useContext, connItem.rotation);
		}
		
		useContext.translate(-x,-y);
		
		var lastformitem = elform[elform.length-1];
		//debug.point(x+lastformitem[0], y+lastformitem[1]);
		return [x+lastformitem[0], y+lastformitem[1]];
	}
}


class ObjectElement extends Element {
	constructor(content, variant) {
		super(content, "object", variant);
		this.textStyle = {x: BUFFER_H, y: 0-TEXT_FLOAT, align: "left", rotation: 0};
		this.rotation = 0;
		this.connections = [
			//new LineConnection(this, "Bottom", () => [BUFFER_H, 0], () => [this.width, 0], ["adjective", "adjective_clause", "adverb_clause", "compound_adj"])
			new Connection(this, "Bottom", () => [BUFFER_H, 0], ["adjective", "adjective_clause", "adverb_clause", "compound_adj"])
		];
	}
	
}

class ModifierElement extends Element {
	constructor(content, variant) {
		super(content, "modifier", variant);
		this.textStyle = {x: BUFFER_D, y: 0-TEXT_FLOAT, align: "left", rotation: 0};
		this.rotation = 45*Math.PI/180;
		this.connections = [
			new Connection(this, "End", () => [Math.ceil(Math.max(BUFFER_D+this.width, 1/Math.sin(this.rotation)*this.connections[0].spaceUp, 1/Math.cos(this.rotation)*this.connections[1].space)), 0], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"]),
			//new LineConnection(this, "Bottom", () => [BUFFER_D, 0], () => [BUFFER_H+this.width, 0], ["adverb"])
			new Connection(this, "Bottom", () => [BUFFER_D, 0], ["adverb"], false, 45*Math.PI/180)
		];
	}
	
}


class MetaElement extends Element {
	constructor(content, variant) {
		super(content, "meta", variant);
		this.textStyle = {x: BUFFER_H*2, y: TEXT_HEIGHT, align: "left", rotation: 0};
		this.rotation = 45*Math.PI/180;
		this.connections = [];
	}
	
}

class ConjunctionElement extends Element {
	constructor(content, variant) {
		super(content, "conjunction", variant);
		this.rotation = 0;
		this.connections = [
			new Connection(this, "Top", () => [
				Math.max(
					this.width/2+BUFFER_H*2, 
					0.5*(this.connections[0].spaceDown+this.connections[1].spaceUp)
				), 
				0-Math.max(
					this.width/2+BUFFER_H*2,
					0.5*(this.connections[0].spaceDown+this.connections[1].spaceUp)
				)
			], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"]),
			new Connection(this, "Bottom", () => [
				Math.max(
					this.width/2+BUFFER_H*2, 
					0.5*(this.connections[0].spaceDown+this.connections[1].spaceUp)
				), 
				Math.max(
					this.width/2+BUFFER_H*2,
					0.5*(this.connections[0].spaceDown+this.connections[1].spaceUp)
				)
			], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"])
		];
	}
	
	get textStyle() { // of note is that x and y are applied AFTER rotation
		return {x: 0, y: 0-this.width/2-TEXT_FLOAT, align: "center", rotation: 90*Math.PI/180};
	}
	
}


class ObjectClauseElement extends Element {
	constructor(content, variant) {
		super(content, "object_clause", variant);
		this.disableContent = true;
		this.rotation = 0;
		this.connections = [
			new ObjectClauseConnection(this, "Clause", () => [
				0, 0-BUFFER_V-this.connections[0].spaceDown
			], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"])
		];
	}
	
	get textStyle() {
		return {x: 0, y: 0, align: "left", rotation: 0};
	}
	
}

class AdjectiveClauseElement extends Element {
	constructor(content, variant) {
		super(content, "adjective_clause", variant);
		this.rotation = 0;
		this.connections = [
			new ModifierClauseConnection(this, "Clause", () => [
				0, Math.max(this.connections[0].spaceUp, this.width+2*BUFFER_H)+BUFFER_V
			], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"])
		];
	}
	
	get textStyle() {
		return {x: BUFFER_H+this.width/2, y: -2*BUFFER_H-TEXT_FLOAT, align: "center", rotation: 90*Math.PI/180};
	}
	
}

class AdverbClauseElement extends Element {
	constructor(content, variant) {
		super(content, "adverb_clause", variant);
		this.rotation = 0;
		this.connections = [
			new ModifierClauseConnection(this, "Clause", () => [
				Math.max(this.connections[0].attachD-this.connections[0].attachX, 0), 
				this.connections[0].attachD-Math.min(this.connections[0].attachD-this.connections[0].attachY, 0)+TEXT_HEIGHT
			], ["noun", "verb", "direct_object", "predicate", "conjunction_left", "conjunction_double", "noun_clause", "direct_object_clause"])
		];
	}
	
	get textStyle() {
		return {x: BUFFER_H+this.width/2, y: 0-TEXT_FLOAT, align: "center", rotation: 45*Math.PI/180};
	}
	
}

class CompoundModElement extends Element { // TODO: has too much heightUp
	constructor(content, variant) {
		super(content, "compound_mod", variant);
		this.rotation = 0;
		this.connections = [
			new Connection(this, "Left", () => [
				TEXT_HEIGHT+TEXT_FLOAT, 
				TEXT_HEIGHT+TEXT_FLOAT
			], ["adjective"], true),
			new Connection(this, "Right", () => [
				TEXT_HEIGHT+TEXT_FLOAT+this.width+2*BUFFER_H, 
				TEXT_HEIGHT+TEXT_FLOAT
			], ["adjective"], true)
		];
	}
	
	get textStyle() {
		return {x: BUFFER_H+TEXT_HEIGHT+TEXT_FLOAT+this.width/2, y: TEXT_HEIGHT, align: "center", rotation: 0};
	}
	
}


class Connection {
	constructor(caller, name, pos1, accepts, single=false, rotation=0) {
		this.caller = caller;
		this.shape = "point";
		this.name = name;
		this.accepts = accepts;
		this.tether;
		this.pos1 = pos1;
		this.x = 0;
		this.y = 0;
		this.space = 0;
		this.spaceDown = 0;
		this.spaceUp = 0;
		this.spaceLeft = 0;
		this.single = single;
		this.rotation = rotation;
		this.children = [];
	}
	
	calcSpace() {
		// calculate horizontal & vertical space occupied by children
		
		this.space = 0;
		this.spaceDown = BUFFER_V;
		this.spaceUp = BUFFER_V;
		this.spaceLeft = 0;
		for (var iii = 0; iii < this.children.length; iii++) {
			this.children[iii].calcSize();
			this.space += this.children[iii].widthH;
			this.space += BUFFER_H;
			this.spaceDown = Math.max(this.spaceDown, this.children[iii].heightDown);
			this.spaceUp = Math.max(this.spaceUp, this.children[iii].heightUp);
			this.spaceLeft = Math.max(this.spaceLeft, this.children[iii].widthLeft);
		}
	}
	
	calcPoints() {
		// recalculate connection points
		
		var finalPos1 = this.pos1();
		this.x = finalPos1[0];
		this.y = finalPos1[1];
	}
}


/*class LineConnection extends Connection {
	constructor(caller, name, pos1, pos2, accepts) {
		super(caller, name, pos1, accepts);
		this.shape = "line";
		this.pos2 = pos2;
		this.dx = 0;
		this.dy = 0;
	}
	
	calcPoints() {
		// recalculate connection points
		
		var finalPos1 = this.pos1();
		this.x = finalPos1[0];
		this.y = finalPos1[1];
		var finalPos2 = this.pos2();
		this.dx = finalPos2[0];
		this.dy = finalPos2[1];
	}
}*/ // not really necessary


class ObjectClauseConnection extends Connection {
	constructor(caller, name, pos1, accepts, rotation=0) {
		super(caller, name, pos1, accepts);
		this.attachX = 2*BUFFER_H
		this.attachY = 0-BUFFER_V;
	}
	
	get accepts() {
		var fin = [];
		if (this.children.length == 0) fin = ["adjective"];
		if (this.children.findIndex(item => item.variant=="adjective") == -1) fin = fin.concat(this.base_accepts);
		return fin;
	}
	
	set accepts(val) {
		this.base_accepts = val;
	}
	
	calcPoints() {
		// recalculate connection points
		
		var finalPos1 = this.pos1();
		this.x = finalPos1[0];
		this.y = finalPos1[1];
		this.attachX = BUFFER_H;
		this.attachY = 0-BUFFER_V-this.spaceDown;
		if (this.children[0] != undefined && this.children[0].type == "modifier") {
			this.attachX += this.children[0].selfWidthH;
			this.attachY += this.children[0].selfHeightDown;
		} else {
			// connect to first verb
			var verbIndex = this.children.findIndex(item => item.variant=="verb");
			if (verbIndex > -1 && verbIndex < 3) this.attachX += this.children.slice(0, verbIndex).reduce((a, b) => a+b.widthH, 0);
			else if (this.children.length > 1) this.attachX += this.children[0].widthH;
		}
	}
}

class ModifierClauseConnection extends Connection {
	constructor(caller, name, pos1, accepts) {
		super(caller, name, pos1, accepts);
		this.attachX = 2*BUFFER_H
		this.attachY = 0;
		this.attachD = 2*BUFFER_H;
	}
	
	calcSpace() {
		this.space = 0;
		this.spaceDown = BUFFER_V;
		this.spaceUp = BUFFER_V;
		this.spaceLeft = 0;
		for (var iii = 0; iii < this.children.length; iii++) {
			this.children[iii].calcSize();
			this.space += this.children[iii].widthH;
			this.space += BUFFER_H;
			this.spaceDown = Math.max(this.spaceDown, this.children[iii].heightDown);
			this.spaceUp = Math.max(this.spaceUp, this.children[iii].heightUp);
			this.spaceLeft = Math.max(this.spaceLeft, this.children[iii].widthLeft);
		}
		
		this.attachX = 2*BUFFER_H;
		this.attachY = BUFFER_V+Math.max(this.spaceUp-TEXT_HEIGHT, Math.sin(this.caller.textStyle.rotation)*(2*BUFFER_H+this.caller.width)-TEXT_HEIGHT, 0);
		this.attachD = 2*BUFFER_H;
		// connect to first verb
		var verbIndex = this.children.findIndex(item => item.variant=="verb");
		if (verbIndex > -1 && verbIndex < 3) this.attachX += this.children.slice(0, verbIndex).reduce((a, b) => a+b.widthH, 0);
		else if (this.children.length > 1) this.attachX += this.children[0].widthH;
		this.attachD = Math.max(this.attachX+BUFFER_H, this.attachY);
	}
}


function getTagIndex(tag, includeNodes=false) {
	// iterates through previous sibling elements until there is none, returns how many (index)
	
	var i = 0;
	for (i=0; (tag=(includeNodes ? tag.previousSibling : tag.previousElementSibling)); i++);
	return i;
	
}


function drawAll(array, pos=[0, 0], useCanvas=canvas, useContext=ctx, rotation=0) {

	/*var last = pos;
	
	for (var i in array) {
	
		debug.log("start "+last);
	
		last = array[i].drawElement(last[0], last[1]);
	
		debug.log("end "+last);
		
	}*/
		
	var spaceDrawn = 0;
	
	for (var i = 0; i < array.length; i++) {
		
		var drawY = Math.tan(rotation)*spaceDrawn;
		array[i].drawElement(pos[0]+spaceDrawn, pos[1]+drawY, useCanvas, useContext);
		spaceDrawn += array[i].widthH + array[i].widthLeft;
		
	}
	
}

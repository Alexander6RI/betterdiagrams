// string for data version, not app version
// note to self: make version string splittable by periods
const DATA_VERSION = "1.0.1";

var FileManager = {};

FileManager.compile = function(){
	
	var count = 0;
	var starttime = performance.now();
	
	function compileThis(array) {
		
		var compiled = [];
		
		for (var u = 0; u < array.length; u++) {
			var item = array[u];
			count++;
			
			var newObj = {};
			newObj.content = item.content;
			newObj.type = item.type;
			newObj.variant = item.variant;
			
			newObj.connected = [];
			for (var uu = 0; uu < item.connections.length; uu++) {
				newObj.connected.push(compileThis(item.connections[uu].children));
			}
			
			compiled.push(newObj);
			
		}
		
		return compiled;
	}
	
	var finished = {};
	finished.items = compileThis(master.children);
	finished.versionString = DATA_VERSION;
	
	debug.log("compiled " + count + " elements in " + (performance.now() - starttime) + " ms");
	return finished;
	
}

FileManager.save = function(){
	
	document.getElementById("hidden-download-thing-dont-touch").setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(FileManager.compile())));
	document.getElementById("hidden-download-thing-dont-touch").setAttribute('download', 'diagram.dia');
	document.getElementById("hidden-download-thing-dont-touch").click();
	
}

FileManager.FileParseException = function(message){ // TODO: extend error class
	this.message = message;
	this.name = "FileParseException";
}

FileManager.FileParseException.prototype.toString = function(){
	return `${this.name}: ${this.message}`;
}

FileManager.parse = function(data){
	
	if (data.versionString != DATA_VERSION) throw new FileManager.FileParseException("unknown data version: " + data.versionString);
	
	var count = 0;
	var starttime = performance.now();
	
	function parseThis(array) {
		
		var parsed = [];
		
		for (var u = 0; u < array.length; u++) {
			var item = array[u];
			count++;
			
			var newObj;
			if (item.type == "object") newObj = new ObjectElement(item.content, item.variant);
			if (item.type == "modifier") newObj = new ModifierElement(item.content, item.variant);
			if (item.type == "meta") newObj = new MetaElement(item.content, item.variant);
			if (item.type == "conjunction") newObj = new ConjunctionElement(item.content, item.variant);
			if (item.type == "object_clause") newObj = new ObjectClauseElement("", item.variant);
			if (item.type == "adjective_clause") newObj = new AdjectiveClauseElement(item.content, item.variant);
			if (item.type == "adverb_clause") newObj = new AdverbClauseElement(item.content, item.variant);
			if (item.type == "compound_mod") newObj = new CompoundModElement(item.content, item.variant);
			
			for (var uu = 0; uu < item.connected.length; uu++) {
				newObj.connections[uu].children = parseThis(item.connected[uu]);
			}
			
			parsed.push(newObj);
			
		}
		
		return parsed;
	}
	
	var finished = parseThis(data.items);
	
	debug.log("parsed " + count + " elements in " + (performance.now() - starttime) + " ms");
	return finished;
	
}

FileManager.open = function(){
	
	const reader = new FileReader()
	reader.onload = function(event){
		master.children = FileManager.parse(JSON.parse(event.target.result));
		updateTree();
		updateOptions();
		calcCanvasSize(true);
	}
	reader.readAsText(document.getElementById("upload").files[0])
	undo.reset();
	
}

FileManager.export = function(){
	calcCanvasSize(true, document.getElementById("other-hidden-download-thing-dont-touch"), document.getElementById("other-hidden-download-thing-dont-touch").getContext("2d"), 0, 0);
	document.getElementById("hidden-download-thing-dont-touch").setAttribute('href', document.getElementById("other-hidden-download-thing-dont-touch").toDataURL());
	document.getElementById("hidden-download-thing-dont-touch").click();
}

FileManager.openExample = function(x){
	
	if (x == 1) master.children = FileManager.parse(EXAMPLE_1);
	if (x == 2) master.children = FileManager.parse(EXAMPLE_2);
	if (x == 3) master.children = FileManager.parse(EXAMPLE_3);
	
	updateTree();
	calcCanvasSize(true);
	
}

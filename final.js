// check if this is a shared url containing data
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get("sharedDia") != null) {
	
	try {
		master.children = FileManager.parse(JSON.parse(urlParams.get("sharedDia")));
		updateTree();
		calcCanvasSize(true);
	} catch(e) {
		console.warn(e);
	}
	
}

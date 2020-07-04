/* PLAN:


on first load- sessionstorage- it asks whether you would like a tutorial

if yes, walks you through steps with popup boxes and blacking out irrelevant areas

1. label: canvas, object tree
diagram: "the boy throws the red ball"
2. add noun "boy," then "throws," then "ball"
3. add "the" to boy and ball, then "red"
4. ???
5. profit


*/


function setHighlight(targetElement, click=true) {
	
	var highlightElement = document.getElementById("highlight");
	if (highlightElement == null) {
		highlightElement = document.createElement("div");
		highlightElement.setAttribute("id", "highlight");
		document.body.appendChild(highlightElement);
	}
	
	var noclickElement = document.getElementById("noclick");
	if (click == false) {
		if (noclickElement == null) {
			noclickElement = document.createElement("div");
			noclickElement.setAttribute("id", "noclick");
			document.body.appendChild(noclickElement);
		}
	} else if (noclickElement != null) noclickElement.remove();
	
	var old = document.querySelector(".highlighted");
	if (old != null) old.classList.remove("highlighted");
	targetElement.classList.add("highlighted");
}

function removeHighlight() {
	var highlightElement = document.getElementById("highlight");
	if (highlightElement != null) highlightElement.remove();
	var noclickElement = document.getElementById("noclick");
	if (noclickElement != null) noclickElement.remove();
	var h = document.querySelector(".highlighted");
	if (h != null) h.classList.remove("highlighted");
}


var tutorial = {};

tutorial.step = function(params) {
	
	var targetElement = params.target;
	var click = params.click; if (click == undefined) click = true;
	var stepNum = params.step;
	var messageText = params.text;
	var imgSrc = params.img;
	var advanceEvent = params.advance;
	
	var message = document.getElementById("tutorialMessage");
	if (message == null) {
		message = document.createElement("div");
		message.setAttribute("id", "tutorialMessage");
		document.body.appendChild(message);
	}
	
	message.innerText = messageText;
	
	if (imgSrc != undefined) {
		var img = document.createElement("img");
		img.setAttribute("src", imgSrc);
		message.appendChild(img);
	}
	if (advanceEvent != undefined) targetElement.addEventListener(advanceEvent, e => tutorial.advance(e, stepNum), {once: true});
	else { // next-step button
		var nextStep = document.createElement("button");
		nextStep.classList.add("tutorial-button");
		nextStep.innerText = "➔";
		nextStep.addEventListener("click", e => tutorial.advance(e, stepNum), {once: true});
		message.appendChild(nextStep);
	}
	
	if (targetElement != undefined) {
		setHighlight(targetElement, click);
		
		var box = targetElement.getBoundingClientRect();
		var body = document.body.getBoundingClientRect();
		
		/*// calculate possible positions
		var xpos = (box.left + box.right) / 2;
		var dx = [body.width*0.25, body.width*0.5, body.width*0.75];
		// decide which are suitable
		var dx2 = [];
		dx.map(el => (el < box.left-50 || el > box.right+50 ? dx2.push(el) : false));
		
		if (dx2.length > 0) {
			// find closest
			var newX = dx2.reduce((acc, cur) => (Math.abs(cur-xpos) < Math.abs(acc-xpos) ? cur : acc), -1000);
			// position message
			message.style.left = newX+"px";
		} else message.style.left = "";*/
		
		if (box.width > body.width - 250) {
			message.style.left = "";
		} else {
			if ((box.left+box.right)/2 > body.width/2) {
				message.style.left = box.left-150+"px";
			} else {
				message.style.left = box.right+150+"px";
			}
		}
		
		// vertical position
		message.style.top = box.top+40+"px";
		
	} else {
		setHighlight(message, true);
		message.style.left = "";
		message.style.top = "";
	}
	
}

tutorial.currentStep = 0;

tutorial.advance = function(ev, stepNum){
	tutorial.currentStep = stepNum+1;
	tutorial.steps[tutorial.currentStep]();
}

tutorial.steps = [
	() => {
		el_type.classList.remove("shown");
		document.getElementById("tutorialPopup").classList.remove("shown");
		tutorial.step({step: 0, text: "Better Diagrams is a tool to help you create diagrams of English sentences."});
	},
	() => {
		tutorial.step({target: tree, click: false, step: 1, text: "This is the sentence tree, where you create the structure of a sentence."});
	},
	() => {
		tutorial.step({target: canvas, click: false, step: 2, text: "This is the canvas, and it's where your diagram will appear."});
	},
	() => {
		tutorial.step({step: 3, text: 'Let\'s diagram this simple sentence:\n\n"The boy throws the red ball."\n\nThe finished diagram will look like this:', img: "assets/example.png"});
	},
	() => {
		master.children = [];
		updateTree();
		tutorial.step({target: master.tether.lastElementChild, click: true, step: 4, text: "To get started, we need to add a word. Click the + button.", advance: "click"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 5, text: "We're going to add the word \"boy,\" so type that in the input box."});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "boy") document.getElementById("enter-content").value = "boy";
		tutorial.step({target: el_type.querySelector("[data-variant=noun]"), click: true, step: 6, text: "The word \"boy\" is the subject of the sentence, so it goes on a flat line.", advance: "click"});
	},
	() => {
		tutorial.step({target: master.tether, click: false, step: 7, text: "The word \"boy\" is now part of the sentence tree."});
	},
	() => {
		tutorial.step({step: 8, text: "Next is the verb, which is \"throws.\"\n\nRemember, our diagram will look like this:", img: "assets/example.png"});
	},
	() => {
		updateTree();
		tutorial.step({target: master.tether.lastElementChild, click: true, step: 9, text: "Let's add another word.", advance: "click"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 10, text: "The word is \"throws,\" so type that in the box."});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "throws") document.getElementById("enter-content").value = "throws";
		tutorial.step({target: el_type.querySelector("[data-variant=verb]"), click: true, step: 11, text: "\"Throws\" is a verb, so it goes on a line like this.", advance: "click"});
	},
	() => {
		updateTree();
		tutorial.step({target: master.tether.lastElementChild, click: true, step: 12, text: "One more: \"ball\" is the object of the verb.", advance: "click"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 13, text: "\"Ball\" goes in the box."});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "ball") document.getElementById("enter-content").value = "ball";
		tutorial.step({target: el_type.querySelector("[data-variant=direct_object]"), click: true, step: 14, text: "\"Ball\" is a direct object.", advance: "click"});
	},
	() => {
		tutorial.step({target: canvas, click: false, step: 15, text: "Now we have the basic components of the sentence.", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: canvas, click: false, step: 16, text: "We still need to add the adjective and articles:", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: master.children[0].tether.firstElementChild.firstElementChild, click: true, step: 17, text: "Click this arrow to open up this word's section of the tree.", advance: "click"});
	},
	() => {
		tutorial.step({target: master.children[0].tether, click: false, step: 18, text: "Here, we can attach adjectives, articles, and prepositions to the bottom of this word's line on the diagram."});
	},
	() => {
		tutorial.step({target: master.children[0].connections[0].tether.lastElementChild, click: true, step: 19, text: "Click this button to add an article.", advance: "click"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 20, text: "We are adding the word \"the.\""});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "the") document.getElementById("enter-content").value = "the";
		tutorial.step({target: el_type.querySelector("[data-variant=adjective]"), click: true, step: 21, text: "Articles go on lines like this.", advance: "click"});
	},
	() => {
		tutorial.step({target: master.children[0].tether, click: false, step: 22, text: "Notice how the article is listed under \"Bottom,\" which is where it is connected in the diagram.", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: canvas, click: false, step: 23, text: "We are getting closer. Next is the article \"the\" that corresponds with the word \"ball\":", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: master.children[2].tether.firstElementChild.firstElementChild, click: true, step: 24, text: "Click here to expand this word's tree.", advance: "click"});
	},
	() => {
		tutorial.step({target: master.children[2].connections[0].tether.lastElementChild, click: true, step: 25, text: "Click this button to add a word to the bottom.", advance: "click"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 26, text: "We are adding the word \"the.\""});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "the") document.getElementById("enter-content").value = "the";
		tutorial.step({target: el_type.querySelector("[data-variant=adjective]"), click: true, step: 27, text: "This slanted line will be attached to the bottom of the word \"ball.\"", advance: "click"});
	},
	() => {
		tutorial.step({target: master.children[2].connections[0].tether.lastElementChild, click: true, step: 28, text: "One more word left.", advance: "click", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: document.getElementById("enter-content"), click: true, step: 29, text: "We are adding the word \"red.\""});
	},
	() => {
		if (document.getElementById("enter-content").value.toLowerCase() != "red") document.getElementById("enter-content").value = "red";
		tutorial.step({target: el_type.querySelector("[data-variant=adjective]"), click: true, step: 30, text: "\"Red\" is an adjective, and is diagrammed the same way as an article.", advance: "click"});
	},
	() => {
		tutorial.step({target: canvas, click: false, step: 31, text: "Our diagram is finished:", img: "assets/example.png"});
	},
	() => {
		tutorial.step({target: filemenu, click: false, step: 32, text: "For more examples, go to File -> Open."});
	},
	() => {
		removeHighlight();
		document.getElementById("tutorialMessage").remove();
		sessionStorage.setItem("tutorial", "hide");
	}
]

tutorial.hide = function() {
	sessionStorage.setItem("tutorial", "hide");
	document.getElementById("tutorialPopup").classList.remove("shown");
}

if (sessionStorage.getItem("tutorial") != "hide") document.getElementById("tutorialPopup").classList.add("shown");

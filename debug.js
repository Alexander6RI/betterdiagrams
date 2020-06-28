var debug = {
	
	_on: false,
	
	log: function(yeet) {
		if (this.on) console.log(yeet);
	},

	point: function(x, y) { if (this.on) {
		
		ctx.fillRect(x-4,y-4, 4, 4);
		ctx.fillRect(x, y, 4, 4);
		
	}},
	
	get on() {return this._on;},
	set on(val) {localStorage.setItem("debugOn", val); this._on = val;},
	get off() {return !this._on;},
	set off(val) {localStorage.setItem("debugOn", !val); this._on = !val;}
	
}

if (localStorage.getItem("debugOn") == "true") debug._on = true;
else debug._on = false;
import $ from "jquery";
import { debug } from "./debug";

function konami() {
	//Set up our array of needed keys, and variables.
	let neededkeys = [38,38,40,40,37,39,37,39,66,65], started = false, count = 0;
	$(document).keydown(function(e){
		let key = e.keyCode;
		//Set start to true only if having pressed the first key in the konami sequence.
		if(!started){
			if(key == 38){
				started = true;
			}
		}
		//If we've started, pay attention to key presses, looking for right sequence.
		if(started){
			if(neededkeys[count] == key){
				//We're good so far.
				count++;
			} else {
				//Oops, not the right sequence, lets restart from the top.
				reset();
			}
			if(count == 10){
				//We made it! Put code here to do what you want when successfully execute konami sequence
				$('body').toggleClass('konami');
				debug('konami code activated!', 'success')
				//Reset the conditions so that someone can do it all again.
				reset();
			}
		} else {
		//Oops.
			reset();
		}
	});
	//Function used to reset us back to starting point.
	function reset() {
		started = false; count = 0;
		return;
	}
}

export { konami };
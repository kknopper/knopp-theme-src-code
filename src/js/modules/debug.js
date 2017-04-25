const config = {};
config.debug = true;

//Console.logs only when debug set to true
export function debug(log, type) {
	if (config.debug) {
		let styles = ['padding: 4px']

		if (type == 'error') {
			styles = [...styles, 'background: red', 'color: white'].join(';');
		} else if (type == 'success') {
			styles = [...styles, 'background: green', 'color: white'].join(';');
		}

		console.log(`%c${log}`, styles);
		
	}
}
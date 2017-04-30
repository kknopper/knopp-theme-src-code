import $ from "jquery";
import { debug } from "./debug";

//Console.logs only when debug set to true
export function footerPhrase(phrase, speechBubble) {
	let $speechBubble = speechBubble || $('.footer-text-bubble');

	debug(`footer phrase: ${phrase}`);
	$speechBubble.addClass('active').html(`<p>${phrase}</p>`)
	setTimeout(() => {
		$speechBubble.removeClass('active');
	}, 1500)
}
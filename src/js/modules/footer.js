import $ from "jquery";
import { debug } from "./debug";
import { footerPhrase } from "./footer-phrase"




function randomizePhrases(array, randomizeConfig) {
	if (randomizeConfig.start != 0) {
		while (randomizeConfig.newRandomNumber == randomizeConfig.previousRandomNumber) {
			randomizeConfig.newRandomNumber = Math.floor(Math.random() * array.length);
		}
		randomizeConfig.previousRandomNumber = randomizeConfig.newRandomNumber;
		console.log(randomizeConfig)

	} else {
		randomizeConfig.start++;
		console.log(randomizeConfig)
	}
}

export function footer() {
	let $footerLogo = $('.footer-logo'),
		$speechBubble = $('.footer-text-bubble'),
		phrases = [],
		randomNumberConfig = {
			start: 0,
			newRandomNumber: 0,
			previousRandomNumber: 0
		}

	switch($('html').attr('class')) {
	    case 'cinco-de-mayo':
	        phrases = ["Happy Cinco De Mayo!!", "Yo Quiero Taco Bell!",]
	        break;
	    case 'easter':
	        phrases = ["Happy Easter!", "He is risen!"]
	        break;
	    case 'thanksgiving':
	        phrases = ["Happy Thanksgiving!", "Gobble Gobble!", "It's Turkey Time!", "I'm Stuffed!"]
	        break;
	    case 'christmas':
	        phrases = ["Merry Christmas!", "A child is born!", "", "I'm Stuffed!"]
	        break;
	    case 'st-pattys':
	        phrases = ["Happy St. Patrick's Day!", "Feeling Lucky?", "Don't Pinch Me!", "They're after me lucky charms!", "Cheers!"]
	        break;
	    default:
	        phrases = ["Hi there!", "That tickles!", "Boo!", "What's up?"]
	}

	

	$footerLogo.click(() => {
		debug('Mii Clicked!', 'success')
		randomizePhrases(phrases, randomNumberConfig)
		footerPhrase(phrases[randomNumberConfig.newRandomNumber], $speechBubble)
	})
}
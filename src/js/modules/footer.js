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
	    case 'valentines':
	        phrases = ["Who is the fairest of them all?", "I'm single ;)?", "I love you too", "You had me at hello."]
	        break;
	    default:
	        phrases = ["Hi there!", "That tickles!", "What's up?", "The cake is a lie.", "I know kung fu", "Life is like a box of chocolates", "Wax on, Wax off.", "Elementary, my dear Watson.", "That'll do pig, that'll do.", "Say hello to my little friend", "Why so serious?", "As you wish", "Are you not entertained?", "Click me again", "The names Knopp. Kevin Knopp.", "There's no place like home", "May the force be with you", "Great Scott!", "Where we're going, we don't need roads.", "The princess is in another castle!", "Gotta catch 'em all!"]
	}

	

	$footerLogo.click(() => {
		debug('Mii Clicked!', 'success')
		randomizePhrases(phrases, randomNumberConfig)
		footerPhrase(phrases[randomNumberConfig.newRandomNumber], $speechBubble)
	})
}
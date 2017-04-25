import $ from 'jquery';
import MobileDetect from 'mobile-detect'

//Module imports
import { debug } from "./modules/debug";
import { grid } from "./modules/grid";
import { konami } from "./modules/konami-code";


$(document).ready(function() {

	debug('document ready')
	
	//Variables
	let md = new MobileDetect(window.navigator.userAgent),
	$header = $('.header'),
	$navTrigger = $('.nav-trigger img'),
	$portfolioPiece = $('.portfolio-piece')
	
	//Mobile Detect
    if (md.mobile()) {
      $('html').addClass('isMobile')
    }
	
	
	
	//Nav Controls
	$navTrigger.click(function () {
		$(this).toggleClass('active')
		$header.toggleClass('active')
		debug("toggle header");
	})
	
	grid();
	konami();
});
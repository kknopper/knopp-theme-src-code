import $ from "jquery";
import { debug } from "./debug";
import mixitup from 'mixitup';
import imagesLoaded from 'imagesloaded';
imagesLoaded.makeJQueryPlugin($);
// import mojs from 'mo-js';
// jQuery.ready(function() {
// 	console.log('add filterizr')
// 	require('filterizr');
// })

function grid() {
	let $grid = $('.portfolio-grid'),
	$gridItemImg = $('.portfolio-piece img'),
    $gridItem = $('.portfolio-piece'),
    $gridExpansions = $('.portfolio-piece-expansion'),
    $overlayClose = $('.overlay-close'),
    $overlay = $('.overlay'),
    $overlayContent = $('.overlay-content'),
    $body = $('body'),
    $html = $('html');

    if ($grid.length > 0) {
      debug('Initiate Grid', 'success');

	   let mixer = mixitup($grid, {
    	   selectors: {
        	   target: '.portfolio-piece'
    	   },
    	   animation: {
        	   duration: 500
    	   }
	   });

       let fillColor = $('.theme-color-bg-secondary').css('background-color');

       let circleOverlay = new mojs.Shape({
           shape: 'circle',
           isShowStart:  true,
           radius: 20,
           fill: fillColor,
           // parent: '.portfolio-grid',
           className: 'circle-overlay',
           opacity: {0:1},
           duration: 400,
           delay: 300
       }).then({
           scale: { 0.5 : 50 },
           duration: 500,
       });

       let circleOverlayInitialHeight = $('.circle-overlay').outerHeight()
        let circleOverlayInitialWidth = $('.circle-overlay').outerWidth()

       function recalcCircleCenter(expandOut) {
        let $gridPortfolioPieceWrap = $('.portfolio-piece.active').find('.portfolio-piece-wrap');
        let $circleOverlay = $('.circle-overlay');

        let newCoordinates = {};
        
        let squareWidth = $gridPortfolioPieceWrap.width() / 2;
        let squareOffset = $gridPortfolioPieceWrap.offset();

        newCoordinates.top = (($gridPortfolioPieceWrap.outerHeight() - circleOverlayInitialHeight * 0.25) / 2 + squareOffset.top + 'px');
        newCoordinates.left = (($gridPortfolioPieceWrap.outerWidth() - circleOverlayInitialWidth * 0.25)  / 2 + squareOffset.left+ 'px');
        newCoordinates.radius = squareWidth * 0.25;
        console.log(circleOverlay);
        console.log(newCoordinates)

        if(expandOut) circleOverlay.tune({ left: newCoordinates.left, top: newCoordinates.top, radius: newCoordinates.radius }).play();
        else circleOverlay.tune({ left: newCoordinates.left, top: newCoordinates.top, radius: newCoordinates.radius }).playBackward()
       }


        $gridItem.click(function(e) {
            e.preventDefault();
            //remove currecnt active states
            $gridItem.removeClass('active');
            $(this).addClass('active-animations');
            $(this).addClass('active');

            // let squareWidth = $(this).find('.portfolio-piece-wrap').width() / 2;
            // let squareOffset = $(this).find('.portfolio-piece-wrap').offset();

            // let newTop = (($(this).find('.portfolio-piece-wrap').outerHeight() - $('.circle-overlay').outerHeight() * 0.25) / 2 + squareOffset.top + 'px');
            // let newLeft = (($(this).find('.portfolio-piece-wrap').outerWidth() - $('.circle-overlay').outerWidth() * 0.25)  / 2 + squareOffset.left+ 'px');
            // let newRadius = squareWidth * 0.25

            // circleOverlay.tune({ left: newLeft, top: newTop, radius: newRadius }).play();
            recalcCircleCenter(true);

            let newHTML = $(this).find('.portfolio-piece-expansion').html();

            $overlay.addClass('active')
            $overlayContent.html(`<div class="container">${newHTML}</div>`);
            $html.addClass('noscroll')


        });

         $overlayClose.click(function() {
            recalcCircleCenter(false);
            $gridItem.removeClass('active');
            $overlay.removeClass('active')
            $overlayContent.html('');
            $html.removeClass('noscroll');
            
            //Wait for animatins to end based off css transtions
            //removes class so transtions dont conflict with mixitup transitions
            setTimeout(function() {
                debug('remove after complete animtion')
                $gridItem.removeClass('active-animations');
            }, 1000)
        });

        



        $grid.imagesLoaded(function() {
            debug('Grid images loaded');
        })
    }
}

export { grid };
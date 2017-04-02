//=require zepto/src/zepto.js
//=require zepto/src/event.js
//=require zepto/src/ie.js

$(function() {
    var gallerySwitchClass = 'screenshot__gallery--on';
    var bodyNoScrollClass = 'body--no-scroll';
    var screenshotsHash = 'screenshots';
    var closeScreenshotsHash = 'close';

    var $body = $('.js-body');
    var $screenshotTrigger = $('.js-screenshot-trigger');
    var $gallery = $('.js-gallery');
    var $screenshotClose = $('.js-gallery__close');
    var $screenshotsPlaceholder = $('.js-gallery__list');

    function showGallery() {
        $gallery.addClass(gallerySwitchClass);
        $gallery.scrollTop(0);
        $body.addClass(bodyNoScrollClass);
        location.hash = screenshotsHash;
    }

    function hideGallery() {
        $gallery.removeClass(gallerySwitchClass);
        $body.removeClass(bodyNoScrollClass);
        location.hash = closeScreenshotsHash;
    }

    var screenShots = {
        hypouvery:
            '<img src="/images/screenshots/hypouvery.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/hypouvery2.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/hypouvery3.jpg" class="screenshot__pic">',
        staffinoBU:
            '<img src="/images/screenshots/bu1.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/bu2.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/bu3.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/bu4.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/bu5.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/bu6.png" class="screenshot__pic">',
        staffinoBUmob:
            '<img src="/images/screenshots/buapp-1.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/buapp-2.png" class="screenshot__pic">' +
            '<img src="/images/screenshots/buapp-3.png" class="screenshot__pic">',
        staffinoWeb:
            '<img src="/images/screenshots/staffino-web1.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/staffino-web2.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/staffino-web3.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/staffino-web4.jpg" class="screenshot__pic">',
        luigisbox:
            '<img src="/images/screenshots/luigisbox1.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/luigisbox2.jpg" class="screenshot__pic">' +
            '<img src="/images/screenshots/luigisbox3.jpg" class="screenshot__pic">'
    };

    $screenshotTrigger.on('click', function (e) {
        e.preventDefault();

        var screenshotsName = $(e.currentTarget).attr('data-screenshots-name');
        $screenshotsPlaceholder.html(screenShots[screenshotsName]);

        showGallery();
    });

    $screenshotClose.on('click', function (e) {
        e.preventDefault();

        hideGallery();

        $screenshotsPlaceholder.html('');
    });

    window.onpopstate = function () {
        if (location.hash != '#' + screenshotsHash) {
            hideGallery();
        }
    };

    document.onkeyup = function (e) {
        if (e.keyCode == 27) { // escape key
            hideGallery();
        }
    };
});
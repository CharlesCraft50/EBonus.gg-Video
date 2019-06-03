// ==UserScript==
// @name         EBonus.gg Video
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Click the next video button automatically. With other cool features added. It also skip the captcha!
// @author       CharlesCraft50
// @copyright    2019, CharlesCraft50 (https://openuserjs.org/users/CharlesCraft50)
// @license      MIT
// @include      https://ebonus.gg/earn-coins/watch/*
// @match        https://www.google.com/recaptcha/api2/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @namespace    https://greasyfork.org/en/users/306626-charlescraft50

// ==/UserScript==

$(document).ready(function(){

    //Functions
    window.ClickNext = function(){
        if ($(".coins_popup.circle.adsbox").length > 0 || $('div.adsbox:contains("COINS")').length > 0) {
            circleClicked += 1;
            sessionStorage.setItem("circleClick", circleClicked);
            console.log("circle clicked = " + circleClicked);
            $(".coins_popup.circle.adsbox").click();
            $('.coins_popup.circle.adsbox a').trigger('click');
            $('div.adsbox:contains("COINS")').click();
        }
    };

    window.ClickOnBubble = function(){
        if ($(".sweet-alert.showSweetAlert.visible").length > 0) {
            console.log("videos clicked");
            $(".confirm").click();
            setTimeout(function(){window.location.href = 'https://ebonus.gg/earn-coins/watch/';}, 5000);
        }
    };

    //Captcha Funtion
    window.captchaResolve = function(){
        var clickCheck = setInterval(function() {
            if (document.querySelectorAll('.recaptcha-checkbox-checkmark').length > 0) {
                clearInterval(clickCheck);
                document.querySelector('.recaptcha-checkbox-checkmark').click();
            } else {
                clearInterval(clickCheck);
            }
        }, 1000);
        setTimeout(function(){$('input[value="Continue"]').click();}, 15000);
    };

    setTimeout(captchaResolve, 5000);

    setTimeout(function(){window.location.href='https://ebonus.gg/earn-coins/watch';}, 120000);

    if($('p:contains("Please complete this captcha to continue watching videos.")').length > 0 || $('label[for="CAPTCHA"]').length > 0) {
        //Captcha Resolver
        //captchaResolve();
    } else {
        //Start
        var coinsclicker = setInterval(function() {
            ClickNext();
            ClickOnBubble();
        }, 1000);
        $('li:contains("144")').click();
        $('span:contains("Mute")').click();
    }

    var removeElements = function(text, selector) {
        var wrapped = $("<div>" + text + "</div>");
        wrapped.find(selector).remove();
        return wrapped.html();
    }



    if(sessionStorage.getItem("coinGet") === null || sessionStorage.getItem("coinGet") == NaN || sessionStorage.getItem("coinGet") == "NaN") {
        var coinCount = 0;
    } else {
        coinCount = parseInt(sessionStorage.getItem("coinGet"));
    }

    if(sessionStorage.getItem("circleClick") === null || sessionStorage.getItem("circleClick") == NaN || sessionStorage.getItem("circleClick") == "NaN") {
        var circleClicked = 0;
    } else {
        circleClicked = parseInt(sessionStorage.getItem("circleClick"));
    }

    if(sessionStorage.getItem("coinsEarned") === null || sessionStorage.getItem("coinsEarned") == NaN || sessionStorage.getItem("coinsEarned") == "NaN") {
        var coinsEarn = 0;
        sessionStorage.setItem("coinsEarned", coinsEarn);
    } else {
        coinsEarn = parseInt(sessionStorage.getItem("coinsEarned"));
    }

    if($('p:contains("Please complete this captcha to continue watching videos.")').length > 0 || $('label[for="CAPTCHA"]').length > 0) {
        console.log("Captcha Alert");
    } else {
        if($("#next-video-btn").html() == "Next Video [10/10]") {
            coinsEarn = parseInt(sessionStorage.getItem("coinsEarned")) + parseInt(removeElements($('a[href="#coins_per_video"]').html(), "i").replace(/to earn|coins!|\s/gi, ""));
            sessionStorage.setItem("coinsEarned", coinsEarn);
        }

        if($("#next-video-btn").html() == "Next Video [1/10]") {
            coinCount += 1;
            sessionStorage.setItem("coinGet", coinCount);
            console.log("10 videos = " + coinCount);
        }
    }

    console.log("10 videos = " + coinCount);

    //Coins Earned:
    $("body").append("<div class='button offer-button' style='position: fixed; bottom: 0; right: 0; font-size: 20px;' title='(10 Videos) = "+coinCount+"'>Coins Earned: " + coinsEarn +" <div class='coin-image' style='width:16px;background-size:16px;height:16px;margin-bottom:-2px;'></div></div>");
    $("body").append("<div class='button offer-button' style='position: fixed; bottom: 45px; right: 0; font-size: 20px;'>Video "+$('a#next-video-btn').html().replace(/Next Video /gi, '')+": "+coinCount+"</div>");
});

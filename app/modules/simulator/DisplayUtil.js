define(function(require, exports, module) {
    var $ = require('jquery');

    function formatDigits(number) {
        var digis = '--.---';
        if(number===null) {
            digis = '--.---';
        }else if(number<100){
            digis = number.toFixed(3);
        } else if(number<1000) {
            digis = number.toFix(2);
        } else if(number<10000) {
            digis = number.toFix(1);
        }
        return digis.replace(/1/g,' 1');
    }
    function formatAngle(degree) {
        return degree.toFixed(1).replace(/1/g,' 1');
    }

    exports.turnOnLaser = function() {
        $('#laser').removeClass('laser-off').addClass('laser-on');
        $('#light').show();
    };

    exports.turnOffLaser = function () {
        $('#laser').removeClass('laser-on').addClass('laser-off');
         $('#light').hide();
    };
    exports.updateAngle = function(degree) {
        $('#result-1-number').text(formatAngle(degree));
    };
    exports.updateLine1 = function(number) {
        $('#result-1-number').text(formatDigits(number));
    };

    exports.updateLine2 = function(number) {
        $('#result-2-number').text(formatDigits(number));
    };

    exports.updateLine3 = function(number) {
        $('#result-3-number').text(formatDigits(number));
    };

    exports.updateLine4 = function(number) {
        $('#result-4-number').text(formatDigits(number));
    };

    exports.updateScreenClass = function(className) {
        $('#screen').attr('class', className);
    };

    exports.updateLine4Sup = function(number) {
        $('#result-4-sup').html(number);
    };
    exports.startLoadingAnimation = function() {

    };
    exports.stopLoadingAnimation = function() {

    };
    exports.changeBase = function() {
        var $base = $('#base');
        if($base.hasClass('base-top')) { $base.removeClass('base-top').addClass('base-bottom'); }
        else { $base.removeClass('base-bottom').addClass('base-top');}

    };



});
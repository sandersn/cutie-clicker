/// <reference path="types.ts"/>
/// <reference path="../external/jquery.d.ts"/>
// Displays stuff related to stats

!function() {
  // Update stat display
  cc.loop.draw(function() {
    // Middle cutie stats
    cc.cuties.m(function(cutie) {
      // Easy to display stats
      $('#cutie-stats .love').html(cutie.love());

      // Display XP
      var xpPercentage: SchemeNumber = SchemeNumber('0');
      // Prevent divide by zero and other weird issues like that
      if(SchemeNumber.fn['>'](cutie.targetxp(), '0')) {
        // Note: This is inexact! Don't save it!
        xpPercentage = SchemeNumber.fn['*']('100', SchemeNumber.fn['/'](cc.stats.excitement(), cutie.targetxp()));
      } else {
        // Assume that targetxp is 0.
        xpPercentage = SchemeNumber('100');
      }
      // Cap it at 0 and 100
      xpPercentage = SchemeNumber.fn.max('0', SchemeNumber.fn.min('100', xpPercentage));

      // Display them as sizes
      cc.util.cssrule('.cv-xp-percentage-height')({
        height: xpPercentage.toFixed(3) + '%'
      });
      cc.util.cssrule('.cv-xp-percentage-width')({
        width: xpPercentage.toFixed(3) + '%'
      });
    });
  });

  // Cost calculation class
  cc.loop.draw(function() {
    $('.cv-mp-cost').each(function(index, element) {
      // Grab data-cost
      var dataCost = $(this).attr('data-cost');
      if($.type(dataCost) === 'undefined') {
        return;
      }
      // Set converted cost
      var cost = cc.stats.mpcostcalc(dataCost);
      if($(this).html() != cost) {
        $(this).html(cost);
      }
    });
  });

  // Cutie count class
  cc.loop.draw(function() {
    cc.util.cssrule('.cv-cutie-count::before')({
      content: "'" + cc.cuties.list().length + "'"
    });
    // Amount of xp drained a second
    cc.util.cssrule('.cv-xp-drain-sec::before')({
      content: "'" + (cc.cuties.list().length / 9).toFixed(1) + "'"
    });
  });

  // Empathy class
  cc.loop.draw(function() {
    cc.util.cssrule('.cv-empathy::before')({
      content: "'" + cc.stats.empathy() + "'"
    });
  });

  // Bursting stuff
  cc.loop.draw(function() {
    // Notify game that bursting is ready if it is
    if(cc.burstReady) {
      $('html').addClass('ce-burst-ready');
    } else {
      $('html').removeClass('ce-burst-ready');
    }

    // Figure out classes for #layer-burst
    cc.cuties.m(function(cutie) {
      // Stages
      var burstClasses = '';
      var nonBurstClasses = ''
      if(cc.burstStart || cc.ls.d.preBurst) {
        burstClasses += ' burst-pre';
      } else {
        nonBurstClasses += ' burst-pre';
      }
      if(cc.ls.d.postBurst) {
        if(cc.ls.d.postBurst > 0) {
          burstClasses += ' burst-post-win';
          nonBurstClasses += ' burst-post-fail';
        } else {
          burstClasses += ' burst-post-fail';
          nonBurstClasses += ' burst-post-win';
        }
      } else {
        nonBurstClasses += ' burst-post-win burst-post-fail';
      }
      if(cc.ls.d.burst) {
        burstClasses += ' burst-active';

        // Target
        if(cutie.targetBpMet()) {
          burstClasses += ' burst-ok';
        } else {
          nonBurstClasses += ' burst-ok';
        }
      } else {
        nonBurstClasses += ' burst-active burst-ok'
      }

      $('html').addClass(burstClasses).removeClass(nonBurstClasses);
    });
  })
}();

/// <reference path="types.ts"/>
/// <reference path="../external/jquery.d.ts"/>
// Screen effects!
interface Parallax {
  x: number;
  y: number;
  gamma?: number;
  beta?: number;
}
interface Rotation {
  gamma: number;
  beta: number;
}
interface RotationEvent extends Event {
  gamma: number;
  beta: number;
}

!function() {
  // Parallax handling
  var lastTiltTime = 0;
  var parallaxData: Parallax = {x: 0, y: 0};
  function parallax(mouseX, mouseY) {
    parallaxData.x = mouseX;
    parallaxData.y = mouseY;
  }
  function parallaxTilt(gamma, beta) {
    parallaxData.gamma = gamma;
    parallaxData.beta = beta;
    lastTiltTime = $.now();
  }
  cc.loop.draw(function(now) {
    var mouseX, mouseY;

    // Tilt or mouse?
    if(now > lastTiltTime + 1000) {
      mouseX = parallaxData.x;
      mouseY = parallaxData.y;
    } else {
      var adjustedData = tiltAdjustment(parallaxData.gamma, parallaxData.beta);
      mouseX = adjustedData.x;
      mouseY = adjustedData.y;
    }

    // Ensure range is okay
    if(mouseX < -1) mouseX = -1;
    else if(mouseX > 1) mouseX = 1;
    if(mouseY < -1) mouseY = -1;
    else if(mouseY > 1) mouseY = 1;

    var xMult = $('html').width();
    var yMult = $('html').height();

    xMult *= .005 * mouseX;
    yMult *= .005 * mouseY;

    cc.util.cssrule('.parallax-0')({
      transform: 'translate(' + (1 * xMult) + 'px,' + (1 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax--0')({
      transform: 'translate(' + (-1 * xMult) + 'px,' + (-1 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax-1')({
      transform: 'translate(' + (2 * xMult) + 'px,' + (2 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax--1')({
      transform: 'translate(' + (-2 * xMult) + 'px,' + (-2 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax-2')({
      transform: 'translate(' + (4 * xMult) + 'px,' + (4 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax--2')({
      transform: 'translate(' + (-4 * xMult) + 'px,' + (-4 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax-3')({
      transform: 'translate(' + (8 * xMult) + 'px,' + (8 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax--3')({
      transform: 'translate(' + (-8 * xMult) + 'px,' + (-8 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax-4')({
      transform: 'translate(' + (16 * xMult) + 'px,' + (16 * yMult) + 'px)'
    });
    cc.util.cssrule('.parallax--4')({
      transform: 'translate(' + (-16 * xMult) + 'px,' + (-16 * yMult) + 'px)'
    });
  });

  $(window).on('mousemove.parallax', function(ev) {
    // Need to use body size, since document includes everything, and I have no idea what window is doing
    var mouseX = ((ev.pageX - $(window).scrollLeft())/($('html').width() - 1));
    var mouseY = ((ev.pageY - $(window).scrollTop())/($('html').height() - 1));

    mouseX = 2 * (mouseX - .5);
    mouseY = 2 * (mouseY - .5);

    parallax(mouseX, mouseY);
  });
  var tiltCenter: Rotation = {gamma: 0, beta: 0};
  function tiltAdjustment(orig, orib): Parallax {
    // Begin by normalizing.
    var originalGamma = (orig / 30);
    var originalBeta = (orib / 30);

    // Adjust for annoying orientation issues
    let gamma: number;
    let beta: number;
    if(window.orientation == 90) {
      gamma = originalBeta;
      beta = -originalGamma;
    } else if(window.orientation == -90) {
      gamma = -originalBeta;
      beta = originalGamma;
    } else {
      gamma = originalGamma;
      beta = originalBeta;
    }

    // Recenter gamma and beta
    let centeredGamma = gamma - tiltCenter.gamma;
    let centeredBeta = beta - tiltCenter.beta;

    // Perform nudging
    if(centeredGamma < -1) tiltCenter.gamma = gamma + 1;
    else if(centeredGamma > 1) tiltCenter.gamma = gamma - 1;
    if(centeredBeta < -1) tiltCenter.beta = beta + 1;
    else if(centeredBeta > 1) tiltCenter.beta = beta - 1;

    return {x: centeredGamma, y: centeredBeta};
  }
  var lastTilt: Rotation = {gamma: 0, beta: 0};
  $(window).on('deviceorientation', function(ev) {
    var gamma = (<RotationEvent>ev.originalEvent).gamma; // TODO: Not sure where these properties are added.
    var beta = (<RotationEvent>ev.originalEvent).beta;

    // Don't do anything if gamma and beta haven't changed much
    if(Math.abs(gamma - lastTilt.gamma) < 3 && Math.abs(beta - lastTilt.beta) < 3) {
      return;
    } else {
      lastTilt.gamma = gamma;
      lastTilt.beta = beta;
    }

    parallaxTilt(gamma, beta);
  });
}();

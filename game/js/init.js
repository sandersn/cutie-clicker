// Initalize cutie clicker main object
window.cc = window.cc ? cc : {};

!function() {

  // Create init function
  cc.init = function() {
    // Remember when we started
    var initBeginTime = $.now();

    // Keep track of pending tasks
    var pendingActions = [];

    // Make done no longer run the start check
    var disableActionCheck = false;

    // Switch site to loading mode
    $('html').addClass('loading');
    var loadingMessageIntervalId = setInterval(function() {
      // Make a new array of all the action messages
      var actionMsgs = $.map(pendingActions, function(action) {
        // If it's undefined, it just skips over this.
        return action.msg;
      });

      // Set loading message to those messages
      $('#site-game-loading').html(actionMsgs.join(' '));
    }, 100);

    // This function actually uses pendingActions above
    function addAction(action, runFunction) {
      // When did this start?
      var actionBeginTime = $.now();

      // Create a default function that just returns argument
      runFunction = runFunction || function(arg) {
        return arg;
      };

      var actionRemover = function() {
        // Remove this function from array
        pendingActions.splice(pendingActions.indexOf(actionRemover), 1);

        // Calculate and record how long this action took
        var actionTotalTime = $.now() - actionBeginTime;
        ga('send', 'timing', 'Game Init', action, actionTotalTime, 'Runtime for ' + action);

        // Are we ready to start?
        if(pendingActions.length <= 0 && !disableActionCheck) {
          // This happened once, so it can't happen again
          disableActionCheck = true;

          // Data update script. This is here because it pretty much requires everything.
          addAction('&#9853;', function(done) { // ♽
            $.getScript('game/js/update.js?nocache=' + initBeginTime).done(function() {
              // Remove this item
              done();

              // Remove loading message timer thingie
              clearInterval(loadingMessageIntervalId);

              // Clear body
              $('body').html('');
              // Remove all classes from html
              $('html').removeClass();

              // Load page
              $('body').load('game/index.html?nocache=' + initBeginTime, function() {
                $.getScript('game/js/index.js?nocache=' + initBeginTime).done(function() {
                  // How long did this all take?
                  var msSinceStart = $.now() - initBeginTime;

                  // Send it to Google Analytics
                  ga('send', 'timing', 'Game Init', 'total', msSinceStart, 'Total cc.init runtime');
                });
              });
            });
          });
        }
      }

      // Add actionRemover to pending actions
      pendingActions.push(actionRemover);

      // Set message to action parameter
      actionRemover.msg = action;

      return runFunction(actionRemover);
    }
    // Make this function accessible everywhere
    cc.init.addAction = function(action, runFunction) {
      return addAction(action, runFunction);
    }

    // Helper function because I do this a million times below
    function addScript(action, script, nocache) {
      addAction(action, function(done) {
        // Check for nocache, which adds init time, to prevent caching!
        $.getScript(script + (nocache ? '?nocache=' + initBeginTime : '')).done(done);
      });
    }
    // Make this accessible everywhere as well
    cc.init.addScript = function(action, script, nocache) {
      return addScript(action, script, nocache);
    }

    // This action ensures that all actions have time to start
    addAction('&#9852;', function(done) { // ♼

      // Existing instance checker
      addAction('&#10063;', function(done) { // ❏
        // Allow code below to run too
        setTimeout(function() {
          // Use this method of "checking" to see if localStorage works
          try {
            // Retrieve opposite of flag
            var flag = window.localStorage.getItem('cc-instchk') || '0';
            flag = flag == '0' ? '1' : '0';
            // Update flag
            window.localStorage.setItem('cc-instchk', flag);

            // Watch flag for changes
            $(window).on('storage', function(ev) {
              console.log(ev.key);
              if(ev.originalEvent.key == 'cc-instchk' && ev.originalEvent.storageArea == window.localStorage) {
                // It changed! Exit!
                window.location = 'about:blank';
              }
            });

            done();
          } catch(e) {
            // Looks like it failed, and there's no need to check for multiple instances.
            done();
          }
        }, 0);
      });

      // lz-string (data compression library)
      addScript('&#11075;', 'lib/lz-string.min.js?uploadtime=11.13'); // ⭃

      // Rhaboo (data storage library)
      addScript('&#9923;', 'lib/rhaboo.min.js?uploadtime=11.13'); // ⛃

      // schemeNumber (accurate numbers library)
      addScript('&#9320;', 'lib/schemeNumber.min.js?uploadtime=11.13'); // ⑨

      // cc.util
      addScript('&#9939;', 'game/js/util.js', true); // ⛓

      // cc.stats
      addScript('&#127918;', 'game/js/stats.js', true); // 🎮

      // cc.cuties
      addScript('&#9829;', 'game/js/cuties.js', true) // ♥

      done();
    });
  };

}();

// Run it to simplify calling code (for now)
cc.init()

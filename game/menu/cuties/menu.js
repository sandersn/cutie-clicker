!function() {
  var lastListUpdate, lastMode;
  var cutieTemplate = function() {
    return $();
  }
  var backButtonTemplate = cutieTemplate;

  var script = 'cuties', dir = 'menu/' + script + '/',
  menu = cc.menu[script] = function(element, state) {
    cc.util.getcss(dir + 'menu.css');
    element.load(cc.util.l(dir + 'menu.html'), function() {
      // Create a template cutie card
      var cutieOriginal = element.find('.menu-cuties-list-button').remove();
      cutieTemplate = function() {
        return cutieOriginal.clone();
      }

      // Create template back button
      var backButtonOriginal = element.find('#menu-cuties-pane-back').remove();
      backButtonTemplate = function() {
        return backButtonOriginal.clone();
      }

      // Register handlers
      $('#menu-cuties-main').on('click.card-button-click', '.menu-cuties-list-button', cutieButtonClick);

      // Reset local state variables
      lastListUpdate = 0;
      lastMode = '';

      // Launch state change
      cc.menu.restate();
    });
  };

  menu.stateChanged = function(state) {
    var mode = state.mode || 'view';
    // Remove old wrapper classes and add new state in
    $('#menu-cuties-wrap').removeClass().addClass('menu-cuties-mode-' + (state.mode || 'view'));

    // Update pane and list
    paneChange(state);
    listUpdate(state);

    lastMode = mode;

    // Clear selections if necessary (based on lastMode)
    var lastMode = state.lastMode || '';
    if(lastMode != mode) {
      cc.cuties.selection('menu', true);
      state.lastMode = mode;
    }
  }

  function paneChange(state) {
    var paneElement = $('#menu-cuties-pane');
    if(paneElement.length < 1) {
      // Pane doesn't exist for some reason.
      return;
    }

    // Load in new pane
    paneElement.load(cc.util.l(dir + (state.mode || 'view') + '/pane.html'), function() {
      if(state.mode && state.mode != 'view') {
        // Need back button
        paneElement.prepend(backButtonTemplate());

        if(state.mode == 'delete') {
          deleteModeActivated();
        }
      }
    });
  }

  function deleteModeActivated() {
    // Register button handler
    $('#menu-cuties-pane-action-button').click(function() {
      // Delete them all
      var cutieIndex;
      // While there's still more cuties to delete
      // Fetch cutie while checking
      while($.type(cutieIndex = cc.cuties.selection('menu').shift()) !== 'undefined') {
        if(cutieIndex === 0) {
          // REPLACE THIS LATER ONCE CUTIE EQUIPS ARE POSSIBLE
          // Keeps cutie 0 from being deleted
          continue;
        }

        cc.cuties.remove(cutieIndex);
      }
      // Refresh state
      cc.menu.restate();
    });
  }

  function listUpdate(state) {
    if(lastListUpdate == cc.cuties.listTime) {
      return;
    } else {
      lastListUpdate = cc.cuties.listTime;
    }

    var oldListElement = $('#menu-cuties-list');
    if(oldListElement.length < 1) {
      // List doesn't exist for some reason.
      lastListUpdate = 0;
      return;
    }

    var listElement = $('<div id="menu-cuties-list">');

    var cutieDeferreds = [];
    var cutiesList = cc.cuties.list();
    $.each(cutiesList, function(index, value) {
      // This allows waiting for all cuties to finish
      var defer = $.Deferred();
      cutieDeferreds.push(defer);

      cc.cuties(index, function(cutie) {
        var cutieElement = cutieTemplate();
        cutie.renderCutieCard(cutieElement, 'menu-cuties-list-button');

        // Store cutie object on cutieElement
        cutieElement.data('cutie', cutie);

        cutieElement.appendTo(listElement);

        defer.resolve();
      });
    });

    $.when.apply($, cutieDeferreds).then(function() {
      // All cuties are done
      oldListElement.replaceWith(listElement);
    });
  }

  function cutieButtonClick(ev) {
    var cutieElement = $(this);
    var cutie = cutieElement.data('cutie');

    if(cc.menu.state().mode && cc.menu.state().mode != 'view') {
      cutie.select('menu');
    }
  }

  menu.draw = function(now) {
    // Update cutie card displays
    $('.menu-cuties-list-button').each(function(index, element) {
      var cutieElement = $(element);
      var cutie = cutieElement.data('cutie');

      // Sorting stuff
      var sortIndex = cutie.index();
      var lastIndex = cutieElement.data('lastIndex');
      if(sortIndex !== lastIndex) {
        cutieElement.css('order', sortIndex);
        cutieElement.find('.sort-data').html(function() {
          return '# ' + (sortIndex + 1);
        });
        cutieElement.data('lastIndex', sortIndex);
      }

      // Info display stuff
      var infoOne = (function() {
        return '<span class="cs cs-love"></span> ' + cutie.love();
      })();
      if(cutieElement.find('.info-1').html() != infoOne) {
        cutieElement.find('.info-1').html(infoOne);
      }
      var infoTwo = (function() {
        return '<span class="cs cs-excitement"></span> ' + cutie.targetxp();
      })();
      if(cutieElement.find('.info-2').html() != infoTwo) {
        cutieElement.find('.info-2').html(infoTwo);
      }

      // Selection stuff
      var selectionIndex = cutie.selected('menu');
      var selected = selectionIndex > -1;
      var lastSelected = cutieElement.data('selected');
      if(selected !== lastSelected) {
        if(selected) {
          cutieElement.find('.selection-wrapper').addClass('selected selected-' + selectionIndex);
        } else {
          cutieElement.find('.selection-wrapper').removeClass().addClass('selection-wrapper');
        }
        cutieElement.data('selected', selected);
      }
    });
  };
}();

/// <reference path="../external/jquery.d.ts"/>
/// <reference path="../external/lz-string.d.ts"/>
/// <reference path="types.ts"/>
// This provides general utility stuff.

!function() {
  cc.util = <Util>{};

  // Gets / Sets a LZ compressed SchemeNumber number from Rhaboo
  cc.util.rhanum = function(parent, name, value) {
    if($.type(value) === 'undefined') {
      // Getter
      var number: string | number | SchemeNumber = parent[name];

      if($.type(number) !== 'string') {
        if($.type(number) === 'number') {
          // Looks like this was stored as just a number before.
          return String(number);
        }

        // Something weird happened.
        return;
      }

      return LZString.decompress(<string>number);
    } else {
      // Setter
      var number: string | number | SchemeNumber = String(value);
      number = SchemeNumber(<string>value);
      var uncompressedNumber = number = String(number);
      number = LZString.compress(<string>number);
      parent.write(name, number);

      // This returns number before it was compressed
      return uncompressedNumber;
    }
  }

  // Create a css rule
  var memoRuleFunctions: Map<{<T>(name: string | Map<T>, value?: T): void }> = {};
  cc.util.cssrule = function(selector: string) {
    if(memoRuleFunctions[selector]) {
      return memoRuleFunctions[selector];
    } else {
      var element = $('<style>');
      $('head').append(element);
      var rules: Map<any> = {};

      function addRule<T>(name: string | Map<T>, value?: T): void {
        if(value) {
          var nameValueObject: Map<T> = {};
          nameValueObject[<string>name] = value;
          return addRule(nameValueObject);
        } else {
          // Record changed rules
          $.each(name, function(key: string, value: T) {
            if(value) {
              rules[key] = value;
            } else {
              delete rules[key];
            }
          });

          // Update css element
          var ruleString = selector + '{';
          $.each(rules, function(rule, value) {
            ruleString += rule + ':' + value + ';';
          });
          ruleString += '}';
          if(element.html() != ruleString) {
            element.html(ruleString);
          }
        }
      }

      return memoRuleFunctions[selector] = addRule;
    }
  };

  // Gets rid of caching and adds 'game/' to the front of url if it's not already there so I can stop typing it
  cc.util.l = function(url) {
    if(url.search(/^\/?game\//i) < 0) {
      // Need to add game
      url = 'game/' + url;
    }

    if(url.search(/ /) < 0) {
      // No spaces. Add a ? or a ; intelligently.
      return url + ((url.search(/\?/) < 0) ? '?' : ';') + '_=' + cc.v;
    } else {
      // There's a space.
      return url.replace(/ /, ((url.search(/\?/) < 0) ? '?' : ';') + '_=' + cc.v + ' ');
    }
  }

  // Load a css file
  var loadedCss: Map<JQuery> = {};
  cc.util.getcss = function(url) {
    // Disable caching (add ? or ; on based on whether there's already a ? or not)
    return loadedCss[url] = loadedCss[url] || $('<link rel="stylesheet">').appendTo('head').attr('href', cc.util.l(url));
  };

  // Transfer mouse events over to cutie-clicker
  cc.util.transferclicks = function(element) {
    $(element).on('mousedown mouseup touchstart touchend', function(ev) {
      $('#cutie-clicker').trigger(ev.type);
    });
  }

  // Rhanum, but for incrementing numbers
  cc.util.rhainc = function(parent, name, inc) {
    // If inc isn't a string, turn it into one. If it's missing, make it 1.
    if($.type(inc) === 'undefined') {
      inc = '1';
    } else {
      inc = String(inc);
    }

    // Calculate increment
    var value = cc.util.rhanum(parent, name) || '0';
    var schemeValue = SchemeNumber.fn['+'](value, inc);

    // Save value
    cc.util.rhanum(parent, name, schemeValue);
  }
}();

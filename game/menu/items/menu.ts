!function() {
  var script = 'items', dir = 'menu/' + script + '/',
  menu = cc.menu[script] = function(element: JQuery) {
    cc.util.getcss(dir + 'menu.css');
    element.load(cc.util.l(dir + 'menu.html'));
  };
}();

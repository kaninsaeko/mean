(function () {
  'use strict';

  angular
    .module('templates')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Templates',
      state: 'templates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'templates', {
      title: 'List Templates',
      state: 'templates.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'templates', {
      title: 'Create Template',
      state: 'templates.create',
      roles: ['user']
    });*/
  }
})();

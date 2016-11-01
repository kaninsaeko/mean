(function () {
  'use strict';

  angular
    .module('statuses')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Statuses',
      state: 'statuses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'statuses', {
      title: 'List Statuses',
      state: 'statuses.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'statuses', {
      title: 'Create Status',
      state: 'statuses.create',
      roles: ['user']
    });*/
  }
})();

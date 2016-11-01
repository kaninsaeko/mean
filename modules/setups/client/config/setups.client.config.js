(function () {
  'use strict';

  angular
    .module('setups')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Setups',
      state: 'setups',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'setups', {
      title: 'List Setups',
      state: 'setups.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'setups', {
      title: 'Create Setup',
      state: 'setups.create',
      roles: ['user']
    });*/
  }
})();

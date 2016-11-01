(function () {
  'use strict';

  angular
    .module('reportings')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Reportings',
      state: 'reportings',
      type: 'dropdown',
      position: 4,
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'reportings', {
      title: 'Select Project',
      state: 'reportings.list'
    });

    Menus.addSubMenuItem('topbar', 'reportings', {
      title: 'Executive summary',
      state: 'reportings.list'
    });

    Menus.addSubMenuItem('topbar', 'reportings', {
      title: 'Summary Report',
      state: 'reportings.list'
    });

    // Add the dropdown create item
    /*Menus.addSubMenuItem('topbar', 'reportings', {
      title: 'Create Reporting',
      state: 'reportings.create',
      roles: ['user']
    });
*/  }
})();

(function () {
  'use strict';

  angular
    .module('followups')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Followups',
      state: 'followups',
      type: 'dropdown',
      position: 5,
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'followups', {
      title: 'List Followups',
      state: 'followups.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'followups', {
      title: 'Create Followup',
      state: 'followups.create',
      roles: ['user']
    });
  }
})();

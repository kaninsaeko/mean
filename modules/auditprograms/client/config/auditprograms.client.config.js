(function () {
  'use strict';

  angular
    .module('auditprograms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Auditprograms',
      state: 'auditprograms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'auditprograms', {
      title: 'List Auditprograms',
      state: 'auditprograms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'auditprograms', {
      title: 'Create Auditprogram',
      state: 'auditprograms.create',
      roles: ['user']
    });*/
  }
})();

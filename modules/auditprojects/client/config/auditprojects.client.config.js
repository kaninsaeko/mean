(function () {
  'use strict';

  angular
    .module('auditprojects')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Auditprojects',
      state: 'auditprojects',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'auditprojects', {
      title: 'List Auditprojects',
      state: 'auditprojects.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'auditprojects', {
      title: 'Create Auditproject',
      state: 'auditprojects.create',
      roles: ['user']
    });*/
  }
})();

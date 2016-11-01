(function () {
  'use strict';

  angular
    .module('fieldworks')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Fieldworks',
      state: 'fieldworks',
      type: 'dropdown',
      position: 3,
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'fieldworks', {
      title: 'View working paper',
      state: 'fieldworks.list'
    });

    Menus.addSubMenuItem('topbar', 'fieldworks', {
      title: 'Create working paper',
      state: 'fieldworks.list'
    });

    Menus.addSubMenuItem('topbar', 'fieldworks', {
      title: 'Review working paper',
      state: 'fieldworks.list'
    });

    // Add the dropdown create item
    /*Menus.addSubMenuItem('topbar', 'fieldworks', {
      title: 'Create Fieldwork',
      state: 'fieldworks.create',
      roles: ['user']
    });*/
  }
})();

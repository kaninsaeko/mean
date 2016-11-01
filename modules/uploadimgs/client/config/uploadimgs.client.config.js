(function () {
  'use strict';

  angular
    .module('uploadimgs')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Uploadimgs',
      state: 'uploadimgs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'uploadimgs', {
      title: 'List Uploadimgs',
      state: 'uploadimgs.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'uploadimgs', {
      title: 'Create Uploadimg',
      state: 'uploadimgs.create',
      roles: ['user']
    });*/
  }
})();

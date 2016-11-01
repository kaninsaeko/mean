(function () {
  'use strict';

  angular
    .module('preparations')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Preparations',
      state: 'preparations',
      type: 'dropdown',
      position: 2,
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'Project status',
      state: 'preparations.list'
    });

    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'Create Project',
      state: 'preparations.list'
    });

    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'Project assignment',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'Audit program',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'BU/BP Information',
      state: ''
    });*/


    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'preparations', {
      title: 'Create Preparation',
      state: 'preparations.create',
      roles: ['user']
    });
  }
})();

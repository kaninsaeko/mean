(function () {
  'use strict';

  angular
    .module('projects')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Preparations',
      state: 'projects',
      type: 'dropdown',
      position: 2,
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'Projects Status',
      state: 'projects.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'projects', {
      title: '---Create Project',
      state: 'projects.create',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'Project assignment',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'Audit program',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'projects', {
      title: '---Create Program',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'projects', {
      title: '---Create Template',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'projects', {
      title: '---Import from Template',
      state: ''
    });
    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'BU/BP Information',
      state: ''
    });
  }
})();

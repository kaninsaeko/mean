'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    /*Menus.addMenuItem('topbar', {
      title: 'Dash Board',
      state: 'articles.list',

      //type: 'dropdown',
      position: 1,
      roles: ['*']
    });
    /*
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'List Articles',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create Articles',
      state: 'articles.create',
      roles: ['user']
    });*/
  }
]);

(function () {
  'use strict';

  angular
    .module('auditprograms')
    .controller('AuditprogramsListController', AuditprogramsListController);

  AuditprogramsListController.$inject = ['AuditprogramsService'];

  function AuditprogramsListController(AuditprogramsService,auditprogram) {
    var vm = this;
    
    vm.auditprograms = AuditprogramsService.query();
    vm.ft = ft;
    vm.auditprogram = auditprogram;
    //57e0bdd62473bbc8011862ae
    function ft(){
      //vm.deletess = 'S';
      //auditprogram.remove({ auditprogramId: '57e0bdd62473bbc8011862ae' }, function (err) {
      //if (err) return handleError(err);
       //removed!

      //});
      if (confirm('Are you sure you want to delete?')) {
        vm.deletess = 'A'
        auditprogram.remove({ auditprogramId: '57e0bdd62473bbc8011862ae' }, function (err) {
      //if (err) return handleError(err);
       //removed!

      //});

      }
      
    }
   
  }
})();

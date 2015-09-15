function JSON_CALLBACK(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}

angular.module('elementBoxApp.account.charts', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.charts', {
      url: '/charts',
      templateUrl: 'account/charts/charts.html',
      // resolve: {
      //   GoogleCharts: function($http) {
      //     // var prom = $http({
      //     //   method: 'JSONP',
      //     //   // url: 'https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.0.11/ng-google-chart.js',
      //     //   url: 'http://www.google.com/jsapi',
      //     //   params: { SILENT_ON_ERROR: true, callback: 'JSON_CALLBACK' }
      //     // });

      //     // prom.error(function(data) {
      //     //   console.log(data);
      //     // });

      //     // prom.success(function(data, status, headers, config) {
      //     //   console.log(data);
      //     //   if (data) {
      //     //     window.$('head').append('<script type="text/javascript" src="">' + data + '</script>');
      //     //   }

      //     // var prom = window.$.getScript('https://www.google.com/jsapi',
      //     //   // data: {},
      //     //   function(data, status, headers, config) {
      //     //     console.log(data);
      //     //     if (data) {
      //     //       window.$('head').append('<script type="text/javascript" src="https://www.google.com/jsapi">' + data + '</script>');
      //     //     }
      //     //   }
      //     //   // dataType: 'script'
      //     // );

      //     // return prom;
      //     return;
      //   }
      // },
      controller: 'MyAccountChartsCtrl'
      // reloadOnSearch: false
    });
  }
]);

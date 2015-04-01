angular.module('starter.services', [])

.factory('Bbss', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var bbss = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!'
  }];

  return {
    all: function() {
      return bbss;
    },
    remove: function(bbs) {
      bbss.splice(bbss.indexOf(bbs), 1);
    },
    get: function(bbsId) {
      for (var i = 0; i < bbss.length; i++) {
        if (bbss[i].id === parseInt(bbsId)) {
          return bbss[i];
        }
      }
      return null;
    }
  };
});

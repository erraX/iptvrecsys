define([
  'backbone',
  'models/dataEntry'
], function(Backbone, DataEntry) {
  var TestEntry = Backbone.Collection.extend({
    model: DataEntry,

    comparator: function(item) {
        return -item.get("Rate");
    },

    getHitNum: function() {
      return this.where({hit: true}).length;
    },

    getTotal: function() {
      return this.length;
    },

    getUnhitNum: function() {
      return this.where({hit: false}).length;
    },

    findAndSetClassHit: function(viewedList) {
      var keys = Object.keys(viewedList);
      _.each(this.models, function(element) {
        // Add: rate:0, hit: false
        element.addDefault();
        var className = element.get('videoClass');
        if (_.contains(keys, className)) {
          element.setHit();
          element.set('Rate', viewedList[className]);
        }
      });
    },

    findAndSetVideoHit: function(viewedList) {
      var keys = Object.keys(viewedList);
      _.each(this.models, function(element) {
        // Add: rate:0, hit: false
        element.addDefault();
        var videoID = element.get('videoID');
        if (_.contains(keys, videoID)) {
          element.setHit();
          element.set('Rate', viewedList[videoID]);
        }
      });
    }
  });
  return TestEntry;
});


define([
  'jquery'
], function($) {
  return {
    sortByRate: function(playList) {
      var playListCopy = JSON.parse(JSON.stringify(playList));
      return playListCopy.sort(function(a, b) {
        return b.Rate - a.Rate;
      });
    },

    stringRepeat: function(str, times) {
      var i, result = str;
      for ( i = 0; i < times; i += 1) {
        result += str;
      }
      return result;
    },
  }
});

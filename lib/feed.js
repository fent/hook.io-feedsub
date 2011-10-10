var Hook = require('hook.io').Hook,
    util = require('util'),
    FeedSub = require('feedsub');


var Feed = exports.Feed = function (options) {

  var self = this;
  Hook.call(this, options);
  
  this.on('hook::ready', function () {
    for (var key in self.feeds) {
      (function(feed) {
        var reader = new FeedSub(feed.url, feed);

        reader.on('item', function(item) {
          self.emit(feed.name + '::item', item);
        });

        reader.start();
      })(self.feeds[key]);
    }

  });
};

//
// Inherit from `hookio.Hook`
//
util.inherits(Feed, Hook);

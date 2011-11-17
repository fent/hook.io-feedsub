var assert = require('assert')
  , vows = require('vows')
  , nock = require('nock')
  , Feed = require('../lib/feed').Feed
  ;


// mock http request made by FeedSub module
nock('http://rss.cnn.com')
  .get('/rss/cnn_latest.rss')
  .replyWithFile(200, __dirname + '/cnn_latest.rss');


vows.describe('hook.io-feedsub')
  .addBatch({
    'Subscribe': {
      'topic': function() {
        var items = [];
        var callback = this.callback;

        var hook = new Feed({
          name: 'feedsub',
          emitOnStart: true,
          "feeds": [
            {
              "name": "cnn",
              "url": "http://rss.cnn.com/rss/cnn_latest.rss",
            }
          ]
        });

        hook.on('cnn::item', function(item) {
          items.push(item);
          if (items.length === 20) {
            callback(null, items);
          }
        });

        hook.start();
      },

      '10 items total': function(err, items) {
        assert.equal(items.length, 20);
      },

      'Titles match items': function(err, items) {
        assert.equal(items[0].title, 'Opponents dispute Nicaraguan election results');
        assert.equal(items[1].title, 'Protesters break into Kuwaiti Parliament');
        assert.equal(items[2].title, 'Jackson brothers sue over \'Thriller\' jacket deal');
        assert.equal(items[3].title, 'Officials: No political influence in Solyndra loan');
        assert.equal(items[4].title, 'Prosecutor: Mother will be charged in boy\'s slaying');
        assert.equal(items[5].title, 'Ex-Citadel counselor worked with kids for a decade before scandal');
        assert.equal(items[6].title, 'Suspected tornadoes, storms sweep South; at least 4 dead');
        assert.equal(items[7].title, 'Obama pledges U.S. military power in Pacific');
        assert.equal(items[8].title, 'Google opens online music store and free storage locker');
        assert.equal(items[9].title, 'TSA may back off airport body scanner health study');
        assert.equal(items[10].title, 'One word with many meanings translates into sports controversy');
        assert.equal(items[11].title, 'Citadel abuse accuser says there are more victims');
        assert.equal(items[12].title, 'Two police departments say Penn State coach never filed report');
        assert.equal(items[13].title, 'Deficit talks shift toward blame game');
        assert.equal(items[14].title, 'Storms sweep across the South, killing at least 4');
        assert.equal(items[15].title, 'Iran criticizes Saudi U.N. resolution');
        assert.equal(items[16].title, 'Occupy roundup: Movement celebrates two months of demonstrations');
        assert.equal(items[17].title, 'Occupy Wall Street calls for a national day of action');
        assert.equal(items[18].title, 'Explosions, gunfire rock Syrian capital ');
        assert.equal(items[19].title, 'Obama pledges U.S. military power in Pacific');
      }
    }
  })
  .export(module);

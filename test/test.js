var assert = require('assert')
  , vows = require('vows')
  , nock = require('nock')
  , Feed = require('../lib/feed').Feed
  , Hook = require('hook.io').Hook
  ;


// mock http request made by FeedSub module
nock('http://rss.cnn.com')
  .get('/rss/cnn_latest.rss')
  .replyWithFile(200, __dirname + '/cnn_latest.rss');


var expected = [
    'Opponents dispute Nicaraguan election results'
  , 'Protesters break into Kuwaiti Parliament'
  , 'Jackson brothers sue over \'Thriller\' jacket deal'
  , 'Officials: No political influence in Solyndra loan'
  , 'Prosecutor: Mother will be charged in boy\'s slaying'
  , 'Ex-Citadel counselor worked with kids for a decade before scandal'
  , 'Suspected tornadoes, storms sweep South; at least 4 dead'
  , 'Obama pledges U.S. military power in Pacific'
  , 'Google opens online music store and free storage locker'
  , 'TSA may back off airport body scanner health study'
  , 'One word with many meanings translates into sports controversy'
  , 'Citadel abuse accuser says there are more victims'
  , 'Two police departments say Penn State coach never filed report'
  , 'Deficit talks shift toward blame game'
  , 'Storms sweep across the South, killing at least 4'
  , 'Iran criticizes Saudi U.N. resolution'
  , 'Occupy roundup: Movement celebrates two months of demonstrations'
  , 'Occupy Wall Street calls for a national day of action'
  , 'Explosions, gunfire rock Syrian capital '
  , 'Obama pledges U.S. military power in Pacific'
];


vows.describe('hook.io-feedsub')
  .addBatch({
    'Subscribe': {
      'topic': function() {
        var items = []
          , groups = {}
          , callback = this.callback


        var FeedSubHook = new Feed({
          name: 'feedsub',
          "feeds": [
            {
              "name": "cnn",
              "url": "http://rss.cnn.com/rss/cnn_latest.rss",
              "emitOnStart": true
            }
          ]
        });

        FeedSubHook.on('cnn::item', function(item) {
          /*
          items.push(item);
          if (items.length === 20) {
            callback(null, items);
          }
          */
        });


        var hook = new Hook({
          name: 'tester'
        });

        hook.on('*::cnn::item', function(item) {
          items.push(item);
        });

        hook.on('*::item', function(feed) {
          if (typeof groups[feed.name] === 'undefined') {
            groups[feed.name] = [];
          }

          groups[feed.name].push(feed.item);
          if (groups.cnn.length === 20) {
            callback(null, items, groups);
          }
        });


        hook.on('hook::ready', function() {
          FeedSubHook.start();
        });

        hook.start();
      },

      '10 items total': function(err, items) {
        assert.equal(items.length, 20);
      },

      'Titles match array items': function(err, items) {
        assert.equal(items[0].title, expected[0]);
        assert.equal(items[1].title, expected[1]);
        assert.equal(items[2].title, expected[2]);
        assert.equal(items[3].title, expected[3]);
        assert.equal(items[4].title, expected[4]);
        assert.equal(items[5].title, expected[5]);
        assert.equal(items[6].title, expected[6]);
        assert.equal(items[7].title, expected[7]);
        assert.equal(items[8].title, expected[8]);
        assert.equal(items[9].title, expected[9]);
        assert.equal(items[10].title, expected[10]);
        assert.equal(items[11].title, expected[11]);
        assert.equal(items[12].title, expected[12]);
        assert.equal(items[13].title, expected[13]);
        assert.equal(items[14].title, expected[14]);
        assert.equal(items[15].title, expected[15]);
        assert.equal(items[16].title, expected[16]);
        assert.equal(items[17].title, expected[17]);
        assert.equal(items[18].title, expected[18]);
        assert.equal(items[19].title, expected[19]);
      },

      'Group includes cnn items': function(err, items, groups) {
        assert.isObject(groups);
        assert.isArray(groups.cnn);
        assert.equal(groups.cnn.length, 20);

        items = groups.cnn;
        assert.equal(items[0].title, expected[0]);
        assert.equal(items[1].title, expected[1]);
        assert.equal(items[2].title, expected[2]);
        assert.equal(items[3].title, expected[3]);
        assert.equal(items[4].title, expected[4]);
        assert.equal(items[5].title, expected[5]);
        assert.equal(items[6].title, expected[6]);
        assert.equal(items[7].title, expected[7]);
        assert.equal(items[8].title, expected[8]);
        assert.equal(items[9].title, expected[9]);
        assert.equal(items[10].title, expected[10]);
        assert.equal(items[11].title, expected[11]);
        assert.equal(items[12].title, expected[12]);
        assert.equal(items[13].title, expected[13]);
        assert.equal(items[14].title, expected[14]);
        assert.equal(items[15].title, expected[15]);
        assert.equal(items[16].title, expected[16]);
        assert.equal(items[17].title, expected[17]);
        assert.equal(items[18].title, expected[18]);
        assert.equal(items[19].title, expected[19]);
      }
    }
  })
  .export(module);

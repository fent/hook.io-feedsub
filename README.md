# hook.io-feedsub [![Build Status](https://secure.travis-ci.org/fent/hook.io-feedsub.png)](http://travis-ci.org/fent/hook.io-feedsub)

Will "subscribe" to a web RSS/Atom/JSON feed and emit any new items it reads from it. The events are in the form of

`*::name::item`

Where `name` is the name of the feed. So if you are using the example [`config.json`](/fent/hook.io-feedsub/tree/master/examples/config.json) that looks like this

```javascript
{
  "feeds": [
    {
      "name": "cnn",
      "url": "http://rss.cnn.com/rss/cnn_latest.rss",
      "interval": 10,
      "emitOnStart": false
    }
  ]
}
```


Programatically, this is how you would listen for new feed items..


```javascript
hook.on('*::cnn:item', function(item) {
  console.log('New Story!:', item.title);
});

hook.on('*::item', function(feed) {
  console.log('New Story from: ', feed.name);
  console.log(feed.item);
});
```

It uses [feedsub](https://github.com/fent/node-feedsub) to read feeds. Take a look at its constructor API for all the options that can be passed to it.


# Usage

```bash
hookio-feedsub
```


# Install

```bash
npm -g install hook.io-feedsub
```


# Tests

The single test is written with [vows](http://vowsjs.org/)

```bash
npm test
```

# Licence

MIT

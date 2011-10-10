Install
------------

    npm -g install hook.io-feed


Usage
------------------

    hookio-feed

Will "subscribe" to a web feed and emit any new items it reads from it. Take a look at the `config.json` file to see how to structure it. The events emitted will be in the form of

`feed::*name*::item`

So if you are using the example `config.json` file and waiting for the latest news from CNN, programatically, you would want to do..

```javascript
hook.on('feed::cnn:item', function(item) {
  console.log('New Story!:', item.title);
}
```

It uses [feedsub](https://github.com/fent/node-feedsub) to read feeds. Take a look at its constructor API for all the options that can be passed to it.

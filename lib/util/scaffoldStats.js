var _ = require('underscore-node');

module.exports = function(config, startTime, dirname) {

  var stats = {};

  var defaultMatchers = {
    fonts:  "\\.woff|\\.ttf|\\.woff2|\\.eot",
    css:    "\\.css",
    js:     "\\.js",
    images: "\\.png|\\.jpg|\\.jpeg|\\.gif|\\.webp"
  }

  var defaultBrowserSize = '1280x720';

  _.each(config.sites, function(site){
    _.each(site.tests, function(test) {

      var url = site.protocolPrefix + site.base + test.path;
      stats[test.name] = {
        url:          url,
        base:         site.base,
        name:         test.name,
        har:          dirname + "/tmp/" + startTime + "-" + test.name + ".json",
        timings:      dirname + "/tmp/" + startTime + "-" + test.name + "-timings.json",
        html:         { count: 0, totalSize: 0, budgetDiff: 0, entries: [] },
        fonts:        { count: 0, totalSize: 0, budgetDiff: 0, entries: [] },
        css:          { count: 0, totalSize: 0, budgetDiff: 0, entries: [] },
        js:           { count: 0, totalSize: 0, budgetDiff: 0, entries: [] },
        images:       { count: 0, totalSize: 0, budgetDiff: 0, entries: [] },
        matchers:     _.defaults(defaultMatchers, (site.matchers||{})),
        browserSize:  test.browserSize||defaultBrowserSize
      }

      if (test.headers) {
        stats[test.name].headers = "{" + _.map(test.headers, function(value, key){ return '"' + key + '"' + ':' + '"' + value + '"' }).join(',') + "}"
      }

      if (test.block) {
        stats[test.name].block = test.block;
      }

    });
  });

  return stats;
}
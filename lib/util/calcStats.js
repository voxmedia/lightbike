var _ = require('underscore-node');
var fs = require('fs');

module.exports = function(config, stat, url) {

  var file = './tmp/' + stat.har + '.har';
  var result = JSON.parse(fs.readFileSync(file, 'utf8'));
  var cats = ['fonts', 'css', 'js', 'images'];

  _.each(result.log.entries, function(entry, index) {
    // find the html
    if ( index === 0 ) {
      stat.html.count = stat.html.count + 1;
      stat.html.totalSize = stat.html.totalSize + entry.response.bodySize;
    }

    // err thing else
    _.each(cats, function(cat){
      if ( entry.request.url.toLowerCase().match(new RegExp(stat.matchers[cat])) ) {
        stat[cat].count = stat[cat].count + 1;
        stat[cat].totalSize = stat[cat].totalSize + entry.response.bodySize;
        stat[cat].entries.push({ url: entry.request.url, size: entry.response.bodySize });
      }
    })
  });

  _.each(['html'].concat(cats), function(k) {
    stat[k].budgetDiff = stat[k].totalSize - (config.budgets[k].maxKB * 1000);
  });

  return stat;
}

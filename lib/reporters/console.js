var AsciiTable = require('ascii-table');
var _ = require('underscore-node');

var ellipsis = require('../util/ellipsis');

module.exports = function(config, stat, verbose) {

  var table = new AsciiTable(stat.base + " - " + stat.name  )
  table
    .setAlign(2, AsciiTable.RIGHT)
    .setAlign(3, AsciiTable.RIGHT)
    .setAlign(4, AsciiTable.RIGHT)
    .setHeading(
      'Content Type',
      'Count',
      'Total Size',
      'Budget Size',
      'over/under'
    )
    .addRow(
      'HTML',
      stat.html.count,
      Math.round((stat.html.totalSize / 1000)) + " kb",
      config.budgets.html.maxKB + " kb",
      (Math.round((stat.html.budgetDiff / 1000)) > 0   ? '+' : '') + Math.round((stat.html.budgetDiff / 1000)) + " kb"
    )

  var cats = ['css', 'js', 'fonts', 'images'];
  _.each(cats, function(cat){
    table.addRow(
      cat.toUpperCase(),
      stat[cat].count,
      Math.round((stat[cat].totalSize / 1000))    + " kb",
      config.budgets[cat].maxKB + " kb",
      (Math.round((stat[cat].budgetDiff / 1000)) > 0   ? '+' : '') + Math.round((stat[cat].budgetDiff / 1000)) + " kb"
    )
  })

  console.log(table.toString());

  if (verbose) {
    var cats = ['css', 'js', 'fonts', 'images'];
    _.each(cats, function(cat){
      var logTable = new AsciiTable(cat.toUpperCase() + " Log");
      logTable.setAlign(0, AsciiTable.RIGHT);
      _.each( _.sortBy(stat[cat].entries, function (entry) {return entry.url}) , function(e) {
        logTable.addRow((e.size / 1000) + " kb", ellipsis(e.url));
      });
      console.log(logTable.toString());
    })

  }


}

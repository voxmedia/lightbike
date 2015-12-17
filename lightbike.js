#! /usr/bin/env node
var path = require('path');
var _ = require('underscore-node');
var execSync = require('sync-exec');
var fse = require('fs-extra');
var util = require('util');


// lightbike modules
var logStats = require('./lib/reporters/console.js');
var scaffoldStats = require('./lib/util/scaffoldStats.js');
var calcStats = require('./lib/util/calcStats.js');


// capture CLI args
var userArgs = process.argv.slice(2);
var configPath = userArgs[0];
var verbose = userArgs[1] && userArgs[1].match('verbose')


// sanity checks
if (!configPath) {
  console.log('Please specify a config file.');
  console.log('Example: $ lightbike /some/path/config.json');
  console.log('View an example config at ' + __dirname + '/config-example.json');
  process.exit(1);
}

if (!execSync('which browsertime').stdout) {
  console.log('Browsertime cli not found. Please install browsertime and ensure it is in PATH.');
  process.exit(1);
}



// Setup
fse.emptyDirSync(__dirname + '/tmp');
var config = require(path.resolve(configPath));
var startTime = Date.now();
var stats = scaffoldStats(config, startTime, __dirname);


// should be part of options hash
var minWaitTime = 4000; // ms
var WAITSCRIPT = 'return (function(){ if (typeof(LIGHTSTART) === "undefined") window.LIGHTSTART = (new Date).getTime(); if (((new Date).getTime() - LIGHTSTART) > ' + minWaitTime + ') return true; })()';
var logDir = path.resolve(__dirname + '/tmp');


// the magic
_.each(stats, function(stat) {
  console.log('Testing ' + stat.name);

  var cmd = [
    "browsertime -u " + stat.url + " -n 1 -w " + stat.browserSize,
    " --filename  " + stats[stat.name].timings,
    " --harFile " + stats[stat.name].har,
    " --waitScript '" + WAITSCRIPT + "'",
    " --logDir " + logDir
  ].join('');

  if (stat.headers) cmd += " --headers " + "'" + stat.headers + "'";
  if (stat.block) cmd += " --blacklist " + "'" + stat.block + "'";

  if (verbose) {
    console.log();
    console.log(cmd);
    console.log();
  }

  execSync(cmd, 120000);

  calcStats(config, stat, stat.url);
  logStats(config, stat, verbose);
  console.log('');
})
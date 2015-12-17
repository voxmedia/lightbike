:construction: Under construction :construction:

# Lightbike - an asset budget auditing tool

Example output  
![alt tag](http://i.imgur.com/AhdOP20.jpg)

### Installation
  - install chromedriver:     `brew install chromedriver`
  - install browsersertime:   `npm install tobli/browsertime -g`
  - install lightbike:        `npm install voxmedia/lightbike -g`


Look a the `config-example.json` and create your own. 
Then you simply invoke the lightbike command `lightbike <pathtoconfig>/config.json`

Add the `--verbose` flag to log all asset urls associated with and asset type. ex: `lightbike <pathtoconfig>/config.json --verbose`

### Config options
```
{

  "budgets": {
    "html":     { "maxKB": "250"  }, // < your html budget, represented as kilobytes
    "css":      { "maxKB": "150"  },
    "js":       { "maxKB": "500"  },
    "fonts":    { "maxKB": "200"  },
    "images":   { "maxKB": "1000"  }
  },

  "sites": [

    {
      "protocolPrefix": "http://",
      "base": "www.theverge.com",  // < the base domain for the following tests
      "tests": [

        {
          "name": "homepage",         // < *unique* test name
          "path": "/",                // < path for this test, making the full url http://www.theverge.com/
          "browserSize": "1920x1080"  
        },
        
        {
          "name": "homepage-custom-headers",  // < *unique* test name for another test
          "path": "/",
          "browserSize": "1920x1080",
          "headers": {                        // < custom headers
            "some-header": "header-value",
            "other-header": "other-value"
          }
        },
        
        {
          "name": "homepage-no-analytics",
          "path": "/",
          "browserSize": "1920x1080",
          "block": ".*(google-analytics).*"  // < RegExp for blocking request, dots may need to be double escaped
        }

      ],

      "matchers": {
        "fonts": "\\.woff|\\.ttf|typekit\\.com"  // < Custom matcher RegExp for fonts, typekit uses base64 fonts
      }

    }

  ]
}
```

-----

### What

Lightbike allows you to compare the current state of any local or remote webpage, to your asset budgets. Asset budgets just being simple byte size metrics. For example, you might want to keep your compressed CSS budget down to 200kb. The five asset types are currently supported `HTML` `CSS` `Javascript` `Images` and of course `Fonts`.

### Why

Web page performance is the primary target use case. While asset size is certainly not the only thing that makes a page fast or slow, it is one factor. Furthermore, the metrics are quite simple to understand. 

We considered building somethink like http://webpagetest.org that would still work locally and including timing data (like page load time and SpeedIndex) but that is quite complex and makes data comparisons from one developers machine to anothers, an apples to oranges scenario. Too many variables at play. 
So we built something simple that could also be used locally. Being able to use the tool locally is very important. A developer can audit there local changes before it gets sent to production or even commited to a version control system. And that's important, because it's easy to prevent a problem from occuring when it's never hit production.

### How

The Lightbike tool is envoked in your terminal and passed a config. Then it will proceed to audit all urls in your config and dump the results of the audit into your terminal in simple ASCII tables. You can run all remote site tests, all local or a mix of local and remote - allowing you to compare how your production code stacks up against your local modfications.

### Workflow

As is, Lightbike is designed to be run adhoc - as much or as little as you'd like. It's a globally installed command line tool so you can run it from where ever youd like on any url. You could also create a per-project config, but currently there is nothing special about it - just any old JSON config with the applicable structure is fine.

If you're a Vox Media Product team member, there are no hooks to automate this process in any of our apps - for now at least. We felt it would be best to let the developer choose when to use the tool. But we encourage you to use it at least once before you submit a PR.

### Config options

The example config contains some mix of most options. Easiest just to look.

The simplest possible config (default 1280x720) would be something like this:
```
{

  "budgets": {
    "html":     { "maxKB": "250"  },
    "css":      { "maxKB": "150"  },
    "js":       { "maxKB": "500"  },
    "fonts":    { "maxKB": "200"  },
    "images":   { "maxKB": "1000"  }
  },

  "sites": [{
    "protocolPrefix": "http://",
    "base": "www.theverge.com",
    "tests": [{ "name": "homepage", "path": "/" }]
  }]
  
}
```

### Technology

Lightbike uses Browsertime (https://github.com/tobli/browsertime), which creates the HAR files that are used to calculate budget states. Under the hood of Browsertime is the Chromedriver, part of the Selenium project. So when you run Lightbike, for each URL a sandboxed version of your locally installed Chrome (no cache / won't interrupt your normal browsing session) is launched and loads the target url. All network activity is passed through a local proxy. That's handled by Browsermob which Browsertime handles.

In the not too distant future I hope to run Chrome via an invisible X display. Meaning that Chrome would be "invisible". Right now it just launches like any other desktop app.

The tool only supports Chrome right now, unsure if there is a need to consider other browsers but it's definitely possible.


### Develop:
  - clone this repo and cd into it
  - `brew install chromedriver` (or any other selenium drivers + host browser)
  - `npm install tobli/browsertime -g` (sorry, it's a cli, thus needs manual global install)
  - `npm link` (symlink to binary so the cli is available while developing)

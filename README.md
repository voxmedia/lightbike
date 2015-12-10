:construction: Under construction :construction:

### Lightbike is an asset budget auditing tool
Look a the `config-example.json` and create your own. 
Then you simply invoke the lightbike command `lightbike <pathtoconfig>/config.json`

Example output  
![alt tag](http://i.imgur.com/AhdOP20.jpg)

Add the `--verbose` flag for extra fun. ex: `lightbike <pathtoconfig>/config.json --verbose`

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


### Installation
  - install chromedriver:     `brew install chromedriver`
  - install browsersertime:   `npm install tobli/browsertime -g`
  - install lightbike:        `npm install voxmedia/lightbike -g`

### Develop:
  - clone this repo and cd into it
  - `brew install chromedriver` (or any other selenium drivers + host browser)
  - `npm install tobli/browsertime -g` (sorry, it's a cli, thus needs manual global install)
  - `npm link` (symlink to binary so the cli is available while developing)

:construction: Under construction :construction:

### Lightbike is an asset budget auditing tool
Look a the `config-example.json` and create your own. 
Then you simply invoke the lightbike command `lightbike <pathtoconfig>/config.json`

Example output  
![alt tag](http://i.imgur.com/AhdOP20.jpg)


### Installation
  - install chromedriver:     `brew install chromedriver`
  - install browsersertime:   `npm install tobli/browsertime -g`
  - install lightbike:        `npm install voxmedia/lightbike -g`

### Develop:
  - clone this repo and cd into it
  - `brew install chromedriver` (or any other selenium drivers + host browser)
  - `npm install tobli/browsertime -g` (sorry, it's a cli, thus needs manual global install)
  - `npm link` (symlink to binary so the cli is available while developing)

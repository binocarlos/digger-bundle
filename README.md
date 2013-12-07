digger-bundle
=============

![Build status](https://api.travis-ci.org/binocarlos/digger-client.png)

A bundle of digger modules that make up the standard container API.

 * [digger-container](https://github.com/binocarlos/digger-container) - wrapper for model data
 * [digger-find](https://github.com/binocarlos/digger-find) - searches local models
 * [digger-selector](https://github.com/binocarlos/digger-selector) - parses selectors into query objects
 * [digger-contracts](https://github.com/binocarlos/digger-contracts) - create HTTP request objects from containers
 * [digger-radio](https://github.com/binocarlos/digger-radio) - PUB/SUB client for a container namespace
 * [digger-xml](https://github.com/binocarlos/digger-xml) - XML parser and stringify for container data
 * [digger-utils](https://github.com/binocarlos/digger-utils) - general shared util functions

## install

```
$ npm install digger-bundle
```

## usage

The module exports a [digger-container](https://github.com/binocarlos/digger-container) but with the prototype augmented with find, selector and contract modules.

```js
var Container = require('digger-bundle');

// make containers as normal
var container = Container([{
  _digger:{
    tag:'fruit',
    diggerwarehouse:'/api1',
    diggerpath:[10]
  }
}])

// the prototype has the find api so we can search
var results = container.find('fruit');
results.count().should.equal(1);

// it also has contracts so we can select
var contract = container('yo');

contract.url.should.equal('/api1/select');
contract.method.should.equal('post');

// and XML so we can parse XML strings
var xmlcontainer = Bundle('<folder name="xml" />');

container.append(xmlcontainer);

var folderresult = container.find('folder');

folderresult.count().should.equal(1);

// radio is there so we can pub/sub
var radio = container.radio();

radio.listen('apple', function(packet){
  packet.should.equal(10);
  done();
})

radio.receive('api1.10.apple', 10);
```

## licence
MIT

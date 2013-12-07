var Bundle = require('../src');

describe('digger bundle', function(){

  it('should have find - XML and radio', function(done) {

    var container = Bundle([{
      _digger:{
        tag:'fruit',
        diggerwarehouse:'/api1',
        diggerpath:[10]
      }
    }])

    var results = container.find('fruit');
    results.count().should.equal(1);

    var contract = container('yo');

    contract.url.should.equal('/api1/select');
    contract.method.should.equal('post');

    var xmlcontainer = Bundle('<folder name="xml" />');

    container.append(xmlcontainer);

    var folderresult = container.find('folder');

    folderresult.count().should.equal(1);

    var radio = container.radio();

    radio.listen('apple', function(packet){
      packet.should.equal(10);
      done();
    })

    radio.receive('api1.10.apple', 10);
    
  })


})

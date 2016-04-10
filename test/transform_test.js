// testing
const expect = require('chai').expect;
const handleFile = require(__dirname + '/../lib/handleFile');

describe('bitmap file to a buffer', () => {
  var answers = {
    file: __dirname + '/../img/pikachu.bmp',
    transOption: 'greyscale'
  };

  it('should load a bitmap into a buffer', (done) => {
    handleFile.run(answers, (data) => {
      expect(Buffer.isBuffer(data)).to.eql(true);
      done();
    });
  });
});

// describe('extract header data');

// describe('transforms');

// describe('write bitmap from buffer');

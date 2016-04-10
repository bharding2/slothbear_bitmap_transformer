// testing
const expect = require('chai').expect;
const handleFile = require(__dirname + '/../lib/handleFile');
const invert = require(__dirname + '/../lib/invert');
const redscale = require(__dirname + '/../lib/redscale');
const greenscale = require(__dirname + '/../lib/greenscale');
const bluescale = require(__dirname + '/../lib/bluescale');

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

describe('extract header data', () => {
  it('should extract the bitmap headers into an object', () => {
    expect(typeof handleFile.bitmapHead === 'object').to.eql(true);
  });
});

describe('transforms', () => {
  var testBuffer = new Buffer(4);
  var testHeaders = {};
  testHeaders.bitsPerPixel = 32;
  beforeEach(() => {
    testBuffer.writeUInt8(50, 0);
    testBuffer.writeUInt8(100, 1);
    testBuffer.writeUInt8(150, 2);
  });

  it('should invert the colors', () => {
    invert(testBuffer, testHeaders, 0, 3);
    expect(testBuffer.readUInt8(0)).to.eql(255 - 50);
    expect(testBuffer.readUInt8(1)).to.eql(255 - 100);
    expect(testBuffer.readUInt8(2)).to.eql(255 - 150);
  });

  it('should redscale the colors', () => {
    redscale(testBuffer, testHeaders, 0, 3);
    expect(testBuffer.readUInt8(0)).to.eql(0);
    expect(testBuffer.readUInt8(1)).to.eql(0);
    expect(testBuffer.readUInt8(2)).to.eql(150);
  });

  it('should greenscale the colors', () => {
    greenscale(testBuffer, testHeaders, 0, 3);
    expect(testBuffer.readUInt8(0)).to.eql(0);
    expect(testBuffer.readUInt8(1)).to.eql(100);
    expect(testBuffer.readUInt8(2)).to.eql(0);
  });

  it('should bluescale the colors', () => {
    bluescale(testBuffer, testHeaders, 0, 3);
    expect(testBuffer.readUInt8(0)).to.eql(50);
    expect(testBuffer.readUInt8(1)).to.eql(0);
    expect(testBuffer.readUInt8(2)).to.eql(0);
  });
});

// describe('write bitmap from buffer');

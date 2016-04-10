const fs = require('fs');
const os = require('os');
const EE = require('events');
const transform = require(__dirname + '/transform');

var ee = new EE();

var handleFile = module.exports = exports = {};

handleFile.bitmapHead = {};
handleFile.run = function(answers, cb) {
  ee.on('file_read', () => {
    // extra point: command line interface
      fs.readFile(answers.file, (err, data) => {
        if (err) return console.log(err);
        // extra point: handle endianness of different os with a single if
        if (os.endianness() === 'BE') data.reverse();
        ee.emit('mapbits', data, answers.transOption);
      });
    });

  ee.on('mapbits', (data, transOption) => {
    handleFile.bitmapHead.header = data.toString('ascii', 0, 2);
    handleFile.bitmapHead.fileSize = data.readUInt32LE(2);
    handleFile.bitmapHead.pixelArrayOffset = data.readUInt32LE(10);
    handleFile.bitmapHead.numColors = data.readUInt32LE(46);
    handleFile.bitmapHead.bitsPerPixel = data.readUInt16LE(28);
    if (handleFile.bitmapHead.numColors !== 0) handleFile.bitmapHead.bitsPerPixel = 32;

    transform(data, handleFile.bitmapHead, transOption);
    if (cb) cb(data);
  });

  ee.emit('file_read');
};

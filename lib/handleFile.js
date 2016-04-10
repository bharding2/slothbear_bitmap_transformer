const fs = require('fs');
const os = require('os');
const EE = require('events');
const transform = require(__dirname + '/transform');

var ee = new EE();

var handleFile = module.exports = exports = {};

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
    var bitmap = {};

    bitmap.header = data.toString('ascii', 0, 2);
    bitmap.fileSize = data.readUInt32LE(2);
    bitmap.pixelArrayOffset = data.readUInt32LE(10);
    bitmap.numColors = data.readUInt32LE(46);
    bitmap.bitsPerPixel = data.readUInt16LE(28);
    if (bitmap.numColors !== 0) bitmap.bitsPerPixel = 32;

    transform(data, bitmap, transOption);
    if (cb) cb(data);
  });

  ee.emit('file_read');
};

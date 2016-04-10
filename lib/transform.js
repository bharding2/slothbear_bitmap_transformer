const fs = require('fs');
const greyscale = require(__dirname + '/greyscale');
const greenscale = require(__dirname + '/greenscale');
const redscale = require(__dirname + '/redscale');
const bluescale = require(__dirname + '/bluescale');
const invert = require(__dirname + '/invert');

var transform = module.exports = exports = function(data, bitmap, transform) {
  // extra point command line interface that selects the transform
  // (along with inquirer interface in index.js)
  var cb = {
    greyscale: greyscale,
    bluescale: bluescale,
    greenscale: greenscale,
    redscale: redscale,
    invert: invert
  };
  // possible transforms tests: darken (value/2)
  // extra point: handle palette and non palette bitmaps
  // extra point: handle different bitmap sizes
  // (it runs from the beginning of the pixel array to the end of the file)
  if (bitmap.numColors === 0) {
    cb[transform](data, bitmap, bitmap.pixelArrayOffset, bitmap.fileSize);
  } else {
    cb[transform](data, bitmap, 54, bitmap.pixelArrayOffset);
  }

  var unique = Date.now();

  return fs.writeFile(__dirname + '/../img/' + unique + '.bmp', data);
};

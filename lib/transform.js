const greyscale = require(__dirname + '/greyscale');
const greenscale = require(__dirname + '/greenscale');
const redscale = require(__dirname + '/redscale');
const bluescale = require(__dirname + '/bluescale');
const invert = require(__dirname + '/invert');

var transform = module.exports = exports = function(data, bitmap, transform) {
  var cb = {
    greyscale: greyscale,
    bluescale: bluescale,
    greenscale: greenscale,
    redscale: redscale,
    invert: invert
  };
  cb[transform](data, bitmap, 54, bitmap.pixelArrayOffset);

  return data;
};

var greyscale = module.exports = exports = function(data, bitmap) {
  for (var i = 54; i < bitmap.pixelArrayOffset; i += 4) {
    var greyScaleValueR = parseInt(data.readUInt8(i + 2), 10) * 0.3;
    var greyScaleValueG = parseInt(data.readUInt8(i + 1), 10) * 0.59;
    var greyScaleValueB = parseInt(data.readUInt8(i), 10) * 0.11;

    var greyScale = greyScaleValueR + greyScaleValueG + greyScaleValueB;

    data.writeUInt8(greyScale, i);
    data.writeUInt8(greyScale, i + 1);
    data.writeUInt8(greyScale, i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};

var bluescale = module.exports = exports = function(data, bitmap, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += bitmap.bitsPerPixel / 8) {
    data.writeUInt8(255 - data.readUInt8(i), i);
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1);
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2);
  }
};

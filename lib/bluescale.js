var bluescale = module.exports = exports = function(data, bitmap, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += bitmap.bitsPerPixel / 8) {
    data.writeUInt8(data.readUInt8(i), i);
    data.writeUInt8(0, i + 1);
    data.writeUInt8(0, i + 2);
  }
};

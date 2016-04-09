var greenscale = module.exports = exports = function(data, bitmap, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(0, i);
    data.writeUInt8(data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0, i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};

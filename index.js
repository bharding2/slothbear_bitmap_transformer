const fs = require('fs');
const EE = require('events');
const transform = require(__dirname + '/lib/transform');

var ee = new EE();

ee.on('file_read', (file) => {
  fs.readFile(file, (err, data) => {
    if (err) return console.log(err);
    ee.emit('bitmap', data);
  });
});

ee.on('bitmap', (data) => {
  var bitmap = {};
  bitmap.header = data.toString('ascii', 0, 2);
  bitmap.fileSize = data.readUInt32LE(2);
  bitmap.pixelArrayOffset = data.readUInt32LE(10);
  bitmap.numColors = data.readUInt32LE(46);
  bitmap.palette = data.slice(54, bitmap.numColors * 4);

  // make second transform for no-palette based
  // handling different files makes this argv[3]
  transform(data, bitmap, process.argv[2]);
  console.log(bitmap.numColors);

  fs.writeFile('newfile.bmp', data);
});

// make it handle different files with argv[2]
ee.emit('file_read', __dirname + '/palette-bitmap.bmp');

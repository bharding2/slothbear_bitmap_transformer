const fs = require('fs');
const os = require('os');
const EE = require('events');
const inquirer = require('inquirer');
const transform = require(__dirname + '/lib/transform');

var ee = new EE();

var questions = [
  {
    type: 'list',
    name: 'file',
    message: 'What file would you like to transform?',
    choices: [
      __dirname + '/non-palette-bitmap.bmp',
      __dirname + '/palette-bitmap.bmp',
      __dirname + '/pikachu.bmp',
      __dirname + '/christmasbear.bmp'
     ]
  },
  {
    type: 'list',
    name: 'transOption',
    message: 'What transform would you like to perform?',
    choices: [
      'greyscale',
      'redscale',
      'bluescale',
      'greenscale',
      'invert'
     ]
  }
];

ee.on('file_read', () => {
  // extra point: command line interface
  // extra point: command line interface that can select the transform
  inquirer.prompt(questions).then((answers) => {
    fs.readFile(answers.file, (err, data) => {
      if (err) return console.log(err);
      // extra point: handle endianness of different os with a single if
      if (os.endianness() === 'BE') data.reverse();
      ee.emit('mapbits', data, answers.transOption);
    });
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
});

ee.emit('file_read');

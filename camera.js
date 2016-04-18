// var config = require('./config');
var fs = require('fs');
var child_process = require('child_process');
var moment = require('moment');

require('events').EventEmitter.prototype._maxListeners = 20;

var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});


var i = 0;

board.on('ready', function() {

  // READY
  console.log('Board is ready');

  setInterval(function () {
  	console.log('Picture Start');
  	var now = moment().format();
    // Run raspistill command to take a photo with the camera module  
    var filename = '/home/pi/camera/camera/photos/image_' + now + '.jpg';
    var args = ['-w', '320', '-h', '240', '-o', filename, '-t', '1'];
    var spawn = child_process.spawn('raspistill', args);

    spawn.on('exit', function(code) {
      console.log('A photo is saved as '+filename+ ' with exit code, ' + code);
      var timestamp = Date.now();
      i++;
    });

  }, 5000);

});

// Ctrl-C
process.on('SIGINT', function(){
  process.exit();
});
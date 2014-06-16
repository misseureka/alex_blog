var client = {};
 
client.run = function (options) {
 
options = options || {};
 
 
var socket = io.connect(options.remote || "http://localhost:8080");
socket.on('connect', function() {
  var term = new Terminal({
    cols: 120,
    rows: 60,
    useStyle: false,
    screenKeys: true
  });
 
  term.on('data', function(data) {
    socket.emit('data', data);
  });
 
  socket.on('data', function(data) {
    term.write(data);
  });
 
  term.open(options.parent || document.body);
  term.write('WELCOME TO MY BLOG! \r\n again...');
 
  socket.on('disconnect', function() {
    term.destroy();
  });
 
  socket.emit('data', '\n');
 });
};

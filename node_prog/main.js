var http = require('http');
var events = require('events')
var fs = require('fs')
var path = require('path')
var url = require('url')

var eventEmitter = new events.EventEmitter()

var clockHandler = function (res)
{
    res.end("233333\n");
};

eventEmitter.on('clock_event',clockHandler);

var server = http.createServer(function (req, resp) {
    fs.readFile("data" + req.url,"binary",(err,data) =>
        {
            console.log("data" + req.url);
            if(!err) 
    {resp.writeHead(200);
        resp.write(data);}
            else
    {resp.writeHead(404);
     console.log('error!/n')}
        })
});
server.listen(80);


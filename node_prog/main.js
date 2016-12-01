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

var server = http.createServer(function (req, resp) 
{
    if(req.url == '/clock')
    {
        eventEmitter.emit('clock_event',resp);
        return; 
    }
    fs.readFile('data' + req.url,function(err,data)
    {
        if(err)
        {
            console.log('No such file: ' + 'data' + req.url);
            resp.writeHead(200,
                {'Content-Type' : 'text/html',
                 'Server' : 'test'});
            resp.end("<html><body><s>No such file</s></body></html>");
        }
        else
        {
            console.log(data);
            resp.writeHead(200);
            resp.write(data);
            resp.end();
        }
    })
});
server.listen(80);


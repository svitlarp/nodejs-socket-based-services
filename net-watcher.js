'use strict';

// Socket-based services;
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
    throw Error('Afile to watch must be specified!');
}

net.createServer(connection => {
    // Reporting - reports that the connection has been established (to the client with connection.write and to the console)
    console.log('Subscriber connected');
    connection.write(`Now watching ${filename} for changes...\n`);

    // Watcher setup - begins listening for changes to the target file
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`));

    // Cleanup - report that the client has disconnected and stop watching the file
    connection.on('close', () => {
        console.log('Subscriber disconected');
        watcher.close();
    });
}).listen(60300, () => console.log('Listening for subscribers...'));



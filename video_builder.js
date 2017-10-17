const exec = require('child_process').exec
const fs = require('fs')

module.exports = function(pngTmpfolder, name, cb) {
    exec('ffmpeg -framerate 25 -i '+pngTmpfolder.name+'/clifford-%d.png ./videos/'+name+'.mp4', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        cb()
    });
}
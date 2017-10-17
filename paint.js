const vidBuilder = require('./video_builder')
const tmp = require('tmp')
const Progress = require('progress')

/**
 *
 * @param canvasSize width & height of canvas
 * @param frameCount total frame count
 * @param a, b, c, d Clifford attractors parameters
 */
module.exports = function(canvasSize, frameCount, a, b, c, d) {
    const clifford = require('./clifford')
    const pngTmps = []
    const progress = new Progress(':bar', { total: frameCount });
    try{
        fs.mkdirSync('./tmp')
    } catch (e) {
        console.log('./tmp folder already created')
    }
    try{
        fs.mkdirSync('./videos')
    } catch (e) {
        console.log('./videos folder already created')
    }

    const tempPngFolder = tmp.dirSync({ template: './tmp/tmp-XXXXXX' })
    const painter = clifford(canvasSize,tempPngFolder)
    let count = 0
    next()
    function next(lastCreatedImage) {
        progress.tick()
        if(lastCreatedImage) {
            pngTmps.push(lastCreatedImage)
        }
        if(count <= frameCount) {
            painter.draw((a+(count)/60), (b+(count)/60), c, (d+(count)/60))
            painter.getImage(next)
        } else {
            console.log('Painted',count,'images')
            let name = [a.toString(),b.toString(),c.toString(),d.toString()].join('_')
            vidBuilder(tempPngFolder, name, function() {
                console.log('Video rendered',count,'images')
            })
        }
        count++
    }
}

fs = require('fs')

module.exports = function (canvasSize, tmpFolder) {
    const Canvas = require('canvas')
    const canvas = new Canvas(canvasSize, canvasSize)
    const ctx = canvas.getContext('2d')

    let imgCount = 0
    let U = 1
    let Y = 1

    function addPoint(a, b, c, d) {
        x=(canvasSize/2)+(canvasSize/6)*(X=Math.sin(a*Y)+c*Math.cos(a*U))
        y=(canvasSize/2)+(canvasSize/6)*(Y=Math.sin(b*U)+d*Math.cos(b*Y))
        ctx.beginPath()
        ctx.arc(x,y,0.5,0,Math.PI*2)
        ctx.fill()
        U=X
    }

    return {
        draw : function(a, b, c, d) {
            ctx.fillStyle = "#000"
            ctx.fillRect(0,0,canvasSize,canvasSize)
            ctx.fillStyle = "hsla(200, 60%, 80%,0.02)"
            for(let i = 0; i < canvasSize*canvasSize*5; i ++) {
                addPoint(a, b, c, d)
            }
        },
        getImage : function (cb) {
            const st = canvas.pngStream()
            const o = fs.createWriteStream(tmpFolder.name+'/clifford-'+imgCount+'.png')
            imgCount++
            st.on('data', (data) => {
                o.write(data)
            })
            st.on('end', () => {
                cb.call(null)
            })
        }
    }

}


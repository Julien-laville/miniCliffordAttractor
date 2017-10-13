const http = require('http')
const fs = require('fs')

const PORT = 3088
const getPicHandler = function(request, response) {



}

const initHandler = function(err) {
    if(err) {
        console.error('Something happened', err)
    }
    console.log('Listen at ', PORT)
}


const serv = http.createServer(getPicHandler)
serv.listen(PORT, initHandler)
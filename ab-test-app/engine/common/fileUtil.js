'use strict'
const fs = require("fs")

exports.readJsonFile = function (filename) {
    var json = null
    var content = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r'})
    json = JSON.parse(content)
    return json
}

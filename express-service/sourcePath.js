let path = require("path")
let cwdPath = process.cwd()
cwdPath = path.dirname(cwdPath)
cwdPath = path.dirname(cwdPath)
cwdPath = path.join(cwdPath, "我")
module.exports = cwdPath

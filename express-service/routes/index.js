const router = require("express").Router();
const videoController = require("../controller/videoController");
let sourcePath = require("../sourcePath")
let path = require("path")

router.use("*", (req,res,next)=>{
    let newStr = req.baseUrl.replace("/video/","")
    newStr = path.join(sourcePath,newStr)
    req.newStr = newStr
    next()
},videoController.streamVideo);

module.exports = router;

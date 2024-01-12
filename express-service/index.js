const express = require("express");
const cors = require("cors");
const path = require("path")
const fs = require("fs")
let sourcePath = require("./sourcePath")
console.log(sourcePath, 11);
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    // 根目录路由
    res.sendFile(__dirname + "/index.html");
});
// 视频路由
app.use("/video", require("./routes/index"));

function readVideosInFolder(folderPath) {
    return new Promise(async (resolve) => {
        let result = []
        fs.readdir(folderPath, async (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                return;
            }

            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const filePath = path.join(folderPath, file);
                const fileExtension = path.extname(filePath);

                if (fs.statSync(filePath).isDirectory()) {
                    // 如果是文件夹，递归调用readVideosInFolder函数
                    let newlist = await readVideosInFolder(filePath);
                    result.push(...newlist)
                } else if (fileExtension === '.mp4' || fileExtension === '.avi' || fileExtension === '.mov') {
                    // 在这里可以对视频文件进行处理或其他操作
                    result.push({
                        path: filePath,
                        name: path.basename(filePath)
                    })
                }
            }
            resolve(result)
        });
    })
}


app.get("/getAllVideo", async function (req, res) {
    let result = await readVideosInFolder(sourcePath);
    result = result.map((it) => {
        return {
            ...it,
            path: path.join(`http://127.0.0.1:8100/video`, it.path.replace(sourcePath, "")),
            resolution: "1080p",
        }
    })
    console.log(result);
    return res.json(result)
})

const PORT = process.env.PORT || 8100;

app.listen(PORT, () => {
    console.log(`服务运行端口：${PORT}`);
});

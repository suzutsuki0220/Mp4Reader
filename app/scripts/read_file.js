// バイナリファイルを読み込むサンプル
//   https://nodejs.org/api/buffer.html

const fs = require('fs');
const viewStatus = require('./view_status.js');

function afterReadWork(err, content) {
    if (err) {
        viewStatus.setStatus(err);
        return;
    }

    var buf = Buffer.from(content, 'binary');

    var bitmapSize = buf.readUInt32LE(2);  // 3バイト目の32bit整数(リトルエンディアン)を読む
    var bitmap = buf.slice(0, bitmapSize - 1);  // 先頭からbitmapSize分の塊を読む

    viewStatus.setStatus("load successful");
    viewStatus.setSize(bitmapSize);
    viewStatus.setData(bitmap);
}

module.exports.load = function(filename) {
    fs.readFile(filename, afterReadWork);
};

var dets = require('./details.js');
var keywords = require('./getKeyWords.js');

new function dataScrape() {
    console.log("initializing")
    var data = '';
    var i = 0;
    var p = 1;
    keywords.get()
        .then(function keywordLoop(data) {
            setTimeout(function () {
                var key = data[i].keyword.replace(/['"]+/g, '')
                console.log(key)
                dets.send(key, p)
                p++;
                if (p > 5) {
                    p = 1;
                    i++
                    if (i < data.length) {
                        keywordLoop(data, p)
                    }
                } else {
                    keywordLoop(data, p)
                }
            }, 6300)
        })
}

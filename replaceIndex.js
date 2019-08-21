#!/usr/bin/env node
const fs = require('fs')
const pageName = process.argv[2]
const wxhName = process.argv[3] || 'stxlwx'

const headScript = `
<script>
  var arr_wx0 = (location.search || "").substring(1).split("&")
  var arr_wx1 = []
  arr_wx0.map(function(keyValue){
    var [k, v] = keyValue.split("=")
    if (k === "wid") {
      arr_wx1 = v.split(",")
    }
  })
  var arr_wx = arr_wx1.map(decodeURI).map(item => item.trim())
  var wx_index = Math.floor((Math.random() * arr_wx.length))
  var wxhName = arr_wx[wx_index]
</script>
`
const footScript = `
<script type="text/javascript" src="https://s5.cnzz.com/z_stat.php?id=1277843998&web_id=1277843998"></script>
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1277843998'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1277843998' type='text/javascript'%3E%3C/script%3E"));</script>
<script>
  var weixin = document.getElementsByClassName("gof")
  var idValue = wxhName
  var pageName = '${pageName}'
  for (var i = 0; i < weixin.length; i++) {
    weixin[i].addEventListener("click", function() {
      _czc.push(["_trackEvent", pageName + "微信" + idValue, "复制"]);
    })
  }
</script>

<script src="//page.adxhi.com/js/adx-monitor.js"></script>
<script>
  _adx_m_.push("EventTrack", "微信复制", wxhName, ".gof")
</script>
`
const insteadTag = `<b class="gof"><script>document.write(wxhName)</script></b>`
const data = fs.readFileSync('index.html', 'utf-8')
const regExpStr = `<script>\\s*document.write\\(${wxhName}\\);?\\s*</script>`
const regExp = new RegExp(regExpStr, 'igm')
const insertScript = (sourceStr, index, newStr) => sourceStr.slice(0, index) + newStr + sourceStr.slice(index)
const indexHead = data.indexOf('</head>')
const resultHead = insertScript(data, indexHead, headScript)
const indexFoot = resultHead.indexOf('</body>')
const resultFoot = insertScript(resultHead, indexFoot, footScript)

const result = resultFoot.replace(regExp, insteadTag)

fs.writeFileSync('./index.html', result)
console.log('index.html转化成功！')
process.exit(0)

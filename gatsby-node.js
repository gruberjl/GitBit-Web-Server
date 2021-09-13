const path = require('path');
const fs = require('fs');

exports.onPostBuild = function() {
  const publicPath = path.join(__dirname, 'public')
  const docsPath = path.join(__dirname, 'docs')
  fs.rmdirSync(docsPath, { recursive: true })
  fs.renameSync(publicPath, docsPath)
  fs.mkdirSync(publicPath)
}

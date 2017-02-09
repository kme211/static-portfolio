const fs = require('fs')
const nunjucks = require('nunjucks')
const work = require('./src/work')

console.log('building index.html')

nunjucks.configure('src/views')
const rendered = nunjucks.render('index.html', { work: work })
fs.writeFile('./dist/index.html', rendered, () => console.log('build complete'))
const fs = require('fs')
const nunjucks = require('nunjucks')
let work = require('./src/work')
const moment = require('moment');

console.log('building index.html')

nunjucks.configure('src/views')
work = work.map(item => Object.assign({}, item, { date: moment(item.date).fromNow()}))
const rendered = nunjucks.render('index.html', { work: work })
fs.writeFile('./dist/index.html', rendered, () => console.log('build complete'))
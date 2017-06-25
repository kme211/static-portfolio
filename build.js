var argv = require('yargs').argv;
const fs = require('fs')
const nunjucks = require('nunjucks')
let work = require('./src/work')
const sass = require('node-sass')
const chalk = require('chalk')
const development = argv.env !== 'production'

const logMsg = (msg) => console.log(chalk.blue(msg))
const logSuccess = (msg) => console.log(chalk.green(msg))
const logError = (error) => console.log(chalk.red(error))

logMsg('Build process started. env=' + argv.env)

work = work
  .sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if(aDate < bDate) return 1;
    if(aDate > bDate) return -1;
    return 0;
  })
  .map(project => {
      let codeIcon = project.links.code.match('codepen') ? 'icon-codepen' : 'icon-github'
      return Object.assign({}, project, { codeIcon })
  })

function compileScss(successCallback = () => {}, errCallback = () => {}) {
  logMsg('Compiling SCSS...')

  sass.render({
    file: 'src/scss/style.scss'
  }, (error, result) => {
    if (error) {
      logError(error)
      errCallback()
    } else {
      logSuccess('SCSS compiled to CSS')
      fs.writeFile('./dist/css/style.css', result.css.toString(), (error) => {
        if (error) {
          logError(error)
          errCallback()
        } else {
          logSuccess('CSS written to dist/css/style.css')
          successCallback()
        }
      })
    }
  })
}

function watchScss() {
  const chokidar = require('chokidar')

  const watcher = chokidar.watch('src/scss', {
    ignored: /[\/\\]\./,
    persistent: true
  })

  watcher
    .on('change', path => {
      logMsg(`File ${path} has been changed`)
      compileScss()
    })
}

const css = new Promise(compileScss)

if (development) {

  const express = require('express')
  const app = express()

  nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
    watch: true
  })

  app.get('/', (req, res) => {
    res.render('index.html', { work: work })
  })

  app.get('/css/style.css', (req, res) => {
    res.type('text/css').send(fs.readFileSync('dist/css/style.css'))
  })

  app.get('/js/main.js', (req, res) => {
    res.type('application/javascript').send(fs.readFileSync('src/main.js'))
  })

  css.then(() => {
    app.listen(3000, function() {
      logMsg('Express server listening on port 3000!')
    })

    watchScss()
  })

} else {

  logMsg('Building index.html...')

  nunjucks.configure('src/views')
  const rendered = nunjucks.render('index.html', { work: work })
  fs.writeFile('./dist/index.html', rendered, () => logSuccess('index.html written to dist/index.html'))

}
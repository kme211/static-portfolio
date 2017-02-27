const fs = require('fs')
const nunjucks = require('nunjucks')
let work = require('./src/work')
const moment = require('moment')
const sass = require('node-sass')
const chalk = require('chalk')
const development = process.env.NODE_ENV !== 'production'

const logMsg = (msg) => console.log(chalk.blue(msg))
const logSuccess = (msg) => console.log(chalk.green(msg))
const logError = (error) => console.log(chalk.red(error))

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
                if(error) {
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

if(development) {
    
    const express = require('express')
    const app = express()
    app.use(express.static('dist'))

    nunjucks.configure('views', {
        autoescape: true,
        express: app
    })

    app.get('/', (req, res) => {
        res.render('index.html', { work: work })
    })

    css.then(() => {
        app.listen(3000, function () {
            logMsg('Express server listening on port 3000!')
        })

        watchScss()
    })

} else {

    logMsg('Building index.html...')

    nunjucks.configure('src/views')
    work = work.map(item => Object.assign({}, item, { date: moment(item.date).fromNow()}))
    const rendered = nunjucks.render('index.html', { work: work })
    fs.writeFile('./dist/index.html', rendered, () => logSuccess('index.html written to dist/index.html'))

}
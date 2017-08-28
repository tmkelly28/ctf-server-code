const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const PORT = process.env.PORT || 8080
const app = express()
const secretCode = '2204715'
nunjucks.configure('views', { noCache: true })
module.exports = app

  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .engine('html', nunjucks.render)
  .set('view engine', 'html')
  .use(express.static(path.join(__dirname, '..', 'public')))
  .get('/', (req, res) => res.render('server-secrets'))
  .post('/', (req, res) => {
    if (req.body.secret_code === secretCode) {
      const message = 'You did it!'
      res.render('success', {message})
    } else {
      const message = 'Access? Denied!'
      res.render('fail', {message})
    }
  })
  .use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
  .listen(PORT, () => console.log(`http://localhost:${PORT}`))

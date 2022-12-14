import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import { logger } from 'morgan'
import indexRouter from './routes/index.js'
import dotenv from 'dotenv'

var app = express()

dotenv.config()
var port = process.env.PORT

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )
    if (req.method == 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET',
        )
        return res.status(200).json({})
    }

    next()
})

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`)
})

export default app

const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(()=>{

    const server = express()

    server.get('/consume', (req, res)=> {
        return app.render(req, res, '/consume/index', req.query)
    })

    server.get('/consume/info/:id', (req, res)=> {
        const actualPage = '/consume/info'
        const queryParams = { id: req.params.id }
        app.render(req, res, actualPage, queryParams)

    })

    server.get('/cnode', (req, res)=> {
        return app.render(req, res, '/cnode/index', req.query)
    })

    server.get('/cnode/article/:id', (req, res)=> {
        const actualPage = '/cnode/article'
        const queryParams = { id: req.params.id }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/example', (req, res)=> {
        return app.render(req, res, '/example/index', req.query)
    })

    server.get('*', (req, res)=> {
        return handle(req, res)
    })

    server.listen(port, (err)=> {
        if(err) throw err
        console.log('> Ready on http://localhost:3000')
        if (dev) {
            var openBrowser = require('react-dev-utils/openBrowser')
            var uri = "localhost" + ':' + port;
            console.log('Listening at ' + uri + '\n')
            if (openBrowser(uri)) {
                console.log('The browser tab has been opened!')
            }
        }
    })

})
.catch((ex)=> {
    console.error(ex.stack)
    process.exit(0)
})
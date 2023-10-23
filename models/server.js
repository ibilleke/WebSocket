import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors' 
import { socketControlador } from '../sockets/controller.js'


class Servidor {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = createServer(this.app);
        this.io = new Server(this.server)

        this.paths = {}

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes()

        // Sockets
        this.sockets()
    }

    middlewares() {
        // CORS
        this.app.use(cors())
        // Directorio Público
        this.app.use(express.static('public'))
    }

    routes () {
        // this.app.use(this.paths.auth, routerAuth)
    }

    sockets() {
        this.io.on('connection', socketControlador)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', `${this.port} // URL: http://localhost:${this.port}/` )
        })
    }
}

export default Servidor

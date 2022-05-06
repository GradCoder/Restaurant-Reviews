import app from "./server.js"
import mongdb, { ConnectionPoolClosedEvent } from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config()
const MongoClient = mongdb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DATABASE_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => 
    {
        await RestaurantsDAO.injectDB(client)
        app.listen(port,() =>
        {
            console.log('listening')
        })
    })

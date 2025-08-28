import app from "./app"
import database from "./db"
import { setupAssociations } from "./models/association"

(async () => {
    try {
    const port = parseInt(`${process.env.PORT}`)

    await database.sync()
    console.log(`Rodando no banco de dados ${process.env.DB_NAME}`)
    setupAssociations()
    
    await app.listen(port)
    console.log(`Rodando na porta: ${port}`)

    } catch (error) {
        console.log(`Ocorreu um erro ao subir o servidor: ${error}`)
    }
    
})()
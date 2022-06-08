import mongoose from "mongoose"

//mongoose.connect("mongodb://127.0.0.1:27017");

try {
    async function connectDb(params) {
        await mongoose.connect('mongodb://root:root@mongodb:27017/');
    }
    console.log("Conectando ao Mongodb...");
    connectDb();
    console.log("Mongodb conectado com sucesso.");
    } catch (error) {
    console.log(`Erro conexão mongodb: ${error}.`)
}

let db = mongoose.connection;

export default db;
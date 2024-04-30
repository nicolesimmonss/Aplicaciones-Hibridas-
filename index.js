import express from "express";
import connectDB from "./db.js";
import { routerAPI } from "./routes/index.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenidos al primer parcial</h1><p>Te dejo algunos links que te pueden ayudar: <br> <a href="/plans">Planes</a> <br> <a href="/categories">Categorias</a>  <br> <a href="/users">Usuarios</a> </p>');
});

routerAPI(app);

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
});
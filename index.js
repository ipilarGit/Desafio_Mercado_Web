const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const { getDataFruta, insertarCompra } = require("./consultas");
// Configuracion
app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});
app.set("view engine", "hbs");
app.engine(
    "hbs",
    exphbs({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/componentes/",
        extname: "hbs",
    })
);
// Middlewars
app.use(
    "/bootstrap",
    express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use(
    "/bootstrapJs",
    express.static(__dirname + "/node_modules/bootstrap/dist/js")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));

app.use("/assets", express.static(__dirname + "/assets"));

// Rutas
app.get("/", async function(req, res) {
    const frutaData = await getDataFruta();
    res.render("Inicio", {
        layout: "Inicio",
        frutas: frutaData,
    });
});

app.post("/:nombre", async(req, res) => {
    const { nombre } = req.params;
    console.log(nombre);
    const compra = await insertarCompra(nombre);
    res.send("compra exitosa");
});

app.get("*", (req, res) => {
    res.send("Esta página no existe!!!");
});
const { Pool } = require("pg");
const config = {
    user: "postgres",
    host: "localhost",
    database: "carritowebfrutas",
    password: "postgres",
    port: 5432,
};
const pool = new Pool(config);
const fs = require("fs");

const getDataFruta = () => {
    let data = JSON.parse(fs.readFileSync("frutas.json", "utf8"));
    return data;
};

const insertarCompra = async(nombre) => {
    console.log("insertar compra", nombre);
    const sqlInsertCompra = {
        text: `INSERT INTO compra(nombre) values('${nombre}') RETURNING *;`,
        /* values: [nombre], */
    };
    try {
        const resultado = await pool.query(sqlInsertCompra);
        console.log("resultado.rows ", resultado.rows);
        return resultado.rows;
    } catch (e) {
        console.log("Clase de Error:", e.code);
        return e;
    }
};

module.exports = { getDataFruta, insertarCompra };
async function mostrarListas() {
    let result = await db.query('SELECT * FROM preco_lista')
    return(result.rows)
}

module.exports = mostrarListas;
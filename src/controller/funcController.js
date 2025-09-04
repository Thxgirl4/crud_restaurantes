const db = require("../config/databasae");

exports.findRestaurantById = async (res, req) => {
    const restId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM restaurantes WHERE id = $1', [restId]);
    res.status(200).send(response.rows);
}

exports.updateRestaurantById = async (res, req) => {
    const restaurantId = parseInt(req.params.id);
    const {nome, endereco, telefone, email, descricao, site} = req.body;

    const response = await db.query('UPDATE restaurantes SET nome = $1, endereco = $2, telefone = $3, email = $4, descricao = $5, site = $6 WHERE id = $7', [nome, endereco, telefone, email, descricao, site, restId]

    );
    res.status(200).send({message: "Restaurante Atualizado!"});
};

exports.deleteRestaurantById = async (res, req) => {
    const restId = parseInt(req.params.id);
    await db.query('DELETE FROM restaurantes WHERE id = $1', [restId

    ]);
    res.status(200).send({message: 'Restaurante deletado!', restId });
};
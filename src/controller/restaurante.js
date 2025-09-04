const db = require("../config/database");

// POST -> Criar um novo Restaurante
exports.createRestaurant = async (req, res) => {
    const { nome, endereco, telefone, email, descricao, site } = req.body;
    try {
        const { rows } = await db.query(
            "INSERT INTO restaurantes (nome, endereco, telefone, email, descricao, site) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nome, endereco, telefone, email, descricao, site]
        );

        res.status(201).send({
            message: "Restaurante adicionado com sucesso!",
            body: {
                restaurante: rows[0]
            },
        });
    } catch (error) {
        console.error('createRestaurant', error);
        res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// GET 
exports.listAllRestaurants = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM restaurantes ORDER BY nome ASC");
        res.status(200).send(response.rows);
    } catch (error) {
        console.error('listAllRestaurants', error);
        res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// GET 
exports.findRestaurantById = async (req, res) => {
    const restaurantId = parseInt(req.params.id);
    try {
        const response = await db.query('SELECT * FROM restaurantes WHERE id = $1', [restaurantId]);
        if (response.rows.length === 0) {
            return res.status(404).send({ message: 'Restaurante não encontrado.' });
        }
        res.status(200).send(response.rows[0]);
    } catch (error) {
        console.error('findRestaurantById', error);
        res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// PUT 
exports.updateRestaurantById = async (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const { nome, endereco, telefone, email, descricao, site } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE restaurantes SET nome = $1, endereco = $2, telefone = $3, email = $4, descricao = $5, site = $6 WHERE id = $7 RETURNING *',
            [nome, endereco, telefone, email, descricao, site, restaurantId]
        );
        if (rows.length === 0) {
            return res.status(404).send({ message: "Restaurante não encontrado. Nenhuma alteração foi feita." });
        }
        res.status(200).send({ message: "Restaurante atualizado com sucesso!", restaurante: rows[0] });
    } catch (error) {
        console.error('updateRestaurantById', error);
        res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// DELETE
exports.deleteRestaurantById = async (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const { rowCount } = await db.query('DELETE FROM restaurantes WHERE id = $1', [restaurantId]);
    if (rowCount === 0) {
        return res.status(404).send({ message: 'Restaurante não encontrado.' });
    }
    res.status(200).send({ message: 'Restaurante deletado com sucesso!', id: restaurantId });
};

const validatePerson = (req, res, next) => {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios.'
        });
    }
    next();
};

const validateId = (req,res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'Id inválido!' });
    }
    next();
};

module.exports = { validatePerson, validateId };
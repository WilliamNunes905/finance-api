const express = require('express');
const router = express.Router();

const peopleDB = require('../models/peopleDB');
const { validatePerson, validateId } = require('../middlewares/validatePerson');

router.post('/', validatePerson, async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
    
    res.status(201).json({
    message: `Pessoa cadastrada com sucesso com o id: ${result.insertId}`
    });
  } catch (error) {
    res.status(500).json({ message: `Ocorreu um erro interno ao cadastrar uma pessoa! ${error.sqlMessage}` });
  }
});

router.get('/', async (req, res) => {
  try {
    const [result] = await peopleDB.findAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Ocorreu um erro interno na busca da lista de pessoas! ${err.sqlMessage}` });
  }
});

router.get('/:id', validateId,async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await peopleDB.findById(id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Ocorreu um erro interno na busca por Id da pessoa! ${error.sqlMessage}` });
  }
});

router.put('/:id',validatePerson, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const person = req.body;

    const [result] = await peopleDB.updatePerson(person, id);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso!` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Ocorreu um erro interno ao atualizar uma pessoa! ${err.sqlMessage}` });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await peopleDB.deletePerson(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} deletada com sucesso!` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Ocorreu um erro interno ao deletar uma pessoa! ${err.sqlMessage}` });
  }
});

module.exports = router;
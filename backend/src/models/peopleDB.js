const connection = require('./connection');

const findAll = async () => await connection.execute('SELECT * FROM people');

const findById = async (id) => await connection.execute('SELECT * FROM people WHERE id = ?', [id]);

const insert = async (person) => await connection.execute(
    `INSERT INTO people
    (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
    [person.firstName, person.lastName, person.email, person.phone],
);

const updatePerson = async (person, id) => await connection.execute(
  `UPDATE people SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?`,
  [person.firstName, person.lastName, person.email, person.phone, id],
);

const deletePerson = async (id) => await connection.execute('DELETE FROM people WHERE id = ?', [id]);

module.exports = {
  insert,
  findAll,
  findById,
  updatePerson,
  deletePerson,
};
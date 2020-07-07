import { db } from '../models/index.js';
import { logger } from '../config/logger.js';




const create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Dados para criação vazio',
      });
    }
    const { name, subject, type, value } = req.body    
    const result = await db.grades.insert({ name, subject, type, value, lastModified: new Date().toISOString() })
    res.send({ message: 'Grade inserida com sucesso', id: result.id });
    logger.info(`POST /grade - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};


const cleanAndLoad = async (req, res) => {
  const id = req.params.id;

  try {
    await db.grades.deleteMany();
    await db.grades.insertMany(await db.importJson());
    res.send({
      message: `Grades removidas e carregadas`,
    });
    logger.info(`POST /grade/cleanAndLoad`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao remover e inserir grades' });
    logger.error(`POST /grade/cleanAndLoad - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
   
  try {    
    const result = await db.grades.read(condition);
    res.send(result);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id);
    const [grade] = await db.grades.read({ _id: id});    
    const result = grade ? grade : {};
    res.send(result);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const { name, subject, type, value } = req.body;

  const id = req.params.id;

  try {
    await db.grades.update(id, { name, subject, type, value });
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {

    await db.grades.delete(id);
    res.send({ message: 'Grade excluido com sucesso' });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    await db.grades.deleteMany();
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, cleanAndLoad, findAll, findOne, update, remove, removeAll };

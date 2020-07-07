import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

(async () => {
  try {
    
    db.grades.deleteMany();//clear collection
    db.grades.insertMany(await db.importJson());//import init collection    
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    console.log("Erro: ". error);
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
});

import { deepEqual, ok } from "assert";
import MongoContext from "../context/mongo.context.js";
import GradeSchema from "../context/schemas/grade.schema.js";

let context = {};
const GRADE_INSERT = {
  name: "Marco Tulio",
  subject: "Historia",
  type: "Trabalho Pratico",
  value: "17.4",
  lastModified: "2020-06-19T01:19:24.962Z",
};

const LIST_GRADES_INSERT = [
  {
    name: "Ana Maria Silva",
    subject: "Portugues",
    type: "Trabalho Pratico",
    value: "23.8",
    lastModified: "2020-06-19T01:19:24.962Z",
  },
  {
    name: "Pedro Augusto",
    subject: "Historia",
    type: "Prova Final",
    value: "10",
    lastModified: "2020-06-19T01:19:24.962Z",
  },
];

describe("Mongodb Context Suite Test", function () {
  this.timeout(Infinity);
  this.beforeAll("Cria o contexto", async () => {
    context = new MongoContext(await MongoContext.connect(), GradeSchema);
  });

  this.beforeAll("Limpa collection", async () => {
    context.deleteMany();
  });

  it("Deve verificar se esta conectado ao banco", async () => {
    const expected = "Connected";
    const actual = await context.isConnected();
    deepEqual(actual, expected);
  });

  it("Deve verificar se a collection esta vazia", async () => {
    const expected = 0;
    const actual = (await context.read()).length;
    deepEqual(actual, expected);
  });

  it("Deve inserir uma grade", async () => {
    const expected = GRADE_INSERT;
    const { id, ...actual } = await context.insert(GRADE_INSERT);
    deepEqual(actual, expected);
  });

  it("Deve filtrar uma grade pelo nome", async () => {
    const expected = GRADE_INSERT;
    const [result] = await context.read({ name: GRADE_INSERT.name });
    const { id, ...actual } = result;    
    deepEqual(actual, expected);
  });

  it("Deve atualizar uma grade", async () => {
    const expected = 1;    
    const [{ id }] = await context.read({ type: GRADE_INSERT.type, subject: GRADE_INSERT.subject});
    const { nModified: actual, ...rest} = await context.update(id, { name: "Diego Silva"});    
    deepEqual(actual, expected);
  });

  it("Deve excluir uma grade", async () => {
    const expected = 1;
    const [{ id }] = await context.read({ type: GRADE_INSERT.type, subject: GRADE_INSERT.subject});
    const { deletedCount: actual, ...rest} = await context.delete(id);    
    deepEqual(actual, expected);
  });

  it("Deve inserir uma lista de grades", async () => {
      const expected = LIST_GRADES_INSERT.length;
      await context.insertMany(LIST_GRADES_INSERT);
      const actual = (await context.read()).length;
      deepEqual(actual, expected);
  });
});

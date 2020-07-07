import { deepEqual, ok } from "assert";
import CsvFileHelper from "../helpers/csvfile.helper.js";

const pathCsvFile = "data/grades.csv";
describe("JsonFile Suite Test", function () {
  it("Deve verificar se o arquivo existe", async () => {
    const exists = await CsvFileHelper.existsFile(pathCsvFile);
    ok(exists);
  });

  it("Deve verificar se o arquivo não esta vazio", async () => {
    const empty = await CsvFileHelper.isEmptyCsv(pathCsvFile);
    ok(!empty);
  });

  it("Deve verificar se o csv foi convertido para um json", async () => {
    const dataJson = await CsvFileHelper.getJsonFromCsv(pathCsvFile);
    const expected = 27;
    ok(dataJson);
    ok(dataJson.length > 0);
    deepEqual(dataJson.length, expected);
  });
});

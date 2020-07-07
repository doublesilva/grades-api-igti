import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";

const _dirname = resolve();

export default class CsvFileHelper {
  static async existsFile(pathFile) {
    return await existsSync(join(_dirname, pathFile));
  }

  static async isEmptyCsv(pathFile) {
    const data = readFileSync(join(_dirname, pathFile));
    return data.length == 0;
  }

  static async getJsonFromCsv(pathFile) {
    const data = (await readFileSync(join(_dirname, pathFile))).toString();    
    return this._csvToJson(data);
  }

  static _csvToJson(csv) {
    const [firstLine, ...lines] = csv.split("\n");
    const keys = firstLine.split(",");
    return lines.map((line) =>
      ((values) =>
        keys.reduce(
          (curr, next, index) => ({
            ...curr,
            [next]: values[index],
          }),
          {}
        ))(line.split(","))
    );
  }
}

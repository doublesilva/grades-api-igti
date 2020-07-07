import MongoContext from "../context/mongo.context.js"
import GradeSchema from "../context/schemas/grade.schema.js"
import CsvFileHelper from '../helpers/csvfile.helper.js'


const db = {};

db.connection = (async () => {     
    return await MongoContext.connect();    
});

db.importJson = (async () => {
    return await CsvFileHelper.getJsonFromCsv("data/grades.csv");        
});

db.grades = new MongoContext(db.connection(), GradeSchema);

export { db };

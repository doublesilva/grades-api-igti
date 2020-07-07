export default (mongoose) =>{

    const gradesSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        value:{
            type: String,
            required: true
        },
        lastModified:{
            type: String,
            required: true
        }
    });

    return mongoose.model.grades || mongoose.model('grades', gradesSchema);
} 



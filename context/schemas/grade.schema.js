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
    }, {        
        toJSON: {
          transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;          
          }
        }
    });
    return mongoose.model('grades', gradesSchema);
} 



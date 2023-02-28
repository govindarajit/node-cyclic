const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const BookSchema=new Schema({
    id:String,
    done: Boolean,
    dueDate: Date,
    title: String,
    createdAt: Date,
    updatedAt: Date,
})
module.exports=mongoose.model('CreateTask', BookSchema)
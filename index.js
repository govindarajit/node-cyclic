require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose')
const Book=require('./models/books')
var bodyParser = require('body-parser')

const app=express()

const PORT= process.env.PORT || 3005;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.set('strictQuery',false)
const connectDB=async ()=>{

    // try{
    //     const conn=await mongoose.connection('mongodb+srv://test:test@microfrontends.vppwtdn.mongodb.net/test')

    // }catch(error){
    //     console.log('else',err
    //         );

    //         process.exit(1)
    // }

    mongoose.connect('mongodb+srv://test:test@microfrontends.vppwtdn.mongodb.net/microfrontends?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        // useFindAndModify: false
    })
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.log(err));
}
app.get('/',(req,res)=>{
    res.send({title:"Books"})
})
let router=express.Router()
app.post('/', async(req,res)=>{
    console.log('>>>',req.body);
    const book = new Book(req.body);

    try {
        const post = await book.save();
        if(!post) throw Error('Something went wrong with the post')
        res.status(200).json(post);
    } catch {
        res.status(400).json({msg: error})
    }
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    })
})
require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose')
const CreateTask=require('./models/CreateTask')
var bodyParser = require('body-parser')
const cors=require("cors");
const nodemailer = require("nodemailer");
const app=express()
const { uuid } = require('uuidv4');

const PORT= process.env.PORT || 3005;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
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

const sendMail = (mailList, message, subject, template, attachments) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",  
        secureConnection: false,  
        port: 587,  
        auth: {
            //monakarthik123@outlook.com
            // developermona@outlook.com
            user: "developermona@outlook.com",
            pass: "Monakarthik&143"
            
            
        },
        tls: {
            ciphers: "SSLv3"
        }
    });
    const sendMailOptions = {
        from: 'developermona@outlook.com',//'mona44146@outlook.com',
        to: mailList.join(),
        subject: subject,
        text: message,
        html: template,
    };
    if (attachments) sendMailOptions.attachments = attachments;
    return transporter.sendMail(sendMailOptions);
};



app.get('/',(req,res)=>{
    // res.send({title:"Books"})
    CreateTask.find()
    .then((response) => {
       // res.send({ message: response });
       res.send(response); 

    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
})

app.post('/', async(req,res)=>{
    console.log('>>>',req.body);
    const book = new CreateTask(req.body);

    // try {
    //     const post = await book.save();
    //     if(!post) throw Error('Something went wrong with the post')
    //     res.status(200).json(post);
    // } catch {
    //     res.status(400).json({msg: error})
    // }

    CreateTask.create({ 
        id:uuid(),
        done: false,
        dueDate: req.body.dueDate,
        title: req.body.title,
    })
        .then(response => {
            console.log('log after create');
            res.send(
                {
                    "message": "Task successfully updated",
                    "response": response
                }
            );
            const mailList = ['mona44146@outlook.com']
                                const message = "";
                                const subject = "Task created successfully";
                                const template = `<div class="" id="editorParent_1">
                                <div tabindex="0" dir="ltr" class="dFCbN k1Ttj dPKNh DziEn" role="textbox" aria-multiline="true"
                                    aria-label="Message body, press Alt+F10 to exit" contenteditable="true" style="user-select: text;"
                                    textprediction="false" spellcheck="true">
                                    <div class="elementToProof">
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <span id="✅" style="font-size:100pt">✅</span><br></div>
                                        <div class="elementToProof"
                                            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <span class="chakra-alert__title css-zvy4 ContentPasted1"
                                                style="border-width:0px; border-style:solid; box-sizing:border-box; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:20pt"><b>Your
                                                    task has been successfully created!</b></span><br class="ContentPasted1"></div>
                                        <div class="elementToProof"
                                            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <span class="chakra-alert__desc css-xbzfl4 ContentPasted1"
                                                style="border-width:0px; border-style:solid; box-sizing:border-box; display:inline; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:12pt">Thanks
                                            </span><span class="chakra-alert__desc css-xbzfl4 ContentPasted1"
                                                style="border-width:0px; border-style:solid; box-sizing:border-box; display:inline; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:12pt">for
                                                creating a task. All the very best for your task<span id="😊">😊</span></span><br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div class="elementToProof"
                                            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
                                            <br></div>
                                        <div id="Signature">
                                            <div>
                                                <p
                                                    style="margin-top: 0px; margin-bottom: 0px;margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin:0cm; font-size:11pt; font-family:Calibri,sans-serif">
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                                sendMail(['monakarthik123@outlook.com'], message, subject, template).then((response) => {
                                    console.log(response);
            console.log('log after mail sent');

                                }).catch((error) => {
            console.log('log after mail didnt sent');

                                    console.log(error);
                                });

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
})

app.put('/:id', async(req,res)=>{
CreateTask.findOneAndUpdate({ id: req.params.id }, {
    done: req.body.done,
    dueDate: req.body.dueDate,
    title: req.body.title,

}).then((response) => {

        console.log('res',response);

        let template=`<div class="x_elementToProof">
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span id="x_✅" style="font-size:100pt">✅</span><br></div>
        <div class="x_elementToProof elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span class="x_chakra-alert__title x_css-zvy4 x_ContentPasted1"
                style="border-width:0px; border-style:solid; box-sizing:border-box; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:20pt"><b>Your
                    task has been successfully updated!</b></span><br class="x_ContentPasted1"></div>
        <div class="x_elementToProof elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span class="x_chakra-alert__desc x_css-xbzfl4 x_ContentPasted1"
                style="border-width:0px; border-style:solid; box-sizing:border-box; display:inline; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:12pt"><span
                    id="x_😊" style="font-size: 25pt;">😊</span></span><br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div id="x_Signature">
            <div>
                <p
                    style="margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin:0cm; font-size:11pt; font-family:Calibri,sans-serif">
                </p>
            </div>
        </div>
    </div>`
    const mailList = ['monakarthik123@outlook.com']
    const message = "";
    const subject = "Task updated successfully";


    sendMail(mailList, message, subject, template).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
        
        res.send(
            {
                "message": "Task successfully updated",
                "response": response
            }
        );
    })
    .catch(err => {
        console.log('err:',err);
        
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
})
app.delete('/:id', async(req,res)=>{
    CreateTask.deleteMany({ id: req.params.id })
    .then((response ) => { 
        res.json({
            "message": "Task successfully deleted!",
            "response": response
        });


        let template=`<div class="x_elementToProof">
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span id="x_✅" style="font-size:100pt">✅</span><br></div>
        <div class="x_elementToProof elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span class="x_chakra-alert__title x_css-zvy4 x_ContentPasted1"
                style="border-width:0px; border-style:solid; box-sizing:border-box; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:20pt"><b>Your
                    task has been successfully deleted!</b></span><br class="x_ContentPasted1"></div>
        <div class="x_elementToProof elementToProof"
            style="text-align:center; font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <span class="x_chakra-alert__desc x_css-xbzfl4 x_ContentPasted1"
                style="border-width:0px; border-style:solid; box-sizing:border-box; display:inline; color:rgb(45,55,72); font-family:Comic Sans MS,Chalkboard,cursive; font-size:12pt"><span
                    id="x_😊" style="font-size: 25pt;">😊</span></span><br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div class="x_elementToProof"
            style="font-family:Calibri,Helvetica,sans-serif; font-size:10pt; color:rgb(0,0,0); background-color:rgb(255,255,255)">
            <br></div>
        <div id="x_Signature">
            <div>
                <p
                    style="margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin-top:0px; margin-bottom:0px; margin:0cm; font-size:11pt; font-family:Calibri,sans-serif">
                </p>
            </div>
        </div>
    </div>`
    const mailList = ['monakarthik123@outlook.com']
    const message = "";
    const subject = "Task deleted successfully";


    sendMail(mailList, message, subject, template).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
    });
    })
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    })
})
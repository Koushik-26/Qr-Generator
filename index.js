import express from "express";
import bodyParser from "body-parser";
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",(req,res)=>
{ 
   
    const d = new Date();
    const year = d.getFullYear();
   res.render("index.ejs",{
    Image:"",
    Date:year});
});

app.post("/post",(req,res)=>{
    const url = req.body["input"];
    var qr_svg = qr.image(url);
    const qrFilePath = 'public/img.png'; 
    const writeStream = fs.createWriteStream(qrFilePath);
    qr_svg.pipe(writeStream);
    fs.writeFile("URL.txt",url,(err)=>{
        if(err) throw err;
        console.log("FIle has been saved!");
    });

    const d = new Date();
    const year = d.getFullYear();
   res.render("index.ejs",{
    Image:"/img.png",
    Date:year});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
   
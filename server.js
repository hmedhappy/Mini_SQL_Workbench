const cors = require('cors');
const bodyParser = require('body-parser')

const mysql = require('mysql');
var db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'password',
   database:'acme' 
});
db.connect();

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// GRANT ALL PRIVILEGES ON `root`.* TO 'root'@'localhost';



const app = require('express')();
app.use(cors()) ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = 5000
app.listen(5000,()=>console.log(`Server Connected... | PORT: ${PORT}`));

app.post('/users',(req,res)=>{
   const QUERY=  req.body;
   console.log(QUERY);
    db.query(QUERY.query,(err,result)=>{
        if(err){
            res.json({error:"Bad request"})
        }else{

            res.json(result);
        }
    })
    // res.send(QUERY);
})

app.get('/',(req,res)=>{
    res.send('hello')
});

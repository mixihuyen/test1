//FILE UPLOADS FROM WEB 

var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
var router      = express.Router(); 
var multer  =   require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        

var router = express.Router();              

const dbname    = "admin";

var hostname ='';
var port2 ='';

app.post('/', function(req, res){ 
    hostname = req.body.hostname;
    port2 = req.body.port2;
    console.log(hostname);
    console.log(port2);
});

app.get('/home',function(req,res){
    res.status(200).sendFile(__dirname + '/homepage.html');
});


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage : storage});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/students/photo',upload.single('userPhoto'),function(req,res){
   
        res.send(`File is uploaded: ${upload.fields}`);
    });

app.get('/api/students/photo',(req,res)=>{
    res.status(200).sendFile(__dirname + '/studentpage.html');
})


app.listen(port);
console.log('Web Server is listening at port' + port);
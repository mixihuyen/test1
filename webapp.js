const http = require("http");
const dt = require('./mymodule');
const port = 4000;
const hostname = "localhost";
const fobj= require('fs');



const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html")
    
    switch (req.url){
        case "/home":
            res.writeHead(200);
            res.end("<h1> This is Home page</h1>");
            break;
        case "/about":
            res.writeHead(200);
            res.end("<h1> This is About page</h1>");
            break;
        case "/compute":
            res.writeHead(200);
            res.end(`<h1> This is About page ${dt.congtrunhanchia(10,200,"+")} <h1>`)
            break;
        case "/literature":
            res.writeHead(200,"Content-Type","text/plain");
            const fcontent = fobj.readFileSync('./alice.txt');
            res.write(`${fcontent.toString()}`);
            res.end("THIS IS THE END OF STORY");
            break;
        case "/literature2":
            res.writeHead(200,"Content-Type","text/plain");
            fobj.readFile('./alice.txt',(err,data)=>{
                
                if (err){
                    console.log(`error found with code: ${err.errno} and message: ${err.message}`);
                    res.end(`error found with code: ${err.errno} and message: ${err.message}`);
                }
                else{
                    res.write(data.toString());
                }
            }
            );

            res.end("THIS IS THE END OF THE STORY.");

            break;
        case "/literature2":
            res.writeHead(200,"Content-Type","text/plain");
            fobj.readFile('./alice.txt',(err,data)=>{
                
                if (err){
                    console.log(`error found with code: ${err.errno} and message: ${err.message}`);
                    res.end(`error found with code: ${err.errno} and message: ${err.message}`);
                }
                else{
                    res.write(data.toString());
                }
            }
            );

            res.end("THIS IS THE END OF THE STORY.");

            break;
        case "/literature2":
            res.writeHead(200,"Content-Type","text/plain");
            fobj.readFile('./alice.txt',(err,data)=>{
                
                if (err){
                    console.log(`error found with code: ${err.errno} and message: ${err.message}`);
                    res.end(`error found with code: ${err.errno} and message: ${err.message}`);
                }
                else{
                    res.write(data.toString());
                }
            }
            );

            res.end("THIS IS THE END OF THE STORY.");

            break;
        case "/literature3":
            var txtdata = "We are using the writeFile function"
            res.writeHead(200,"Content-Type","text/plain");
            fobj.writeFile('./alice.txt',txtdata,{encoding: "utf8",flag: "r+"},(err)=>{
                    
                if (err){
                    console.log(`error found with code: ${err.errno} and message: ${err.message}`);
                    res.end(`error found with code: ${err.errno} and message: ${err.message}`);
                }});
    
            res.end("We are using the writeFile function");
    
            break;
        case "/openfile":
            var buff = new Buffer.alloc(100);
            fobj.open('./alice.txt',"r+",(err,fd)=>{
                if (err){
                    return console.log(err.message);
                }
                else{
                    fobj.read(fd,buff,0,buff.length,0,()=>{return;});
                    res.write("We are successfully to open file in read mode:------");
                    //res.write(buff.toString('ascii'));
                    res.write(buff);
                    res.end();
                }
            });
            break;
        case "/writefile":
            var buff = new Buffer.alloc(100);
            buff = "We are now create a file and write down contents";
            fobj.open('./alice.txt','r+',(err,fd)=>{
                if (err){
                    return console.log(err.message);
                }
                else{
                    fobj.write(fd,buff,200,'utf-8',()=>{return;});
                    res.write("we write a file.");
                    res.end();
                }
            });
            break;
        default:
            res.end("<h1>Hello World</h1><p>This is a HTML response</p><ol><li>One</li><li>Two</li><li>Three</li></ol>");
            break;
    }

});

server.listen(port,hostname,()=>{
    console.log("server dang hoat dong....")
});
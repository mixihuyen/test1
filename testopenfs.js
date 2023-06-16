
const fobj = require("fs");

var buff = new Buffer.alloc(20);
fobj.open('./alice.txt','r',(err,fd)=>{
                if (err){
                   console("File error")
                    return console.log(`${err.message}`);
                }
                fobj.read(fd,buff,0,buff.length,0,(err,bytesRead)=>{
                    console.log(`i am reading this file:${buff}`);

                    return;
                });
                //res.end(`The file is already existed with contents: ${buff}`);
                console.log(`This is first ${buff}`);

            });
//console.log(buff.length);
//console.log("no thing");
console.log('main module');
console.log(buff);

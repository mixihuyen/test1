const stuRouter = require('express').Router();
const Joi = require("joi");
const fobj= require('fs');
const Event = require('events');
const emitter = new Event;

const studentFN = "./studentdata.txt";


stuRouter.get('/load', (req,res)=>{

    try{
        const buf = fobj.readFileSync(studentFN);
        students = JSON.parse(buf);
        res.status(200).send(students);
    }
    catch(err){
        res.status(400).send('Student File does not exists.');
    }
});

stuRouter.get('/newsave', (req,res)=>{
    try{
        fobj.writeFileSync(studentFN,JSON.stringify(students));
        res.status(200).send(`The student data is successfully stored to the file ${studentFN}`);
    }
    catch(err){
        res.status(400).send('Error Ocurred!!!!');
    }

});

stuRouter.get('/genHelloEvent',(req,res)=>{
    emitter.emit(':genHelloMessage',{id: 1, name: "tran thanh truc"});
});

emitter.on(':genHelloMessage',(js)=>{
    console.log(`Xin chao cac ban:`);
    console.log(js);
});

stuRouter.post('/append',(req,res) => {
    //validate the student information
    
    const {error} = checkValidation2(req.body);
    if (error) return res.status(400).send('Bad Json input!!!'); 

    const dupstudent = students.find(e => {
        return e.name === req.body.name && e.DayOfBirth == req.body.DayOfBirth
            && e.MonthofBirth == req.body.MonthofBirth && e.YearofBirth == req.body.YearofBirth;
    });

    if (!dupstudent){
        students.push(req.body);
        res.status(200).send('Successfully Input Student' +  req.body+ 
                                'to the Data!!');
    }
    else{
        res.status(400).send('this student alreadry existed :' + dupstudent);
    }
});

stuRouter.get('/view',(req,res)=>{
    res.status(200).send(students);
});



function checkValidation2(student){
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        DayOfBirth: Joi.number().integer().min(1).max(31).required(),
        MonthofBirth: Joi.number().integer().min(1).max(12).required(),
        YearofBirth: Joi.number().integer().min(1951).max(2023).required()
    }
    
    const result = Joi.validate(student,schema);
    if (result.error) return result; 
    
    const schema2 = {
        date: Joi.date().required()
    }
    
    const result2 = Joi.validate({"date": Date.parse(`${student.YearofBirth}-${student.MonthofBirth}-${student.DayOfBirth}`)},schema2);
    return result2;
 }


function checkValidation(day,month,year){
    if (year <=1950 || year>=2023){
        return false;
    }
    if (month<1 || month>12){
        return false;
    }
    switch (month){
        case 1,3,5,7,8,10,12: 
        if (day<1 || day>31) {
            return false;
        }
        break;
        case 2:
            if (day<1 || day>29) {
                return false;
            }
            break; 
        default:
            if (day<1 || day>30) {
                return false;
            }
    }
    return true;
}
module.exports = stuRouter;
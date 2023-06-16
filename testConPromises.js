
const p1 = getStudentFirstName(1);

const p2 = getStudentLastName(1);

Promise.all([p1,p2])
    .then((result => console.log('Full name is: %s %s',result[1].gitHubUsername, result[0].gitHubUsername)))
    .catch(error => console.log(error));

Promise.race([p1,p2])
    .then((result => console.log('Portion of name is: %s',result.gitHubUsername)))
    .catch(error => console.log(error));

function getStudentFirstName(id){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('Reading from a database of student firstname....');
            if (typeof id == 'number')
                resolve({id: id, gitHubUsername: 'truc'});
            else reject(Error('id is not a number'));
        }, 2000);
    } );    
}

function getStudentLastName(id){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('Reading from a database of student lastname....');
            if (typeof id == 'number')
                resolve({id: id, gitHubUsername: 'tran'});
            else reject(Error('id is not a number'));
        }, 2500);
    } );    
}


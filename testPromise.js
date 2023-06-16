const number = require("joi/lib/types/number");

console.log('before');
//const user = getUser(1, function);
//console.log(user);
getUser('a')
    .then((user)=>getRespositories(user.gitHubUsername))
    .then((repos)=> getCommits(repos))
    .then((commits)=> displayCommits(commits))
    .catch((error) => console.log(error) );

console.log('after');


// this function immediately go to return 1 and return the result.
// never occurs the result:  {id: id, gitHubUsername: 'truc'}
// result: 
//  -- before
//  -- 1
// -- after
/*function getUser(id){
    setTimeout(()=>{
        console.log('Reading from a database ....');
        return {id: id, gitHubUsername: 'truc'};
    }, 2000);
    return 1;
}*/

//this version return the result whenerver it found by using callback
// never occur return 1 value. 
//results: 
//  - before
//  - after
//  - Reading from a database ....
//  - User { id: 1, gitHubUsername: 'truc' }
function getUser(id){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('Reading from a database ....');
            if (typeof id == 'number')
                resolve({id: id, gitHubUsername: 'truc'});
            else reject(Error('id is not a number'));
        }, 2000);
    } );    
}


function getRespositories(username){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('Calling GitHub API ....');
            console.log('hello')
            if (typeof username == 'string')
                resolve (['repo1', 'repo2', 'repo3']);
            else reject(Error('username is not a string'));
        },2000);
    });
}

function getCommits(repos){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('Calling commits ....');
            resolve (['commit 1', 'commit 2', 'commit3', 'commit 4']);
        }, 2000); 
    });
       
}

function displayCommits(commits){
    return console.log(commits);
}
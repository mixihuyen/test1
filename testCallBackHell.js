console.log('before');
//const user = getUser(1, function);
//console.log(user);
getUserA(1, function(user){
    console.log('User', user);
    getRespositories(user.gitHubUsername, (repos)=>{
        console.log('Repos',repos);
        getCommits(repos, (commits)=>{
            displayCommits(commits);
        } );
    });
});
console.log('after');


// this function immediately go to return 1 and return the result.
// never occurs the result:  {id: id, gitHubUsername: 'truc'}
// result: 
//  -- before
//  -- 1
// -- after
function getUser(id){
    setTimeout(()=>{
        console.log('Reading from a database ....');
        return {id: id, gitHubUsername: 'truc'};
    }, 2000);
    return 1;
}

//this version return the result whenerver it found by using callback
// never occur return 1 value. 
//results: 
//  - before
//  - after
//  - Reading from a database ....
//  - User { id: 1, gitHubUsername: 'truc' }
function getUserA(id, callback){
    setTimeout(()=>{
        console.log('Reading from a database ....');
        callback({id: id, gitHubUsername: 'truc'});
    }, 2000);
    //return 1;
}


function getRespositories(username, callback){
    setTimeout(()=>{
        console.log('Calling GitHub API ....');
        console.log('hello')
        callback (['repo1', 'repo2', 'repo3']);
    },2000);
}

function getCommits(repos, callback){
    setTimeout(()=>{
        console.log('Calling commits ....');
        callback (['commit 1', 'commit 2', 'commit3', 'commit 4']);
    }, 2000);    
}

function displayCommits(commits){
    return console.log(commits);
}
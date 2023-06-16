console.log('before');
getUser(1,function(user){
    console.log(user);
    getRespositories(user.gitHubUsername, (repos)=>{
        console.log(repos);
        getCommits(repos,displayCommits);
    })
});
console.log('after');

//getUserA_(1);

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
function getUserA_(id){
    getUserA(id, getRespositories_);
}

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading from a database ....');
        callback ({id: id, gitHubUsername: 'truc'});
    }, 2000);
    return 1;
}

function getRespositories_(user){
    getRespositories(user.gitHubUsername, getCommits_);
}

function getRespositories(username, callback){
    setTimeout(()=>{
        console.log('Calling GitHub API ....');
        callback (['repo1', 'repo2', 'repo3']);
    },2000);
}

function getCommits_(repos){
    getCommits(repos, displayCommits);
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
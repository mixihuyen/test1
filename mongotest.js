const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected'))
    .catch(err =>console.error('could not connect to MongoDB',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Truc',
        tags: ['Angular','frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourse(){
    
    const course3 = await Course
       .find()
        //.find({name: 'Node.js Course'})
       .and([{name: 'Node.js Course'}, {isPublished: true}]);
       //.or([{author:'Truc'},{isPublished: false}]);
       //.limit(10);

    const courses = await Course
       .find({author: 'Truc', isPublished: true})
       .limit(3)
       .sort({name: 1})
       .select({name:1, tags: 1});

    //eq
    //ne
    //gt
    //gte
    //lt
    //lte
    //in
    //nin

    const course1 = await Course
       .find({price: {$gt: 10, $lte: 20}, isPublished: true});

    const course2 = await Course
       .find({price: {$in: [10,15,20]}, isPublished: true});
    

    const course4 = await Course
       .find({name: /^A/, isPublished: true});
    
    const course5 = await Course
       .find({name: /s$/i, isPublished: true}); //i: insensitive

       //contain Cou
    
    const course6 = await Course
       .find({name: /.*Cou*/, isPublished: true})
       .count();

    const pageNum = 10;
    const pageSz = 3;
    //  /api/courses?pageNum=2&pageSize=3

    const course7 = await Course
       .find()
       .skip((pageNum-1)*pageSz)
       .limit(pageSz)
       .sort({name: 1})
       .select({name:1, tags: 1});
    console.log(course7);
}

getCourse();

//createCourse();

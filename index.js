const express = require('express');
const Joi = require('joi');
const app = express();

//joi for validating post requests

//adding middleware for post body
app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/courses/',(req,res)=>{
    res.send(courses);
});

app.get('/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //if course is not found
    if(!course) {
        res.status(404).send('course not found');
        return;
    }
    res.send(course);
});

//Without Joi
// app.post('/courses',(req,res) => {
//     //for security resons, we must verify the response
//     if(!req.body.name || req.body.name.length <3)
//     {
//         res.status(400).send('Name is required and should be required than 3');
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name ,
//     };
//     courses.push(course);
//     res.send(course);
// });


//With Joi
app.post('/courses',(req,res) => {
    
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name ,
    };
    courses.push(course);
    res.send(course);
});

//Update course with PUT
app.put('/courses/edit/:id',(req, res)=>{
    //Look up the course
    //if does not exist, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('course not found');
        return;
    }


    //Validate
    //If invalid, return 400 - Bad Request
    const result = ValidateCourse(req.body);
    //object destructuring: error is a property of result object so instead of writing like result.error, we can write {error}
    const { error } = ValidateCourse(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
        
    }

        

    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);


});

app.delete('/courses/remove/:id', (req, res)=>{

    //Look up the course
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //if does not exist, return 404
    if(!course) {
        return res.status(404).send('course not found');
        
    }
    //Delete the course
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //Return the deleted the course
    res.send(course);
});


function ValidateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}`));
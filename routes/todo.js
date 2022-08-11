const express = require('express');
const router = express.Router();
const TodoTask = require('../models/todoTask');

router.get('/', async (req,res)=>{
    try{
        const todos = await TodoTask.find({});
        res.render('todo/index', {
            todos,
        });
    }catch {
        console.log('error');
    }
})

router.get('/new', (req,res)=>{
    res.render('todo/new', {todo: new TodoTask()});
})

router.post('/',async (req,res)=>{
    const todo = new TodoTask({
        task: req.body.task,
        description: req.body.description
    })
    try{
        // const newTask= await task.save();
        await todo.save();
        res.redirect('/todo');
    } catch {
        console.log("error posting");
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const todo= await TodoTask.findById(req.params.id);
        res.render('todo/show',{
            todo: todo
        })
    } catch {
        res.redirect('/');
    }
})

router.get('/:id/edit', async (req,res)=>{
    try{
        const todo= await TodoTask.findById(req.params.id);
        res.render('todo/edit',{todo: todo});
    } catch{
        res.redirect('/');
    }
})
router.put('/:id', async(req,res)=>{
   let todo;
    try{
        todo = await TodoTask.findById(req.params.id);
        todo.task = req.body.task;
        todo.description = req.body.description;
        todo.updatedOn = new Date();
        await todo.save();
        res.redirect(`/todo/${todo.id}`);
    }catch{
        if(todo.task==null){
            res.redirect('/');
        } else {
            res.render('todo/edit', {
                todo: todo
            })
        }
    }
})
router.delete('/:id', async (req,res)=>{
    let todo
    try{
        todo = await TodoTask.findById(req.params.id);
        await todo.remove(); 
        res.redirect('/todo');
    }catch {
        if(todo==null){
            res.redirect('/');
        }else{
            res.redirect('/todo');
        }
    }

})
module.exports = router;
const express= require('express');
const router = express.Router();
const DailyTask = require('../models/dailyTask');

router.get('/', async (req,res)=>{
    try{
        const dailyTasks = await DailyTask.find({});
        res.render('dailies/index', {
            dailyTasks
        });
    }catch{
        res.redirect('/');
    }
})

router.post('/', async (req,res)=>{
    const dailyTask = new DailyTask({
        task: req.body.task
    });
    try{
        await dailyTask.save();
        res.redirect('/dailies');
    } catch {

    }
})

router.get('/:id/edit', async (req,res)=>{
    try{
        const dailyTask = await DailyTask.findById(req.params.id);
        res.render('dailies/edit',{
            dailyTask: dailyTask
        })
    } catch {
        res.redirect('/');
    }

})

router.put('/:id', async (req,res)=>{
    try{
        let dailyTask= await DailyTask.findById(req.params.id);
        dailyTask.task=req.body.task;
        await dailyTask.save();
        res.render('dailies/index',{
            dailyTasks: await DailyTask.find({})
        });
    } catch {
        console.log('/');
    }
})
router.delete('/', async (req,res)=>{
    try{
        await DailyTask.deleteMany({});
        res.redirect('/dailies');
    } catch {
        res.redirect('/');
    } 
})
router.delete('/:id', async (req,res)=>{
    let dailyTask
    try{
        dailyTask = await DailyTask.findById(req.params.id);
        await dailyTask.remove(); 
        res.redirect('/dailies');
    } catch {

    }
})
module.exports= router;
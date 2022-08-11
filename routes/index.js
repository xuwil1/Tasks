const express= require('express');
const router = express.Router();
const DailyTask = require('../models/dailyTask');



router.get('/', async (req,res)=>{ 

    try{
        let dailyTasks= await DailyTask.find({});       
        dailyTasks.forEach(async task=>{
            if(task.refresh.toISOString().split('T')[0]!==new Date().toISOString().split('T')[0]){
                task.refresh= new Date();
                task.checked=false;
                task.hidden=false;
                await task.save();
            }
        })
        res.render('daily/index',{
            task: dailyTasks
        });
    } catch{
        console.log('error');
    }
})

router.put('/:id/mark', async(req,res)=>{
    let daily;
    try{
        daily = await DailyTask.findById(req.params.id);
        daily.checked = !daily.checked;
        await daily.save();
        res.redirect(`/`);
    }catch{
    console.log('problem');
    }
})
router.put('/', async(req,res)=>{
    try{
        let dailyTasks= await DailyTask.find({checked: true}).exec();
        dailyTasks.forEach(async task=>{
            task.checked=false;
            await task.save();
        })
        res.redirect(`/`);
    } catch{
        console.log('show all');
    }

})
module.exports= router;
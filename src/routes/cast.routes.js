const express = require('express');
const router = express.Router();

const Cast = require('../models/cast');

router.get('/', async (req, res) => {
   const CastMembers = await Cast.find();
       res.json(CastMembers);
   });

router.get('/:id', async (req, res) => {
   const CastMember = await Cast.findById(req.params.id);
   res.json(CastMember);
});

router.post('/', async (req, res) => {
    const { first_name, last_name} = req.body;
    const CastMember = new Cast({first_name,last_name});
    await CastMember.save();
    console.log(CastMember);
    res.json({status: 'Cast Member Saved'});
});

router.put('/:id' , async (req, res) => {
    const { first_name, last_name} = req.body;
    const newCastMember = { first_name, last_name};
    await Cast.findByIdAndUpdate(req.params.id, newCastMember);
    console.log(req.param.id);
    res.json({status: 'Cast Member info Updated'});
});

router.delete('/:id', async (req, res) => {
    await Cast.findByIdAndRemove(req.params.id);
    res.json({status: 'Cast member info deleted'});
});



module.exports = router;
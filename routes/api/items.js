const router = require('express').Router();
const Item = require('../../Models/Item');

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

router.post('/', (req, res) => {
    const newItem = new Item ({
        name: req.body.name,
    });

    newItem.save().then(item => res.json(item));
});
module.exports = router;

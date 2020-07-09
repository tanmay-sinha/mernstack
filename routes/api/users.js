const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../Models/User');

router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({msg : 'Enter all fields!'});
    }

    User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            name, email, password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json({ user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }})
                })
            })
        })
    });
});

module.exports = router;

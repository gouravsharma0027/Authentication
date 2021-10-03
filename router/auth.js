const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`)

});

// signup route.

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill all the field properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist." });

        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching." });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }


    } catch (err) {
        console.log(err);
    }
});

//login route.

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "plz fill the data " });
        }

        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

             const token = await userLogin.generateAuthToken();
             console.log(token);

             res.cookie("jwtoken" , token, {
                 expires:new Date(Date.now() + 2592000000),
                 httpOnly:true
             });
            
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials." });
            } else {
                res.json({ message: "user Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials." });
        }





    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
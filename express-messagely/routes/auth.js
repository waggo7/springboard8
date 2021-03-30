/** POST /login - login: {username, password} => {token}
 * Make sure to update their last-login!
 **/
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");
const User = require("../models/user");
const { user } = require("../db");



router.post('/login', async (req, res, next)=>{
    try {
        const { username, password } = req.body;
        const result = db.query("SELECT password FROM user WHERE username =$1", [username]);
        let user = result.rows[0]
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let toke = jwt.sign({ username }, SECRET_KEYd)
                return res.json({ toke })
            }
        }
        throw new ExpressError('invalid user/password', 404)
    } catch (e) {
        return next(e)
    }
})
/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) => {
    try {
        const { username } = await User.register(req.body);
        const token = jwt.sign({ username }, SECRET_KEY)//creates token to send 
        User.updateLoginTimestamp(username);//updates database
        return req.json({username})
    } catch (err) {
        return next(err)
    }
})
module.exports = router;
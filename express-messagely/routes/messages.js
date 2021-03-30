const Router = require("./auth").Router;
const router =new Router();
const Message = require('../models/message')
const { ensureLoggedIn } = require("../middleware/auth");
const ExpressError = require("../expressError");
const { user } = require("../db");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id",ensureLoggedIn, async (req, res, next) => {
    try {
        const username = req.user.username;
        let message = await Message.get(req.params.id);
        if (message.to_user.username !== username && message.from_user.username !== username) {
            throw new ExpressError('problem reading message please try again', 404)
        }
        return res.json({username})
    } catch (err) {
    return next(err)}
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', ensureLoggedIn, async (req, res, next) => {
    try {
        let message = await Message.create({
            to_username: req.body.to_username,
            from_username: req.user.from_username,
            body:req.body.body
        })
        return res.json({message:message})
    } catch (err) {
    return next(err)}
})
/** POST/:id/read - mark message as read:
 *  => {message: {id, read_at}}
 * Make sure that the only the intended recipient can mark as read.
 **/
router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
    try {
        const username = req.user.username;//stored user name
        let messageid = await Message.get(req.params.id)//incoming data for message id
        if (username !== messageid.to_user.username) {
            throw new ExpressError('incorrect information', 404);
        }
        let readmsg = Message.markRead(messageid);
        return res.json({readmsg})
    } catch (err) {
    return next(err)}
})
module.exports = router;

/** User class for message.ly */
const timestamp = require ('timestamp');
const bcrypt = require ('bcrypt');
const message = require ('message');
const {BCRYPT_WORK_FACTOR} = require ('../config');
const db = require ('../db');
const ExpressError = require ('../expressError');
/** User of the site. */

class User {
  /** register new user -- returns
     *    {username, password, first_name, last_name, phone}
     */

  static async register({username, password, first_name, last_name, phone}) {
    let passtohash = bcrypt.hash (password, 10);
    const newuser = await db.query (
      'INSERT INTO user  (username, passtohash, first_name,last_name,phone,join_at, last_login_at) VALUES ($1,$2,$3,$4,$5, current_timestamp,current_timestamp) RETURN username, password, first_name, last_name, phone ',
      [username, passtohash, first_name, last_name, phone]
    );
    //console.log(newuser);
    return newuser.rows[0];
  }
  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate (username, password) {
    let checkdb = db.query ('SELECT password FROM user WHERE user = $1', [
      username,
    ]);
    const checkdusr = checkdb.rows[0];
    if (checkdusr)
      return checkdusr && (await bcrypt.compare (password, checkdusr.password));
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp (username) {
    const result = db.query (
      `UPDATE user SET last_login_at= current_timestamp WHERE current_timestamp =$1 RETURN username`,
      [username]
    );
    return result.rows[0];
  }

  /** All: basic info on all users:
     * [{username, first_name, last_name, phone}, ...] */

  static async all () {
    const result = await db.query (`
                    SELECT (username, first_name, last_name,phone) FROM user  ORDER BY username
                    `);
    return result.rows;
  }

  /** Get: get user by username
     *
     * returns {username,
     *          first_name,
     *          last_name,
     *          phone,
     *          join_at,
     *          last_login_at } */

  static async get (username) {
    const result = await db.query (
      `SELECT (username,first_name,last_name,phone,join_at,last_login_at) FROM user WHERE username =$1`,
      [username]
    );
    if (!result.rows[0]) {
      throw new ExpressError (`no such user: ${username}`, 404);
    }
    return result.rows[0];
  }

  /** Return messages from this user.
     * [{id, to_user, body, sent_at, read_at}]\
     * where to_user is
     *   {username, first_name, last_name, phone}
     */

  static async messagesFrom (username) {
    const result = await db.query (
      'SELECT m.id,m.to_username,m.body,m.send_at,m.read_at,u.user,u.first_name,u.last_name,u.phone FROM messages as m JOIN user AS u ON ..../m.to_username = u.username WHERE to_username = $1 ',
      [username]
    );
    return result.map (m => ({
      id: m.id,
      to_user: {
        username: m.to_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone,
      },
      bod: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at,
    }));
  }

  /** Return messages to this user.
     *
     * [{id, from_user, body, sent_at, read_at}]
     *
     * where from_user is
     *   {id, first_name, last_name, phone}
     */

  static async messagesTo (username) {
    const result = await db.query (
      `SELECT m.id,m.to_username, m.body, m.send_at, m.read_at, u.user, u.first_name, u.last_name, u.phone FROM messages as m JOIN user AS u ON ..../ m.from_username = u.username WHERE from_username = $1 `,
      [username]
    );
    return result.map (m => ({
      id: m.id,
      to_user: {
        username: m.from_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone,
      },
      bod: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at,
    }));
  }
}

module.exports = User;

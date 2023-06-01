const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db/indexDB');

const cookieExtractor = function (req) {
  let token = null;
  // If there is a jwt cookie, then make token = to the jwt token
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  // {id} comes from the JWT payload which has the user.id & user.email
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        'SELECT id, email FROM users WHERE id = $1',
        [id]
      );

      // If there is no users then throw an error
      if (!rows.length) {
        throw new Error('401 not authorized');
      }

      // Store users id & email
      let user = { id: rows[0].id, email: rows[0].email };

      // Return the user info
      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

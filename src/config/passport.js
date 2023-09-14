const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { Account } = require('../models');
const { TOKEN_TYPE } = require('./type');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== TOKEN_TYPE.ACCESS) {
      throw new Error('Invalid token type');
    }
    const account = await Account.findByPk(payload.sub);
    if (!account) {
      return done(null, false);
    }
    done(null, account);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};

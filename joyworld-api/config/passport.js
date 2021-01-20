import JwtPassport from 'passport-jwt';
import dotenv from 'dotenv';
import {findUserById} from '../app/services/userService.js';


export const applyPassportStrategy = (passport) => {
    const options = {};
    options.jwtFromRequest = JwtPassport.ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = process.env.JWT_SECRET;
    
    passport.use(
        new JwtPassport.Strategy(options, async (payload,done) => {
            const user = await findUserById(payload.id);
            if(user) {
                return done(null, user)
            }
            return done(null,false);
        })
    )
}

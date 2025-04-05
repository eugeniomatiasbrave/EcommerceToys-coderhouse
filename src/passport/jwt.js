import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { usersService, cartsService } from "../services/repositories.js";
import AuthService from "../services/AuthService.js";
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PWD = process.env.ADMIN_PWD;

const initializePassportConfig = () => {
    passport.use(
        'register', 
        new LocalStrategy(
        {usernameField: 'email',passReqToCallback: true }, 
        async (req, email, password, done) => {
        try {
            const { firstName, lastName, birthDate} = req.body;
            if (!firstName || !lastName) {return done(null, false, { message: 'Incomplete values' });}
            const user = await usersService.getUserByEmail(email);
            if (user) {return done(null, false, { message: "User already exists" });}
            let parsedDate;
            if (birthDate) {parsedDate = new Date(birthDate).toISOString();}

            const authService = new AuthService();
            const hashedPassword = await authService.hashPassword(password);
            let role = 'user';
            if (email === ADMIN_USER && password === ADMIN_PWD) {role = 'admin';}
            const newCart = await cartsService.createCart();
            
            const newUser = {firstName,lastName,email,birthDate: parsedDate,password: hashedPassword,role,cartId: newCart._id};
            const result = await usersService.createUser(newUser);
            if (result) {await usersService.updateUser(result._id, { cartId: newCart._id });}
            const cart = await cartsService.getCartById(result.cartId);
            result.cartId = cart._id;
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }));


    passport.use('login', new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
        try {
            if(email === ADMIN_USER && password === ADMIN_PWD){return done(null,{_id:0, firstName:"Administrador", role:"admin"})}
            const user = await usersService.getUserByEmail(email);
            if (!user) {return done(null, false, { message: "Incorrect credentials"});}
            const authService = new AuthService();
            const isValidPassword = await authService.validatePassword(password, user.password);
            if (!isValidPassword) {return done(null,false,{ message: "Incorrect credentials" });}
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY
    }, async (tokenData , done) => {
        try {
            console.log('tokenData',tokenData);
            return done(null,tokenData);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            cookieExtractor
        ]),
        secretOrKey: SECRET_KEY
    }, async (tokenData, done) => {
        try {
            console.log('tokenData', tokenData);
            return done(null, tokenData);
        } catch (error) {
            return done(error);
        }
    }));
};

function cookieExtractor(req) {
    if (req && req.cookies) {
        return req.cookies['tokencito'];
    }
    return null;
}

/* ------------------------------------ - ----------------------------------- */
/*

*/

/*
const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };
  
  const verifyToken = async (jwt_payload, done) => {
    req.user = jwt_payload
    if (!jwt_payload) return done(null, false, { messages: "Usuario inexistente" });
    return done(null, jwt_payload);
  };
  
  passport.use("jwt", new JWTStrategy(strategyConfig, verifyToken));
  
  
  
  const cookieExtractor = (req) => {
    return req.cookies.token;
  };
  
  const strategyCookiesConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY,
  };
  
  passport.use('current', new JWTStrategy(strategyCookiesConfig, verifyToken));
  */
  


export default initializePassportConfig;


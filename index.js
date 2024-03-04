import express from "express";
const app = express();
import db from "./db.js";
import bodyParser from 'body-parser'
import Person from './models/person.js'

import personRoutes from './routes/personRoutes.js'
import passport from 'passport';

import passportLocal from 'passport-local';



app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(new passportLocal.Strategy(async (username, password, done) => {
    try {
        const person = await Person.findOne({ username: username });

        if (!person) {
            return done(null, false, { message: "Invalid username" });
        }

        const passwordMatch = await person.comparePassword(password);

        if (passwordMatch) {
            return done(null, person);
        } else {
            return done(null, false, { message: "Invalid password" });
        }

    } catch (error) {
        return done(error);
    }
}));


 const middleWare=passport.authenticate('local',{session:false});
app.get("/",middleWare, (req, res) => {
  res.send("server is running");
});

app.use('/person',middleWare,personRoutes);

app.listen(3000, () => {
  console.log("Express server initialized");
});

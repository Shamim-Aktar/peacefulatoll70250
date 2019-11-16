const express=require('express');
const mongoose=require('mongoose');
const keys=require('./config/key')
const passport=require('passport');
require('./models/User')
require('./services/passport')
const authRoutes=require('./routes/authRoutes')
const cookieSession=require('cookie-session')

const app=express();


mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
authRoutes(app)


// Client:id 
// Client secret 
const PORT=process.env.PORT || 5000

app.listen(PORT)
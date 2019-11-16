const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys=require('../config/key')

const User=mongoose.model('users')

passport.serializeUser((user, done)=>{
done(null, user.id)
})

passport.deserializeUser((id, done)=>{
User.findById(id)
.then(user=>{
    done(null, user )
})
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},(accesstoken, refreshToken, profile,done)=>{
    // console.log(accesstoken)
    // console.log('refresh token', refreshToken);
    // console.log('profile', profile)
    // console.log('done', done)
   
    const user=User.findOne({googleId:profile.id}).then((existingUser)=>{
        //we have alredy this profile id
        if(existingUser){
            done(null, existingUser)
        }
        else{
            //make new records
            new User({googleId:profile.id}).
            save().
            then(user=>(done, user))
        }
    })
 
}));
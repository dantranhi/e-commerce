// import LocalStrategy from 'passport-local'
import bcrypt from 'bcryptjs'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import User from '../models/User.js'
import { googleKeys, facebookKeys } from './keys.js'

function initializePassport(passport) {
    // passport.use(
    //     new GoogleStrategy(
    //         {
    //             clientID: googleKeys.clientID,
    //             clientSecret: googleKeys.clientSecret,
    //             callbackURL: googleKeys.callbackURL
    //         },
    //         function (accessToken, refreshToken, profile, done) {
    //             console.log(profile)
    //             done(null, profile);
    //         }
    //     )
    // );


    // passport.use(
    //     new FacebookStrategy(
    //         {
    //             clientID: facebookKeys.facebook_key,
    //             clientSecret: facebookKeys.facebook_secret,
    //             callbackURL: facebookKeys.callback_url,
    //         },
    //         function (accessToken, refreshToken, profile, done) {
    //             done(null, profile);
    //         }
    //     )
    // );


    passport.use(new GoogleStrategy({
        clientID: googleKeys.clientID,
        clientSecret: googleKeys.clientSecret,
        callbackURL: googleKeys.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken)
        // Check if google profile exist.
        if (profile.id) {
            User.findOne({ googleId: profile.id })
                .then(async (existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        const hashedPassword = await bcrypt.hash(profile.emails[0].value, 10)
                        new User({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            // name: profile.name.familyName + ' ' + profile.name.givenName,
                            username: profile.name.familyName + ' ' + profile.name.givenName,
                            // password: hashedPassword,
                            image: profile.photos[0].value
                        })
                            .save()
                            .then(user => done(null, user));
                    }
                })
        }
    }
    ))


    // Xác thực user đăng nhập bằng Facebook
    passport.use(new FacebookStrategy({
        clientID: facebookKeys.facebook_key,
        clientSecret: facebookKeys.facebook_secret,
        callbackURL: facebookKeys.callback_url,
        profileFields: ['id', 'displayName', 'photos']
    },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log(profile)
                if (profile.id) {
                    User.findOne({ facebookId: profile.id })
                        .then(async (existingUser) => {
                            if (existingUser) {
                                done(null, existingUser);
                            } else {
                                const hashedPassword = await bcrypt.hash(profile.id, 10)
                                new User({
                                    facebookId: profile.id,
                                    username: profile.displayName,
                                    // password: hashedPassword,
                                    image: profile.photos[0].value
                                })
                                    .save()
                                    .then(user => done(null, user));
                            }
                        })
                }
            });
        }
    ));


    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });




    // Xác thực user đăng nhập bình thường
    // const authenticateUser = async (username, password, done) => {
    //     const user = await User.findOne({ username: username })
    //     if (user == null) {
    //         return done(null, false, { message: 'Tên người dùng không tồn tại' })
    //     }
    //     try {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return done(null, user, { message: 'Đăng nhập thành công' })
    //         }
    //         else {
    //             return done(null, false, { message: 'Mật khẩu không đúng' })
    //         }
    //     } catch (e) {
    //         return done(e)
    //     }
    // }


    // passport.use(new LocalStrategy.Strategy({ usernameField: 'username' }, authenticateUser))








    // Cach dung
    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });

    // passport.deserializeUser((_id, done) => {
    //     User.findById(_id, (err, user) => {
    //         if (err) {
    //             done(null, false, { error: err });
    //         } else {
    //             done(null, user);
    //         }
    //     });
    // });
}

export default initializePassport
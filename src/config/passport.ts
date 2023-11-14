import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const configurePassport = function (passport: any): void {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/auth/google/callback',
         },
         async (accessToken, refreshToken, profile, done) => {
            const user = {
               name: profile.name,
               email: profile.email
            }
            done(null, user);
         }
      )
   );
};

export default configurePassport;
// config/passport.ts
import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("Email not found in Google profile"));

        const existingUser = await User.findOne({ email });

        if (existingUser) return done(null, existingUser);

        const newUser = new User({
          name: profile.displayName,
          email,
          password: "", // for social login
          googleId: profile.id,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err as Error);
  }
});

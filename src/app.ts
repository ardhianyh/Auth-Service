import express, { Application } from "express";
import cors from "cors";
import { route } from "./routers";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session'
import configurePassport from './config/passport';

export const initializeApp = async (): Promise<Application> => {
  const app: Application = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', route);

  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true
    }
    )
  )

  configurePassport(passport);
  app.use(passport.initialize())
  app.use(passport.session())

  return app;
}
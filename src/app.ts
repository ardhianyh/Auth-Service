import express, { Application } from "express";
import cors from "cors";
import { route } from "./routers";
import cookieParser from 'cookie-parser'

export const initializeApp = async (): Promise<Application> => {
   const app: Application = express();

   app.use(cors());
   app.use(cookieParser());
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   app.use('/', route);

   return app;
}
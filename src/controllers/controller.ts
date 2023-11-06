import { Request, Response } from "express";

export const Controller = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   res.send(true);
}
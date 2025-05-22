import { Request, Response } from "express";

type HandlerFunction = (req: Request, res: Response) => Promise<Response>;

export const handleExceptions =
  (fn: HandlerFunction) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  };

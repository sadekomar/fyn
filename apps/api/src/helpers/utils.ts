import { Request, Response } from "express";

type HandlerFunction = (req: Request, res: Response) => Promise<Response>;

type ErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export const handleExceptions =
  (fn: HandlerFunction) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
      const response: ErrorResponse = {
        status: "error",
        error: {
          root: ["Internal server error"],
        },
      };

      res.status(500).json(response);
    }
  };

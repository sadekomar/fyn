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
      console.debug("handleExceptions", {
        endpoint: req.originalUrl,
        file: fn.name,
        req: req,
        res: res,
      });
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

/**
 * Check if the application is running in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === "development";
};

// middelware/error.middleware.ts
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  code?: number;
  statusCode?: number;
  errors?: any;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let error: CustomError = { ...err };
  error.message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new Error(message) as CustomError;
    error.code = 404;
  }

  // Mongoose Duplicate Key
  if ((err as any).code === 11000) {
    const message = "Duplicate value entered";
    error = new Error(message) as CustomError;
    error.code = 400;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values((err as any).errors || {}).map(
      (val: any) => val.message
    );
    error = new Error(message.join(", ")) as CustomError;
    error.code = 404;
  }

  return res.status(error.code || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};

export default errorMiddleware;

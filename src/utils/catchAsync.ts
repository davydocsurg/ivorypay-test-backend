import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { AuthRequest } from "../types";

export interface CustomParamsDictionary {
    [key: string]: any;
}

const catchAsync =
    (
        fn:
            | RequestHandler<
                  CustomParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
              >
            | any
    ) =>
    (
        req:
            | Request<
                  CustomParamsDictionary,
                  any,
                  any,
                  any,
                  Record<string, any>
              >
            | AuthRequest,
        res: Response<any, Record<string, any>, number>,
        next: NextFunction
    ) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };

export default catchAsync;

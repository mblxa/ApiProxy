import express from "express";
import Settings from "../config/Settings";
import CacheService from "../service/CacheService";

const CheckCacheMiddleware: express.RequestHandler = (req, res, next) => {
    const path: string[] = [];
    const requestParamsKeys = Settings.ExternalApi.Params.split("/:").slice(1);
    const requestParams: string[] = [];

    requestParamsKeys.forEach((key) => {
        path.push(`${req.params[key]}`);
        requestParams.push(`${key}=${req.params[key]}`);
    });

    res.locals.cachePath = path.join("-");
    res.locals.requestParams = requestParams;

    if (!Settings.Server.Cache) { return next(); }

    CacheService.get(res.locals.cachePath, (err, value) => {
        if (!err) {
            if (value !== undefined) {
                res.send(value);
            } else {
                next();
            }
        } else {
            next();
        }
    });
};

export default CheckCacheMiddleware;

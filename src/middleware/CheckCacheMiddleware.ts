import express from "express";
import settings from "../config/settings";
import CacheService from "../service/CacheService";

const CheckCacheMiddleware: express.RequestHandler = (req, res, next) => {
    if (!settings().cache) { return next(); }

    const {city} = req.params;
    const {offset} = req.params;
    const path = `${city}-${offset}`;

    CacheService.get(path, (err, value) => {
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

import express from "express";
import Settings from "../config/Settings";
import CacheService from "../service/CacheService";

const CheckCacheMiddleware: express.RequestHandler = (req, res, next) => {
    if (!Settings.Cache) { return next(); }

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

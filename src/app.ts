import express = require("express");
import Settings from "./config/Settings";
import AuthMiddleware from "./middleware/AuthMiddleware";
import CheckCacheMiddleware from "./middleware/CheckCacheMiddleware";
import CacheService from "./service/CacheService";
import GetExternalApiData from "./service/RequestApiService";

const app: express.Application = express();

app.get(Settings.ExternalApi.Params, AuthMiddleware, CheckCacheMiddleware, async (req, res) => {
    const data = await GetExternalApiData(res.locals.requestParams);
    CacheService.set(res.locals.cachePath, data);

    res.set("Content-Type", "application/json");
    res.send(data);
});

export default app;
